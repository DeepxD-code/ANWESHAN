import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const FamilyPortal = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const menuItems = [
    {
      name: t("portal.family.dashboard"),
      path: "/family/dashboard",
    },
    {
      name: t("portal.family.alerts"),
      path: "/family/alerts",
    },
    {
      name: t("portal.family.seniors"),
      path: "/family/seniors",
    },
    {
      name: t("portal.family.settings"),
      path: "/family/settings",
    },
    {
      name: "Fraud Escalations",
      path: "/family/escalations",
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
          {t("portal.family.subtitle")}
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

export default FamilyPortal;
