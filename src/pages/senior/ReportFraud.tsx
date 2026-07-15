import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  AlertTriangle,
  Upload,
  MapPin,
  Calendar,
  FileText,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { addComplaint } from "@/lib/demoStore";
import { useToast } from "@/hooks/use-toast"; 

const ReportFraud = () => {
  const { t } = useLanguage();
  
  const scamTypes = [
    t("senior.report.phishing"),
    t("senior.report.upiFraud"),
    "OTP Scam",
    "Investment Scam",
    "Digital Arrest",
    "Identity Theft",
    "WhatsApp Scam",
    "Social Media Fraud",
    "Job Scam",
    "Loan Scam",
    "Courier Scam",
    "Other",
  ];

  const priorities = [
    {
      label: t("senior.report.low"),
      color: "bg-green-500/15 text-green-600 border-green-500/30",
    },
    {
      label: t("senior.report.medium"),
      color: "bg-yellow-500/15 text-yellow-600 border-yellow-500/30",
    },
    {
      label: t("senior.report.high"),
      color: "bg-orange-500/15 text-orange-600 border-orange-500/30",
    },
    {
      label: t("senior.report.emergency"),
      color: "bg-red-500/15 text-red-600 border-red-500/30",
    },
  ];


  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

const [generatedComplaintId, setGeneratedComplaintId] =
  useState("");

  const [form, setForm] = useState({
    title: "",
    scamType: "",
    description: "",
    incidentDate: "",
    location: "",
    victimName: "",
    mobile: "",
    email: "",
    suspiciousUrl: "",
    priority: "Medium",
  });

  const updateField = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitComplaint = () => {

    if (
      !form.title ||
      !form.scamType ||
      !form.description
    ) {
  
      toast({
  
        title: "Incomplete Form",
  
        description:
          "Please complete all required fields before submitting.",
  
        variant: "destructive",
  
      });
  
      return;
  
    }
  
    const user = JSON.parse(
  
      localStorage.getItem("user") || "{}"
  
    );
  
    const complaint = addComplaint({
  
      title: form.title,
  
      category: form.scamType,
  
      description: form.description,
  
      location:
        form.location || "Not Provided",
  
      citizen:
        form.victimName ||
        user.fullName ||
        "Citizen",
  
      mobile:
        form.mobile ||
        user.phone ||
        "",
  
      email:
        form.email ||
        user.email ||
        "",
  
      priority:
        form.priority as any,
  
      status: "Pending",
  
      amount: 0,
  
      officer:
        "Awaiting Assignment",
  
      createdAt:
        new Date().toLocaleDateString(
  
          "en-IN",
  
          {
  
            day: "2-digit",
  
            month: "short",
  
            year: "numeric",
  
          }
  
        ),
  
      evidence: [],
  
    });
  
    setGeneratedComplaintId(
  
      complaint.id
  
    );
  
    setSubmitted(true);
  
    toast({
  
      title: "Complaint Submitted",
  
      description:
        "Your complaint has been successfully registered.",
  
    });
  
  };
  
  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">

        <div className="max-w-xl w-full bg-card border rounded-3xl shadow-xl p-10 text-center">

          <CheckCircle2 className="mx-auto h-20 w-20 text-green-600 mb-6" />

          <h1 className="text-4xl font-bold mb-4">
            {t("senior.report.submitted")}
          </h1>

          <p className="text-muted-foreground mb-8">
            Your cyber fraud complaint has been successfully submitted
            to the Ahmedabad Cyber Crime Branch.
          </p>

          <div className="rounded-2xl bg-muted p-6 space-y-4 text-left">

            <div className="flex justify-between">
              <span>Complaint ID</span>
              <strong>{generatedComplaintId}</strong>
            </div>

            <div className="flex justify-between">
              <span>Status</span>

              <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-700">
                Pending Review
              </span>
            </div>

            <div className="flex justify-between">
              <span>Submitted To</span>
              <strong>Cyber Crime Branch</strong>
            </div>

          </div>

          <Button

className="w-full mt-8 h-12"

onClick={() => {

setSubmitted(false);

setForm({

title: "",

scamType: "",

description: "",

incidentDate: "",

location: "",

victimName: "",

mobile: "",

email: "",

suspiciousUrl: "",

priority: "Medium",

});

}}

>
            {t("senior.report.submitAnother")}
          </Button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="max-w-6xl mx-auto p-6 lg:p-10">

        {/* Header */}

        <div className="bg-card border rounded-3xl p-8 mb-8">

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">

              <ShieldAlert className="h-8 w-8 text-primary" />

            </div>

            <div>

              <h1 className="text-4xl font-bold">
                {t("senior.report.title")}
              </h1>

              <p className="text-muted-foreground mt-2">
                File a cyber fraud complaint and securely submit evidence
                to Ahmedabad Cyber Crime Branch.
              </p>

            </div>

          </div>

        </div>

        <div className="grid xl:grid-cols-3 gap-8">

          {/* Left */}

          <div className="xl:col-span-2 space-y-6">

            {/* Scam Type */}

            <div className="bg-card border rounded-2xl p-6">

              <h2 className="text-2xl font-semibold mb-6">
                {t("senior.report.category")}
              </h2>

              <div className="grid md:grid-cols-3 gap-3">

                {scamTypes.map((type) => (

                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        scamType: type,
                      })
                    }
                    className={`rounded-xl border p-4 text-left transition

                    ${
                      form.scamType === type
                        ? "border-primary bg-primary/10"
                        : "hover:border-primary/40"
                    }`}
                  >
                    <AlertTriangle className="h-5 w-5 mb-3 text-primary" />

                    <p className="font-medium">
                      {type}
                    </p>

                  </button>

                ))}

              </div>

            </div>

            {/* Incident */}

            <div className="bg-card border rounded-2xl p-6">

              <h2 className="text-2xl font-semibold mb-6">
                {t("senior.report.details")}
              </h2>

              <div className="space-y-5">

                <input
                  name="title"
                  value={form.title}
                  onChange={updateField}
                  placeholder={t("senior.report.titleField")}
                  className="w-full rounded-xl border bg-background p-4"
                />

                <textarea
                  rows={7}
                  name="description"
                  value={form.description}
                  onChange={updateField}
                  placeholder="Describe exactly what happened..."
                  className="w-full rounded-xl border bg-background p-4 resize-none"
                />

                <div className="grid md:grid-cols-2 gap-4">

                  <div className="relative">

                    <Calendar className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />

                    <input
                      type="date"
                      name="incidentDate"
                      value={form.incidentDate}
                      onChange={updateField}
                      className="w-full rounded-xl border bg-background pl-12 p-4"
                    />

                  </div>

                  <div className="relative">

                    <MapPin className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />

                    <input
                      name="location"
                      value={form.location}
                      onChange={updateField}
                      placeholder="Location (Optional)"
                      className="w-full rounded-xl border bg-background pl-12 p-4"
                    />

                  </div>

                </div>

              </div>

            </div>
                        {/* Evidence Upload */}

                        <div className="bg-card border rounded-2xl p-6">

<h2 className="text-2xl font-semibold mb-6">
  {t("senior.report.evidence")}
</h2>

<div className="border-2 border-dashed border-primary/30 rounded-2xl p-10 text-center hover:border-primary transition">

  <Upload className="mx-auto h-12 w-12 text-primary mb-4" />

  <h3 className="text-xl font-semibold">
    {t("senior.report.uploadEvidence")}
  </h3>

  <p className="text-muted-foreground mt-2 mb-6">
    Screenshots, PDFs, voice recordings or scam messages.
  </p>

  <input type="file" multiple />

</div>

<div className="mt-6">

  <label className="font-medium">
    Suspicious Website / URL
  </label>

  <input
    name="suspiciousUrl"
    value={form.suspiciousUrl}
    onChange={updateField}
    placeholder="https://..."
    className="mt-2 w-full rounded-xl border bg-background p-4"
  />

</div>

</div>

{/* Victim Details */}

<div className="bg-card border rounded-2xl p-6">

<h2 className="text-2xl font-semibold mb-6">
  {t("senior.report.victimDetails")}
</h2>

<div className="grid md:grid-cols-2 gap-4">

  <input
    name="victimName"
    value={form.victimName}
    onChange={updateField}
    placeholder={t("senior.report.fullName")}
    className="rounded-xl border bg-background p-4"
  />

  <input
    name="mobile"
    value={form.mobile}
    onChange={updateField}
    placeholder={t("senior.report.mobile")}
    className="rounded-xl border bg-background p-4"
  />

  <input
    name="email"
    value={form.email}
    onChange={updateField}
    placeholder={t("senior.report.email")}
    className="rounded-xl border bg-background p-4 md:col-span-2"
  />

</div>

</div>

</div>

{/* Right Sidebar */}

<div className="space-y-6">

{/* Priority */}

<div className="bg-card border rounded-2xl p-6">

<h2 className="text-xl font-semibold mb-5">
  {t("senior.report.priority")}
</h2>

<div className="space-y-3">

  {priorities.map((priority) => (

    <button
      key={priority.label}
      type="button"
      onClick={() =>
        setForm({
          ...form,
          priority: priority.label,
        })
      }
      className={`w-full rounded-xl border p-4 text-left transition

      ${
        form.priority === priority.label
          ? priority.color
          : "hover:border-primary"
      }`}
    >
      {priority.label}
    </button>

  ))}

</div>

</div>

{/* Tips */}

<div className="bg-card border rounded-2xl p-6">

<h2 className="text-xl font-semibold mb-5">
  {t("senior.report.beforeSubmit")}
</h2>

<div className="space-y-4 text-sm text-muted-foreground">

  <div className="flex gap-3">

    <FileText className="h-5 w-5 text-primary mt-1" />

    <p>
      Include screenshots, transaction receipts,
      messages or recordings whenever available.
    </p>

  </div>

  <div className="flex gap-3">

    <FileText className="h-5 w-5 text-primary mt-1" />

    <p>
      Provide accurate dates and times to help the
      investigation team.
    </p>

  </div>

  <div className="flex gap-3">

    <FileText className="h-5 w-5 text-primary mt-1" />

    <p>
      Do not delete conversations or call history until
      the investigation is completed.
    </p>

  </div>

</div>

</div>

{/* Submit */}

<div className="bg-card border rounded-2xl p-6">

<Button
  onClick={submitComplaint}
  className="w-full h-14 text-lg"
>
  {t("senior.report.submit")}
</Button>

<p className="text-center text-sm text-muted-foreground mt-4">
  Your complaint will be securely submitted to the
  Ahmedabad Cyber Crime Branch.
</p>

</div>

</div>

</div>

</div>

</div>
);
};

export default ReportFraud;