import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";


const RoleSelector = () => {
  const { t } = useLanguage();

  const navigate = useNavigate();


  const roles = [

    {
      icon: "👴",
      title: t("roleSelector.senior"),
      desc: t("roleSelector.senior.desc"),
      path: "/senior",
    },


    {
      icon: "👨‍👩‍👧",
      title: t("roleSelector.family"),
      desc: t("roleSelector.family.desc"),
      path: "/family",
    },


    {
      icon: "👮",
      title: t("roleSelector.officer"),
      desc: t("roleSelector.officer.desc"),
      path: "/officer",
    },


    {
      icon: "⚙️",
      title: t("roleSelector.admin"),
      desc: t("roleSelector.admin.desc"),
      path: "/admin",
    },

  ];


  return (

    <div className="min-h-screen bg-background px-4 py-12">


      <h1 className="text-4xl font-bold text-center mb-3">
        {t("roleSelector.title")}
      </h1>


      <p className="text-center text-muted-foreground mb-10">
        {t("roleSelector.subtitle")}
      </p>



      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">


        {roles.map((role) => (

          <div
            key={role.title}
            className="bg-card border rounded-2xl p-8 shadow-lg hover:shadow-xl transition"
          >

            <div className="text-5xl mb-4">
              {role.icon}
            </div>


            <h2 className="text-2xl font-bold">
              {role.title}
            </h2>


            <p className="text-muted-foreground mt-2 mb-6">
              {role.desc}
            </p>


            <Button
              className="w-full"
              onClick={() => navigate(role.path)}
            >
              {t("roleSelector.enter")}
            </Button>


          </div>

        ))}


      </div>


    </div>

  );

};


export default RoleSelector;