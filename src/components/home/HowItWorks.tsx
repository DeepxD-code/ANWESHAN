import { useLanguage } from "@/contexts/LanguageContext";
import {
  UserRound,
  ScanSearch,
  BrainCircuit,
  BellRing,
  ShieldCheck,
} from "lucide-react";

const HowItWorks = () => {
  const { t } = useLanguage();
  const steps = [
    {
      icon: <UserRound className="h-10 w-10 text-blue-600" />,
      title: t("home.how.step1"),
      description: t("home.how.desc.step1") || "Senior citizens access ANWESHAN through a simple multilingual interface to report fraud, perform wellness check-ins, analyze suspicious content or trigger emergency assistance.",
    },
    {
      icon: <ScanSearch className="h-10 w-10 text-orange-500" />,
      title: t("home.how.step2"),
      description: t("home.how.desc.step2") || "Messages, URLs, screenshots and reported incidents are analyzed to identify phishing attempts, scam indicators and potential cyber threats.",
    },
    {
      icon: <BrainCircuit className="h-10 w-10 text-purple-600" />,
      title: t("home.how.step3"),
      description: t("home.how.desc.step3") || "The platform evaluates fraud severity, behavioural risk, emergency level and contextual information to determine the appropriate response.",
    },
    {
      icon: <BellRing className="h-10 w-10 text-red-500" />,
      title: t("home.how.step4"),
      description: t("home.how.desc.step4") || "Relevant alerts are instantly shared with family members, caregivers and Cyber Crime officers while evidence is securely preserved for investigation.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-green-600" />,
      title: t("home.how.step5"),
      description: t("home.how.desc.step5") || "Community intelligence, wellness monitoring, scam awareness and fraud analytics continuously improve citizen safety and law-enforcement response.",
    },
  ];
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto mb-16">

          <span className="uppercase tracking-widest text-blue-600 font-semibold">
            {t("home.how.title")}
          </span>

          <h2 className="text-4xl font-bold mt-4">
            {t("home.how.sectionTitle")}
          </h2>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
            {t("home.how.desc") || "Every interaction follows a structured workflow that combines AI-assisted cyber protection, emergency response and collaboration with Cyber Crime authorities."}
          </p>

        </div>

        <div className="grid lg:grid-cols-5 gap-6">

          {steps.map((step, index) => (

            <div
              key={index}
              className="relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300"
            >

              <div className="flex justify-center mb-5">
                {step.icon}
              </div>

              <h3 className="font-semibold text-xl mb-4">
                {step.title}
              </h3>

              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                {step.description}
              </p>

              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 text-blue-500 text-2xl font-bold">
                  →
                </div>
              )}

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;