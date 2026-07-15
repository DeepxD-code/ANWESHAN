const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 600 });
  const page = await browser.newPage();

  console.log("=== STARTING INTERACTIVE ACTION TESTING (BUTTON CLICKS, FORMS, SOS) ===");

  try {
    // 1. Test Senior Portal SOS Click
    console.log("\n[1] Navigating to Senior Emergency Page...");
    await page.goto('http://localhost:8080/senior/emergency');
    await page.waitForTimeout(2000);

    console.log("Locating and clicking the giant SOS Emergency Button...");
    // The button has text "EMERGENCY SOS" (or translated equivalent). Let's target by class or flex button
    await page.click('button:has-text("SOS")');
    console.log("Checking if SOS changes to 'SOS ACTIVATED'...");
    await page.waitForTimeout(2000);
    const sosButtonText = await page.textContent('button:has(svg)');
    console.log(`SOS Button State: "${sosButtonText.trim()}"`);

    // 2. Test Family Escalation & Fraud Classification Submission
    console.log("\n[2] Navigating to Family Escalations Portal...");
    await page.goto('http://localhost:8080/family/escalations');
    await page.waitForTimeout(2000);

    console.log("Selecting 'UPI Refund Scam' from the message inbox list...");
    await page.click('div:has-text("won a lottery")');
    await page.waitForTimeout(1000);

    console.log("Selecting Scam Type Category dropdown...");
    await page.selectOption('select', 'UPI Refund Scam');
    await page.waitForTimeout(1000);

    // Listen for the window alert dialog
    page.once('dialog', async dialog => {
      console.log(`[PASS] Submitted Classification dialog alert: "${dialog.message()}"`);
      await dialog.accept();
    });

    console.log("Clicking 'Submit Official Report' button...");
    await page.click('button:has-text("Submit Official Report")');
    await page.waitForTimeout(2000);

    // 3. Test Officer Emergency Monitor interactions
    console.log("\n[3] Navigating to Officer Emergency Monitor...");
    await page.goto('http://localhost:8080/officer/emergency-monitor');
    await page.waitForTimeout(2000);

    console.log("Verifying active emergency status list...");
    const monitorContent = await page.textContent('h1');
    console.log(`Monitor Page Header: "${monitorContent.trim()}"`);

  } catch (error) {
    console.error("[FAIL] Interactive test encountered error:", error);
  } finally {
    console.log("\n=== INTERACTIVE ACTION TESTING COMPLETE ===");
    await page.waitForTimeout(3000);
    await browser.close();
  }
})();
