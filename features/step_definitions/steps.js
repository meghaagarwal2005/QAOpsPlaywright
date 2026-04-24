const { When, Then, Given } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test')
const playwright = require('@playwright/test');

Given('a login to Ecommerce application with {string} and {string}', { timeout: 60000 }, async function (username, password) {



  const loginPage = this.poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(username, password);

});

When('add {string} to cart', async function (productName) {
  this.dashboardPage = this.poManager.getDashboardPage();
  await this.dashboardPage.searchProductAddCart(productName);
  await this.dashboardPage.navigateToCart()
});

Then('verify {string} is displayed in the cart', async function (productName) {
  const cartPage = this.poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();
});

When('enter valid details and place the order', async function () {
  const ordersReviewPage = this.poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(this.orderId);
});

Then('verify order is present in the OrderHistory', async function () {
  await this.dashboardPage.navigateToOrders();
  const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(this.orderId);
  expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});

Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await this.page.locator("[type='text']").fill(username);
  await this.page.locator("[type='password']").fill(password);
  await this.page.locator("#signInBtn").click();
});

Then('verify error message is displayed for invalid product in the cart', async function () {
  console.log(await this.page.locator("[style*='block']").textContent());
  await expect(this.page.locator("[style*='block']")).toContainText("Incorrect username/password.");
});

