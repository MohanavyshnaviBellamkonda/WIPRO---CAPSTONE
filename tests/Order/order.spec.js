import { test, expect } from '@playwright/test';

import { OrderPage } from '../../pages/OrderPage';

test.describe('Checkout / Order Service - DemoBlaze', () => {

    test.use({
        storageState: 'auth.json'
    });

    let orderPage;

    test.beforeEach(async ({ page }) => {

        orderPage = new OrderPage(page);

        await orderPage.goto();

        await orderPage.openFirstProduct();

        page.once('dialog', async dialog => {

            await dialog.accept();
        });

        await orderPage.addProductToCart();

        await orderPage.openCart();
    });

    const orderData = [
        {
            name: 'Satya',
            country: 'India',
            city: 'Hyderabad',
            card: '12345678',
            month: 'May',
            year: '2026'
        }
    ];

    test('ORDER_001 Verify Place Order button is visible', async () => {

        await expect(orderPage.placeOrderBtn)
            .toBeVisible();
    });

    test('ORDER_002 Verify order modal opens', async () => {

        await orderPage.clickPlaceOrder();

        await expect(orderPage.orderModal)
            .toBeVisible();
    });

    test('ORDER_003 Verify Name field accepts input', async () => {

        await orderPage.clickPlaceOrder();

        await orderPage.nameInput.fill('Satya');

        await expect(orderPage.nameInput)
            .toHaveValue('Satya');
    });

    test('ORDER_004 Verify Country field accepts input', async () => {

        await orderPage.clickPlaceOrder();

        await orderPage.countryInput.fill('India');

        await expect(orderPage.countryInput)
            .toHaveValue('India');
    });

    test('ORDER_005 Verify City field accepts input', async () => {

        await orderPage.clickPlaceOrder();

        await orderPage.cityInput.fill('Hyderabad');

        await expect(orderPage.cityInput)
            .toHaveValue('Hyderabad');
    });

    test('ORDER_006 Verify Credit Card field accepts input', async () => {

        await orderPage.clickPlaceOrder();

        await orderPage.cardInput.fill('12345678');

        await expect(orderPage.cardInput)
            .toHaveValue('12345678');
    });

    test('ORDER_007 Verify Month field accepts input', async () => {

        await orderPage.clickPlaceOrder();

        await orderPage.monthInput.fill('May');

        await expect(orderPage.monthInput)
            .toHaveValue('May');
    });

    test('ORDER_008 Verify Year field accepts input', async () => {

        await orderPage.clickPlaceOrder();

        await orderPage.yearInput.fill('2026');

        await expect(orderPage.yearInput)
            .toHaveValue('2026');
    });

    test('ORDER_009 Verify purchase with valid details', async () => {

        test.slow();

        await test.step('Open order modal', async () => {

            await orderPage.clickPlaceOrder();
        });

        await test.step('Fill order details', async () => {

            await orderPage.fillOrderDetails(
                'Satya',
                'India',
                'Hyderabad',
                '12345678',
                'May',
                '2026'
            );
        });

        await test.step('Complete purchase', async () => {

            await orderPage.purchaseOrder();
        });

        await expect(orderPage.confirmationMsg)
            .toBeVisible();
    });

    test('ORDER_010 Verify confirmation message after purchase', async () => {

        await orderPage.clickPlaceOrder();

        await orderPage.fillOrderDetails(
            'Satya',
            'India',
            'Hyderabad',
            '12345678',
            'May',
            '2026'
        );

        await orderPage.purchaseOrder();

        await expect.soft(orderPage.confirmationMsg)
            .toContainText('Thank you');
    });

    test('ORDER_011 Verify OK button closes confirmation popup', async () => {

        await orderPage.clickPlaceOrder();

        await orderPage.fillOrderDetails(
            'Satya',
            'India',
            'Hyderabad',
            '12345678',
            'May',
            '2026'
        );

        await orderPage.purchaseOrder();

        await orderPage.okBtn.click();
    });

    test('ORDER_012 Verify order modal close button', async () => {

        await orderPage.clickPlaceOrder();

        await orderPage.closeBtn.click();
    });

    test('ORDER_013 Verify cart page URL before checkout', async ({ page }) => {

        await expect(page)
            .toHaveURL(/cart.html/);
    });

    test('ORDER_014 Verify purchase button visibility', async () => {

        await orderPage.clickPlaceOrder();

        await expect(orderPage.purchaseBtn)
            .toBeVisible();
    });

    test('ORDER_015 Verify order modal fields are visible', async () => {

        await orderPage.clickPlaceOrder();

        await expect(orderPage.nameInput)
            .toBeVisible();

        await expect(orderPage.countryInput)
            .toBeVisible();

        await expect(orderPage.cityInput)
            .toBeVisible();

        await expect(orderPage.cardInput)
            .toBeVisible();
    });
});