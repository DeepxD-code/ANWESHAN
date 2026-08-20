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

// Normalizes local phone numbers to E.164 format (Twilio requirement).
// Indian 10-digit numbers (e.g. 9876543211) become +919876543211.
export function toE164(phone: string): string {
  const digits = (phone || "").replace(/\D/g, "");
  if (!digits) return phone;
  if (digits.startsWith("91") && digits.length === 12) return `+${digits}`;
  if (digits.startsWith("0") && digits.length === 11) return `+91${digits.slice(1)}`;
  if (digits.length === 10) return `+91${digits}`;
  return `+${digits}`;
}

function buildLocationText(alert: any): { text: string; mapsLink: string } {
  if (alert.latitude && alert.longitude) {
    const mapsLink = `https://maps.google.com/?q=${alert.latitude},${alert.longitude}`;
    return {
      text: `Live Location: ${alert.location || ""} (${alert.latitude.toFixed(5)}, ${alert.longitude.toFixed(5)})`,
      mapsLink,
    };
  }
  return {
    text: `Location: ${alert.location || "Unknown"}`,
    mapsLink: "",
  };
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

  const to = toE164(guardian.phone);
  const { text: locationText, mapsLink } = buildLocationText(alert);

  // Call first with a simple alert message, then send SMS after
  try {
    const twiml = `<Response>
  <Say voice="alice">Emergency alert for ${seniorName}. ${locationText}. Please check the ANWESHAN app immediately. A text message with details will follow. Thank you.</Say>
</Response>`;
    await tw.calls.create({ from, to, twiml });
    callSent = true;
  } catch (e: any) {
    console.error(`Twilio call failed for ${to}:`, e.message || e);
  }

  const msg = `ANWESHAN SOS: ${alert.type.toUpperCase()} from ${seniorName}. ${locationText}${mapsLink ? " - " + mapsLink : ""}. Check the app immediately.`;
  try {
    await tw.messages.create({ from, to, body: msg });
    smsSent = true;
  } catch (e: any) {
    console.error(`Twilio SMS failed for ${to}:`, e.message || e);
  }

  return { sms: smsSent, call: callSent };
}

export async function sendSosSms(phone: string, alert: any) {
  const tw = getClient();
  if (!tw) return false;
  const from = process.env.TWILIO_PHONE_NUMBER;
  if (!from) return false;
  const to = toE164(phone);
  const { text: locationText, mapsLink } = buildLocationText(alert);
  try {
    await tw.messages.create({
      from,
      to,
      body: `ANWESHAN SOS: ${alert.type} at ${locationText}${mapsLink ? " - " + mapsLink : ""}`,
    });
    return true;
  } catch (e: any) {
    console.error(`Twilio SMS to ${to} failed:`, e.message || e);
    return false;
  }
}
