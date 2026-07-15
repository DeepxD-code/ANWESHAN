import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Siren,
  BrainCircuit,
  HeartPulse,
  Users,
  Landmark,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 opacity-100" />

      <div className="container mx-auto px-6 py-20 relative z-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300 mb-8">
              {t("home.hero.branch")}
            </div>

            <h1 className="text-6xl font-extrabold tracking-tight mb-4">
              {t("home.hero.title")}
            </h1>

            <h2 className="text-4xl font-bold leading-tight mb-6 text-orange-400">
              {t("home.hero.subtitle")}
            </h2>

            <p className="text-lg leading-8 text-slate-300 max-w-2xl">
              {t("home.hero.desc") || "Protecting senior citizens from cyber fraud, medical emergencies, financial scams and digital threats through AI-assisted prevention, rapid emergency response, welfare monitoring and seamless police integration."}
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <Link to="/login">
                <Button size="lg">
                  {t("home.hero.openSenior")}
                </Button>
              </Link>

              <Link to="/login">
                <Button variant="outline" size="lg">
                  {t("home.hero.reportFraud")}
                </Button>
              </Link>

              <a href="#features">
                <Button variant="ghost" size="lg">
                  {t("home.hero.explore")}
                </Button>
              </a>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

              <h3 className="text-xl font-semibold mb-8">
                {t("home.hero.platformStatus")}
              </h3>

              <div className="space-y-5">

                <Status
                  icon={<Siren size={18} />}
                  label={t("home.hero.emergencySOS")}
                />

                <Status
                  icon={<BrainCircuit size={18} />}
                  label={t("home.hero.aiDetection")}
                />

                <Status
                  icon={<Users size={18} />}
                  label={t("home.hero.familyConnectivity")}
                />

                <Status
                  icon={<Landmark size={18} />}
                  label={t("home.hero.policeIntegration")}
                />

                <Status
                  icon={<HeartPulse size={18} />}
                  label={t("home.hero.healthMonitoring")}
                />

                <Status
                  icon={<ShieldCheck size={18} />}
                  label={t("home.hero.evidenceVault")}
                />

              </div>

              <div className="grid grid-cols-2 gap-5 mt-10">

                <Stat
                  value="12,846"
                  label={t("home.hero.stat.seniors") || "Registered Seniors"}
                />

                <Stat
                  value="1,204"
                  label={t("home.hero.stat.reports") || "Fraud Reports"}
                />

                <Stat
                  value="538"
                  label={t("home.hero.stat.responses") || "Emergency Responses"}
                />

                <Stat
                  value="2.3 min"
                  label={t("home.hero.stat.avgTime") || "Avg Response"}
                />

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

function Status({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-4 py-3">
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>

      <span className="h-3 w-3 rounded-full bg-green-500" />
    </div>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
      <div className="text-3xl font-bold text-orange-400">
        {value}
      </div>

      <div className="text-sm text-slate-400 mt-2">
        {label}
      </div>
    </div>
  );
}

export default Hero;