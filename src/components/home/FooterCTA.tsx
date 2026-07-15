import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FooterCTA = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-gradient-to-r from-blue-700 via-blue-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 text-center">

        <h2 className="text-4xl font-bold mb-6">
          {t("home.cta.title")}
        </h2>

        <p className="max-w-3xl mx-auto text-lg text-blue-100 leading-8 mb-10">
          {t("home.cta.desc") || "ANWESHAN combines cyber fraud prevention, emergency response, family connectivity, welfare monitoring and Cyber Crime Branch integration into one unified platform designed for the safety of senior citizens."}
        </p>

        <div className="flex flex-wrap justify-center gap-5">

          <Link to="/login">
            <button className="px-8 py-4 rounded-xl bg-white text-slate-900 font-semibold hover:scale-105 transition">
              {t("home.cta.launch")}
            </button>
          </Link>

          <Link to="/learn">
            <button className="px-8 py-4 rounded-xl border border-white font-semibold hover:bg-white hover:text-slate-900 transition">
              {t("home.cta.learnMore")}
            </button>
          </Link>

        </div>

        <div className="mt-12 text-blue-200 text-sm">
          {t("home.cta.branch")}
        </div>

      </div>
    </section>
  );
};

export default FooterCTA;