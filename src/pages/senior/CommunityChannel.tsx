import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import API_BASE from "@/lib/api";

import {
  MessageCircle,
  Eye,
  Heart,
  Search,
  Plus,
  TriangleAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Thread {
  id: string;
  title: string;
  description: string;
  scamType: string;
  severity: string;
  viewCount: number;
  replyCount: number;
  area?: string;
  author: {
    fullName: string;
    role: string;
  };
  createdAt: string;
}

interface ScamCategory {
  scamType: string;
  _count: {
    id: number;
  };
}

const CommunityChannel = () => {
  const { t } = useLanguage();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [categories, setCategories] = useState<ScamCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCreateThread, setShowCreateThread] = useState(false);

  // Fetch threads
  useEffect(() => {
    fetchThreads();
    fetchCategories();
  }, [selectedCategory, selectedSeverity]);

  const fetchThreads = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory !== "all") params.append("scamType", selectedCategory);
      if (selectedSeverity !== "all") params.append("severity", selectedSeverity);

      const res = await fetch(`${API_BASE}/community/threads?${params}`);
      const data = await res.json();
      if (data.success) {
        setThreads(data.threads);
      }
    } catch (err) {
      console.error("Failed to fetch threads:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/community/categories/scams`);
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchThreads();
      return;
    }
    try {
      const res = await fetch(
        `${API_BASE}/community/threads/search?query=${encodeURIComponent(searchQuery)}`
      );
      const data = await res.json();
      if (data.success) {
        setThreads(data.threads);
      }
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "high":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case "medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <MessageCircle className="h-10 w-10 text-primary" />
            Community Scam Channel
          </h1>
          <p className="text-muted-foreground mt-2">
            Collective alerts and threaded discussions about fraud trends and scams
          </p>
        </div>
        <Button
          onClick={() => setShowCreateThread(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="mr-2 h-5 w-5" />
          Start Discussion
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search scam alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute right-4 top-3.5 h-5 w-5 text-muted-foreground" />
        </div>
        <Button onClick={handleSearch} variant="outline">
          Search
        </Button>
      </div>

      {/* Filters */}
      <div className="grid lg:grid-cols-2 gap-4 mb-8">
        {/* Category Filter */}
        <div className="bg-card border rounded-xl p-4">
          <h3 className="font-semibold mb-3">Scam Types</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                selectedCategory === "all"
                  ? "bg-primary text-white"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.scamType}
                onClick={() => setSelectedCategory(cat.scamType)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  selectedCategory === cat.scamType
                    ? "bg-primary text-white"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {cat.scamType} ({cat._count.id})
              </button>
            ))}
          </div>
        </div>

        {/* Severity Filter */}
        <div className="bg-card border rounded-xl p-4">
          <h3 className="font-semibold mb-3">Severity Level</h3>
          <div className="flex flex-wrap gap-2">
            {["all", "critical", "high", "medium", "low"].map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverity(sev)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  selectedSeverity === sev
                    ? "bg-primary text-white"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {sev.charAt(0).toUpperCase() + sev.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Threads List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : threads.length === 0 ? (
          <div className="bg-card border rounded-xl p-12 text-center">
            <TriangleAlert className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No discussions found. Be the first to start one!
            </p>
          </div>
        ) : (
          threads.map((thread) => (
            <div
              key={thread.id}
              className="bg-card border rounded-xl p-6 hover:border-primary/50 hover:shadow-md transition cursor-pointer"
              onClick={() => {
                // Navigate to thread detail
                window.location.href = `/community/${thread.id}`;
              }}
            >
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-lg font-semibold line-clamp-2">
                        {thread.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        by <span className="font-medium">{thread.author.fullName}</span> •{" "}
                        {new Date(thread.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getSeverityColor(
                        thread.severity
                      )}`}
                    >
                      {thread.severity}
                    </span>
                  </div>

                  <p className="text-muted-foreground line-clamp-2 mb-3">
                    {thread.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-block bg-muted px-2 py-1 rounded text-xs font-medium">
                      {thread.scamType}
                    </span>
                    {thread.area && (
                      <span className="text-xs">📍 {thread.area}</span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-col gap-3 text-sm text-muted-foreground whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>{thread.viewCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>{thread.replyCount}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityChannel;
