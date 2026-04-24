import { Locator, Page } from "@playwright/test";

let message1: string = "Hello, World!";
message1="Welcome to TypeScript!";
let age1: number = 20;
let isActive: boolean = false;
let numbers1: number[] = [1, 2, 3, 4, 5];
let data: any = "This can be any type";
data = 42;
console.log(message1);
console.log(age1);
console.log(isActive);
console.log(numbers1);
function add(a: number, b: number): number {
    return a + b;
}
add(5, 10);
let user: { name: string; age: number } = { name: "Alice", age: 30 };
console.log(user);
class CartPage
{
    page:Page;
    cartProducts:Locator;
    productsText:Locator;
    cart:Locator;
    orders:Locator;
    checkout:Locator;   
constructor(page: Page)
{
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}
}