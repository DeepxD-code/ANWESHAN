import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            {t("officer.dashboard.title")}
          </h1>

          <p className="text-muted-foreground mt-2">
            Ahmedabad Cyber Crime Branch • Real-time monitoring of complaints,
            emergencies and investigations.
          </p>
        </div>

        {/* Overview */}

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">

          <div className="bg-card border rounded-2xl p-6">
            <p className="text-muted-foreground">
              {t("officer.dashboard.activeComplaints")}
            </p>

            <h2 className="text-4xl font-bold mt-2">
              42
            </h2>
          </div>

          <div className="bg-card border rounded-2xl p-6">
            <p className="text-muted-foreground">
              {t("officer.dashboard.activeEmergencies")}
            </p>

            <h2 className="text-4xl font-bold text-red-600 mt-2">
              3
            </h2>
          </div>

          <div className="bg-card border rounded-2xl p-6">
            <p className="text-muted-foreground">
              {t("officer.dashboard.officersOnline")}
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              18
            </h2>
          </div>

          <div className="bg-card border rounded-2xl p-6">
            <p className="text-muted-foreground">
              {t("officer.dashboard.resolvedToday")}
            </p>

            <h2 className="text-4xl font-bold text-primary mt-2">
              27
            </h2>
          </div>

        </div>

        {/* Main Grid */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Recent Complaints */}

          <div className="bg-card border rounded-2xl p-6">

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                {t("officer.dashboard.recentComplaints")}
              </h2>

              <Button size="sm" onClick={() => navigate('/officer/complaints')}>
                {t("officer.dashboard.viewAll")}
              </Button>
            </div>

            <div className="space-y-4">

              <div className="border rounded-xl p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">
                      UPI Refund Scam
                    </h3>

                    <p className="text-muted-foreground">
                      Complaint ID: ANW-2026-00124
                    </p>
                  </div>

                  <span className="text-orange-500 font-semibold">
                    Investigating
                  </span>
                </div>
              </div>

              <div className="border rounded-xl p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">
                      WhatsApp Investment Scam
                    </h3>

                    <p className="text-muted-foreground">
                      Complaint ID: ANW-2026-00126
                    </p>
                  </div>

                  <span className="text-red-600 font-semibold">
                    High Priority
                  </span>
                </div>
              </div>

              <div className="border rounded-xl p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">
                      Fake Courier Scam
                    </h3>

                    <p className="text-muted-foreground">
                      Complaint ID: ANW-2026-00129
                    </p>
                  </div>

                  <span className="text-green-600 font-semibold">
                    Resolved
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Emergency Monitor */}

          <div className="bg-card border rounded-2xl p-6">

            <h2 className="text-2xl font-semibold mb-6">
              {t("officer.dashboard.liveMonitor")}
            </h2>

            <div className="space-y-5">

              <div className="border rounded-xl p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">
                      SOS Triggered
                    </h3>

                    <p className="text-muted-foreground">
                      Ramesh Patel • Satellite
                    </p>
                  </div>

                  <span className="text-red-600 font-bold">
                    ACTIVE
                  </span>
                </div>
              </div>

              <div className="border rounded-xl p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">
                      Medical Alert
                    </h3>

                    <p className="text-muted-foreground">
                      Anita Shah • Navrangpura
                    </p>
                  </div>

                  <span className="text-orange-500 font-bold">
                    RESPONDING
                  </span>
                </div>
              </div>

              <div className="border rounded-xl p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">
                      Daily Welfare Check
                    </h3>

                    <p className="text-muted-foreground">
                      Completed Successfully
                    </p>
                  </div>

                  <span className="text-green-600 font-bold">
                    OK
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="bg-card border rounded-2xl p-6 mt-8">

          <h2 className="text-2xl font-semibold mb-6">
            {t("officer.dashboard.quickActions")}
          </h2>

          <div className="grid md:grid-cols-4 gap-4">

            <Button onClick={() => navigate('/officer/complaints')}>
              {t("officer.dashboard.reviewComplaints")}
            </Button>

            <Button variant="outline" onClick={() => navigate('/officer/cases')}>
              {t("officer.dashboard.openCases")}
            </Button>

            <Button variant="outline" onClick={() => navigate('/officer/evidence')}>
              {t("officer.dashboard.evidenceVault")}
            </Button>

            <Button variant="outline" onClick={() => navigate('/officer/emergency-monitor')}>
              {t("officer.dashboard.emergencyMonitor")}
            </Button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
