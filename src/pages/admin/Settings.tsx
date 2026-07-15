import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Settings = () => {
  const { t } = useLanguage();

  return (

    <div className="min-h-screen bg-background">

      <div className="max-w-5xl mx-auto px-6 py-8">

        <h1 className="text-4xl font-bold mb-2">
          {t("admin.settings.title")}
        </h1>

        <p className="text-muted-foreground mb-8">
          {t("admin.settings.subtitle")}
        </p>



        <div className="space-y-6">

          <div className="bg-card border rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-4">
              {t("admin.settings.general")}
            </h2>

            <div className="space-y-4">

              <label className="flex justify-between">

                <span>{t("admin.settings.maintenance")}</span>

                <input type="checkbox" />

              </label>

              <label className="flex justify-between">

                <span>{t("admin.settings.allowRegistration")}</span>

                <input type="checkbox" defaultChecked />

              </label>

              <label className="flex justify-between">

                <span>{t("admin.settings.enableAI")}</span>

                <input type="checkbox" defaultChecked />

              </label>

            </div>

          </div>



          <div className="bg-card border rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-4">
              {t("admin.settings.security")}
            </h2>

            <div className="space-y-4">

              <label className="flex justify-between">

                <span>{t("admin.settings.twoFactor")}</span>

                <input type="checkbox" defaultChecked />

              </label>

              <label className="flex justify-between">

                <span>{t("admin.settings.auditLogs")}</span>

                <input type="checkbox" defaultChecked />

              </label>

              <label className="flex justify-between">

                <span>Encrypt Uploaded Evidence</span>

                <input type="checkbox" defaultChecked />

              </label>

            </div>

          </div>



          <div className="bg-card border rounded-2xl p-6">

            <h2 className="text-xl font-semibold mb-4">
              {t("admin.settings.notifications")}
            </h2>

            <div className="space-y-4">

              <label className="flex justify-between">

                <span>{t("admin.settings.emailAlerts")}</span>

                <input type="checkbox" defaultChecked />

              </label>

              <label className="flex justify-between">

                <span>Emergency SMS Alerts</span>

                <input type="checkbox" defaultChecked />

              </label>

              <label className="flex justify-between">

                <span>Officer Push Notifications</span>

                <input type="checkbox" defaultChecked />

              </label>

            </div>

          </div>



          <div className="flex gap-4">

            <Button>
              {t("admin.settings.saveChanges")}
            </Button>

            <Button variant="outline">
              {t("admin.settings.reset")}
            </Button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Settings;