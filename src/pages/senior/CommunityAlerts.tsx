import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

import {
  Bell,
  TriangleAlert,
  ShieldAlert,
  MapPin,
  CalendarDays,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";


const CommunityAlerts = () => {
  const { t } = useLanguage();

  const [filter, setFilter] = useState("All");


  const alerts = [
    {
      id: 1,
      title: "Fake Electricity Bill SMS",
      category: "SMS Scam",
      area: "Ahmedabad West",
      severity: "High",
      date: "Today • 09:30 AM",
      description:
        "Citizens have reported fraudulent SMS messages requesting immediate electricity bill payment through fake links.",
    },

    {
      id: 2,
      title: "WhatsApp Investment Group",
      category: "Investment Scam",
      area: "Satellite",
      severity: "Medium",
      date: "Yesterday",
      description:
        "Fake investment advisors promising guaranteed returns through WhatsApp communities.",
    },

    {
      id: 3,
      title: "Digital Arrest Scam",
      category: "Cyber Crime",
      area: "Navrangpura",
      severity: "Critical",
      date: "2 Days Ago",
      description:
        "Fraudsters impersonating law enforcement officers demanding immediate payment to avoid arrest.",
    },
  ];


  const filteredAlerts =
    filter === "All"
      ? alerts
      : alerts.filter(
          (alert) => alert.severity === filter
        );


  return (

    <div className="min-h-screen bg-background p-6">


      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            {t("senior.community.title")}
          </h1>

          <p className="text-muted-foreground mt-2">
            {t("senior.community.subtitle")}
          </p>

        </div>


        <Button>

          <Bell className="mr-2 h-5 w-5" />

          {t("senior.community.subscribe")}

        </Button>

      </div>



      {/* Summary Cards */}

      <div className="grid lg:grid-cols-4 gap-6 mb-8">


        <div className="bg-card border rounded-2xl p-6">

          <ShieldAlert className="h-8 w-8 text-primary mb-3"/>

          <p className="text-muted-foreground">
            {t("senior.community.activeAlerts")}
          </p>

          <h2 className="text-3xl font-bold">
            14
          </h2>

        </div>


        <div className="bg-card border rounded-2xl p-6">

          <TriangleAlert className="h-8 w-8 text-red-500 mb-3"/>

          <p className="text-muted-foreground">
            {t("senior.community.highRisk")}
          </p>

          <h2 className="text-3xl font-bold text-red-600">
            5
          </h2>

        </div>


        <div className="bg-card border rounded-2xl p-6">

          <MapPin className="h-8 w-8 text-primary mb-3"/>

          <p className="text-muted-foreground">
            {t("senior.community.nearby")}
          </p>

          <h2 className="text-3xl font-bold">
            3
          </h2>

        </div>


        <div className="bg-card border rounded-2xl p-6">

          <CalendarDays className="h-8 w-8 text-primary mb-3"/>

          <p className="text-muted-foreground">
            {t("senior.community.thisWeek")}
          </p>

          <h2 className="text-3xl font-bold">
            28
          </h2>

        </div>


      </div>




      {/* Search */}

      <div className="flex flex-col md:flex-row gap-4 mb-8">


        <div className="relative flex-1">

          <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground"/>

          <input
            placeholder={t("senior.community.search")}
            className="w-full border rounded-xl pl-12 pr-4 py-3 bg-background"
          />

        </div>


        <select
          value={filter}
          onChange={(e)=>setFilter(e.target.value)}
          className="border rounded-xl px-4 py-3 bg-background"
        >

          <option>{t("senior.community.all")}</option>
          <option>High</option>
          <option>{t("senior.community.medium")}</option>
          <option>{t("senior.community.critical")}</option>

        </select>


      </div>




      {/* Alert Cards */}

      <div className="space-y-6">


        {filteredAlerts.map((alert)=>(


          <div
            key={alert.id}
            className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >


            <div className="flex flex-col lg:flex-row justify-between gap-4">


              <div className="flex-1">


                <div className="flex items-center gap-3 flex-wrap">


                  <h2 className="text-2xl font-semibold">
                    {alert.title}
                  </h2>


                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      alert.severity === "Critical"
                        ? "bg-red-600 text-white"
                        : alert.severity === "High"
                        ? "bg-orange-500 text-white"
                        : "bg-yellow-400 text-black"
                    }`}
                  >

                    {alert.severity}

                  </span>


                </div>



                <p className="text-muted-foreground mt-3">
                  {alert.description}
                </p>



                <div className="flex flex-wrap gap-6 mt-5 text-sm text-muted-foreground">


                  <span>
                    <strong>Category:</strong> {alert.category}
                  </span>


                  <span>
                    <strong>Location:</strong> {alert.area}
                  </span>


                  <span>
                    <strong>Reported:</strong> {alert.date}
                  </span>


                </div>


              </div>




              <div className="flex flex-col gap-3 min-w-[170px]">


                <Button>
                  {t("senior.community.viewDetails")}
                </Button>


                <Button variant="outline">
                  {t("senior.community.markRead")}
                </Button>


              </div>


            </div>


          </div>


        ))}


      </div>





      {/* Community Tips */}


      <div className="mt-10 bg-primary/5 border rounded-2xl p-6">


        <h2 className="text-2xl font-bold mb-4">
          {t("senior.community.staySafe")}
        </h2>



        <ul className="space-y-3 list-disc pl-5 text-muted-foreground">


          <li>
            Never share OTPs, PINs or banking credentials with anyone.
          </li>


          <li>
            Verify suspicious calls claiming to be from police, banks or government agencies.
          </li>


          <li>
            Report suspicious links, WhatsApp messages and investment schemes immediately.
          </li>


          <li>
            Enable two-factor authentication for important online accounts.
          </li>


          <li>
            Keep your family informed whenever you receive suspicious communications.
          </li>


        </ul>


      </div>



    </div>

  );

};


export default CommunityAlerts;