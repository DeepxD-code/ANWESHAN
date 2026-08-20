import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import API_BASE from "@/lib/api";
import { Loader2, CheckCircle2 } from "lucide-react";

const HealthWelfare = () => {
  const { t } = useLanguage();

  const [checkingIn, setCheckingIn] = useState(false);
  const [checkInDone, setCheckInDone] = useState(false);
  const [checkInError, setCheckInError] = useState("");

  const doCheckIn = async () => {
    setCheckingIn(true);
    setCheckInError("");
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await fetch(`${API_BASE}/checkins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id || "demo-senior",
          location: "Ahmedabad, Gujarat",
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setCheckInError(data.message || "Check-in failed.");
        return;
      }
      setCheckInDone(true);
    } catch (err) {
      console.error(err);
      setCheckInError("Unable to connect to server.");
    } finally {
      setCheckingIn(false);
    }
  };

  return (

    <div className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto p-6">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            {t("senior.health.title")}
          </h1>

          <p className="text-muted-foreground mt-2">
            Monitor your daily wellness, medication, emergency medical profile,
            wearable devices and welfare check-ins from one unified dashboard.
          </p>

        </div>



        {/* Summary */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mb-8">

          <div className="bg-card border rounded-2xl p-5">

            <p className="text-muted-foreground">
              {t("senior.health.overall")}
            </p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {t("senior.health.good")}
            </h2>

          </div>



          <div className="bg-card border rounded-2xl p-5">

            <p className="text-muted-foreground">
              {t("senior.health.dailyCheckin")}
            </p>

            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              Completed
            </h2>

          </div>



          <div className="bg-card border rounded-2xl p-5">

            <p className="text-muted-foreground">
              Medication
            </p>

            <h2 className="text-3xl font-bold text-orange-600 mt-2">
              1 Pending
            </h2>

          </div>



          <div className="bg-card border rounded-2xl p-5">

            <p className="text-muted-foreground">
              Wearable
            </p>

            <h2 className="text-3xl font-bold text-primary mt-2">
              {t("senior.health.connected")}
            </h2>

          </div>

        </div>



        {/* Main Grid */}

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Vitals */}

          <div className="bg-card border rounded-2xl p-6">

            <h2 className="text-2xl font-semibold mb-5">
              {t("senior.health.vitals")}
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <div className="border rounded-xl p-4">
                <p className="text-muted-foreground">{t("senior.health.bloodPressure")}</p>
                <h3 className="text-2xl font-bold mt-2">
                  120 / 80
                </h3>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-muted-foreground">Heart Rate</p>
                <h3 className="text-2xl font-bold mt-2">
                  74 BPM
                </h3>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-muted-foreground">Blood Sugar</p>
                <h3 className="text-2xl font-bold mt-2">
                  98 mg/dL
                </h3>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-muted-foreground">Oxygen</p>
                <h3 className="text-2xl font-bold mt-2">
                  98%
                </h3>
              </div>

            </div>

          </div>



          {/* Medication */}

          <div className="bg-card border rounded-2xl p-6">

            <h2 className="text-2xl font-semibold mb-5">
              Medication Schedule
            </h2>

            <div className="space-y-4">

              <div className="border rounded-xl p-4 flex justify-between">

                <div>

                  <h3 className="font-semibold">
                    Blood Pressure Medicine
                  </h3>

                  <p className="text-muted-foreground">
                    08:00 AM
                  </p>

                </div>

                <span className="text-green-600 font-semibold">
              {t("senior.health.completed")}
                </span>

              </div>

              <div className="border rounded-xl p-4 flex justify-between">

                <div>

                  <h3 className="font-semibold">
                    Vitamin D
                  </h3>

                  <p className="text-muted-foreground">
                    08:00 PM
                  </p>

                </div>

                <span className="text-orange-600 font-semibold">
                  Pending
                </span>

              </div>

            </div>

          </div>
                    {/* Emergency Medical Profile */}

                    <div className="bg-card border rounded-2xl p-6">

<h2 className="text-2xl font-semibold mb-5">
  {t("senior.health.medicalProfile")}
</h2>

<div className="space-y-4">

  <div className="flex justify-between border-b pb-2">
    <span>Blood Group</span>
    <span className="font-semibold">B+</span>
  </div>

  <div className="flex justify-between border-b pb-2">
    <span>Medical Conditions</span>
    <span className="font-semibold">Hypertension</span>
  </div>

  <div className="flex justify-between border-b pb-2">
    <span>Allergies</span>
    <span className="font-semibold">None</span>
  </div>

  <div className="flex justify-between border-b pb-2">
    <span>Primary Doctor</span>
    <span className="font-semibold">
      Dr. Mehul Shah
    </span>
  </div>

  <div className="flex justify-between">
    <span>Emergency Contact</span>
    <span className="font-semibold">
      Rajesh Patel
    </span>
  </div>

</div>

</div>



{/* Welfare Monitoring */}

<div className="bg-card border rounded-2xl p-6">

<h2 className="text-2xl font-semibold mb-5">
  Welfare Monitoring
</h2>

<div className="space-y-4">

  <div className="border rounded-xl p-4 flex justify-between">

    <div>

      <h3 className="font-semibold">
        Daily Safety Check-in
      </h3>

      <p className="text-muted-foreground">
        Last completed today at 10:42 AM
      </p>

    </div>

    <span className="text-green-600 font-semibold">
      Completed
    </span>

  </div>

  <div className="border rounded-xl p-4 flex justify-between">

    <div>

      <h3 className="font-semibold">
        Inactivity Monitor
      </h3>

      <p className="text-muted-foreground">
        No unusual inactivity detected
      </p>

    </div>

    <span className="text-green-600 font-semibold">
      Active
    </span>

  </div>

</div>

</div>



{/* Wearable */}

<div className="bg-card border rounded-2xl p-6">

<h2 className="text-2xl font-semibold mb-5">
  Connected Wearable
</h2>

<div className="space-y-3">

  <div className="flex justify-between">
    <span>Device</span>
    <span className="font-semibold">
      Redmi Watch 5
    </span>
  </div>

  <div className="flex justify-between">
    <span>Battery</span>
    <span className="font-semibold">
      82%
    </span>
  </div>

  <div className="flex justify-between">
    <span>Last Sync</span>
    <span className="font-semibold">
      5 Minutes Ago
    </span>
  </div>

  <div className="flex justify-between">
    <span>Status</span>
    <span className="text-green-600 font-semibold">
      Connected
    </span>
  </div>

</div>

</div>



{/* Upcoming */}

<div className="bg-card border rounded-2xl p-6">

<h2 className="text-2xl font-semibold mb-5">
  Upcoming Schedule
</h2>

<div className="space-y-4">

  <div className="border rounded-xl p-4">

    <h3 className="font-semibold">
      Doctor Appointment
    </h3>

    <p className="text-muted-foreground">
      15 July 2026 • 11:00 AM
    </p>

  </div>

  <div className="border rounded-xl p-4">

    <h3 className="font-semibold">
      Wellness Visit
    </h3>

    <p className="text-muted-foreground">
      Scheduled by Family
    </p>

  </div>

</div>

</div>

</div>



{/* Recommendations */}

<div className="bg-card border rounded-2xl p-6 mt-8">

<h2 className="text-2xl font-semibold mb-5">
AI Wellness Recommendations
</h2>

<ul className="space-y-3 list-disc ml-6">

<li>Complete your evening medication.</li>

<li>Walk for at least 30 minutes today.</li>

<li>Stay hydrated and monitor blood pressure.</li>

<li>Keep your emergency profile updated.</li>

<li>Continue daily wellness check-ins.</li>

</ul>

</div>



{/* Actions */}

<div className="flex flex-wrap gap-4 mt-8">

<Button onClick={doCheckIn} disabled={checkingIn}>
{checkingIn ? (
  <>
    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    Checking in...
  </>
) : checkInDone ? (
  <>
    <CheckCircle2 className="mr-2 h-4 w-4" />
    Checked In ✓
  </>
) : (
  "Complete Daily Check-in"
)}
</Button>

{checkInError && (
  <p className="text-red-500 text-sm w-full">{checkInError}</p>
)}

<Button variant="outline">
{t("senior.health.updateProfile")}
</Button>

<Button variant="outline">
Sync Wearable
</Button>

</div>

</div>

</div>

);

};

export default HealthWelfare;