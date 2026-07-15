import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import ReportFraud from "./ReportFraud";
import Cases from "./Cases";
import EvidenceVault from "./EvidenceVault";

const FraudCentre = () => {
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<
    "report" | "cases" | "evidence"
  >("report");

  const tabs = [
    {
      id: "report",
      label: t("senior.fraud.reportFraud")
    },
    {
      id: "cases",
      label: t("senior.fraud.myComplaints")
    },
    {
      id: "evidence",
      label: t("senior.fraud.evidenceVault")
    }
  ];

  return (

    <div className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto p-6">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            {t("senior.fraud.title")}
          </h1>

          <p className="text-muted-foreground mt-2">
            {t("senior.fraud.subtitle")}
          </p>

        </div>



        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-5 mb-8">

          <div className="bg-card border rounded-2xl p-5">

            <p className="text-muted-foreground">
              {t("senior.fraud.totalComplaints")}
            </p>

            <h2 className="text-4xl font-bold mt-2">
              3
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-5">

            <p className="text-muted-foreground">
              {t("senior.fraud.activeCases")}
            </p>

            <h2 className="text-4xl font-bold text-orange-600 mt-2">
              1
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-5">

            <p className="text-muted-foreground">
              {t("senior.fraud.evidenceFiles")}
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              4
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-5">

            <p className="text-muted-foreground">
              {t("senior.fraud.resolved")}
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              1
            </h2>

          </div>

        </div>



        {/* Navigation */}

        <div className="flex flex-wrap gap-3 mb-8">

          {tabs.map((tab) => (

            <button

              key={tab.id}

              onClick={() =>
                setActiveTab(tab.id as any)
              }

              className={`px-6 py-3 rounded-xl font-semibold transition

              ${
                activeTab === tab.id

                ? "bg-primary text-white"

                : "bg-card border hover:bg-muted"

              }`}

            >

              {tab.label}

            </button>

          ))}

        </div>
                {/* Content */}

                <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">

{activeTab === "report" && (
  <ReportFraud />
)}

{activeTab === "cases" && (
  <Cases />
)}

{activeTab === "evidence" && (
  <EvidenceVault />
)}

</div>



{/* Information */}

<div className="mt-8 bg-primary/5 border border-primary/20 rounded-2xl p-6">

<h2 className="text-2xl font-semibold mb-4">
  {t("senior.fraud.workflow")}
</h2>

<div className="grid md:grid-cols-4 gap-6">

  <div>

    <div className="text-3xl mb-3">
      📝
    </div>

    <h3 className="font-semibold">
      {t("senior.fraud.reportFraud")}
    </h3>

    <p className="text-sm text-muted-foreground mt-2">
      Submit complaint details, suspicious links, scam messages and supporting information.
    </p>

  </div>



  <div>

    <div className="text-3xl mb-3">
      📂
    </div>

    <h3 className="font-semibold">
      {t("senior.fraud.uploadEvidence")}
    </h3>

    <p className="text-sm text-muted-foreground mt-2">
      Securely attach screenshots, recordings, PDFs and other digital evidence.
    </p>

  </div>



  <div>

    <div className="text-3xl mb-3">
      👮
    </div>

    <h3 className="font-semibold">
      {t("senior.fraud.investigation")}
    </h3>

    <p className="text-sm text-muted-foreground mt-2">
      Ahmedabad Cyber Crime officers review the complaint, verify evidence and begin investigation.
    </p>

  </div>



  <div>

    <div className="text-3xl mb-3">
      ✅
    </div>

    <h3 className="font-semibold">
      {t("senior.fraud.trackProgress")}
    </h3>

    <p className="text-sm text-muted-foreground mt-2">
      Monitor complaint status, assigned officer and investigation updates in real time.
    </p>

  </div>

</div>

</div>

</div>

</div>

);

};

export default FraudCentre;
