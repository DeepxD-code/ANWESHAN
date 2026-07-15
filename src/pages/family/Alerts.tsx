import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import API_BASE from "@/lib/api";

const scamTypes = [
  "Phishing", "Vishing", "SMS Scam", "Investment Scam",
  "Digital Arrest", "UPI Fraud", "Loan Scam", "SIM Swap", "Others",
];

const scamTypeLabels: Record<string, string> = {
  Phishing: "family.alerts.phishing",
  Vishing: "family.alerts.vishing",
};

interface Alert {
  id: string;
  type: string;
  status: string;
  severity: string;
  location: string;
  classification?: string;
  createdAt: string;
  senior?: { fullName: string };
}

const Alerts = () => {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [classifyingId, setClassifyingId] = useState<string | null>(null);
  const guardianId = "current";

  useEffect(() => {
    fetch(`${API_BASE}/alerts/guardian/${guardianId}`)
      .then((res) => res.json())
      .then((data) => setAlerts(data.alerts || []))
      .catch(() => setAlerts([]));
  }, []);

  const classifyAlert = async (alertId: string, classification: string) => {
    try {
      await fetch(`${API_BASE}/alerts/${alertId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classification, guardianId }),
      });
      setAlerts((prev) =>
        prev.map((a) => (a.id === alertId ? { ...a, classification } : a))
      );
    } catch (err) {
      console.error("Failed to classify alert", err);
    }
    setClassifyingId(null);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">{t("family.alerts.title")}</h1>
          <p className="text-muted-foreground mt-2">
            {t("family.alerts.subtitle")}
          </p>
        </div>

        {alerts.length === 0 ? (
          <p className="text-muted-foreground">{t("family.alerts.none")}</p>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="bg-card border rounded-2xl p-6">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-2xl font-semibold">
                        {alert.type.toUpperCase()}
                      </h2>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          alert.severity === "critical"
                            ? "bg-red-600 text-white"
                            : alert.severity === "high"
                            ? "bg-orange-500 text-white"
                            : alert.severity === "medium"
                            ? "bg-yellow-400 text-black"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {alert.severity}
                      </span>
                    </div>
                    {alert.senior && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {alert.senior.fullName}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-6 mt-4 text-sm text-muted-foreground">
                      <span>{`${t("family.alerts.status")} ${alert.status}`}</span>
                      <span>{`${t("family.alerts.location")} ${alert.location || "N/A"}`}</span>
                      <span>{`${t("family.alerts.time")} ${new Date(alert.createdAt).toLocaleString()}`}</span>
                      {alert.classification && (
                        <span>{`${t("family.alerts.classification")} ${alert.classification}`}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 min-w-44">
                    <Button
                      onClick={() =>
                        setClassifyingId(
                          classifyingId === alert.id ? null : alert.id
                        )
                      }
                    >
                      {alert.classification ? t("family.alerts.reclassify") : t("family.alerts.classify")}
                    </Button>

                    {classifyingId === alert.id && (
                      <div className="bg-popover border rounded-xl p-3 shadow-lg">
                        <p className="text-xs font-semibold mb-2">
                          {t("family.alerts.selectScam")}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {scamTypes.map((type) => (
                            <button
                              key={type}
                              onClick={() => classifyAlert(alert.id, type)}
                              className="text-xs bg-secondary px-3 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition"
                            >
                              {scamTypeLabels[type] ? t(scamTypeLabels[type]) : type}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;
