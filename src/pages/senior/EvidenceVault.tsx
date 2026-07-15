import React, { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  FileText,
  Image,
  FileAudio,
  Link2,
  Upload,
  Search,
  Eye,
  Download,
  Trash2,
  ShieldCheck,
  FolderOpen,
  HardDrive,
  Files,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type EvidenceType = "Image" | "PDF" | "Audio" | "URL";

interface Evidence {
  id: string;
  title: string;
  type: EvidenceType;
  complaintId: string;
  uploadedBy: string;
  uploadDate: string;
  size: string;
}

const initialEvidence: Evidence[] = [
  {
    id: "EV-001",
    title: "WhatsApp Screenshot",
    type: "Image",
    complaintId: "ANW-2026-00124",
    uploadedBy: "Ramesh Patel",
    uploadDate: "10 Jul 2026",
    size: "1.4 MB",
  },
  {
    id: "EV-002",
    title: "Transaction Receipt",
    type: "PDF",
    complaintId: "ANW-2026-00124",
    uploadedBy: "Ramesh Patel",
    uploadDate: "10 Jul 2026",
    size: "820 KB",
  },
  {
    id: "EV-003",
    title: "Fraud Call Recording",
    type: "Audio",
    complaintId: "ANW-2026-00118",
    uploadedBy: "Ramesh Patel",
    uploadDate: "08 Jul 2026",
    size: "5.1 MB",
  },
  {
    id: "EV-004",
    title: "Suspicious Website",
    type: "URL",
    complaintId: "ANW-2026-00110",
    uploadedBy: "Ramesh Patel",
    uploadDate: "06 Jul 2026",
    size: "--",
  },
];

const EvidenceVault = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const evidence = useMemo(() => {
    return initialEvidence.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.complaintId.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || item.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const getIcon = (type: EvidenceType) => {
    switch (type) {
      case "Image":
        return <Image className="h-6 w-6 text-blue-600" />;
      case "PDF":
        return <FileText className="h-6 w-6 text-red-600" />;
      case "Audio":
        return <FileAudio className="h-6 w-6 text-green-600" />;
      case "URL":
        return <Link2 className="h-6 w-6 text-orange-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto p-6 lg:p-10">

        {/* Header */}

        <div className="bg-card border rounded-3xl p-8 mb-8">

          <div className="flex flex-col lg:flex-row justify-between gap-6">

            <div className="flex items-center gap-5">

              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">

                <ShieldCheck className="h-8 w-8 text-primary" />

              </div>

              <div>

                <h1 className="text-4xl font-bold">
                  {t("senior.evidence.title")}
                </h1>

                <p className="text-muted-foreground mt-2">
                  {t("senior.evidence.subtitle")}
                </p>

              </div>

            </div>

            <Button className="h-12 px-8">

              <Upload className="mr-2 h-5 w-5" />

              {t("senior.evidence.upload")}

            </Button>

          </div>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-card border rounded-2xl p-6">

            <FolderOpen className="h-8 w-8 text-primary mb-4" />

            <p className="text-muted-foreground">
              {t("senior.evidence.totalFiles")}
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {initialEvidence.length}
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <HardDrive className="h-8 w-8 text-primary mb-4" />

            <p className="text-muted-foreground">
              {t("senior.evidence.storageUsed")}
            </p>

            <h2 className="text-4xl font-bold mt-2">
              8.3 MB
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <Files className="h-8 w-8 text-primary mb-4" />

            <p className="text-muted-foreground">
              {t("senior.evidence.linkedCases")}
            </p>

            <h2 className="text-4xl font-bold mt-2">
              3
            </h2>

          </div>

        </div>

        {/* Search */}

        <div className="bg-card border rounded-2xl p-6 mb-8">

          <div className="grid lg:grid-cols-4 gap-4">

            <div className="lg:col-span-3 relative">

              <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("senior.evidence.search")}
                className="w-full rounded-xl border bg-background pl-12 p-4"
              />

            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border bg-background p-4"
            >
              <option>All</option>
              <option>Image</option>
              <option>PDF</option>
              <option>Audio</option>
              <option>URL</option>
            </select>

          </div>

        </div>

        {/* Evidence Grid */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"> </div>
        {evidence.length > 0 ? (

evidence.map((item) => (

  <div
    key={item.id}
    className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
  >

    <div className="flex items-center justify-between">

      <div className="flex items-center gap-3">

        {getIcon(item.type)}

        <div>

          <h3 className="font-semibold">
            {item.title}
          </h3>

          <p className="text-sm text-muted-foreground">
            {item.type}
          </p>

        </div>

      </div>

    </div>

    <div className="mt-6 space-y-2 text-sm">

      <div className="flex justify-between">

        <span className="text-muted-foreground">
          {t("senior.evidence.complaintId")}
        </span>

        <span className="font-medium">
          {item.complaintId}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-muted-foreground">
          {t("senior.evidence.uploadedBy")}
        </span>

        <span>
          {item.uploadedBy}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-muted-foreground">
          {t("senior.evidence.uploadDate")}
        </span>

        <span>
          {item.uploadDate}
        </span>

      </div>

      <div className="flex justify-between">

        <span className="text-muted-foreground">
          {t("senior.evidence.size")}
        </span>

        <span>
          {item.size}
        </span>

      </div>

    </div>

    <div className="grid grid-cols-3 gap-3 mt-6">

      <Button
        variant="outline"
        className="w-full"
      >
        <Eye className="h-4 w-4 mr-2" />
        {t("senior.evidence.view")}
      </Button>

      <Button
        variant="outline"
        className="w-full"
      >
        <Download className="h-4 w-4 mr-2" />
        {t("senior.evidence.download")}
      </Button>

      <Button
        variant="destructive"
        className="w-full"
      >
        <Trash2 className="h-4 w-4 mr-2" />
        {t("senior.evidence.delete")}
      </Button>

    </div>

  </div>

))

) : (

<div className="col-span-full">

  <div className="bg-card border rounded-2xl p-14 text-center">

    <ShieldCheck className="mx-auto h-16 w-16 text-primary mb-6" />

    <h2 className="text-2xl font-bold">
      {t("senior.evidence.none")}
    </h2>

    <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
      No evidence matches your current search or filter.
      Upload screenshots, PDFs, voice recordings or suspicious
      website links to securely preserve digital evidence.
    </p>

    <Button className="mt-8">

      <Upload className="mr-2 h-5 w-5" />

      Upload Evidence

    </Button>

  </div>

</div>

)}

</div>

</div>

);

};

export default EvidenceVault;