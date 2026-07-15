import { useLanguage } from "@/contexts/LanguageContext";
import {
  Siren,
  Mic,
  MapPin,
  HeartPulse,
  Users,
  Smartphone,
} from "lucide-react";

const EmergencySection = () => {
  const { t } = useLanguage();
  const emergencyFeatures = [
    {
      icon: <Siren className="h-8 w-8 text-red-600" />,
      title: t("home.emergency.oneTouchSOS"),
      description: t("home.emergency.desc.oneTouch") || "A large, senior-friendly emergency button immediately initiates an SOS request and shares the user's live location with emergency contacts and Cyber Crime authorities.",
    },
    {
      icon: <Mic className="h-8 w-8 text-blue-600" />,
      title: t("home.emergency.voiceSOS"),
      description: t("home.emergency.desc.voice") || "Senior citizens can trigger emergency assistance using simple multilingual voice commands without navigating the application.",
    },
    {
      icon: <MapPin className="h-8 w-8 text-green-600" />,
      title: t("home.emergency.liveLocation"),
      description: t("home.emergency.desc.location") || "During emergencies, GPS coordinates are continuously shared with authorized family members and responding officers until the incident is resolved.",
    },
    {
      icon: <HeartPulse className="h-8 w-8 text-pink-600" />,
      title: t("home.emergency.medicalSupport"),
      description: t("home.emergency.desc.medical") || "Medication reminders, wellness monitoring and emergency medical alerts help reduce response time during health-related incidents.",
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: t("home.emergency.familyNotifications"),
      description: t("home.emergency.desc.family") || "Family members receive instant notifications about emergency events, case updates and wellness alerts through the caregiver portal.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-orange-600" />,
      title: t("home.emergency.offlineBackup"),
      description: t("home.emergency.desc.offline") || "If internet connectivity is unavailable, the platform is designed to support SMS-based emergency notifications for critical situations.",
    },
  ];
  return (
    <section className="py-24 bg-slate-100 dark:bg-slate-900">
      <div className="container mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto mb-16">

          <span className="uppercase tracking-widest text-red-600 font-semibold">
            {t("home.emergency.title")}
          </span>

          <h2 className="text-4xl font-bold mt-4">
            {t("home.emergency.subtitle")}
          </h2>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
            {t("home.emergency.desc") || "ANWESHAN combines cyber emergency response, medical assistance, family communication and law enforcement coordination into a single emergency management system designed for senior citizens."}
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {emergencyFeatures.map((feature, index) => (

            <div
              key={index}
              className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-7 shadow-sm hover:shadow-xl transition-all duration-300"
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

export default EmergencySection;