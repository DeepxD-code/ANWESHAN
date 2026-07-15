import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, Trash2, Plus, UserCheck } from "lucide-react";
import API_BASE from "@/lib/api";

interface LinkedSenior {
  id: string;
  name: string;
  relation: string;
  status: string;
}

const Settings = () => {
  const { t } = useLanguage();
  
  // Settings Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.fullName) setName(user.fullName);
    if (user.phone) setPhone(user.phone);
  }, []);

  // Manage Seniors State
  const [showSeniorsList, setShowSeniorsList] = useState(false);
  const [seniors, setSeniors] = useState<LinkedSenior[]>([
    { id: "SENIOR-901", name: "Ramesh Patel", relation: "Father", status: "Active" },
    { id: "SENIOR-302", name: "Anita Shah", relation: "Mother-in-law", status: "Active" }
  ]);
  const [newSeniorId, setNewSeniorId] = useState("");
  const [newSeniorName, setNewSeniorName] = useState("");
  const [newSeniorRelation, setNewSeniorRelation] = useState("");

  const handleSaveChanges = async () => {
    try {
      setSaveStatus("Saving...");
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/auth/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: user.id, fullName: name, phone, email: user.email }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setSaveStatus("Saved!");
        setTimeout(() => setSaveStatus(""), 2000);
      } else {
        setSaveStatus("Failed to save");
      }
    } catch {
      setSaveStatus("Error saving changes");
    }
  };

  const handleAddSenior = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSeniorId || !newSeniorName || !newSeniorRelation) {
      alert("Please fill in all fields (ID, Name, Relation) to link the senior citizen.");
      return;
    }
    const newSenior: LinkedSenior = {
      id: newSeniorId.toUpperCase(),
      name: newSeniorName,
      relation: newSeniorRelation,
      status: "Active"
    };
    setSeniors([...seniors, newSenior]);
    setNewSeniorId("");
    setNewSeniorName("");
    setNewSeniorRelation("");
    alert(`Successfully linked ${newSeniorName} (${newSeniorRelation}) to your family account!`);
  };

  const handleUnlinkSenior = (id: string, name: string) => {
    if (confirm(`Are you sure you want to unlink ${name}? They will no longer escalate suspicious alerts to your portal.`)) {
      setSeniors(seniors.filter(s => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">{t("family.settings.title")}</h1>
          <p className="text-muted-foreground mt-2">
            {t("family.settings.subtitle")}
          </p>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-card border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">{t("family.settings.notifications")}</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span>{t("family.settings.smsAlerts")}</span>
                <input 
                  type="checkbox" 
                  checked={smsAlerts} 
                  onChange={() => setSmsAlerts(!smsAlerts)}
                  className="w-5 h-5 rounded accent-primary" 
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>{t("family.settings.emailAlerts")}</span>
                <input 
                  type="checkbox" 
                  checked={emailAlerts} 
                  onChange={() => setEmailAlerts(!emailAlerts)}
                  className="w-5 h-5 rounded accent-primary" 
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>{t("family.settings.pushNotifications")}</span>
                <input 
                  type="checkbox" 
                  checked={pushAlerts} 
                  onChange={() => setPushAlerts(!pushAlerts)}
                  className="w-5 h-5 rounded accent-primary" 
                />
              </label>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-card border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">{t("family.settings.emergencyContact")}</h2>
            <p className="text-muted-foreground mb-4">
              {t("family.settings.emergencyInfo")}
            </p>
            <div className="space-y-3">
              <input
                placeholder={t("family.settings.name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 bg-background"
              />
              <input
                placeholder={t("family.settings.phone")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 bg-background"
              />
              <div className="flex items-center gap-3">
                <Button onClick={handleSaveChanges}>{t("family.settings.saveChanges")}</Button>
                {saveStatus && <span className="text-sm text-muted-foreground">{saveStatus}</span>}
              </div>
            </div>
          </div>

          {/* Account & Manage Linked Seniors */}
          <div className="bg-card border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">{t("family.settings.account")}</h2>
            <p className="text-muted-foreground mb-4">
              Manage your account settings and linked seniors.
            </p>
            
            <div className="space-y-4">
              <Button 
                variant={showSeniorsList ? "default" : "outline"}
                onClick={() => setShowSeniorsList(!showSeniorsList)}
              >
                {showSeniorsList ? "Hide Linked Seniors" : t("family.settings.manageSeniors")}
              </Button>

              {showSeniorsList && (
                <div className="mt-4 border rounded-xl p-4 bg-muted/10 space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Linked Senior Citizens</h3>
                    {seniors.length === 0 ? (
                      <p className="text-muted-foreground text-sm">No linked seniors found. Link one below.</p>
                    ) : (
                      <div className="space-y-3">
                        {seniors.map(senior => (
                          <div key={senior.id} className="flex justify-between items-center bg-card p-3 border rounded-lg shadow-sm">
                            <div>
                              <p className="font-semibold">{senior.name} <span className="text-xs text-muted-foreground">({senior.relation})</span></p>
                              <p className="text-xs text-muted-foreground">ID: {senior.id} | Status: <span className="text-green-600 font-semibold">{senior.status}</span></p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleUnlinkSenior(senior.id, senior.name)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Unlink
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <hr className="border-border" />

                  {/* Add Senior Form */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Plus className="h-5 w-5 text-primary" /> Link a New Senior Citizen
                    </h3>
                    <form onSubmit={handleAddSenior} className="grid md:grid-cols-3 gap-4">
                      <input
                        placeholder="Senior ID (e.g. SENIOR-105)"
                        value={newSeniorId}
                        onChange={(e) => setNewSeniorId(e.target.value)}
                        className="border rounded-xl px-4 py-2 bg-background text-sm"
                        required
                      />
                      <input
                        placeholder="Full Name"
                        value={newSeniorName}
                        onChange={(e) => setNewSeniorName(e.target.value)}
                        className="border rounded-xl px-4 py-2 bg-background text-sm"
                        required
                      />
                      <input
                        placeholder="Relation (e.g. Father, Mother)"
                        value={newSeniorRelation}
                        onChange={(e) => setNewSeniorRelation(e.target.value)}
                        className="border rounded-xl px-4 py-2 bg-background text-sm"
                        required
                      />
                      <div className="md:col-span-3">
                        <Button type="submit" size="sm" className="bg-primary hover:bg-primary/95 text-white">
                          <UserCheck className="h-4 w-4 mr-2" /> Link Senior
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
