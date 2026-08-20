import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ShieldCheck, CheckCircle, AlertCircle, Key, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import API_BASE from "@/lib/api";

const CaretakerRegister = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefillToken = searchParams.get("token") || "";

  const [step, setStep] = useState(1);
  const [token, setToken] = useState(prefillToken);
  const [seniorInfo, setSeniorInfo] = useState<{ id: string; fullName: string; city: string } | null>(null);
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
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const verifyToken = async () => {
    if (!token.trim()) {
      setError("Please enter a caretaker token.");
      return;
    }
    try {
      setVerifying(true);
      setError("");
      const response = await fetch(`${API_BASE}/auth/verify-caretaker-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Invalid token.");
        return;
      }
      setSeniorInfo(data.senior);
      setStep(2);
    } catch (err) {
      console.error(err);
      setError("Unable to verify token. Check your connection.");
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!seniorInfo) {
      setError("Senior info not loaded. Please verify token again.");
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
          role: "FAMILY",
          caretakerToken: token,
          age: parseInt(formData.age) || undefined,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }
      setStep(3);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => navigate("/login");

  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-md bg-card border rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <ShieldCheck className="mx-auto h-14 w-14 text-primary" />
            <h1 className="text-3xl font-bold mt-3">ANWESHAN</h1>
          </div>

          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Linked Successfully!</h2>
            <p className="text-muted-foreground">
              You are now connected to <strong>{seniorInfo?.fullName}</strong>
            </p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
            <h3 className="font-semibold mb-3">What happens next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">• You will receive emergency SOS alerts</li>
              <li className="flex items-center gap-2">• Daily check-in notifications</li>
              <li className="flex items-center gap-2">• Health & welfare updates</li>
              <li className="flex items-center gap-2">• Cyber fraud alerts from community</li>
            </ul>
          </div>

          <Button onClick={goToLogin} className="w-full py-3">
            Continue to Login
          </Button>

          <div className="border-t mt-6 pt-4 text-center text-sm">
            <p className="font-semibold">Emergency Numbers</p>
            <p className="text-primary mt-1">1930 • 112</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-lg bg-card border rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <ShieldCheck className="mx-auto h-14 w-14 text-primary" />
            <h1 className="text-3xl font-bold mt-3">ANWESHAN</h1>
            <p className="text-muted-foreground mt-2">Caretaker Registration</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground">Enter your details</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <Key className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-semibold">Verified Senior Citizen</p>
                <p className="text-sm text-muted-foreground">{seniorInfo?.fullName} • {seniorInfo?.city}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="fullName">{t("register.fullName")}</Label>
                <Input
                  id="fullName"
                  placeholder={t("register.fullName")}
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
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
                  onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label>{t("register.selectGender")}</Label>
              <Select value={formData.gender} onValueChange={(v) => setFormData((prev) => ({ ...prev, gender: v }))}>
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
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
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
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
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
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
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
                  onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
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
                onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Your complete address"
                value={formData.address}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
              />
            </div>

            {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}

            <Button onClick={handleSubmit} disabled={loading} className="w-full py-3">
              {loading ? "Linking..." : "Complete Registration & Link"}
            </Button>
          </div>

          <p className="text-center text-sm mt-4">
            <Button variant="ghost" onClick={() => setStep(1)}>← Back to token entry</Button>
          </p>

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
      <div className="w-full max-w-md bg-card border rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <ShieldCheck className="mx-auto h-14 w-14 text-primary" />
          <h1 className="text-3xl font-bold mt-3">ANWESHAN</h1>
          <p className="text-muted-foreground mt-2">Caretaker Registration</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {s}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">Enter caretaker token</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="caretakerToken">Caretaker Token</Label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="caretakerToken"
                placeholder="CT-XXXXXX-NAME-2026"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="pl-10 text-center font-mono tracking-wider"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Get this token from the senior citizen you're caring for.
            </p>
          </div>

          {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}

          <Button onClick={verifyToken} disabled={verifying || !token.trim()} className="w-full py-3">
            {verifying ? "Verifying..." : "Verify Token & Continue"}
          </Button>
        </div>

        <p className="text-center text-sm mt-4">
          <Link to="/login" className="text-primary font-semibold">
            ← Back to Login
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

export default CaretakerRegister;