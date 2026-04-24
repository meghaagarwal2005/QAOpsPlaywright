
import{test,expect} from '@playwright/test';
import { customTest } from '../utils_ts/test-base';
import { POManager } from '../pageobjects_ts/POManager';

const testData = JSON.parse(JSON.stringify(require('../utils_ts/placeorderTestData.json')));

for (const data of testData) {
  test(`@Web Place order for ${data.productName}`, async ({ page }) => {
    const productName = data.productName;
    const email = data.username;
    const password = data.password;
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const products = page.locator(".card-body");

    await loginPage.goTo();
    await loginPage.validLogin(email, password);


    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();

    await page.waitForLoadState("networkidle");
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    let orderId:any
    orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    //await page.pause();

  }) 
}

customTest(`Place order with Fixture`, async ({ page, testDateForOrder }) => {
    const productName = testDateForOrder.productName;
    const email = testDateForOrder.username;
    const password = testDateForOrder.password;
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    const products = page.locator(".card-body");

    await loginPage.goTo();
    await loginPage.validLogin(email, password);


    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();

    await page.waitForLoadState("networkidle");
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});