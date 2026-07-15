import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Language = "en" | "hi" | "gu";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.learn": "Learn",
    "nav.simulate": "Simulate",
    "nav.results": "Results",
    "nav.linkChecker": "Link Checker",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.signup": "Sign Up",

    // Hero
    "hero.title": "ANWESHAN",
    "hero.subtitle": "Defend the Digital Citizen",
    "hero.tagline": "AI for Protection & Empowerment",
    "hero.description":
      "Interactive AI-powered training in Hindi & English to help every Indian spot scams before they strike.",
    "hero.startTraining": "Start Training",
    "hero.runSimulation": "Run Simulation",
    "hero.availability":
      "Available in English & Hindi • Dark/Light mode • Completely Free",

    // Quick Link Checker
    "linkChecker.title": "🔍 Quick Suspicious Link Check",
    "linkChecker.subtitle":
      "Paste any link from WhatsApp, Instagram, SMS, or email. Get instant risk analysis.",
    "linkChecker.placeholder":
      "https://example.com/suspicious-offer...",
    "linkChecker.analyze": "Analyze Link",
    "linkChecker.analyzing": "Analyzing...",
    "linkChecker.riskScore": "Risk Score",
    "linkChecker.analysis": "Analysis",
    "linkChecker.recommendation": "Recommended Action",
    "linkChecker.openFull": "Open Full Link Checker →",
    "linkChecker.danger": "DANGER",
    "linkChecker.suspicious": "SUSPICIOUS",
    "linkChecker.safe": "LIKELY SAFE",

    // Problem
    "problem.title": "Why Anweshan Matters",
    "problem.seniors.title": "Seniors Losing Life Savings",
    "problem.seniors.desc":
      "Digital arrest scams cost ₹2,000 crore in 2024. Victims kept under fake surveillance for 48 days.",

    "problem.students.title":
      "Students Falling for Fake Opportunities",
    "problem.students.desc":
      "Job scams, scholarship frauds, investment schemes targeting youth ambition and financial need.",

    "problem.families.title":
      "Families Deceived by Sophistication",
    "problem.families.desc":
      "Romance scams, deepfake voices, AI-generated videos making fraud indistinguishable from reality.",

    // Stats
    "stats.losses":
      "Annual fraud losses in India (2024)",
    "stats.cases":
      "Cybercrime cases reported (2024)",
    "stats.reduction":
      "Vulnerability reduction with Anweshan training",

    // Features
    "features.title":
      "How Anweshan Protects You",

    "features.profiling.title":
      "Vulnerability Profiling",

    "features.profiling.desc":
      "AI assesses YOUR specific weak points - authority fear, urgency panic, tech literacy gaps",

    "features.simulation.title":
      "Interactive Simulations",

    "features.simulation.desc":
      "Experience real scam scenarios in safe environment. Practice decision-making under psychological pressure",

    "features.community.title":
      "Community Intelligence",

    "features.community.desc":
      "Crowdsourced threat reporting. When 23 users in Delhi report a scam, you get alerted immediately",

    "features.language.title":
      "Multi-Language Support",

    "features.language.desc":
      "Train in Hindi, English, or 12 Indian languages. Voice interface for seniors who can't type",

    // CTA
    "cta.title":
      "Start Your Digital Defense Training",

    "cta.subtitle":
      "Join 15,234 Indians already protecting themselves",

    "cta.button":
      "Begin Training Now",
          // Quiz Page
    "quiz.title":
    "Vulnerability Assessment Quiz",

  "quiz.subtitle":
    "5 questions to identify your weak points. Takes 2 minutes.",

  "quiz.question":
    "Question",

  "quiz.of":
    "of",

  "quiz.next":
    "Next Question",

  "quiz.submit":
    "Submit Quiz",

  "quiz.correct":
    "Correct!",

  "quiz.incorrect":
    "Incorrect",

  "quiz.results.youScored": "You scored",
  "quiz.results.path": "Your Training Path:",
  "quiz.results.digitalArrest": "Digital Arrest Scam Simulation (High Priority)",
  "quiz.results.deepfake": "Deepfake Voice Detection Module",
  "quiz.results.urlSpoofing": "URL Spoofing Basics",
  "quiz.results.startSimulation": "Start Simulation Training",
  "quiz.results.retake": "Retake Quiz",
  "quiz.results.seeResults": "See Results",


  // Results Page
  "results.title":
    "Your Learning Dashboard",

  "results.quizzesCompleted":
    "Quizzes Completed",

  "results.simulationsCompleted":
    "Simulations Completed",

  "results.linksAnalyzed":
    "Links Analyzed",

  "results.trainingHours":
    "Training Hours",

  "results.vulnerability":
    "Your Vulnerability Profile",

  "results.authority":
    "Authority Vulnerability",

  "results.urgency":
    "Urgency Response",

  "results.technical":
    "Technical Literacy",

  "results.badges":
    "Badges Earned",

  "results.nextSteps":
    "Next Steps",

  "results.share":
    "Share your progress",

  "results.noData":
    "Take your first quiz to see results!",

  // Module system
  "module.backToDashboard": "Back to Dashboard",
  "module.takeAssessment": "Take Assessment",
  "module.retakeAssessment": "Retake Assessment",
  "module.yourScore": "Your Score",
  "module.explanation": "Explanation",
  "module.questionOf": "Question {current} of {total}",
  "module.submitAnswer": "Submit Answer",
  "module.nextQuestion": "Next Question",
  "module.viewResults": "View Results",
  "module.excellent": "Excellent!",
  "module.good": "Good Progress",
  "module.needsWork": "Needs Improvement",
  "module.keyInsights": "Key Insights",
  "module.cheatSheet": "Quick Reference",
  "module.correct": "Correct!",
  "module.incorrect": "Incorrect",
  "module.assessmentComplete": "Assessment Complete",
  "module.yourWeaknesses": "Areas to Improve",
  "module.yourStrengths": "Your Strengths",
  "module.startLearning": "Start Learning",


  // Simulation
  "simulate.title":
    "Interactive Scam Simulation: Digital Arrest Scam",

  "simulate.subtitle":
    "Real scenario. Real pressure. Safe environment. Make your choices.",

  "simulate.scammerTyping":
    "Scammer is typing...",

  "simulate.yourChoice":
    "Your Choice",

  "simulate.restart":
    "Try Again",

  "simulate.continue":
    "Continue Training",


  // Contact
  "contact.title":
    "About ANWESHAN",

  "contact.subtitle":
    "Building India's Defense Against Digital Fraud",

  "contact.mission":
    "Our mission is to train 100 million Indians to recognize and avoid digital fraud through AI-powered, personalized behavioral training. We combine generative AI, psychology, and community intelligence to make cyber safety engaging, not boring.",

  "contact.step1":
    "ASSESS",

  "contact.step1.desc":
    "Take 5-minute vulnerability quiz",

  "contact.step2":
    "TRAIN",

  "contact.step2.desc":
    "Practice with realistic scam simulations",

  "contact.step3":
    "PROTECT",

  "contact.step3.desc":
    "Track improvement, share knowledge",

  "contact.govt.title":
    "For Government & Police",

  "contact.govt.desc":
    "Anweshan can be deployed for pilot programs at zero cost. Built on open-source technology, ready for nationwide scale.",

  "contact.form.name":
    "Name",

  "contact.form.email":
    "Email",

  "contact.form.org":
    "Organization",

  "contact.form.message":
    "Message",

  "contact.form.scam":
    "I want to report a new scam pattern",

  "contact.form.pilot":
    "I'm interested in government/police pilot",

  "contact.form.volunteer":
    "I want to volunteer as a translator",

  "contact.form.submit":
    "Submit",


  // Footer
  "footer.built":
    "Built for India's 1.4 billion digital citizens",

  "footer.track":
    "Track 2: Defend the Digital Citizen | AI Impact Summit 2026 | iSAFE Hackathon",


  // Full Link Checker
  "fullLinkChecker.title":
    "ANWESHAN Link Analyzer",

  "fullLinkChecker.subtitle":
    "Advanced AI-powered pattern detection for suspicious URLs and messages",

  "fullLinkChecker.placeholder":
    "Paste any suspicious link, email, or message here...\n\nExample:\nhttps://gov-india-relief.com/claim-5000\nOR\nForward entire WhatsApp message with links",

  "fullLinkChecker.analyze":
    "Analyze Now",

  "fullLinkChecker.checking1":
    "Checking domain reputation...",

  "fullLinkChecker.checking2":
    "Analyzing content patterns...",

  "fullLinkChecker.checking3":
    "Cross-referencing threat database...",

  "fullLinkChecker.meaning":
    "What This Means",

  "fullLinkChecker.verify":
    "How to verify real government schemes:",

  "fullLinkChecker.share":
    "Share this analysis",

  "fullLinkChecker.redFlags":
    "Common Red Flags in Scam Links:",

  // Login Page
  "login.title": "ANWESHAN",
  "login.subtitle": "Cyber-Aware Safety & Welfare Platform",
  "login.welcome": "Welcome Back",
  "login.email": "Email",
  "login.password": "Password",
  "login.rememberMe": "Remember Me",
  "login.forgotPassword": "Forgot Password?",
  "login.loggingIn": "Logging in...",
  "login.login": "Login",
  "login.or": "─── OR ───",
  "login.continueAsDemo": "Continue as Demo",
  "login.noAccount": "Don't have an account?",
  "login.createAccount": "Create Account",
  "login.emergencyNumbers": "Emergency Numbers",
  "login.govt": "Government of Gujarat",
  "login.cyberBranch": "Cyber Crime Branch",
  "login.loginFailed": "Login failed",
  "login.connectionError": "Unable to connect to server",

  // Register Page
  "register.title": "Create Account",
  "register.subtitle": "Join ANWESHAN Cyber Safety Platform",
  "register.fullName": "Full Name",
  "register.age": "Age",
  "register.selectGender": "Select Gender",
  "register.male": "Male",
  "register.female": "Female",
  "register.other": "Other",
  "register.mobile": "Mobile",
  "register.email": "Email",
  "register.password": "Password",
  "register.confirmPassword": "Confirm Password",
  "register.preferredLanguage": "Preferred Language",
  "register.english": "English",
  "register.hindi": "Hindi",
  "register.city": "City",
  "register.emergencyContact": "Emergency Contact",
  "register.register": "Register",
  "register.hasAccount": "Already have an account?",
  "register.login": "Login",

  // Role Selector
  "roleSelector.title": "Select Your Portal",
  "roleSelector.subtitle": "Choose your role to continue",
  "roleSelector.senior": "Senior Citizen",
  "roleSelector.senior.desc": "Access personal dashboard",
  "roleSelector.family": "Family Member",
  "roleSelector.family.desc": "Monitor loved ones",
  "roleSelector.officer": "Cyber Crime Officer",
  "roleSelector.officer.desc": "Investigation Console",
  "roleSelector.admin": "Administrator",
  "roleSelector.admin.desc": "Platform Management",
  "roleSelector.enter": "Enter Portal",

  // Not Found
  "notFound.title": "404",
  "notFound.message": "Oops! Page not found",
  "notFound.return": "Return to Home",

  // Portal Nav - Senior
  "portal.senior.dashboard": "Dashboard",
  "portal.senior.emergency": "Emergency",
  "portal.senior.fraudCentre": "Fraud Centre",
  "portal.senior.healthWelfare": "Health & Welfare",
  "portal.senior.communityAlerts": "Community Alerts",
  "portal.senior.settings": "Settings",

  // Portal Nav - Family
  "portal.family.dashboard": "Dashboard",
  "portal.family.alerts": "Alerts",
  "portal.family.seniors": "Seniors",
  "portal.family.settings": "Settings",
  "portal.family.subtitle": "Family Portal",

  // Portal Nav - Officer
  "portal.officer.dashboard": "Dashboard",
  "portal.officer.complaints": "Complaints",
  "portal.officer.cases": "Cases",
  "portal.officer.evidence": "Evidence",
  "portal.officer.emergencyMonitor": "Emergency Monitor",
  "portal.officer.analytics": "Analytics",
  "portal.officer.subtitle": "Officer Console",

  // Portal Nav - Admin
  "portal.admin.dashboard": "Dashboard",
  "portal.admin.users": "Users",
  "portal.admin.analytics": "Analytics",
  "portal.admin.settings": "Settings",

  // Family Dashboard
  "family.dashboard.title": "Family Dashboard",
  "family.dashboard.subtitle": "Monitor your loved one's safety, health and emergency status in one place.",
  "family.dashboard.seniorStatus": "Senior Status",
  "family.dashboard.safe": "SAFE",
  "family.dashboard.lastCheckin": "Last Check-In",
  "family.dashboard.activeAlerts": "Active Alerts",
  "family.dashboard.currentLocation": "Current Location",
  "family.dashboard.name": "Name",
  "family.dashboard.health": "Health",
  "family.dashboard.good": "Good",
  "family.dashboard.lastLocation": "Last Location",
  "family.dashboard.lastActivity": "Last Activity",
  "family.dashboard.emergencyAlerts": "Emergency Alerts",
  "family.dashboard.activeSOS": "Active SOS",
  "family.dashboard.noEmergency": "No active emergency.",
  "family.dashboard.cyberAlert": "Cyber Alert",
  "family.dashboard.linksReported": "1 suspicious link reported.",
  "family.dashboard.attention": "Attention",
  "family.dashboard.healthOverview": "Health Overview",
  "family.dashboard.medication": "Medication",
  "family.dashboard.completed": "Completed",
  "family.dashboard.dailyCheckin": "Daily Check-in",
  "family.dashboard.wellness": "Wellness",
  "family.dashboard.stable": "Stable",
  "family.dashboard.wearable": "Wearable",
  "family.dashboard.connected": "Connected",
  "family.dashboard.emergencyContacts": "Emergency Contacts",
  "family.dashboard.callSenior": "📞 Call Senior",
  "family.dashboard.callHelpline": "🚓 Call Cyber Helpline (1930)",
  "family.dashboard.callEmergency": "🚑 Emergency (112)",
  "family.dashboard.recentActivity": "Recent Activity",

  // Senior Dashboard
  "senior.dashboard.title": "Your Dashboard",
  "senior.dashboard.greeting": "Good Morning",
  "senior.dashboard.overallSafety": "Overall Safety",
  "senior.dashboard.safe": "SAFE",
  "senior.dashboard.cyberRisk": "Cyber Risk Score",
  "senior.dashboard.lowRisk": "Low Risk",
  "senior.dashboard.healthStatus": "Health Status",
  "senior.dashboard.activeCases": "Active Cases",
  "senior.dashboard.underInvestigation": "Under Investigation",
  "senior.dashboard.emergencyContacts": "Emergency Contacts",
  "senior.dashboard.verifiedContacts": "Verified Contacts",
  "senior.dashboard.quickActions": "Quick Actions",
  "senior.dashboard.reportFraud": "Report Fraud",
  "senior.dashboard.emergencySOS": "Emergency SOS",
  "senior.dashboard.evidenceVault": "Evidence Vault",
  "senior.dashboard.communityAlerts": "Community Alerts",
  "senior.dashboard.tipOfDay": "AI Safety Tip of the Day",
  "senior.dashboard.todaysActivity": "Today's Activity",
  "senior.dashboard.lastSync": "Last synchronized:",

  // Senior Emergency
  "senior.emergency.title": "Emergency Response",
  "senior.emergency.status": "Emergency Status",
  "senior.emergency.safe": "SAFE",
  "senior.emergency.liveLocation": "Live Location",
  "senior.emergency.lastCheckin": "Last Check-In",
  "senior.emergency.sosButton": "One-Touch Emergency SOS",
  "senior.emergency.sending": "SENDING...",
  "senior.emergency.activated": "SOS ACTIVATED",
  "senior.emergency.sos": "EMERGENCY SOS",
  "senior.emergency.voiceSOS": "Voice Emergency",
  "senior.emergency.activateVoice": "Activate Voice SOS",
  "senior.emergency.contacts": "Emergency Contacts",
  "senior.emergency.medicalStatus": "Medical Status",
  "senior.emergency.bloodPressure": "Blood Pressure",
  "senior.emergency.normal": "Normal",
  "senior.emergency.responseStatus": "Response Status",
  "senior.emergency.systemReady": "System Ready",
  "senior.emergency.recentActivity": "Recent Emergency Activity",

  // Senior Emergency Contacts
  "senior.contacts.title": "Emergency Contacts",
  "senior.contacts.subtitle": "Manage trusted family members...",
  "senior.contacts.add": "Add Contact",
  "senior.contacts.registered": "Registered Contacts",
  "senior.contacts.family": "Family Members",
  "senior.contacts.medical": "Medical Contacts",
  "senior.contacts.primary": "Primary",
  "senior.contacts.secondary": "Secondary",
  "senior.contacts.call": "Call",
  "senior.contacts.edit": "Edit",
  "senior.contacts.remove": "Remove",
  "senior.contacts.guidelines": "Emergency Contact Guidelines",

  // Senior Fraud Centre
  "senior.fraud.title": "Fraud Centre",
  "senior.fraud.subtitle": "Report cyber fraud, monitor complaint progress...",
  "senior.fraud.totalComplaints": "Total Complaints",
  "senior.fraud.activeCases": "Active Cases",
  "senior.fraud.evidenceFiles": "Evidence Files",
  "senior.fraud.resolved": "Resolved",
  "senior.fraud.reportFraud": "Report Fraud",
  "senior.fraud.myComplaints": "My Complaints",
  "senior.fraud.evidenceVault": "Evidence Vault",
  "senior.fraud.workflow": "Cyber Crime Reporting Workflow",

  // Senior Evidence Vault
  "senior.evidence.title": "Evidence Vault",
  "senior.evidence.subtitle": "Securely manage cybercrime evidence...",
  "senior.evidence.upload": "Upload Evidence",
  "senior.evidence.totalFiles": "Total Files",
  "senior.evidence.storageUsed": "Storage Used",
  "senior.evidence.linkedCases": "Linked Cases",
  "senior.evidence.search": "Search complaint ID or file...",
  "senior.evidence.complaintId": "Complaint ID",
  "senior.evidence.uploadedBy": "Uploaded By",
  "senior.evidence.uploadDate": "Upload Date",
  "senior.evidence.size": "Size",
  "senior.evidence.view": "View",
  "senior.evidence.download": "Download",
  "senior.evidence.delete": "Delete",
  "senior.evidence.none": "No Evidence Found",

  // Senior Health
  "senior.health.title": "Health & Wellness",
  "senior.health.overall": "Overall Health",
  "senior.health.good": "Good",
  "senior.health.dailyCheckin": "Daily Check-In",
  "senior.health.completed": "Completed",
  "senior.health.wearable": "Wearable Device",
  "senior.health.connected": "Connected",
  "senior.health.emergencyProfile": "Emergency Profile",
  "senior.health.updated": "Updated",
  "senior.health.vitals": "Vital Statistics",
  "senior.health.bloodPressure": "Blood Pressure",
  "senior.health.reminders": "Today's Health Reminders",
  "senior.health.medicalProfile": "Emergency Medical Profile",
  "senior.health.recommendations": "Health Recommendations",
  "senior.health.updateProfile": "Update Health Profile",

  // Senior Report Fraud
  "senior.report.title": "Report Cyber Fraud",
  "senior.report.category": "Scam Category",
  "senior.report.phishing": "Phishing",
  "senior.report.upiFraud": "UPI Fraud",
  "senior.report.titleField": "Complaint Title",
  "senior.report.details": "Incident Details",
  "senior.report.evidence": "Evidence",
  "senior.report.uploadEvidence": "Upload Supporting Evidence",
  "senior.report.victimDetails": "Victim Details",
  "senior.report.fullName": "Full Name",
  "senior.report.mobile": "Mobile Number",
  "senior.report.email": "Email Address",
  "senior.report.priority": "Complaint Priority",
  "senior.report.low": "Low",
  "senior.report.medium": "Medium",
  "senior.report.high": "High",
  "senior.report.emergency": "Emergency",
  "senior.report.beforeSubmit": "Before You Submit",
  "senior.report.submit": "Submit Complaint",
  "senior.report.submitted": "Complaint Submitted",
  "senior.report.submitAnother": "Submit Another Complaint",

  // Senior Cases
  "senior.cases.title": "Case Management",
  "senior.cases.subtitle": "Monitor investigations...",
  "senior.cases.total": "Total Cases",
  "senior.cases.active": "Active",
  "senior.cases.investigating": "Investigating",
  "senior.cases.closed": "Closed",
  "senior.cases.search": "Search Case ID...",
  "senior.cases.all": "All",
  "senior.cases.pending": "Pending",
  "senior.cases.resolved": "Resolved",
  "senior.cases.citizen": "Citizen",
  "senior.cases.date": "Date",
  "senior.cases.amount": "Amount",
  "senior.cases.priority": "Priority",
  "senior.cases.openCase": "Open Case",
  "senior.cases.timeline": "Investigation Timeline",
  "senior.cases.viewEvidence": "View Evidence",
  "senior.cases.none": "No Cases Found",

  // Senior Community Alerts
  "senior.community.title": "Community Alerts",
  "senior.community.subtitle": "Stay informed about cyber fraud trends...",
  "senior.community.subscribe": "Subscribe Alerts",
  "senior.community.activeAlerts": "Active Alerts",
  "senior.community.highRisk": "High Risk",
  "senior.community.nearby": "Nearby Alerts",
  "senior.community.thisWeek": "This Week",
  "senior.community.search": "Search alerts...",
  "senior.community.all": "All",
  "senior.community.medium": "Medium",
  "senior.community.critical": "Critical",
  "senior.community.viewDetails": "View Details",
  "senior.community.markRead": "Mark as Read",
  "senior.community.staySafe": "Stay Safe",

  // Senior Settings
  "senior.settings.title": "Settings",
  "senior.settings.subtitle": "Manage your account, accessibility...",
  "senior.settings.general": "General",
  "senior.settings.language": "Preferred Language",
  "senior.settings.theme": "Theme",
  "senior.settings.light": "Light",
  "senior.settings.dark": "Dark",
  "senior.settings.system": "System",
  "senior.settings.emergencyPrefs": "Emergency Preferences",
  "senior.settings.accessibility": "Accessibility",
  "senior.settings.largeText": "Large Text Mode",
  "senior.settings.privacy": "Privacy & Security",
  "senior.settings.accountInfo": "Account Information",
  "senior.settings.fullName": "Full Name",
  "senior.settings.saveChanges": "Save Changes",
  "senior.settings.resetPrefs": "Reset Preferences",
  "senior.settings.govtNotice": "Government Safety Notice",
  "settings.emergencyNotifications": "Emergency Notifications",
  "settings.receiveEmergencyAlerts": "Receive emergency alerts.",
  "settings.liveLocationSharing": "Live Location Sharing",
  "settings.shareGpsEmergencies": "Share GPS during emergencies.",
  "settings.voiceSos": "Voice SOS",
  "settings.enableVoiceActivation": "Enable voice activation.",
  "settings.highContrast": "High Contrast Mode",
  "settings.voiceGuidance": "Voice Guidance",
  "settings.readNotificationsAloud": "Read Notifications Aloud",
  "settings.shareAnonymousStats": "Share anonymous fraud statistics",
  "settings.allowEmergencyGps": "Allow emergency GPS access",
  "settings.enableAiScam": "Enable AI Scam Detection",
  "settings.twoFactorAuth": "Two-Factor Authentication",
  "settings.registeredMobile": "Registered Mobile",
  "settings.email": "Email",
  "settings.aadhaarVerification": "Aadhaar Verification",
  "settings.verified": "Verified",
  "settings.changesSaved": "Changes saved successfully!",

  // Family Alerts
  "family.alerts.title": "Alerts",
  "family.alerts.subtitle": "Monitor and classify alerts...",
  "family.alerts.none": "No alerts found.",
  "family.alerts.status": "Status:",
  "family.alerts.location": "Location:",
  "family.alerts.time": "Time:",
  "family.alerts.classification": "Classification:",
  "family.alerts.reclassify": "Reclassify",
  "family.alerts.classify": "Classify",
  "family.alerts.selectScam": "Select scam type:",
  "family.alerts.phishing": "Phishing",
  "family.alerts.vishing": "Vishing",

  // Family Seniors
  "family.seniors.title": "Linked Seniors",
  "family.seniors.subtitle": "View and manage senior citizens...",
  "family.seniors.safe": "Safe",
  "family.seniors.attention": "Attention",
  "family.seniors.age": "Age",
  "family.seniors.health": "Health",
  "family.seniors.location": "Location",
  "family.seniors.lastCheckin": "Last Check-in",

  // Family Settings
  "family.settings.title": "Settings",
  "family.settings.subtitle": "Manage your family portal preferences.",
  "family.settings.notifications": "Notifications",
  "family.settings.smsAlerts": "SMS Alerts",
  "family.settings.emailAlerts": "Email Alerts",
  "family.settings.pushNotifications": "Push Notifications",
  "family.settings.emergencyContact": "Emergency Contact",
  "family.settings.emergencyInfo": "Update your emergency contact information.",
  "family.settings.name": "Name",
  "family.settings.phone": "Phone",
  "family.settings.saveChanges": "Save Changes",
  "family.settings.account": "Account",
  "family.settings.manageSeniors": "Manage Linked Seniors",

  // Officer Dashboard
  "officer.dashboard.title": "Cyber Crime Officer Dashboard",
  "officer.dashboard.activeComplaints": "Active Complaints",
  "officer.dashboard.activeEmergencies": "Active Emergencies",
  "officer.dashboard.officersOnline": "Officers Online",
  "officer.dashboard.resolvedToday": "Cases Resolved Today",
  "officer.dashboard.recentComplaints": "Recent Complaints",
  "officer.dashboard.viewAll": "View All",
  "officer.dashboard.liveMonitor": "Live Emergency Monitor",
  "officer.dashboard.quickActions": "Officer Quick Actions",
  "officer.dashboard.reviewComplaints": "Review Complaints",
  "officer.dashboard.openCases": "Open Cases",
  "officer.dashboard.evidenceVault": "Evidence Vault",
  "officer.dashboard.emergencyMonitor": "Emergency Monitor",

  // Officer Complaints
  "officer.complaints.title": "Complaint Management",
  "officer.complaints.subtitle": "Review, assign and investigate...",
  "officer.complaints.export": "Export Complaints",
  "officer.complaints.total": "Total Complaints",
  "officer.complaints.pending": "Pending",
  "officer.complaints.investigating": "Investigating",
  "officer.complaints.resolved": "Resolved",
  "officer.complaints.search": "Search Complaint ID...",
  "officer.complaints.citizen": "Citizen",
  "officer.complaints.date": "Date",
  "officer.complaints.location": "Location",
  "officer.complaints.reportedLoss": "Reported Loss",
  "officer.complaints.status": "Current Status",
  "officer.complaints.view": "View Complaint",
  "officer.complaints.assign": "Assign Officer",
  "officer.complaints.openCase": "Open Case",
  "officer.complaints.viewEvidence": "View Evidence",
  "officer.complaints.workflow": "Investigation Workflow",

  // Officer Cases
  "officer.cases.title": "Case Management",
  "officer.cases.subtitle": "Monitor investigations...",
  "officer.cases.create": "Create New Case",
  "officer.cases.total": "Total Cases",
  "officer.cases.active": "Active",
  "officer.cases.evidenceReview": "Evidence Review",
  "officer.cases.closed": "Closed",
  "officer.cases.search": "Search Case ID...",
  "officer.cases.complaintId": "Complaint ID",
  "officer.cases.citizen": "Citizen",
  "officer.cases.assignedOfficer": "Assigned Officer",
  "officer.cases.status": "Status",
  "officer.cases.lastUpdated": "Last Updated",
  "officer.cases.openCase": "Open Case",
  "officer.cases.pipeline": "Investigation Pipeline",
  "officer.cases.created": "Case Created",

  // Officer Evidence
  "officer.evidence.title": "Digital Evidence Vault",
  "officer.evidence.subtitle": "Securely review, verify...",
  "officer.evidence.export": "Export Evidence",
  "officer.evidence.totalFiles": "Total Files",
  "officer.evidence.verified": "Verified",
  "officer.evidence.pendingReview": "Pending Review",
  "officer.evidence.storageUsed": "Storage Used",
  "officer.evidence.search": "Search Evidence ID...",
  "officer.evidence.complaintId": "Complaint ID",
  "officer.evidence.citizen": "Citizen",
  "officer.evidence.type": "Evidence Type",
  "officer.evidence.uploadDate": "Upload Date",
  "officer.evidence.fileSize": "File Size",
  "officer.evidence.view": "View Evidence",
  "officer.evidence.download": "Download",
  "officer.evidence.verify": "Verify Evidence",
  "officer.evidence.linkToCase": "Link to Case",
  "officer.evidence.workflow": "Evidence Handling Workflow",

  // Officer Emergency Monitor
  "officer.emergency.title": "Emergency Monitor",
  "officer.emergency.subtitle": "Live monitoring of SOS requests...",
  "officer.emergency.liveDashboard": "Live Dashboard",
  "officer.emergency.active": "Active Emergencies",
  "officer.emergency.deployed": "Officers Deployed",
  "officer.emergency.avgResponse": "Avg Response",
  "officer.emergency.resolvedToday": "Resolved Today",
  "officer.emergency.search": "Search SOS ID...",
  "officer.emergency.citizen": "Citizen",
  "officer.emergency.type": "Emergency Type",
  "officer.emergency.location": "Location",
  "officer.emergency.status": "Current Status",
  "officer.emergency.triggered": "Triggered",
  "officer.emergency.liveTracking": "Open Live Tracking",
  "officer.emergency.contactCitizen": "Contact Citizen",
  "officer.emergency.notifyFamily": "Notify Family",
  "officer.emergency.markResolved": "Mark Resolved",
  "officer.emergency.workflow": "Emergency Response Workflow",

  // Officer Analytics
  "officer.analytics.title": "Analytics Dashboard",
  "officer.analytics.subtitle": "Cyber crime trends...",
  "officer.analytics.export": "Export Report",
  "officer.analytics.complaintsMonth": "Complaints This Month",
  "officer.analytics.fraudPrevented": "Fraud Prevented",
  "officer.analytics.avgResponseTime": "Avg Response Time",
  "officer.analytics.resolutionRate": "Resolution Rate",
  "officer.analytics.trends": "Fraud Trend Analysis",
  "officer.analytics.upiFraud": "UPI Fraud",
  "officer.analytics.investmentScam": "Investment Scam",
  "officer.analytics.insights": "Operational Insights",
  "officer.analytics.highestRisk": "Highest Risk Area",
  "officer.analytics.aiThreat": "AI Threat Intelligence",
  "officer.analytics.emergingScam": "Emerging Scam",

  // Admin Dashboard
  "admin.dashboard.title": "Admin Dashboard",
  "admin.dashboard.subtitle": "Platform overview, system health...",
  "admin.dashboard.generateReport": "Generate Report",
  "admin.dashboard.registeredSeniors": "Registered Seniors",
  "admin.dashboard.cyberOfficers": "Cyber Officers",
  "admin.dashboard.activeCases": "Active Cases",
  "admin.dashboard.platformUptime": "Platform Uptime",
  "admin.dashboard.systemHealth": "System Health",
  "admin.dashboard.apiServer": "API Server",
  "admin.dashboard.operational": "Operational",
  "admin.dashboard.recentActivity": "Recent Platform Activity",
  "admin.dashboard.adminActions": "Administrative Actions",
  "admin.dashboard.manageUsers": "Manage Users",
  "admin.dashboard.viewAnalytics": "View Analytics",
  "admin.dashboard.platformSettings": "Platform Settings",
  "admin.dashboard.systemLogs": "System Logs",

  // Admin Analytics
  "admin.analytics.title": "Platform Analytics",
  "admin.analytics.subtitle": "Monitor platform performance...",
  "admin.analytics.export": "Export Analytics",
  "admin.analytics.totalComplaints": "Total Complaints",
  "admin.analytics.activeSeniors": "Active Seniors",
  "admin.analytics.emergencyResponses": "Emergency Responses",
  "admin.analytics.resolutionRate": "Resolution Rate",
  "admin.analytics.fraudDistribution": "Fraud Distribution",
  "admin.analytics.upiFraud": "UPI Fraud",
  "admin.analytics.performance": "Platform Performance",
  "admin.analytics.aiInsights": "AI Insights",
  "admin.analytics.highestRiskZone": "Highest Risk Zone",
  "admin.analytics.emergingScam": "Emerging Scam",
  "admin.analytics.recommendation": "Recommendation",

  // Admin Settings
  "admin.settings.title": "Platform Settings",
  "admin.settings.subtitle": "Configure platform-wide preferences...",
  "admin.settings.general": "General",
  "admin.settings.maintenance": "Maintenance Mode",
  "admin.settings.allowRegistration": "Allow New Registrations",
  "admin.settings.enableAI": "Enable AI Scam Detection",
  "admin.settings.security": "Security",
  "admin.settings.twoFactor": "Require Two-Factor Authentication",
  "admin.settings.auditLogs": "Enable Audit Logs",
  "admin.settings.notifications": "Notifications",
  "admin.settings.emailAlerts": "Email Alerts",
  "admin.settings.saveChanges": "Save Changes",
  "admin.settings.reset": "Reset",

  // Admin Users
  "admin.users.title": "User Management",
  "admin.users.subtitle": "Manage senior citizens, officers...",
  "admin.users.addUser": "Add User",
  "admin.users.total": "Total Users",
  "admin.users.seniors": "Seniors",
  "admin.users.officers": "Officers",
  "admin.users.admins": "Administrators",
  "admin.users.search": "Search User ID...",
  "admin.users.userId": "User ID",
  "admin.users.role": "Role",
  "admin.users.city": "City",
  "admin.users.joined": "Joined",
  "admin.users.viewProfile": "View Profile",
  "admin.users.editUser": "Edit User",
  "admin.users.resetPassword": "Reset Password",
  "admin.users.disableAccount": "Disable Account",
  "admin.users.stats": "User Statistics",
  "admin.users.newToday": "New Today",
  "admin.users.activeToday": "Active Today",
  "admin.users.suspended": "Suspended",
  "admin.users.verified": "Verified",

  // Home - Hero
  "home.hero.branch": "Ahmedabad Cyber Crime Branch • Government of Gujarat",
  "home.hero.title": "ANWESHAN",
  "home.hero.subtitle": "Cyber-Aware Safety & Welfare Platform for Senior Citizens",
  "home.hero.desc": "Protecting senior citizens from cyber fraud, medical emergencies, financial scams and digital threats through AI-assisted prevention, rapid emergency response, welfare monitoring and seamless police integration.",
  "home.hero.stat.seniors": "Registered Seniors",
  "home.hero.stat.reports": "Fraud Reports",
  "home.hero.stat.responses": "Emergency Responses",
  "home.hero.stat.avgTime": "Avg Response",
  "home.problem.desc": "Existing platforms focus either on cyber awareness, emergency response or welfare monitoring. ANWESHAN combines all three into a unified ecosystem designed specifically for senior citizens and the Cyber Crime Branch.",
  "home.problem.desc.cyber": "Senior citizens are increasingly targeted through phishing, OTP scams, fake investment schemes, pension frauds, digital arrest scams and identity theft. These attacks often exploit fear, trust and limited digital literacy.",
  "home.problem.desc.medical": "Many elderly citizens live alone and require continuous wellness monitoring, medication reminders, inactivity detection and rapid emergency assistance during medical situations.",
  "home.problem.desc.response": "Current systems are fragmented. Reporting cybercrime, contacting family members and reaching emergency responders often requires multiple independent services.",
  "home.problem.desc.police": "Cyber Crime Branch requires a unified platform capable of receiving evidence, tracking cases, generating alerts and assisting investigations through structured digital workflows.",
  "home.problem.stat.losses": "Cyber Fraud Losses (India 2024)",
  "home.problem.stat.complaints": "Complaints Registered",
  "home.problem.stat.categories": "Scam Categories Covered",
  "home.problem.stat.ready": "Emergency Response Ready",
  "home.features.desc": "ANWESHAN combines cyber awareness, emergency response, welfare monitoring and police collaboration into a single unified platform.",
  "home.features.desc.emergency": "One-touch emergency trigger with GPS location, voice activation and instant alerts to family members and Cyber Crime authorities.",
  "home.features.desc.cyber": "Analyze suspicious links, SMS, WhatsApp messages and emails using AI-assisted fraud detection before interacting with them.",
  "home.features.desc.risk": "Continuously evaluates behavioural vulnerability, fraud exposure and digital safety to generate personalized risk scores.",
  "home.features.desc.evidence": "Securely upload screenshots, scam messages, call recordings and URLs with timestamps for investigation support.",
  "home.features.desc.family": "Notify caregivers during emergencies while providing wellness updates and real-time incident status.",
  "home.features.desc.welfare": "Daily check-ins, medication reminders, inactivity alerts and health monitoring designed specifically for senior citizens.",
  "home.features.desc.police": "Case tracking, fraud heatmaps, emergency monitoring and digital evidence management for Cyber Crime officers.",
  "home.features.desc.multilingual": "Accessible interface supporting English, Hindi and Gujarati with large typography and senior-friendly navigation.",
  "home.how.desc": "Every interaction follows a structured workflow that combines AI-assisted cyber protection, emergency response and collaboration with Cyber Crime authorities.",
  "home.how.desc.step1": "Senior citizens access ANWESHAN through a simple multilingual interface to report fraud, perform wellness check-ins, analyze suspicious content or trigger emergency assistance.",
  "home.how.desc.step2": "Messages, URLs, screenshots and reported incidents are analyzed to identify phishing attempts, scam indicators and potential cyber threats.",
  "home.how.desc.step3": "The platform evaluates fraud severity, behavioural risk, emergency level and contextual information to determine the appropriate response.",
  "home.how.desc.step4": "Relevant alerts are instantly shared with family members, caregivers and Cyber Crime officers while evidence is securely preserved for investigation.",
  "home.how.desc.step5": "Community intelligence, wellness monitoring, scam awareness and fraud analytics continuously improve citizen safety and law-enforcement response.",
  "home.hero.openSenior": "Open Senior Portal",
  "home.hero.reportFraud": "Report Cyber Fraud",
  "home.hero.explore": "Explore Platform",
  "home.hero.platformStatus": "Platform Status",
  "home.hero.emergencySOS": "Emergency SOS",
  "home.hero.aiDetection": "AI Scam Detection",
  "home.hero.familyConnectivity": "Family Connectivity",
  "home.hero.policeIntegration": "Police Integration",
  "home.hero.healthMonitoring": "Health Monitoring",
  "home.hero.evidenceVault": "Evidence Vault",

  // Home - Problem
  "home.problem.title": "Problem Statement",
  "home.problem.sectionTitle": "Why ANWESHAN is Needed",
  "home.problem.cyberFraud": "Cyber Fraud Against Senior Citizens",
  "home.problem.medicalEmergencies": "Medical & Welfare Emergencies",
  "home.problem.delayedResponse": "Delayed Emergency Response",
  "home.problem.policeIntegration": "Need for Police Integration",

  // Home - Features
  "home.features.title": "Core Capabilities",
  "home.features.subtitle": "Everything Needed to Protect Senior Citizens",
  "home.features.emergencySOS": "Emergency SOS",
  "home.features.cyberProtection": "Cyber Fraud Protection",
  "home.features.aiRisk": "AI Risk Assessment",
  "home.features.evidenceCollection": "Evidence Collection",
  "home.features.familyConnectivity": "Family Connectivity",
  "home.features.welfareMonitoring": "Welfare Monitoring",
  "home.features.policeDashboard": "Police Dashboard",
  "home.features.multilingual": "Multilingual Accessibility",

  // Home - How It Works
  "home.how.title": "Workflow",
  "home.how.sectionTitle": "How ANWESHAN Works",
  "home.how.step1": "1. Citizen Interaction",
  "home.how.step2": "2. AI Analysis",
  "home.how.step3": "3. Risk Assessment",
  "home.how.step4": "4. Response & Alerts",
  "home.how.step5": "5. Continuous Protection",

  // Home - Police Integration
  "home.police.title": "Law Enforcement Integration",
  "home.police.subtitle": "Built for Ahmedabad Cyber Crime Branch",
  "home.police.realTime": "Real-Time Incident Reporting",
  "home.police.evidenceCollection": "Digital Evidence Collection",
  "home.police.gisIntelligence": "GIS Crime Intelligence",
  "home.police.emergencyCoord": "Emergency Coordination",
  "home.police.caseManagement": "Case Management",
  "home.police.decisionSupport": "Decision Support",
  "home.police.desc": "ANWESHAN is designed to integrate senior citizen safety with structured cybercrime investigation workflows, enabling faster response, better evidence management and improved situational awareness.",
  "home.police.desc.realTime": "Fraud reports, SOS requests and emergency alerts are securely forwarded to Cyber Crime officers with timestamps and priority levels.",
  "home.police.desc.evidence": "Screenshots, scam messages, suspicious links, voice recordings and supporting files are securely stored with complete evidence metadata.",
  "home.police.desc.gis": "Fraud incidents are visualized on interactive maps to identify hotspots, emerging scam campaigns and regional threat trends.",
  "home.police.desc.emergency": "Supports rapid coordination between Cyber Crime Branch, emergency responders and family members during critical situations.",
  "home.police.desc.case": "Every reported incident receives a unique case ID with investigation status, officer assignment and evidence timeline.",
  "home.police.desc.decision": "AI-assisted analytics help officers prioritize cases, identify repeat fraud patterns and improve operational response.",

  // Home - Emergency Section
  "home.emergency.title": "Emergency Response",
  "home.emergency.subtitle": "Rapid Assistance When Every Second Matters",
  "home.emergency.oneTouchSOS": "One-Touch SOS",
  "home.emergency.voiceSOS": "Voice Activated SOS",
  "home.emergency.liveLocation": "Live Location Sharing",
  "home.emergency.medicalSupport": "Medical Emergency Support",
  "home.emergency.familyNotifications": "Family Notifications",
  "home.emergency.offlineBackup": "Offline Alert Backup",
  "home.emergency.desc": "ANWESHAN combines cyber emergency response, medical assistance, family communication and law enforcement coordination into a single emergency management system designed for senior citizens.",
  "home.emergency.desc.oneTouch": "A large, senior-friendly emergency button immediately initiates an SOS request and shares the user's live location with emergency contacts and Cyber Crime authorities.",
  "home.emergency.desc.voice": "Senior citizens can trigger emergency assistance using simple multilingual voice commands without navigating the application.",
  "home.emergency.desc.location": "During emergencies, GPS coordinates are continuously shared with authorized family members and responding officers until the incident is resolved.",
  "home.emergency.desc.medical": "Medication reminders, wellness monitoring and emergency medical alerts help reduce response time during health-related incidents.",
  "home.emergency.desc.family": "Family members receive instant notifications about emergency events, case updates and wellness alerts through the caregiver portal.",
  "home.emergency.desc.offline": "If internet connectivity is unavailable, the platform is designed to support SMS-based emergency notifications for critical situations.",

  // Home - Community
  "home.community.title": "Community Intelligence",
  "home.community.subtitle": "Collective Intelligence Against Cybercrime",
  "home.community.crowdsourced": "Crowdsourced Scam Reporting",
  "home.community.heatmap": "Cyber Threat Heatmap",
  "home.community.realTimeAlerts": "Real-Time Community Alerts",
  "home.community.familyNetwork": "Family Safety Network",
  "home.community.aiThreat": "AI Threat Intelligence",
  "home.community.fraudAnalytics": "Fraud Trend Analytics",
  "home.community.desc": "Every verified report strengthens ANWESHAN's shared cyber intelligence network, helping protect other senior citizens before fraud spreads further.",
  "home.community.desc.crowdsourced": "Citizens anonymously report scam calls, phishing links, fake investment schemes and suspicious messages to strengthen collective cyber awareness.",
  "home.community.desc.heatmap": "Reported incidents are visualized geographically to identify fraud hotspots, emerging scam campaigns and high-risk regions.",
  "home.community.desc.alerts": "When multiple citizens report similar scams, nearby users receive instant warnings before they become victims.",
  "home.community.desc.family": "Family members remain informed about wellness updates, fraud reports and emergency incidents through shared monitoring.",
  "home.community.desc.ai": "AI identifies recurring scam patterns, fraudulent behaviour and emerging cybercrime trends from community-generated reports.",
  "home.community.desc.analytics": "Authorities gain insights into seasonal fraud trends, scam categories and response performance to improve preventive policing.",

  // Home - Footer CTA
  "home.cta.title": "Protecting Every Senior Citizen Through Technology",
  "home.cta.desc": "ANWESHAN combines cyber fraud prevention, emergency response, family connectivity, welfare monitoring and Cyber Crime Branch integration into one unified platform designed for the safety of senior citizens.",
  "home.cta.launch": "Launch Platform",
  "home.cta.learnMore": "Learn More",
  "home.cta.branch": "Ahmedabad Cyber Crime Branch • Government of Gujarat",

  // Extra Footer strings
  "footer.credit": "Built with: React, Tailwind CSS, Claude API, open-source ML models",
  "footer.cost": "Cost: ₹0 for MVP, scales to millions",
},


hi: {

  // Navbar
  "nav.home":
    "होम",

  "nav.learn":
    "सीखें",

  "nav.simulate":
    "सिमुलेशन",

  "nav.results":
    "परिणाम",

  "nav.linkChecker":
    "लिंक जांचें",

  "nav.contact":
    "संपर्क",

  "nav.login":
    "लॉगिन",

    "nav.signup":
    "साइन अप",


  // Hero
  "hero.title":
    "अन्वेषण",

  "hero.subtitle":
    "डिजिटल नागरिक की रक्षा करें",

  "hero.tagline":
    "सुरक्षा और सशक्तिकरण के लिए AI",

  "hero.description":
    "हर भारतीय को घोटालों से पहचानने में मदद करने के लिए हिंदी और अंग्रेजी में इंटरैक्टिव AI-संचालित प्रशिक्षण।",

  "hero.startTraining":
    "प्रशिक्षण शुरू करें",

  "hero.runSimulation":
    "सिमुलेशन चलाएं",

  "hero.availability":
    "अंग्रेजी और हिंदी में उपलब्ध • डार्क/लाइट मोड • पूरी तरह मुफ्त",

  // Quick Link Checker
  "linkChecker.title": "🔍 त्वरित संदिग्ध लिंक जांच",
  "linkChecker.subtitle": "WhatsApp, Instagram, SMS या ईमेल से कोई भी लिंक पेस्ट करें। तुरंत जोखिम विश्लेषण प्राप्त करें।",
  "linkChecker.placeholder": "https://example.com/suspicious-offer...",
  "linkChecker.analyze": "लिंक का विश्लेषण करें",
  "linkChecker.analyzing": "विश्लेषण हो रहा है...",
  "linkChecker.riskScore": "जोखिम स्कोर",
  "linkChecker.analysis": "विश्लेषण",
  "linkChecker.recommendation": "अनुशंसित कार्रवाई",
  "linkChecker.openFull": "पूर्ण लिंक जांच खोलें →",
  "linkChecker.danger": "खतरा",
  "linkChecker.suspicious": "संदिग्ध",
  "linkChecker.safe": "संभवतः सुरक्षित",

  // Problem
  "problem.title": "अन्वेषण क्यों मायने रखता है",
  "problem.seniors.title": "वरिष्ठ नागरिक अपनी जीवन भर की बचत खो रहे हैं",
  "problem.seniors.desc": "डिजिटल गिरफ्तारी घोटालों ने 2024 में ₹2,000 करोड़ का नुकसान पहुंचाया। पीड़ितों को 48 दिनों तक नकली निगरानी में रखा गया।",
  "problem.students.title": "छात्र नकली अवसरों के झांसे में आ रहे हैं",
  "problem.students.desc": "नौकरी घोटाले, छात्रवृत्ति धोखाधड़ी, निवेश योजनाएं जो युवाओं की महत्वाकांक्षा और वित्तीय ज़रूरतों को निशाना बनाती हैं।",
  "problem.families.title": "परिवार परिष्कार से धोखा खा रहे हैं",
  "problem.families.desc": "रोमांस घोटाले, डीपफेक आवाज़ें, AI-जनरेटेड वीडियो जो धोखाधड़ी को वास्तविकता से अप्रभेद्य बनाते हैं।",

  // Stats
  "stats.losses": "भारत में वार्षिक धोखाधड़ी हानि (2024)",
  "stats.cases": "रिपोर्ट किए गए साइबर अपराध के मामले (2024)",
  "stats.reduction": "अन्वेषण प्रशिक्षण से भेद्यता में कमी",

  // Features
  "features.title": "अन्वेषण आपकी रक्षा कैसे करता है",
  "features.profiling.title": "भेद्यता प्रोफाइलिंग",
  "features.profiling.desc": "AI आपके विशिष्ट कमजोर बिंदुओं का आकलन करता है - अधिकार का भय, तात्कालिकता घबराहट, तकनीकी साक्षरता अंतराल",
  "features.simulation.title": "इंटरैक्टिव सिमुलेशन",
  "features.simulation.desc": "सुरक्षित वातावरण में वास्तविक घोटालों के परिदृश्यों का अनुभव करें। मनोवैज्ञानिक दबाव के तहत निर्णय लेने का अभ्यास करें",
  "features.community.title": "सामुदायिक खुफिया",
  "features.community.desc": "क्राउडसोर्स्ड खतरे की रिपोर्टिंग। जब दिल्ली में 23 उपयोगकर्ता एक घोटाले की रिपोर्ट करते हैं, तो आपको तुरंत सतर्क किया जाता है",
  "features.language.title": "बहु-भाषा समर्थन",
  "features.language.desc": "हिंदी, अंग्रेजी या 12 भारतीय भाषाओं में प्रशिक्षण लें। उन वरिष्ठ नागरिकों के लिए वॉयस इंटरफेस जो टाइप नहीं कर सकते",

  // CTA
  "cta.title": "अपना डिजिटल सुरक्षा प्रशिक्षण शुरू करें",
  "cta.subtitle": "15,234 भारतीयों से जुड़ें जो पहले से ही अपनी रक्षा कर रहे हैं",
  "cta.button": "अभी प्रशिक्षण शुरू करें",

  // Quiz Page
  "quiz.title": "भेद्यता आकलन प्रश्नोत्तरी",
  "quiz.subtitle": "आपके कमजोर बिंदुओं की पहचान करने के लिए 5 प्रश्न। केवल 2 मिनट लगते हैं।",
  "quiz.question": "प्रश्न",
  "quiz.of": "का",
  "quiz.next": "अगला प्रश्न",
  "quiz.submit": "प्रश्नोत्तरी सबमिट करें",
  "quiz.correct": "सही!",
  "quiz.incorrect": "गलत",
  "quiz.results.youScored": "आपने स्कोर किया",
  "quiz.results.path": "आपका प्रशिक्षण पथ:",
  "quiz.results.digitalArrest": "डिजिटल गिरफ्तारी घोटाला सिमुलेशन (उच्च प्राथमिकता)",
  "quiz.results.deepfake": "डीपफेक वॉइस डिटेक्शन मॉड्यूल",
  "quiz.results.urlSpoofing": "URL स्पूफिंग बेसिक्स",
  "quiz.results.startSimulation": "सिमुलेशन प्रशिक्षण शुरू करें",
  "quiz.results.retake": "पुनः प्रयास करें",
  "quiz.results.seeResults": "परिणाम देखें",

  // Results Page
  "results.title": "आपका लर्निंग डैशबोर्ड",
  "results.quizzesCompleted": "पूर्ण की गई प्रश्नोत्तरी",
  "results.simulationsCompleted": "पूर्ण किए गए सिमुलेशन",
  "results.linksAnalyzed": "विश्लेषित लिंक",
  "results.trainingHours": "प्रशिक्षण घंटे",
  "results.vulnerability": "आपकी भेद्यता प्रोफ़ाइल",
  "results.authority": "प्राधिकार भेद्यता",
  "results.urgency": "तात्कालिकता प्रतिक्रिया",
  "results.technical": "तकनीकी साक्षरता",
  "results.badges": "अर्जित बैज",
  "results.nextSteps": "अगले कदम",
  "results.share": "अपनी प्रगति साझा करें",
  "results.noData": "परिणाम देखने के लिए अपनी पहली प्रश्नोत्तरी लें!",

  // Module system
  "module.backToDashboard": "डैशबोर्ड पर वापस",
  "module.takeAssessment": "मूल्यांकन लें",
  "module.retakeAssessment": "पुनः मूल्यांकन लें",
  "module.yourScore": "आपका स्कोर",
  "module.explanation": "व्याख्या",
  "module.questionOf": "प्रश्न {current} / {total}",
  "module.submitAnswer": "उत्तर जमा करें",
  "module.nextQuestion": "अगला प्रश्न",
  "module.viewResults": "परिणाम देखें",
  "module.excellent": "उत्कृष्ट!",
  "module.good": "अच्छी प्रगति",
  "module.needsWork": "सुधार की आवश्यकता",
  "module.keyInsights": "मुख्य जानकारी",
  "module.cheatSheet": "त्वरित संदर्भ",
  "module.correct": "सही!",
  "module.incorrect": "गलत",
  "module.assessmentComplete": "मूल्यांकन पूर्ण",
  "module.yourWeaknesses": "सुधार के क्षेत्र",
  "module.yourStrengths": "आपकी ताकत",
  "module.startLearning": "सीखना शुरू करें",

  // Simulation
  "simulate.title": "इंटरैक्टिव घोटाला सिमुलेशन: डिजिटल गिरफ्तारी घोटाला",
  "simulate.subtitle": "वास्तविक परिदृश्य। वास्तविक दबाव। सुरक्षित वातावरण। अपने विकल्प चुनें।",
  "simulate.scammerTyping": "स्कैमर टाइप कर रहा है...",
  "simulate.yourChoice": "आपकी पसंद",
  "simulate.restart": "पुनः प्रयास करें",
  "simulate.continue": "प्रशिक्षण जारी रखें",

  // Contact
  "contact.title": "अन्वेषण के बारे में",
  "contact.subtitle": "डिजिटल धोखाधड़ी के खिलाफ भारत की सुरक्षा का निर्माण",
  "contact.mission": "हमारा मिशन 100 मिलियन भारतीयों को AI-संचालित, व्यक्तिगत व्यवहार प्रशिक्षण के माध्यम से डिजिटल धोखाधड़ी को पहचानने और उससे बचने के लिए प्रशिक्षित करना है। हम जनरेटिव AI, मनोविज्ञान और सामुदायिक खुफिया को जोड़ते हैं ताकि साइबर सुरक्षा आकर्षक बने, उबाऊ नहीं।",
  "contact.step1": "मूल्यांकन",
  "contact.step1.desc": "5 मिनट की भेद्यता प्रश्नोत्तरी लें",
  "contact.step2": "प्रशिक्षण",
  "contact.step2.desc": "यथार्थवादी घोटाला सिमुलेशन के साथ अभ्यास करें",
  "contact.step3": "सुरक्षा",
  "contact.step3.desc": "सुधार को ट्रैक करें, ज्ञान साझा करें",
  "contact.govt.title": "सरकार और पुलिस के लिए",
  "contact.govt.desc": "अन्वेषण को शून्य लागत पर पायलट कार्यक्रमों के लिए तैनात किया जा सकता है। ओपन-सोर्स तकनीक पर निर्मित, राष्ट्रव्यापी पैमाने के लिए तैयार।",
  "contact.form.name": "नाम",
  "contact.form.email": "ईमेल",
  "contact.form.org": "संगठन",
  "contact.form.message": "संदेश",
  "contact.form.scam": "मैं एक नया घोटाला पैटर्न रिपोर्ट करना चाहता हूं",
  "contact.form.pilot": "मैं सरकार/पुलिस पायलट में रुचि रखता हूं",
  "contact.form.volunteer": "मैं अनुवादक के रूप में स्वयंसेवा करना चाहता हूं",
  "contact.form.submit": "सबमिट करें",

  // Footer
  "footer.built": "भारत के 1.4 अरब डिजिटल नागरिकों के लिए बनाया गया",
  "footer.track": "ट्रैक 2: डिजिटल नागरिक की रक्षा करें | AI इम्पैक्ट समिट 2026 | iSAFE हैकाथॉन",

  // Full Link Checker
  "fullLinkChecker.title": "अन्वेषण लिंक विश्लेषक",
  "fullLinkChecker.subtitle": "संदिग्ध URL और संदेशों के लिए उन्नत AI-संचालित पैटर्न पहचान",
  "fullLinkChecker.placeholder": "कोई भी संदिग्ध लिंक, ईमेल या संदेश यहां पेस्ट करें...\n\nउदाहरण:\nhttps://gov-india-relief.com/claim-5000\nया\nपूरा WhatsApp संदेश लिंक के साथ अग्रेषित करें",
  "fullLinkChecker.analyze": "अभी विश्लेषण करें",
  "fullLinkChecker.checking1": "डोमेन प्रतिष्ठा की जांच हो रही है...",
  "fullLinkChecker.checking2": "सामग्री पैटर्न का विश्लेषण हो रहा है...",
  "fullLinkChecker.checking3": "खतरे के डेटाबेस से क्रॉस-रेफरेंस किया जा रहा है...",
  "fullLinkChecker.meaning": "इसका क्या अर्थ है",
  "fullLinkChecker.verify": "वास्तविक सरकारी योजनाओं को कैसे सत्यापित करें:",
  "fullLinkChecker.share": "यह विश्लेषण साझा करें",
  "fullLinkChecker.redFlags": "घोटाले के लिंक में सामान्य चेतावनी संकेत:",

  // Login Page
  "login.title": "अन्वेषण",
  "login.subtitle": "साइबर-जागरूक सुरक्षा एवं कल्याण मंच",
  "login.welcome": "वापस स्वागत है",
  "login.email": "ईमेल",
  "login.password": "पासवर्ड",
  "login.rememberMe": "मुझे याद रखें",
  "login.forgotPassword": "पासवर्ड भूल गए?",
  "login.loggingIn": "लॉग इन हो रहा है...",
  "login.login": "लॉग इन",
  "login.or": "─── या ───",
  "login.continueAsDemo": "डेमो के रूप में जारी रखें",
  "login.noAccount": "खाता नहीं है?",
  "login.createAccount": "खाता बनाएं",
  "login.emergencyNumbers": "आपातकालीन नंबर",
  "login.govt": "गुजरात सरकार",
  "login.cyberBranch": "साइबर क्राइम ब्रांच",
  "login.loginFailed": "लॉग इन विफल",
  "login.connectionError": "सर्वर से कनेक्ट नहीं हो सका",

  // Register Page
  "register.title": "खाता बनाएं",
  "register.subtitle": "अन्वेषण साइबर सुरक्षा मंच से जुड़ें",
  "register.fullName": "पूरा नाम",
  "register.age": "आयु",
  "register.selectGender": "लिंग चुनें",
  "register.male": "पुरुष",
  "register.female": "महिला",
  "register.other": "अन्य",
  "register.mobile": "मोबाइल",
  "register.email": "ईमेल",
  "register.password": "पासवर्ड",
  "register.confirmPassword": "पासवर्ड की पुष्टि करें",
  "register.preferredLanguage": "पसंदीदा भाषा",
  "register.english": "अंग्रेजी",
  "register.hindi": "हिंदी",
  "register.city": "शहर",
  "register.emergencyContact": "आपातकालीन संपर्क",
  "register.register": "पंजीकरण करें",
  "register.hasAccount": "पहले से खाता है?",
  "register.login": "लॉग इन",

  // Role Selector
  "roleSelector.title": "अपना पोर्टल चुनें",
  "roleSelector.subtitle": "जारी रखने के लिए अपनी भूमिका चुनें",
  "roleSelector.senior": "वरिष्ठ नागरिक",
  "roleSelector.senior.desc": "व्यक्तिगत डैशबोर्ड तक पहुंच",
  "roleSelector.family": "परिवार सदस्य",
  "roleSelector.family.desc": "प्रियजनों की निगरानी करें",
  "roleSelector.officer": "साइबर क्राइम अधिकारी",
  "roleSelector.officer.desc": "जांच कंसोल",
  "roleSelector.admin": "प्रशासक",
  "roleSelector.admin.desc": "प्लेटफॉर्म प्रबंधन",
  "roleSelector.enter": "पोर्टल में प्रवेश करें",

  // Not Found
  "notFound.title": "404",
  "notFound.message": "उफ़! पेज नहीं मिला",
  "notFound.return": "होम पर वापस जाएं",

  // Portal Nav - Senior
  "portal.senior.dashboard": "डैशबोर्ड",
  "portal.senior.emergency": "आपातकाल",
  "portal.senior.fraudCentre": "धोखाधड़ी केंद्र",
  "portal.senior.healthWelfare": "स्वास्थ्य और कल्याण",
  "portal.senior.communityAlerts": "सामुदायिक सतर्कता",
  "portal.senior.settings": "सेटिंग्स",

  // Portal Nav - Family
  "portal.family.dashboard": "डैशबोर्ड",
  "portal.family.alerts": "सतर्कताएं",
  "portal.family.seniors": "वरिष्ठजन",
  "portal.family.settings": "सेटिंग्स",
  "portal.family.subtitle": "परिवार पोर्टल",

  // Portal Nav - Officer
  "portal.officer.dashboard": "डैशबोर्ड",
  "portal.officer.complaints": "शिकायतें",
  "portal.officer.cases": "मामले",
  "portal.officer.evidence": "साक्ष्य",
  "portal.officer.emergencyMonitor": "आपातकाल निगरानी",
  "portal.officer.analytics": "विश्लेषण",
  "portal.officer.subtitle": "अधिकारी कंसोल",

  // Portal Nav - Admin
  "portal.admin.dashboard": "डैशबोर्ड",
  "portal.admin.users": "उपयोगकर्ता",
  "portal.admin.analytics": "विश्लेषण",
  "portal.admin.settings": "सेटिंग्स",

  // Family Dashboard
  "family.dashboard.title": "परिवार डैशबोर्ड",
  "family.dashboard.subtitle": "एक जगह अपने प्रियजन की सुरक्षा, स्वास्थ्य और आपात स्थिति की निगरानी करें।",
  "family.dashboard.seniorStatus": "वरिष्ठ स्थिति",
  "family.dashboard.safe": "सुरक्षित",
  "family.dashboard.lastCheckin": "अंतिम चेक-इन",
  "family.dashboard.activeAlerts": "सक्रिय सतर्कताएं",
  "family.dashboard.currentLocation": "वर्तमान स्थान",
  "family.dashboard.name": "नाम",
  "family.dashboard.health": "स्वास्थ्य",
  "family.dashboard.good": "अच्छा",
  "family.dashboard.lastLocation": "अंतिम स्थान",
  "family.dashboard.lastActivity": "अंतिम गतिविधि",
  "family.dashboard.emergencyAlerts": "आपातकालीन सतर्कताएं",
  "family.dashboard.activeSOS": "सक्रिय SOS",
  "family.dashboard.noEmergency": "कोई सक्रिय आपात स्थिति नहीं।",
  "family.dashboard.cyberAlert": "साइबर सतर्कता",
  "family.dashboard.linksReported": "1 संदिग्ध लिंक रिपोर्ट किया गया।",
  "family.dashboard.attention": "ध्यान दें",
  "family.dashboard.healthOverview": "स्वास्थ्य अवलोकन",
  "family.dashboard.medication": "दवा",
  "family.dashboard.completed": "पूर्ण",
  "family.dashboard.dailyCheckin": "दैनिक चेक-इन",
  "family.dashboard.wellness": "कल्याण",
  "family.dashboard.stable": "स्थिर",
  "family.dashboard.wearable": "पहनने योग्य",
  "family.dashboard.connected": "कनेक्टेड",
  "family.dashboard.emergencyContacts": "आपातकालीन संपर्क",
  "family.dashboard.callSenior": "📞 वरिष्ठ को कॉल करें",
  "family.dashboard.callHelpline": "🚓 साइबर हेल्पलाइन (1930) पर कॉल करें",
  "family.dashboard.callEmergency": "🚑 आपातकाल (112)",
  "family.dashboard.recentActivity": "हाल की गतिविधि",

  // Senior Dashboard
  "senior.dashboard.title": "आपका डैशबोर्ड",
  "senior.dashboard.greeting": "सुप्रभात",
  "senior.dashboard.overallSafety": "समग्र सुरक्षा",
  "senior.dashboard.safe": "सुरक्षित",
  "senior.dashboard.cyberRisk": "साइबर जोखिम स्कोर",
  "senior.dashboard.lowRisk": "कम जोखिम",
  "senior.dashboard.healthStatus": "स्वास्थ्य स्थिति",
  "senior.dashboard.activeCases": "सक्रिय मामले",
  "senior.dashboard.underInvestigation": "जांचाधीन",
  "senior.dashboard.emergencyContacts": "आपातकालीन संपर्क",
  "senior.dashboard.verifiedContacts": "सत्यापित संपर्क",
  "senior.dashboard.quickActions": "त्वरित कार्रवाइयां",
  "senior.dashboard.reportFraud": "धोखाधड़ी रिपोर्ट करें",
  "senior.dashboard.emergencySOS": "आपातकालीन SOS",
  "senior.dashboard.evidenceVault": "साक्ष्य भंडार",
  "senior.dashboard.communityAlerts": "सामुदायिक सतर्कताएं",
  "senior.dashboard.tipOfDay": "AI सुरक्षा टिप",
  "senior.dashboard.todaysActivity": "आज की गतिविधि",
  "senior.dashboard.lastSync": "अंतिम सिंक:",

  // Senior Emergency
  "senior.emergency.title": "आपातकालीन प्रतिक्रिया",
  "senior.emergency.status": "आपात स्थिति",
  "senior.emergency.safe": "सुरक्षित",
  "senior.emergency.liveLocation": "लाइव स्थान",
  "senior.emergency.lastCheckin": "अंतिम चेक-इन",
  "senior.emergency.sosButton": "एक-स्पर्श आपातकालीन SOS",
  "senior.emergency.sending": "भेज रहा है...",
  "senior.emergency.activated": "SOS सक्रिय",
  "senior.emergency.sos": "आपातकालीन SOS",
  "senior.emergency.voiceSOS": "वॉइस आपातकाल",
  "senior.emergency.activateVoice": "वॉइस SOS सक्रिय करें",
  "senior.emergency.contacts": "आपातकालीन संपर्क",
  "senior.emergency.medicalStatus": "चिकित्सा स्थिति",
  "senior.emergency.bloodPressure": "रक्तचाप",
  "senior.emergency.normal": "सामान्य",
  "senior.emergency.responseStatus": "प्रतिक्रिया स्थिति",
  "senior.emergency.systemReady": "सिस्टम तैयार",
  "senior.emergency.recentActivity": "हालिया आपात गतिविधि",

  // Senior Emergency Contacts
  "senior.contacts.title": "आपातकालीन संपर्क",
  "senior.contacts.subtitle": "विश्वसनीय परिवार सदस्यों का प्रबंधन करें...",
  "senior.contacts.add": "संपर्क जोड़ें",
  "senior.contacts.registered": "पंजीकृत संपर्क",
  "senior.contacts.family": "परिवार सदस्य",
  "senior.contacts.medical": "चिकित्सा संपर्क",
  "senior.contacts.primary": "प्राथमिक",
  "senior.contacts.secondary": "द्वितीयक",
  "senior.contacts.call": "कॉल",
  "senior.contacts.edit": "संपादित करें",
  "senior.contacts.remove": "हटाएं",
  "senior.contacts.guidelines": "आपातकालीन संपर्क दिशानिर्देश",

  // Senior Fraud Centre
  "senior.fraud.title": "धोखाधड़ी केंद्र",
  "senior.fraud.subtitle": "साइबर धोखाधड़ी रिपोर्ट करें, शिकायत प्रगति देखें...",
  "senior.fraud.totalComplaints": "कुल शिकायतें",
  "senior.fraud.activeCases": "सक्रिय मामले",
  "senior.fraud.evidenceFiles": "साक्ष्य फ़ाइलें",
  "senior.fraud.resolved": "हल किया गया",
  "senior.fraud.reportFraud": "धोखाधड़ी रिपोर्ट करें",
  "senior.fraud.myComplaints": "मेरी शिकायतें",
  "senior.fraud.evidenceVault": "साक्ष्य भंडार",
  "senior.fraud.workflow": "साइबर अपराध रिपोर्टिंग कार्यप्रवाह",

  // Senior Evidence Vault
  "senior.evidence.title": "साक्ष्य भंडार",
  "senior.evidence.subtitle": "साइबर अपराध साक्ष्य का सुरक्षित प्रबंधन...",
  "senior.evidence.upload": "साक्ष्य अपलोड करें",
  "senior.evidence.totalFiles": "कुल फ़ाइलें",
  "senior.evidence.storageUsed": "उपयोग किया गया स्टोरेज",
  "senior.evidence.linkedCases": "लिंक किए गए मामले",
  "senior.evidence.search": "शिकायत ID या फ़ाइल खोजें...",
  "senior.evidence.complaintId": "शिकायत ID",
  "senior.evidence.uploadedBy": "अपलोडकर्ता",
  "senior.evidence.uploadDate": "अपलोड दिनांक",
  "senior.evidence.size": "आकार",
  "senior.evidence.view": "देखें",
  "senior.evidence.download": "डाउनलोड",
  "senior.evidence.delete": "हटाएं",
  "senior.evidence.none": "कोई साक्ष्य नहीं मिला",

  // Senior Health
  "senior.health.title": "स्वास्थ्य और कल्याण",
  "senior.health.overall": "समग्र स्वास्थ्य",
  "senior.health.good": "अच्छा",
  "senior.health.dailyCheckin": "दैनिक चेक-इन",
  "senior.health.completed": "पूर्ण",
  "senior.health.wearable": "पहनने योग्य उपकरण",
  "senior.health.connected": "कनेक्टेड",
  "senior.health.emergencyProfile": "आपातकालीन प्रोफ़ाइल",
  "senior.health.updated": "अपडेटेड",
  "senior.health.vitals": "महत्वपूर्ण आंकड़े",
  "senior.health.bloodPressure": "रक्तचाप",
  "senior.health.reminders": "आज के स्वास्थ्य रिमाइंडर",
  "senior.health.medicalProfile": "आपातकालीन चिकित्सा प्रोफ़ाइल",
  "senior.health.recommendations": "स्वास्थ्य अनुशंसाएं",
  "senior.health.updateProfile": "स्वास्थ्य प्रोफ़ाइल अपडेट करें",

  // Senior Report Fraud
  "senior.report.title": "साइबर धोखाधड़ी रिपोर्ट करें",
  "senior.report.category": "घोटाला श्रेणी",
  "senior.report.phishing": "फ़िशिंग",
  "senior.report.upiFraud": "UPI धोखाधड़ी",
  "senior.report.titleField": "शिकायत शीर्षक",
  "senior.report.details": "घटना विवरण",
  "senior.report.evidence": "साक्ष्य",
  "senior.report.uploadEvidence": "सहायक साक्ष्य अपलोड करें",
  "senior.report.victimDetails": "पीड़ित विवरण",
  "senior.report.fullName": "पूरा नाम",
  "senior.report.mobile": "मोबाइल नंबर",
  "senior.report.email": "ईमेल पता",
  "senior.report.priority": "शिकायत प्राथमिकता",
  "senior.report.low": "कम",
  "senior.report.medium": "मध्यम",
  "senior.report.high": "उच्च",
  "senior.report.emergency": "आपातकाल",
  "senior.report.beforeSubmit": "जमा करने से पहले",
  "senior.report.submit": "शिकायत दर्ज करें",
  "senior.report.submitted": "शिकायत दर्ज की गई",
  "senior.report.submitAnother": "दूसरी शिकायत दर्ज करें",

  // Senior Cases
  "senior.cases.title": "मामला प्रबंधन",
  "senior.cases.subtitle": "जांच की निगरानी करें...",
  "senior.cases.total": "कुल मामले",
  "senior.cases.active": "सक्रिय",
  "senior.cases.investigating": "जांचाधीन",
  "senior.cases.closed": "बंद",
  "senior.cases.search": "केस ID खोजें...",
  "senior.cases.all": "सभी",
  "senior.cases.pending": "लंबित",
  "senior.cases.resolved": "हल किया गया",
  "senior.cases.citizen": "नागरिक",
  "senior.cases.date": "तारीख",
  "senior.cases.amount": "राशि",
  "senior.cases.priority": "प्राथमिकता",
  "senior.cases.openCase": "मामला खोलें",
  "senior.cases.timeline": "जांच समयरेखा",
  "senior.cases.viewEvidence": "साक्ष्य देखें",
  "senior.cases.none": "कोई मामला नहीं मिला",

  // Senior Community Alerts
  "senior.community.title": "सामुदायिक सतर्कताएं",
  "senior.community.subtitle": "साइबर धोखाधड़ी रुझानों से अपडेट रहें...",
  "senior.community.subscribe": "सतर्कता सब्सक्राइब करें",
  "senior.community.activeAlerts": "सक्रिय सतर्कताएं",
  "senior.community.highRisk": "उच्च जोखिम",
  "senior.community.nearby": "आस-पास की सतर्कताएं",
  "senior.community.thisWeek": "इस सप्ताह",
  "senior.community.search": "सतर्कता खोजें...",
  "senior.community.all": "सभी",
  "senior.community.medium": "मध्यम",
  "senior.community.critical": "गंभीर",
  "senior.community.viewDetails": "विवरण देखें",
  "senior.community.markRead": "पढ़ा हुआ मार्क करें",
  "senior.community.staySafe": "सुरक्षित रहें",

  // Senior Settings
  "senior.settings.title": "सेटिंग्स",
  "senior.settings.subtitle": "अपना खाता, पहुंच-योग्यता प्रबंधित करें...",
  "senior.settings.general": "सामान्य",
  "senior.settings.language": "पसंदीदा भाषा",
  "senior.settings.theme": "थीम",
  "senior.settings.light": "लाइट",
  "senior.settings.dark": "डार्क",
  "senior.settings.system": "सिस्टम",
  "senior.settings.emergencyPrefs": "आपातकालीन प्राथमिकताएं",
  "senior.settings.accessibility": "पहुंच-योग्यता",
  "senior.settings.largeText": "बड़ा टेक्स्ट मोड",
  "senior.settings.privacy": "गोपनीयता और सुरक्षा",
  "senior.settings.accountInfo": "खाता जानकारी",
  "senior.settings.fullName": "पूरा नाम",
  "senior.settings.saveChanges": "परिवर्तन सहेजें",
  "senior.settings.resetPrefs": "प्राथमिकताएं रीसेट करें",
  "senior.settings.govtNotice": "सरकारी सुरक्षा नोटिस",
  "settings.emergencyNotifications": "आपातकालीन सूचनाएं",
  "settings.receiveEmergencyAlerts": "आपातकालीन अलर्ट प्राप्त करें।",
  "settings.liveLocationSharing": "लाइव स्थान साझाकरण",
  "settings.shareGpsEmergencies": "आपात स्थिति के दौरान जीपीएस साझा करें।",
  "settings.voiceSos": "वॉयस एसओएस",
  "settings.enableVoiceActivation": "वॉयस एक्टिवेशन सक्षम करें।",
  "settings.highContrast": "उच्च कंट्रास्ट मोड",
  "settings.voiceGuidance": "वॉयस मार्गदर्शन",
  "settings.readNotificationsAloud": "सूचनाएं जोर से पढ़ें",
  "settings.shareAnonymousStats": "अनाम धोखाधड़ी आंकड़े साझा करें",
  "settings.allowEmergencyGps": "आपातकालीन जीपीएस एक्सेस की अनुमति दें",
  "settings.enableAiScam": "एआई स्कैम डिटेक्शन सक्षम करें",
  "settings.twoFactorAuth": "द्वि-कारक प्रमाणीकरण",
  "settings.registeredMobile": "पंजीकृत मोबाइल",
  "settings.email": "ईमेल",
  "settings.aadhaarVerification": "आधार सत्यापन",
  "settings.verified": "सत्यापित",
  "settings.changesSaved": "परिवर्तन सफलतापूर्वक सहेजे गए!",

  // Family Alerts
  "family.alerts.title": "सतर्कताएं",
  "family.alerts.subtitle": "सतर्कताओं की निगरानी और वर्गीकरण करें...",
  "family.alerts.none": "कोई सतर्कता नहीं मिली।",
  "family.alerts.status": "स्थिति:",
  "family.alerts.location": "स्थान:",
  "family.alerts.time": "समय:",
  "family.alerts.classification": "वर्गीकरण:",
  "family.alerts.reclassify": "पुनर्वर्गीकृत करें",
  "family.alerts.classify": "वर्गीकृत करें",
  "family.alerts.selectScam": "घोटाला प्रकार चुनें:",
  "family.alerts.phishing": "फ़िशिंग",
  "family.alerts.vishing": "विशिंग",

  // Family Seniors
  "family.seniors.title": "लिंक किए गए वरिष्ठजन",
  "family.seniors.subtitle": "वरिष्ठ नागरिकों को देखें और प्रबंधित करें...",
  "family.seniors.safe": "सुरक्षित",
  "family.seniors.attention": "ध्यान दें",
  "family.seniors.age": "आयु",
  "family.seniors.health": "स्वास्थ्य",
  "family.seniors.location": "स्थान",
  "family.seniors.lastCheckin": "अंतिम चेक-इन",

  // Family Settings
  "family.settings.title": "सेटिंग्स",
  "family.settings.subtitle": "अपनी परिवार पोर्टल प्राथमिकताएं प्रबंधित करें।",
  "family.settings.notifications": "सूचनाएं",
  "family.settings.smsAlerts": "SMS सतर्कताएं",
  "family.settings.emailAlerts": "ईमेल सतर्कताएं",
  "family.settings.pushNotifications": "पुश सूचनाएं",
  "family.settings.emergencyContact": "आपातकालीन संपर्क",
  "family.settings.emergencyInfo": "अपनी आपातकालीन संपर्क जानकारी अपडेट करें।",
  "family.settings.name": "नाम",
  "family.settings.phone": "फ़ोन",
  "family.settings.saveChanges": "परिवर्तन सहेजें",
  "family.settings.account": "खाता",
  "family.settings.manageSeniors": "लिंक किए गए वरिष्ठजन प्रबंधित करें",

  // Officer Dashboard
  "officer.dashboard.title": "साइबर क्राइम अधिकारी डैशबोर्ड",
  "officer.dashboard.activeComplaints": "सक्रिय शिकायतें",
  "officer.dashboard.activeEmergencies": "सक्रिय आपात स्थितियां",
  "officer.dashboard.officersOnline": "ऑनलाइन अधिकारी",
  "officer.dashboard.resolvedToday": "आज हल किए गए मामले",
  "officer.dashboard.recentComplaints": "हाल की शिकायतें",
  "officer.dashboard.viewAll": "सभी देखें",
  "officer.dashboard.liveMonitor": "लाइव आपात निगरानी",
  "officer.dashboard.quickActions": "त्वरित कार्रवाइयां",
  "officer.dashboard.reviewComplaints": "शिकायतों की समीक्षा करें",
  "officer.dashboard.openCases": "खुले मामले",
  "officer.dashboard.evidenceVault": "साक्ष्य भंडार",
  "officer.dashboard.emergencyMonitor": "आपात निगरानी",

  // Officer Complaints
  "officer.complaints.title": "शिकायत प्रबंधन",
  "officer.complaints.subtitle": "समीक्षा, असाइन और जांच करें...",
  "officer.complaints.export": "शिकायतें निर्यात करें",
  "officer.complaints.total": "कुल शिकायतें",
  "officer.complaints.pending": "लंबित",
  "officer.complaints.investigating": "जांचाधीन",
  "officer.complaints.resolved": "हल किया गया",
  "officer.complaints.search": "शिकायत ID खोजें...",
  "officer.complaints.citizen": "नागरिक",
  "officer.complaints.date": "तारीख",
  "officer.complaints.location": "स्थान",
  "officer.complaints.reportedLoss": "रिपोर्ट की गई हानि",
  "officer.complaints.status": "वर्तमान स्थिति",
  "officer.complaints.view": "शिकायत देखें",
  "officer.complaints.assign": "अधिकारी असाइन करें",
  "officer.complaints.openCase": "मामला खोलें",
  "officer.complaints.viewEvidence": "साक्ष्य देखें",
  "officer.complaints.workflow": "जांच कार्यप्रवाह",

  // Officer Cases
  "officer.cases.title": "मामला प्रबंधन",
  "officer.cases.subtitle": "जांच की निगरानी करें...",
  "officer.cases.create": "नया मामला बनाएं",
  "officer.cases.total": "कुल मामले",
  "officer.cases.active": "सक्रिय",
  "officer.cases.evidenceReview": "साक्ष्य समीक्षा",
  "officer.cases.closed": "बंद",
  "officer.cases.search": "केस ID खोजें...",
  "officer.cases.complaintId": "शिकायत ID",
  "officer.cases.citizen": "नागरिक",
  "officer.cases.assignedOfficer": "असाइन किए गए अधिकारी",
  "officer.cases.status": "स्थिति",
  "officer.cases.lastUpdated": "अंतिम अपडेट",
  "officer.cases.openCase": "मामला खोलें",
  "officer.cases.pipeline": "जांच पाइपलाइन",
  "officer.cases.created": "मामला बनाया गया",

  // Officer Evidence
  "officer.evidence.title": "डिजिटल साक्ष्य भंडार",
  "officer.evidence.subtitle": "सुरक्षित समीक्षा, सत्यापन...",
  "officer.evidence.export": "साक्ष्य निर्यात करें",
  "officer.evidence.totalFiles": "कुल फ़ाइलें",
  "officer.evidence.verified": "सत्यापित",
  "officer.evidence.pendingReview": "समीक्षा लंबित",
  "officer.evidence.storageUsed": "उपयोग किया गया स्टोरेज",
  "officer.evidence.search": "साक्ष्य ID खोजें...",
  "officer.evidence.complaintId": "शिकायत ID",
  "officer.evidence.citizen": "नागरिक",
  "officer.evidence.type": "साक्ष्य प्रकार",
  "officer.evidence.uploadDate": "अपलोड दिनांक",
  "officer.evidence.fileSize": "फ़ाइल आकार",
  "officer.evidence.view": "साक्ष्य देखें",
  "officer.evidence.download": "डाउनलोड",
  "officer.evidence.verify": "साक्ष्य सत्यापित करें",
  "officer.evidence.linkToCase": "मामले से लिंक करें",
  "officer.evidence.workflow": "साक्ष्य प्रबंधन कार्यप्रवाह",

  // Officer Emergency Monitor
  "officer.emergency.title": "आपात निगरानी",
  "officer.emergency.subtitle": "SOS अनुरोधों की लाइव निगरानी...",
  "officer.emergency.liveDashboard": "लाइव डैशबोर्ड",
  "officer.emergency.active": "सक्रिय आपात स्थितियां",
  "officer.emergency.deployed": "तैनात अधिकारी",
  "officer.emergency.avgResponse": "औसत प्रतिक्रिया",
  "officer.emergency.resolvedToday": "आज हल किया गया",
  "officer.emergency.search": "SOS ID खोजें...",
  "officer.emergency.citizen": "नागरिक",
  "officer.emergency.type": "आपात प्रकार",
  "officer.emergency.location": "स्थान",
  "officer.emergency.status": "वर्तमान स्थिति",
  "officer.emergency.triggered": "ट्रिगर किया गया",
  "officer.emergency.liveTracking": "लाइव ट्रैकिंग खोलें",
  "officer.emergency.contactCitizen": "नागरिक से संपर्क करें",
  "officer.emergency.notifyFamily": "परिवार को सूचित करें",
  "officer.emergency.markResolved": "हल किया गया मार्क करें",
  "officer.emergency.workflow": "आपात प्रतिक्रिया कार्यप्रवाह",

  // Officer Analytics
  "officer.analytics.title": "विश्लेषण डैशबोर्ड",
  "officer.analytics.subtitle": "साइबर अपराध रुझान...",
  "officer.analytics.export": "रिपोर्ट निर्यात करें",
  "officer.analytics.complaintsMonth": "इस माह शिकायतें",
  "officer.analytics.fraudPrevented": "रोकी गई धोखाधड़ी",
  "officer.analytics.avgResponseTime": "औसत प्रतिक्रिया समय",
  "officer.analytics.resolutionRate": "समाधान दर",
  "officer.analytics.trends": "धोखाधड़ी रुझान विश्लेषण",
  "officer.analytics.upiFraud": "UPI धोखाधड़ी",
  "officer.analytics.investmentScam": "निवेश घोटाला",
  "officer.analytics.insights": "परिचालन अंतर्दृष्टि",
  "officer.analytics.highestRisk": "उच्चतम जोखिम क्षेत्र",
  "officer.analytics.aiThreat": "AI खतरा खुफिया",
  "officer.analytics.emergingScam": "उभरता घोटाला",

  // Admin Dashboard
  "admin.dashboard.title": "प्रशासन डैशबोर्ड",
  "admin.dashboard.subtitle": "प्लेटफॉर्म अवलोकन, सिस्टम स्वास्थ्य...",
  "admin.dashboard.generateReport": "रिपोर्ट जनरेट करें",
  "admin.dashboard.registeredSeniors": "पंजीकृत वरिष्ठजन",
  "admin.dashboard.cyberOfficers": "साइबर अधिकारी",
  "admin.dashboard.activeCases": "सक्रिय मामले",
  "admin.dashboard.platformUptime": "प्लेटफॉर्म अपटाइम",
  "admin.dashboard.systemHealth": "सिस्टम स्वास्थ्य",
  "admin.dashboard.apiServer": "API सर्वर",
  "admin.dashboard.operational": "परिचालन",
  "admin.dashboard.recentActivity": "हालिया प्लेटफॉर्म गतिविधि",
  "admin.dashboard.adminActions": "प्रशासनिक कार्रवाइयां",
  "admin.dashboard.manageUsers": "उपयोगकर्ता प्रबंधित करें",
  "admin.dashboard.viewAnalytics": "विश्लेषण देखें",
  "admin.dashboard.platformSettings": "प्लेटफॉर्म सेटिंग्स",
  "admin.dashboard.systemLogs": "सिस्टम लॉग्स",

  // Admin Analytics
  "admin.analytics.title": "प्लेटफॉर्म विश्लेषण",
  "admin.analytics.subtitle": "प्लेटफॉर्म प्रदर्शन की निगरानी करें...",
  "admin.analytics.export": "विश्लेषण निर्यात करें",
  "admin.analytics.totalComplaints": "कुल शिकायतें",
  "admin.analytics.activeSeniors": "सक्रिय वरिष्ठजन",
  "admin.analytics.emergencyResponses": "आपात प्रतिक्रियाएं",
  "admin.analytics.resolutionRate": "समाधान दर",
  "admin.analytics.fraudDistribution": "धोखाधड़ी वितरण",
  "admin.analytics.upiFraud": "UPI धोखाधड़ी",
  "admin.analytics.performance": "प्लेटफॉर्म प्रदर्शन",
  "admin.analytics.aiInsights": "AI अंतर्दृष्टि",
  "admin.analytics.highestRiskZone": "उच्चतम जोखिम क्षेत्र",
  "admin.analytics.emergingScam": "उभरता घोटाला",
  "admin.analytics.recommendation": "सिफारिश",

  // Admin Settings
  "admin.settings.title": "प्लेटफॉर्म सेटिंग्स",
  "admin.settings.subtitle": "प्लेटफॉर्म-व्यापी प्राथमिकताएं कॉन्फ़िगर करें...",
  "admin.settings.general": "सामान्य",
  "admin.settings.maintenance": "रखरखाव मोड",
  "admin.settings.allowRegistration": "नए पंजीकरण की अनुमति दें",
  "admin.settings.enableAI": "AI धोखाधड़ी का पता लगाना सक्षम करें",
  "admin.settings.security": "सुरक्षा",
  "admin.settings.twoFactor": "दो-कारक प्रमाणीकरण आवश्यक करें",
  "admin.settings.auditLogs": "ऑडिट लॉग सक्षम करें",
  "admin.settings.notifications": "सूचनाएं",
  "admin.settings.emailAlerts": "ईमेल सतर्कताएं",
  "admin.settings.saveChanges": "परिवर्तन सहेजें",
  "admin.settings.reset": "रीसेट",

  // Admin Users
  "admin.users.title": "उपयोगकर्ता प्रबंधन",
  "admin.users.subtitle": "वरिष्ठ नागरिकों, अधिकारियों का प्रबंधन...",
  "admin.users.addUser": "उपयोगकर्ता जोड़ें",
  "admin.users.total": "कुल उपयोगकर्ता",
  "admin.users.seniors": "वरिष्ठजन",
  "admin.users.officers": "अधिकारी",
  "admin.users.admins": "प्रशासक",
  "admin.users.search": "उपयोगकर्ता ID खोजें...",
  "admin.users.userId": "उपयोगकर्ता ID",
  "admin.users.role": "भूमिका",
  "admin.users.city": "शहर",
  "admin.users.joined": "जुड़े",
  "admin.users.viewProfile": "प्रोफ़ाइल देखें",
  "admin.users.editUser": "उपयोगकर्ता संपादित करें",
  "admin.users.resetPassword": "पासवर्ड रीसेट करें",
  "admin.users.disableAccount": "खाता निष्क्रिय करें",
  "admin.users.stats": "उपयोगकर्ता आंकड़े",
  "admin.users.newToday": "आज नए",
  "admin.users.activeToday": "आज सक्रिय",
  "admin.users.suspended": "निलंबित",
  "admin.users.verified": "सत्यापित",

  // Home - Hero
  "home.hero.branch": "अहमदाबाद साइबर क्राइम ब्रांच • गुजरात सरकार",
  "home.hero.title": "अन्वेषण",
  "home.hero.subtitle": "वरिष्ठ नागरिकों के लिए साइबर-जागरूक सुरक्षा एवं कल्याण मंच",
  "home.hero.desc": "एआई-सहायता प्राप्त रोकथाम, त्वरित आपातकालीन प्रतिक्रिया, कल्याण निगरानी और निर्बाध पुलिस एकीकरण के माध्यम से वरिष्ठ नागरिकों को साइबर धोखाधड़ी, चिकित्सा आपात स्थिति, वित्तीय घोटालों और डिजिटल खतरों से बचाना।",
  "home.hero.stat.seniors": "पंजीकृत वरिष्ठजन",
  "home.hero.stat.reports": "धोखाधड़ी रिपोर्ट",
  "home.hero.stat.responses": "आपातकालीन प्रतिक्रियाएं",
  "home.hero.stat.avgTime": "औसत प्रतिक्रिया समय",
  "home.problem.desc": "मौजूदा प्लेटफॉर्म या तो साइबर जागरूकता, आपातकालीन प्रतिक्रिया या कल्याण निगरानी पर ध्यान केंद्रित करते हैं। अन्वेषण (ANWESHAN) वरिष्ठ नागरिकों और साइबर अपराध शाखा के लिए विशेष रूप से डिज़ाइन किए गए एक एकीकृत पारिस्थितिकी तंत्र में तीनों को जोड़ता है।",
  "home.problem.desc.cyber": "वरिष्ठ नागरिकों को तेजी से फ़िशिंग, ओटीपी घोटाले, नकली निवेश योजनाओं, पेंशन धोखाधड़ी, डिजिटल गिरफ्तारी घोटालों और पहचान की चोरी के माध्यम से निशाना बनाया जाता है। ये हमले अक्सर डर, विश्वास और सीमित डिजिटल साक्षरता का फायदा उठाते हैं।",
  "home.problem.desc.medical": "कई बुजुर्ग नागरिक अकेले रहते हैं और उन्हें चिकित्सा स्थितियों के दौरान निरंतर कल्याण निगरानी, दवा अनुस्मारक, निष्क्रियता का पता लगाने और त्वरित आपातकालीन सहायता की आवश्यकता होती है।",
  "home.problem.desc.response": "वर्तमान प्रणालियाँ खंडित हैं। साइबर अपराध की रिपोर्ट करना, परिवार के सदस्यों से संपर्क करना और आपातकालीन प्रतिक्रियाकर्ताओं तक पहुँचना अक्सर कई स्वतंत्र सेवाओं की आवश्यकता होती है।",
  "home.problem.desc.police": "साइबर अपराध शाखा को एक ऐसे एकीकृत मंच की आवश्यकता है जो साक्ष्य प्राप्त करने, मामलों को ट्रैक करने, अलर्ट उत्पन्न करने और संरचित डिजिटल वर्कफ़्लो के माध्यम से जांच में सहायता करने में सक्षम हो।",
  "home.problem.stat.losses": "साइबर धोखाधड़ी नुकसान (भारत 2024)",
  "home.problem.stat.complaints": "पंजीकृत शिकायतें",
  "home.problem.stat.categories": "घोटाला श्रेणियाँ कवर्ड",
  "home.problem.stat.ready": "आपातकालीन प्रतिक्रिया तैयार",
  "home.features.desc": "अंवेषण (ANWESHAN) साइबर जागरूकता, आपातकालीन प्रतिक्रिया, कल्याण निगरानी और पुलिस सहयोग को एक ही एकीकृत मंच में जोड़ता है।",
  "home.features.desc.emergency": "जीपीएस स्थान, वॉयस एक्टिवेशन और परिवार के सदस्यों और साइबर अपराध अधिकारियों को तत्काल अलर्ट के साथ वन-टच आपातकालीन ट्रिगर।",
  "home.features.desc.cyber": "इंटरैक्ट करने से पहले एआई-सहायता प्राप्त धोखाधड़ी का पता लगाने का उपयोग करके संदिग्ध लिंक, एसएमएस, व्हाट्सएप संदेशों और ईमेल का विश्लेषण करें।",
  "home.features.desc.risk": "व्यक्तिगत जोखिम स्कोर उत्पन्न करने के लिए व्यवहारिक संवेदनशीलता, धोखाधड़ी जोखिम और डिजिटल सुरक्षा का लगातार मूल्यांकन करता।",
  "home.features.desc.evidence": "जांच सहायता के लिए टाइमस्टैम्प के साथ स्क्रीनशॉट, घोटाला संदेश, कॉल रिकॉर्डिंग और यूआरएल सुरक्षित रूप से अपलोड करें।",
  "home.features.desc.family": "कल्याणकारी अपडेट और वास्तविक समय की घटना की स्थिति प्रदान करते हुए आपातकालीन स्थितियों के दौरान देखभाल करने वालों को सूचित करें।",
  "home.features.desc.welfare": "दैनिक चेक-इन, दवा अनुस्मारक, निष्क्रियता अलर्ट और विशेष रूप से वरिष्ठ नागरिकों के लिए डिज़ाइन की गई स्वास्थ्य निगरानी।",
  "home.features.desc.police": "साइबर अपराध अधिकारियों के लिए केस ट्रैकिंग, धोखाधड़ी हीटमैप, आपातकालीन निगरानी और डिजिटल साक्ष्य प्रबंधन।",
  "home.features.desc.multilingual": "बड़ी टाइपोग्राफी और वरिष्ठ-अनुकूल नेविगेशन के साथ अंग्रेजी, हिंदी और गुजराती का समर्थन करने वाला सुलभ इंटरफ़ेस।",
  "home.how.desc": "प्रत्येक इंटरैक्शन एक संरचित वर्कफ़्लो का अनुसरण करता है जो एआई-सहायता प्राप्त साइबर सुरक्षा, आपातकालीन प्रतिक्रिया और साइबर अपराध अधिकारियों के साथ सहयोग को जोड़ता है।",
  "home.how.desc.step1": "वरिष्ठ नागरिक धोखाधड़ी की रिपोर्ट करने, कल्याण जांच करने, संदिग्ध सामग्री का विश्लेषण करने या आपातकालीन सहायता ट्रिगर करने के लिए एक सरल बहुभाषी इंटरफ़ेस के माध्यम से अन्वेषण तक पहुँचते हैं।",
  "home.how.desc.step2": "फ़िशिंग प्रयासों, घोटाले के संकेतकों और संभावित साइबर खतरों की पहचान करने के लिए संदेशों, यूआरएल, स्क्रीनशॉट और रिपोर्ट की गई घटनाओं का विश्लेषण किया जाता है।",
  "home.how.desc.step3": "मंच उचित प्रतिक्रिया निर्धारित करने के लिए धोखाधड़ी की गंभीरता, व्यवहारिक जोखिम, आपातकालीन स्तर और प्रासंगिक जानकारी का मूल्यांकन करता है।",
  "home.how.desc.step4": "प्रासंगिक अलर्ट तुरंत परिवार के सदस्यों, देखभाल करने वालों और साइबर अपराध अधिकारियों के साथ साझा किए जाते हैं जबकि जांच के लिए साक्ष्य सुरक्षित रूप से संरक्षित किए जाते हैं।",
  "home.how.desc.step5": "सामुदायिक खुफिया जानकारी, कल्याण निगरानी, घोटाला जागरूकता और धोखाधड़ी विश्लेषण लगातार नागरिक सुरक्षा और कानून-प्रवर्तन प्रतिक्रिया में सुधार करते हैं।",
  "home.hero.openSenior": "वरिष्ठ पोर्टल खोलें",
  "home.hero.reportFraud": "साइबर धोखाधड़ी रिपोर्ट करें",
  "home.hero.explore": "प्लेटफॉर्म का अन्वेषण करें",
  "home.hero.platformStatus": "प्लेटफॉर्म स्थिति",
  "home.hero.emergencySOS": "आपातकालीन SOS",
  "home.hero.aiDetection": "AI धोखाधड़ी का पता लगाना",
  "home.hero.familyConnectivity": "परिवार कनेक्टिविटी",
  "home.hero.policeIntegration": "पुलिस एकीकरण",
  "home.hero.healthMonitoring": "स्वास्थ्य निगरानी",
  "home.hero.evidenceVault": "साक्ष्य भंडार",

  // Home - Problem
  "home.problem.title": "समस्या विवरण",
  "home.problem.sectionTitle": "अन्वेषण की आवश्यकता क्यों है",
  "home.problem.cyberFraud": "वरिष्ठ नागरिकों के खिलाफ साइबर धोखाधड़ी",
  "home.problem.medicalEmergencies": "चिकित्सा एवं कल्याण आपात स्थितियां",
  "home.problem.delayedResponse": "विलंबित आपात प्रतिक्रिया",
  "home.problem.policeIntegration": "पुलिस एकीकरण की आवश्यकता",

  // Home - Features
  "home.features.title": "मुख्य क्षमताएं",
  "home.features.subtitle": "वरिष्ठ नागरिकों की सुरक्षा के लिए सब कुछ",
  "home.features.emergencySOS": "आपातकालीन SOS",
  "home.features.cyberProtection": "साइबर धोखाधड़ी सुरक्षा",
  "home.features.aiRisk": "AI जोखिम मूल्यांकन",
  "home.features.evidenceCollection": "साक्ष्य संग्रह",
  "home.features.familyConnectivity": "परिवार कनेक्टिविटी",
  "home.features.welfareMonitoring": "कल्याण निगरानी",
  "home.features.policeDashboard": "पुलिस डैशबोर्ड",
  "home.features.multilingual": "बहुभाषी पहुंच",

  // Home - How It Works
  "home.how.title": "कार्यप्रवाह",
  "home.how.sectionTitle": "अन्वेषण कैसे काम करता है",
  "home.how.step1": "1. नागरिक इंटरैक्शन",
  "home.how.step2": "2. AI विश्लेषण",
  "home.how.step3": "3. जोखिम मूल्यांकन",
  "home.how.step4": "4. प्रतिक्रिया और सतर्कताएं",
  "home.how.step5": "5. निरंतर सुरक्षा",

  // Home - Police Integration
  "home.police.title": "कानून प्रवर्तन एकीकरण",
  "home.police.subtitle": "अहमदाबाद साइबर क्राइम ब्रांच के लिए निर्मित",
  "home.police.realTime": "रीयल-टाइम घटना रिपोर्टिंग",
  "home.police.evidenceCollection": "डिजिटल साक्ष्य संग्रह",
  "home.police.gisIntelligence": "GIS अपराध खुफिया",
  "home.police.emergencyCoord": "आपात समन्वय",
  "home.police.caseManagement": "मामला प्रबंधन",
  "home.police.decisionSupport": "निर्णय समर्थन",
  "home.police.desc": "अन्वेषण को वरिष्ठ नागरिक सुरक्षा को संरचित साइबर अपराध जांच वर्कफ़्लो के साथ एकीकृत करने के लिए डिज़ाइन किया गया है, जिससे तेज़ प्रतिक्रिया, बेहतर साक्ष्य प्रबंधन और बेहतर स्थितिजन्य जागरूकता संभव हो सके।",
  "home.police.desc.realTime": "धोखाधड़ी रिपोर्ट, SOS अनुरोध और आपातकालीन अलर्ट टाइमस्टैम्प और प्राथमिकता स्तरों के साथ साइबर अपराध अधिकारियों को सुरक्षित रूप से भेजे जाते हैं।",
  "home.police.desc.evidence": "स्क्रीनशॉट, घोटाला संदेश, संदिग्ध लिंक, वॉयस रिकॉर्डिंग और सहायक फाइलें पूर्ण साक्ष्य मेटाडेटा के साथ सुरक्षित रूप से संग्रहीत की जाती हैं।",
  "home.police.desc.gis": "धोखाधड़ी की घटनाओं को हॉटस्पॉट, उभरते घोटाले अभियानों और क्षेत्रीय खतरे के रुझानों की पहचान करने के लिए इंटरैक्टिव मानचित्रों पर विज़ुअलाइज़ किया जाता है।",
  "home.police.desc.emergency": "महत्वपूर्ण स्थितियों के दौरान साइबर अपराध शाखा, आपातकालीन उत्तरदाताओं और परिवार के सदस्यों के बीच तेज़ समन्वय का समर्थन करता है।",
  "home.police.desc.case": "प्रत्येक रिपोर्ट की गई घटना को जांच स्थिति, अधिकारी असाइनमेंट और साक्ष्य टाइमलाइन के साथ एक अद्वितीय केस आईडी प्राप्त होती है।",
  "home.police.desc.decision": "एआई-सहायता प्राप्त विश्लेषण अधिकारियों को मामलों को प्राथमिकता देने, बार-बार होने वाले धोखाधड़ी पैटर्न की पहचान करने और परिचालन प्रतिक्रिया में सुधार करने में मदद करता है।",

  // Home - Emergency Section
  "home.emergency.title": "आपातकालीन प्रतिक्रिया",
  "home.emergency.subtitle": "जब हर सेकंड मायने रखता है तब त्वरित सहायता",
  "home.emergency.oneTouchSOS": "एक-स्पर्श SOS",
  "home.emergency.voiceSOS": "वॉइस-सक्रिय SOS",
  "home.emergency.liveLocation": "लाइव स्थान साझाकरण",
  "home.emergency.medicalSupport": "चिकित्सा आपात सहायता",
  "home.emergency.familyNotifications": "परिवार सूचनाएं",
  "home.emergency.offlineBackup": "ऑफ़लाइन अलर्ट बैकअप",
  "home.emergency.desc": "अन्वेषण साइबर आपातकालीन प्रतिक्रिया, चिकित्सा सहायता, पारिवारिक संचार और कानून प्रवर्तन समन्वय को वरिष्ठ नागरिकों के लिए डिज़ाइन की गई एकल आपातकालीन प्रबंधन प्रणाली में जोड़ता है।",
  "home.emergency.desc.oneTouch": "एक बड़ा, वरिष्ठ-अनुकूल आपातकालीन बटन तुरंत एक SOS अनुरोध शुरू करता है और उपयोगकर्ता के लाइव स्थान को आपातकालीन संपर्कों और साइबर अपराध अधिकारियों के साथ साझा करता है।",
  "home.emergency.desc.voice": "वरिष्ठ नागरिक एप्लिकेशन को नेविगेट किए बिना सरल बहुभाषी वॉयस कमांड का उपयोग करके आपातकालीन सहायता ट्रिगर कर सकते हैं।",
  "home.emergency.desc.location": "आपातकाल के दौरान, GPS निर्देशांक अधिकृत परिवार के सदस्यों और प्रतिक्रिया देने वाले अधिकारियों के साथ तब तक लगातार साझा किए जाते हैं जब तक घटना का समाधान नहीं हो जाता।",
  "home.emergency.desc.medical": "दवा अनुस्मारक, कल्याण निगरानी और आपातकालीन चिकित्सा अलर्ट स्वास्थ्य संबंधी घटनाओं के दौरान प्रतिक्रिया समय को कम करने में मदद करते हैं।",
  "home.emergency.desc.family": "परिवार के सदस्यों को केयरगिवर पोर्टल के माध्यम से आपातकालीन घटनाओं, केस अपडेट और कल्याण अलर्ट के बारे में तत्काल सूचनाएं प्राप्त होती हैं।",
  "home.emergency.desc.offline": "यदि इंटरनेट कनेक्टिविटी अनुपलब्ध है, तो प्लेटफ़ॉर्म महत्वपूर्ण स्थितियों के लिए एसएमएस-आधारित आपातकालीन सूचनाओं का समर्थन करने के लिए डिज़ाइन किया गया है।",

  // Home - Community
  "home.community.title": "सामुदायिक खुफिया",
  "home.community.subtitle": "साइबर अपराध के खिलाफ सामूहिक खुफिया",
  "home.community.crowdsourced": "क्राउडसोर्स्ड घोटाला रिपोर्टिंग",
  "home.community.heatmap": "साइबर खतरा हीटमैप",
  "home.community.realTimeAlerts": "रीयल-टाइम सामुदायिक सतर्कताएं",
  "home.community.familyNetwork": "परिवार सुरक्षा नेटवर्क",
  "home.community.aiThreat": "AI खतरा खुफिया",
  "home.community.fraudAnalytics": "धोखाधड़ी रुझान विश्लेषण",
  "home.community.desc": "प्रत्येक सत्यापित रिपोर्ट अन्वेषण के साझा साइबर इंटेलिजेंस नेटवर्क को मजबूत करती है, जिससे धोखाधड़ी और फैलने से पहले अन्य वरिष्ठ नागरिकों की रक्षा करने में मदद मिलती है।",
  "home.community.desc.crowdsourced": "नागरिक सामूहिक साइबर जागरूकता को मजबूत करने के लिए गुमनाम रूप से घोटाले की कॉल, फ़िशिंग लिंक, नकली निवेश योजनाओं और संदिग्ध संदेशों की रिपोर्ट करते हैं।",
  "home.community.desc.heatmap": "रिपोर्ट की गई घटनाओं को धोखाधड़ी हॉटस्पॉट, उभरते घोटाले अभियानों और उच्च-जोखिम वाले क्षेत्रों की पहचान करने के लिए भौगोलिक रूप से विज़ुअलाइज़ किया जाता है।",
  "home.community.desc.alerts": "जब कई नागरिक समान घोटालों की रिपोर्ट करते हैं, तो आस-पास के उपयोगकर्ताओं को शिकार बनने से पहले तत्काल चेतावनी प्राप्त होती है।",
  "home.community.desc.family": "परिवार के सदस्य साझा निगरानी के माध्यम से कल्याण अपडेट, धोखाधड़ी रिपोर्ट और आपातकालीन घटनाओं के बारे में सूचित रहते हैं।",
  "home.community.desc.ai": "एआई सामुदायिक-जनित रिपोर्टों से आवर्ती घोटाले पैटर्न, धोखाधड़ी व्यवहार और उभरते साइबर अपराध रुझानों की पहचान करता है।",
  "home.community.desc.analytics": "अधिकारियों को मौसमी धोखाधड़ी रुझानों, घोटाला श्रेणियों और प्रतिक्रिया प्रदर्शन में अंतर्दृष्टि प्राप्त होती है ताकि निवारक पुलिसिंग में सुधार हो सके।",

  // Home - Footer CTA
  "home.cta.title": "प्रौद्योगिकी के माध्यम से हर वरिष्ठ नागरिक की रक्षा",
  "home.cta.desc": "अन्वेषण साइबर धोखाधड़ी रोकथाम, आपातकालीन प्रतिक्रिया, पारिवारिक कनेक्टिविटी, कल्याण निगरानी और साइबर अपराध शाखा एकीकरण को वरिष्ठ नागरिकों की सुरक्षा के लिए डिज़ाइन किए गए एक एकीकृत मंच में जोड़ता है।",
  "home.cta.launch": "प्लेटफॉर्म लॉन्च करें",
  "home.cta.learnMore": "और जानें",
  "home.cta.branch": "अहमदाबाद साइबर क्राइम ब्रांच • गुजरात सरकार",

  // Extra Footer strings
  "footer.credit": "निर्मित: React, Tailwind CSS, Claude API, ओपन-सोर्स ML मॉडल के साथ",
  "footer.cost": "लागत: MVP के लिए ₹0, लाखों तक स्केल",
},


gu: {
  // Navbar
  "nav.home": "હોમ",
  "nav.learn": "શીખો",
  "nav.simulate": "સિમ્યુલેશન",
  "nav.results": "પરિણામો",
  "nav.linkChecker": "લિંક ચેકર",
  "nav.contact": "સંપર્ક",
  "nav.login": "લૉગિન",
  "nav.signup": "સાઇન અપ",

  // Hero
  "hero.title": "અન્વેષણ",
  "hero.subtitle": "ડિજિટલ નાગરિકનું રક્ષણ કરો",
  "hero.tagline": "સુરક્ષા અને સશક્તિકરણ માટે AI",
  "hero.description": "દરેક ભારતીયને છેતરપિંડી ઓળખવામાં મદદ કરવા હિન્દી અને અંગ્રેજીમાં ઇન્ટરેક્ટિવ AI-સંચાલિત તાલીમ.",
  "hero.startTraining": "તાલીમ શરૂ કરો",
  "hero.runSimulation": "સિમ્યુલેશન ચલાવો",
  "hero.availability": "અંગ્રેજી અને હિન્દીમાં ઉપલબ્ધ • ડાર્ક/લાઇટ મોડ • સંપૂર્ણપણે મફત",

  // Quick Link Checker
  "linkChecker.title": "🔍 ઝડપી શંકાસ્પદ લિંક તપાસ",
  "linkChecker.subtitle": "WhatsApp, Instagram, SMS અથવા ઇમેઇલમાંથી કોઈપણ લિંક પેસ્ટ કરો. તાત્કાલિક જોખમ વિશ્લેષણ મેળવો.",
  "linkChecker.placeholder": "https://example.com/suspicious-offer...",
  "linkChecker.analyze": "લિંકનું વિશ્લેષણ કરો",
  "linkChecker.analyzing": "વિશ્લેષણ થઈ રહ્યું છે...",
  "linkChecker.riskScore": "જોખમ સ્કોર",
  "linkChecker.analysis": "વિશ્લેષણ",
  "linkChecker.recommendation": "ભલામણ કરેલ કાર્યવાહી",
  "linkChecker.openFull": "સંપૂર્ણ લિંક ચેકર ખોલો →",
  "linkChecker.danger": "જોખમ",
  "linkChecker.suspicious": "શંકાસ્પદ",
  "linkChecker.safe": "સંભવતઃ સુરક્ષિત",

  // Problem
  "problem.title": "અન્વેષણ શા માટે મહત્વપૂર્ણ છે",
  "problem.seniors.title": "વરિષ્ઠ નાગરિકો જીવનભરની બચત ગુમાવી રહ્યા છે",
  "problem.seniors.desc": "ડિજિટલ ધરપકડ કૌભાંડોએ 2024માં ₹2,000 કરોડનું નુકસાન કર્યું. પીડિતોને 48 દિવસ સુધી નકલી દેખરેખ હેઠળ રાખવામાં આવ્યા.",
  "problem.students.title": "વિદ્યાર્થીઓ બનાવટી તકોના ઝાંસામાં આવી રહ્યા છે",
  "problem.students.desc": "નોકરી કૌભાંડો, શિષ્યવૃત્તિ છેતરપિંડી, રોકાણ યોજનાઓ જે યુવાનોની મહત્વાકાંક્ષા અને નાણાકીય જરૂરિયાતોને નિશાન બનાવે છે.",
  "problem.families.title": "પરિવારો અત્યાધુનિક છેતરપિંડીથી છેતરાઈ રહ્યા છે",
  "problem.families.desc": "રોમાન્સ કૌભાંડો, ડીપફેક અવાજો, AI-જનરેટેડ વિડિયો જે છેતરપિંડીને વાસ્તવિકતાથી અલગ પાડવી મુશ્કેલ બનાવે છે.",

  // Stats
  "stats.losses": "ભારતમાં વાર્ષિક છેતરપિંડી નુકસાન (2024)",
  "stats.cases": "રિપોર્ટ કરાયેલા સાયબર અપરાધ કેસો (2024)",
  "stats.reduction": "અન્વેષણ તાલીમ સાથે સંવેદનશીલતામાં ઘટાડો",

  // Features
  "features.title": "અન્વેષણ તમારું રક્ષણ કેવી રીતે કરે છે",
  "features.profiling.title": "સંવેદનશીલતા પ્રોફાઇલિંગ",
  "features.profiling.desc": "AI તમારા ચોક્કસ નબળા મુદ્દાઓનું મૂલ્યાંકન કરે છે - સત્તાનો ડર, તાકીદની ગભરાટ, ટેક્નોલોજી સાક્ષરતાના અંતર",
  "features.simulation.title": "ઇન્ટરેક્ટિવ સિમ્યુલેશન",
  "features.simulation.desc": "સુરક્ષિત વાતાવરણમાં વાસ્તવિક કૌભાંડ પરિદૃશ્યોનો અનુભવ કરો. માનસિક દબાણ હેઠળ નિર્ણય લેવાની પ્રેક્ટિસ કરો",
  "features.community.title": "સામુદાયિક ગુપ્તમાહિતી",
  "features.community.desc": "ક્રાઉડસોર્સ્ડ ખતરા રિપોર્ટિંગ. જ્યારે દિલ્હીમાં 23 યુઝર્સ કૌભાંડની જાણ કરે છે, ત્યારે તમને તરત જ ચેતવણી મળે છે",
  "features.language.title": "બહુ-ભાષા સમર્થન",
  "features.language.desc": "હિન્દી, અંગ્રેજી અથવા 12 ભારતીય ભાષાઓમાં તાલીમ લો. ટાઇપ ન કરી શકતા વરિષ્ઠો માટે વૉઇસ ઇન્ટરફેસ",

  // CTA
  "cta.title": "તમારી ડિજિટલ સંરક્ષણ તાલીમ શરૂ કરો",
  "cta.subtitle": "15,234 ભારતીયો સાથે જોડાઓ જેઓ પહેલેથી જ પોતાનું રક્ષણ કરી રહ્યા છે",
  "cta.button": "હમણાં તાલીમ શરૂ કરો",

  // Quiz Page
  "quiz.title": "સંવેદનશીલતા મૂલ્યાંકન ક્વિઝ",
  "quiz.subtitle": "તમારા નબળા મુદ્દાઓ ઓળખવા માટે 5 પ્રશ્નો. માત્ર 2 મિનિટ લાગે છે.",
  "quiz.question": "પ્રશ્ન",
  "quiz.of": "માંથી",
  "quiz.next": "આગલો પ્રશ્ન",
  "quiz.submit": "ક્વિઝ સબમિટ કરો",
  "quiz.correct": "સાચું!",
  "quiz.incorrect": "ખોટું",
  "quiz.results.youScored": "તમે મેળવ્યા",
  "quiz.results.path": "તમારો તાલીમ માર્ગ:",
  "quiz.results.digitalArrest": "ડિજિટલ ધરપકડ કૌભાંડ સિમ્યુલેશન (ઉચ્ચ અગ્રતા)",
  "quiz.results.deepfake": "ડીપફેક વૉઇસ ડિટેક્શન મોડ્યુલ",
  "quiz.results.urlSpoofing": "URL સ્પૂફિંગ બેઝિક્સ",
  "quiz.results.startSimulation": "સિમ્યુલેશન તાલીમ શરૂ કરો",
  "quiz.results.retake": "ફરીથી ક્વિઝ આપો",
  "quiz.results.seeResults": "પરિણામો જુઓ",

  // Results Page
  "results.title": "તમારું લર્નિંગ ડેશબોર્ડ",
  "results.quizzesCompleted": "પૂર્ણ કરેલી ક્વિઝ",
  "results.simulationsCompleted": "પૂર્ણ કરેલા સિમ્યુલેશન",
  "results.linksAnalyzed": "વિશ્લેષિત લિંક્સ",
  "results.trainingHours": "તાલીમ કલાકો",
  "results.vulnerability": "તમારી સંવેદનશીલતા પ્રોફાઇલ",
  "results.authority": "સત્તા સંવેદનશીલતા",
  "results.urgency": "તાકીદ પ્રતિભાવ",
  "results.technical": "ટેકનિકલ સાક્ષરતા",
  "results.badges": "મેળવેલા બેજેસ",
  "results.nextSteps": "આગલા પગલાં",
  "results.share": "તમારી પ્રગતિ શેર કરો",
  "results.noData": "પરિણામો જોવા માટે તમારી પ્રથમ ક્વિઝ લો!",

  // Module system
  "module.backToDashboard": "ડેશબોર્ડ પર પાછા",
  "module.takeAssessment": "મૂલ્યાંકન લો",
  "module.retakeAssessment": "ફરી મૂલ્યાંકન લો",
  "module.yourScore": "તમારો સ્કોર",
  "module.explanation": "સમજૂતી",
  "module.questionOf": "પ્રશ્ન {current} / {total}",
  "module.submitAnswer": "જવાબ સબમિટ કરો",
  "module.nextQuestion": "આગલો પ્રશ્ન",
  "module.viewResults": "પરિણામો જુઓ",
  "module.excellent": "ઉત્તમ!",
  "module.good": "સારી પ્રગતિ",
  "module.needsWork": "સુધારાની જરૂર",
  "module.keyInsights": "મુખ્ય માહિતી",
  "module.cheatSheet": "ઝડપી સંદર્ભ",
  "module.correct": "સાચું!",
  "module.incorrect": "ખોટું",
  "module.assessmentComplete": "મૂલ્યાંકન પૂર્ણ",
  "module.yourWeaknesses": "સુધારાના ક્ષેત્રો",
  "module.yourStrengths": "તમારી શક્તિઓ",
  "module.startLearning": "શીખવાનું શરૂ કરો",

  // Simulation
  "simulate.title": "ઇન્ટરેક્ટિવ કૌભાંડ સિમ્યુલેશન: ડિજિટલ ધરપકડ કૌભાંડ",
  "simulate.subtitle": "વાસ્તવિક પરિદૃશ્ય. વાસ્તવિક દબાણ. સુરક્ષિત વાતાવરણ. તમારી પસંદગીઓ કરો.",
  "simulate.scammerTyping": "સ્કૅમર ટાઇપ કરી રહ્યો છે...",
  "simulate.yourChoice": "તમારી પસંદગી",
  "simulate.restart": "ફરી પ્રયાસ કરો",
  "simulate.continue": "તાલીમ ચાલુ રાખો",

  // Contact
  "contact.title": "અન્વેષણ વિશે",
  "contact.subtitle": "ડિજિટલ છેતરપિંડી સામે ભારતની સંરક્ષણ પ્રણાલીનું નિર્માણ",
  "contact.mission": "અમારું મિશન 100 મિલિયન ભારતીયોને AI-સંચાલિત, વ્યક્તિગત વર્તણૂક તાલીમ દ્વારા ડિજિટલ છેતરપિંડી ઓળખવા અને ટાળવા માટે તાલીમ આપવાનું છે. અમે જનરેટિવ AI, મનોવિજ્ઞાન અને સામુદાયિક ગુપ્તમાહિતીને જોડીએ છીએ જેથી સાયબર સુરક્ષા આકર્ષક બને, કંટાળાજનક નહીં.",
  "contact.step1": "મૂલ્યાંકન",
  "contact.step1.desc": "5-મિનિટની સંવેદનશીલતા ક્વિઝ લો",
  "contact.step2": "તાલીમ",
  "contact.step2.desc": "વાસ્તવિક કૌભાંડ સિમ્યુલેશન સાથે પ્રેક્ટિસ કરો",
  "contact.step3": "સુરક્ષા",
  "contact.step3.desc": "સુધારો ટ્રૅક કરો, જ્ઞાન શેર કરો",
  "contact.govt.title": "સરકાર અને પોલીસ માટે",
  "contact.govt.desc": "અન્વેષણને શૂન્ય ખર્ચે પાયલોટ પ્રોગ્રામ માટે તૈનાત કરી શકાય છે. ઓપન-સોર્સ ટેક્નોલોજી પર નિર્મિત, રાષ્ટ્રવ્યાપી સ્કેલ માટે તૈયાર.",
  "contact.form.name": "નામ",
  "contact.form.email": "ઇમેઇલ",
  "contact.form.org": "સંસ્થા",
  "contact.form.message": "સંદેશ",
  "contact.form.scam": "હું નવો કૌભાંડ પેટર્ન રિપોર્ટ કરવા માંગુ છું",
  "contact.form.pilot": "હું સરકાર/પોલીસ પાયલોટમાં રુચિ ધરાવું છું",
  "contact.form.volunteer": "હું અનુવાદક તરીકે સ્વયંસેવક બનવા માંગુ છું",
  "contact.form.submit": "સબમિટ કરો",

  // Footer
  "footer.built": "ભારતના 1.4 અબજ ડિજિટલ નાગરિકો માટે નિર્મિત",
  "footer.track": "ટ્રેક 2: ડિજિટલ નાગરિકનું રક્ષણ કરો | AI ઇમ્પેક્ટ સમિટ 2026 | iSAFE હેકાથોન",

  // Full Link Checker
  "fullLinkChecker.title": "અન્વેષણ લિંક વિશ્લેષક",
  "fullLinkChecker.subtitle": "શંકાસ્પદ URLs અને સંદેશાઓ માટે અદ્યતન AI-સંચાલિત પેટર્ન શોધ",
  "fullLinkChecker.placeholder": "કોઈપણ શંકાસ્પદ લિંક, ઇમેઇલ અથવા સંદેશ અહીં પેસ્ટ કરો...\n\nઉદાહરણ:\nhttps://gov-india-relief.com/claim-5000\nઅથવા\nલિંક્સ સાથે સંપૂર્ણ WhatsApp સંદેશ આગળ મોકલો",
  "fullLinkChecker.analyze": "હમણાં વિશ્લેષણ કરો",
  "fullLinkChecker.checking1": "ડોમેન પ્રતિષ્ઠા તપાસી રહ્યા છે...",
  "fullLinkChecker.checking2": "સામગ્રી પેટર્નનું વિશ્લેષણ કરી રહ્યા છે...",
  "fullLinkChecker.checking3": "ખતરા ડેટાબેઝ સાથે ક્રોસ-રેફરન્સ કરી રહ્યા છે...",
  "fullLinkChecker.meaning": "આનો અર્થ શું છે",
  "fullLinkChecker.verify": "વાસ્તવિક સરકારી યોજનાઓ કેવી રીતે ચકાસવી:",
  "fullLinkChecker.share": "આ વિશ્લેષણ શેર કરો",
  "fullLinkChecker.redFlags": "કૌભાંડ લિંક્સમાં સામાન્ય લાલ ધ્વજ:",

  // Login Page
  "login.title": "અન્વેષણ",
  "login.subtitle": "સાયબર-જાગૃત સુરક્ષા અને કલ્યાણ પ્લેટફોર્મ",
  "login.welcome": "પાછા સ્વાગત છે",
  "login.email": "ઈમેલ",
  "login.password": "પાસવર્ડ",
  "login.rememberMe": "મને યાદ રાખો",
  "login.forgotPassword": "પાસવર્ડ ભૂલી ગયા?",
  "login.loggingIn": "લૉગ ઇન થઈ રહ્યું છે...",
  "login.login": "લૉગ ઇન",
  "login.or": "─── અથવા ───",
  "login.continueAsDemo": "ડેમો તરીકે ચાલુ રાખો",
  "login.noAccount": "ખાતું નથી?",
  "login.createAccount": "ખાતું બનાવો",
  "login.emergencyNumbers": "કટોકટી નંબરો",
  "login.govt": "ગુજરાત સરકાર",
  "login.cyberBranch": "સાયબર ક્રાઇમ બ્રાન્ચ",
  "login.loginFailed": "લૉગ ઇન નિષ્ફળ",
  "login.connectionError": "સર્વરથી કનેક્ટ થઈ શક્યું નહીં",

  // Register Page
  "register.title": "ખાતું બનાવો",
  "register.subtitle": "અન્વેષણ સાયબર સુરક્ષા પ્લેટફોર્મમાં જોડાઓ",
  "register.fullName": "પૂરું નામ",
  "register.age": "ઉંમર",
  "register.selectGender": "લિંગ પસંદ કરો",
  "register.male": "પુરુષ",
  "register.female": "સ્ત્રી",
  "register.other": "અન્ય",
  "register.mobile": "મોબાઇલ",
  "register.email": "ઈમેલ",
  "register.password": "પાસવર્ડ",
  "register.confirmPassword": "પાસવર્ડની પુષ્ટિ કરો",
  "register.preferredLanguage": "પસંદગીની ભાષા",
  "register.english": "અંગ્રેજી",
  "register.hindi": "હિન્દી",
  "register.city": "શહેર",
  "register.emergencyContact": "કટોકટી સંપર્ક",
  "register.register": "નોંધણી કરો",
  "register.hasAccount": "પહેલેથી ખાતું છે?",
  "register.login": "લૉગ ઇન",

  // Role Selector
  "roleSelector.title": "તમારું પોર્ટલ પસંદ કરો",
  "roleSelector.subtitle": "ચાલુ રાખવા માટે તમારી ભૂમિકા પસંદ કરો",
  "roleSelector.senior": "વરિષ્ઠ નાગરિક",
  "roleSelector.senior.desc": "વ્યક્તિગત ડેશબોર્ડ ઍક્સેસ કરો",
  "roleSelector.family": "કુટુંબ સભ્ય",
  "roleSelector.family.desc": "પ્રિયજનો પર નજર રાખો",
  "roleSelector.officer": "સાયબર ક્રાઇમ ઓફિસર",
  "roleSelector.officer.desc": "તપાસ કન્સોલ",
  "roleSelector.admin": "સંચાલક",
  "roleSelector.admin.desc": "પ્લેટફોર્મ વ્યવસ્થાપન",
  "roleSelector.enter": "પોર્ટલમાં પ્રવેશ કરો",

  // Not Found
  "notFound.title": "404",
  "notFound.message": "અરે! પેજ મળ્યું નહીં",
  "notFound.return": "હોમ પર પાછા જાઓ",

  // Portal Nav - Senior
  "portal.senior.dashboard": "ડેશબોર્ડ",
  "portal.senior.emergency": "કટોકટી",
  "portal.senior.fraudCentre": "છેતરપિંડી કેન્દ્ર",
  "portal.senior.healthWelfare": "આરોગ્ય અને કલ્યાણ",
  "portal.senior.communityAlerts": "સામુદાયિક ચેતવણીઓ",
  "portal.senior.settings": "સેટિંગ્સ",

  // Portal Nav - Family
  "portal.family.dashboard": "ડેશબોર્ડ",
  "portal.family.alerts": "ચેતવણીઓ",
  "portal.family.seniors": "વરિષ્ઠજન",
  "portal.family.settings": "સેટિંગ્સ",
  "portal.family.subtitle": "કુટુંબ પોર્ટલ",

  // Portal Nav - Officer
  "portal.officer.dashboard": "ડેશબોર્ડ",
  "portal.officer.complaints": "ફરિયાદો",
  "portal.officer.cases": "કેસો",
  "portal.officer.evidence": "પુરાવા",
  "portal.officer.emergencyMonitor": "કટોકટી મોનિટર",
  "portal.officer.analytics": "વિશ્લેષણ",
  "portal.officer.subtitle": "ઓફિસર કન્સોલ",

  // Portal Nav - Admin
  "portal.admin.dashboard": "ડેશબોર્ડ",
  "portal.admin.users": "વપરાશકર્તાઓ",
  "portal.admin.analytics": "વિશ્લેષણ",
  "portal.admin.settings": "સેટિંગ્સ",

  // Family Dashboard
  "family.dashboard.title": "કુટુંબ ડેશબોર્ડ",
  "family.dashboard.subtitle": "એક જગ્યાએ તમારા પ્રિયજનની સુરક્ષા, આરોગ્ય અને કટોકટી સ્થિતિ પર નજર રાખો.",
  "family.dashboard.seniorStatus": "વરિષ્ઠ સ્થિતિ",
  "family.dashboard.safe": "સુરક્ષિત",
  "family.dashboard.lastCheckin": "છેલ્લું ચેક-ઇન",
  "family.dashboard.activeAlerts": "સક્રિય ચેતવણીઓ",
  "family.dashboard.currentLocation": "વર્તમાન સ્થાન",
  "family.dashboard.name": "નામ",
  "family.dashboard.health": "આરોગ્ય",
  "family.dashboard.good": "સારું",
  "family.dashboard.lastLocation": "છેલ્લું સ્થાન",
  "family.dashboard.lastActivity": "છેલ્લી પ્રવૃત્તિ",
  "family.dashboard.emergencyAlerts": "કટોકટી ચેતવણીઓ",
  "family.dashboard.activeSOS": "સક્રિય SOS",
  "family.dashboard.noEmergency": "કોઈ સક્રિય કટોકટી નથી.",
  "family.dashboard.cyberAlert": "સાયબર ચેતવણી",
  "family.dashboard.linksReported": "1 શંકાસ્પદ લિંક રિપોર્ટ થઈ.",
  "family.dashboard.attention": "ધ્યાન આપો",
  "family.dashboard.healthOverview": "આરોગ્ય ઝાંખી",
  "family.dashboard.medication": "દવા",
  "family.dashboard.completed": "પૂર્ણ",
  "family.dashboard.dailyCheckin": "દૈનિક ચેક-ઇન",
  "family.dashboard.wellness": "સુખાકારી",
  "family.dashboard.stable": "સ્થિર",
  "family.dashboard.wearable": "પહેરી શકાય તેવું",
  "family.dashboard.connected": "કનેક્ટેડ",
  "family.dashboard.emergencyContacts": "કટોકટી સંપર્કો",
  "family.dashboard.callSenior": "📞 વરિષ્ઠને કૉલ કરો",
  "family.dashboard.callHelpline": "🚓 સાયબર હેલ્પલાઇન (1930) પર કૉલ કરો",
  "family.dashboard.callEmergency": "🚑 કટોકટી (112)",
  "family.dashboard.recentActivity": "તાજેતરની પ્રવૃત્તિ",

  // Senior Dashboard
  "senior.dashboard.title": "તમારું ડેશબોર્ડ",
  "senior.dashboard.greeting": "સુપ્રભાત",
  "senior.dashboard.overallSafety": "સમગ્ર સુરક્ષા",
  "senior.dashboard.safe": "સુરક્ષિત",
  "senior.dashboard.cyberRisk": "સાયબર જોખમ સ્કોર",
  "senior.dashboard.lowRisk": "ઓછું જોખમ",
  "senior.dashboard.healthStatus": "આરોગ્ય સ્થિતિ",
  "senior.dashboard.activeCases": "સક્રિય કેસો",
  "senior.dashboard.underInvestigation": "તપાસ હેઠળ",
  "senior.dashboard.emergencyContacts": "કટોકટી સંપર્કો",
  "senior.dashboard.verifiedContacts": "ચકાસાયેલ સંપર્કો",
  "senior.dashboard.quickActions": "ઝડપી ક્રિયાઓ",
  "senior.dashboard.reportFraud": "છેતરપિંડીની જાણ કરો",
  "senior.dashboard.emergencySOS": "કટોકટી SOS",
  "senior.dashboard.evidenceVault": "પુરાવા ભંડાર",
  "senior.dashboard.communityAlerts": "સામુદાયિક ચેતવણીઓ",
  "senior.dashboard.tipOfDay": "AI સુરક્ષા ટીપ",
  "senior.dashboard.todaysActivity": "આજની પ્રવૃત્તિ",
  "senior.dashboard.lastSync": "છેલ્લું સિંક:",

  // Senior Emergency
  "senior.emergency.title": "કટોકટી પ્રતિભાવ",
  "senior.emergency.status": "કટોકટી સ્થિતિ",
  "senior.emergency.safe": "સુરક્ષિત",
  "senior.emergency.liveLocation": "લાઇવ સ્થાન",
  "senior.emergency.lastCheckin": "છેલ્લું ચેક-ઇન",
  "senior.emergency.sosButton": "એક-સ્પર્શ કટોકટી SOS",
  "senior.emergency.sending": "મોકલી રહ્યું છે...",
  "senior.emergency.activated": "SOS સક્રિય",
  "senior.emergency.sos": "કટોકટી SOS",
  "senior.emergency.voiceSOS": "વૉઇસ કટોકટી",
  "senior.emergency.activateVoice": "વૉઇસ SOS સક્રિય કરો",
  "senior.emergency.contacts": "કટોકટી સંપર્કો",
  "senior.emergency.medicalStatus": "તબીબી સ્થિતિ",
  "senior.emergency.bloodPressure": "બ્લડ પ્રેશર",
  "senior.emergency.normal": "સામાન્ય",
  "senior.emergency.responseStatus": "પ્રતિભાવ સ્થિતિ",
  "senior.emergency.systemReady": "સિસ્ટમ તૈયાર",
  "senior.emergency.recentActivity": "તાજેતરની કટોકટી પ્રવૃત્તિ",

  // Senior Emergency Contacts
  "senior.contacts.title": "કટોકટી સંપર્કો",
  "senior.contacts.subtitle": "વિશ્વસનીય કુટુંબ સભ્યોનું સંચાલન કરો...",
  "senior.contacts.add": "સંપર્ક ઉમેરો",
  "senior.contacts.registered": "નોંધાયેલા સંપર્કો",
  "senior.contacts.family": "કુટુંબ સભ્યો",
  "senior.contacts.medical": "તબીબી સંપર્કો",
  "senior.contacts.primary": "પ્રાથમિક",
  "senior.contacts.secondary": "ગૌણ",
  "senior.contacts.call": "કૉલ",
  "senior.contacts.edit": "સંપાદિત કરો",
  "senior.contacts.remove": "દૂર કરો",
  "senior.contacts.guidelines": "કટોકટી સંપર્ક માર્ગદર્શિકા",

  // Senior Fraud Centre
  "senior.fraud.title": "છેતરપિંડી કેન્દ્ર",
  "senior.fraud.subtitle": "સાયબર છેતરપિંડીની જાણ કરો, ફરિયાદ પ્રગતિ જુઓ...",
  "senior.fraud.totalComplaints": "કુલ ફરિયાદો",
  "senior.fraud.activeCases": "સક્રિય કેસો",
  "senior.fraud.evidenceFiles": "પુરાવા ફાઇલો",
  "senior.fraud.resolved": "ઉકેલાયેલ",
  "senior.fraud.reportFraud": "છેતરપિંડીની જાણ કરો",
  "senior.fraud.myComplaints": "મારી ફરિયાદો",
  "senior.fraud.evidenceVault": "પુરાવા ભંડાર",
  "senior.fraud.workflow": "સાયબર અપરાધ રિપોર્ટિંગ કાર્યપ્રવાહ",

  // Senior Evidence Vault
  "senior.evidence.title": "પુરાવા ભંડાર",
  "senior.evidence.subtitle": "સાયબર અપરાધ પુરાવાનું સુરક્ષિત સંચાલન...",
  "senior.evidence.upload": "પુરાવા અપલોડ કરો",
  "senior.evidence.totalFiles": "કુલ ફાઇલો",
  "senior.evidence.storageUsed": "વપરાયેલ સ્ટોરેજ",
  "senior.evidence.linkedCases": "લિંક કરેલા કેસો",
  "senior.evidence.search": "ફરિયાદ ID અથવા ફાઇલ શોધો...",
  "senior.evidence.complaintId": "ફરિયાદ ID",
  "senior.evidence.uploadedBy": "અપલોડ કરનાર",
  "senior.evidence.uploadDate": "અપલોડ તારીખ",
  "senior.evidence.size": "કદ",
  "senior.evidence.view": "જુઓ",
  "senior.evidence.download": "ડાઉનલોડ",
  "senior.evidence.delete": "કાઢી નાખો",
  "senior.evidence.none": "કોઈ પુરાવા મળ્યા નહીં",

  // Senior Health
  "senior.health.title": "આરોગ્ય અને સુખાકારી",
  "senior.health.overall": "સમગ્ર આરોગ્ય",
  "senior.health.good": "સારું",
  "senior.health.dailyCheckin": "દૈનિક ચેક-ઇન",
  "senior.health.completed": "પૂર્ણ",
  "senior.health.wearable": "પહેરી શકાય તેવું ઉપકરણ",
  "senior.health.connected": "કનેક્ટેડ",
  "senior.health.emergencyProfile": "કટોકટી પ્રોફાઇલ",
  "senior.health.updated": "અપડેટેડ",
  "senior.health.vitals": "મહત્વપૂર્ણ આંકડા",
  "senior.health.bloodPressure": "બ્લડ પ્રેશર",
  "senior.health.reminders": "આજના આરોગ્ય રિમાઇન્ડર્સ",
  "senior.health.medicalProfile": "કટોકટી તબીબી પ્રોફાઇલ",
  "senior.health.recommendations": "આરોગ્ય ભલામણો",
  "senior.health.updateProfile": "આરોગ્ય પ્રોફાઇલ અપડેટ કરો",

  // Senior Report Fraud
  "senior.report.title": "સાયબર છેતરપિંડીની જાણ કરો",
  "senior.report.category": "કૌભાંડ શ્રેણી",
  "senior.report.phishing": "ફિશિંગ",
  "senior.report.upiFraud": "UPI છેતરપિંડી",
  "senior.report.titleField": "ફરિયાદ શીર્ષક",
  "senior.report.details": "ઘટના વિગતો",
  "senior.report.evidence": "પુરાવા",
  "senior.report.uploadEvidence": "સહાયક પુરાવા અપલોડ કરો",
  "senior.report.victimDetails": "પીડિત વિગતો",
  "senior.report.fullName": "પૂરું નામ",
  "senior.report.mobile": "મોબાઇલ નંબર",
  "senior.report.email": "ઈમેલ સરનામું",
  "senior.report.priority": "ફરિયાદ પ્રાથમિકતા",
  "senior.report.low": "ઓછી",
  "senior.report.medium": "મધ્યમ",
  "senior.report.high": "ઉચ્ચ",
  "senior.report.emergency": "કટોકટી",
  "senior.report.beforeSubmit": "સબમિટ કરતા પહેલા",
  "senior.report.submit": "ફરિયાદ દાખલ કરો",
  "senior.report.submitted": "ફરિયાદ દાખલ થઈ",
  "senior.report.submitAnother": "બીજી ફરિયાદ દાખલ કરો",

  // Senior Cases
  "senior.cases.title": "કેસ વ્યવસ્થાપન",
  "senior.cases.subtitle": "તપાસનું નિરીક્ષણ કરો...",
  "senior.cases.total": "કુલ કેસો",
  "senior.cases.active": "સક્રિય",
  "senior.cases.investigating": "તપાસ હેઠળ",
  "senior.cases.closed": "બંધ",
  "senior.cases.search": "કેસ ID શોધો...",
  "senior.cases.all": "બધા",
  "senior.cases.pending": "બાકી",
  "senior.cases.resolved": "ઉકેલાયેલ",
  "senior.cases.citizen": "નાગરિક",
  "senior.cases.date": "તારીખ",
  "senior.cases.amount": "રકમ",
  "senior.cases.priority": "પ્રાથમિકતા",
  "senior.cases.openCase": "કેસ ખોલો",
  "senior.cases.timeline": "તપાસ સમયરેખા",
  "senior.cases.viewEvidence": "પુરાવા જુઓ",
  "senior.cases.none": "કોઈ કેસ મળ્યો નહીં",

  // Senior Community Alerts
  "senior.community.title": "સામુદાયિક ચેતવણીઓ",
  "senior.community.subtitle": "સાયબર છેતરપિંડી વલણોથી અપડેટ રહો...",
  "senior.community.subscribe": "ચેતવણીઓ સબ્સ્ક્રાઇબ કરો",
  "senior.community.activeAlerts": "સક્રિય ચેતવણીઓ",
  "senior.community.highRisk": "ઉચ્ચ જોખમ",
  "senior.community.nearby": "નજીકની ચેતવણીઓ",
  "senior.community.thisWeek": "આ અઠવાડિયે",
  "senior.community.search": "ચેતવણીઓ શોધો...",
  "senior.community.all": "બધા",
  "senior.community.medium": "મધ્યમ",
  "senior.community.critical": "ગંભીર",
  "senior.community.viewDetails": "વિગતો જુઓ",
  "senior.community.markRead": "વાંચેલું ચિહ્નિત કરો",
  "senior.community.staySafe": "સુરક્ષિત રહો",

  // Senior Settings
  "senior.settings.title": "સેટિંગ્સ",
  "senior.settings.subtitle": "તમારું ખાતું, સુલભતા સંચાલિત કરો...",
  "senior.settings.general": "સામાન્ય",
  "senior.settings.language": "પસંદગીની ભાષા",
  "senior.settings.theme": "થીમ",
  "senior.settings.light": "લાઇટ",
  "senior.settings.dark": "ડાર્ક",
  "senior.settings.system": "સિસ્ટમ",
  "senior.settings.emergencyPrefs": "કટોકટી પસંદગીઓ",
  "senior.settings.accessibility": "સુલભતા",
  "senior.settings.largeText": "મોટા ટેક્સ્ટ મોડ",
  "senior.settings.privacy": "ગોપનીયતા અને સુરક્ષા",
  "senior.settings.accountInfo": "ખાતાની માહિતી",
  "senior.settings.fullName": "પૂરું નામ",
  "senior.settings.saveChanges": "ફેરફારો સાચવો",
  "senior.settings.resetPrefs": "પસંદગીઓ રીસેટ કરો",
  "senior.settings.govtNotice": "સરકારી સુરક્ષા સૂચના",
  "settings.emergencyNotifications": "કટોકટી સૂચનાઓ",
  "settings.receiveEmergencyAlerts": "કટોકટી ચેતવણીઓ મેળવો.",
  "settings.liveLocationSharing": "લાઇવ સ્થાન શેરિંગ",
  "settings.shareGpsEmergencies": "કટોકटी દરમિયાન જીપીએસ શેર કરો.",
  "settings.voiceSos": "વોઇસ એસઓએસ",
  "settings.enableVoiceActivation": "વોઇસ સક્રિયકરણ સક્ષમ કરો.",
  "settings.highContrast": "ઉચ્ચ કોન્ટ્રાસ્ટ મોડ",
  "settings.voiceGuidance": "વોઇસ માર્ગદર્શન",
  "settings.readNotificationsAloud": "સૂચનાઓ મોટેથી વાંચો",
  "settings.shareAnonymousStats": "અનામી છેતરપિંડીના આંકડા શેર કરો",
  "settings.allowEmergencyGps": "કટોકટી જીપીએસ એક્સેસની મંજૂરી આપો",
  "settings.enableAiScam": "એઆઈ સ્કેમ ડિટેક્શન સક્ષમ કરો",
  "settings.twoFactorAuth": "દ્વિ-પરિબળ પ્રમાણીકરણ",
  "settings.registeredMobile": "નોંધાયેલ મોબાઈલ",
  "settings.email": "ઈમેલ",
  "settings.aadhaarVerification": "આધાર ચકાસણી",
  "settings.verified": "ચકાસાયેલ",
  "settings.changesSaved": "ફેરફારો સફળતાપૂર્વક સાચવવામાં આવ્યા!",

  // Family Alerts
  "family.alerts.title": "ચેતવણીઓ",
  "family.alerts.subtitle": "ચેતવણીઓનું નિરીક્ષણ અને વર્ગીકરણ કરો...",
  "family.alerts.none": "કોઈ ચેતવણીઓ મળી નહીં.",
  "family.alerts.status": "સ્થિતિ:",
  "family.alerts.location": "સ્થાન:",
  "family.alerts.time": "સમય:",
  "family.alerts.classification": "વર્ગીકરણ:",
  "family.alerts.reclassify": "પુનઃવર્ગીકૃત કરો",
  "family.alerts.classify": "વર્ગીકૃત કરો",
  "family.alerts.selectScam": "કૌભાંડ પ્રકાર પસંદ કરો:",
  "family.alerts.phishing": "ફિશિંગ",
  "family.alerts.vishing": "વિશિંગ",

  // Family Seniors
  "family.seniors.title": "લિંક કરેલા વરિષ્ઠજન",
  "family.seniors.subtitle": "વરિષ્ઠ નાગરિકો જુઓ અને સંચાલિત કરો...",
  "family.seniors.safe": "સુરક્ષિત",
  "family.seniors.attention": "ધ્યાન આપો",
  "family.seniors.age": "ઉંમર",
  "family.seniors.health": "આરોગ્ય",
  "family.seniors.location": "સ્થાન",
  "family.seniors.lastCheckin": "છેલ્લું ચેક-ઇન",

  // Family Settings
  "family.settings.title": "સેટિંગ્સ",
  "family.settings.subtitle": "તમારી કુટુંબ પોર્ટલ પસંદગીઓ સંચાલિત કરો.",
  "family.settings.notifications": "સૂચનાઓ",
  "family.settings.smsAlerts": "SMS ચેતવણીઓ",
  "family.settings.emailAlerts": "ઈમેલ ચેતવણીઓ",
  "family.settings.pushNotifications": "પુશ સૂચનાઓ",
  "family.settings.emergencyContact": "કટોકટી સંપર્ક",
  "family.settings.emergencyInfo": "તમારી કટોકટી સંપર્ક માહિતી અપડેટ કરો.",
  "family.settings.name": "નામ",
  "family.settings.phone": "ફોન",
  "family.settings.saveChanges": "ફેરફારો સાચવો",
  "family.settings.account": "ખાતું",
  "family.settings.manageSeniors": "લિંક કરેલા વરિષ્ઠજન સંચાલિત કરો",

  // Officer Dashboard
  "officer.dashboard.title": "સાયબર ક્રાઇમ ઓફિસર ડેશબોર્ડ",
  "officer.dashboard.activeComplaints": "સક્રિય ફરિયાદો",
  "officer.dashboard.activeEmergencies": "સક્રિય કટોકટીઓ",
  "officer.dashboard.officersOnline": "ઑનલાઇન ઓફિસરો",
  "officer.dashboard.resolvedToday": "આજે ઉકેલાયેલા કેસો",
  "officer.dashboard.recentComplaints": "તાજેતરની ફરિયાદો",
  "officer.dashboard.viewAll": "બધા જુઓ",
  "officer.dashboard.liveMonitor": "લાઇવ કટોકટી મોનિટર",
  "officer.dashboard.quickActions": "ઝડપી ક્રિયાઓ",
  "officer.dashboard.reviewComplaints": "ફરિયાદોની સમીક્ષા કરો",
  "officer.dashboard.openCases": "ખુલ્લા કેસો",
  "officer.dashboard.evidenceVault": "પુરાવા ભંડાર",
  "officer.dashboard.emergencyMonitor": "કટોકટી મોનિટર",

  // Officer Complaints
  "officer.complaints.title": "ફરિયાદ વ્યવસ્થાપન",
  "officer.complaints.subtitle": "સમીક્ષા, સોંપણી અને તપાસ કરો...",
  "officer.complaints.export": "ફરિયાદો નિકાસ કરો",
  "officer.complaints.total": "કુલ ફરિયાદો",
  "officer.complaints.pending": "બાકી",
  "officer.complaints.investigating": "તપાસ હેઠળ",
  "officer.complaints.resolved": "ઉકેલાયેલ",
  "officer.complaints.search": "ફરિયાદ ID શોધો...",
  "officer.complaints.citizen": "નાગરિક",
  "officer.complaints.date": "તારીખ",
  "officer.complaints.location": "સ્થાન",
  "officer.complaints.reportedLoss": "જાણ કરાયેલ નુકસાન",
  "officer.complaints.status": "વર્તમાન સ્થિતિ",
  "officer.complaints.view": "ફરિયાદ જુઓ",
  "officer.complaints.assign": "ઓફિસર સોંપો",
  "officer.complaints.openCase": "કેસ ખોલો",
  "officer.complaints.viewEvidence": "પુરાવા જુઓ",
  "officer.complaints.workflow": "તપાસ કાર્યપ્રવાહ",

  // Officer Cases
  "officer.cases.title": "કેસ વ્યવસ્થાપન",
  "officer.cases.subtitle": "તપાસનું નિરીક્ષણ કરો...",
  "officer.cases.create": "નવો કેસ બનાવો",
  "officer.cases.total": "કુલ કેસો",
  "officer.cases.active": "સક્રિય",
  "officer.cases.evidenceReview": "પુરાવા સમીક્ષા",
  "officer.cases.closed": "બંધ",
  "officer.cases.search": "કેસ ID શોધો...",
  "officer.cases.complaintId": "ફરિયાદ ID",
  "officer.cases.citizen": "નાગરિક",
  "officer.cases.assignedOfficer": "સોંપાયેલ ઓફિસર",
  "officer.cases.status": "સ્થિતિ",
  "officer.cases.lastUpdated": "છેલ્લું અપડેટ",
  "officer.cases.openCase": "કેસ ખોલો",
  "officer.cases.pipeline": "તપાસ પાઇપલાઇન",
  "officer.cases.created": "કેસ બનાવ્યો",

  // Officer Evidence
  "officer.evidence.title": "ડિજિટલ પુરાવા ભંડાર",
  "officer.evidence.subtitle": "સુરક્ષિત સમીક્ષા, ચકાસણી...",
  "officer.evidence.export": "પુરાવા નિકાસ કરો",
  "officer.evidence.totalFiles": "કુલ ફાઇલો",
  "officer.evidence.verified": "ચકાસાયેલ",
  "officer.evidence.pendingReview": "સમીક્ષા બાકી",
  "officer.evidence.storageUsed": "વપરાયેલ સ્ટોરેજ",
  "officer.evidence.search": "પુરાવા ID શોધો...",
  "officer.evidence.complaintId": "ફરિયાદ ID",
  "officer.evidence.citizen": "નાગરિક",
  "officer.evidence.type": "પુરાવા પ્રકાર",
  "officer.evidence.uploadDate": "અપલોડ તારીખ",
  "officer.evidence.fileSize": "ફાઇલ કદ",
  "officer.evidence.view": "પુરાવા જુઓ",
  "officer.evidence.download": "ડાઉનલોડ",
  "officer.evidence.verify": "પુરાવા ચકાસો",
  "officer.evidence.linkToCase": "કેસ સાથે લિંક કરો",
  "officer.evidence.workflow": "પુરાવા સંચાલન કાર્યપ્રવાહ",

  // Officer Emergency Monitor
  "officer.emergency.title": "કટોકટી મોનિટર",
  "officer.emergency.subtitle": "SOS વિનંતીઓનું લાઇવ નિરીક્ષણ...",
  "officer.emergency.liveDashboard": "લાઇવ ડેશબોર્ડ",
  "officer.emergency.active": "સક્રિય કટોકટીઓ",
  "officer.emergency.deployed": "તૈનાત ઓફિસરો",
  "officer.emergency.avgResponse": "સરેરાશ પ્રતિભાવ",
  "officer.emergency.resolvedToday": "આજે ઉકેલાયેલ",
  "officer.emergency.search": "SOS ID શોધો...",
  "officer.emergency.citizen": "નાગરિક",
  "officer.emergency.type": "કટોકટી પ્રકાર",
  "officer.emergency.location": "સ્થાન",
  "officer.emergency.status": "વર્તમાન સ્થિતિ",
  "officer.emergency.triggered": "ટ્રિગર થયેલ",
  "officer.emergency.liveTracking": "લાઇવ ટ્રેકિંગ ખોલો",
  "officer.emergency.contactCitizen": "નાગરિકનો સંપર્ક કરો",
  "officer.emergency.notifyFamily": "કુટુંબને સૂચિત કરો",
  "officer.emergency.markResolved": "ઉકેલાયેલ ચિહ્નિત કરો",
  "officer.emergency.workflow": "કટોકટી પ્રતિભાવ કાર્યપ્રવાહ",

  // Officer Analytics
  "officer.analytics.title": "વિશ્લેષણ ડેશબોર્ડ",
  "officer.analytics.subtitle": "સાયબર અપરાધ વલણો...",
  "officer.analytics.export": "રિપોર્ટ નિકાસ કરો",
  "officer.analytics.complaintsMonth": "આ મહિનાની ફરિયાદો",
  "officer.analytics.fraudPrevented": "અટકાવાયેલ છેતરપિંડી",
  "officer.analytics.avgResponseTime": "સરેરાશ પ્રતિભાવ સમય",
  "officer.analytics.resolutionRate": "ઉકેલ દર",
  "officer.analytics.trends": "છેતરપિંડી વલણ વિશ્લેષણ",
  "officer.analytics.upiFraud": "UPI છેતરપિંડી",
  "officer.analytics.investmentScam": "રોકાણ કૌભાંડ",
  "officer.analytics.insights": "ઓપરેશનલ આંતરદૃષ્ટિ",
  "officer.analytics.highestRisk": "સૌથી વધુ જોખમ વિસ્તાર",
  "officer.analytics.aiThreat": "AI ખતરા ગુપ્તમાહિતી",
  "officer.analytics.emergingScam": "ઉભરતું કૌભાંડ",

  // Admin Dashboard
  "admin.dashboard.title": "સંચાલક ડેશબોર્ડ",
  "admin.dashboard.subtitle": "પ્લેટફોર્મ ઝાંખી, સિસ્ટમ આરોગ્ય...",
  "admin.dashboard.generateReport": "રિપોર્ટ જનરેટ કરો",
  "admin.dashboard.registeredSeniors": "નોંધાયેલા વરિષ્ઠજન",
  "admin.dashboard.cyberOfficers": "સાયબર ઓફિસરો",
  "admin.dashboard.activeCases": "સક્રિય કેસો",
  "admin.dashboard.platformUptime": "પ્લેટફોર્મ અપટાઇમ",
  "admin.dashboard.systemHealth": "સિસ્ટમ આરોગ્ય",
  "admin.dashboard.apiServer": "API સર્વર",
  "admin.dashboard.operational": "કાર્યરત",
  "admin.dashboard.recentActivity": "તાજેતરની પ્લેટફોર્મ પ્રવૃત્તિ",
  "admin.dashboard.adminActions": "સંચાલકીય ક્રિયાઓ",
  "admin.dashboard.manageUsers": "વપરાશકર્તાઓ સંચાલિત કરો",
  "admin.dashboard.viewAnalytics": "વિશ્લેષણ જુઓ",
  "admin.dashboard.platformSettings": "પ્લેટફોર્મ સેટિંગ્સ",
  "admin.dashboard.systemLogs": "સિસ્ટમ લોગ્સ",

  // Admin Analytics
  "admin.analytics.title": "પ્લેટફોર્મ વિશ્લેષણ",
  "admin.analytics.subtitle": "પ્લેટફોર્મ પ્રદર્શનનું નિરીક્ષણ કરો...",
  "admin.analytics.export": "વિશ્લેષણ નિકાસ કરો",
  "admin.analytics.totalComplaints": "કુલ ફરિયાદો",
  "admin.analytics.activeSeniors": "સક્રિય વરિષ્ઠજન",
  "admin.analytics.emergencyResponses": "કટોકટી પ્રતિભાવો",
  "admin.analytics.resolutionRate": "ઉકેલ દર",
  "admin.analytics.fraudDistribution": "છેતરપિંડી વિતરણ",
  "admin.analytics.upiFraud": "UPI છેતરપિંડી",
  "admin.analytics.performance": "પ્લેટફોર્મ પ્રદર્શન",
  "admin.analytics.aiInsights": "AI આંતરદૃષ્ટિ",
  "admin.analytics.highestRiskZone": "સૌથી વધુ જોખમ ઝોન",
  "admin.analytics.emergingScam": "ઉભરતું કૌભાંડ",
  "admin.analytics.recommendation": "ભલામણ",

  // Admin Settings
  "admin.settings.title": "પ્લેટફોર્મ સેટિંગ્સ",
  "admin.settings.subtitle": "પ્લેટફોર્મ-વ્યાપી પસંદગીઓ ગોઠવો...",
  "admin.settings.general": "સામાન્ય",
  "admin.settings.maintenance": "જાળવણી મોડ",
  "admin.settings.allowRegistration": "નવી નોંધણીની મંજૂરી આપો",
  "admin.settings.enableAI": "AI છેતરપિંડી શોધ સક્ષમ કરો",
  "admin.settings.security": "સુરક્ષા",
  "admin.settings.twoFactor": "બે-પરિબળ પ્રમાણીકરણ આવશ્યક કરો",
  "admin.settings.auditLogs": "ઓડિટ લોગ્સ સક્ષમ કરો",
  "admin.settings.notifications": "સૂચનાઓ",
  "admin.settings.emailAlerts": "ઈમેલ ચેતવણીઓ",
  "admin.settings.saveChanges": "ફેરફારો સાચવો",
  "admin.settings.reset": "રીસેટ",

  // Admin Users
  "admin.users.title": "વપરાશકર્તા વ્યવસ્થાપન",
  "admin.users.subtitle": "વરિષ્ઠ નાગરિકો, ઓફિસરોનું સંચાલન...",
  "admin.users.addUser": "વપરાશકર્તા ઉમેરો",
  "admin.users.total": "કુલ વપરાશકર્તાઓ",
  "admin.users.seniors": "વરિષ્ઠજન",
  "admin.users.officers": "ઓફિસરો",
  "admin.users.admins": "સંચાલકો",
  "admin.users.search": "વપરાશકર્તા ID શોધો...",
  "admin.users.userId": "વપરાશકર્તા ID",
  "admin.users.role": "ભૂમિકા",
  "admin.users.city": "શહેર",
  "admin.users.joined": "જોડાયા",
  "admin.users.viewProfile": "પ્રોફાઇલ જુઓ",
  "admin.users.editUser": "વપરાશકર્તા સંપાદિત કરો",
  "admin.users.resetPassword": "પાસવર્ડ રીસેટ કરો",
  "admin.users.disableAccount": "ખાતું નિષ્ક્રિય કરો",
  "admin.users.stats": "વપરાશકર્તા આંકડા",
  "admin.users.newToday": "આજે નવા",
  "admin.users.activeToday": "આજે સક્રિય",
  "admin.users.suspended": "સસ્પેન્ડેડ",
  "admin.users.verified": "ચકાસાયેલ",

  // Home - Hero
  "home.hero.branch": "અમદાવાદ સાયબર ક્રાઇમ બ્રાન્ચ • ગુજરાત સરકાર",
  "home.hero.title": "અન્વેષણ",
  "home.hero.subtitle": "વરિષ્ઠ નાગરિકો માટે સાયબર-જાગૃત સુરક્ષા અને કલ્યાણ પ્લેટફોર્મ",
  "home.hero.desc": "વરિષ્ઠ નાગરિકોને સાયબર છેતરપિંડી, તબીબી કટોકટીઓ અને નાણાકીય કૌભાંડોથી બચાવવા માટે AI-સહાયિત નિવારણ, ઝડપી કટોકટી પ્રતિભાવ, કલ્યાણ દેખરેખ અને પોલીસ એકીકરણ.",
  "home.hero.openSenior": "વરિષ્ઠ પોર્ટલ ખોલો",
  "home.hero.reportFraud": "સાયબર છેતરપિંડીની જાણ કરો",
  "home.hero.explore": "પ્લેટફોર્મનું અન્વેષણ કરો",
  "home.hero.platformStatus": "પ્લેટફોર્મ સ્થિતિ",
  "home.hero.emergencySOS": "કટોકટી SOS",
  "home.hero.aiDetection": "AI છેતરપિંડી શોધ",
  "home.hero.familyConnectivity": "કુટુંબ કનેક્ટિવિટી",
  "home.hero.policeIntegration": "પોલીસ એકીકરણ",
  "home.hero.healthMonitoring": "આરોગ્ય દેખરેખ",
  "home.hero.evidenceVault": "પુરાવા ભંડાર",

  // Home - Problem
  "home.problem.title": "સમસ્યા વર્ણન",
  "home.problem.sectionTitle": "અન્વેષણની શા માટે જરૂર છે",
  "home.problem.cyberFraud": "વરિષ્ઠ નાગરિકો સામે સાયબર છેતરપિંડી",
  "home.problem.medicalEmergencies": "તબીબી અને કલ્યાણ કટોકટીઓ",
  "home.problem.delayedResponse": "વિલંબિત કટોકટી પ્રતિભાવ",
  "home.problem.policeIntegration": "પોલીસ એકીકરણની જરૂર",
  "home.problem.desc": "પ્રવર્તમાન પ્લેટફોર્મ્સ કાં તો સાયબર જાગૃતિ, કટોકટી પ્રતિભાવ અથવા કલ્યાણ દેખરેખ પર ધ્યાન કેન્દ્રિત કરે છે. અન્વેષણ આ ત્રણેયને એકીકૃત ઇકોસિસ્ટમમાં જોડે છે જે ખાસ કરીને વરિષ્ઠ નાગરિકો અને સાયબર ક્રાઇમ બ્રાન્ચ માટે રચાયેલ છે.",
  "home.problem.desc.cyber": "વરિષ્ઠ નાગરિકોને ફિશિંગ, OTP કૌભાંડો, નકલી રોકાણ યોજનાઓ, પેન્શન છેતરપિંડી, ડિજિટલ ધરપકડ કૌભાંડો અને ઓળખની ચોરી દ્વારા વધુને વધુ નિશાન બનાવવામાં આવે છે.",
  "home.problem.desc.medical": "ઘણા વરિષ્ઠ નાગરિકો એકલા રહે છે અને તબીબી પરિસ્થિતિઓ દરમિયાન સતત કલ્યાણ દેખરેખ, દવા રીમાઇન્ડર્સ અને ઝડપી કટોકટી સહાયની જરૂર પડે છે.",
  "home.problem.desc.response": "વર્તમાન પ્રણાલીઓ વિખરાયેલી છે. સાયબર ગુનાની જાણ કરવી, પરિવારના સભ્યોનો સંપર્ક કરવો અને કટોકટી પ્રતિસાદકર્તાઓ સુધી પહોંચવા માટે ઘણી સ્વતંત્ર સેવાઓની જરૂર પડે છે.",
  "home.problem.desc.police": "સાયબર ક્રાઇમ શાખાને એક એવા એકીકૃત પ્લેટફોર્મની જરૂર છે જે પુરાવા પ્રાપ્ત કરવા, કેસો ટ્રેક કરવા, ચેતવણીઓ જનરેટ કરવા અને તપાસમાં સહાય કરવા માટે સક્ષમ હોય.",
  "home.problem.stat.losses": "સાયબર છેતરપિંડી નુકસાન (ભારત 2024)",
  "home.problem.stat.complaints": "પંજીકૃત ફરિયાદો",
  "home.problem.stat.categories": "કૌભાંડ શ્રેણીઓ કવર કરેલ",
  "home.problem.stat.ready": "કટોકટી પ્રતિભાવ તૈયાર",

  // Home - Features
  "home.features.title": "મુખ્ય ક્ષમતાઓ",
  "home.features.subtitle": "વરિષ્ઠ નાગરિકોના રક્ષણ માટે બધું જ",
  "home.features.emergencySOS": "કટોકટી SOS",
  "home.features.cyberProtection": "સાયબર છેતરપિંડી સુરક્ષા",
  "home.features.aiRisk": "AI જોખમ મૂલ્યાંકન",
  "home.features.evidenceCollection": "પુરાવા સંગ્રહ",
  "home.features.familyConnectivity": "કુટુંબ કનેક્ટિવિટી",
  "home.features.welfareMonitoring": "કલ્યાણ દેખરેખ",
  "home.features.policeDashboard": "પોલીસ ડેશબોર્ડ",
  "home.features.multilingual": "બહુભાષી સુલભતા",
  "home.features.desc": "અંવેષણ સાયબર જાગૃતિ, કટોકટી પ્રતિસાદ, કલ્યાણ દેખરેખ અને પોલીસ સહયોગને એક એકીકૃત પ્લેટફોર્મમાં જોડે છે.",
  "home.features.desc.emergency": "GPS સ્થાન, વૉઇસ સક્રિયકરણ અને પરિવારના સભ્યો તથા સાયબર ક્રાઇમ સત્તાવાળાઓને તાત્કાલિક ચેતવણીઓ સાથે વન-ટચ ઇમરજન્સી ટ્રિગર.",
  "home.features.desc.cyber": "વાતચીત કરતા પહેલાં AI-સહાયિત છેતરપિંડી શોધનો ઉપયોગ કરીને શંકાસ્પદ લિંક્સ, SMS, WhatsApp સંદેશાઓ અને ઇમેઇલ્સનું વિશ્લેષણ કરો.",
  "home.features.desc.risk": "વ્યક્તિગત જોખમ સ્કોર્સ જનરેટ કરવા માટે વ્યવહારિક નબળાઈ, છેતરપિંડીના જોખમો અને ડિજિટલ સુરક્ષાનું સતત મૂલ્યાંકન કરે છે.",
  "home.features.desc.evidence": "તપાસના સમર્થન માટે ટાઇમસ્ટેમ્પ સાથે સ્ક્રીનશોટ, સ્કેમ સંદેશાઓ, કૉલ રેકોર્ડિંગ્સ અને URL સુરક્ષિત રીતે અપલોડ કરો.",
  "home.features.desc.family": "શેર્ડ મોનિટરિંગ અને રીઅલ-ટાઇમ ઘટના સ્થિતિ પ્રદાન કરીને કટોકટી દરમિયાન સંભાળ રાખનારાઓને સૂચિત કરો.",
  "home.features.desc.welfare": "દૈનિક ચેક-ઇન, દવા રીમાઇન્ડર્સ, નિષ્ક્રિયતા ચેતવણીઓ અને ખાસ કરીને વરિષ્ઠ નાગરિકો માટે રચાયેલ આરોગ્ય દેખરેખ.",
  "home.features.desc.police": "સાયબર ક્રાઇમ અધિકારીઓ માટે કેસ ટ્રેકિંગ, છેતરપિંડી હીટમેપ્સ, કટોકટી દેખરેખ અને ડિજિટલ પુરાવા વ્યવસ્થાપન.",
  "home.features.desc.multilingual": "મોટી ટાઇપોગ્રાફી અને વરિષ્ઠ-અનુકૂળ નેવિગેશન સાથે અંગ્રેજી, હિન્દી અને ગુજરાતીનું સમર્થન કરતું સુલભ ઇન્ટરફેસ.",

  // Home - How It Works
  "home.how.title": "કાર્યપ્રવાહ",
  "home.how.sectionTitle": "અન્વેષણ કેવી રીતે કામ કરે છે",
  "home.how.step1": "1. નાગરિક ક્રિયાપ્રતિક્રિયા",
  "home.how.step2": "2. AI વિશ્લેષણ",
  "home.how.step3": "3. જોખમ મૂલ્યાંકન",
  "home.how.step4": "4. પ્રતિભાવ અને ચેતવણીઓ",
  "home.how.step5": "5. સતત સુરક્ષા",
  "home.how.desc": "દરેક ક્રિયાપ્રતિક્રિયા એક સંરચિત કાર્યપ્રવાહને અનુસરે છે જે AI-સહાયિત સાયબર પ્રોટેક્શન, કટોકટી પ્રતિસાદ અને સાયબર ક્રાઇમ સત્તાવાળાઓ સાથેના સહયોગને જોડે છે.",
  "home.how.desc.step1": "વરિષ્ઠ નાગરિકો છેતરપિંડીની જાણ કરવા, કલ્યાણ ચેક-ઇન કરવા, શંકાસ્પદ સામગ્રીનું વિશ્લેષણ કરવા અથવા કટોકટી સહાય ટ્રિગર કરવા માટે એક સરળ બહુભાષી ઇન્ટરફેસ દ્વારા અંવેષણનો ઉપયોગ કરે છે.",
  "home.how.desc.step2": "ફિશિંગના પ્રયાસો, સ્કેમ સૂચકાંકો અને સંભવિત સાયબર જોખમોને ઓળખવા માટે સંદેશા, URL, સ્ક્રીનશોટ અને રિપોર્ટ કરેલી ઘટનાઓનું વિશ્લેષણ કરવામાં આવે છે.",
  "home.how.desc.step3": "યોગ્ય પ્રતિભાવ નક્કી કરવા માટે પ્લેટફોર્મ છેતરપિંડીની ગંભીરતા, વ્યવહારિક જોખમ, કટોકટી સ્તર અને સંદર્ભિત માહિતીનું મૂલ્યાંકન કરે છે.",
  "home.how.desc.step4": "કુટુંબના સભ્યો, સંભાળ રાખનારાઓ અને સાયબર ક્રાઇમ અધિકારીઓ સાથે પ્રાસંગિક ચેતવણીઓ તરત જ શેર કરવામાં આવે છે જ્યારે પુરાવા સુરક્ષિત રીતે સાચવવામાં આવે છે.",
  "home.how.desc.step5": "સમુદાય ગુપ્ત માહિતી, કલ્યાણ દેખરેખ, સ્કેમ જાગૃતિ અને છેતરપિંડી વિશ્લેષણ સતત નાગરિક સલામતી અને કાયદા અમલીકરણ પ્રતિભાવમાં સુધારો કરે છે.",

  // Home - Police Integration
  "home.police.title": "કાયદા અમલીકરણ એકીકરણ",
  "home.police.subtitle": "અમદાવાદ સાયબર ક્રાઇમ બ્રાન્ચ માટે બનાવેલ",
  "home.police.realTime": "રીઅલ-ટાઇમ ઘટના રિપોર્ટિંગ",
  "home.police.evidenceCollection": "ડિજિટલ પુરાવા સંગ્રહ",
  "home.police.gisIntelligence": "GIS અપરાધ ગુપ્તમાહિતી",
  "home.police.emergencyCoord": "કટોકટી સંકલન",
  "home.police.caseManagement": "કેસ વ્યવસ્થાપન",
  "home.police.decisionSupport": "નિર્ણય સમર્થન",
  "home.police.desc": "અંવેષણ વરિષ્ઠ નાગરિક સુરક્ષાને સંરચિત સાયબર ક્રાઇમ તપાસ વર્કફ્લો સાથે એકીકૃત કરવા માટે ડિઝાઇન કરવામાં આવ્યું છે.",
  "home.police.desc.realTime": "છેતરપિંડી રિપોર્ટ, SOS વિનંતીઓ અને કટોકટી ચેતવણીઓ ટાઇમસ્ટેમ્પ અને પ્રાથમિકતા સ્તરો સાથે સાયબર ક્રાઇમ અધિકારીઓને સુરક્ષિત રીતે મોકલવામાં આવે છે.",
  "home.police.desc.evidence": "સ્ક્રીનશોટ, કૌભાંડ સંદેશા, શંકાસ્પદ લિંક્સ, વોઇસ રેકોર્ડિંગ અને સહાયક ફાઇલો સંપૂર્ણ પુરાવા મેટાડેટા સાથે સુરક્ષિત રીતે સંગ્રહિત થાય છે.",
  "home.police.desc.gis": "છેતરપિંડીની ઘટનાઓ હોટસ્પોટ, ઉભરતા કૌભાંડ અભિયાનો અને પ્રાદેશિક ખતરા વલણો ઓળખવા માટે ઇન્ટરેક્ટિવ નકશા પર વિઝ્યુઅલાઇઝ કરવામાં આવે છે.",
  "home.police.desc.emergency": "ગંભીર પરિસ્થિતિઓ દરમિયાન સાયબર ક્રાઇમ શાખા, કટોકટી પ્રતિસાદકર્તાઓ અને પરિવારના સભ્યો વચ્ચે ઝડપી સંકલનને સમર્થન આપે છે.",
  "home.police.desc.case": "દરેક રિપોર્ટ કરેલ ઘટનાને તપાસ સ્થિતિ, અધિકારી સોંપણી અને પુરાવા ટાઇમલાઇન સાથે અનન્ય કેસ ID પ્રાપ્ત થાય છે.",
  "home.police.desc.decision": "AI-સહાયિત વિશ્લેષણ અધિકારીઓને કેસોને પ્રાથમિકતા આપવામાં, પુનરાવર્તિત છેતરપિંડી પેટર્ન ઓળખવામાં અને ઓપરેશનલ પ્રતિસાદ સુધારવામાં મદદ કરે છે.",

  // Home - Emergency Section
  "home.emergency.title": "કટોકટી પ્રતિભાવ",
  "home.emergency.subtitle": "જ્યારે દરેક સેકન્ડ મહત્વપૂર્ણ હોય ત્યારે ઝડપી સહાય",
  "home.emergency.oneTouchSOS": "એક-સ્પર્શ SOS",
  "home.emergency.voiceSOS": "વૉઇસ-સક્રિય SOS",
  "home.emergency.liveLocation": "લાઇવ સ્થાન શેરિંગ",
  "home.emergency.medicalSupport": "તબીબી કટોકટી સહાય",
  "home.emergency.familyNotifications": "કુટુંબ સૂચનાઓ",
  "home.emergency.offlineBackup": "ઑફલાઇન ચેતવણી બેકઅપ",
  "home.emergency.desc": "અંવેષણ સાયબર કટોકટી પ્રતિસાદ, તબીબી સહાય, કુટુંબ સંચાર અને કાયદા અમલીકરણ સંકલનને વરિષ્ઠ નાગરિકો માટે ડિઝાઇન કરેલ એકલ કટોકટી વ્યવસ્થાપન પ્રણાલીમાં જોડે છે.",
  "home.emergency.desc.oneTouch": "એક મોટું, વરિષ્ઠ-અનુકૂળ કટોકટી બટન તરત જ SOS વિનંતી શરૂ કરે છે અને વપરાશકર્તાના જીવંત સ્થાનને કટોકટી સંપર્કો અને સાયબર ક્રાઇમ અધિકારીઓ સાથે શેર કરે છે.",
  "home.emergency.desc.voice": "વરિષ્ઠ નાગરિકો એપ્લિકેશન નેવિગેટ કર્યા વિના સરળ બહુભાષી વોઇસ આદેશોનો ઉપયોગ કરીને કટોકટી સહાય ટ્રિગર કરી શકે છે.",
  "home.emergency.desc.location": "કટોકટી દરમિયાન, GPS કોઓર્ડિનેટ્સ અધિકૃત પરિવારના સભ્યો અને પ્રતિસાદ આપતા અધિકારીઓ સાથે ઘટના ઉકેલાય ત્યાં સુધી સતત શેર કરવામાં આવે છે.",
  "home.emergency.desc.medical": "દવા રીમાઇન્ડર, કલ્યાણ દેખરેખ અને કટોકટી તબીબી ચેતવણીઓ સ્વાસ્થ્ય સંબંધિત ઘટનાઓ દરમિયાન પ્રતિસાદ સમય ઘટાડવામાં મદદ કરે છે.",
  "home.emergency.desc.family": "પરિવારના સભ્યોને કેરગીવર પોર્ટલ દ્વારા કટોકટી ઘટનાઓ, કેસ અપડેટ્સ અને કલ્યાણ ચેતવણીઓ વિશે તાત્કાલિક સૂચનાઓ પ્રાપ્ત થાય છે.",
  "home.emergency.desc.offline": "જો ઇન્ટરનેટ કનેક્ટિવિટી અનુપલબ્ધ હોય, તો પ્લેટફોર્મ ગંભીર પરિસ્થિતિઓ માટે SMS-આધારિત કટોકટી સૂચનાઓને સમર્થન આપવા માટે ડિઝાઇન કરવામાં આવ્યું છે.",

  // Home - Community
  "home.community.title": "સામુદાયિક ગુપ્તમાહિતી",
  "home.community.subtitle": "સાયબર અપરાધ સામે સામૂહિક ગુપ્તમાહિતી",
  "home.community.crowdsourced": "ક્રાઉડસોર્સ્ડ કૌભાંડ રિપોર્ટિંગ",
  "home.community.heatmap": "સાયબર ખતરા હીટમેપ",
  "home.community.realTimeAlerts": "રીઅલ-ટાઇમ સામુદાયિક ચેતવણીઓ",
  "home.community.familyNetwork": "કુટુંબ સુરક્ષા નેટવર્ક",
  "home.community.aiThreat": "AI ખતરા ગુપ્તમાહિતી",
  "home.community.fraudAnalytics": "છેતરપિંડી વલણ વિશ્લેષણ",
  "home.community.desc": "દરેક ચકાસાયેલ રિપોર્ટ અંવેષણના શેર્ડ સાયબર ઇન્ટેલિજન્સ નેટવર્કને મજબૂત કરે છે, છેતરપિંડી વધુ ફેલાય તે પહેલાં અન્ય વરિષ્ઠ નાગરિકોનું રક્ષણ કરવામાં મદદ કરે છે.",
  "home.community.desc.crowdsourced": "નાગરિકો સામૂહિક સાયબર જાગૃતિ મજબૂત કરવા માટે અનામ રીતે કૌભાંડ કૉલ, ફિશિંગ લિંક્સ, નકલી રોકાણ યોજનાઓ અને શંકાસ્પદ સંદેશાઓની જાણ કરે છે.",
  "home.community.desc.heatmap": "રિપોર્ટ કરેલ ઘટનાઓ છેતરપિંડી હોટસ્પોટ, ઉભરતા કૌભાંડ અભિયાનો અને ઉચ્ચ-જોખમ વાળા વિસ્તારો ઓળખવા માટે ભૌગોલિક રીતે વિઝ્યુઅલાઇઝ કરવામાં આવે છે.",
  "home.community.desc.alerts": "જ્યારે ઘણા નાગરિકો સમાન કૌભાંડોની જાણ કરે છે, ત્યારે નજીકના વપરાશકર્તાઓને ભોગ બનતા પહેલા તાત્કાલિક ચેતવણીઓ પ્રાપ્ત થાય છે.",
  "home.community.desc.family": "પરિવારના સભ્યો શેર્ડ મોનિટરિંગ દ્વારા કલ્યાણ અપડેટ્સ, છેતરપિંડી રિપોર્ટ અને કટોકટી ઘટનાઓ વિશે જાણકાર રહે છે.",
  "home.community.desc.ai": "AI સમુદાય-જનિત રિપોર્ટ્સમાંથી પુનરાવર્તિત કૌભાંડ પેટર્ન, છેતરપિંડી વર્તણૂક અને ઉભરતા સાયબર ક્રાઇમ વલણો ઓળખે છે.",
  "home.community.desc.analytics": "અધિકારીઓ નિવારક પોલીસિંગ સુધારવા માટે મોસમી છેતરપિંડી વલણો, કૌભાંડ શ્રેણીઓ અને પ્રતિસાદ કામગીરીમાં આંતરદૃષ્ટિ મેળવે છે.",

  // Home - Footer CTA
  "home.cta.title": "ટેકનોલોજી દ્વારા દરેક વરિષ્ઠ નાગરિકનું રક્ષણ",
  "home.cta.desc": "અંવેષણ સાયબર છેતરપિંડી નિવારણ, કટોકટી પ્રતિસાદ, કુટુંબ કનેક્ટિવિટી, કલ્યાણ દેખરેખ અને સાયબર ક્રાઇમ બ્રાન્ચ એકીકરણને વરિષ્ઠ નાગરિકોની સુરક્ષા માટે ડિઝાઇન કરેલ એક એકીકૃત પ્લેટફોર્મમાં જોડે છે.",
  "home.cta.launch": "પ્લેટફોર્મ લોન્ચ કરો",
  "home.cta.learnMore": "વધુ જાણો",
  "home.cta.branch": "અમદાવાદ સાયબર ક્રાઇમ બ્રાન્ચ • ગુજરાત સરકાર",

  // Extra Footer strings
  "footer.credit": "આનાથી બનાવેલ: React, Tailwind CSS, Claude API, ઓપન-સોર્સ ML મોડલ્સ",
  "footer.cost": "કિંમત: MVP માટે ₹0, લાખો સુધી સ્કેલ",
},
};


const LanguageContext = createContext<
LanguageContextType | undefined
>(undefined);


export const LanguageProvider: React.FC<{
children: ReactNode;
}> = ({ children }) => {

const [language, setLanguageState] = useState<Language>(() => {

  const saved =
    localStorage.getItem("anweshan-language");

  if (
    saved === "en" ||
    saved === "hi" ||
    saved === "gu"
  ) {
    return saved;
  }

  return "en";
});


const setLanguage = (lang: Language) => {

  setLanguageState(lang);

  localStorage.setItem(
    "anweshan-language",
    lang
  );
};


const t = (key: string): string => {

  const current =
    translations[language] ??
    translations.en;

  return (
    current[key] ??
    translations.en[key] ??
    key
  );
};


useEffect(() => {

  const saved =
    localStorage.getItem("anweshan-language");


  if (
    saved === "en" ||
    saved === "hi" ||
    saved === "gu"
  ) {
    setLanguageState(saved);
  } else {

    setLanguageState("en");

    localStorage.setItem(
      "anweshan-language",
      "en"
    );
  }

}, []);


return (
  <LanguageContext.Provider
    value={{
      language,
      setLanguage,
      t,
    }}
  >
    {children}
  </LanguageContext.Provider>
);
};



export const useLanguage = () => {

const context =
  useContext(LanguageContext);


if (context === undefined) {

  throw new Error(
    "useLanguage must be used within a LanguageProvider"
  );

}

return context;
};
