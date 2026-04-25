import { test, expect } from '@playwright/test';
test("Calender", async ({ page }) => {
    const month="6";
    const day="7";
    const year="2027";
    const ex=[month,day,year];//
    //Calender Validation 
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    await page.locator("//abbr[text()='"+day+"']").click();
    const inputa=page.locator(".react-date-picker__inputGroup__input");
    for (let i=0;i<3;i++)
    {
        let a =await inputa.nth(i).inputValue();
        expect(a).toEqual(ex[i]);
    }
  
});