import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Download,
  Eye,
  CheckCircle2,
  AlertCircle,
  FileText,
  Image,
  FileAudio,
  Link2,
  Search,
  Filter,
  BarChart3,
  Lock,
  Link,
  FileCheck,
  Zap,
} from "lucide-react";

interface EvidenceFile {
  id: string;
  complaint: string;
  type: "Screenshot" | "Bank Receipt" | "Voice Recording" | "Email" | "Document" | "Video";
  citizen: string;
  uploaded: string;
  size: string;
  status: "Verified" | "Pending" | "Rejected";
  integrity: "Valid" | "Processing" | "Failed";
  scamType: string;
  description: string;
  linkedCase?: string;
}

const evidenceFiles: EvidenceFile[] = [
  {
    id: "EV-001",
    complaint: "ANW-2026-00124",
    type: "Screenshot",
    citizen: "Ramesh Patel",
    uploaded: "10 Jul 2026 • 2:30 PM",
    size: "1.4 MB",
    status: "Verified",
    integrity: "Valid",
    scamType: "Investment Scam",
    description: "WhatsApp message offering 50% returns on crypto investment",
    linkedCase: "CASE-2026-0842",
  },
  {
    id: "EV-002",
    complaint: "ANW-2026-00124",
    type: "Bank Receipt",
    citizen: "Ramesh Patel",
    uploaded: "10 Jul 2026 • 3:15 PM",
    size: "820 KB",
    status: "Verified",
    integrity: "Valid",
    scamType: "Investment Scam",
    description: "Transaction proof showing ₹50,000 transfer",
    linkedCase: "CASE-2026-0842",
  },
  {
    id: "EV-003",
    complaint: "ANW-2026-00118",
    type: "Voice Recording",
    citizen: "Anita Shah",
    uploaded: "08 Jul 2026 • 11:45 AM",
    size: "5.1 MB",
    status: "Verified",
    integrity: "Valid",
    scamType: "Digital Arrest Scam",
    description: "Call recording of scammer impersonating police officer",
    linkedCase: "CASE-2026-0831",
  },
  {
    id: "EV-004",
    complaint: "ANW-2026-00110",
    type: "Screenshot",
    citizen: "Priya Sharma",
    uploaded: "06 Jul 2026 • 5:20 PM",
    size: "2.3 MB",
    status: "Pending",
    integrity: "Processing",
    scamType: "Phishing - UPI Fraud",
    description: "Cloned UPI payment page screenshot",
    linkedCase: undefined,
  },
  {
    id: "EV-005",
    complaint: "ANW-2026-00105",
    type: "Email",
    citizen: "Vijay Kumar",
    uploaded: "05 Jul 2026 • 1:00 PM",
    size: "650 KB",
    status: "Verified",
    integrity: "Valid",
    scamType: "Lottery Scam",
    description: "Email claiming victim won ₹10 lakhs lottery",
    linkedCase: "CASE-2026-0823",
  },
  {
    id: "EV-006",
    complaint: "ANW-2026-00103",
    type: "Screenshot",
    citizen: "Meera Patel",
    uploaded: "03 Jul 2026 • 4:45 PM",
    size: "2.8 MB",
    status: "Verified",
    integrity: "Valid",
    scamType: "Trading Pump & Dump",
    description: "Telegram group screenshot showing fake trading signals",
    linkedCase: "CASE-2026-0815",
  },
  {
    id: "EV-007",
    complaint: "ANW-2026-00098",
    type: "Screenshot",
    citizen: "Rajesh Gupta",
    uploaded: "01 Jul 2026 • 9:30 AM",
    size: "1.2 MB",
    status: "Verified",
    integrity: "Valid",
    scamType: "OTP Phishing",
    description: "SMS messages impersonating HDFC Bank requesting OTP",
    linkedCase: "CASE-2026-0807",
  },
  {
    id: "EV-008",
    complaint: "ANW-2026-00095",
    type: "Video",
    citizen: "Supriya Desai",
    uploaded: "28 Jun 2026 • 7:15 PM",
    size: "8.5 MB",
    status: "Pending",
    integrity: "Valid",
    scamType: "Romance Scam - Deepfake",
    description: "Video call recording with deepfake person",
    linkedCase: undefined,
  },
  {
    id: "EV-009",
    complaint: "ANW-2026-00089",
    type: "Document",
    citizen: "Anand Singh",
    uploaded: "25 Jun 2026 • 2:10 PM",
    size: "3.5 MB",
    status: "Verified",
    integrity: "Valid",
    scamType: "Job Recruitment Scam",
    description: "Fake job offer letter document",
    linkedCase: "CASE-2026-0798",
  },
  {
    id: "EV-010",
    complaint: "ANW-2026-00082",
    type: "Bank Receipt",
    citizen: "Priya Nair",
    uploaded: "22 Jun 2026 • 11:20 AM",
    size: "950 KB",
    status: "Rejected",
    integrity: "Failed",
    scamType: "Refund Scam",
    description: "Duplicate/corrupted file - rejected",
    linkedCase: undefined,
  },
];

const Evidence = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => {
    return evidenceFiles.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.complaint.toLowerCase().includes(search.toLowerCase()) ||
        item.citizen.toLowerCase().includes(search.toLowerCase()) ||
        item.scamType.toLowerCase().includes(search.toLowerCase());

      const matchesType = typeFilter === "All" || item.type === typeFilter;
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [search, typeFilter, statusFilter]);

  const stats = {
    total: evidenceFiles.length,
    verified: evidenceFiles.filter((e) => e.status === "Verified").length,
    pending: evidenceFiles.filter((e) => e.status === "Pending").length,
    rejected: evidenceFiles.filter((e) => e.status === "Rejected").length,
    totalSize: (evidenceFiles.reduce((sum, e) => {
      const parsed = parseFloat(e.size);
      return sum + (isNaN(parsed) ? 0 : parsed);
    }, 0) / 1024).toFixed(2),
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Screenshot":
        return <Image className="h-5 w-5 text-blue-600" />;
      case "Bank Receipt":
        return <FileText className="h-5 w-5 text-green-600" />;
      case "Voice Recording":
        return <FileAudio className="h-5 w-5 text-purple-600" />;
      case "Email":
        return <Link2 className="h-5 w-5 text-orange-600" />;
      case "Document":
        return <FileText className="h-5 w-5 text-red-600" />;
      case "Video":
        return <FileAudio className="h-5 w-5 text-pink-600" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Rejected":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getIntegrityIcon = (integrity: string) => {
    switch (integrity) {
      case "Valid":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "Processing":
        return <Zap className="h-4 w-4 text-yellow-600 animate-pulse" />;
      case "Failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              {t("officer.evidence.title")}
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage and review evidence collected from cyber crime complaints
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 h-11">
            <Download className="mr-2 h-5 w-5" />
            Export Report
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <div className="bg-card border rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <BarChart3 className="h-8 w-8 text-blue-600 mb-3" />
            <p className="text-muted-foreground text-sm">
              {t("officer.evidence.totalFiles")}
            </p>
            <h2 className="text-3xl font-bold mt-1">
              {stats.total}
            </h2>
            <p className="text-xs text-muted-foreground mt-2">{filtered.length} displayed</p>
          </div>

          <div className="bg-card border rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <CheckCircle2 className="h-8 w-8 text-green-600 mb-3" />
            <p className="text-muted-foreground text-sm">
              {t("officer.evidence.verified")}
            </p>
            <h2 className="text-3xl font-bold text-green-600 mt-1">
              {stats.verified}
            </h2>
            <p className="text-xs text-muted-foreground mt-2">{((stats.verified/stats.total)*100).toFixed(0)}% verified</p>
          </div>

          <div className="bg-card border rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <AlertCircle className="h-8 w-8 text-orange-500 mb-3" />
            <p className="text-muted-foreground text-sm">
              {t("officer.evidence.pendingReview")}
            </p>
            <h2 className="text-3xl font-bold text-orange-500 mt-1">
              {stats.pending}
            </h2>
            <p className="text-xs text-muted-foreground mt-2">Awaiting verification</p>
          </div>

          <div className="bg-card border rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <Lock className="h-8 w-8 text-red-600 mb-3" />
            <p className="text-muted-foreground text-sm">
              Rejected
            </p>
            <h2 className="text-3xl font-bold text-red-600 mt-1">
              {stats.rejected}
            </h2>
            <p className="text-xs text-muted-foreground mt-2">Invalid/Corrupted</p>
          </div>

          <div className="bg-card border rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <FileCheck className="h-8 w-8 text-primary mb-3" />
            <p className="text-muted-foreground text-sm">
              {t("officer.evidence.storageUsed")}
            </p>
            <h2 className="text-3xl font-bold text-primary mt-1">
              {stats.totalSize} GB
            </h2>
            <p className="text-xs text-muted-foreground mt-2">Total capacity</p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-card border rounded-2xl p-6 mb-6">
          <div className="grid lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
              <input
                className="w-full border rounded-xl px-4 py-3 pl-12 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={t("officer.evidence.search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border rounded-xl px-4 py-3 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All Types</option>
              <option>Screenshot</option>
              <option>Bank Receipt</option>
              <option>Voice Recording</option>
              <option>Email</option>
              <option>Document</option>
              <option>Video</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-xl px-4 py-3 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All Status</option>
              <option>Verified</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        {/* Evidence List */}
        <div className="space-y-4">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all group"
              >
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Left Section */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="pt-1">
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold group-hover:text-primary transition">
                            {item.id} • {item.type}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid md:grid-cols-3 gap-4 bg-muted/30 rounded-xl p-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Complaint ID</p>
                        <p className="font-mono text-sm font-semibold">{item.complaint}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Citizen</p>
                        <p className="text-sm font-medium">{item.citizen}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Scam Type</p>
                        <p className="text-sm font-medium">{item.scamType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Uploaded</p>
                        <p className="text-sm font-medium">{item.uploaded}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">File Size</p>
                        <p className="text-sm font-mono font-semibold">{item.size}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Integrity</p>
                        <div className="flex items-center gap-2 mt-1">
                          {getIntegrityIcon(item.integrity)}
                          <span className="text-sm font-medium">{item.integrity}</span>
                        </div>
                      </div>
                    </div>

                    {/* Linked Case */}
                    {item.linkedCase && (
                      <div className="flex items-center gap-2 text-sm bg-green-100/50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-2 rounded-lg">
                        <Link className="h-4 w-4" />
                        Linked to <span className="font-semibold">{item.linkedCase}</span>
                      </div>
                    )}
                  </div>

                  {/* Right Section - Actions */}
                  <div className="flex flex-col gap-2">
                    <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                      <Eye className="h-4 w-4 mr-2" />
                      View Evidence
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    {item.status === "Pending" && (
                      <Button size="sm" variant="outline" className="w-full">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Verify
                      </Button>
                    )}
                    {!item.linkedCase && (
                      <Button size="sm" variant="outline" className="w-full">
                        <Link className="h-4 w-4 mr-2" />
                        Link to Case
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-card border-2 border-dashed rounded-2xl p-12 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No evidence files match your filters</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearch("");
                  setTypeFilter("All");
                  setStatusFilter("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Evidence Workflow */}
        <div className="bg-card border rounded-2xl p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-6">Evidence Processing Workflow</h2>
          <div className="grid md:grid-cols-5 gap-3">
            {[
              { step: "1", label: "Uploaded", icon: "📤" },
              { step: "2", label: "Integrity Check", icon: "✓" },
              { step: "3", label: "Officer Review", icon: "👮" },
              { step: "4", label: "Linked to Case", icon: "🔗" },
              { step: "5", label: "Court Ready", icon: "⚖️" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-2">
                  {item.icon}
                </div>
                <p className="text-sm font-semibold text-center">{item.label}</p>
                {idx < 4 && <div className="hidden md:block w-full h-1 bg-muted mt-4" />}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const EvidenceLegacy = () => {
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
