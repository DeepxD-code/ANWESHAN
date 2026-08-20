import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ShieldCheck, User, Users, BadgeCheck, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Register = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefillRole = searchParams.get("role");

  const roles = [
    {
      value: "senior",
      label: t("roleSelector.senior"),
      desc: t("roleSelector.senior.desc"),
      icon: User,
      color: "bg-blue-500",
      href: "/register/senior",
    },
    {
      value: "caretaker",
      label: "Caretaker / Family",
      desc: "Link to a senior citizen using their token",
      icon: Users,
      color: "bg-green-500",
      href: "/register/caretaker",
    },
    {
      value: "officer",
      label: t("roleSelector.officer"),
      desc: t("roleSelector.officer.desc"),
      icon: BadgeCheck,
      color: "bg-purple-500",
      href: "/login", // Officers login only
      loginOnly: true,
    },
    {
      value: "admin",
      label: t("roleSelector.admin"),
      desc: t("roleSelector.admin.desc"),
      icon: Lock,
      color: "bg-red-500",
      href: "/login", // Admins login only
      loginOnly: true,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-3xl bg-card border rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <ShieldCheck className="mx-auto h-14 w-14 text-primary" />
          <h1 className="text-3xl font-bold mt-3">ANWESHAN</h1>
          <p className="text-muted-foreground mt-2">Create Your Account</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {roles.map((role) => (
            <Link
              key={role.value}
              to={role.href}
              className={`relative p-6 rounded-xl border-2 transition-all group ${
                prefillRole === role.value
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${role.color} text-white`}>
                  <role.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{role.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{role.desc}</p>
                  {role.loginOnly && (
                    <span className="inline-block mt-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                      Login only (pre-created accounts)
                    </span>
                  )}
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-muted/50 rounded-xl p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            How It Works
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
              <span><strong>Senior Citizens</strong> register with phone + name, get a unique caretaker token</span>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</span>
              <span><strong>Family/Caretakers</strong> register using that token to link accounts</span>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</span>
              <span><strong>Police Officers</strong> use their police ID to login (no public signup)</span>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">4</span>
              <span><strong>Admins</strong> are pre-created during system setup</span>
            </div>
          </div>
        </div>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold">
            Login
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

export default Register;