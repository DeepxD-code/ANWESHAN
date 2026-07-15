const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 400 }); // slowMo so the user can easily follow along
  const page = await browser.newPage();

  console.log("=== STARTING FULL APPLICATION TAB AND PORTAL TESTING ===");

  const testPage = async (url, expectedHeading) => {
    console.log(`\nNavigating to: ${url}`);
    await page.goto(url);
    await page.waitForTimeout(1000);
    
    // Quick check to ensure page rendered and isn't a white screen
    const content = await page.content();
    if (content.includes("Something went wrong") || content.includes("404") || content.length < 500) {
      console.log(`[FAIL] Route failed or blank: ${url}`);
    } else {
      console.log(`[PASS] Rendered successfully: ${url}`);
    }
  };

  try {
    // 1. PUBLIC PAGES
    console.log("\n--- TESTING PUBLIC ROUTES ---");
    await testPage('http://localhost:8080/', 'ANWESHAN');
    await testPage('http://localhost:8080/learn', 'Learn');
    await testPage('http://localhost:8080/simulate', 'Simulation');
    await testPage('http://localhost:8080/results', 'Dashboard');
    await testPage('http://localhost:8080/link-checker', 'Analyzer');
    await testPage('http://localhost:8080/contact', 'Contact');

    // 2. SENIOR PORTAL
    console.log("\n--- TESTING SENIOR PORTAL ---");
    await testPage('http://localhost:8080/senior/dashboard', 'Dashboard');
    await testPage('http://localhost:8080/senior/emergency', 'Emergency');
    await testPage('http://localhost:8080/senior/health-welfare', 'Health');
    await testPage('http://localhost:8080/senior/community-alerts', 'Alerts');
    await testPage('http://localhost:8080/senior/settings', 'Settings');

    // 3. FAMILY PORTAL
    console.log("\n--- TESTING FAMILY PORTAL ---");
    await testPage('http://localhost:8080/family/dashboard', 'Dashboard');
    await testPage('http://localhost:8080/family/alerts', 'Alerts');
    await testPage('http://localhost:8080/family/seniors', 'Seniors');
    await testPage('http://localhost:8080/family/settings', 'Settings');
    await testPage('http://localhost:8080/family/escalations', 'Escalations');

    // 4. OFFICER PORTAL
    console.log("\n--- TESTING OFFICER PORTAL ---");
    await testPage('http://localhost:8080/officer/dashboard', 'Dashboard');
    await testPage('http://localhost:8080/officer/complaints', 'Complaints');
    await testPage('http://localhost:8080/officer/cases', 'Cases');
    await testPage('http://localhost:8080/officer/evidence', 'Evidence');
    await testPage('http://localhost:8080/officer/emergency-monitor', 'Monitor');
    await testPage('http://localhost:8080/officer/analytics', 'Analytics');

    // 5. ADMIN PORTAL
    console.log("\n--- TESTING ADMIN PORTAL ---");
    await testPage('http://localhost:8080/admin/dashboard', 'Dashboard');
    await testPage('http://localhost:8080/admin/users', 'Users');
    await testPage('http://localhost:8080/admin/analytics', 'Analytics');
    await testPage('http://localhost:8080/admin/settings', 'Settings');

  } catch (error) {
    console.error("[FAIL] E2E traversal crashed:", error);
  } finally {
    console.log("\n=== FULL APPLICATION TRAVERSAL COMPLETE ===");
    await page.waitForTimeout(3000);
    await browser.close();
  }
})();
