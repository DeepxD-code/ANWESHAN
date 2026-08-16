import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UserProgressProvider } from "@/contexts/UserProgressContext";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


/* ---------------- PUBLIC ---------------- */

import Index from "./pages/Index";
import Learn from "./pages/Learn";
import Simulate from "./pages/Simulate";
import Results from "./pages/Results";
import LinkChecker from "./pages/LinkChecker";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";


/* ---------------- AUTH ---------------- */

import Login from "./pages/Login";
import Register from "./pages/Register";
import RoleSelector from "./pages/RoleSelector";


/* ---------------- PORTALS ---------------- */

import SeniorPortal from "./pages/SeniorPortal";
import FamilyPortal from "./pages/FamilyPortal";
import OfficerPortal from "./pages/OfficerPortal";
import AdminPortal from "./pages/AdminPortal";


/* ---------------- FAMILY ---------------- */

import FamilyDashboard from "./pages/FamilyDashboard";
import FamilyAlerts from "./pages/family/Alerts";
import FamilySeniors from "./pages/family/Seniors";
import FamilySettings from "./pages/family/Settings";
import FamilyEscalations from "./pages/family/Escalations";


/* ---------------- SENIOR ---------------- */

import SeniorDashboard from "./pages/senior/Dashboard";
import SeniorEmergency from "./pages/senior/Emergency";
import FraudCentre from "./pages/senior/FraudCentre";
import HealthWelfare from "./pages/senior/HealthWelfare";
import SeniorAlerts from "./pages/senior/CommunityAlerts";
import CommunityChannel from "./pages/senior/CommunityChannel";
import CommunityThreadDetail from "./pages/senior/CommunityThreadDetail";
import SeniorSettings from "./pages/senior/Settings";


/* ---------------- OFFICER ---------------- */

import OfficerDashboard from "./pages/officer/Dashboard";
import OfficerComplaints from "./pages/officer/Complaints";
import OfficerCases from "./pages/officer/Cases";
import OfficerEvidence from "./pages/officer/Evidence";
import EmergencyMonitor from "./pages/officer/EmergencyMonitor";
import OfficerAnalytics from "./pages/officer/Analytics";
import AlertsFrequencyDashboard from "./pages/officer/AlertsFrequencyDashboard";


/* ---------------- ADMIN ---------------- */

import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminSettings from "./pages/admin/Settings";


const queryClient = new QueryClient();



const App = () => {

return (

<QueryClientProvider client={queryClient}>

<ThemeProvider>

<LanguageProvider>

<UserProgressProvider>

<TooltipProvider>


<Toaster />

<Sonner />


<BrowserRouter>


<div className="min-h-screen flex flex-col">


<Navbar />


<main className="flex-1">


<Routes>


{/* PUBLIC */}

<Route path="/" element={<Index />} />

<Route path="/learn" element={<Learn />} />

<Route path="/simulate" element={<Simulate />} />

<Route path="/results" element={<Results />} />

<Route path="/link-checker" element={<LinkChecker />} />

<Route path="/contact" element={<Contact />} />



{/* AUTH */}

<Route path="/login" element={<Login />} />

<Route path="/register" element={<Register />} />

<Route path="/role-selector" element={<RoleSelector />} />



{/* FAMILY */}

<Route
path="/family-dashboard"
element={<FamilyDashboard />}
/>


<Route
path="/family"
element={<FamilyPortal />}
>

<Route
index
element={<FamilyDashboard />}
/>

<Route
path="dashboard"
element={<FamilyDashboard />}
/>

<Route
path="alerts"
element={<FamilyAlerts />}
/>

<Route
path="seniors"
element={<FamilySeniors />}
/>

<Route
path="settings"
element={<FamilySettings />}
/>

<Route
path="escalations"
element={<FamilyEscalations />}
/>

</Route>




{/* SENIOR */}

<Route
path="/senior"
element={<SeniorPortal />}
>


<Route
index
element={<SeniorDashboard />}
/>


<Route
path="dashboard"
element={<SeniorDashboard />}
/>


<Route
path="emergency"
element={<SeniorEmergency />}
/>


    <Route
      path="fraud-centre"
      element={<FraudCentre />}
    />


{/* Fraud Centre removed, moved to escalations */}


<Route
path="health-welfare"
element={<HealthWelfare />}
/>


<Route
path="community-alerts"
element={<SeniorAlerts />}
/>

<Route
path="community"
element={<CommunityChannel />}
/>

<Route
path="community/:id"
element={<CommunityThreadDetail />}
/>

<Route
path="settings"
element={<SeniorSettings />}
/>


</Route>





{/* OFFICER */}

<Route
path="/officer"
element={<OfficerPortal />}
>


<Route
index
element={<OfficerDashboard />}
/>


<Route
path="dashboard"
element={<OfficerDashboard />}
/>


<Route
path="complaints"
element={<OfficerComplaints />}
/>


<Route
path="cases"
element={<OfficerCases />}
/>


<Route
path="evidence"
element={<OfficerEvidence />}
/>


<Route
path="emergency-monitor"
element={<EmergencyMonitor />}
/>


<Route
path="analytics"
element={<OfficerAnalytics />}
/>

<Route
path="alerts-frequency"
element={<AlertsFrequencyDashboard />}
/>

</Route>





{/* ADMIN */}

<Route
path="/admin"
element={<AdminPortal />}
>


<Route
index
element={<AdminDashboard />}
/>


<Route
path="dashboard"
element={<AdminDashboard />}
/>


<Route
path="users"
element={<AdminUsers />}
/>


<Route
path="analytics"
element={<AdminAnalytics />}
/>


<Route
path="settings"
element={<AdminSettings />}
/>


</Route>





{/* 404 */}

<Route
path="*"
element={<NotFound />}
/>


</Routes>


</main>


<Footer />


</div>


</BrowserRouter>


</TooltipProvider>

</UserProgressProvider>

</LanguageProvider>

</ThemeProvider>

</QueryClientProvider>

);

};


export default App;