import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

import {
  HeartPulse,
  Activity,
  ShieldCheck,
  CalendarDays,
  Watch,
  Stethoscope,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const Health = () => {
  const { t } = useLanguage();

  const reminders = [
    {
      title: "Blood Pressure Medicine",
      time: "08:00 AM",
      status: "Completed",
    },
    {
      title: "Evening Walk",
      time: "06:30 PM",
      status: "Pending",
    },
    {
      title: "Doctor Appointment",
      time: "15 Jul 2026",
      status: "Upcoming",
    },
  ];

  return (

    <div className="min-h-screen bg-background p-6">

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

          <h2 className="text-3xl font-bold">
            {t("senior.health.completed")}
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

          <div className="space-y-4"></div>
          {reminders.map((item, index) => (

<div
  key={index}
  className="flex items-center justify-between border rounded-xl p-4"
>

  <div>

    <h3 className="font-semibold">
      {item.title}
    </h3>

    <p className="text-sm text-muted-foreground">
      {item.time}
    </p>

  </div>

  <span
    className={`px-3 py-1 rounded-full text-sm font-medium
    ${
      item.status === "Completed"
        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
        : item.status === "Pending"
        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
    }`}
  >
    {item.status}
  </span>

</div>

))}

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