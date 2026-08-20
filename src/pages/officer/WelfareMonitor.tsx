import React, { useState, useEffect, useCallback } from "react";
import API_BASE from "@/lib/api";
import {
  HeartPulse,
  Loader2,
  MapPin,
  AlertTriangle,
  Users,
  Activity,
  ShieldAlert,
  ThermometerSun,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MissedCheckIn {
  id: string;
  fullName: string;
  phone: string;
  city?: string;
  deviceId?: string;
  lastCheckIn?: string | null;
}

interface RegionalStat {
  region: string;
  _count: { _all: number };
}

interface RegionalStatsResponse {
  byRegion: Record<string, number>;
  byCategory: Record<string, number>;
  total: number;
}

interface EvidenceStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  byCategory: { category: string; _count: { _all: number } }[];
}

const WelfareMonitor = () => {
  const [missed, setMissed] = useState<MissedCheckIn[]>([]);
  const [regional, setRegional] = useState<RegionalStat[]>([]);
  const [evidenceStats, setEvidenceStats] = useState<EvidenceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [sweeping, setSweeping] = useState(false);
  const [scanMsg, setScanMsg] = useState("");

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [missedRes, regionRes, evRes] = await Promise.all([
        fetch(`${API_BASE}/checkins/missed`),
        fetch(`${API_BASE}/community/stats/regional`),
        fetch(`${API_BASE}/evidence/stats`),
      ]);
      const missedData = await missedRes.json();
      const regionData = await regionRes.json();
      const evData = await evRes.json();
      if (missedData.success) setMissed(missedData.missed);
      if (regionData.success) {
        const stats: RegionalStatsResponse = regionData.stats;
        setRegional(
          Object.entries(stats.byRegion || {}).map(([region, count]) => ({
            region,
            _count: { _all: count },
          }))
        );
      }
      if (evData.success) setEvidenceStats(evData.stats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const runScan = async () => {
    setSweeping(true);
    setScanMsg("");
    try {
      const res = await fetch(`${API_BASE}/checkins/missed/trigger`, { method: "POST" });
      const data = await res.json();
      setScanMsg(
        data.triggered?.length
          ? `Alert triggered for ${data.triggered.length} senior(s) missing check-in.`
          : "No seniors missing check-in right now."
      );
      fetchAll();
    } catch (err) {
      console.error(err);
      setScanMsg("Scan failed — is the backend running?");
    } finally {
      setSweeping(false);
    }
  };

  const maxRegionCount = regional.length ? Math.max(...regional.map((r) => r._count._all)) : 1;

  const heatColor = (count: number) => {
    const ratio = count / maxRegionCount;
    if (ratio === 0) return "bg-gray-100 dark:bg-gray-800 text-gray-400";
    if (ratio < 0.34) return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
    if (ratio < 0.67) return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300";
    return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold">Welfare Check-in Monitor</h1>
            <p className="text-muted-foreground mt-2">
              Live heartbeat of senior citizen well-being — daily check-ins, regional activity and missed-check-in alerts.
            </p>
          </div>
          <Button onClick={runScan} disabled={sweeping}>
            {sweeping ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldAlert className="mr-2 h-4 w-4" />}
            {sweeping ? "Scanning..." : "Run missed check-in scan"}
          </Button>
        </div>

        {scanMsg && (
          <div className="mb-8 bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm">
            {scanMsg}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-card border rounded-2xl p-5">
                <HeartPulse className="h-7 w-7 text-green-500 mb-3" />
                <p className="text-sm text-muted-foreground">Evidence approved</p>
                <p className="text-3xl font-bold">{evidenceStats?.approved ?? "--"}</p>
              </div>
              <div className="bg-card border rounded-2xl p-5">
                <AlertTriangle className="h-7 w-7 text-amber-500 mb-3" />
                <p className="text-sm text-muted-foreground">Evidence awaiting review</p>
                <p className="text-3xl font-bold">{evidenceStats?.pending ?? "--"}</p>
              </div>
              <div className="bg-card border rounded-2xl p-5">
                <Users className="h-7 w-7 text-primary mb-3" />
                <p className="text-sm text-muted-foreground">Active regions</p>
                <p className="text-3xl font-bold">{regional.length}</p>
              </div>
              <div className="bg-card border rounded-2xl p-5">
                <XCircle className="h-7 w-7 text-red-500 mb-3" />
                <p className="text-sm text-muted-foreground">Missed check-ins</p>
                <p className="text-3xl font-bold">{missed.length}</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Regional heatmap */}
              <div className="bg-card border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-1">
                  <ThermometerSun className="h-5 w-5 text-orange-500" />
                  <h2 className="text-xl font-semibold">Regional Scam Activity Heatmap</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Community reports per region — darker = more reports.
                </p>

                {regional.length === 0 ? (
                  <p className="text-muted-foreground text-sm py-8 text-center">
                    No community activity yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {regional.map((r) => (
                      <div key={r.region} className="flex items-center gap-3">
                        <span className="w-32 text-sm font-medium truncate">{r.region}</span>
                        <div className="flex-1 h-8 rounded-lg overflow-hidden">
                          <div
                            className={`h-full flex items-center justify-center text-xs font-semibold transition-all ${heatColor(r._count._all)}`}
                            style={{ width: `${Math.max(12, (r._count._all / maxRegionCount) * 100)}%` }}
                          >
                            {r._count._all}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Missed check-ins */}
              <div className="bg-card border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="h-5 w-5 text-red-500" />
                  <h2 className="text-xl font-semibold">Seniors Missing Daily Check-in</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Automated alerts are sent to their caretakers every 30 minutes.
                </p>

                {missed.length === 0 ? (
                  <div className="text-center py-10">
                    <CheckCircle2 className="mx-auto h-10 w-10 text-green-500 mb-3" />
                    <p className="text-muted-foreground text-sm">
                      All seniors have checked in. No missed alerts.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {missed.map((m) => (
                      <div key={m.id} className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{m.fullName}</p>
                            <p className="text-xs text-muted-foreground">{m.phone}</p>
                          </div>
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                          <MapPin className="h-3.5 w-3.5" />
                          {m.city || "Unknown"}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Last check-in: {m.lastCheckIn ? new Date(m.lastCheckIn).toLocaleString("en-IN") : "Never"}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WelfareMonitor;