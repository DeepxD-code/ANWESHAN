# ANWESHAN

### Cyber-Aware Safety and Welfare Platform for Senior Citizens

ANWESHAN is a unified cyber safety and welfare platform designed to protect senior citizens from cyber fraud while improving emergency response and community safety.

Developed as a prototype for the **AI Impact Summit 2026 – iSAFE Hackathon** (Track 2: Defend the Digital Citizen), the platform combines cyber crime reporting, emergency assistance, digital evidence management, voice-activated SOS, and police-side monitoring into a single application.

---

Deployed URL : anweshan.vercel.app

## Problem Statement

Senior citizens are increasingly targeted by:

- UPI & banking fraud
- OTP scams
- Investment scams
- Digital arrest scams
- Fake courier & KYC scams

Existing systems require citizens to use multiple platforms for reporting fraud, emergency response and welfare monitoring. ANWESHAN brings these services together in one accessible platform.

---

## Key Features

### Senior Citizen Portal

- Report cyber fraud with category & evidence upload
- Track complaint & case status
- Emergency SOS with automatic guardian notification
- **Voice-activated SOS** — say "Help", "Emergency", "Bachao" to trigger alerts
- **Twilio-powered voice calls & SMS** to registered guardians on SOS
- Digital Evidence Vault (upload images, videos, PDFs, audio)
- Community scam alerts
- Health & welfare monitoring
- Safety dashboard with live location
- Fraud awareness centre

### Family / Guardian Portal

- Real-time emergency alerts from linked seniors
- Alert classification (fraud, health, duress)
- View linked seniors & their safety status
- Fraud escalation reporting
- Settings & preferences

### Police Officer Portal

- Complaint management with status tracking
- Case management (Open, Under Review, Closed)
- Evidence verification
- Emergency monitoring dashboard
- Operational analytics

### Admin Portal

- User management (all roles)
- Analytics dashboard
- System settings
- Operational insights

---

## Technology Stack

### Frontend

- **React 18** with TypeScript
- **Vite** (build tool)
- **Tailwind CSS** + **shadcn/ui** components
- **React Router v6** (client-side routing)
- **React Query** (server state management)
- **Recharts** (analytics visualisations)
- **Sonner** / **shadcn Toast** (notifications)

### Backend

- **Node.js** with **Express 5**
- **Prisma ORM** (PostgreSQL / SQLite)
- **JWT** authentication with bcrypt
- **Twilio** for SMS & voice call alerts
- **Zod** validation

### Machine Learning

- Python-based URL phishing classifier
- Keras/TensorFlow neural network model
- Scikit-learn preprocessing pipeline

### Deployment

| Service     | Platform              |
|-------------|-----------------------|
| Frontend    | **Vercel** (JAMstack) |
| Backend     | Docker / VPS          |
| Database    | PostgreSQL / SQLite   |

---

## Repository Structure

```
ANWESHAN/
├── src/                    # React frontend (Vite)
│   ├── components/         # Reusable UI components
│   ├── contexts/           # React contexts (Language, Theme, UserProgress)
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # Layout components
│   ├── lib/                # Utilities (API client, cn helper, demo store)
│   ├── pages/              # Route pages
│   │   ├── admin/          # Admin portal pages
│   │   ├── family/         # Family/guardian portal pages
│   │   ├── officer/        # Police officer portal pages
│   │   └── senior/         # Senior citizen portal pages
│   └── types/              # TypeScript type definitions
├── backend/                # Express API server
│   ├── src/
│   │   ├── config/         # Prisma client config
│   │   ├── controllers/    # Route handlers
│   │   ├── routes/         # Express routes
│   │   ├── services/       # Business logic (Twilio, etc.)
│   │   └── tests/          # Backend tests (Vitest)
│   ├── prisma/             # Schema, migrations, seed
│   └── scripts/            # Utility scripts
├── ml/                     # Machine learning models
│   ├── inference.py        # URL phishing classifier
│   ├── train_model.py      # Model training script
│   └── model.keras         # Trained model weights
├── public/                 # Static assets
├── tests/                  # E2E tests (Playwright)
├── Dockerfile              # Frontend Docker image (nginx)
├── docker-compose.yml      # Full-stack orchestration
├── nginx.conf              # Nginx config for Docker
├── vercel.json             # Vercel deployment config
└── package.json            # Frontend dependencies
```

---

## Calling / Voice SOS Feature

ANWESHAN includes a **voice-activated emergency response** system powered by **Twilio**:

- **Voice SOS (Frontend):** Seniors can activate SOS by pressing a button or speaking trigger words ("Help", "Emergency", "Bachao") via the Web Speech API. A live waveform visualiser provides audio feedback.
- **Twilio Voice Calls:** When an SOS is triggered, the backend automatically places an automated voice call to all registered guardians with the senior's name and location.
- **Twilio SMS:** A follow-up SMS is sent with details and a Google Maps link.
- **Twilio Voice Trigger:** Guardians can respond to calls via speech (e.g., "Help" confirms emergency dispatch).
- **Conversation Logging:** All alerts & Twilio interactions are stored for audit.

---

## Current Prototype

Implemented modules:

- Authentication (JWT) — Senior, Family, Officer, Admin roles
- Complaint reporting & tracking
- Officer dashboard & case management
- Evidence management (upload & verify)
- Emergency monitoring with SOS
- **Voice-activated SOS with Twilio calls & SMS**
- Family guardian linking & alert notifications
- Alert classification by guardians
- Analytics dashboards (Officer & Admin)
- Community scam alerts
- Health & welfare monitoring
- Fraud awareness & simulation centre
- URL phishing checker (ML-powered)
- Multilingual support (via LanguageContext)
- Responsive UI with dark/light theme

---

## Deployment

### Vercel (Frontend)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push this repo to GitHub
2. Import the project in Vercel (it auto-detects Vite)
3. Set environment variable `VITE_API_URL` to your backend URL (e.g. `https://your-backend.vercel.app/api`)
4. Deploy — the included `vercel.json` handles SPA routing

### Docker (Full Stack)

```bash
# Build and start both frontend + backend
docker compose up --build -d

# Access
# Frontend: http://localhost:8080
# Backend:  http://localhost:5000
```

### Docker (Individual)

```bash
# Frontend only
docker build -t anweshan-frontend .
docker run -p 8080:80 anweshan-frontend

# Backend only
cd backend
docker build -t anweshan-backend .
docker run -p 5000:5000 anweshan-backend
```

### Manual (Development)

```bash
# Prerequisites: Node.js 18+, PostgreSQL or SQLite

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Set up database (SQLite default)
cd backend
npx prisma db push
npx prisma db seed

# Start backend (terminal 1)
cd backend
npm run dev

# Start frontend (terminal 2)
npm run dev
```

**Credentials (seeded):**

| Role   | Email                  | Password    |
|--------|------------------------|-------------|
| Senior | ramesh@example.com     | password123 |
| Family | rajesh@example.com     | password123 |
| Officer| officer@example.com    | password123 |

---

## Environment Variables

### Backend (`backend/.env`)

| Variable             | Description                  | Default                                      |
|----------------------|------------------------------|----------------------------------------------|
| `PORT`               | Backend server port          | `5000`                                       |
| `DATABASE_URL`       | Database connection string   | `file:./prisma/anweshan.db` (SQLite)         |
| `JWT_SECRET`         | JWT signing secret           | _(change in production)_                     |
| `CORS_ORIGIN`        | Allowed CORS origins         | `http://localhost:8080`                       |
| `TWILIO_ACCOUNT_SID` | Twilio Account SID           | _(for voice/SMS alerts)_                     |
| `TWILIO_AUTH_TOKEN`  | Twilio Auth Token            | _(for voice/SMS alerts)_                     |
| `TWILIO_PHONE_NUMBER`| Twilio sender phone number   | _(for voice/SMS alerts)_                     |
| `PUBLIC_URL`         | Public-facing backend URL    | `http://localhost:5000`                       |

### Frontend

| Variable        | Description           | Default |
|-----------------|-----------------------|---------|
| `VITE_API_URL`  | Backend API base URL  | `/api`  |

---

## Future Scope

- AI-based real-time scam detection on calls
- Google Maps live tracking integration
- Banking fraud API integration (UPI, net banking)
- ERSS / CCTNS integration for police
- Wearable health device support
- Push notifications (Web Push / Firebase)
- Expanded multilingual support (12+ Indian languages)
- Offline-first emergency alerts (Service Worker)

---

## Authors

Team ANWESHAN

Dharmik Pandya | Avradeep Majumdar

