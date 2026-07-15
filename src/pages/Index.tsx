import React from "react";

import Hero from "@/components/home/Hero";
import ProblemSection from "@/components/home/ProblemSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorks from "@/components/home/HowItWorks";
import PoliceIntegration from "@/components/home/PoliceIntegration";
import EmergencySection from "@/components/home/EmergencySection";
import CommunitySection from "@/components/home/CommunitySection";
import FooterCTA from "@/components/home/FooterCTA";


const Index = () => {
  return (
    <div className="min-h-screen">

      <Hero />

      <ProblemSection />

      <FeaturesSection />

      <HowItWorks />

      <PoliceIntegration />

      <EmergencySection />

      <CommunitySection />

      <FooterCTA />

    </div>
  );
};


export default Index;
