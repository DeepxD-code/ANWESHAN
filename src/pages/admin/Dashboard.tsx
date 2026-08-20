import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, Activity, AlertTriangle, ShieldCheck, Users2, FileCheck2, MapPin } from "lucide-react";
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

interface Activity {
  type: string;
  message: string;
  createdAt: string;
}

const Dashboard = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/admin/stats`).then((r) => r.json()),
      fetch(`${API_BASE}/admin/activity`).then((r) => r.json()),
    ])
      .then(([s, a]) => {
        if (s.success) setStats(s.stats);
        if (a.success) setActivities(a.activities);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const activityIcon = (type: string) => {
    switch (type) {
      case "ALERT":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "CHECKIN":
        return <Activity className="h-5 w-5 text-green-500" />;
      case "COMMUNITY":
        return <Users2 className="h-5 w-5 text-blue-500" />;
      case "COMPLAINT":
        return <FileCheck2 className="h-5 w-5 text-orange-500" />;
      default:
        return <ShieldCheck className="h-5 w-5 text-primary" />;
    }
  };

  const formatTime = (iso: string) => new Date(iso).toLocaleString("en-IN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">{t("admin.dashboard.title")}</h1>
            <p className="text-muted-foreground mt-2">{t("admin.dashboard.subtitle")}</p>
          </div>
          <Button onClick={() => alert("Report exported (demo).")}>{t("admin.dashboard.generateReport")}</Button>
        </div>

        {/* Top Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border rounded-2xl p-6">
            <p className="text-muted-foreground">{t("admin.dashboard.registeredSeniors")}</p>
            <h2 className="text-4xl font-bold mt-2">{stats?.users.seniors ?? "--"}</h2>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.users.total ?? 0} total users • {stats?.users.families ?? 0} caretakers
            </p>
          </div>

          <div className="bg-card border rounded-2xl p-6">
            <p className="text-muted-foreground">{t("admin.dashboard.cyberOfficers")}</p>
            <h2 className="text-4xl font-bold text-primary mt-2">{stats?.users.officers ?? "--"}</h2>
          </div>

          <div className="bg-card border rounded-2xl p-6">
            <p className="text-muted-foreground">{t("admin.dashboard.activeCases")}</p>
            <h2 className="text-4xl font-bold text-orange-500 mt-2">{stats?.complaints.activeCases ?? "--"}</h2>
            <p className="text-xs text-muted-foreground mt-1">{stats?.complaints.total ?? 0} total complaints</p>
          </div>

          <div className="bg-card border rounded-2xl p-6">
            <p className="text-muted-foreground">Active Alerts</p>
            <h2 className="text-4xl font-bold text-red-500 mt-2">{stats?.alerts.active ?? "--"}</h2>
            <p className="text-xs text-muted-foreground mt-1">{stats?.alerts.total ?? 0} alerts total</p>
          </div>
        </div>

        {/* Second row */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border rounded-2xl p-6">
            <Activity className="h-7 w-7 text-green-500 mb-3" />
            <p className="text-muted-foreground">Daily Check-ins</p>
            <h2 className="text-4xl font-bold mt-2">{stats?.checkIns.total ?? "--"}</h2>
          </div>
          <div className="bg-card border rounded-2xl p-6">
            <FileCheck2 className="h-7 w-7 text-purple-500 mb-3" />
            <p className="text-muted-foreground">Evidence Files</p>
            <h2 className="text-4xl font-bold mt-2">{stats?.evidence.total ?? "--"}</h2>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.evidence.approved ?? 0} approved • {stats?.evidence.pending ?? 0} pending review
            </p>
          </div>
          <div className="bg-card border rounded-2xl p-6">
            <Users2 className="h-7 w-7 text-blue-500 mb-3" />
            <p className="text-muted-foreground">Community Posts</p>
            <h2 className="text-4xl font-bold mt-2">{stats?.community.posts ?? "--"}</h2>
            <p className="text-xs text-muted-foreground mt-1">{stats?.community.replies ?? 0} replies</p>
          </div>
          <div className="bg-card border rounded-2xl p-6">
            <ShieldCheck className="h-7 w-7 text-primary mb-3" />
            <p className="text-muted-foreground">Emergencies</p>
            <h2 className="text-4xl font-bold mt-2">{stats?.emergencies.total ?? "--"}</h2>
            <p className="text-xs text-muted-foreground mt-1">{stats?.emergencies.active ?? 0} active now</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* System Health */}
          <div className="bg-card border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6">{t("admin.dashboard.systemHealth")}</h2>
            <div className="space-y-5">
              <div className="border rounded-xl p-4">
                <p className="text-muted-foreground">{t("admin.dashboard.apiServer")}</p>
                <h3 className="text-xl font-bold text-green-600">{t("admin.dashboard.operational")}</h3>
              </div>
              <div className="border rounded-xl p-4">
                <p className="text-muted-foreground">Database</p>
                <h3 className="text-xl font-bold text-green-600">Connected</h3>
              </div>
              <div className="border rounded-xl p-4">
                <p className="text-muted-foreground">AI Detection Engine</p>
                <h3 className="text-xl font-bold text-orange-500">Monitoring</h3>
              </div>
              <div className="border rounded-xl p-4">
                <p className="text-muted-foreground">Emergency Services</p>
                <h3 className="text-xl font-bold text-green-600">Online</h3>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6">{t("admin.dashboard.recentActivity")}</h2>
            <div className="space-y-4">
              {activities.length === 0 && (
                <p className="text-muted-foreground text-sm text-center py-8">
                  No platform activity yet.
                </p>
              )}
              {activities.slice(0, 8).map((act, i) => (
                <div key={i} className="border rounded-xl p-4 flex items-start gap-3">
                  <div className="mt-0.5">{activityIcon(act.type)}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{act.message}</h3>
                    <p className="text-muted-foreground text-xs">{formatTime(act.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Regions */}
        <div className="bg-card border rounded-2xl p-6 mt-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Regional Scam Reports</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {(stats?.regions ?? []).map((r) => (
              <div key={r.region} className="border rounded-xl p-4 flex justify-between items-center">
                <span className="font-medium">{r.region}</span>
                <span className="text-2xl font-bold text-primary">{r._count._all}</span>
              </div>
            ))}
            {(stats?.regions ?? []).length === 0 && (
              <p className="text-muted-foreground text-sm">No reports yet.</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border rounded-2xl p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-6">{t("admin.dashboard.adminActions")}</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Button>{t("admin.dashboard.manageUsers")}</Button>
            <Button variant="outline">{t("admin.dashboard.viewAnalytics")}</Button>
            <Button variant="outline">{t("admin.dashboard.platformSettings")}</Button>
            <Button variant="outline">{t("admin.dashboard.systemLogs")}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;