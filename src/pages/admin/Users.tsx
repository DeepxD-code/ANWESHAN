import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const users = [
  {
    id: "USR-1001",
    name: "Ramesh Patel",
    role: "Senior Citizen",
    status: "Active",
    city: "Ahmedabad",
    joined: "Jan 2026",
  },
  {
    id: "USR-1002",
    name: "Inspector Rahul Mehta",
    role: "Cyber Officer",
    status: "Active",
    city: "Ahmedabad",
    joined: "Nov 2025",
  },
  {
    id: "USR-1003",
    name: "Anita Shah",
    role: "Senior Citizen",
    status: "Inactive",
    city: "Surat",
    joined: "Feb 2026",
  },
];

const Users = () => {
  const { t } = useLanguage();

  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.id.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              {t("admin.users.title")}
            </h1>

            <p className="text-muted-foreground mt-2">
              {t("admin.users.subtitle")}
            </p>

          </div>

          <Button>
            {t("admin.users.addUser")}
          </Button>

        </div>



        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("admin.users.total")}
            </p>

            <h2 className="text-4xl font-bold mt-2">
              12,942
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("admin.users.seniors")}
            </p>

            <h2 className="text-4xl font-bold text-primary mt-2">
              12,846
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("admin.users.officers")}
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              38
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("admin.users.admins")}
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              4
            </h2>

          </div>

        </div>



        <div className="bg-card border rounded-2xl p-6 mb-6">

          <input
            className="w-full border rounded-xl px-4 py-3 bg-background"
            placeholder={t("admin.users.search")}
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>



        <div className="space-y-5"></div>
        {filtered.map((user) => (

<div
  key={user.id}
  className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
>

  <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

    <div className="flex-1">

      <div className="flex items-center gap-3 mb-4">

        <h2 className="text-2xl font-semibold">
          {user.name}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            user.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {user.status}
        </span>

      </div>



      <div className="grid md:grid-cols-2 gap-5">

        <div>

          <p className="text-muted-foreground">
            {t("admin.users.userId")}
          </p>

          <p className="font-semibold">
            {user.id}
          </p>

        </div>



        <div>

          <p className="text-muted-foreground">
            {t("admin.users.role")}
          </p>

          <p className="font-semibold">
            {user.role}
          </p>

        </div>



        <div>

          <p className="text-muted-foreground">
            {t("admin.users.city")}
          </p>

          <p className="font-semibold">
            {user.city}
          </p>

        </div>



        <div>

          <p className="text-muted-foreground">
            {t("admin.users.joined")}
          </p>

          <p className="font-semibold">
            {user.joined}
          </p>

        </div>

      </div>

    </div>



    <div className="lg:w-72 space-y-3">

      <Button className="w-full">
        {t("admin.users.viewProfile")}
      </Button>

      <Button
        variant="outline"
        className="w-full"
      >
        {t("admin.users.editUser")}
      </Button>

      <Button
        variant="outline"
        className="w-full"
      >
        {t("admin.users.resetPassword")}
      </Button>

      <Button
        variant="outline"
        className="w-full text-red-600"
      >
        {t("admin.users.disableAccount")}
      </Button>

    </div>

  </div>

</div>

))}



<div className="bg-card border rounded-2xl p-6 mt-8">

<h2 className="text-2xl font-semibold mb-6">
  {t("admin.users.stats")}
</h2>

<div className="grid md:grid-cols-4 gap-4">

  <div className="border rounded-xl p-4 text-center">

    <p className="text-muted-foreground">
      {t("admin.users.newToday")}
    </p>

    <h3 className="text-2xl font-bold">
      24
    </h3>

  </div>

  <div className="border rounded-xl p-4 text-center">

    <p className="text-muted-foreground">
      {t("admin.users.activeToday")}
    </p>

    <h3 className="text-2xl font-bold">
      8,421
    </h3>

  </div>

  <div className="border rounded-xl p-4 text-center">

    <p className="text-muted-foreground">
      {t("admin.users.suspended")}
    </p>

    <h3 className="text-2xl font-bold text-red-600">
      11
    </h3>

  </div>

  <div className="border rounded-xl p-4 text-center">

    <p className="text-muted-foreground">
      {t("admin.users.verified")}
    </p>

    <h3 className="text-2xl font-bold text-green-600">
      99%
    </h3>

  </div>

</div>

</div>

</div>

</div>

);

};

export default Users;