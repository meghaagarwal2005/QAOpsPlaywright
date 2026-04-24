import { test, expect, request } from '@playwright/test';

test("Security test", async ({ page }) => {
  const productName = "ZARA COAT 3";
  const email = "meghaagarwal2005@gmail.com";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  console.log(await page.title());
  await page.locator("#userEmail").fill("meghaagarwal2005@gmail.com");
  await page.locator("#userPassword").fill("Password-1");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  await page.locator("button[routerlink='/dashboard/myorders']").click();
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=1234" }));
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
  await page.pause();
});



