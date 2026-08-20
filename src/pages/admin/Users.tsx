import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, ShieldBan, ShieldCheck } from "lucide-react";
import API_BASE from "@/lib/api";

interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  city: string | null;
  isActive: boolean;
  createdAt: string;
  lastCheckIn: string | null;
  badgeNumber?: string | null;
  station?: string | null;
  caretakerToken?: string | null;
}

const ROLE_LABELS: Record<string, string> = {
  SENIOR: "Senior Citizen",
  FAMILY: "Caretaker",
  OFFICER: "Cyber Officer",
  ADMIN: "Administrator",
};

const Users = () => {
  const { t } = useLanguage();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/admin/users`);
      const data = await res.json();
      if (data.success) setUsers(data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const toggleStatus = async (user: AdminUser) => {
    setToggling(user.id);
    try {
      const res = await fetch(`${API_BASE}/admin/users/${user.id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !user.isActive }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, isActive: data.user.isActive } : u)));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setToggling(null);
    }
  };

  const filtered = users.filter(
    (user) =>
      (search === "" ||
        user.fullName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search)) &&
      (roleFilter === "" || user.role === roleFilter)
  );

  const counts = {
    total: users.length,
    seniors: users.filter((u) => u.role === "SENIOR").length,
    officers: users.filter((u) => u.role === "OFFICER").length,
    admins: users.filter((u) => u.role === "ADMIN").length,
    inactive: users.filter((u) => !u.isActive).length,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">{t("admin.users.title")}</h1>
            <p className="text-muted-foreground mt-2">{t("admin.users.subtitle")}</p>
          </div>
          <Button>{t("admin.users.addUser")}</Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border rounded-2xl p-6">
            <p className="text-muted-foreground">{t("admin.users.total")}</p>
            <h2 className="text-4xl font-bold mt-2">{counts.total}</h2>
          </div>
          <div className="bg-card border rounded-2xl p-6">
            <p className="text-muted-foreground">{t("admin.users.seniors")}</p>
            <h2 className="text-4xl font-bold text-primary mt-2">{counts.seniors}</h2>
          </div>
          <div className="bg-card border rounded-2xl p-6">
            <p className="text-muted-foreground">{t("admin.users.officers")}</p>
            <h2 className="text-4xl font-bold text-blue-600 mt-2">{counts.officers}</h2>
          </div>
          <div className="bg-card border rounded-2xl p-6">
            <p className="text-muted-foreground">{t("admin.users.admins")}</p>
            <h2 className="text-4xl font-bold text-green-600 mt-2">{counts.admins}</h2>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-6 mb-6">
          <div className="grid lg:grid-cols-3 gap-4">
            <input
              className="w-full border rounded-xl px-4 py-3 bg-background lg:col-span-2"
              placeholder={t("admin.users.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="rounded-xl border bg-background px-4 py-3"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All roles</option>
              <option value="SENIOR">Senior</option>
              <option value="FAMILY">Caretaker</option>
              <option value="OFFICER">Officer</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="space-y-5">
              {filtered.length === 0 && (
                <div className="bg-card border rounded-2xl p-12 text-center text-muted-foreground">
                  No users match your search.
                </div>
              )}
              {filtered.map((user) => (
                <div key={user.id} className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-2xl font-semibold">{user.fullName}</h2>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            user.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                          }`}
                        >
                          {user.isActive ? "Active" : "Disabled"}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-muted">
                          {ROLE_LABELS[user.role] || user.role}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <p className="text-muted-foreground">Email</p>
                          <p className="font-semibold">{user.email}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Phone</p>
                          <p className="font-semibold">{user.phone}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{t("admin.users.city")}</p>
                          <p className="font-semibold">{user.city || "—"}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{t("admin.users.joined")}</p>
                          <p className="font-semibold">
                            {new Date(user.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                          </p>
                        </div>
                        {user.role === "SENIOR" && (
                          <div>
                            <p className="text-muted-foreground">Last check-in</p>
                            <p className="font-semibold">
                              {user.lastCheckIn ? new Date(user.lastCheckIn).toLocaleString("en-IN") : "Never"}
                            </p>
                          </div>
                        )}
                        {user.role === "OFFICER" && (
                          <div>
                            <p className="text-muted-foreground">Badge / Station</p>
                            <p className="font-semibold">
                              {user.badgeNumber || "—"} {user.station ? `• ${user.station}` : ""}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="lg:w-56 space-y-3">
                      <Button variant="outline" className="w-full">
                        {t("admin.users.viewProfile")}
                      </Button>
                      <Button
                        variant="outline"
                        className={`w-full ${user.isActive ? "text-red-600" : "text-green-600"}`}
                        onClick={() => toggleStatus(user)}
                        disabled={toggling === user.id}
                      >
                        {toggling === user.id ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : user.isActive ? (
                          <ShieldBan className="mr-2 h-4 w-4" />
                        ) : (
                          <ShieldCheck className="mr-2 h-4 w-4" />
                        )}
                        {user.isActive ? "Disable Account" : "Re-enable"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card border rounded-2xl p-6 mt-8">
              <h2 className="text-2xl font-semibold mb-6">{t("admin.users.stats")}</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="border rounded-xl p-4 text-center">
                  <p className="text-muted-foreground">Total</p>
                  <h3 className="text-2xl font-bold">{counts.total}</h3>
                </div>
                <div className="border rounded-xl p-4 text-center">
                  <p className="text-muted-foreground">Caretakers</p>
                  <h3 className="text-2xl font-bold">{users.filter((u) => u.role === "FAMILY").length}</h3>
                </div>
                <div className="border rounded-xl p-4 text-center">
                  <p className="text-muted-foreground">{t("admin.users.suspended")}</p>
                  <h3 className="text-2xl font-bold text-red-600">{counts.inactive}</h3>
                </div>
                <div className="border rounded-xl p-4 text-center">
                  <p className="text-muted-foreground">Active</p>
                  <h3 className="text-2xl font-bold text-green-600">{counts.total - counts.inactive}</h3>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Users;