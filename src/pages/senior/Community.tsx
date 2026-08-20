import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import API_BASE from "@/lib/api";
import {
  Hash,
  MessageSquare,
  Send,
  Pin,
  Users,
  MapPin,
  TrendingUp,
  Loader2,
  Plus,
  X,
  ShieldAlert,
  Clock3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Channel {
  id: string;
  name: string;
  description: string | null;
  category: string;
  _count?: { posts: number };
}

interface Reply {
  id: string;
  content: string;
  createdAt: string;
  user: { id: string; fullName: string };
}

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
  isPinned: boolean;
  createdAt: string;
  user: { id: string; fullName: string; role: string };
  replies: Reply[];
  _count?: { replies: number };
}

interface RegionalStats {
  total: number;
  byRegion: Record<string, number>;
  byCategory: Record<string, number>;
}

const Community = () => {
  const { t } = useLanguage();

  const [channels, setChannels] = useState<Channel[]>([]);
  const [activeChannel, setActiveChannel] = useState<string>("all");
  const [posts, setPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState<RegionalStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "general", region: "" });
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchChannels = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/community/channels`);
      const data = await res.json();
      if (data.success) setChannels(data.channels);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/community/posts/${activeChannel}`);
      const data = await res.json();
      if (data.success) setPosts(data.posts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [activeChannel]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/community/stats/regional`);
      const data = await res.json();
      if (data.success) setStats(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchChannels();
    fetchStats();
  }, [fetchChannels, fetchStats]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    setSending(true);
    try {
      const res = await fetch(`${API_BASE}/community/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPost.title,
          content: newPost.content,
          category: newPost.category,
          region: newPost.region || currentUser.city || undefined,
          channelId: activeChannel !== "all" ? activeChannel : undefined,
          userId: currentUser.id || "demo-user",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowNewPost(false);
        setNewPost({ title: "", content: "", category: "general", region: "" });
        fetchPosts();
        fetchStats();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const handleReply = async (postId: string) => {
    const content = replyText[postId];
    if (!content?.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/community/posts/${postId}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, userId: currentUser.id || "demo-user" }),
      });
      const data = await res.json();
      if (data.success) {
        setReplyText((prev) => ({ ...prev, [postId]: "" }));
        fetchPosts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }) + " • " + d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  };

  const categoryBadge = (cat: string) => {
    const colors: Record<string, string> = {
      general: "bg-gray-100 text-gray-700",
      phishing: "bg-red-100 text-red-700",
      vishing: "bg-orange-100 text-orange-700",
      smishing: "bg-amber-100 text-amber-700",
      upi: "bg-blue-100 text-blue-700",
      investment: "bg-purple-100 text-purple-700",
      romance: "bg-pink-100 text-pink-700",
      job: "bg-teal-100 text-teal-700",
      digital_arrest: "bg-rose-100 text-rose-700",
    };
    return colors[cat] || colors.general;
  };

  const topRegions = stats
    ? Object.entries(stats.byRegion)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
    : [];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold">Community Channel</h1>
          <p className="text-muted-foreground mt-2">
            Share scam experiences, suspicious links and warnings. Both senior citizens and caretakers can publish — collective knowledge protects everyone.
          </p>
        </div>

        {/* Stats strip */}
        {stats && (
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="bg-card border rounded-2xl p-4">
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> Total Reports
              </p>
              <h3 className="text-3xl font-bold mt-1">{stats.total}</h3>
            </div>
            <div className="bg-card border rounded-2xl p-4">
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Top Scam Type
              </p>
              <h3 className="text-xl font-bold mt-1 capitalize">
                {Object.entries(stats.byCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || "—"}
              </h3>
            </div>
            <div className="bg-card border rounded-2xl p-4">
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Top Region
              </p>
              <h3 className="text-xl font-bold mt-1">{topRegions[0]?.[0] || "—"}</h3>
              <p className="text-xs text-muted-foreground mt-1">{topRegions[0]?.[1] || 0} reports</p>
            </div>
            <div className="bg-card border rounded-2xl p-4">
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                <Users className="h-4 w-4" /> Regions Covered
              </p>
              <h3 className="text-3xl font-bold mt-1">{Object.keys(stats.byRegion).length}</h3>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Channel sidebar */}
          <div className="bg-card border rounded-2xl p-4 h-fit lg:sticky lg:top-24">
            <h2 className="font-semibold px-2 mb-3 text-sm uppercase tracking-wider text-muted-foreground">
              Channels
            </h2>
            <button
              onClick={() => setActiveChannel("all")}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition ${
                activeChannel === "all" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
              }`}
            >
              <Hash className="h-4 w-4" />
              <span className="flex-1">all-scam-reports</span>
              <span className="text-xs text-muted-foreground">{posts.length}</span>
            </button>
            {channels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChannel(ch.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition ${
                  activeChannel === ch.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                }`}
              >
                <Hash className="h-4 w-4" />
                <span className="flex-1 truncate">{ch.name}</span>
                <span className="text-xs text-muted-foreground">{ch._count?.posts || 0}</span>
              </button>
            ))}

            {/* Region summary */}
            <div className="border-t mt-4 pt-4">
              <h3 className="font-semibold px-2 mb-2 text-sm uppercase tracking-wider text-muted-foreground">
                Reports by Region
              </h3>
              <div className="space-y-1.5">
                {topRegions.map(([region, count]) => (
                  <div key={region} className="px-2 flex justify-between text-sm">
                    <span className="truncate">{region}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main feed */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Hash className="h-4 w-4" />
                <span>{activeChannel === "all" ? "all-scam-reports" : channels.find((c) => c.id === activeChannel)?.name}</span>
              </div>
              <Button onClick={() => setShowNewPost(!showNewPost)}>
                <Plus className="mr-2 h-4 w-4" /> New Report
              </Button>
            </div>

            {/* New post form */}
            {showNewPost && (
              <div className="bg-card border rounded-2xl p-5 mb-5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">Share a scam experience</h3>
                  <button onClick={() => setShowNewPost(false)}>
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="space-y-3">
                  <Input
                    placeholder="Title (e.g. Fake bank call asking for OTP)"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="Describe what happened, links shared, phone numbers, and what you did..."
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={4}
                  />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <select
                      className="w-full px-3 py-2 rounded-lg border bg-background"
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    >
                      <option value="general">General</option>
                      <option value="phishing">Phishing</option>
                      <option value="vishing">Vishing (Call)</option>
                      <option value="smishing">Smishing (SMS)</option>
                      <option value="upi">UPI Fraud</option>
                      <option value="investment">Investment Scam</option>
                      <option value="romance">Romance Scam</option>
                      <option value="job">Job Scam</option>
                      <option value="digital_arrest">Digital Arrest</option>
                    </select>
                    <Input
                      placeholder="Region (e.g. Ahmedabad)"
                      value={newPost.region}
                      onChange={(e) => setNewPost({ ...newPost, region: e.target.value })}
                    />
                  </div>
                  <Button
                    onClick={handleCreatePost}
                    disabled={sending || !newPost.title.trim() || !newPost.content.trim()}
                    className="w-full"
                  >
                    {sending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    Publish to Community
                  </Button>
                </div>
              </div>
            )}

            {/* Posts */}
            {loading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-card border rounded-2xl p-12 text-center text-muted-foreground">
                <ShieldAlert className="mx-auto h-12 w-12 mb-4" />
                No reports yet in this channel. Be the first to share!
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="bg-card border rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {post.isPinned && <Pin className="h-4 w-4 text-primary" />}
                        <h3 className="font-semibold text-lg">{post.title}</h3>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryBadge(post.category)}`}>
                        {post.category}
                      </span>
                    </div>

                    <p className="text-muted-foreground mt-2">{post.content}</p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" /> {post.user.fullName}
                        {post.user.role === "FAMILY" && " (caretaker)"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock3 className="h-3 w-3" /> {formatTime(post.createdAt)}
                      </span>
                      {post.region && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {post.region}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" /> {post.replies.length} replies
                      </span>
                    </div>

                    {/* Replies */}
                    {post.replies.length > 0 && (
                      <div className="mt-4 space-y-2 border-l-2 border-muted pl-4">
                        {post.replies.map((reply) => (
                          <div key={reply.id} className="text-sm">
                            <span className="font-medium">{reply.user.fullName}: </span>
                            <span className="text-muted-foreground">{reply.content}</span>
                            <span className="text-xs text-muted-foreground/70 ml-2">{formatTime(reply.createdAt)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply box */}
                    <div className="mt-4 flex gap-2">
                      <Input
                        placeholder="Add a helpful reply..."
                        value={replyText[post.id] || ""}
                        onChange={(e) => setReplyText({ ...replyText, [post.id]: e.target.value })}
                        onKeyDown={(e) => e.key === "Enter" && handleReply(post.id)}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleReply(post.id)}
                        disabled={!replyText[post.id]?.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;