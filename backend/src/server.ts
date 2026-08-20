import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { isTwilioConfigured } from "./services/twilio.service";
import { scanForMissedCheckIns } from "./controllers/checkin.controller";

const PORT = process.env.PORT || 5000;
const CHECKIN_SCAN_INTERVAL_MIN = parseInt(process.env.CHECKIN_SCAN_INTERVAL_MIN || "30");

const server = app.listen(PORT, () => {
  const twilioOk = isTwilioConfigured();
  const publicUrl = process.env.PUBLIC_URL || "(not set)";

  console.log(`
======================================
🚀 ANWESHAN Backend Started
🌐 http://localhost:${PORT}
📧 Twilio SMS/Calls: ${twilioOk ? "CONFIGURED" : "NOT CONFIGURED"}
🔗 Public URL: ${publicUrl}
❤️  Heartbeat scan: every ${CHECKIN_SCAN_INTERVAL_MIN} minutes
======================================
`);
});

// Heartbeat: periodically scan for seniors who missed daily check-ins
setInterval(async () => {
  try {
    const result = await scanForMissedCheckIns();
    if (result.triggered > 0) {
      console.log(`[Heartbeat] Auto-alert triggered for ${result.triggered} senior(s) missing check-ins (threshold: ${result.thresholdHours}h)`);
    }
  } catch (err) {
    console.error("[Heartbeat] Scan failed:", err);
  }
}, CHECKIN_SCAN_INTERVAL_MIN * 60 * 1000);

server.on('error', (err: Error) => {
  console.error('Server error:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
});