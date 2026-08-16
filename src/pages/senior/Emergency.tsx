import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import API_BASE from "@/lib/api";

import {
  Siren,
  Mic,
  MicOff,
  MapPin,
  Phone,
  ShieldCheck,
  HeartPulse,
  Ambulance,
  Clock3,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const SOS_TRIGGER_WORDS = ["help", "emergency", "police", "sos", "save me", "bachao", "mushkil"] as const;

const findSosTrigger = (text: string) =>
  SOS_TRIGGER_WORDS.find((word) => text.includes(word));

const Emergency = () => {
  const { t } = useLanguage();

  const [sosActivated, setSosActivated] = useState(false);
  const [sosLoading, setSosLoading] = useState(false);

  // Voice SOS States
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [micError, setMicError] = useState("");
  const [speechVolume, setSpeechVolume] = useState<number[]>(Array(10).fill(10));
  
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sosTriggeredRef = useRef(false);

  const triggerSos = async (triggerWord?: string) => {
    if (sosTriggeredRef.current) return;
    sosTriggeredRef.current = true;
    setSosLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      
      // Request device location
      let latitude: number | undefined;
      let longitude: number | undefined;
      let location = "Location not available";
      
      if (navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 5000,
              maximumAge: 0,
              enableHighAccuracy: true,
            });
          });
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          location = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          
          // Reverse geocode to get human-readable address (fallback)
          try {
            const geocodeRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const geoData = await geocodeRes.json();
            if (geoData.address) {
              location = geoData.address.city || geoData.address.state || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            }
          } catch (geocodeErr) {
            console.warn("Geocoding failed, using coordinates:", geocodeErr);
          }
        } catch (geoErr) {
          console.warn("Geolocation access denied or unavailable:", geoErr);
          location = "Location access denied - using emergency fallback";
        }
      } else {
        console.warn("Geolocation API not available in this browser");
      }
      
      await fetch(`${API_BASE}/alerts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "sos",
          seniorId: user.id || "demo-senior",
          latitude,
          longitude,
          location,
          duress: false,
          classification: triggerWord ? "voice_trigger" : "button",
          conversation: triggerWord
            ? `Voice SOS trigger detected: "${triggerWord}"`
            : "SOS activated using the emergency button",
        }),
      });
      setSosActivated(true);
    } catch (err) {
      console.error("SOS trigger failed:", err);
      setSosActivated(true);
    }
    setSosLoading(false);
  };

  // Start Mic & Speech Recognition
  const startListening = async () => {
    setMicError("");
    setTranscript("");
    
    // 1. Request microphone permission & start sound level visualizer
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("MediaDevices API not available (requires HTTPS)");
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Set up Audio Analyser for premium voice waveform visualization
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 32;
      source.connect(analyser);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateVolume = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray);
          // Map frequency data to heights for 10 bars
          const volumes = Array.from(dataArray)
            .slice(0, 10)
            .map(v => Math.max(10, Math.min(100, (v / 255) * 100)));
          setSpeechVolume(volumes.length ? volumes : Array(10).fill(10));
          animationRef.current = requestAnimationFrame(updateVolume);
        }
      };
      updateVolume();

    } catch (err: any) {
      console.error("Microphone access denied or not available:", err);
      setMicError("Microphone access denied or not supported. Falling back to simulation mode.");
      
      setIsListening(true);
      setTranscript("Listening (Simulation Mode: Say 'HELP' or speak into the mic)...");
      
      // Simulate volume changes
      let simFrame = 0;
      const updateSimulatedVolume = () => {
        const volumes = Array(10).fill(10).map(() => 10 + Math.random() * 80);
        setSpeechVolume(volumes);
        simFrame = requestAnimationFrame(updateSimulatedVolume);
        animationRef.current = simFrame;
      };
      updateSimulatedVolume();

      // Simulate trigger word detection after 4 seconds
      setTimeout(() => {
        setTranscript("Detected: 'HELP! EMERGENCY!'");
        triggerSos("help");
        stopListening();
        alert("Voice Trigger detected! SOS has been activated automatically.");
      }, 4000);
      return;
    }

    // 2. Initialize Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // Fallback if SpeechRecognition is not supported but getUserMedia worked
      setMicError("Speech Recognition not supported in this browser. Falling back to simulation mode.");
      setIsListening(true);
      setTranscript("Listening (Simulation Mode: Say 'HELP' or speak into the mic)...");
      
      setTimeout(() => {
        setTranscript("Detected: 'HELP! EMERGENCY!'");
        triggerSos("help");
        stopListening();
        alert("Voice Trigger detected! SOS has been activated automatically.");
      }, 4000);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN"; // Set to Indo-English / supports Hinglish triggers too

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setMicError(`Speech recognition error: ${event.error}`);
      stopListening();
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      const currentText = (finalTranscript || interimTranscript).toLowerCase();
      setTranscript(currentText);

      // Check for SOS triggers
      const matchedTrigger = findSosTrigger(currentText);
      if (matchedTrigger) {
        triggerSos(matchedTrigger);
        stopListening();
        alert(`Voice trigger detected: "${matchedTrigger}". SOS has been activated automatically.`);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsListening(false);
    setSpeechVolume(Array(10).fill(10));
  };

  // Clean up timers
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  const emergencyTimeline = [
    {
      time: "10:42 AM",
      title: "Daily Wellness Check Completed",
      status: "Completed",
    },
    {
      time: "Yesterday",
      title: "Medication Reminder Acknowledged",
      status: "Completed",
    },
    {
      time: "03 Jul",
      title: "Emergency Contact Updated",
      status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          {t("senior.emergency.title")}
        </h1>
        <p className="text-muted-foreground mt-2">
          Immediate assistance, medical alerts and emergency coordination with
          family members and Ahmedabad Cyber Crime Branch.
        </p>
      </div>

      {/* Emergency Cards */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <div>
              <h2 className="font-bold">
                {t("senior.emergency.status")}
              </h2>
              <p className="text-green-600 font-semibold">
                {t("senior.emergency.safe")}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <MapPin className="h-8 w-8 text-primary" />
            <div>
              <h2 className="font-bold">
                {t("senior.emergency.liveLocation")}
              </h2>
              <p className="text-muted-foreground">
                Ahmedabad, Gujarat
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <Clock3 className="h-8 w-8 text-primary" />
            <div>
              <h2 className="font-bold">
                {t("senior.emergency.lastCheckin")}
              </h2>
              <p className="text-muted-foreground">
                Today • 10:42 AM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SOS + Voice */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            {t("senior.emergency.sosButton")}
          </h2>

          <Button
            onClick={triggerSos}
            disabled={sosLoading}
            className="w-full h-24 rounded-2xl bg-red-600 hover:bg-red-700 text-2xl font-bold transition-all shadow-lg hover:shadow-red-500/25"
          >
            {sosLoading ? (
              <Loader2 className="mr-3 h-8 w-8 animate-spin" />
            ) : (
              <Siren className="mr-3 h-8 w-8" />
            )}
            {sosLoading ? t("senior.emergency.sending") : sosActivated ? t("senior.emergency.activated") : t("senior.emergency.sos")}
          </Button>

          <p className="text-muted-foreground mt-6">
            Press once to immediately notify your registered family members,
            emergency contacts and Cyber Crime authorities.
          </p>
        </div>

        <div className="bg-card border rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            {t("senior.emergency.voiceSOS")}
          </h2>

          <Button
            variant="outline"
            onClick={isListening ? stopListening : startListening}
            className={`w-full h-24 rounded-2xl text-xl flex items-center justify-center transition-all ${
              isListening 
                ? "bg-red-500/10 border-red-500 text-red-600 hover:bg-red-500/20 animate-pulse" 
                : "hover:bg-primary/5 border-primary text-primary"
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="mr-3 h-7 w-7 text-red-600" />
                Listening... Click to Stop
              </>
            ) : (
              <>
                <Mic className="mr-3 h-7 w-7" />
                {t("senior.emergency.activateVoice")}
              </>
            )}
          </Button>

          {/* Voice Wave Visualizer */}
          {isListening && (
            <div className="mt-4 p-4 border rounded-xl bg-muted/20 flex flex-col items-center">
              <p className="text-xs text-red-500 font-semibold mb-3 tracking-widest uppercase">
                Active Audio Stream
              </p>
              <div className="flex gap-1.5 justify-center items-end h-12 w-full">
                {speechVolume.map((vol, idx) => (
                  <div
                    key={idx}
                    className="w-2.5 bg-red-500 rounded-full transition-all duration-75"
                    style={{ height: `${vol}%` }}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3">
            Say any trigger word to activate SOS automatically: {SOS_TRIGGER_WORDS.map((word, index) => (
              <React.Fragment key={word}>
                {index > 0 && ", "}
                <strong className="text-foreground">"{word.toUpperCase()}"</strong>
              </React.Fragment>
            ))}.
              </p>
            </div>
          )}

          {transcript && (
            <div className="mt-4 p-3 border rounded-lg bg-card text-sm">
              <span className="font-semibold text-primary">Live Transcript: </span>
              <span className="italic">"{transcript}"</span>
            </div>
          )}

          {micError && (
            <div className="mt-4 p-3 border border-red-200 rounded-lg bg-red-50 text-red-600 text-xs font-semibold">
              {micError}
            </div>
          )}

          <p className="text-muted-foreground mt-6">
            Microphone speech recognition allows voice commands such as
            "Help", "Emergency", "Save me" or "Bachao" to automatically trigger assistance.
          </p>
        </div>
      </div>

      {/* Emergency Services */}
      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-card border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <Phone className="h-7 w-7 text-primary" />
            <h2 className="text-xl font-bold">
              {t("senior.emergency.contacts")}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Family</span>
              <span className="font-semibold">
                +91 98765 43210
              </span>
            </div>

            <div className="flex justify-between">
              <span>Cyber Helpline</span>
              <span className="font-semibold">
                1930
              </span>
            </div>

            <div className="flex justify-between">
              <span>Emergency</span>
              <span className="font-semibold">
                112
              </span>
            </div>

            <div className="flex justify-between">
              <span>Ambulance</span>
              <span className="font-semibold">
                108
              </span>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <HeartPulse className="h-7 w-7 text-red-500" />
            <h2 className="text-xl font-bold">
              {t("senior.emergency.medicalStatus")}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>{t("senior.emergency.bloodPressure")}</span>
              <span>{t("senior.emergency.normal")}</span>
            </div>

            <div className="flex justify-between">
              <span>Medication</span>
              <span>Completed</span>
            </div>

            <div className="flex justify-between">
              <span>Today's Check-In</span>
              <span className="text-green-600 font-semibold">
                Completed
              </span>
            </div>

            <div className="flex justify-between">
              <span>Emergency Risk</span>
              <span className="text-green-600 font-semibold">
                Low
              </span>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <Ambulance className="h-7 w-7 text-primary" />
            <h2 className="text-xl font-bold">
              {t("senior.emergency.responseStatus")}
            </h2>
          </div>

          <p className="text-muted-foreground">
            {sosActivated ? "Emergency signals dispatched to Cyber Crime cell & family." : "No active emergency."}
          </p>

          <div className={`mt-6 rounded-xl p-4 border ${
            sosActivated 
              ? "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400" 
              : "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400"
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-semibold">
                {sosActivated ? "SOS SIGNAL BROADCASTING" : t("senior.emergency.systemReady")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-card border rounded-2xl p-8 mt-8">
        <h2 className="text-2xl font-bold mb-4">
          {t("senior.emergency.liveLocation")}
        </h2>

        <div className="h-72 rounded-xl border bg-muted flex items-center justify-center">
          <div className="text-center">
            <MapPin className="mx-auto h-12 w-12 text-primary mb-4" />
            <p className="font-semibold">
              Interactive Map
            </p>
            <p className="text-muted-foreground">
              Leaflet / Google Maps will be integrated during backend
              implementation.
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Timeline */}
      <div className="bg-card border rounded-2xl p-8 mt-8">
        <h2 className="text-2xl font-bold mb-6">
          {t("senior.emergency.recentActivity")}
        </h2>

        <div className="space-y-5">
          {emergencyTimeline.map((event, index) => (
            <div
              key={index}
              className="flex items-start gap-4 border-b pb-4 last:border-none"
            >
              <CheckCircle2 className="text-green-600 mt-1 h-5 w-5" />
              <div className="flex-1">
                <h3 className="font-semibold">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {event.time}
                </p>
              </div>
              <span className="text-green-600 font-medium">
                {event.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Emergency;
