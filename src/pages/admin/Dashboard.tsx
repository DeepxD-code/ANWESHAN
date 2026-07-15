import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const { t } = useLanguage();

  return (

    <div className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              {t("admin.dashboard.title")}
            </h1>

            <p className="text-muted-foreground mt-2">
              {t("admin.dashboard.subtitle")}
            </p>

          </div>

          <Button>
            {t("admin.dashboard.generateReport")}
          </Button>

        </div>



        {/* Top Cards */}

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("admin.dashboard.registeredSeniors")}
            </p>

            <h2 className="text-4xl font-bold mt-2">
              12,846
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("admin.dashboard.cyberOfficers")}
            </p>

            <h2 className="text-4xl font-bold text-primary mt-2">
              38
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("admin.dashboard.activeCases")}
            </p>

            <h2 className="text-4xl font-bold text-orange-500 mt-2">
              61
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("admin.dashboard.platformUptime")}
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              99.9%
            </h2>

          </div>

        </div>



        <div className="grid lg:grid-cols-2 gap-8">
                      {/* System Health */}

          <div className="bg-card border rounded-2xl p-6">

<h2 className="text-2xl font-semibold mb-6">
  {t("admin.dashboard.systemHealth")}
</h2>

<div className="space-y-5">

  <div className="border rounded-xl p-4">

    <p className="text-muted-foreground">
      {t("admin.dashboard.apiServer")}
    </p>

    <h3 className="text-xl font-bold text-green-600">
      {t("admin.dashboard.operational")}
    </h3>

  </div>

  <div className="border rounded-xl p-4">

    <p className="text-muted-foreground">
      Database
    </p>

    <h3 className="text-xl font-bold text-green-600">
      Connected
    </h3>

  </div>

  <div className="border rounded-xl p-4">

    <p className="text-muted-foreground">
      AI Detection Engine
    </p>

    <h3 className="text-xl font-bold text-orange-500">
      Monitoring
    </h3>

  </div>

  <div className="border rounded-xl p-4">

    <p className="text-muted-foreground">
      Emergency Services
    </p>

    <h3 className="text-xl font-bold text-green-600">
      Online
    </h3>

  </div>

</div>

</div>



{/* Recent Activity */}

<div className="bg-card border rounded-2xl p-6">

<h2 className="text-2xl font-semibold mb-6">
  {t("admin.dashboard.recentActivity")}
</h2>

<div className="space-y-4">

  <div className="border rounded-xl p-4">

    <h3 className="font-semibold">
      New Senior Registration
    </h3>

    <p className="text-muted-foreground">
      24 new users joined today.
    </p>

  </div>

  <div className="border rounded-xl p-4">

    <h3 className="font-semibold">
      High Risk Scam Alert
    </h3>

    <p className="text-muted-foreground">
      AI detected a spike in Digital Arrest scams.
    </p>

  </div>

  <div className="border rounded-xl p-4">

    <h3 className="font-semibold">
      Emergency Response
    </h3>

    <p className="text-muted-foreground">
      Average response time today: 2.4 minutes.
    </p>

  </div>

  <div className="border rounded-xl p-4">

    <h3 className="font-semibold">
      Evidence Uploaded
    </h3>

    <p className="text-muted-foreground">
      47 new evidence files received today.
    </p>

  </div>

</div>

</div>

</div>



{/* Quick Actions */}

<div className="bg-card border rounded-2xl p-6 mt-8">

<h2 className="text-2xl font-semibold mb-6">
{t("admin.dashboard.adminActions")}
</h2>

<div className="grid md:grid-cols-4 gap-4">

<Button>
  {t("admin.dashboard.manageUsers")}
</Button>

<Button variant="outline">
  {t("admin.dashboard.viewAnalytics")}
</Button>

<Button variant="outline">
  {t("admin.dashboard.platformSettings")}
</Button>

<Button variant="outline">
  {t("admin.dashboard.systemLogs")}
</Button>

</div>

</div>

</div>

</div>

);

};

export default Dashboard;