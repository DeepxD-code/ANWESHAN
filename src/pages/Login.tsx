import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Moon, Sun, Radio, CheckCircle, Lock, User, Mail, Smartphone, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import API_BASE from "@/lib/api";

type UserRole = "SENIOR" | "FAMILY" | "OFFICER" | "ADMIN";

const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("SENIOR");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [policeId, setPoliceId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const body: Record<string, string> = { password };
      if (selectedRole === "OFFICER") {
        if (!policeId.trim()) {
          setError("Police ID is required for officer login.");
          setLoading(false);
          return;
        }
        body.policeId = policeId;
      } else {
        if (!email.trim()) {
          setError("Email is required.");
          setLoading(false);
          return;
        }
        body.email = email;
      }

      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || t("login.loginFailed"));
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const role = data.user?.role;
      if (role === "SENIOR") navigate("/senior");
      else if (role === "FAMILY") navigate("/family");
      else if (role === "OFFICER") navigate("/officer");
      else if (role === "ADMIN") navigate("/admin");
      else navigate("/role-selector");
    } catch (err) {
      console.error(err);
      setError(t("login.connectionError"));
    } finally {
      setLoading(false);
    }
  };

  const roles: { value: UserRole; label: string; desc: string; icon: React.ReactNode }[] = [
    { value: "SENIOR", label: t("roleSelector.senior"), desc: t("roleSelector.senior.desc"), icon: <User className="h-5 w-5" /> },
    { value: "FAMILY", label: t("roleSelector.family"), desc: t("roleSelector.family.desc"), icon: <CheckCircle className="h-5 w-5" /> },
    { value: "OFFICER", label: t("roleSelector.officer"), desc: t("roleSelector.officer.desc"), icon: <BadgeCheck className="h-5 w-5" /> },
    { value: "ADMIN", label: t("roleSelector.admin"), desc: t("roleSelector.admin.desc"), icon: <Lock className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <ShieldCheck className="mx-auto h-14 w-14 text-primary" />
          <h1 className="text-3xl font-bold mt-3">ANWESHAN</h1>
          <p className="text-muted-foreground mt-2">{t("login.subtitle")}</p>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">{t("login.welcome")}</h2>

        <div className="space-y-4 mb-6">
          <Label className="font-medium">{t("login.selectRole") || "Select Role"}</Label>
          <div className="grid grid-cols-2 gap-3">
            {roles.map((role) => (
              <button
                key={role.value}
                type="button"
                onClick={() => setSelectedRole(role.value)}
                className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                  selectedRole === role.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`p-2 rounded-lg ${selectedRole === role.value ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    {role.icon}
                  </span>
                  <div>
                    <p className="font-semibold">{role.label}</p>
                    <p className="text-xs text-muted-foreground">{role.desc}</p>
                  </div>
                </div>
                {selectedRole === role.value && (
                  <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {selectedRole === "OFFICER" ? (
            <div>
              <Label htmlFor="policeId" className="font-medium">Police ID</Label>
              <Input
                id="policeId"
                placeholder="POL-AHD-001"
                value={policeId}
                onChange={(e) => setPoliceId(e.target.value)}
                className="w-full"
              />
            </div>
          ) : (
            <div>
              <Label htmlFor="email" className="font-medium">{t("login.email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t("login.email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10"
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="password" className="font-medium">{t("login.password")}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t("login.password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <Lock className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm" role="alert">{error}</p>
          )}

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-input" />
              {t("login.rememberMe")}
            </label>
            <button className="text-primary hover:underline">{t("login.forgotPassword")}</button>
          </div>

          <Button onClick={handleLogin} disabled={loading} className="w-full py-4">
            {loading ? t("login.loggingIn") : t("login.login")}
          </Button>
        </div>

        <div className="text-center text-muted-foreground my-6">
          ───────── {t("login.or")} ─────────
        </div>

        <Button variant="outline" className="w-full" onClick={() => navigate("/role-selector")}>
          {t("login.continueAsDemo")}
        </Button>

        <p className="text-center text-sm mt-4">
          {t("login.noAccount")}{" "}
          <Link to={`/register?role=${selectedRole}`} className="text-primary font-semibold">
            {t("login.createAccount")}
          </Link>
        </p>

        <div className="border-t mt-6 pt-5 text-center text-sm">
          <p className="font-semibold">{t("login.emergencyNumbers")}</p>
          <p className="text-primary mt-2">1930 • 112</p>
          <p className="mt-4">{t("login.govt")}</p>
          <p className="text-muted-foreground">{t("login.cyberBranch")}</p>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Button variant="ghost" size="sm" onClick={() => {}}>
            EN / HI / GU
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;