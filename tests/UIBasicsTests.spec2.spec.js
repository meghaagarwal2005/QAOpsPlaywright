import { test, expect } from '@playwright/test';


test.skip("Page test case", async ({ page }) => {
  const productName="ZARA COAT 3";
  const email="meghaagarwal2005@gmail.com";
  const products =page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  console.log(await page.title());
  await page.locator("#userEmail").fill("meghaagarwal2005@gmail.com");
  await page.locator("#userPassword").fill("Password-1");
  await page.locator("#login").click();
  await page.waitForLoadState("networkidle");
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

test("Page Another test case", async ({ page }) => {
  const productName="ZARA COAT 3";
  const email="meghaagarwal2005@gmail.com";
  const products =page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");

  console.log(await page.title());
  await page.getByPlaceholder("email@example.com").fill("meghaagarwal2005@gmail.com");
  await page.getByPlaceholder("enter your passsword").fill("Password-1");
  await page.getByRole("button",{name:'Login'}).click();
  await page.waitForLoadState("networkidle");
   await page.locator(".card-body b").first().waitFor();
  
  await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click();
  
  await page.getByRole("listitem").getByRole("button",{name:'Cart'}).click();
  
  await page.waitForLoadState("networkidle");
  await page.locator("div li").first().waitFor();
  await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  await page.getByRole("button",{name:"Checkout"}).click();
  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  await page.getByRole("button",{name:"India"}).nth(1).click();
  await page.getByText("PLACE ORDER").click();
  await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

});

test("Playwright special", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").click();
       await page.getByLabel("Gender").selectOption("Male");
       await page.getByPlaceholder("Password").fill("Test");
       await page.getByRole("button",{name:"Submit"}).click();
       await page.getByText("Success! The Form has been submitted successfully!.").click();
       await page.getByRole("link",{name:"Shop"}).click();
       await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click();
});