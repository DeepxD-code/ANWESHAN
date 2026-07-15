import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line,
  AreaChart, Area,
} from "recharts";

const fraudTrendData = [
  { name: "UPI Fraud", cases: 312, fill: "#ef4444" },
  { name: "Investment", cases: 208, fill: "#f97316" },
  { name: "OTP Scam", cases: 142, fill: "#eab308" },
  { name: "Digital Arrest", cases: 96, fill: "#8b5cf6" },
  { name: "Courier", cases: 84, fill: "#06b6d4" },
];

const pieData = [
  { name: "UPI Fraud", value: 312 },
  { name: "Investment Scam", value: 208 },
  { name: "OTP Scam", value: 142 },
  { name: "Digital Arrest", value: 96 },
  { name: "Courier Scam", value: 84 },
];

const PIE_COLORS = ["#ef4444", "#f97316", "#eab308", "#8b5cf6", "#06b6d4"];

const monthlyData = [
  { month: "Jan", complaints: 620, resolved: 540 },
  { month: "Feb", complaints: 590, resolved: 510 },
  { month: "Mar", complaints: 710, resolved: 630 },
  { month: "Apr", complaints: 680, resolved: 600 },
  { month: "May", complaints: 750, resolved: 690 },
  { month: "Jun", complaints: 820, resolved: 740 },
  { month: "Jul", complaints: 842, resolved: 765 },
];

const responseTimeData = [
  { month: "Jan", time: 4.2 },
  { month: "Feb", time: 3.8 },
  { month: "Mar", time: 3.5 },
  { month: "Apr", time: 3.1 },
  { month: "May", time: 2.8 },
  { month: "Jun", time: 2.6 },
  { month: "Jul", time: 2.4 },
];

const areaChartData = [
  { month: "Jan", seniors: 310, youth: 180, adults: 130 },
  { month: "Feb", seniors: 290, youth: 170, adults: 130 },
  { month: "Mar", seniors: 360, youth: 200, adults: 150 },
  { month: "Apr", seniors: 340, youth: 190, adults: 150 },
  { month: "May", seniors: 380, youth: 210, adults: 160 },
  { month: "Jun", seniors: 420, youth: 230, adults: 170 },
  { month: "Jul", seniors: 430, youth: 240, adults: 172 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-4 py-3 shadow-lg">
        <p className="font-semibold text-foreground mb-1">{label}</p>
        {payload.map((entry: any, idx: number) => (
          <p key={idx} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">{t("officer.analytics.title")}</h1>
            <p className="text-muted-foreground mt-2">{t("officer.analytics.subtitle")}</p>
          </div>
          <Button onClick={() => alert("Report exported as PDF.")}>{t("officer.analytics.export")}</Button>
        </div>

        {/* Top Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border rounded-2xl p-6">
            <p className="text-muted-foreground">{t("officer.analytics.complaintsMonth")}</p>
            <h2 className="text-4xl font-bold mt-2">842</h2>
            <p className="text-sm text-green-500 mt-1">↑ 12% from last month</p>
          </div>
          <div className="bg-card border rounded-2xl p-6">
            <p className="text-muted-foreground">{t("officer.analytics.fraudPrevented")}</p>
            <h2 className="text-4xl font-bold text-green-600 mt-2">₹1.82 Cr</h2>
            <p className="text-sm text-green-500 mt-1">↑ 24% from last month</p>
          </div>
          <div className="bg-card border rounded-2xl p-6">
            <p className="text-muted-foreground">{t("officer.analytics.avgResponseTime")}</p>
            <h2 className="text-4xl font-bold text-primary mt-2">2.4 min</h2>
            <p className="text-sm text-green-500 mt-1">↓ 0.2 min improvement</p>
          </div>
          <div className="bg-card border rounded-2xl p-6">
            <p className="text-muted-foreground">{t("officer.analytics.resolutionRate")}</p>
            <h2 className="text-4xl font-bold text-blue-600 mt-2">91%</h2>
            <p className="text-sm text-green-500 mt-1">↑ 3% from last month</p>
          </div>
        </div>

        {/* Row 1: Monthly Trends (Line) + Fraud Distribution (Pie) */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">

          {/* Monthly Complaints vs Resolved - Line Chart */}
          <div className="bg-card border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6">Monthly Complaints vs Resolved</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="complaints" stroke="#ef4444" strokeWidth={3} dot={{ r: 5 }} name="Complaints" />
                <Line type="monotone" dataKey="resolved" stroke="#22c55e" strokeWidth={3} dot={{ r: 5 }} name="Resolved" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Fraud Distribution - Pie Chart */}
          <div className="bg-card border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6">Fraud Type Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Row 2: Fraud Trend Bar Chart + Response Time Area */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">

          {/* Fraud Trend - Bar Chart */}
          <div className="bg-card border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6">{t("officer.analytics.trends")}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fraudTrendData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="cases" radius={[0, 6, 6, 0]} name="Cases">
                  {fraudTrendData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Response Time Improvement - Area Chart */}
          <div className="bg-card border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6">Avg Response Time (minutes)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={responseTimeData}>
                <defs>
                  <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 5]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="time" stroke="#3b82f6" strokeWidth={3} fill="url(#colorTime)" name="Response Time" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* Row 3: Victim Demographics Stacked Area */}
        <div className="bg-card border rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Victim Demographics Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={areaChartData}>
              <defs>
                <linearGradient id="colorSeniors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorYouth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAdults" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="seniors" stackId="1" stroke="#ef4444" fill="url(#colorSeniors)" strokeWidth={2} name="Seniors (60+)" />
              <Area type="monotone" dataKey="youth" stackId="1" stroke="#f97316" fill="url(#colorYouth)" strokeWidth={2} name="Youth (18-30)" />
              <Area type="monotone" dataKey="adults" stackId="1" stroke="#06b6d4" fill="url(#colorAdults)" strokeWidth={2} name="Adults (30-60)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Row 4: Operational Insights + AI Threat */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Operational Insights */}
          <div className="bg-card border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6">{t("officer.analytics.insights")}</h2>
            <div className="space-y-5">
              <div className="border rounded-xl p-4">
                <p className="text-muted-foreground">{t("officer.analytics.highestRisk")}</p>
                <h3 className="font-bold text-lg">Satellite, Ahmedabad</h3>
              </div>
              <div className="border rounded-xl p-4">
                <p className="text-muted-foreground">Peak Complaint Time</p>
                <h3 className="font-bold text-lg">11:00 AM - 2:00 PM</h3>
              </div>
              <div className="border rounded-xl p-4">
                <p className="text-muted-foreground">Most Targeted Group</p>
                <h3 className="font-bold text-lg">Senior Citizens (60+)</h3>
              </div>
              <div className="border rounded-xl p-4">
                <p className="text-muted-foreground">Officer Efficiency</p>
                <h3 className="font-bold text-lg text-green-600">Excellent</h3>
              </div>
            </div>
          </div>

          {/* AI Threat Intelligence */}
          <div className="bg-card border rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-6">{t("officer.analytics.aiThreat")}</h2>
            <div className="space-y-5">
              <div className="border rounded-xl p-5">
                <h3 className="font-semibold mb-2">{t("officer.analytics.emergingScam")}</h3>
                <p className="text-muted-foreground">Fake electricity bill payment links are rapidly increasing across Ahmedabad.</p>
              </div>
              <div className="border rounded-xl p-5">
                <h3 className="font-semibold mb-2">Risk Prediction</h3>
                <p className="text-muted-foreground">Investment fraud complaints are expected to increase during the coming week.</p>
              </div>
              <div className="border rounded-xl p-5">
                <h3 className="font-semibold mb-2">Recommended Action</h3>
                <p className="text-muted-foreground">Issue a community-wide alert and prioritize high-risk complaints for immediate review.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Analytics;