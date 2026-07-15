import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const OfficerPortal = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const menuItems = [
    {
      name: t("portal.officer.dashboard"),
      path: "/officer/dashboard",
    },
    {
      name: t("portal.officer.complaints"),
      path: "/officer/complaints",
    },
    {
      name: t("portal.officer.cases"),
      path: "/officer/cases",
    },
    {
      name: t("portal.officer.evidence"),
      path: "/officer/evidence",
    },
    {
      name: t("portal.officer.emergencyMonitor"),
      path: "/officer/emergency-monitor",
    },
    {
      name: t("portal.officer.analytics"),
      path: "/officer/analytics",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">

      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-card border-r p-6">

        <h2 className="text-2xl font-bold mb-6">
          ANWESHAN
        </h2>

        <p className="text-sm text-muted-foreground mb-6">
          {t("portal.officer.subtitle")}
        </p>

        <nav className="space-y-2">

          {menuItems.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`block p-3 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {item.name}
            </Link>

          ))}

        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">

        <Outlet />

      </main>

    </div>
  );
};

export default OfficerPortal;