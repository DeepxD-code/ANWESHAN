import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ShieldCheck, CheckCircle, AlertCircle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import API_BASE from "@/lib/api";

const SeniorRegister = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefillRole = searchParams.get("role") || "SENIOR";

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    address: "",
    emergencyContact: "",
  });
  const [caretakerToken, setCaretakerToken] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          role: "SENIOR",
          age: parseInt(formData.age) || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      setCaretakerToken(data.caretakerToken || "");
      setDeviceId(data.user?.deviceId || "");
      setStep(2);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const copyToken = async () => {
    await navigator.clipboard.writeText(caretakerToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const goToLogin = () => {
    navigate("/login");
  };

  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-md bg-card border rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <ShieldCheck className="mx-auto h-14 w-14 text-primary" />
            <h1 className="text-3xl font-bold mt-3">ANWESHAN</h1>
          </div>

          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
            <p className="text-muted-foreground">Welcome to ANWESHAN, {formData.fullName}!</p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Your Caretaker Token
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Share this token with your family members so they can link to your account and receive emergency alerts.
            </p>
            <div className="flex gap-2 mb-4">
              <Input
                readOnly
                value={caretakerToken}
                className="font-mono text-lg tracking-wider text-center flex-1 bg-background"
              />
              <Button variant="outline" onClick={copyToken} className="whitespace-nowrap">
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            {copied && <p className="text-green-600 text-sm">Copied to clipboard!</p>}
            <p className="text-xs text-muted-foreground mt-3">
              Token: <span className="font-mono">{caretakerToken}</span> | Device ID: <span className="font-mono">{deviceId}</span>
            </p>
          </div>

          <div className="space-y-3">
            <Button onClick={goToLogin} className="w-full py-3">
              Continue to Login
            </Button>
            <Button variant="outline" onClick={() => setStep(1)} className="w-full">
              Register Another Account
            </Button>
          </div>

          <div className="border-t mt-6 pt-4 text-center text-sm">
            <p className="font-semibold">Emergency Numbers</p>
            <p className="text-primary mt-1">1930 • 112</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg bg-card border rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <ShieldCheck className="mx-auto h-14 w-14 text-primary" />
          <h1 className="text-3xl font-bold mt-3">ANWESHAN</h1>
          <p className="text-muted-foreground mt-2">Senior Citizen Registration</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  step === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {s}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {step === 1 ? "Enter your details" : "Get your caretaker token"}
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="fullName">{t("register.fullName")}</Label>
              <Input
                id="fullName"
                placeholder={t("register.fullName")}
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="age">{t("register.age")}</Label>
              <Input
                id="age"
                type="number"
                placeholder={t("register.age")}
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                min="60"
                max="120"
              />
            </div>
          </div>

          <div>
            <Label>{t("register.selectGender")}</Label>
            <Select value={formData.gender} onValueChange={(v) => handleChange("gender", v)}>
              <SelectTrigger>
                <SelectValue placeholder={t("register.selectGender")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">{t("register.male")}</SelectItem>
                <SelectItem value="Female">{t("register.female")}</SelectItem>
                <SelectItem value="Other">{t("register.other")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="phone">{t("register.mobile")}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder={t("register.mobile")}
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">{t("register.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("register.email")}
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="password">{t("register.password")}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t("register.password")}
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">{t("register.confirmPassword")}</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder={t("register.confirmPassword")}
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="city">{t("register.city")}</Label>
            <Input
              id="city"
              placeholder={t("register.city")}
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Your complete address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="emergencyContact">Emergency Contact Number</Label>
            <Input
              id="emergencyContact"
              type="tel"
              placeholder="Emergency contact phone"
              value={formData.emergencyContact}
              onChange={(e) => handleChange("emergencyContact", e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}

          <Button onClick={handleSubmit} disabled={loading} className="w-full py-3">
            {loading ? "Registering..." : "Register & Get Token"}
          </Button>
        </div>

        <p className="text-center text-sm mt-4">
          {t("register.hasAccount")}{" "}
          <Link to="/login" className="text-primary font-semibold">
            {t("register.login")}
          </Link>
        </p>

        <div className="border-t mt-6 pt-4 text-center text-sm">
          <p className="font-semibold">Emergency Numbers</p>
          <p className="text-primary mt-1">1930 • 112</p>
        </div>
      </div>
    </div>
  );
};

export default SeniorRegister;