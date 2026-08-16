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
  CheckCircle2,
  AlertCircle,
  Lock,
  Share2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type EvidenceType = "Image" | "PDF" | "Audio" | "URL";
type EvidenceStatus = "Verified" | "Pending" | "Processing";

interface Evidence {
  id: string;
  title: string;
  type: EvidenceType;
  complaintId: string;
  uploadedBy: string;
  uploadDate: string;
  size: string;
  status: EvidenceStatus;
  description: string;
  tags: string[];
}

const initialEvidence: Evidence[] = [
  {
    id: "EV-001",
    title: "WhatsApp Screenshot - Fake Investment Offer",
    type: "Image",
    complaintId: "ANW-2026-00124",
    uploadedBy: "Ramesh Patel",
    uploadDate: "10 Jul 2026 • 2:30 PM",
    size: "1.4 MB",
    status: "Verified",
    description: "Screenshot showing conversation with scammer offering 50% returns on crypto investment",
    tags: ["investment-scam", "whatsapp", "crypto"],
  },
  {
    id: "EV-002",
    title: "Bank Transaction Receipt - Fraudulent Transfer",
    type: "PDF",
    complaintId: "ANW-2026-00124",
    uploadedBy: "Ramesh Patel",
    uploadDate: "10 Jul 2026 • 3:15 PM",
    size: "820 KB",
    status: "Verified",
    description: "Receipt showing ₹50,000 transferred to fraudulent account before recovery",
    tags: ["transaction", "bank-fraud", "loss-₹50k"],
  },
  {
    id: "EV-003",
    title: "Fraud Call Recording - Digital Arrest Scam",
    type: "Audio",
    complaintId: "ANW-2026-00118",
    uploadedBy: "Ramesh Patel",
    uploadDate: "08 Jul 2026 • 11:45 AM",
    size: "5.1 MB",
    status: "Verified",
    description: "Audio recording of scammer impersonating law enforcement officer threatening arrest",
    tags: ["phone-scam", "digital-arrest", "impersonation"],
  },
  {
    id: "EV-004",
    title: "Suspicious Website - Fake UPI Payment Page",
    type: "URL",
    complaintId: "ANW-2026-00110",
    uploadedBy: "Ramesh Patel",
    uploadDate: "06 Jul 2026 • 5:20 PM",
    size: "--",
    status: "Pending",
    description: "Link to cloned UPI payment page used to steal credentials (flagged for takedown)",
    tags: ["phishing", "upi-fraud", "website-clone"],
  },
  {
    id: "EV-005",
    title: "Email Thread - Prize Winning Scam",
    type: "PDF",
    complaintId: "ANW-2026-00105",
    uploadedBy: "Ramesh Patel",
    uploadDate: "05 Jul 2026 • 1:00 PM",
    size: "650 KB",
    status: "Verified",
    description: "Email thread claiming the recipient won a lottery prize worth ₹10 lakhs",
    tags: ["email-scam", "lottery-fraud", "impersonation"],
  },
  {
    id: "EV-006",
    title: "Telegram Group Screenshot - Fake Trading Group",
    type: "Image",
    complaintId: "ANW-2026-00103",
    uploadedBy: "Ramesh Patel",
    uploadDate: "03 Jul 2026 • 4:45 PM",
    size: "2.8 MB",
    status: "Processing",
    description: "Screenshot from telegram group showing fake trading signals and pump-and-dump scheme",
    tags: ["telegram", "trading-scam", "pump-and-dump"],
  },
  {
    id: "EV-007",
    title: "SMS Messages - OTP Phishing",
    type: "Image",
    complaintId: "ANW-2026-00098",
    uploadedBy: "Ramesh Patel",
    uploadDate: "01 Jul 2026 • 9:30 AM",
    size: "1.2 MB",
    status: "Verified",
    description: "Screenshots of SMS messages impersonating bank and requesting OTP verification",
    tags: ["sms-scam", "phishing", "otp-theft"],
  },
  {
    id: "EV-008",
    title: "Video Call Recording - Romance Scam Interview",
    type: "Audio",
    complaintId: "ANW-2026-00095",
    uploadedBy: "Ramesh Patel",
    uploadDate: "28 Jun 2026 • 7:15 PM",
    size: "8.5 MB",
    status: "Pending",
    description: "Video call recording showing scammer using deepfake to establish trust relationship",
    tags: ["romance-scam", "deepfake", "video-fraud"],
  },
];

const EvidenceVault = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);

  const evidence = useMemo(() => {
    return initialEvidence.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.complaintId.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

      const matchesFilter = filter === "All" || item.type === filter;
      const matchesStatusFilter = statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesFilter && matchesStatusFilter;
    });
  }, [search, filter, statusFilter]);

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

  const getStatusColor = (status: EvidenceStatus) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Processing":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    }
  };

  const getStatusIcon = (status: EvidenceStatus) => {
    switch (status) {
      case "Verified":
        return <CheckCircle2 className="h-4 w-4" />;
      case "Pending":
        return <AlertCircle className="h-4 w-4" />;
      case "Processing":
        return <Lock className="h-4 w-4" />;
    }
  };

  const totalSize = initialEvidence.reduce((acc, item) => {
    const sizeNum = parseFloat(item.size);
    return acc + (isNaN(sizeNum) ? 0 : sizeNum);
  }, 0);

  return (
    <div className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto p-6 lg:p-10">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-600/10 to-primary/10 border border-primary/20 rounded-3xl p-8 mb-8">

          <div className="flex flex-col lg:flex-row justify-between gap-6">

            <div className="flex items-center gap-5">

              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">

                <ShieldCheck className="h-8 w-8 text-primary" />

              </div>

              <div>

                <h1 className="text-4xl font-bold">
                  {t("senior.evidence.title")}
                </h1>

                <p className="text-muted-foreground mt-2">
                  Securely store and manage evidence for investigations with encryption and access control
                </p>

              </div>

            </div>

            <div className="flex gap-3">
              <Button variant="outline">
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
              <Button className="h-12 px-8 bg-primary hover:bg-primary/90">

                <Upload className="mr-2 h-5 w-5" />

                {t("senior.evidence.upload")}

              </Button>
            </div>

          </div>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-card border rounded-2xl p-6 hover:shadow-lg transition-shadow">

            <FolderOpen className="h-8 w-8 text-blue-600 mb-4" />

            <p className="text-muted-foreground">
              {t("senior.evidence.totalFiles")}
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {initialEvidence.length}
            </h2>

            <p className="text-xs text-muted-foreground mt-2">{evidence.length} matching filters</p>

          </div>

          <div className="bg-card border rounded-2xl p-6 hover:shadow-lg transition-shadow">

            <HardDrive className="h-8 w-8 text-green-600 mb-4" />

            <p className="text-muted-foreground">
              {t("senior.evidence.storageUsed")}
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {totalSize.toFixed(1)} MB
            </h2>

            <p className="text-xs text-muted-foreground mt-2">of 500 MB quota</p>

          </div>

          <div className="bg-card border rounded-2xl p-6 hover:shadow-lg transition-shadow">

            <Files className="h-8 w-8 text-orange-600 mb-4" />

            <p className="text-muted-foreground">
              {t("senior.evidence.linkedCases")}
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {new Set(initialEvidence.map(e => e.complaintId)).size}
            </h2>

            <p className="text-xs text-muted-foreground mt-2">Active complaints</p>

          </div>

          <div className="bg-card border rounded-2xl p-6 hover:shadow-lg transition-shadow">

            <CheckCircle2 className="h-8 w-8 text-green-600 mb-4" />

            <p className="text-muted-foreground">
              Verification Status
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {initialEvidence.filter(e => e.status === "Verified").length}
            </h2>

            <p className="text-xs text-muted-foreground mt-2">files verified</p>

          </div>

        </div>

        {/* Search & Filters */}

        <div className="bg-card border rounded-2xl p-6 mb-8">

          <div className="grid lg:grid-cols-4 gap-4">

            <div className="lg:col-span-2 relative">

              <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, complaint ID, or tag..."
                className="w-full rounded-xl border bg-background pl-12 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />

            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All File Types</option>
              <option>Image</option>
              <option>PDF</option>
              <option>Audio</option>
              <option>URL</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All Status</option>
              <option>Verified</option>
              <option>Pending</option>
              <option>Processing</option>
            </select>

          </div>

        </div>

        {/* Evidence Grid */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {evidence.length > 0 ? (

            evidence.map((item) => (

              <div
                key={item.id}
                onClick={() => setSelectedEvidence(item.id)}
                className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group"
              >

                <div className="flex items-center justify-between mb-4">

                  <div className="flex items-center gap-3">

                    {getIcon(item.type)}

                    <div>

                      <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition">
                        {item.title}
                      </h3>

                      <p className="text-xs text-muted-foreground">
                        {item.type}
                      </p>

                    </div>

                  </div>

                  <div className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                    {item.status}
                  </div>

                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                  {item.tags.length > 2 && (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                      +{item.tags.length - 2}
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-sm border-t pt-3 mb-4">

                  <div className="flex justify-between">

                    <span className="text-muted-foreground">
                      Complaint ID
                    </span>

                    <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                      {item.complaintId}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-muted-foreground">
                      Uploaded
                    </span>

                    <span className="text-xs">
                      {item.uploadDate}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-muted-foreground">
                      Size
                    </span>

                    <span className="text-xs font-mono">
                      {item.size}
                    </span>

                  </div>

                </div>

                <div className="grid grid-cols-3 gap-2">

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    className="text-xs h-8"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>

                </div>

              </div>

            ))

          ) : (

            <div className="col-span-full">
              <div className="bg-card border-2 border-dashed rounded-2xl p-12 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No evidence files match your filters</p>
                <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setFilter("All"); setStatusFilter("All"); }}>
                  Clear Filters
                </Button>
              </div>
            </div>

          )}

        </div>

      </div>

    </div>
  );

};

const EvidenceVaultLegacy = () => {
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
