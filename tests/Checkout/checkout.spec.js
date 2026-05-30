// tests/Checkout/checkout.spec.js

import { test, expect } from '@playwright/test';

import { CheckoutPage } from '../../Pages/CheckoutPage';

test.describe('Checkout / Order Service - DemoBlaze', () => {


test.use({
    storageState: 'auth.json'
});

let checkoutPage;

test.beforeEach(async ({ page }) => {

    checkoutPage = new CheckoutPage(page);

    await checkoutPage.goto();
});

const orderData = {
    name: 'Demo User',
    country: 'India',
    city: 'Hyderabad',
    card: '1234567890',
    month: 'June',
    year: '2026'
};

test.beforeEach(async ({ page }) => {

    await checkoutPage.openFirstProduct();

    page.once('dialog', async dialog => {

        await dialog.accept();
    });

    await checkoutPage.addProductToCart();

    await checkoutPage.openCart();
});

test('CHECKOUT_001 Verify Place Order button is visible', async () => {

    await expect(checkoutPage.placeOrderBtn)
        .toBeVisible();
});

test('CHECKOUT_002 Verify Place Order modal opens', async () => {

    await checkoutPage.clickPlaceOrder();

    await expect(checkoutPage.orderModal)
        .toBeVisible();
});

test('CHECKOUT_003 Verify Name field is visible', async () => {

    await checkoutPage.clickPlaceOrder();

    await expect(checkoutPage.nameInput)
        .toBeVisible();
});

test('CHECKOUT_004 Verify Country field is visible', async () => {

    await checkoutPage.clickPlaceOrder();

    await expect(checkoutPage.countryInput)
        .toBeVisible();
});

test('CHECKOUT_005 Verify City field is visible', async () => {

    await checkoutPage.clickPlaceOrder();

    await expect(checkoutPage.cityInput)
        .toBeVisible();
});

test('CHECKOUT_006 Verify Credit Card field is visible', async () => {

    await checkoutPage.clickPlaceOrder();

    await expect(checkoutPage.cardInput)
        .toBeVisible();
});

test('CHECKOUT_007 Verify Month field is visible', async () => {

    await checkoutPage.clickPlaceOrder();

    await expect(checkoutPage.monthInput)
        .toBeVisible();
});

test('CHECKOUT_008 Verify Year field is visible', async () => {

    await checkoutPage.clickPlaceOrder();

    await expect(checkoutPage.yearInput)
        .toBeVisible();
});

test('CHECKOUT_009 Verify Purchase button is visible', async () => {

    await checkoutPage.clickPlaceOrder();

    await expect(checkoutPage.purchaseBtn)
        .toBeVisible();
});

test('CHECKOUT_010 Verify order can be placed successfully', async () => {

    await checkoutPage.clickPlaceOrder();

    await checkoutPage.fillOrderDetails(orderData);

    await checkoutPage.purchaseOrder();

    await expect(checkoutPage.confirmationMessage)
        .toBeVisible();
});

test('CHECKOUT_011 Verify confirmation message after purchase', async () => {

    await checkoutPage.clickPlaceOrder();

    await checkoutPage.fillOrderDetails(orderData);

    await checkoutPage.purchaseOrder();

    await expect(checkoutPage.confirmationMessage)
        .toContainText('Thank you');
});

test('CHECKOUT_012 Verify OK button is visible after purchase', async () => {

    await checkoutPage.clickPlaceOrder();

    await checkoutPage.fillOrderDetails(orderData);

    await checkoutPage.purchaseOrder();

    await expect(checkoutPage.okBtn)
        .toBeVisible();
});

test('CHECKOUT_013 Verify order modal can be closed', async () => {

    await checkoutPage.clickPlaceOrder();

    await checkoutPage.closeOrderModal();

    await expect(checkoutPage.orderModal)
        .not.toBeVisible();
});

test('CHECKOUT_014 Verify purchase without mandatory details', async () => {

    await checkoutPage.clickPlaceOrder();

    await checkoutPage.purchaseOrder();

    await expect(checkoutPage.orderModal)
        .toBeVisible();
});

test('CHECKOUT_015 Verify confirmation popup closes successfully', async () => {

    await checkoutPage.clickPlaceOrder();

    await checkoutPage.fillOrderDetails(orderData);

    await checkoutPage.purchaseOrder();

    await checkoutPage.okBtn.click();

    await expect(checkoutPage.confirmationMessage)
        .not.toBeVisible();
});


});
