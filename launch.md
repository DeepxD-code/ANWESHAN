# ANWESHAN Launch Guide

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **PostgreSQL** running on `localhost:5432`
- A database named `anweshan` (created manually)

## Quick Start

### Option 1: PowerShell Script (Windows)

Double-click `start.bat` or run:

```powershell
.\start.ps1
```

### Option 2: Manual Start

**Backend:**

```bash
cd backend
npm install
npm run dev
```

The backend starts on **http://localhost:5000**.

**Frontend:**

```bash
cd ..
npm install
npm run dev
```

The frontend starts on **http://localhost:8080**.

## Access the App

| Service  | URL                             |
| -------- | ------------------------------- |
| Frontend | http://localhost:8080           |
| Backend  | http://localhost:5000           |
| API Base | http://localhost:5000/api       |

## Configuration

### Environment Variables (backend/.env)

| Variable            | Description                  | Default Value                                      |
| ------------------- | ---------------------------- | -------------------------------------------------- |
| `PORT`              | Backend server port          | `5000`                                             |
| `DATABASE_URL`      | PostgreSQL connection string | `postgresql://localhost:5432/anweshan`              |
| `JWT_SECRET`        | Secret for JWT tokens        | Set in `backend/.env`                              |
| `TWILIO_ACCOUNT_SID`| Twilio account SID           | Configured for SMS alerts                          |
| `TWILIO_AUTH_TOKEN` | Twilio auth token            | Configured for SMS alerts                          |
| `TWILIO_PHONE_NUMBER`| Twilio phone number         | `+19704504410`                                     |

## Features

### SOS Alerts (Twilio)

SOS alerts are sent via **Twilio SMS**. When a user triggers an SOS:
1. The backend sends an SMS alert to the user's registered guardians.
2. The alert includes the user's last known location.
3. Guardian phone numbers are managed via the `/api/guardians` endpoint.

### Notes

- **Twilio** is pre-configured for development. In production, replace with your own Twilio credentials.
- **PostgreSQL** must be running before starting the backend.
- If the backend fails to connect to the database, verify PostgreSQL is running and the database `anweshan` exists.
