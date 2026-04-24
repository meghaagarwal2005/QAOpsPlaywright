import { test, expect } from '@playwright/test';
test.describe.configure({mode:"serial"});
test("Pop up", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    console.log("Reached pause");

    //await page.pause();

    page.on("dialog",dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const framepage=page.frameLocator("#courses-iframe");
    await framepage.locator("li a[href*='lifetime-access']:visible").click();
    const check=await framepage.locator(".text h2").textContent();
    console.log(check.split(" ")[1]);
   
  
});

test("Screenshot and visual comparison", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({ path: "element-screenshot.png" });
    await page.locator("#hide-textbox").click();
    await page.screenshot({ path: "screenshot.png", fullPage: true });
    await expect(page.locator("#displayed-text")).toBeHidden();
    
   
  
});

test("Visual", async ({ page }) => {
    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot("google.png");
   
});