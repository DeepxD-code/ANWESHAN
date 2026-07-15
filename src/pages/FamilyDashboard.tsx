import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const FamilyDashboard = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            {t("family.dashboard.title")}
          </h1>

          <p className="text-muted-foreground mt-2">
            {t("family.dashboard.subtitle")}
          </p>

        </div>

        {/* Top Cards */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("family.dashboard.seniorStatus")}
            </p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {t("family.dashboard.safe")}
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("family.dashboard.lastCheckin")}
            </p>

            <h2 className="text-xl font-semibold mt-2">
              Today • 10:42 AM
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("family.dashboard.activeAlerts")}
            </p>

            <h2 className="text-3xl font-bold text-orange-500 mt-2">
              1
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("family.dashboard.currentLocation")}
            </p>

            <h2 className="text-xl font-semibold mt-2">
              Ahmedabad
            </h2>

          </div>

        </div>

        {/* Main Grid */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Senior Status */}

          <div className="bg-card border rounded-2xl p-6">

            <h2 className="text-2xl font-semibold mb-5">
              {t("family.dashboard.seniorStatus")}
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between border-b pb-2">
                <span>{t("family.dashboard.name")}</span>
                <span className="font-semibold">
                  Ramesh Patel
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>{t("family.dashboard.health")}</span>
                <span className="text-green-600 font-semibold">
                  {t("family.dashboard.good")}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>{t("family.dashboard.lastLocation")}</span>
                <span className="font-semibold">
                  Satellite, Ahmedabad
                </span>
              </div>

              <div className="flex justify-between">
                <span>{t("family.dashboard.lastActivity")}</span>
                <span className="font-semibold">
                  10:42 AM Today
                </span>
              </div>

            </div>

          </div>
                    {/* Emergency Alerts */}

                    <div className="bg-card border rounded-2xl p-6">

<h2 className="text-2xl font-semibold mb-5">
  {t("family.dashboard.emergencyAlerts")}
</h2>

<div className="space-y-4">

  <div className="border rounded-xl p-4 flex justify-between">

    <div>

      <h3 className="font-semibold">
        {t("family.dashboard.activeSOS")}
      </h3>

      <p className="text-muted-foreground">
        {t("family.dashboard.noEmergency")}
      </p>

    </div>

    <span className="text-green-600 font-semibold">
      {t("family.dashboard.safe")}
    </span>

  </div>

  <div className="border rounded-xl p-4 flex justify-between">

    <div>

      <h3 className="font-semibold">
        {t("family.dashboard.cyberAlert")}
      </h3>

      <p className="text-muted-foreground">
        {t("family.dashboard.linksReported")}
      </p>

    </div>

    <span className="text-orange-500 font-semibold">
      {t("family.dashboard.attention")}
    </span>

  </div>

</div>

</div>

{/* Health Overview */}

<div className="bg-card border rounded-2xl p-6">

<h2 className="text-2xl font-semibold mb-5">
  {t("family.dashboard.healthOverview")}
</h2>

<div className="space-y-4">

  <div className="flex justify-between">
    <span>{t("family.dashboard.medication")}</span>
    <span className="text-green-600 font-semibold">
      {t("family.dashboard.completed")}
    </span>
  </div>

  <div className="flex justify-between">
    <span>{t("family.dashboard.dailyCheckin")}</span>
    <span className="text-green-600 font-semibold">
      {t("family.dashboard.completed")}
    </span>
  </div>

  <div className="flex justify-between">
    <span>{t("family.dashboard.wellness")}</span>
    <span className="font-semibold">
      {t("family.dashboard.stable")}
    </span>
  </div>

  <div className="flex justify-between">
    <span>{t("family.dashboard.wearable")}</span>
    <span className="text-green-600 font-semibold">
      {t("family.dashboard.connected")}
    </span>
  </div>

</div>

</div>

{/* Emergency Contacts */}

<div className="bg-card border rounded-2xl p-6">

<h2 className="text-2xl font-semibold mb-5">
  {t("family.dashboard.emergencyContacts")}
</h2>

<div className="space-y-4">

  <Button className="w-full" onClick={() => { window.location.href = 'tel:+919876543210'; }}>
    {t("family.dashboard.callSenior")}
  </Button>

  <Button
    variant="outline"
    className="w-full"
    onClick={() => { window.location.href = 'tel:1930'; }}
  >
    {t("family.dashboard.callHelpline")}
  </Button>

  <Button
    variant="outline"
    className="w-full"
    onClick={() => { window.location.href = 'tel:112'; }}
  >
    {t("family.dashboard.callEmergency")}
  </Button>

</div>

</div>

</div>
        {/* Recent Activity */}

        <div className="bg-card border rounded-2xl p-6 mt-8">

          <h2 className="text-2xl font-semibold mb-5">
            {t("family.dashboard.recentActivity")}
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between border-b pb-3">
              <span>Daily Wellness Check Completed</span>
              <span className="text-muted-foreground">
                Today • 10:42 AM
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Medication Reminder Completed</span>
              <span className="text-muted-foreground">
                Today • 08:00 AM
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Community Cyber Alert Viewed</span>
              <span className="text-muted-foreground">
                Yesterday
              </span>
            </div>

            <div className="flex justify-between">
              <span>Fraud Complaint Submitted</span>
              <span className="text-muted-foreground">
                10 Jul 2026
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default FamilyDashboard;