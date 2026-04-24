const { test: base } = require('@playwright/test');

exports.customtest = base.extend({
  testDateForOrder: {
    username: 'meghaagarwal2005@gmail.com',
    password: 'Password-1',
    productName: 'ADIDAS ORIGINAL'
  }
});