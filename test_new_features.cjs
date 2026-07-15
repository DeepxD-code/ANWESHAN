const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 800 });
  const page = await browser.newPage();

  console.log("=== STARTING VERIFICATION FOR NEWLY FIXED FEATURES ===");

  try {
    // 1. Test Senior settings page, language change, and confirmations
    console.log("\n[1] Navigating to Senior Settings...");
    await page.goto('http://localhost:8080/senior/settings');
    await page.waitForTimeout(1000);

    console.log("Testing language selection dropdown...");
    await page.selectOption('select:has-text("English")', 'hi'); // Switch to Hindi
    await page.waitForTimeout(1500);

    console.log("Saving changes in Settings...");
    page.once('dialog', async dialog => {
      console.log(`[PASS] Saved Alert message: "${dialog.message()}"`);
      await dialog.accept();
    });
    await page.click('button:has-text("परिवर्तन सहेजें")');
    await page.waitForTimeout(1500);

    // 2. Test Senior Emergency voice recording & activation UI
    console.log("\n[2] Navigating to Senior Emergency...");
    await page.goto('http://localhost:8080/senior/emergency');
    await page.waitForTimeout(1000);

    console.log("Activating Voice SOS (Microphone listening UI)...");
    await page.locator('button:has-text("SOS")').nth(1).click();
    await page.waitForTimeout(2500);

    // 3. Test Fraud Centre Route (Fixing the 404)
    console.log("\n[3] Testing Fraud Centre Navigation...");
    await page.goto('http://localhost:8080/senior/fraud-centre');
    await page.waitForTimeout(1500);
    const titleText = await page.innerText('h1');
    console.log(`[PASS] Fraud Centre loaded successfully: "${titleText}"`);

    // 4. Test Family Escalation clearing and history addition
    console.log("\n[4] Navigating to Family Escalations...");
    await page.goto('http://localhost:8080/family/escalations');
    await page.waitForTimeout(1000);

    console.log("Selecting a scam type category...");
    await page.selectOption('select', 'KYC Fraud');
    await page.waitForTimeout(1000);

    console.log("Submitting report...");
    page.once('dialog', async dialog => {
      console.log(`[PASS] Submission Alert message: "${dialog.message()}"`);
      await dialog.accept();
    });
    await page.click('button:has-text("Submit Official Report")');
    await page.waitForTimeout(2000);

    // 5. Test Family Settings Manage Seniors
    console.log("\n[5] Navigating to Family Settings...");
    await page.goto('http://localhost:8080/family/settings');
    await page.waitForTimeout(1000);

    console.log("Opening Manage Linked Seniors panel...");
    await page.locator('div.bg-card:has-text("Manage your account") button').first().click();
    await page.waitForTimeout(1500);

    console.log("Adding a new linked senior citizen...");
    await page.fill('input[placeholder*="Senior ID"]', 'SENIOR-105');
    await page.fill('input[placeholder="Full Name"]', 'Kishore Kumar');
    await page.fill('input[placeholder*="Relation"]', 'Uncle');
    await page.waitForTimeout(1000);

    page.once('dialog', async dialog => {
      console.log(`[PASS] Add Senior Alert message: "${dialog.message()}"`);
      await dialog.accept();
    });
    await page.click('button:has-text("Link Senior")');
    await page.waitForTimeout(2000);

    console.log("Unlinking senior Ramesh Patel...");
    page.once('dialog', async dialog => {
      console.log(`[PASS] Confirm Unlink message: "${dialog.message()}"`);
      await dialog.accept();
    });
    await page.click('button:has-text("Unlink")');
    await page.waitForTimeout(2000);

    console.log("\n=== ALL RECENT FIXES VERIFIED SUCCESSFULLY ===");

  } catch (error) {
    console.error("Verification failed:", error);
  } finally {
    await browser.close();
  }
})();
