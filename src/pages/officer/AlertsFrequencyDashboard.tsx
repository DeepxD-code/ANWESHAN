import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import API_BASE from "@/lib/api";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Download,
  Map as MapIcon,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TimeRange = "7d" | "30d" | "3m" | "ytd";

type AlertRecord = {
  type?: string;
  status?: string;
  duress?: boolean;
  severity?: string;
  classification?: string | null;
  location?: string | null;
  createdAt?: string;
  resolvedAt?: string | null;
};

type ComplaintRecord = {
  category?: string;
  priority?: string;
  status?: string;
  location?: string | null;
  reportedLoss?: number | null;
  createdAt?: string;
  user?: { age?: number | null };
};

type ThreadRecord = {
  scamType?: string;
  area?: string | null;
  createdAt?: string;
};

type DashboardData = {
  alerts: AlertRecord[];
  complaints: ComplaintRecord[];
  threads: ThreadRecord[];
};

type ApiPayload = {
  alerts?: AlertRecord[];
  complaints?: ComplaintRecord[];
  threads?: ThreadRecord[];
};

type Bucket = { label: string; start: Date; end: Date };

const COLORS = {
  red: "#ef4444",
  orange: "#f97316",
  yellow: "#eab308",
  purple: "#8b5cf6",
  pink: "#ec4899",
  cyan: "#06b6d4",
  green: "#22c55e",
  blue: "#3b82f6",
  gray: "#6b7280",
};

const SCAM_TYPES = [
  { key: "upi", label: "UPI Fraud", color: COLORS.red },
  { key: "investment", label: "Investment Scam", color: COLORS.orange },
  { key: "otp", label: "OTP Phishing", color: COLORS.yellow },
  { key: "digital_arrest", label: "Digital Arrest", color: COLORS.purple },
  { key: "romance", label: "Romance Scam", color: COLORS.pink },
];

const RANGE_LABELS: Record<TimeRange, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "3m": "Last 3 months",
  ytd: "Year to date",
};

const toDate = (value?: string | null) => (value ? new Date(value) : null);

const startOfDay = (date: Date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });

const createBuckets = (range: TimeRange, now = new Date()): Bucket[] => {
  if (range === "ytd") {
    return Array.from({ length: now.getMonth() + 1 }, (_, index) => {
      const start = new Date(now.getFullYear(), index, 1);
      const end = new Date(now.getFullYear(), index + 1, 1);
      return { label: start.toLocaleDateString("en-IN", { month: "short" }), start, end };
    });
  }

  const count = range === "7d" ? 7 : range === "30d" ? 5 : 6;
  const step = range === "7d" ? 1 : range === "30d" ? 7 : 14;
  const start = startOfDay(addDays(now, -(count * step - 1)));

  return Array.from({ length: count }, (_, index) => {
    const bucketStart = addDays(start, index * step);
    const bucketEnd = addDays(bucketStart, step);
    return {
      label: range === "7d" ? formatDate(bucketStart) : `${formatDate(bucketStart)}–${formatDate(addDays(bucketEnd, -1))}`,
      start: bucketStart,
      end: bucketEnd,
    };
  });
};

const normalizeScamType = (value?: string | null) => {
  const text = (value || "").toLowerCase();
  if (text.includes("upi") || text.includes("payment")) return "upi";
  if (text.includes("invest") || text.includes("trading")) return "investment";
  if (text.includes("otp") || text.includes("phish")) return "otp";
  if (text.includes("digital") || text.includes("arrest")) return "digital_arrest";
  if (text.includes("romance") || text.includes("relationship")) return "romance";
  return "other";
};

const displayScamType = (value?: string | null) => {
  const match = SCAM_TYPES.find((type) => type.key === normalizeScamType(value));
  return match?.label || value || "Other";
};

const isResolved = (status?: string | null) =>
  ["resolved", "closed", "completed"].includes((status || "").toLowerCase());

const isFalseAlarm = (alert: AlertRecord) => {
  const status = `${alert.status || ""} ${alert.classification || ""}`.toLowerCase();
  return status.includes("false") || status.includes("test");
};

const isSos = (alert: AlertRecord) => {
  const type = (alert.type || "").toLowerCase();
  return type.includes("sos") || Boolean(alert.duress);
};

const isCheckIn = (alert: AlertRecord) => {
  const type = (alert.type || "").toLowerCase();
  return type.includes("checkin") || type.includes("wellness");
};

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

type TooltipEntry = {
  dataKey?: string | number;
  name?: string;
  value?: string | number;
  color?: string;
  stroke?: string;
  fill?: string;
};

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipEntry[]; label?: string | number }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3 shadow-lg">
      <p className="mb-1 font-semibold text-foreground">{label}</p>
      {payload.map((entry, index) => (
        <p key={`${entry.dataKey}-${index}`} className="text-sm" style={{ color: entry.color || entry.stroke || entry.fill }}>
          {entry.name || entry.dataKey}: {entry.value}
        </p>
      ))}
    </div>
  );
};

const EmptyChart = ({ message = "No records in this period" }: { message?: string }) => (
  <div className="flex h-[300px] items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-6 text-center text-sm text-muted-foreground">
    {message}
  </div>
);

const AlertsAndFrequencyDashboard = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");
  const [data, setData] = useState<DashboardData>({ alerts: [], complaints: [], threads: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadDashboardData = async () => {
      setLoading(true);
      setError(null);

      const fetchJson = async (path: string): Promise<ApiPayload> => {
        const response = await fetch(`${API_BASE}${path}`);
        if (!response.ok) throw new Error(`${path} returned ${response.status}`);
        return response.json();
      };

      const [alertsResult, complaintsResult, threadsResult] = await Promise.allSettled([
        fetchJson("/alerts"),
        fetchJson("/complaints"),
        fetchJson("/community/threads?take=1000"),
      ]);

      if (cancelled) return;

      if (alertsResult.status !== "fulfilled" || complaintsResult.status !== "fulfilled") {
        setError("Live analytics data could not be loaded. Check the backend connection and retry.");
        setLoading(false);
        return;
      }

      setData({
        alerts: alertsResult.value.alerts || [],
        complaints: complaintsResult.value.complaints || [],
        threads: threadsResult.status === "fulfilled" ? (threadsResult.value.threads || []) : [],
      });
      setLoading(false);
    };

    loadDashboardData().catch(() => {
      if (!cancelled) {
        setError("Live analytics data could not be loaded. Check the backend connection and retry.");
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const dashboard = useMemo(() => {
    const now = new Date();
    const buckets = createBuckets(timeRange, now);
    const rangeStart = buckets[0]?.start || now;
    const inRange = (value?: string | null) => {
      const date = toDate(value);
      return Boolean(date && date >= rangeStart && date <= now);
    };

    const alerts = data.alerts.filter((alert) => inRange(alert.createdAt));
    const complaints = data.complaints.filter((complaint) => inRange(complaint.createdAt));
    const threads = data.threads.filter((thread) => inRange(thread.createdAt));
    const sosAlerts = alerts.filter(isSos);
    const checkins = alerts.filter(isCheckIn);

    const sosHourlyData = Array.from({ length: 12 }, (_, index) => {
      const hour = index * 2;
      const matching = sosAlerts.filter((alert) => toDate(alert.createdAt)?.getHours() === hour);
      return {
        hour: `${String(hour).padStart(2, "0")}:00`,
        sos: matching.length,
        emergency: matching.filter((alert) => alert.duress || alert.severity === "critical").length,
      };
    });

    const sosDailyData = buckets.map((bucket) => {
      const matching = sosAlerts.filter((alert) => {
        const date = toDate(alert.createdAt);
        return Boolean(date && date >= bucket.start && date < bucket.end);
      });
      const falseAlarms = matching.filter(isFalseAlarm).length;
      return {
        day: bucket.label,
        activated: matching.length,
        verified: matching.length - falseAlarms,
        false_alarm: falseAlarms,
      };
    });

    const reasonCounts = new Map<string, number>();
    sosAlerts.forEach((alert) => {
      const rawReason = alert.classification || alert.type;
      const reason = rawReason && !["sos", "emergency"].includes(rawReason.toLowerCase())
        ? displayScamType(rawReason)
        : alert.duress
          ? "Personal Safety"
          : "SOS Alert";
      reasonCounts.set(reason, (reasonCounts.get(reason) || 0) + 1);
    });
    const sosReasonData = [...reasonCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([name, value], index) => ({ name, value, color: [COLORS.red, COLORS.purple, COLORS.yellow, COLORS.cyan, COLORS.green, COLORS.orange][index % 6] }));

    const policeTypeCounts = new Map<string, { alerts: number; resolved: number; pending: number }>();
    complaints.forEach((complaint) => {
      const name = displayScamType(complaint.category);
      const current = policeTypeCounts.get(name) || { alerts: 0, resolved: 0, pending: 0 };
      current.alerts += 1;
      if (isResolved(complaint.status)) current.resolved += 1;
      else current.pending += 1;
      policeTypeCounts.set(name, current);
    });
    const policeAlertsByType = [...policeTypeCounts.entries()]
      .sort((a, b) => b[1].alerts - a[1].alerts)
      .map(([name, values]) => ({ name, ...values }));

    const policePeriodData = buckets.map((bucket) => {
      const matching = complaints.filter((complaint) => {
        const date = toDate(complaint.createdAt);
        return Boolean(date && date >= bucket.start && date < bucket.end);
      });
      return {
        day: bucket.label,
        resolved: matching.filter((complaint) => isResolved(complaint.status)).length,
        pending: matching.filter((complaint) => !isResolved(complaint.status)).length,
      };
    });

    const checkinDailyData = buckets.map((bucket) => ({
      day: bucket.label,
      completed: checkins.filter((checkin) => {
        const date = toDate(checkin.createdAt);
        return Boolean(date && date >= bucket.start && date < bucket.end);
      }).length,
    }));

    const locationCounts = new Map<string, { alerts: number; sos: number; severity: string }>();
    complaints.forEach((complaint) => {
      const area = complaint.location?.trim() || "Unknown area";
      const current = locationCounts.get(area) || { alerts: 0, sos: 0, severity: "low" };
      current.alerts += 1;
      current.severity = complaint.priority?.toLowerCase() === "critical" ? "critical" : complaint.priority?.toLowerCase() === "high" ? "high" : current.severity;
      locationCounts.set(area, current);
    });
    sosAlerts.forEach((alert) => {
      const area = alert.location?.trim() || "Unknown area";
      const current = locationCounts.get(area) || { alerts: 0, sos: 0, severity: "low" };
      current.sos += 1;
      locationCounts.set(area, current);
    });
    const policeLocationHeatmap = [...locationCounts.entries()]
      .sort((a, b) => b[1].alerts - a[1].alerts)
      .slice(0, 6)
      .map(([area, values]) => ({ area, ...values }));

    const sosAreaCounts = new Map<string, number>();
    sosAlerts.forEach((alert) => {
      const area = alert.location?.trim() || "Unknown area";
      sosAreaCounts.set(area, (sosAreaCounts.get(area) || 0) + 1);
    });
    const sosByAreaData = [...sosAreaCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([area, triggers]) => ({ area, triggers }));

    const scamRecords = [
      ...complaints.map((complaint) => ({ type: complaint.category, date: complaint.createdAt, area: complaint.location, age: complaint.user?.age })),
      ...threads.map((thread) => ({ type: thread.scamType, date: thread.createdAt, area: thread.area, age: undefined })),
    ];

    const scamFrequencyMonthly = buckets.map((bucket) => {
      const row: Record<string, string | number> = { month: bucket.label };
      SCAM_TYPES.forEach((type) => {
        row[type.key] = scamRecords.filter((record) => {
          const date = toDate(record.date);
          return Boolean(date && date >= bucket.start && date < bucket.end && normalizeScamType(record.type) === type.key);
        }).length;
      });
      return row;
    });

    const scamCounts = new Map<string, number>();
    scamRecords.forEach((record) => {
      const label = displayScamType(record.type);
      scamCounts.set(label, (scamCounts.get(label) || 0) + 1);
    });
    const totalScamCases = scamRecords.length;
    const scamCategoryDistribution = [...scamCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([name, count], index) => ({ name, value: totalScamCases ? Math.round((count / totalScamCases) * 100) : 0, color: [COLORS.red, COLORS.orange, COLORS.yellow, COLORS.purple, COLORS.pink, COLORS.gray][index % 6] }));

    const ageGroups = ["18-30", "31-45", "46-60", "60+"];
    const scamByCitizenAge = ageGroups.map((age) => {
      const row: Record<string, string | number> = { age };
      SCAM_TYPES.forEach((type) => {
        row[type.key] = complaints.filter((complaint) => {
          const value = complaint.user?.age;
          if (!value || normalizeScamType(complaint.category) !== type.key) return false;
          const matches = age === "18-30" ? value >= 18 && value <= 30 : age === "31-45" ? value >= 31 && value <= 45 : age === "46-60" ? value >= 46 && value <= 60 : value >= 60;
          return matches && inRange(complaint.createdAt);
        }).length;
      });
      return row;
    });

    const resolvedSos = sosAlerts.filter((alert) => !isFalseAlarm(alert));
    const responseTimes = resolvedSos
      .map((alert) => {
        const created = toDate(alert.createdAt);
        const resolved = toDate(alert.resolvedAt);
        return created && resolved ? (resolved.getTime() - created.getTime()) / 60000 : null;
      })
      .filter((value): value is number => value !== null && value >= 0);
    const averageResponse = responseTimes.length ? responseTimes.reduce((sum, value) => sum + value, 0) / responseTimes.length : null;
    const areaCounts = new Map<string, number>();
    scamRecords.forEach((record) => {
      if (record.area) areaCounts.set(record.area, (areaCounts.get(record.area) || 0) + 1);
    });
    const highestRiskArea = [...areaCounts.entries()].sort((a, b) => b[1] - a[1])[0];
    const highestRiskAge = complaints.filter((complaint) => complaint.user?.age).reduce<Record<string, number>>((counts, complaint) => {
      const age = complaint.user?.age || 0;
      const group = age >= 60 ? "60+" : age >= 46 ? "46-60" : age >= 31 ? "31-45" : "18-30";
      counts[group] = (counts[group] || 0) + 1;
      return counts;
    }, {});
    const highestAge = Object.entries(highestRiskAge).sort((a, b) => b[1] - a[1])[0];
    const topScam = [...scamCounts.entries()].sort((a, b) => b[1] - a[1])[0];

    const alertVolumes = policePeriodData.map((period) => period.resolved + period.pending);
    const midpoint = Math.ceil(alertVolumes.length / 2);
    const earlierAlerts = alertVolumes.slice(0, midpoint).reduce((sum, value) => sum + value, 0);
    const laterAlerts = alertVolumes.slice(midpoint).reduce((sum, value) => sum + value, 0);
    const topSosArea = sosByAreaData[0];
    const activeCheckinDays = checkinDailyData.filter((day) => day.completed > 0).length;
    const checkinCoverage = buckets.length ? Math.round((activeCheckinDays / buckets.length) * 100) : 0;
    const riskScore = Math.min(
      100,
      (topSosArea ? Math.min(topSosArea.triggers * 12, 45) : 0) +
        Math.min(complaints.filter((complaint) => !isResolved(complaint.status)).length * 3, 30) +
        (checkinCoverage < 50 ? 25 : 0),
    );
    const aiInsights = [
      {
        label: "Area concentration",
        tone: topSosArea ? "critical" : "neutral",
        text: topSosArea
          ? `${topSosArea.area} has the highest SOS concentration with ${topSosArea.triggers} trigger${topSosArea.triggers === 1 ? "" : "s"}. Prioritize local response coverage and guardian follow-up there.`
          : "No SOS location records are available for this period.",
      },
      {
        label: "Alert momentum",
        tone: laterAlerts > earlierAlerts ? "warning" : "positive",
        text: laterAlerts > earlierAlerts
          ? `Police alert volume is rising in the latter part of the selected period (${laterAlerts} versus ${earlierAlerts}). Review pending cases before the trend accelerates.`
          : `Police alert volume is stable or declining (${laterAlerts} later versus ${earlierAlerts} earlier). Continue monitoring unresolved cases.`,
      },
      {
        label: "Wellness signal",
        tone: checkinCoverage < 50 ? "warning" : "positive",
        text: checkins.length
          ? `${checkins.length} check-in event${checkins.length === 1 ? "" : "s"} recorded across ${activeCheckinDays} of ${buckets.length} periods (${checkinCoverage}% activity coverage).`
          : "No daily check-in events have reached the analytics API yet. Enable check-in completion telemetry for inactivity detection.",
      },
    ];

    return {
      sosHourlyData,
      sosDailyData,
      sosReasonData,
      policeAlertsByType,
      policePeriodData,
      policeLocationHeatmap,
      sosByAreaData,
      checkinDailyData,
      aiInsights,
      aiRiskScore: riskScore,
      scamFrequencyMonthly,
      scamCategoryDistribution,
      scamByCitizenAge,
      sosStats: {
        totalActivated: sosAlerts.length,
        verifiedEmergencies: sosAlerts.filter((alert) => !isFalseAlarm(alert)).length,
        falseAlarms: sosAlerts.filter(isFalseAlarm).length,
        avgResponseTime: averageResponse === null ? "—" : `${averageResponse.toFixed(1)} mins`,
      },
      policeStats: {
        totalAlerts: complaints.length,
        resolved: complaints.filter((complaint) => isResolved(complaint.status)).length,
        pending: complaints.filter((complaint) => !isResolved(complaint.status)).length,
        reportedLoss: complaints.reduce((sum, complaint) => sum + (complaint.reportedLoss || 0), 0),
      },
      scamStats: {
        totalCases: totalScamCases,
        trendingScam: topScam ? `${topScam[0]} (${Math.round((topScam[1] / totalScamCases) * 100)}%)` : "—",
        highestRiskArea: highestRiskArea ? `${highestRiskArea[0]} (${highestRiskArea[1]} cases)` : "—",
        highestRiskAge: highestAge ? `${highestAge[0]} (${highestAge[1]} cases)` : "—",
      },
    };
  }, [data, timeRange]);

  const exportReport = () => {
    const rows = [
      ["Metric", "Value"],
      ["Period", RANGE_LABELS[timeRange]],
      ["SOS activated", dashboard.sosStats.totalActivated.toString()],
      ["Verified emergencies", dashboard.sosStats.verifiedEmergencies.toString()],
      ["False alarms", dashboard.sosStats.falseAlarms.toString()],
      ["Police alerts", dashboard.policeStats.totalAlerts.toString()],
      ["Resolved police alerts", dashboard.policeStats.resolved.toString()],
      ["Reported loss", dashboard.policeStats.reportedLoss.toString()],
      ["Scam cases", dashboard.scamStats.totalCases.toString()],
      ["Daily check-in events", dashboard.checkinDailyData.reduce((sum, day) => sum + day.completed, 0).toString()],
      ["AI composite risk score", dashboard.aiRiskScore.toString()],
    ];
    const csv = rows.map((row) => row.map((value) => `"${value.replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `anweshan-analytics-${timeRange}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const maxLocationAlerts = Math.max(...dashboard.policeLocationHeatmap.map((area) => area.alerts), 1);

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold">Emergency &amp; Scam Analytics</h1>
              {!loading && !error && <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">LIVE DATA</span>}
            </div>
            <p className="mt-2 text-muted-foreground">SOS activations, police alerts, and scam patterns from the connected backend.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <select aria-label="Analytics time range" value={timeRange} onChange={(event) => setTimeRange(event.target.value as TimeRange)} className="rounded-lg border bg-background px-4 py-2">
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="3m">Last 3 months</option>
              <option value="ytd">Year to date</option>
            </select>
            <Button className="bg-primary hover:bg-primary/90" onClick={exportReport} disabled={loading}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {error && <div className="mb-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
        {loading && <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">Loading live analytics…</div>}

        <section className="mb-12">
          <div className="mb-6 flex items-center gap-3"><AlertTriangle className="h-6 w-6 text-red-600" /><h2 className="text-3xl font-bold">SOS Emergency Alerts</h2></div>
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <MetricCard icon={<Activity className="h-6 w-6 text-red-600" />} label="Total Activated" value={dashboard.sosStats.totalActivated} note={RANGE_LABELS[timeRange]} />
            <MetricCard icon={<Shield className="h-6 w-6 text-green-600" />} label="Verified Emergencies" value={dashboard.sosStats.verifiedEmergencies} valueClass="text-green-600" note={dashboard.sosStats.totalActivated ? `${Math.round((dashboard.sosStats.verifiedEmergencies / dashboard.sosStats.totalActivated) * 100)}% verification rate` : "No records"} />
            <MetricCard icon={<AlertTriangle className="h-6 w-6 text-orange-600" />} label="False Alarms" value={dashboard.sosStats.falseAlarms} valueClass="text-orange-600" note={dashboard.sosStats.totalActivated ? `${((dashboard.sosStats.falseAlarms / dashboard.sosStats.totalActivated) * 100).toFixed(1)}% rate` : "No records"} />
            <MetricCard icon={<Clock className="h-6 w-6 text-blue-600" />} label="Avg Response Time" value={dashboard.sosStats.avgResponseTime} valueClass="text-blue-600" note="From resolved SOS records" />
          </div>

          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <ChartCard title="SOS Activations by Hour">{dashboard.sosHourlyData.some((item) => item.sos) ? <ResponsiveContainer width="100%" height={300}><AreaChart data={dashboard.sosHourlyData}><defs><linearGradient id="colorSos" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={COLORS.red} stopOpacity={0.8} /><stop offset="95%" stopColor={COLORS.red} stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="hour" /><YAxis allowDecimals={false} /><Tooltip content={<CustomTooltip />} /><Area type="monotone" dataKey="sos" stroke={COLORS.red} fill="url(#colorSos)" name="SOS activations" /></AreaChart></ResponsiveContainer> : <EmptyChart />}</ChartCard>
            <ChartCard title="SOS Status by Period">{dashboard.sosDailyData.some((item) => item.activated) ? <ResponsiveContainer width="100%" height={300}><BarChart data={dashboard.sosDailyData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis allowDecimals={false} /><Tooltip content={<CustomTooltip />} /><Legend /><Bar dataKey="verified" fill={COLORS.green} name="Verified" /><Bar dataKey="false_alarm" fill={COLORS.yellow} name="False alarm" /></BarChart></ResponsiveContainer> : <EmptyChart />}</ChartCard>
          </div>
          <ChartCard title="SOS Triggers by Reason">{dashboard.sosReasonData.length ? <ResponsiveContainer width="100%" height={300}><PieChart><Pie data={dashboard.sosReasonData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}`} outerRadius={100} dataKey="value">{dashboard.sosReasonData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer> : <EmptyChart />}</ChartCard>
        </section>

        <section className="mb-12">
          <div className="mb-6 flex items-center gap-3"><Shield className="h-6 w-6 text-blue-600" /><h2 className="text-3xl font-bold">Police Alert Dashboard</h2></div>
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <MetricCard icon={<AlertTriangle className="h-6 w-6 text-blue-600" />} label="Total Alerts Generated" value={dashboard.policeStats.totalAlerts} note="From complaint records" />
            <MetricCard icon={<CheckCircle2 className="h-6 w-6 text-green-600" />} label="Resolved Cases" value={dashboard.policeStats.resolved} valueClass="text-green-600" note={dashboard.policeStats.totalAlerts ? `${Math.round((dashboard.policeStats.resolved / dashboard.policeStats.totalAlerts) * 100)}% resolution` : "No records"} />
            <MetricCard icon={<TrendingUp className="h-6 w-6 text-orange-600" />} label="Pending Investigation" value={dashboard.policeStats.pending} valueClass="text-orange-600" note="In progress" />
            <MetricCard icon={<TrendingUp className="h-6 w-6 text-green-600" />} label="Reported Loss Value" value={money(dashboard.policeStats.reportedLoss)} valueClass="text-green-600" note="From complaint records" />
          </div>
          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <ChartCard title="Alerts by Scam Type">{dashboard.policeAlertsByType.length ? <ResponsiveContainer width="100%" height={300}><BarChart data={dashboard.policeAlertsByType}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" angle={-30} textAnchor="end" height={70} /><YAxis allowDecimals={false} /><Tooltip content={<CustomTooltip />} /><Legend /><Bar dataKey="resolved" fill={COLORS.green} name="Resolved" /><Bar dataKey="pending" fill={COLORS.yellow} name="Pending" /></BarChart></ResponsiveContainer> : <EmptyChart />}</ChartCard>
            <ChartCard title="Police Alert Status by Period">{dashboard.policePeriodData.some((item) => item.resolved || item.pending) ? <ResponsiveContainer width="100%" height={300}><LineChart data={dashboard.policePeriodData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis allowDecimals={false} /><Tooltip content={<CustomTooltip />} /><Legend /><Line type="monotone" dataKey="resolved" stroke={COLORS.green} strokeWidth={2} name="Resolved" /><Line type="monotone" dataKey="pending" stroke={COLORS.orange} strokeWidth={2} name="Pending" /></LineChart></ResponsiveContainer> : <EmptyChart />}</ChartCard>
          </div>
          <ChartCard title="Alert Hotspots by Area">{dashboard.policeLocationHeatmap.length ? <div className="space-y-3">{dashboard.policeLocationHeatmap.map((area) => <div key={area.area} className="flex items-center justify-between rounded-lg bg-muted/30 p-4"><div className="flex-1"><div className="mb-1 flex items-center gap-2"><MapIcon className="h-4 w-4" /><span className="font-semibold">{area.area}</span><span className="rounded bg-muted px-2 py-1 text-xs font-semibold">{area.severity.toUpperCase()}</span></div><div className="h-2 w-full overflow-hidden rounded-full bg-muted"><div className="h-full bg-gradient-to-r from-red-500 to-orange-500" style={{ width: `${(area.alerts / maxLocationAlerts) * 100}%` }} /></div></div><div className="ml-4 text-right"><p className="font-semibold">{area.alerts}</p><p className="text-xs text-muted-foreground">SOS: {area.sos}</p></div></div>)}</div> : <EmptyChart message="No location data in this period" />}</ChartCard>
        </section>

        <section className="mb-12">
          <div className="mb-6 flex items-center gap-3"><Sparkles className="h-6 w-6 text-purple-600" /><h2 className="text-3xl font-bold">AI Safety Analysis</h2><span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">EXPLAINABLE</span></div>
          <div className="mb-8 grid gap-6 lg:grid-cols-[220px_1fr]">
            <div className="rounded-2xl border bg-card p-6 text-center">
              <p className="text-sm text-muted-foreground">Composite risk signal</p>
              <p className={`mt-3 text-6xl font-bold ${dashboard.aiRiskScore >= 70 ? "text-red-600" : dashboard.aiRiskScore >= 40 ? "text-orange-600" : "text-green-600"}`}>{dashboard.aiRiskScore}</p>
              <p className="mt-2 text-xs text-muted-foreground">0–100 from SOS concentration, pending alerts, and check-in coverage</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartCard title="SOS Triggers by Area">{dashboard.sosByAreaData.length ? <ResponsiveContainer width="100%" height={300}><BarChart data={dashboard.sosByAreaData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="area" angle={-25} textAnchor="end" height={70} /><YAxis allowDecimals={false} /><Tooltip content={<CustomTooltip />} /><Bar dataKey="triggers" fill={COLORS.red} name="SOS triggers" /></BarChart></ResponsiveContainer> : <EmptyChart message="No area-wise SOS records in this period" />}</ChartCard>
              <ChartCard title="Daily Check-in Activity">{dashboard.checkinDailyData.some((day) => day.completed) ? <ResponsiveContainer width="100%" height={300}><AreaChart data={dashboard.checkinDailyData}><defs><linearGradient id="checkinFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={COLORS.green} stopOpacity={0.65} /><stop offset="95%" stopColor={COLORS.green} stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis allowDecimals={false} /><Tooltip content={<CustomTooltip />} /><Area type="monotone" dataKey="completed" stroke={COLORS.green} fill="url(#checkinFill)" name="Completed check-ins" /></AreaChart></ResponsiveContainer> : <EmptyChart message="No daily check-in events in this period" />}</ChartCard>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">{dashboard.aiInsights.map((insight) => <div key={insight.label} className="rounded-2xl border bg-card p-5"><div className="mb-2 flex items-center justify-between gap-3"><h3 className="font-semibold">{insight.label}</h3><span className={`rounded-full px-2 py-1 text-xs font-semibold ${insight.tone === "critical" ? "bg-red-100 text-red-700" : insight.tone === "warning" ? "bg-orange-100 text-orange-700" : insight.tone === "positive" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>{insight.tone}</span></div><p className="text-sm leading-6 text-muted-foreground">{insight.text}</p></div>)}</div>
        </section>

        <section>
          <div className="mb-6 flex items-center gap-3"><TrendingUp className="h-6 w-6 text-orange-600" /><h2 className="text-3xl font-bold">Scam Frequency Analysis</h2></div>
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <MetricCard icon={<TrendingUp className="h-6 w-6 text-orange-600" />} label="Total Cases Reported" value={dashboard.scamStats.totalCases} note="Complaints + community reports" />
            <MetricCard icon={<AlertTriangle className="h-6 w-6 text-red-600" />} label="Trending Scam" value={dashboard.scamStats.trendingScam} valueClass="text-lg" note="Highest frequency" />
            <MetricCard icon={<MapIcon className="h-6 w-6 text-purple-600" />} label="Highest Risk Area" value={dashboard.scamStats.highestRiskArea} valueClass="text-lg" note="Hotspot" />
            <MetricCard icon={<Activity className="h-6 w-6 text-blue-600" />} label="Highest Risk Group" value={dashboard.scamStats.highestRiskAge} valueClass="text-lg" note="Age group" />
          </div>
          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <ChartCard title={`Scam Frequency — ${RANGE_LABELS[timeRange]}`}>{dashboard.scamCategoryDistribution.length ? <ResponsiveContainer width="100%" height={300}><LineChart data={dashboard.scamFrequencyMonthly}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis allowDecimals={false} /><Tooltip content={<CustomTooltip />} /><Legend />{SCAM_TYPES.map((type) => <Line key={type.key} type="monotone" dataKey={type.key} stroke={type.color} strokeWidth={2} name={type.label} />)}</LineChart></ResponsiveContainer> : <EmptyChart />}</ChartCard>
            <ChartCard title="Scam Distribution (%)">{dashboard.scamCategoryDistribution.length ? <ResponsiveContainer width="100%" height={300}><PieChart><Pie data={dashboard.scamCategoryDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={100} dataKey="value">{dashboard.scamCategoryDistribution.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer> : <EmptyChart />}</ChartCard>
          </div>
          <ChartCard title="Scam Vulnerability by Age Group">{dashboard.scamByCitizenAge.some((row) => SCAM_TYPES.some((type) => Number(row[type.key]) > 0)) ? <ResponsiveContainer width="100%" height={300}><BarChart data={dashboard.scamByCitizenAge}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="age" /><YAxis allowDecimals={false} /><Tooltip content={<CustomTooltip />} /><Legend />{SCAM_TYPES.map((type) => <Bar key={type.key} dataKey={type.key} fill={type.color} name={type.label} />)}</BarChart></ResponsiveContainer> : <EmptyChart message="Age data is not available for this period" />}</ChartCard>
        </section>
      </div>
    </div>
  );
};

const MetricCard = ({ icon, label, value, note, valueClass = "" }: { icon: React.ReactNode; label: string; value: React.ReactNode; note: string; valueClass?: string }) => (
  <div className="rounded-2xl border bg-card p-6 transition hover:shadow-lg">
    <div className="mb-3">{icon}</div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <h3 className={`mt-2 break-words text-3xl font-bold ${valueClass}`}>{value}</h3>
    <p className="mt-2 text-xs text-muted-foreground">{note}</p>
  </div>
);

const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border bg-card p-6">
    <h3 className="mb-4 text-xl font-semibold">{title}</h3>
    {children}
  </div>
);

export default AlertsAndFrequencyDashboard;
