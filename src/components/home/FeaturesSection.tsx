import { useLanguage } from "@/contexts/LanguageContext";
import {
  Shield,
  Siren,
  BrainCircuit,
  FileSearch,
  MapPinned,
  HeartPulse,
  Users,
  Globe2,
} from "lucide-react";

const FeaturesSection = () => {
  const { t } = useLanguage();
  const features = [
    {
      icon: <Siren className="h-8 w-8 text-red-500" />,
      title: t("home.features.emergencySOS"),
      description: t("home.features.desc.emergency") || "One-touch emergency trigger with GPS location, voice activation and instant alerts to family members and Cyber Crime authorities.",
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: t("home.features.cyberProtection"),
      description: t("home.features.desc.cyber") || "Analyze suspicious links, SMS, WhatsApp messages and emails using AI-assisted fraud detection before interacting with them.",
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-purple-600" />,
      title: t("home.features.aiRisk"),
      description: t("home.features.desc.risk") || "Continuously evaluates behavioural vulnerability, fraud exposure and digital safety to generate personalized risk scores.",
    },
    {
      icon: <FileSearch className="h-8 w-8 text-green-600" />,
      title: t("home.features.evidenceCollection"),
      description: t("home.features.desc.evidence") || "Securely upload screenshots, scam messages, call recordings and URLs with timestamps for investigation support.",
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: t("home.features.familyConnectivity"),
      description: t("home.features.desc.family") || "Notify caregivers during emergencies while providing wellness updates and real-time incident status.",
    },
    {
      icon: <HeartPulse className="h-8 w-8 text-pink-500" />,
      title: t("home.features.welfareMonitoring"),
      description: t("home.features.desc.welfare") || "Daily check-ins, medication reminders, inactivity alerts and health monitoring designed specifically for senior citizens.",
    },
    {
      icon: <MapPinned className="h-8 w-8 text-cyan-600" />,
      title: t("home.features.policeDashboard"),
      description: t("home.features.desc.police") || "Case tracking, fraud heatmaps, emergency monitoring and digital evidence management for Cyber Crime officers.",
    },
    {
      icon: <Globe2 className="h-8 w-8 text-indigo-600" />,
      title: t("home.features.multilingual"),
      description: t("home.features.desc.multilingual") || "Accessible interface supporting English, Hindi and Gujarati with large typography and senior-friendly navigation.",
    },
  ];
  return (
    <section
      id="features"
      className="py-24 bg-white dark:bg-slate-950"
    >
      <div className="container mx-auto px-6">

        <div className="max-w-3xl mx-auto text-center mb-16">

          <span className="uppercase tracking-widest text-blue-600 font-semibold">
            {t("home.features.title")}
          </span>

          <h2 className="text-4xl font-bold mt-4">
            {t("home.features.subtitle")}
          </h2>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
            {t("home.features.desc") || "ANWESHAN combines cyber awareness, emergency response, welfare monitoring and police collaboration into a single unified platform."}
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-7">

          {features.map((feature, index) => (

            <div
              key={index}
              className="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              <div className="mb-5">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;