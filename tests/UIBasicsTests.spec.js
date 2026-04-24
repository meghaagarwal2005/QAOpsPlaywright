import { test, expect } from '@playwright/test';

test("First test case", async ({ browser }) => {
    
  const context = await browser.newContext();
  const page = await context.newPage();
  const username = page.locator("input#username");
  const cardtitles = page.locator(".card-body a");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await username.fill("Rahul");
  await page.locator("[type=password]").fill("Learning@830$3mK2");
   await page.locator("#signInBtn").click();
   console.log(await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
await username.fill("");
   await username.fill("rahulshettyacademy");
   await page.locator("#terms").click();
   await page.locator("#signInBtn").click();
   console.log(await cardtitles.first().textContent());
   console.log(await cardtitles.nth(1).textContent());
   const allTitles= await cardtitles.allTextContents();
   console.log(allTitles);
});

test("@Web UI controls", async ({ browser }) => {
    
  const context = await browser.newContext();
  const page = await context.newPage();
  page.route('**/*.{png,jpg,jpeg}', route => route.abort());
  const username = page.locator("input#username");
  const cardtitles = page.locator(".card-body a");
  page.on("request", request => console.log(request.url()));
  page.on("response", response => console.log(response.url(), response.status()));
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await username.fill("rahulshettyacademy");
  await page.locator("[type=password]").fill("Learning@830$3mK2");
  await page.locator("#terms").click();
  await page.locator("[data-style='btn-info']").selectOption("consult");
   await page.locator("label.customradio").nth(1).click();
   await expect (page.locator("label.customradio").nth(1)).toBeChecked();
   await page.locator("#okayBtn").click();
   console.log(await page.locator("label.customradio").nth(1).isChecked());
   await page.locator("#terms").uncheck();
   expect (await page.locator("#terms").isChecked()).toBeFalsy();
   await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class","blinkingText");
   await page.locator("#signInBtn").click();
   //await page.pause();

   
  
});

test("Page test case", async ({ page }) => {
  await page.goto("https://google.com");
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});

test("Child window handling", async ({ browser }) => {
    let text;

    const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink=page.locator("[href*='documents-request']");

  const [newPage]= await Promise.all([context.waitForEvent('page'),documentLink.click()])

  text = await newPage.locator(".red").textContent();
  const array=text.split("@");
  const email= array[1].split(" ")[0];
  console.log(email);

  const username = page.locator("input#username");
  await page.locator("input#username").fill(email);
   console.log("The locator is"+ await page.locator("input#username").textContent());
  console.log("The input locator is"+ await page.locator("input#username").inputValue());
  //await page.pause();


});
