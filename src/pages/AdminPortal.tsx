import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const AdminPortal = () => {
  const { t } = useLanguage();

  const menu = [
    {
      name: t("portal.admin.dashboard"),
      path: "/admin/dashboard",
    },
    {
      name: t("portal.admin.users"),
      path: "/admin/users",
    },
    {
      name: t("portal.admin.analytics"),
      path: "/admin/analytics",
    },
    {
      name: t("portal.admin.settings"),
      path: "/admin/settings",
    },
  ];

  return (

    <div className="min-h-screen bg-background flex">

      {/* Sidebar */}

      <aside className="hidden md:block w-72 border-r bg-card p-6">

        <h2 className="text-3xl font-bold mb-8">
          ANWESHAN
        </h2>

        <nav className="space-y-3">

          {menu.map((item) => (

            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`
              }
            >
              {item.name}
            </NavLink>

          ))}

        </nav>

      </aside>



      {/* Main */}

      <main className="flex-1 p-6">

        <Outlet />

      </main>

    </div>

  );

};

export default AdminPortal;