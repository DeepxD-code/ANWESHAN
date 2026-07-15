import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Analytics = () => {
  const { t } = useLanguage();

  return (

    <div className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              {t("admin.analytics.title")}
            </h1>

            <p className="text-muted-foreground mt-2">
              {t("admin.analytics.subtitle")}
            </p>

          </div>

          <Button>
            {t("admin.analytics.export")}
          </Button>

        </div>



        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("admin.analytics.totalComplaints")}
            </p>

            <h2 className="text-4xl font-bold">
              2,842
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("admin.analytics.activeSeniors")}
            </p>

            <h2 className="text-4xl font-bold text-primary">
              12,846
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("admin.analytics.emergencyResponses")}
            </p>

            <h2 className="text-4xl font-bold text-red-600">
              538
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("admin.analytics.resolutionRate")}
            </p>

            <h2 className="text-4xl font-bold text-green-600">
              91%
            </h2>

          </div>

        </div>



        <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-card border rounded-2xl p-6">

<h2 className="text-2xl font-semibold mb-6">
  {t("admin.analytics.fraudDistribution")}
</h2>

<div className="space-y-5">

  <div className="flex justify-between border-b pb-3">

    <span>{t("admin.analytics.upiFraud")}</span>

    <span className="font-bold">
      34%
    </span>

  </div>

  <div className="flex justify-between border-b pb-3">

    <span>Investment Scam</span>

    <span className="font-bold">
      24%
    </span>

  </div>

  <div className="flex justify-between border-b pb-3">

    <span>OTP Scam</span>

    <span className="font-bold">
      17%
    </span>

  </div>

  <div className="flex justify-between border-b pb-3">

    <span>Digital Arrest</span>

    <span className="font-bold">
      13%
    </span>

  </div>

  <div className="flex justify-between">

    <span>Others</span>

    <span className="font-bold">
      12%
    </span>

  </div>

</div>

</div>



<div className="bg-card border rounded-2xl p-6">

<h2 className="text-2xl font-semibold mb-6">
  {t("admin.analytics.performance")}
</h2>

<div className="space-y-5">

  <div className="border rounded-xl p-4">

    <p className="text-muted-foreground">
      Avg SOS Response
    </p>

    <h3 className="text-xl font-bold">
      2.4 Minutes
    </h3>

  </div>

  <div className="border rounded-xl p-4">

    <p className="text-muted-foreground">
      AI Detection Accuracy
    </p>

    <h3 className="text-xl font-bold">
      94%
    </h3>

  </div>

  <div className="border rounded-xl p-4">

    <p className="text-muted-foreground">
      Evidence Verified
    </p>

    <h3 className="text-xl font-bold">
      96%
    </h3>

  </div>

  <div className="border rounded-xl p-4">

    <p className="text-muted-foreground">
      System Uptime
    </p>

    <h3 className="text-xl font-bold text-green-600">
      99.9%
    </h3>

  </div>

</div>

</div>

</div>



<div className="bg-card border rounded-2xl p-6 mt-8">

<h2 className="text-2xl font-semibold mb-6">
{t("admin.analytics.aiInsights")}
</h2>

<div className="grid md:grid-cols-3 gap-6">

<div className="border rounded-xl p-5">

  <h3 className="font-semibold">
    {t("admin.analytics.highestRiskZone")}
  </h3>

  <p className="text-muted-foreground mt-2">
    Satellite continues to record the highest fraud density.
  </p>

</div>

<div className="border rounded-xl p-5">

  <h3 className="font-semibold">
    {t("admin.analytics.emergingScam")}
  </h3>

  <p className="text-muted-foreground mt-2">
    Fake electricity bill payment scams are increasing rapidly.
  </p>

</div>

<div className="border rounded-xl p-5">

  <h3 className="font-semibold">
    {t("admin.analytics.recommendation")}
  </h3>

  <p className="text-muted-foreground mt-2">
    Push multilingual awareness notifications to senior citizens.
  </p>

</div>

</div>

</div>

</div>

</div>

);

};

export default Analytics;