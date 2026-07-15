import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const cases = [
  {
    id: "CASE-2026-00041",
    complaint: "ANW-2026-00124",
    citizen: "Ramesh Patel",
    officer: "Inspector Rahul Mehta",
    status: "Investigating",
    priority: "High",
    updated: "Today • 10:30 AM",
  },
  {
    id: "CASE-2026-00039",
    complaint: "ANW-2026-00118",
    citizen: "Anita Shah",
    officer: "Inspector Neha Shah",
    status: "Evidence Review",
    priority: "Medium",
    updated: "Yesterday",
  },
  {
    id: "CASE-2026-00031",
    complaint: "ANW-2026-00110",
    citizen: "Mahesh Joshi",
    officer: "Inspector Rahul Mehta",
    status: "Closed",
    priority: "Low",
    updated: "06 Jul 2026",
  },
];

const Cases = () => {
  const { t } = useLanguage();

  const [search, setSearch] = useState("");

  const filtered = cases.filter((item) =>
    item.id.toLowerCase().includes(search.toLowerCase()) ||
    item.citizen.toLowerCase().includes(search.toLowerCase()) ||
    item.complaint.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              {t("officer.cases.title")}
            </h1>

            <p className="text-muted-foreground mt-2">
              {t("officer.cases.subtitle")}
            </p>

          </div>

          <Button onClick={() => alert('New case creation form will open.')}>
            {t("officer.cases.create")}
          </Button>

        </div>



        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("officer.cases.total")}
            </p>

            <h2 className="text-4xl font-bold mt-2">
              61
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("officer.cases.active")}
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              29
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("officer.cases.evidenceReview")}
            </p>

            <h2 className="text-4xl font-bold text-orange-500 mt-2">
              14
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("officer.cases.closed")}
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              18
            </h2>

          </div>

        </div>



        <div className="bg-card border rounded-2xl p-6 mb-6">

          <input
            className="w-full border rounded-xl px-4 py-3 bg-background"
            placeholder={t("officer.cases.search")}
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>



        <div className="space-y-5">
        {filtered.map((item) => (

<div
  key={item.id}
  className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
>

  <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

    <div className="flex-1">

      <div className="flex items-center gap-3 mb-4">

        <h2 className="text-2xl font-semibold">
          {item.id}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            item.priority === "High"
              ? "bg-red-100 text-red-600"
              : item.priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {item.priority}
        </span>

      </div>



      <div className="grid md:grid-cols-2 gap-5">

        <div>

          <p className="text-muted-foreground">
            {t("officer.cases.complaintId")}
          </p>

          <p className="font-semibold">
            {item.complaint}
          </p>

        </div>



        <div>

          <p className="text-muted-foreground">
            {t("officer.cases.citizen")}
          </p>

          <p className="font-semibold">
            {item.citizen}
          </p>

        </div>



        <div>

          <p className="text-muted-foreground">
            {t("officer.cases.assignedOfficer")}
          </p>

          <p className="font-semibold">
            {item.officer}
          </p>

        </div>



        <div>

          <p className="text-muted-foreground">
            {t("officer.cases.status")}
          </p>

          <p className="font-semibold text-primary">
            {item.status}
          </p>

        </div>



        <div>

          <p className="text-muted-foreground">
            {t("officer.cases.lastUpdated")}
          </p>

          <p className="font-semibold">
            {item.updated}
          </p>

        </div>

      </div>

    </div>



    <div className="lg:w-72 space-y-3">

      <Button className="w-full" onClick={() => alert('Opening case: ' + item.id)}>
        {t("officer.cases.openCase")}
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => alert('Timeline for case: ' + item.id)}
      >
        Investigation Timeline
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => alert('Evidence for case: ' + item.id)}
      >
        View Evidence
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => alert('Case ' + item.id + ' marked as closed.')}
      >
        Close Case
      </Button>

    </div>

  </div>

</div>

))}
        </div>



{/* Investigation Pipeline */}

<div className="bg-card border rounded-2xl p-6 mt-8">

<h2 className="text-2xl font-semibold mb-6">
  {t("officer.cases.pipeline")}
</h2>

<div className="grid md:grid-cols-6 gap-4">

  <div className="border rounded-xl p-4 text-center">
    Complaint
  </div>

  <div className="border rounded-xl p-4 text-center">
    {t("officer.cases.created")}
  </div>

  <div className="border rounded-xl p-4 text-center">
    Officer Assigned
  </div>

  <div className="border rounded-xl p-4 text-center">
    Evidence Review
  </div>

  <div className="border rounded-xl p-4 text-center">
    Investigation
  </div>

  <div className="border rounded-xl p-4 text-center">
    Case Closed
  </div>

</div>

</div>

</div>

</div>

);

};

export default Cases;