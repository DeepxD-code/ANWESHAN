# Anweshan - Features & Capabilities

Generated from git commit analysis (commits c9b5705, d89bc7f, 06bd081)

## Feature Overview

| Feature | Category | Description | Status | Related Components |
|---------|----------|-------------|--------|-------------------|
| **Authentication System** | Core | User login, registration, and authentication management with session handling | ✅ Active | `backend/src/controllers/auth.controller.ts`, `backend/src/routes/auth.routes.ts`, `src/pages/Login.tsx`, `src/pages/Register.tsx` |
| **Role-Based Portals** | User Experience | Distinct portals for Admin, Family Members, Police Officers, and Seniors | ✅ Active | `src/pages/AdminPortal.tsx`, `src/pages/FamilyPortal.tsx`, `src/pages/OfficerPortal.tsx`, `src/pages/SeniorPortal.tsx` |
| **Senior Dashboard** | Senior Portal | Personalized dashboard for senior citizens with alerts, cases, and emergency contacts | ✅ Active | `src/pages/senior/Dashboard.tsx`, `src/pages/senior/EmergencyContacts.tsx`, `src/pages/senior/CommunityAlerts.tsx` |
| **Family Dashboard** | Family Portal | Family member dashboard to monitor seniors, view alerts, and manage escalations | ✅ Active | `src/pages/FamilyDashboard.tsx`, `src/pages/family/Alerts.tsx`, `src/pages/family/Escalations.tsx`, `src/pages/family/Seniors.tsx` |
| **Officer Portal** | Police Integration | Police officer interface for case management, complaints, emergency monitoring, and evidence | ✅ Active | `src/pages/OfficerPortal.tsx`, `src/pages/officer/Cases.tsx`, `src/pages/officer/Complaints.tsx`, `src/pages/officer/EmergencyMonitor.tsx`, `src/pages/officer/Evidence.tsx` |
| **Admin Panel** | Administration | Administrative dashboard for user management, analytics, and system settings | ✅ Active | `src/pages/AdminPortal.tsx`, `src/pages/admin/Dashboard.tsx`, `src/pages/admin/Users.tsx`, `src/pages/admin/Analytics.tsx`, `src/pages/admin/Settings.tsx` |
| **Alert Management System** | Core Feature | Create, manage, and track alerts for seniors and family members | ✅ Active | `backend/src/controllers/alert.controller.ts`, `backend/src/routes/alert.routes.ts`, `src/pages/family/Alerts.tsx` |
| **Complaint Management** | Core Feature | Submit and track complaints with full workflow and status monitoring | ✅ Active | `backend/src/controllers/complaint.controller.ts`, `backend/src/routes/complaint.routes.ts`, `src/pages/officer/Complaints.tsx` |
| **Guardian Management** | Senior Protection | Manage guardians/emergency contacts for seniors with role assignment | ✅ Active | `backend/src/controllers/guardian.controller.ts`, `backend/src/routes/guardian.routes.ts` |
| **Twilio Integration** | Communication | SMS/telephony integration for alerts and emergency notifications | ✅ Active | `backend/src/controllers/twilio.controller.ts`, `backend/src/routes/twilio.routes.ts`, `backend/src/services/twilio.service.ts` |
| **Fraud Detection & ML** | Security | Machine learning models for phishing/fraud detection with inference capability | ✅ Active | `backend/src/controllers/ml.controller.ts`, `backend/src/routes/ml.routes.ts`, `ml/inference.py`, `ml/train_model.py`, `ml/model.keras`, `ml/model.pt` |
| **Link Checker** | Security | Validate and check URLs for phishing/malicious content | ✅ Active | `src/pages/LinkChecker.tsx` |
| **Emergency Response System** | Safety | Real-time emergency button and escalation workflow for seniors | ✅ Active | `src/pages/senior/Emergency.tsx`, `src/pages/officer/EmergencyMonitor.tsx` |
| **Evidence Vault** | Case Management | Secure storage and management of evidence for cases and complaints | ✅ Active | `src/pages/senior/EvidenceVault.tsx`, `src/pages/officer/Evidence.tsx` |
| **Fraud Reporting Center** | Senior Portal | Dedicated interface for seniors to report fraud and scams | ✅ Active | `src/pages/senior/FraudCentre.tsx`, `src/pages/senior/ReportFraud.tsx` |
| **Health & Wellness Tracking** | Senior Wellbeing | Health information and wellness monitoring for seniors | ✅ Active | `src/pages/senior/Health.tsx`, `src/pages/senior/HealthWelfare.tsx` |
| **Community Alerts** | Community | View and interact with community-wide alerts and safety information | ✅ Active | `src/pages/senior/CommunityAlerts.tsx` |
| **Case Management System** | Case Tracking | End-to-end case tracking for seniors and officers | ✅ Active | `src/pages/senior/Cases.tsx`, `src/pages/officer/Cases.tsx` |
| **Analytics & Reporting** | Analytics | Admin and officer-level analytics dashboards with reporting capabilities | ✅ Active | `src/pages/admin/Analytics.tsx`, `src/pages/officer/Analytics.tsx` |
| **User Settings & Preferences** | Configuration | Per-role user settings, preferences, and account management | ✅ Active | `src/pages/admin/Settings.tsx`, `src/pages/family/Settings.tsx`, `src/pages/senior/Settings.tsx` |
| **Responsive UI Library** | Frontend | Comprehensive shadcn/ui component library for consistent design | ✅ Active | `src/components/ui/` (40+ components: accordion, alert, avatar, badge, button, card, carousel, chart, checkbox, dialog, drawer, form, input, tabs, table, toast, etc.) |
| **Navigation System** | UX | Header navigation with responsive design and multi-role support | ✅ Active | `src/components/Navbar.tsx`, `src/components/Footer.tsx` |
| **Home Landing Page** | Marketing | Marketing landing page with feature showcase and call-to-actions | ✅ Active | `src/pages/Index.tsx`, `src/components/home/Hero.tsx`, `src/components/home/FeaturesSection.tsx`, `src/components/home/HowItWorks.tsx`, `src/components/home/ProblemSection.tsx`, `src/components/home/PoliceIntegration.tsx`, `src/components/home/EmergencySection.tsx`, `src/components/home/CommunitySection.tsx`, `src/components/home/FooterCTA.tsx` |
| **Learning Resources** | Education | Educational content and resources for seniors about fraud prevention | ✅ Active | `src/pages/Learn.tsx` |
| **Simulation Mode** | Testing/Demo | Simulation environment for testing features and demonstration | ✅ Active | `src/pages/Simulate.tsx` |
| **Multilingual Support** | Localization | Translation and language context system for multi-language UI | ✅ Active | `src/contexts/LanguageContext.tsx` |
| **Theme Support** | UX | Dark/light theme toggle with context-based theme management | ✅ Active | `src/contexts/ThemeContext.tsx` |
| **User Progress Tracking** | Analytics | Track and persist user progress and activity state | ✅ Active | `src/contexts/UserProgressContext.tsx` |
| **Contact & Support** | Support | Contact page and support channels | ✅ Active | `src/pages/Contact.tsx` |
| **Error Handling** | System | 404 error page and error handling system | ✅ Active | `src/pages/NotFound.tsx` |
| **Database with Prisma ORM** | Backend | PostgreSQL/SQLite database with Prisma migrations and seeding | ✅ Active | `backend/prisma/schema.prisma`, `backend/prisma/migrations/`, `backend/prisma/seed.ts`, `backend/prisma/seed.js` |
| **Backend API Server** | Infrastructure | Express/Node.js backend server with routing and middleware | ✅ Active | `backend/src/app.ts`, `backend/src/server.ts` |
| **Testing Suite** | QA | Playwright end-to-end tests, Vitest unit tests, and test utilities | ✅ Active | `tests/example.spec.ts`, `backend/vitest.config.ts`, `test_all_tabs.cjs`, `test_app.cjs`, `test_interactive_features.cjs`, `test_new_features.cjs` |
| **Docker Containerization** | DevOps | Docker containers for frontend, backend, and docker-compose orchestration | ✅ Active | `Dockerfile`, `backend/Dockerfile`, `docker-compose.yml`, `nginx.conf` |
| **Vite Build System** | Build | Modern Vite build system with TypeScript and HMR support | ✅ Active | `vite.config.ts` |
| **Tailwind CSS Styling** | Styling | Utility-first CSS framework with Tailwind configuration | ✅ Active | `tailwind.config.ts`, `src/index.css` |
| **ESLint & Code Quality** | Development | Code linting and quality checks with ESLint configuration | ✅ Active | `eslint.config.js` |
| **TypeScript Support** | Development | Full TypeScript support across frontend and backend | ✅ Active | `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `backend/tsconfig.json` |
| **ML Model Training & Inference** | ML Pipeline | Training pipeline and inference engine for fraud detection models | ✅ Active | `ml/train_model.py`, `ml/inference.py`, `ml/requirements.txt`, `ml/model.keras`, `ml/model.pt` |
| **Phishing Dataset Integration** | ML Data | Integrated phishing URL datasets and threat feeds | ✅ Active | `ml/phishing_urls.csv`, `ml/openphish_feed.txt`, `ml/komal01_dataset.csv`, `ml/phiusiil_dataset.csv` |
| **Model Artifacts** | ML Assets | Pre-trained model weights and vectorizer/scaler artifacts | ✅ Active | `ml/model_weights.pt`, `ml/model_weights.weights.h5`, `ml/vectorizer.pkl`, `ml/scaler.pkl` |
| **Deployment to Vercel** | DevOps | Vercel deployment configuration for frontend | ✅ Active | `vercel.json` |
| **Role-Based Access Control** | Security | Granular permission model with role selector | ✅ Active | `src/pages/RoleSelector.tsx` |
| **Results Display** | UI Pattern | Results and outcome display page pattern | ✅ Active | `src/pages/Results.tsx` |
| **Docker Networking** | Infrastructure | Configured Docker networking with tunnel and nginx proxy support | ✅ Active | `docker-compose.yml`, `nginx.conf`, `tunnel.ps1` |
| **Setup & Run Scripts** | DevOps | PowerShell and batch scripts for easy project setup and launch | ✅ Active | `setup-and-run.ps1`, `start.ps1`, `start.bat` |

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React + TypeScript | UI and client-side logic |
| **Styling** | Tailwind CSS | Utility-first styling |
| **UI Components** | shadcn/ui | Pre-built accessible components |
| **Build Tool** | Vite | Fast development and production builds |
| **Backend Framework** | Express.js | REST API server |
| **Database** | PostgreSQL/SQLite + Prisma ORM | Data persistence and management |
| **Authentication** | Custom JWT | User session management |
| **ML Framework** | Python (PyTorch/TensorFlow/Keras) | Fraud detection models |
| **Communication** | Twilio SDK | SMS and telephony |
| **Testing** | Playwright, Vitest | E2E and unit testing |
| **Containerization** | Docker & Docker Compose | Application deployment |
| **Web Server** | Nginx | Reverse proxy and static serving |
| **Deployment** | Vercel | Frontend hosting |
| **Code Quality** | ESLint | Linting and formatting |

---

## Summary

**Total Features: 43**  
**Status: All Active (✅)**  
**Last Updated: 2026-07-15**  
**Repository: ANWESHAN (Scam & Fraud Prevention for Seniors)**

This comprehensive platform provides an integrated solution for senior citizen safety, fraud prevention, emergency response, and family/police coordination with ML-powered threat detection and multi-role dashboards.
