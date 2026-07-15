import { useLanguage } from "@/contexts/LanguageContext";
import {
  ShieldAlert,
  Users,
  Map,
  Bell,
  BrainCircuit,
  TrendingUp,
} from "lucide-react";

const CommunitySection = () => {
  const { t } = useLanguage();
  const features = [
    {
      icon: <ShieldAlert className="h-8 w-8 text-red-600" />,
      title: t("home.community.crowdsourced"),
      description: t("home.community.desc.crowdsourced") || "Citizens anonymously report scam calls, phishing links, fake investment schemes and suspicious messages to strengthen collective cyber awareness.",
    },
    {
      icon: <Map className="h-8 w-8 text-blue-600" />,
      title: t("home.community.heatmap"),
      description: t("home.community.desc.heatmap") || "Reported incidents are visualized geographically to identify fraud hotspots, emerging scam campaigns and high-risk regions.",
    },
    {
      icon: <Bell className="h-8 w-8 text-orange-500" />,
      title: t("home.community.realTimeAlerts"),
      description: t("home.community.desc.alerts") || "When multiple citizens report similar scams, nearby users receive instant warnings before they become victims.",
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: t("home.community.familyNetwork"),
      description: t("home.community.desc.family") || "Family members remain informed about wellness updates, fraud reports and emergency incidents through shared monitoring.",
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-purple-600" />,
      title: t("home.community.aiThreat"),
      description: t("home.community.desc.ai") || "AI identifies recurring scam patterns, fraudulent behaviour and emerging cybercrime trends from community-generated reports.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-cyan-600" />,
      title: t("home.community.fraudAnalytics"),
      description: t("home.community.desc.analytics") || "Authorities gain insights into seasonal fraud trends, scam categories and response performance to improve preventive policing.",
    },
  ];
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto mb-16">

          <span className="uppercase tracking-widest text-blue-600 font-semibold">
            {t("home.community.title")}
          </span>

          <h2 className="text-4xl font-bold mt-4">
            {t("home.community.subtitle")}
          </h2>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
            {t("home.community.desc") || "Every verified report strengthens ANWESHAN's shared cyber intelligence network, helping protect other senior citizens before fraud spreads further."}
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {features.map((feature, index) => (

            <div
              key={index}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-7 shadow-sm hover:shadow-xl transition-all duration-300"
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

export default CommunitySection;