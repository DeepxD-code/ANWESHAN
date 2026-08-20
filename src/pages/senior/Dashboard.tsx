import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Loader2, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import API_BASE from "@/lib/api";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { t } = useLanguage();

  const [checkingIn, setCheckingIn] = useState(false);
  const [lastCheckInTime, setLastCheckInTime] = useState<string | null>(null);
  const [checkInError, setCheckInError] = useState("");

  const getLocation = (): Promise<{ lat: number | null; lon: number | null }> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({ lat: null, lon: null });
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        () => resolve({ lat: null, lon: null }),
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
      );
    });
  };

  const doCheckIn = async () => {
    setCheckingIn(true);
    setCheckInError("");
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const coords = await getLocation();
      const response = await fetch(`${API_BASE}/checkins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id || "demo-senior",
          latitude: coords.lat,
          longitude: coords.lon,
          location: coords.lat ? "Device GPS Location" : "Ahmedabad, Gujarat",
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setCheckInError(data.message || "Check-in failed.");
        return;
      }
      setLastCheckInTime(new Date().toLocaleTimeString());
    } catch (err) {
      console.error(err);
      setCheckInError("Unable to connect to server.");
    } finally {
      setCheckingIn(false);
    }
  };

  const quickActions = [
    {
      title: t("senior.dashboard.emergencySOS"),
      path: "/senior/emergency",
      color: "bg-orange-500"
    },
    {
      title: t("senior.dashboard.evidenceVault"),
      path: "/senior/fraud-centre",
      color: "bg-blue-600"
    },
    {
      title: t("senior.dashboard.communityAlerts"),
      path: "/senior/community",
      color: "bg-green-600"
    }
  ];

  return (

    <div className="min-h-screen bg-background p-6">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}

        <div className="bg-card border rounded-2xl p-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h1 className="text-4xl font-bold">
                {t("senior.dashboard.greeting")}, Ramesh Patel 👋
              </h1>

              <p className="text-muted-foreground mt-3">
                Welcome back to your ANWESHAN dashboard. Here's your safety,
                health and emergency overview for today.
              </p>

            </div>

            <div className="mt-6 lg:mt-0">

              <div className="bg-green-100 dark:bg-green-900/30 rounded-xl px-6 py-4 text-center">

                <p className="text-sm text-muted-foreground">
                  {t("senior.dashboard.overallSafety")}
                </p>

                <h2 className="text-3xl font-bold text-green-600">
                  {t("senior.dashboard.safe")}
                </h2>

              </div>

            </div>

          </div>

        </div>



        {/* Overview */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">

          <div className="bg-card border rounded-xl p-6">

            <p className="text-muted-foreground">
              {t("senior.dashboard.cyberRisk")}
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              18%
            </h2>

            <p className="text-sm mt-2">
              {t("senior.dashboard.lowRisk")}
            </p>

          </div>



          <div className="bg-card border rounded-xl p-6">

            <p className="text-muted-foreground">
              {t("senior.dashboard.healthStatus")}
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              Good
            </h2>

            <p className="text-sm mt-2">
              Daily Check-In Completed
            </p>

          </div>



          <div className="bg-card border rounded-xl p-6">

            <p className="text-muted-foreground">
              {t("senior.dashboard.activeCases")}
            </p>

            <h2 className="text-4xl font-bold text-orange-600 mt-2">
              1
            </h2>

            <p className="text-sm mt-2">
              {t("senior.dashboard.underInvestigation")}
            </p>

          </div>



          <div className="bg-card border rounded-xl p-6">

            <p className="text-muted-foreground">
              {t("senior.dashboard.emergencyContacts")}
            </p>

            <h2 className="text-4xl font-bold mt-2">
              3
            </h2>

            <p className="text-sm mt-2">
              {t("senior.dashboard.verifiedContacts")}
            </p>

          </div>

        </div>



        {/* Quick Actions */}

        <div>

          <h2 className="text-2xl font-bold mb-5">
            {t("senior.dashboard.quickActions")}
          </h2>

          <div className="grid md:grid-cols-4 gap-5">

            {quickActions.map((item) => (

              <Link
                key={item.title}
                to={item.path}
                className={`${item.color} text-white rounded-2xl p-6 hover:scale-105 transition`}
              >

                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>

              </Link>

            ))}

            {/* Daily Check-in Card */}
            <button
              onClick={doCheckIn}
              disabled={checkingIn}
              className="bg-primary text-primary-foreground rounded-2xl p-6 hover:scale-105 transition text-left"
            >
              {checkingIn ? (
                <Loader2 className="h-6 w-6 animate-spin mb-2" />
              ) : lastCheckInTime ? (
                <CheckCircle2 className="h-6 w-6 mb-2 text-green-200" />
              ) : (
                <CheckCircle2 className="h-6 w-6 mb-2" />
              )}
              <h3 className="text-xl font-semibold">
                {checkingIn ? "Checking in..." : lastCheckInTime ? "Checked In ✓" : "Daily Check-in"}
              </h3>
              <p className="text-sm mt-1 opacity-80">
                {lastCheckInTime
                  ? `Last: ${lastCheckInTime}`
                  : "Tap to confirm you're safe"}
              </p>
              {checkInError && (
                <p className="text-xs mt-2 text-red-100">{checkInError}</p>
              )}
            </button>

          </div>

        </div>
                {/* Dashboard Grid */}

                <div className="grid lg:grid-cols-2 gap-6">

{/* Community Alerts */}

<div className="bg-card border rounded-2xl p-6">

  <h2 className="text-2xl font-semibold mb-5">
    Latest Community Alert
  </h2>

  <div className="border rounded-xl p-4">

    <div className="flex items-center justify-between">

      <span className="font-semibold">
        Digital Arrest Scam
      </span>

      <span className="bg-red-100 dark:bg-red-900/30 text-red-600 px-3 py-1 rounded-full text-sm">
        High Risk
      </span>

    </div>

    <p className="text-muted-foreground mt-3">
      Fraudsters are impersonating Cyber Crime officers and demanding
      immediate payment to avoid arrest. Never transfer money without
      official verification.
    </p>

  </div>

</div>



{/* Medication */}

<div className="bg-card border rounded-2xl p-6">

  <h2 className="text-2xl font-semibold mb-5">
    Today's Reminder
  </h2>

  <div className="space-y-4">

    <div className="border rounded-xl p-4">

      <h3 className="font-semibold">
        Blood Pressure Medicine
      </h3>

      <p className="text-muted-foreground">
        08:00 AM • Completed
      </p>

    </div>

    <div className="border rounded-xl p-4">

      <h3 className="font-semibold">
        Evening Walk
      </h3>

      <p className="text-muted-foreground">
        06:30 PM • Pending
      </p>

    </div>

  </div>

</div>



{/* Mock Message Inbox */}

<div className="bg-card border rounded-2xl p-6">

  <h2 className="text-2xl font-semibold mb-5">
    Recent Messages
  </h2>

  <div className="space-y-4">

    <div className="border rounded-xl p-4 bg-muted/20">
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>From: +91 9876543210</span>
        <span>10:30 AM</span>
      </div>
      <p className="font-medium text-lg mb-4">
        Dear customer, your bank account will be suspended today. Click here to update KYC: http://secure-bankofamerica.com/update
      </p>
      
      <button 
        onClick={() => alert("Alert sent to your guardian. They will help you classify the fraud.")}
        className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 rounded-lg transition-colors border border-red-200"
      >
        🚩 Flag as Suspicious
      </button>
    </div>
    
    <div className="border rounded-xl p-4 bg-muted/20">
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>From: Rajesh Patel</span>
        <span>Yesterday</span>
      </div>
      <p className="font-medium text-lg">
        Hi Dad, I will come over for dinner tomorrow.
      </p>
    </div>

  </div>

</div>



{/* Emergency Contacts */}

<div className="bg-card border rounded-2xl p-6">

  <h2 className="text-2xl font-semibold mb-5">
    Emergency Contacts
  </h2>

  <div className="space-y-3">

    <div className="flex justify-between">

      <span>Rajesh Patel</span>

      <span className="text-primary">
        Son
      </span>

    </div>

    <div className="flex justify-between">

      <span>Dr. Mehul Shah</span>

      <span className="text-primary">
        Doctor
      </span>

    </div>

    <div className="flex justify-between">

      <span>Cyber Helpline</span>

      <span className="font-semibold">
        1930
      </span>

    </div>

  </div>

</div>

</div>



{/* AI Safety Tip */}

<div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">

<h2 className="text-2xl font-semibold mb-4">
  {t("senior.dashboard.tipOfDay")}
</h2>

<p className="text-muted-foreground">
  Never share OTPs, UPI PINs or banking passwords with anyone.
  Cyber Crime officers, banks and government agencies will never ask
  you to transfer money or reveal confidential credentials over a
  phone call or WhatsApp.
</p>

</div>



{/* Activity */}

<div className="bg-card border rounded-2xl p-6">

<h2 className="text-2xl font-semibold mb-5">
  {t("senior.dashboard.todaysActivity")}
</h2>

<div className="space-y-4">

  <div className="flex justify-between border-b pb-3">

    <span>
      Daily Wellness Check Completed
    </span>

    <span className="text-muted-foreground">
      10:42 AM
    </span>

  </div>

  <div className="flex justify-between border-b pb-3">

    <span>
      Community Alert Viewed
    </span>

    <span className="text-muted-foreground">
      09:30 AM
    </span>

  </div>

  <div className="flex justify-between">

    <span>
      Medication Reminder Completed
    </span>

    <span className="text-muted-foreground">
      08:05 AM
    </span>

  </div>

</div>

</div>



{/* Footer */}

<div className="text-center text-sm text-muted-foreground pb-6">

{t("senior.dashboard.lastSync")}
{" "}
Today • 11:08 AM

</div>

</div>

</div>

);

};

export default Dashboard;