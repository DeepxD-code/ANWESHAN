const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log("=== STARTING FRONTEND & ML END-TO-END VERIFICATION ===");

  try {
    // 1. Test Senior Dashboard Alert Flow
    console.log("\n[1] Navigating to Senior Dashboard...");
    await page.goto('http://localhost:8080/senior/dashboard');
    await page.waitForTimeout(2000);

    // Capture dialog/alert event
    page.once('dialog', async dialog => {
      console.log(`[PASS] Alert Dialog appeared: "${dialog.message()}"`);
      await dialog.accept();
    });

    console.log("Clicking 'Flag as Suspicious' button...");
    await page.click('button:has-text("Flag as Suspicious")');
    await page.waitForTimeout(1000);

    // 2. Test Family Escalations Portal
    console.log("\n[2] Navigating to Family Escalations Portal...");
    await page.goto('http://localhost:8080/family/escalations');
    await page.waitForTimeout(2000);

    const flaggedHeader = await page.textContent('h2:has-text("Flagged Messages")');
    console.log(`[PASS] Found column: "${flaggedHeader.trim()}"`);

    const classificationHeader = await page.textContent('h2:has-text("Classify & Report")');
    console.log(`[PASS] Found column: "${classificationHeader.trim()}"`);

    // 3. Test Link Checker with PayPal (Legitimate)
    console.log("\n[3] Testing Link Checker with 'paypal.com'...");
    // Type URL
    await page.fill('textarea', 'paypal.com');
    // Click Analyze
    await page.click('button:has-text("Analyze")');
    // Wait for analysis to complete (loading steps finish)
    await page.waitForSelector('p:has-text("risk score")', { timeout: 15000 });
    await page.waitForTimeout(2000);

    const riskScore = await page.textContent('.text-4xl.font-bold');
    const riskBadge = await page.textContent('.inline-flex.items-center span');
    console.log(`[RESULT] paypal.com -> Score: ${riskScore.trim()} | Level: ${riskBadge.trim()}`);

    // 4. Test Link Checker with Paypai (Typosquatted)
    console.log("\n[4] Testing Link Checker with 'paypai.com'...");
    await page.fill('textarea', 'paypai.com');
    await page.click('button:has-text("Analyze")');
    await page.waitForSelector('p:has-text("risk score")', { timeout: 15000 });
    await page.waitForTimeout(2000);

    const riskScore2 = await page.textContent('.text-4xl.font-bold');
    const riskBadge2 = await page.textContent('.inline-flex.items-center');
    const classification = await page.textContent('li:has-text("Scam Classification")');
    console.log(`[RESULT] paypai.com -> Score: ${riskScore2.trim()} | Level: ${riskBadge2.trim()}`);
    console.log(`[RESULT] Classification text: "${classification.trim()}"`);

  } catch (error) {
    console.error("[FAIL] Verification failed with error:", error);
  } finally {
    await browser.close();
    console.log("\n=== VERIFICATION COMPLETE ===");
  }
})();
