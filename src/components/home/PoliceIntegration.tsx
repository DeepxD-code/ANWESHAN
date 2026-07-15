import { useLanguage } from "@/contexts/LanguageContext";
import {
  ShieldCheck,
  FileSearch,
  MapPinned,
  RadioTower,
  BellRing,
  Database,
} from "lucide-react";

const PoliceIntegration = () => {
  const { t } = useLanguage();
  const modules = [
    {
      icon: <BellRing className="h-8 w-8 text-red-500" />,
      title: t("home.police.realTime"),
      description: t("home.police.desc.realTime") || "Fraud reports, SOS requests and emergency alerts are securely forwarded to Cyber Crime officers with timestamps and priority levels.",
    },
    {
      icon: <FileSearch className="h-8 w-8 text-blue-600" />,
      title: t("home.police.evidenceCollection"),
      description: t("home.police.desc.evidence") || "Screenshots, scam messages, suspicious links, voice recordings and supporting files are securely stored with complete evidence metadata.",
    },
    {
      icon: <MapPinned className="h-8 w-8 text-green-600" />,
      title: t("home.police.gisIntelligence"),
      description: t("home.police.desc.gis") || "Fraud incidents are visualized on interactive maps to identify hotspots, emerging scam campaigns and regional threat trends.",
    },
    {
      icon: <RadioTower className="h-8 w-8 text-orange-500" />,
      title: t("home.police.emergencyCoord"),
      description: t("home.police.desc.emergency") || "Supports rapid coordination between Cyber Crime Branch, emergency responders and family members during critical situations.",
    },
    {
      icon: <Database className="h-8 w-8 text-purple-600" />,
      title: t("home.police.caseManagement"),
      description: t("home.police.desc.case") || "Every reported incident receives a unique case ID with investigation status, officer assignment and evidence timeline.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-cyan-600" />,
      title: t("home.police.decisionSupport"),
      description: t("home.police.desc.decision") || "AI-assisted analytics help officers prioritize cases, identify repeat fraud patterns and improve operational response.",
    },
  ];
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto mb-16">

          <span className="uppercase tracking-widest text-blue-600 font-semibold">
            {t("home.police.title")}
          </span>

          <h2 className="text-4xl font-bold mt-4">
            {t("home.police.subtitle")}
          </h2>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
            {t("home.police.desc") || "ANWESHAN is designed to integrate senior citizen safety with structured cybercrime investigation workflows, enabling faster response, better evidence management and improved situational awareness."}
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">

          {modules.map((item, index) => (

            <div
              key={index}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-7 shadow-sm hover:shadow-xl transition-all duration-300"
            >

              <div className="mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default PoliceIntegration;