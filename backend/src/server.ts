import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { isTwilioConfigured } from "./services/twilio.service";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  const twilioOk = isTwilioConfigured();
  const publicUrl = process.env.PUBLIC_URL || "(not set)";

  console.log(`
======================================
🚀 ANWESHAN Backend Started
🌐 http://localhost:${PORT}
📧 Twilio SMS/Calls: ${twilioOk ? "CONFIGURED" : "NOT CONFIGURED"}
🔗 Public URL: ${publicUrl}
======================================
`);
}); 