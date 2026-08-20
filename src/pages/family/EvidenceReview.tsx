import React, { useState, useEffect, useCallback } from "react";
import API_BASE from "@/lib/api";
import {
  ShieldCheck,
  Loader2,
  CheckCircle2,
  XCircle,
  FileImage,
  FileVideo,
  FileAudio,
  FileText,
  Sparkles,
  UserCheck,
  Clock3,
  Inbox,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface EvidenceReviewItem {
  id: string;
  status: string;
  aiCategory: string | null;
  aiConfidence: number | null;
  category: string | null;
  notes: string | null;
  createdAt: string;
  evidence: {
    id: string;
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: string | null;
    uploadedAt: string;
    user: { id: string; fullName: string; phone: string; role: string };
  };
}

const CATEGORY_OPTIONS = [
  { value: "phishing", label: "Phishing" },
  { value: "vishing", label: "Vishing (Call)" },
  { value: "smishing", label: "Smishing (SMS)" },
  { value: "upi_fraud", label: "UPI Fraud" },
  { value: "investment", label: "Investment Scam" },
  { value: "romance", label: "Romance Scam" },
  { value: "job", label: "Job Scam" },
  { value: "digital_arrest", label: "Digital Arrest" },
  { value: "lottery", label: "Lottery / Prize" },
  { value: "pension", label: "Pension Fraud" },
  { value: "general", label: "General" },
];

const EvidenceReview = () => {
  const [reviews, setReviews] = useState<EvidenceReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actioning, setActioning] = useState<string | null>(null);
  const [categoryOverride, setCategoryOverride] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/evidence/review`);
      const data = await res.json();
      if (data.success) setReviews(data.reviews);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleApprove = async (reviewId: string) => {
    setActioning(reviewId);
    try {
      const res = await fetch(`${API_BASE}/evidence/approve/${reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: categoryOverride[reviewId] || undefined,
          notes: notes[reviewId] || undefined,
          reviewerId: currentUser.id || undefined,
        }),
      });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActioning(null);
    }
  };

  const handleReject = async (reviewId: string) => {
    setActioning(reviewId);
    try {
      const res = await fetch(`${API_BASE}/evidence/reject/${reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          notes: notes[reviewId] || "Rejected by caretaker review",
          reviewerId: currentUser.id || undefined,
        }),
      });
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActioning(null);
    }
  };

  const fileIcon = (type: string) => {
    if (type === "IMAGE") return <FileImage className="h-8 w-8 text-blue-500" />;
    if (type === "VIDEO") return <FileVideo className="h-8 w-8 text-purple-500" />;
    if (type === "AUDIO") return <FileAudio className="h-8 w-8 text-orange-500" />;
    return <FileText className="h-8 w-8 text-gray-500" />;
  };

  const formatTime = (iso: string) => new Date(iso).toLocaleString("en-IN");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold">Evidence Review Board</h1>
          <p className="text-muted-foreground mt-2">
            Human-in-the-loop review. Evidence forwarded by senior citizens is auto-categorized by AI —
            you confirm the category before it is approved to the official evidence board.
          </p>
        </div>

        {/* How it works */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <h3 className="font-semibold">1. AI Auto-Categorizes</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              File names and descriptions are scanned to suggest the scam category with a confidence score.
            </p>
          </div>
          <div className="bg-card border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">2. Caretaker Confirms</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              You review each item, override the AI category if needed, and approve or reject.
            </p>
          </div>
          <div className="bg-card border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              <h3 className="font-semibold">3. Evidence Board Updated</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Approved evidence is submitted to the official board for police investigation.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-card border rounded-2xl p-12 text-center text-muted-foreground">
            <Inbox className="mx-auto h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No pending evidence</h3>
            <p>When your senior forwards scam content, it will appear here for your review.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-card border rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-muted">
                    {fileIcon(review.evidence.fileType)}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-lg">{review.evidence.fileName}</h3>
                      <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        Pending Review
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mt-1">
                      Uploaded by <strong>{review.evidence.user.fullName}</strong> ({review.evidence.user.role === "SENIOR" ? "senior" : "caretaker"}) • {formatTime(review.evidence.uploadedAt)}
                    </p>

                    {/* AI suggestion */}
                    <div className="mt-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 rounded-xl p-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Sparkles className="h-4 w-4 text-purple-500" />
                        <span className="font-medium text-purple-700 dark:text-purple-300">AI Suggestion:</span>
                        <span className="font-semibold capitalize">{review.aiCategory || "general"}</span>
                        {review.aiConfidence && (
                          <span className="text-xs text-muted-foreground">
                            ({Math.round(review.aiConfidence * 100)}% confidence)
                          </span>
                        )}
                      </div>
                    </div>

                    {review.notes && (
                      <p className="text-sm text-muted-foreground mt-2 italic">
                        "{review.notes}"
                      </p>
                    )}

                    {review.evidence.fileUrl && (
                      <a
                        href={review.evidence.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary text-sm underline mt-2 inline-block"
                      >
                        View evidence file →
                      </a>
                    )}

                    {/* Review actions */}
                    <div className="grid sm:grid-cols-2 gap-3 mt-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Category (override AI if needed)</label>
                        <Select
                          value={categoryOverride[review.id] || review.aiCategory || "general"}
                          onValueChange={(v) => setCategoryOverride({ ...categoryOverride, [review.id]: v })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORY_OPTIONS.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Notes for officer</label>
                        <Textarea
                          placeholder="Optional notes..."
                          value={notes[review.id] || ""}
                          onChange={(e) => setNotes({ ...notes, [review.id]: e.target.value })}
                          rows={1}
                          className="min-h-[38px]"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <Button
                        onClick={() => handleApprove(review.id)}
                        disabled={actioning === review.id}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {actioning === review.id ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                        )}
                        Approve to Evidence Board
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleReject(review.id)}
                        disabled={actioning === review.id}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-muted/50 rounded-2xl p-5 flex items-start gap-3">
          <Clock3 className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <strong>Legal note:</strong> Only approved evidence is forwarded to the Cyber Crime Branch.
            Each item is timestamped and linked to the uploading senior for investigation purposes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EvidenceReview;