import { Request, Response } from "express";
import prisma from "../config/prisma";

export const handleVoiceTrigger = async (req: Request, res: Response) => {
  const speechResult = req.body.SpeechResult || "";
  const from = req.body.From || "";
  const callSid = req.body.CallSid || "";
  const detected = speechResult.toLowerCase().trim();

  console.log(`Twilio voice trigger: "${detected}" from ${from} (call: ${callSid})`);

  const triggerWords = ["help", "emergency", "confirmed", "received"];
  const matched = triggerWords.find(w => detected.includes(w));

  if (matched === "help" || matched === "emergency") {
    console.log(`EMERGENCY TRIGGER from guardian ${from}`);
  }

  const twiml = `<Response><Say voice="alice">Thank you. Your response has been recorded. Goodbye.</Say></Response>`;
  res.type("text/xml").send(twiml);
};
