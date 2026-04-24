import { test as baseTest} from '@playwright/test';
interface TestDataForOrder
{
    username:string;
    password:string;
    productName:string;
}

export const customTest = baseTest.extend<{
  testDateForOrder: TestDataForOrder;
}>({
  testDateForOrder: {
    username: 'meghaagarwal2005@gmail.com',
    password: 'Password-1',
    productName: 'ADIDAS ORIGINAL'
  }
});