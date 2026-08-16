import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDailyCheckIn } from "@/hooks/use-daily-checkin";

import {
  HeartPulse,
  Activity,
  ShieldCheck,
  CalendarDays,
  Watch,
  Stethoscope,
  Bell,
  CheckCircle2,
  Clock,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const Health = () => {
  const { t } = useLanguage();
  const { reminders, nextReminder, completeReminder, skipReminder, removeReminder } = useDailyCheckIn();
  const [showNotification, setShowNotification] = useState(false);

  // Show notification when reminder is due
  useEffect(() => {
    if (nextReminder) {
      setShowNotification(true);
      // Auto-hide notification after 10 seconds, but keep reminding
      const timer = setTimeout(() => setShowNotification(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [nextReminder]);

  const handleCompleteReminder = (reminderId: string) => {
    completeReminder(reminderId);
    setShowNotification(false);
  };

  const handleSkipReminder = (reminderId: string) => {
    skipReminder(reminderId);
    setShowNotification(false);
  };

  // Get status counts
  const completedCount = reminders.filter(r => r.isCompleted).length;
  const pendingCount = reminders.filter(r => !r.isCompleted).length;

  return (

    <div className="min-h-screen bg-background p-6">

      {/* Notification Banner for Due Reminders */}
      {showNotification && nextReminder && (
        <div className="fixed top-4 right-4 z-50 w-full max-w-md bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-2xl animate-in slide-in-from-top">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bell className="h-6 w-6 animate-bounce" />
              <div>
                <h3 className="font-bold text-lg">{nextReminder.title}</h3>
                <p className="text-sm opacity-90">{nextReminder.scheduledTime}</p>
              </div>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-white/80 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => handleCompleteReminder(nextReminder.id)}
              className="flex-1 bg-white text-blue-600 hover:bg-white/90 font-semibold"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark Complete
            </Button>
            <Button
              onClick={() => handleSkipReminder(nextReminder.id)}
              variant="outline"
              className="flex-1 bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              Skip
            </Button>
          </div>
        </div>
      )}

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          {t("senior.health.title")}
        </h1>

        <p className="text-muted-foreground mt-2">
          Monitor your daily health, wellness activities and emergency medical profile.
        </p>

      </div>



      {/* Overview */}

      <div className="grid lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-card border rounded-2xl p-6">

          <HeartPulse className="h-8 w-8 text-red-500 mb-3" />

          <p className="text-muted-foreground">
            {t("senior.health.overall")}
          </p>

          <h2 className="text-3xl font-bold text-green-600">
            {t("senior.health.good")}
          </h2>

        </div>



        <div className="bg-card border rounded-2xl p-6">

          <Activity className="h-8 w-8 text-primary mb-3" />

          <p className="text-muted-foreground">
            {t("senior.health.dailyCheckin")}
          </p>

          <h2 className="text-3xl font-bold text-green-600">
            {completedCount}/{reminders.length}
          </h2>

        </div>



        <div className="bg-card border rounded-2xl p-6">

          <Watch className="h-8 w-8 text-primary mb-3" />

          <p className="text-muted-foreground">
            {t("senior.health.wearable")}
          </p>

          <h2 className="text-3xl font-bold">
            {t("senior.health.connected")}
          </h2>

        </div>



        <div className="bg-card border rounded-2xl p-6">

          <ShieldCheck className="h-8 w-8 text-primary mb-3" />

          <p className="text-muted-foreground">
            {t("senior.health.emergencyProfile")}
          </p>

          <h2 className="text-3xl font-bold">
            {t("senior.health.updated")}
          </h2>

        </div>

      </div>



      {/* Health Cards */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-card border rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            {t("senior.health.vitals")}
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>{t("senior.health.bloodPressure")}</span>

              <strong>120 / 80 mmHg</strong>

            </div>

            <div className="flex justify-between">

              <span>Heart Rate</span>

              <strong>74 BPM</strong>

            </div>

            <div className="flex justify-between">

              <span>Blood Sugar</span>

              <strong>98 mg/dL</strong>

            </div>

            <div className="flex justify-between">

              <span>Oxygen Level</span>

              <strong>98%</strong>

            </div>

            <div className="flex justify-between">

              <span>Body Temperature</span>

              <strong>98.4°F</strong>

            </div>

          </div>

        </div>



        <div className="bg-card border rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-6">

            <CalendarDays className="h-7 w-7 text-primary" />

            <h2 className="text-2xl font-bold">
              {t("senior.health.reminders")}
            </h2>

          </div>

          <div className="space-y-4">
          {reminders.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No reminders set. Add daily check-ins to stay healthy!</p>
          ) : (
            reminders.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded-xl p-4 hover:bg-muted/30 transition-colors"
              >

                <div className="flex-1">

                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3" />
                    {item.scheduledTime}
                  </p>

                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      item.isCompleted
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {item.isCompleted ? "Done" : "Due"}
                  </span>
                  {!item.isCompleted && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCompleteReminder(item.id)}
                      className="h-8 w-8 p-0"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </Button>
                  )}
                </div>

              </div>
            ))
          )}
          </div>

        </div>

      </div>



{/* Medical Profile */}

<div className="grid lg:grid-cols-2 gap-6 mt-8">

<div className="bg-card border rounded-2xl p-6">

<div className="flex items-center gap-3 mb-5">

<Stethoscope className="h-7 w-7 text-primary" />

<h2 className="text-2xl font-bold">
  {t("senior.health.medicalProfile")}
</h2>

</div>

<div className="space-y-4">

<div className="flex justify-between">
  <span>Blood Group</span>
  <strong>B+</strong>
</div>

<div className="flex justify-between">
  <span>Allergies</span>
  <strong>None</strong>
</div>

<div className="flex justify-between">
  <span>Medical Conditions</span>
  <strong>Hypertension</strong>
</div>

<div className="flex justify-between">
  <span>Primary Doctor</span>
  <strong>Dr. Mehul Shah</strong>
</div>

<div className="flex justify-between">
  <span>Emergency Contact</span>
  <strong>Rajesh Patel</strong>
</div>

</div>

</div>



<div className="bg-card border rounded-2xl p-6">

<h2 className="text-2xl font-bold mb-5">
{t("senior.health.recommendations")}
</h2>

<ul className="space-y-3 text-muted-foreground list-disc pl-6">

<li>
  Complete your daily wellness check-in every morning.
</li>

<li>
  Continue taking prescribed medication on schedule.
</li>

<li>
  Walk for at least 30 minutes every day.
</li>

<li>
  Keep your emergency medical profile updated.
</li>

<li>
  Wear your connected health device whenever possible.
</li>

</ul>

<Button className="mt-8">

{t("senior.health.updateProfile")}

</Button>

</div>

</div>

</div>

);

};

export default Health;