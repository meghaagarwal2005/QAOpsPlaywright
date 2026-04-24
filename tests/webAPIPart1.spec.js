import { test, expect ,request} from '@playwright/test';
import { count } from 'node:console';
import { create } from 'node:domain';
const { APIUtils } = require("../utils/APIUtils");
  const loginPayload = {
    userEmail: "meghaagarwal2005@gmail.com",
    userPassword: "Password-1"
  };
const orderPayload = {
        orders: [
          {country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}
        ]
      };
let response;


test.beforeAll(async ()=>{
    const apiContext= await request.newContext();
    const apiUtils =new APIUtils(apiContext,loginPayload);
    response=await apiUtils.createOrder(orderPayload);

    
});

test("@API Place the order", async ({ page }) => {

   
  await page.addInitScript(value=>{
    window.localStorage.setItem("token",value);
  },response.token);
   await page.goto("https://rahulshettyacademy.com/client");  
  await page.locator("button[routerlink='/dashboard/myorders']").click();
  await page.locator("tbody").waitFor();
  const rows= await page.locator("tbody tr");
  for(let i=0;i<await rows.count();i++)
  {
  const orderId1=await rows.nth(i).locator("th").textContent();
  if(response.orderId.includes(orderId1))
  {
    await rows.nth(i).locator("button").first().click();
    break;
  }
  }
  const orderIdDetails= await page.locator(".col-text").first().textContent();
  await page.pause();
  expect(response.orderId.trim()).toContain(orderIdDetails.trim());
  //await page.pause();

});