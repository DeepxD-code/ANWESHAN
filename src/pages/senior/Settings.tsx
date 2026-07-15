import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const { t, language, setLanguage } = useLanguage();

  const [theme, setTheme] = useState("System");
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [voiceSOS, setVoiceSOS] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [voiceGuidance, setVoiceGuidance] = useState(false);
  const [readAloud, setReadAloud] = useState(false);
  
  const [shareStats, setShareStats] = useState(true);
  const [gpsAccess, setGpsAccess] = useState(true);
  const [aiScam, setAiScam] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSaveChanges = () => {
    alert(t("settings.changesSaved") || "Changes saved successfully!");
  };

  const handleResetPreferences = () => {
    setTheme("System");
    setNotifications(true);
    setLocationSharing(true);
    setVoiceSOS(false);
    setLargeText(false);
    setHighContrast(false);
    setVoiceGuidance(false);
    setReadAloud(false);
    setShareStats(true);
    setGpsAccess(true);
    setAiScam(true);
    setTwoFactor(false);
    alert(t("family.settings.title") + " reset to default.");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            {t("senior.settings.title")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("senior.settings.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* General */}
          <div className="bg-card border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-5">
              {t("senior.settings.general")}
            </h2>
            <div className="space-y-5">
              <div>
                <label className="font-medium">
                  {t("senior.settings.language")}
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="w-full mt-2 border rounded-lg p-3 bg-background"
                >
                  <option value="en">{t("register.english")}</option>
                  <option value="hi">{t("register.hindi")}</option>
                  <option value="gu">Gujarati</option>
                </select>
              </div>

              <div>
                <label className="font-medium">
                  {t("senior.settings.theme")}
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full mt-2 border rounded-lg p-3 bg-background"
                >
                  <option value="Light">{t("senior.settings.light")}</option>
                  <option value="Dark">{t("senior.settings.dark")}</option>
                  <option value="System">{t("senior.settings.system")}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Emergency */}
          <div className="bg-card border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-5">
              {t("senior.settings.emergencyPrefs")}
            </h2>
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {t("settings.emergencyNotifications")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.receiveEmergencyAlerts")}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {t("settings.liveLocationSharing")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.shareGpsEmergencies")}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={locationSharing}
                  onChange={() => setLocationSharing(!locationSharing)}
                />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    {t("settings.voiceSos")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.enableVoiceActivation")}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={voiceSOS}
                  onChange={() => setVoiceSOS(!voiceSOS)}
                />
              </div>
            </div>
          </div>

          {/* Accessibility */}
          <div className="bg-card border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-5">
              {t("senior.settings.accessibility")}
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>{t("senior.settings.largeText")}</span>
                <input 
                  type="checkbox" 
                  checked={largeText} 
                  onChange={() => setLargeText(!largeText)} 
                />
              </div>

              <div className="flex justify-between items-center">
                <span>{t("settings.highContrast")}</span>
                <input 
                  type="checkbox" 
                  checked={highContrast} 
                  onChange={() => setHighContrast(!highContrast)} 
                />
              </div>

              <div className="flex justify-between items-center">
                <span>{t("settings.voiceGuidance")}</span>
                <input 
                  type="checkbox" 
                  checked={voiceGuidance} 
                  onChange={() => setVoiceGuidance(!voiceGuidance)} 
                />
              </div>

              <div className="flex justify-between items-center">
                <span>{t("settings.readNotificationsAloud")}</span>
                <input 
                  type="checkbox" 
                  checked={readAloud} 
                  onChange={() => setReadAloud(!readAloud)} 
                />
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-card border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-5">
              {t("senior.settings.privacy")}
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>{t("settings.shareAnonymousStats")}</span>
                <input 
                  type="checkbox" 
                  checked={shareStats} 
                  onChange={() => setShareStats(!shareStats)} 
                />
              </div>

              <div className="flex justify-between items-center">
                <span>{t("settings.allowEmergencyGps")}</span>
                <input 
                  type="checkbox" 
                  checked={gpsAccess} 
                  onChange={() => setGpsAccess(!gpsAccess)} 
                />
              </div>

              <div className="flex justify-between items-center">
                <span>{t("settings.enableAiScam")}</span>
                <input 
                  type="checkbox" 
                  checked={aiScam} 
                  onChange={() => setAiScam(!aiScam)} 
                />
              </div>

              <div className="flex justify-between items-center">
                <span>{t("settings.twoFactorAuth")}</span>
                <input 
                  type="checkbox" 
                  checked={twoFactor} 
                  onChange={() => setTwoFactor(!twoFactor)} 
                />
              </div>
            </div>
          </div>

          {/* Account */}
          <div className="bg-card border rounded-2xl p-6 lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-5">
              {t("senior.settings.accountInfo")}
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="font-medium">
                  {t("senior.settings.fullName")}
                </label>
                <input
                  className="w-full mt-2 border rounded-lg p-3 bg-background"
                  value="Ramesh Patel"
                  readOnly
                />
              </div>

              <div>
                <label className="font-medium">
                  {t("settings.registeredMobile")}
                </label>
                <input
                  className="w-full mt-2 border rounded-lg p-3 bg-background"
                  value="+91 98765 43210"
                  readOnly
                />
              </div>

              <div>
                <label className="font-medium">
                  {t("settings.email")}
                </label>
                <input
                  className="w-full mt-2 border rounded-lg p-3 bg-background"
                  value="ramesh@email.com"
                  readOnly
                />
              </div>

              <div>
                <label className="font-medium">
                  {t("settings.aadhaarVerification")}
                </label>
                <input
                  className="w-full mt-2 border rounded-lg p-3 bg-background"
                  value={t("settings.verified")}
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="lg:col-span-2 flex flex-wrap gap-4">
            <Button className="px-8 py-6" onClick={handleSaveChanges}>
              {t("senior.settings.saveChanges")}
            </Button>
            <Button
              variant="outline"
              className="px-8 py-6"
              onClick={handleResetPreferences}
            >
              {t("senior.settings.resetPrefs")}
            </Button>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Settings;