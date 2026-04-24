import { test, expect, request } from '@playwright/test';
import { count } from 'node:console';
import { create } from 'node:domain';
const { APIUtils } = require("../utils/APIUtils");
const loginPayload = {
  userEmail: "meghaagarwal2005@gmail.com",
  userPassword: "Password-1"
};
const orderPayload = {
  orders: [
    { country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }
  ]
};
let response;


test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);


});

test("Page test case", async ({ page }) => {


  await page.addInitScript(value => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {
    const response = await page.request.fetch(route.request());
    route.fulfill({
      response,
      body: JSON.stringify({ data: [], message: "No orders" })
    })
  });

  await page.pause();
  await page.locator("button[routerlink='/dashboard/myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
  console.log(await page.locator(".mt-4").textContent());

  await page.pause();

});