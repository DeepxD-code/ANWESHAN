import twilio from "twilio";

let client: any = null;
let twilioConfigured = false;

function getClient() {
  if (!client) {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    if (sid && token) {
      client = twilio(sid, token);
      twilioConfigured = true;
    }
  }
  return client;
}

export function isTwilioConfigured(): boolean {
  getClient();
  return twilioConfigured && !!process.env.TWILIO_PHONE_NUMBER;
}

export async function notifyGuardians(alert: any, guardian: any, seniorName: string, conversation?: string) {
  const tw = getClient();
  if (!tw) {
    console.warn("Twilio not configured - skipping SMS and call notification");
    return { sms: false, call: false, reason: "Twilio not configured" };
  }
  const from = process.env.TWILIO_PHONE_NUMBER || "";
  if (!from) {
    console.warn("TWILIO_PHONE_NUMBER not set - skipping notification");
    return { sms: false, call: false, reason: "Missing TWILIO_PHONE_NUMBER" };
  }
  let smsSent = false;
  let callSent = false;

  // Call first with a simple alert message, then send SMS after
  try {
    const twiml = `<Response>
  <Say voice="alice">Emergency alert for ${seniorName}. Location: ${alert.location || "Unknown"}. Please check the ANWESHAN app immediately. A text message with details will follow. Thank you.</Say>
</Response>`;
    await tw.calls.create({ from, to: guardian.phone, twiml });
    callSent = true;
  } catch (e: any) {
    console.error(`Twilio call failed for ${guardian.phone}:`, e.message || e);
  }

  const msg = `ANWESHAN Alert: ${alert.type.toUpperCase()} from ${seniorName}. Location: ${alert.location || "Unknown"}. Check the app immediately.`;
  try {
    await tw.messages.create({ from, to: guardian.phone, body: msg });
    smsSent = true;
  } catch (e: any) {
    console.error(`Twilio SMS failed for ${guardian.phone}:`, e.message || e);
  }

  return { sms: smsSent, call: callSent };
}

export async function sendSosSms(phone: string, alert: any) {
  const tw = getClient();
  if (!tw) return false;
  const from = process.env.TWILIO_PHONE_NUMBER;
  if (!from) return false;
  const mapsLink = alert.latitude ? `https://maps.google.com/?q=${alert.latitude},${alert.longitude}` : "";
  try {
    await tw.messages.create({
      from,
      to: phone,
      body: `ANWESHAN SOS: ${alert.type} at ${alert.location || "Unknown"}${mapsLink ? " - " + mapsLink : ""}`,
    });
    return true;
  } catch (e: any) {
    console.error(`Twilio SMS to ${phone} failed:`, e.message || e);
    return false;
  }
}
