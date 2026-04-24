const playwright= require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');
const { Before,After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');


Before(async function () {
   const browser = await playwright.chromium.launch({headless: false});
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.poManager = new POManager(this.page);
});

BeforeStep(async function () {
  console.log("Before Step");
});

AfterStep(async function ({result}) {
  console.log("After Step");
  if(result.status === Status.FAILED){
    const screenshot = await this.page.screenshot({path: 'screenshot1.png'});
    
  }
});

After(async function () {
  console.log("Closing the browser");
});