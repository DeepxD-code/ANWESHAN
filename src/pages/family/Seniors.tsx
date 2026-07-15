import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const seniors = [
  {
    id: 1,
    name: "Ramesh Patel",
    age: 72,
    status: "Safe",
    lastCheckin: "Today • 10:42 AM",
    location: "Satellite, Ahmedabad",
    health: "Good",
  },
  {
    id: 2,
    name: "Sushila Devi",
    age: 68,
    status: "Attention",
    lastCheckin: "Yesterday • 04:15 PM",
    location: "Navrangpura, Ahmedabad",
    health: "Fair",
  },
];

const statusLabels: Record<string, string> = {
  Safe: "family.seniors.safe",
  Attention: "family.seniors.attention",
};

const Seniors = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background p-6">

      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">{t("family.seniors.title")}</h1>
          <p className="text-muted-foreground mt-2">
            {t("family.seniors.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {seniors.map((senior) => (
            <div
              key={senior.id}
              className="bg-card border rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">{senior.name}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    senior.status === "Safe"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                  }`}
                >
                  {statusLabels[senior.status] ? t(statusLabels[senior.status]) : senior.status}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">{t("family.seniors.age")}</span>
                  <span className="font-semibold">{senior.age}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">{t("family.seniors.health")}</span>
                  <span className="font-semibold">{senior.health}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">{t("family.seniors.location")}</span>
                  <span className="font-semibold">{senior.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("family.seniors.lastCheckin")}</span>
                  <span className="font-semibold">{senior.lastCheckin}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default Seniors;
