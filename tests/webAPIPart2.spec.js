import { test, expect } from '@playwright/test';
let webContext;

test.beforeAll(async ({browser})=>{
    const context= await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
  console.log(await page.title());
  await page.locator("#userEmail").fill("meghaagarwal2005@gmail.com");
  await page.locator("#userPassword").fill("Password-1");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
  await context.storageState({path:"state.json"});
  webContext=await browser.newContext({storageState:"state.json"});
})

test("Page test case", async () => {
  const productName="ZARA COAT 3";
  const email="meghaagarwal2005@gmail.com";
  
  const page= await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const products =page.locator(".card-body");
  
   await page.locator(".card-body b").first().waitFor();
  const titles= await page.locator(".card-body b").allTextContents();
  console.log("The titles are:"+ titles);
  const count= await products.count();
  for(let i=0;i<count;i++)
  {
    if(await products.nth(i).locator("b").textContent()=== productName)
    {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink='/dashboard/cart']").click();
  await page.waitForLoadState("networkidle");
  await page.locator("div li").first().waitFor();
  const bool=await page.locator("h3:has-text('"+productName+"')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click();
  await page.locator("[placeholder*=Country]").pressSequentially("ind");
  const options= page.locator(".ta-results");
  await options.waitFor();
  const optionCount=await options.locator("button").count();
  console.log("The count is:"+ optionCount);
  for(let i=0;i<optionCount;i++)
  {
    let text= await options.locator("button").nth(i).textContent();
    console.log("The text is:"+ i+ text);
    if(text.trim()==="India")
    {
      options.locator("button").nth(i).click();
      break;
    }

  }
  expect(page.locator(".user__name label")).toHaveText(email);
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);
  await page.locator("button[routerlink='/dashboard/myorders']").click();
  await page.locator("tbody").waitFor();
  const rows= await page.locator("tbody tr");
  for(let i=0;i<await rows.count();i++)
  {
  const orderId1=await rows.nth(i).locator("th").textContent();
  if(orderId.includes(orderId1))
  {
    await rows.nth(i).locator("button").first().click();
    break;
  }
  }
  const orderIdDetails= await page.locator(".col-text").first().textContent();
  expect(orderId.trim()).toContain(orderIdDetails.trim());
  //await page.pause();

});


test("@API Page test case 2", async () => {
  const productName="ZARA COAT 3";
  const email="meghaagarwal2005@gmail.com";
  
  const page= await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const products =page.locator(".card-body");
  
   await page.locator(".card-body b").first().waitFor();
  const titles= await page.locator(".card-body b").allTextContents();
  console.log("The titles are:"+ titles);
});