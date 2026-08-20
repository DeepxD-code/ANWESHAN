import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const SeniorPortal = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const menuItems = [
    {
      name: t("portal.senior.dashboard"),
      path: "/senior/dashboard",
    },
    {
      name: t("portal.senior.emergency"),
      path: "/senior/emergency",
    },
    {
      name: t("portal.senior.fraudCentre"),
      path: "/senior/fraud-centre",
    },
    {
      name: t("portal.senior.healthWelfare"),
      path: "/senior/health-welfare",
    },
    {
      name: t("portal.senior.communityAlerts"),
      path: "/senior/community-alerts",
    },
    {
      name: "Community Channel",
      path: "/senior/community",
    },
    {
      name: t("portal.senior.settings"),
      path: "/senior/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">

      {/* Sidebar */}
      <aside className="hidden md:block w-64 bg-card border-r p-6">

        <h2 className="text-2xl font-bold mb-6">
          ANWESHAN
        </h2>

        <nav className="space-y-2">

          {menuItems.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`
              block p-3 rounded-lg transition
              ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }
              `}
            >
              {item.name}
            </Link>

          ))}

        </nav>

      </aside>


      {/* Dashboard Content */}
      <main className="flex-1 p-6">

        <Outlet />

      </main>

    </div>
  );
};

export default SeniorPortal;