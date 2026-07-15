import { useLanguage } from "@/contexts/LanguageContext";
import {
  ShieldAlert,
  HeartPulse,
  PhoneCall,
  Landmark,
} from "lucide-react";

const ProblemSection = () => {
  const { t } = useLanguage();
  const cards = [
    {
      icon: <ShieldAlert className="h-8 w-8 text-red-500" />,
      title: t("home.problem.cyberFraud"),
      description: t("home.problem.desc.cyber") || "Senior citizens are increasingly targeted through phishing, OTP scams, fake investment schemes, pension frauds, digital arrest scams and identity theft. These attacks often exploit fear, trust and limited digital literacy.",
    },
    {
      icon: <HeartPulse className="h-8 w-8 text-blue-500" />,
      title: t("home.problem.medicalEmergencies"),
      description: t("home.problem.desc.medical") || "Many elderly citizens live alone and require continuous wellness monitoring, medication reminders, inactivity detection and rapid emergency assistance during medical situations.",
    },
    {
      icon: <PhoneCall className="h-8 w-8 text-orange-500" />,
      title: t("home.problem.delayedResponse"),
      description: t("home.problem.desc.response") || "Current systems are fragmented. Reporting cybercrime, contacting family members and reaching emergency responders often requires multiple independent services.",
    },
    {
      icon: <Landmark className="h-8 w-8 text-green-600" />,
      title: t("home.problem.policeIntegration"),
      description: t("home.problem.desc.police") || "Cyber Crime Branch requires a unified platform capable of receiving evidence, tracking cases, generating alerts and assisting investigations through structured digital workflows.",
    },
  ];
  return (
    <section
      id="problem"
      className="py-24 bg-slate-50 dark:bg-slate-900"
    >
      <div className="container mx-auto px-6">

        <div className="max-w-4xl mx-auto text-center mb-14">

          <span className="text-blue-600 font-semibold uppercase tracking-widest">
            {t("home.problem.title")}
          </span>

          <h2 className="text-4xl font-bold mt-4">
            {t("home.problem.sectionTitle")}
          </h2>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
            {t("home.problem.desc")}
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {cards.map((card, index) => (

            <div
              key={index}
              className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 shadow-sm hover:shadow-lg transition-all duration-300"
            >

              <div className="mb-6">
                {card.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {card.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 leading-7">
                {card.description}
              </p>

            </div>

          ))}

        </div>

        <div className="grid md:grid-cols-4 gap-6 mt-16">

          <div className="rounded-xl bg-blue-600 text-white p-6 text-center">
            <h3 className="text-3xl font-bold">₹22,845 Cr</h3>
            <p className="mt-2 text-sm">
              {t("home.problem.stat.losses") || "Cyber Fraud Losses (India 2024)"}
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 text-white p-6 text-center">
            <h3 className="text-3xl font-bold">22 Lakh+</h3>
            <p className="mt-2 text-sm">
              {t("home.problem.stat.complaints") || "Complaints Registered"}
            </p>
          </div>

          <div className="rounded-xl bg-orange-500 text-white p-6 text-center">
            <h3 className="text-3xl font-bold">60+</h3>
            <p className="mt-2 text-sm">
              {t("home.problem.stat.categories") || "Scam Categories Covered"}
            </p>
          </div>

          <div className="rounded-xl bg-green-600 text-white p-6 text-center">
            <h3 className="text-3xl font-bold">24×7</h3>
            <p className="mt-2 text-sm">
              {t("home.problem.stat.ready") || "Emergency Response Ready"}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProblemSection;