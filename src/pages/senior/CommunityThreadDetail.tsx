import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import API_BASE from "@/lib/api";

import {
  ArrowLeft,
  Send,
  Heart,
  ThumbsUp,
  MessageCircle,
  Eye,
  Shield,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface User {
  id: string;
  fullName: string;
  role: string;
}

interface Post {
  id: string;
  content: string;
  author: User;
  likeCount: number;
  isHelpful: boolean;
  createdAt: string;
  replies: Post[];
}

interface Thread {
  id: string;
  title: string;
  description: string;
  scamType: string;
  severity: string;
  viewCount: number;
  replyCount: number;
  author: User;
  createdAt: string;
  posts: Post[];
}

const CommunityThreadDetail = () => {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [thread, setThread] = useState<Thread | null>(null);
  const [newPostContent, setNewPostContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(userData);
    fetchThread();
  }, [id]);

  const fetchThread = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/community/threads/${id}`);
      const data = await res.json();
      if (data.success) {
        setThread(data.thread);
      }
    } catch (err) {
      console.error("Failed to fetch thread:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() || !user.id || !id) return;

    try {
      const res = await fetch(`${API_BASE}/community/threads/${id}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          threadId: id,
          content: newPostContent,
          authorId: user.id,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNewPostContent("");
        fetchThread(); // Refresh thread
      }
    } catch (err) {
      console.error("Failed to post reply:", err);
    }
  };

  const handleLikePost = async (postId: string) => {
    try {
      const res = await fetch(`${API_BASE}/community/posts/${postId}/like`, {
        method: "PUT",
      });
      const data = await res.json();
      if (data.success) {
        fetchThread();
      }
    } catch (err) {
      console.error("Failed to like post:", err);
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

  const isVerified = user?.role === "OFFICER" || user?.role === "ADMIN";

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Thread not found</p>
          <Button onClick={() => navigate("/community")}>Back to Channel</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <Button
        variant="ghost"
        onClick={() => navigate("/community")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Channel
      </Button>

      {/* Thread Header */}
      <div className="bg-card border rounded-2xl p-8 mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{thread.title}</h1>
            <div className="flex items-center gap-3 text-muted-foreground mb-4">
              <span>by {thread.author.fullName}</span>
              {isVerified && thread.author.role !== "SENIOR" && (
                <>
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded">
                    Verified {thread.author.role}
                  </span>
                </>
              )}
              <span>•</span>
              <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <span
            className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap ${getSeverityColor(
              thread.severity
            )}`}
          >
            {thread.severity.charAt(0).toUpperCase() + thread.severity.slice(1)}
          </span>
        </div>

        <p className="text-lg text-foreground mb-4">{thread.description}</p>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="inline-block bg-muted px-3 py-2 rounded-lg font-medium">
            {thread.scamType}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span>{thread.viewCount} views</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MessageCircle className="h-4 w-4" />
            <span>{thread.replyCount} replies</span>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6 mb-8">
        <h2 className="text-2xl font-bold">Discussion ({thread.posts.length})</h2>
        {thread.posts.length === 0 ? (
          <div className="bg-card border rounded-xl p-8 text-center text-muted-foreground">
            No replies yet. Be the first to respond!
          </div>
        ) : (
          thread.posts.map((post) => (
            <div key={post.id} className="bg-card border rounded-xl p-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{post.author.fullName}</span>
                    {post.author.role !== "SENIOR" && (
                      <Shield className="h-4 w-4 text-blue-600" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString()}{" "}
                      {new Date(post.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-foreground mb-4 leading-relaxed">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
                    >
                      <Heart className="h-4 w-4" />
                      <span>{post.likeCount}</span>
                    </button>
                    {post.isHelpful && (
                      <div className="flex items-center gap-2 text-sm bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded">
                        <ThumbsUp className="h-3 w-3" />
                        Helpful
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Nested replies */}
              {post.replies && post.replies.length > 0 && (
                <div className="mt-6 pl-6 border-l-2 border-muted space-y-4">
                  {post.replies.map((reply) => (
                    <div key={reply.id}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold">
                          {reply.author.fullName}
                        </span>
                        {reply.author.role !== "SENIOR" && (
                          <Shield className="h-3 w-3 text-blue-600" />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Reply Form */}
      {user?.id && (
        <div className="bg-card border rounded-2xl p-6 sticky bottom-6">
          <form onSubmit={handlePostReply}>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Share your experience or advice about this scam..."
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={4}
            />
            <div className="flex justify-end gap-3 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setNewPostContent("")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!newPostContent.trim()}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="mr-2 h-4 w-4" />
                Post Reply
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommunityThreadDetail;
