# ANWESHAN — Full Project Context Export

> Exported: Aug 2026. Complete state of the ANWESHAN senior-citizen cyber-safety platform.

---

## 1. Project Overview

**ANWESHAN** is a multi-role cybersecurity-safety platform for senior citizens in India, fighting scams (phishing, vishing, smishing, UPI fraud, digital arrest, etc.). Seniors get a simplified, multilingual, voice-assisted portal; family caretakers monitor and review; police officers track welfare and evidence; platform admins manage everything.

**Stack:**
- **Frontend**: React 18 + Vite 5 + TypeScript, shadcn/ui (Radix), Tailwind CSS, react-router-dom v6, react-hook-form + zod, recharts, sonner
- **Backend**: Node.js + Express, Prisma ORM 6, SQLite database, JWT auth, helmet/morgan/cors
- **Integrations**: Twilio (SMS + voice calls with location), Web Speech API (TTS), Tailscale Funnel (public HTTPS), Docker Compose deployment

---

## 2. Roles & Auth

| Role | Purpose | Seed Login |
|---|---|---|
| **SENIOR** | Elderly user; reports complaints, uploads evidence, SOS, check-in, community | `ramesh@example.com` |
| **FAMILY** | Caretaker/guardian; reviews evidence, monitors senior, gets alerts | `rajesh@example.com` |
| **OFFICER** | Police; welfare monitor, evidence review, regional heatmap | `officer@example.com` + police ID `POL-AHD-001` |
| **ADMIN** | Platform; dashboard, user management, analytics | `admin@anweshan.gov.in` |

**All passwords: `password123`** (bcrypt-hashed).

**Auth flow** (`backend/src/controllers/auth.controller.ts`):
- `/api/auth/register` (senior/family/caretaker), `/api/auth/login` (email+password), `/api/auth/login/police` (policeId+password)
- JWT signed with `JWT_SECRET`, returned in response
- Registration creates `caretakerToken` for seniors (link code for family), `deviceId` support
- `SeniorRegister.tsx`, `CaretakerRegister.tsx`, `Register.tsx`, `Login.tsx` pages (Login now has clean tabs: Senior / Family / Officer)

---

## 3. Features (Completed)

### 3.1 Senior Portal (`/senior`)
- **Dashboard** (`src/pages/senior/Dashboard.tsx`): greeting, live stats, quick actions, safety tips
- **Complaints**: file cyber-fraud complaints (category, priority, loss amount, location)
- **Emergency / SOS** (`src/pages/senior/Emergency.tsx`): panic button → POST `/api/alerts` with GPS location → guardian + police notified via Twilio; duress flag
- **Evidence Vault** (`src/pages/senior/EvidenceVault.tsx`): upload scam screenshots → backend **auto-categorizes** (phishing/vishing/smishing/UPI fraud/investment/romance/job/digital arrest/lottery/pension) → "Awaiting caretaker approval" badge
- **Health & Welfare** (`src/pages/senior/HealthWelfare.tsx`): health records (blood group, BP, heart rate, oxygen, sugar, allergies, conditions), emergency contact
- **Community Channel** (`src/pages/senior/Community.tsx`): post warnings, read alerts, regional fraud reports
- **Check-in**: daily heartbeat check-in with location
- **Multilingual TTS**: `src/hooks/useTTS.ts` — text-to-speech in Hindi/Gujarati/English, 3-language UI via `LanguageContext.tsx`

### 3.2 Family/Caretaker Portal (`/family`)
- **Evidence Review** (`src/pages/family/EvidenceReview.tsx`): approve/reject evidence with AI category suggestion + confidence, category override, notes
- **Guardian link**: connect to senior via caretaker token
- **Alert notifications**, senior monitoring

### 3.3 Officer Portal (`/officer`)
- **Welfare Monitor** (`src/pages/officer/WelfareMonitor.tsx`): missed check-in list, regional heatmap, evidence stats, "Run missed check-in scan" button
- **Evidence** (`src/pages/officer/Evidence.tsx`): live evidence stats, AI Analyzer text box, "Awaiting Caretaker Review" list
- Complaints with case status

### 3.4 Admin Portal (`/admin`) — all wired to real API
- **Dashboard** (`src/pages/admin/Dashboard.tsx`): stat cards (users, complaints, alerts, check-ins, evidence, community, emergencies), live activity feed, regional reports
- **Users** (`src/pages/admin/Users.tsx`): real user list, search, role filter, disable/re-enable (PUT status)
- **Analytics** (`src/pages/admin/Analytics.tsx`): evidence-by-category, resolution rate, top risk zone, AI insights

### 3.5 Check-in heartbeat
- Backend scans every 30 min (`CHECKIN_SCAN_INTERVAL_MIN`) for seniors missing check-in beyond threshold → auto-creates alert + guardian notification
- `/api/checkins/missed/trigger` — manual scan trigger

### 3.6 Community
- Channels + posts + replies, regional stats (`byRegion`, `byCategory`, `byDay` objects)

---

## 4. API Endpoints

All mounted in `backend/src/app.ts`:

| Mount | Routes |
|---|---|
| `/api/auth` | register, login, login/police, logout, verify |
| `/api/complaints` | CRUD complaints + cases |
| `/api/alerts` | create (SOS w/ GPS), list, resolve |
| `/api/guardians` | link senior↔guardian |
| `/api/ml` | classification endpoints |
| `/api/twilio` | SMS/call status, webhooks |
| `/api/checkins` | POST `/` (check-in), GET `/missed`, POST `/missed/trigger` |
| `/api/community` | channels, posts, replies, GET `/stats/regional` |
| `/api/evidence` | POST `/` (upload+auto-categorize), GET `/review`, GET `/stats`, PUT `/approve/:reviewId`, PUT `/reject/:reviewId` |
| `/api/admin` | GET `/stats`, GET `/users`, GET `/activity`, PUT `/users/:userId/status` |

**Key API response shapes:**
- `GET /api/community/stats/regional` → `{ byRegion: {...}, byCategory: {...}, byDay: {...} }` (objects, NOT arrays)
- `GET /api/checkins/missed` → flat senior objects: `{ fullName, phone, city, deviceId, lastCheckIn }` (no `senior` wrapper, no `state` field — User has only `city`)
- `GET /api/evidence/stats` → totals + pending + categories
- `GET /api/admin/stats` → `stats.users.total`, `stats.evidence.total`, `stats.community.posts`, regions, evidenceByCategory, etc.

---

## 5. Database Schema (`backend/prisma/schema.prisma`)

**Enums**: `UserRole` (SENIOR/FAMILY/OFFICER/ADMIN), `ComplaintStatus` (PENDING/INVESTIGATING/RESOLVED/REJECTED), `CaseStatus` (OPEN/UNDER_REVIEW/CLOSED), `EmergencyStatus` (ACTIVE/RESOLVED), `EvidenceType` (IMAGE/VIDEO/AUDIO/PDF/LINK/DOCUMENT)

**Models** (23 total):
- `User`: fullName, email (unique), phone (unique), password, age, gender, city, address, role, isVerified, isActive, deviceId (unique), caretakerToken (unique), lastCheckIn, policeId (unique), badgeNumber, station, rank
- `Complaint`: complaintId (unique), title, description, category, priority, status, reportedLoss, location → user, case, evidence
- `Case`: caseId (unique), status, assignedTo, notes → complaint (1:1)
- `Evidence`: fileName, fileUrl, fileType, fileSize, complaintId (**optional**), userId, review (1:1 EvidenceReview)
- `Emergency`: emergencyId (unique), type, status, latitude/longitude/location, triggeredAt/resolvedAt → user
- `HealthRecord`: bloodGroup, bloodPressure, heartRate, oxygenLevel, bloodSugar, allergies, medicalConditions, doctorName, emergencyContact → user
- `GuardianLink`: seniorId + guardianId + relation, unique [seniorId, guardianId]
- `Alert`: type, status, duress, severity, lat/lng/location, classification, conversation, seniorId, guardianId (optional), resolvedAt
- `Conversation`: alertId, channel, from, to, body, direction
- `CheckIn`: userId, lat/lng/location, createdAt
- `CommunityChannel`: name, description, category, isPrivate, posts
- `CommunityPost`: title, content, category, region, lat/lng, isPinned, userId, channelId (optional), replies
- `CommunityReply`: content, userId, postId
- `EvidenceReview`: evidenceId (unique), reviewedBy (**optional**), status (pending/approved/rejected), category, aiCategory, aiConfidence, notes
- `CommunityAlert`: title, description, category, severity, area, isActive
- `Notification`: title, message, isRead, userId
- `AnalyticsSnapshot`: type, region, periodStart/End, data (Json)

---

## 6. Evidence Auto-Categorization

`backend/src/controllers/evidence.controller.ts` — keyword-based heuristic classifier (NOT a real LLM):

```ts
CATEGORY_KEYWORDS = {
  phishing:   ["otp", "bank", "netbanking", "upi", "verification", "link", "click", "account block", ...],
  vishing:    ["call", "customer care", "card block", "sim", ...],
  smishing:   ["sms", "message", "win", "prize", ...],
  upi_fraud:  ["upi", "gpay", "phonepe", "paytm", "refund", ...],
  investment: ["invest", "stock", "mutual fund", "return", ...],
  romance:    ["love", "dating", "marriage", ...],
  job:        ["job", "work from home", "salary", ...],
  digital_arrest: ["digital arrest", "police", "cbi", "warrant", ...],
  lottery:    ["lottery", "jackpot", "winner", ...],
  pension:    ["pension", "pf", "provident fund", ...],
}
```

Upload → auto-category + confidence score → caretaker review (approve/reject) → officer sees stats.

---

## 7. Twilio Integration (`backend/src/services/twilio.service.ts`)

- **`toE164()`**: converts Indian 10-digit numbers (`9876543211`) → `+919876543211` before any SMS/call
- **`notifyGuardians()`**: SMS + voice call to all guardians on alert, includes Google Maps location link
- **`sendSosSms()`**: emergency SMS
- Guarded by `isTwilioConfigured()` — skips if env missing
- **Blocked**: Twilio TRIAL account rejects unverified recipient numbers — user must verify at `twilio.com/user/account/phone-numbers/verified` or upgrade

**Twilio creds** (in `backend/.env`):
- SID: `AC9732d02a2ee74854cfcb05a66db552fe`
- Token: `[REDACTED — rotated 2026, see backend/.env]`
- From: `+19704504410`

---

## 8. Deployment (Live)

### Public URL
**https://deep.tail0fa17c.ts.net** — Tailscale Funnel → `127.0.0.1:8080` (nginx container)

### Current running setup (Docker Compose)
```
docker compose up -d --build
```
- `backend` container: `node dist/server.js` on :5000, entrypoint syncs schema (`prisma db push`) + seeds
- `frontend` container: nginx serving built React, proxies `/api/` → backend:5000, serves on :8080
- Both `restart: unless-stopped`

### Tailscale (after reboot)
```
tailscale up
tailscale funnel reset
tailscale funnel --bg 8080
```

### Local dev (alternative to Docker)
- Backend: `cd backend && npx tsc -p tsconfig.json && node dist/server.js` (compiles TS → dist)
- Frontend: `npm run dev` (Vite on :8080)
- Vite `allowedHosts: ["deep.tail0fa17c.ts.net"]` in `vite.config.ts` (else 403 Blocked request)
- `backend/.env` `PUBLIC_URL=https://deep.tail0fa17c.ts.net`

### Docker files
- `backend/Dockerfile`: multi-stage, node:20-alpine, `prisma generate` + `tsc` build; runner copies node_modules, dist, schema, migrations, seed.js; `EXPOSE 5000`, entrypoint
- `Dockerfile` (root): multi-stage node build → nginx:alpine serving `/usr/share/nginx/html`, `nginx.conf` proxies `/api/`
- `docker-compose.yml`: env from root `.env` (JWT_SECRET, TWILIO_*), `CORS_ORIGIN` includes `https://deep.tail0fa17c.ts.net`, `DATABASE_URL=file:/app/prisma/anweshan.db` (absolute)
- `backend/entrypoint.sh`: `prisma db push --skip-generate` → `node prisma/seed.js` → `exec node dist/server.js`
- `backend/prisma/seed.js`: compiled from `seed.ts` via `npx tsc prisma/seed.ts --outDir prisma --module commonjs --target es2020 --esModuleInterop --skipLibCheck`

### Commands (Windows PowerShell)
```powershell
# Rebuild + restart containers
docker compose up -d --build

# Rebuild backend image only
docker build -t anweshan-backend-test -f backend/Dockerfile backend

# Tailscale funnel reset (after reboot)
tailscale funnel reset; tailscale funnel --bg 8080
```

---

## 9. Environment Variables

**Root `.env`** (for Docker Compose — gitignored):
```
JWT_SECRET=anweshan-dev-secret-key-2026
TWILIO_ACCOUNT_SID=AC9732d02a2ee74854cfcb05a66db552fe
TWILIO_AUTH_TOKEN=<REDACTED — get from https://www.twilio.com/console>
TWILIO_PHONE_NUMBER=+19704504410
```

**`backend/.env`** (for local dev):
```
PORT=5000
DATABASE_URL=file:./prisma/anweshan.db
JWT_SECRET=anweshan-dev-secret-key-2026
TWILIO_ACCOUNT_SID=AC9732d02a2ee74854cfcb05a66db552fe
TWILIO_AUTH_TOKEN=<REDACTED — get from https://www.twilio.com/console>
TWILIO_PHONE_NUMBER=+19704504410
PUBLIC_URL=https://deep.tail0fa17c.ts.net
```

Optional: `CORS_ORIGIN`, `CHECKIN_SCAN_INTERVAL_MIN` (default 30)

---

## 10. Test Checklist & Scripts

### API test scripts (in `C:\Users\trex2\AppData\Local\Temp\opencode\`):
- `test-evidence-flow.ps1` — login senior → upload → auto-categorize → caretaker approve → stats
- `test-twilio.ps1` — SOS alert → guardian SMS/call (needs verified numbers)
- `check-live.ps1` — backend/frontend/tunnel health
- `restart-all.ps1` — restart local servers (pre-Docker; now use compose)
- `test-docker.ps1` / `test-docker-front.ps1` / `test-compose.ps1` — container smoke tests
- `check-db.js` — count rows in local DB
- `cleanup-alerts.js` — delete test SOS alerts

### Manual test flow (live site):
1. Login each role: senior/caretaker/officer/admin (creds in §2)
2. Senior → Evidence Vault → upload screenshot → AI category appears
3. Caretaker → Evidence Review → approve
4. Officer → Evidence / Welfare Monitor → see stats + missed check-ins
5. Senior → Community → post fraud warning
6. Senior → check-in → officer monitor updates
7. Admin → Dashboard/Users/Analytics → live data, disable/enable user
8. Senior → Emergency → alert created (Twilio needs verified numbers)

---

## 11. Key Files Map

**Backend** (`backend/src/`):
- `app.ts` — express setup + all route mounts
- `server.ts` — entry, heartbeat scan (30 min), Twilio status banner
- `controllers/`: `auth`, `complaint`, `alert`, `guardian`, `checkin`, `community`, `evidence`, `admin` + `ml`
- `routes/`: `auth`, `complaint`, `alert`, `guardian`, `ml`, `twilio`, `checkin`, `community`, `evidence`, `admin`
- `services/twilio.service.ts` — SMS/call + `toE164()`
- `prisma/schema.prisma`, `prisma/seed.ts` (+ compiled `seed.js`), `prisma/migrations/20260711225113_init`

**Frontend** (`src/`):
- `App.tsx` — routes (senior/family/officer/admin portals + auth)
- `pages/Login.tsx`, `Register.tsx`, `SeniorRegister.tsx`, `CaretakerRegister.tsx`
- `pages/SeniorPortal.tsx`, `FamilyPortal.tsx`, `OfficerPortal.tsx` — role shells + menus
- `pages/senior/`: `Dashboard`, `Emergency`, `EvidenceVault`, `HealthWelfare`, `Community`
- `pages/family/EvidenceReview.tsx`
- `pages/officer/`: `WelfareMonitor`, `Evidence`
- `pages/admin/`: `Dashboard`, `Users`, `Analytics` (all live-data)
- `contexts/LanguageContext.tsx` — 3-language UI
- `hooks/useTTS.ts` — Web Speech TTS
- `vite.config.ts` — `allowedHosts`

---

## 12. Known Blockers & Notes

1. **Twilio trial**: SMS/calls to unverified numbers fail (P2034-style "unverified") — user action needed: verify `+919876543211`, `+919876543213` at `twilio.com/user/account/phone-numbers/verified` or upgrade. Numbers in DB are 10-digit Indian format; `toE164()` handles conversion.
2. **AI categorization** is keyword heuristic, not an LLM.
3. **Old migration** (`20260711225113_init`) doesn't include post-init columns (deviceId, caretakerToken, policeId, etc.) — Docker entrypoint uses `db push` to sync; `migrate deploy` alone will fail on fresh DBs.
4. `backend/prisma/prisma/anweshan.db` (nested dir from old path bug) is tracked in git — candidate for removal.
5. Voice SOS/TTS requires mic permissions in browser; not yet end-to-end tested with real audio.
6. No mobile app; PWA not configured.
7. After machine reboot: containers auto-restart (`restart: unless-stopped`) but Tailscale funnel must be re-established (`tailscale funnel --bg 8080`).

---

## 13. Current Status

- ✅ Live at `https://deep.tail0fa17c.ts.net` (Docker Compose: nginx :8080 → backend :5000)
- ✅ All four portals functional with real data
- ✅ Evidence collection → AI categorize → caretaker review → officer stats, end-to-end tested
- ✅ Admin API + pages (stats/users/activity) tested through tunnel
- ✅ Community channel live
- ⏳ Twilio delivery pending user number verification
- Next candidates: admin Settings page wiring, PWA, real LLM categorizer, missed check-in auto-alert verification
