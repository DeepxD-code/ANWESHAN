import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const evidenceFiles = [
  {
    id: "EV-001",
    complaint: "ANW-2026-00124",
    type: "Screenshot",
    citizen: "Ramesh Patel",
    uploaded: "10 Jul 2026",
    size: "1.4 MB",
    status: "Verified",
  },
  {
    id: "EV-002",
    complaint: "ANW-2026-00124",
    type: "Bank Receipt",
    citizen: "Ramesh Patel",
    uploaded: "10 Jul 2026",
    size: "820 KB",
    status: "Pending",
  },
  {
    id: "EV-003",
    complaint: "ANW-2026-00118",
    type: "Voice Recording",
    citizen: "Anita Shah",
    uploaded: "08 Jul 2026",
    size: "5.1 MB",
    status: "Verified",
  },
];

const Evidence = () => {
  const { t } = useLanguage();

  const [search, setSearch] = useState("");

  const filtered = evidenceFiles.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.complaint.toLowerCase().includes(search.toLowerCase()) ||
      item.citizen.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              {t("officer.evidence.title")}
            </h1>

            <p className="text-muted-foreground mt-2">
              {t("officer.evidence.subtitle")}
            </p>

          </div>

          <Button onClick={() => alert('Evidence exported.')}>
            {t("officer.evidence.export")}
          </Button>

        </div>



        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("officer.evidence.totalFiles")}
            </p>

            <h2 className="text-4xl font-bold mt-2">
              326
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("officer.evidence.verified")}
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              241
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("officer.evidence.pendingReview")}
            </p>

            <h2 className="text-4xl font-bold text-orange-500 mt-2">
              85
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("officer.evidence.storageUsed")}
            </p>

            <h2 className="text-4xl font-bold text-primary mt-2">
              4.2 GB
            </h2>

          </div>

        </div>



        <div className="bg-card border rounded-2xl p-6 mb-6">

          <input
            className="w-full border rounded-xl px-4 py-3 bg-background"
            placeholder={t("officer.evidence.search")}
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
            item.status === "Verified"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {item.status}
        </span>

      </div>



      <div className="grid md:grid-cols-2 gap-5">

        <div>

          <p className="text-muted-foreground">
            {t("officer.evidence.complaintId")}
          </p>

          <p className="font-semibold">
            {item.complaint}
          </p>

        </div>



        <div>

          <p className="text-muted-foreground">
            {t("officer.evidence.citizen")}
          </p>

          <p className="font-semibold">
            {item.citizen}
          </p>

        </div>



        <div>

          <p className="text-muted-foreground">
            {t("officer.evidence.type")}
          </p>

          <p className="font-semibold">
            {item.type}
          </p>

        </div>



        <div>

          <p className="text-muted-foreground">
            {t("officer.evidence.uploadDate")}
          </p>

          <p className="font-semibold">
            {item.uploaded}
          </p>

        </div>



        <div>

          <p className="text-muted-foreground">
            {t("officer.evidence.fileSize")}
          </p>

          <p className="font-semibold">
            {item.size}
          </p>

        </div>

      </div>

    </div>



    <div className="lg:w-72 space-y-3">

      <Button className="w-full" onClick={() => alert('Viewing evidence: ' + item.id)}>
        {t("officer.evidence.view")}
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => alert('Downloading: ' + item.id)}
      >
        {t("officer.evidence.download")}
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => alert('Evidence ' + item.id + ' verified successfully.')}
      >
        {t("officer.evidence.verify")}
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => alert('Evidence linked to case for ' + item.id)}
      >
        {t("officer.evidence.linkToCase")}
      </Button>

    </div>

  </div>

</div>

))}
        </div>



<div className="bg-card border rounded-2xl p-6 mt-8">

<h2 className="text-2xl font-semibold mb-5">
  {t("officer.evidence.workflow")}
</h2>

<div className="grid md:grid-cols-5 gap-4">

  <div className="border rounded-xl p-4 text-center">
    Uploaded
  </div>

  <div className="border rounded-xl p-4 text-center">
    Integrity Check
  </div>

  <div className="border rounded-xl p-4 text-center">
    Officer Review
  </div>

  <div className="border rounded-xl p-4 text-center">
    Linked to Case
  </div>

  <div className="border rounded-xl p-4 text-center">
    Court Ready
  </div>

</div>

</div>

</div>

</div>

);

};

export default Evidence;