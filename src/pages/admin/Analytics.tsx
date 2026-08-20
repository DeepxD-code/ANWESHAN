import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";
import API_BASE from "@/lib/api";

interface PlatformStats {
  users: { seniors: number; officers: number; admins: number; families: number; total: number };
  complaints: { total: number; activeCases: number };
  alerts: { total: number; active: number };
  checkIns: { total: number };
  evidence: { total: number; pending: number; approved: number };
  community: { posts: number; replies: number };
  emergencies: { total: number; active: number };
  regions: { region: string; _count: { _all: number } }[];
  evidenceByCategory: { category: string; _count: { _all: number } }[];
}

const CATEGORY_LABELS: Record<string, string> = {
  phishing: "Phishing",
  vishing: "Vishing (Call)",
  smishing: "Smishing (SMS)",
  upi_fraud: "UPI Fraud",
  investment: "Investment Scam",
  romance: "Romance Scam",
  job: "Job Scam",
  digital_arrest: "Digital Arrest",
  lottery: "Lottery / Prize",
  pension: "Pension Fraud",
  general: "General",
};

const Analytics = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/admin/stats`)
      .then((r) => r.json())
      .then((d) => d.success && setStats(d.stats))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const evidenceTotal = stats?.evidence.total ?? 0;
  const categoryRows = (stats?.evidenceByCategory ?? []).map((c) => ({
    label: CATEGORY_LABELS[c.category] || c.category,
    count: c._count._all,
    pct: evidenceTotal ? Math.round((c._count._all / evidenceTotal) * 100) : 0,
  }));

  const resolutionRate =
    stats && stats.evidence.total > 0
      ? Math.round((stats.evidence.approved / stats.evidence.total) * 100)
      : 0;

  const topRegion = (stats?.regions ?? []).slice().sort((a, b) => b._count._all - a._count._all)[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">{t("admin.analytics.title")}</h1>
            <p className="text-muted-foreground mt-2">{t("admin.analytics.subtitle")}</p>
          </div>
          <Button>{t("admin.analytics.export")}</Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border rounded-2xl p-6">
            <p className="text-muted-foreground">{t("admin.analytics.totalComplaints")}</p>
            <h2 className="text-4xl font-bold">{stats?.complaints.total ?? 0}</h2>
          </div>
          <div className="bg-card border rounded-2xl p-6">
            <p className="text-muted-foreground">{t("admin.analytics.activeSeniors")}</p>
            <h2 className="text-4xl font-bold text-primary">{stats?.users.seniors ?? 0}</h2>
          </div>
          <div className="bg-card border rounded-2xl p-6">
            <p className="text-muted-foreground">Emergency Responses</p>
            <h2 className="text-4xl font-bold text-red-600">{stats?.emergencies.total ?? 0}</h2>
            <p className="text-xs text-muted-foreground mt-1">{stats?.emergencies.active ?? 0} active now</p>
          </div>
          <div className="bg-card border rounded-2xl p-6">
            <p className="text-muted-foreground">Evidence Resolution</p>
            <h2 className="text-4xl font-bold text-green-600">{resolutionRate}%</h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-card border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6">Evidence by Scam Category</h2>
            {categoryRows.length === 0 && (
              <p className="text-muted-foreground text-sm text-center py-8">No evidence categorized yet.</p>
            )}
            <div className="space-y-5">
              {categoryRows.map((row) => (
                <div key={row.label} className="flex justify-between items-center border-b pb-3">
                  <span>{row.label}</span>
                  <span className="font-bold">
                    {row.count} ({row.pct}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6">{t("admin.analytics.performance")}</h2>
            <div className="space-y-5">
              <div className="border rounded-xl p-4">
                <p className="text-muted-foreground">Daily Check-ins</p>
                <h3 className="text-xl font-bold">{stats?.checkIns.total ?? 0}</h3>
              </div>
              <div className="border rounded-xl p-4">
                <p className="text-muted-foreground">Evidence Files</p>
                <h3 className="text-xl font-bold">{stats?.evidence.total ?? 0}</h3>
                <p className="text-xs text-muted-foreground">
                  {stats?.evidence.approved ?? 0} approved • {stats?.evidence.pending ?? 0} pending review
                </p>
              </div>
              <div className="border rounded-xl p-4">
                <p className="text-muted-foreground">Community Posts</p>
                <h3 className="text-xl font-bold">{stats?.community.posts ?? 0}</h3>
                <p className="text-xs text-muted-foreground">{stats?.community.replies ?? 0} replies</p>
              </div>
              <div className="border rounded-xl p-4">
                <p className="text-muted-foreground">Active Alerts</p>
                <h3 className="text-xl font-bold text-orange-500">{stats?.alerts.active ?? 0}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-6">{t("admin.analytics.aiInsights")}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-xl p-5">
              <h3 className="font-semibold">{t("admin.analytics.highestRiskZone")}</h3>
              <p className="text-muted-foreground mt-2">
                {topRegion
                  ? `${topRegion.region} leads with ${topRegion._count._all} community reports.`
                  : "No regional data yet."}
              </p>
            </div>
            <div className="border rounded-xl p-5">
              <h3 className="font-semibold">{t("admin.analytics.emergingScam")}</h3>
              <p className="text-muted-foreground mt-2">
                {categoryRows[0]
                  ? `${categoryRows[0].label} is the most reported category (${categoryRows[0].count} items).`
                  : "No evidence categories recorded yet."}
              </p>
            </div>
            <div className="border rounded-xl p-5">
              <h3 className="font-semibold">{t("admin.analytics.recommendation")}</h3>
              <p className="text-muted-foreground mt-2">
                Push multilingual awareness notifications to senior citizens in high-report regions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;