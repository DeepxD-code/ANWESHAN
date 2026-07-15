import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const emergencies = [
  {
    id: "SOS-2026-041",
    citizen: "Ramesh Patel",
    location: "Satellite, Ahmedabad",
    type: "Emergency SOS",
    priority: "Critical",
    status: "Officer Dispatched",
    time: "2 mins ago",
  },
  {
    id: "SOS-2026-038",
    citizen: "Anita Shah",
    location: "Navrangpura",
    type: "Medical Emergency",
    priority: "High",
    status: "Ambulance En Route",
    time: "8 mins ago",
  },
  {
    id: "SOS-2026-031",
    citizen: "Mahesh Joshi",
    location: "Maninagar",
    type: "Wellness Alert",
    priority: "Medium",
    status: "Resolved",
    time: "30 mins ago",
  },
];

const EmergencyMonitor = () => {
  const { t } = useLanguage();

  const [search, setSearch] = useState("");

  const filtered = emergencies.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.citizen.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              {t("officer.emergency.title")}
            </h1>

            <p className="text-muted-foreground mt-2">
              {t("officer.emergency.subtitle")}
            </p>

          </div>

          <Button className="bg-red-600 hover:bg-red-700" onClick={() => alert('Live dashboard streaming started.')}>
            {t("officer.emergency.liveDashboard")}
          </Button>

        </div>



        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("officer.emergency.active")}
            </p>

            <h2 className="text-4xl font-bold text-red-600 mt-2">
              3
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("officer.emergency.deployed")}
            </p>

            <h2 className="text-4xl font-bold text-primary mt-2">
              7
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("officer.emergency.avgResponse")}
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              2.4 min
            </h2>

          </div>

          <div className="bg-card border rounded-2xl p-6">

            <p className="text-muted-foreground">
              {t("officer.emergency.resolvedToday")}
            </p>

            <h2 className="text-4xl font-bold mt-2">
              18
            </h2>

          </div>

        </div>



        <div className="bg-card border rounded-2xl p-6 mb-6">

          <input
            className="w-full border rounded-xl px-4 py-3 bg-background"
            placeholder={t("officer.emergency.search")}
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>



        <div className="space-y-5">
        {filtered.map((item) => (

<div
  key={item.id}
  className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
>

  <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

    <div className="flex-1">

      <div className="flex items-center gap-3 mb-4">

        <h2 className="text-2xl font-semibold">
          {item.id}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            item.priority === "Critical"
              ? "bg-red-100 text-red-600"
              : item.priority === "High"
              ? "bg-orange-100 text-orange-600"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {item.priority}
        </span>

      </div>



      <div className="grid md:grid-cols-2 gap-5">

        <div>

          <p className="text-muted-foreground">
            {t("officer.emergency.citizen")}
          </p>

          <p className="font-semibold">
            {item.citizen}
          </p>

        </div>



        <div>

          <p className="text-muted-foreground">
            {t("officer.emergency.type")}
          </p>

          <p className="font-semibold">
            {item.type}
          </p>

        </div>



        <div>

          <p className="text-muted-foreground">
            {t("officer.emergency.location")}
          </p>

          <p className="font-semibold">
            {item.location}
          </p>

        </div>



        <div>

          <p className="text-muted-foreground">
            {t("officer.emergency.status")}
          </p>

          <p className="font-semibold text-primary">
            {item.status}
          </p>

        </div>



        <div>

          <p className="text-muted-foreground">
            {t("officer.emergency.triggered")}
          </p>

          <p className="font-semibold">
            {item.time}
          </p>

        </div>

      </div>

    </div>



    <div className="lg:w-72 space-y-3">

      <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => alert('Live tracking opened for: ' + item.citizen)}>
        {t("officer.emergency.liveTracking")}
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => alert('Calling citizen: ' + item.citizen)}
      >
        {t("officer.emergency.contactCitizen")}
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => alert('Family notified for: ' + item.citizen)}
      >
        {t("officer.emergency.notifyFamily")}
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => alert('Emergency resolved for: ' + item.citizen)}
      >
        {t("officer.emergency.markResolved")}
      </Button>

    </div>

  </div>

</div>

))}
        </div>



<div className="bg-card border rounded-2xl p-6 mt-8">

<h2 className="text-2xl font-semibold mb-5">
  {t("officer.emergency.workflow")}
</h2>

<div className="grid md:grid-cols-6 gap-4">

  <div className="border rounded-xl p-4 text-center">
    SOS Triggered
  </div>

  <div className="border rounded-xl p-4 text-center">
    GPS Located
  </div>

  <div className="border rounded-xl p-4 text-center">
    Officer Assigned
  </div>

  <div className="border rounded-xl p-4 text-center">
    Family Notified
  </div>

  <div className="border rounded-xl p-4 text-center">
    Response Active
  </div>

  <div className="border rounded-xl p-4 text-center">
    Incident Closed
  </div>

</div>

</div>

</div>

</div>

);

};

export default EmergencyMonitor;