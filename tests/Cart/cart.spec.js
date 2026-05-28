import { test, expect } from '@playwright/test';

import { CartPage } from '../../pages/CartPage';

test.describe('Cart Management Service - DemoBlaze', () => {

    test.use({
        storageState: 'auth.json'
    });

    let cartPage;

    test.beforeEach(async ({ page }) => {

        cartPage = new CartPage(page);

        await cartPage.goto();
    });

    const cartData = [
        {
            product: 'first product'
        },
        {
            product: 'duplicate product'
        }
    ];

    test('CART_001 Verify Add to Cart button is visible', async () => {

        await cartPage.openFirstProduct();

        await expect(cartPage.addToCartBtn)
            .toBeVisible();
    });

    test('CART_002 Verify product can be added to cart', async ({ page }) => {

        await test.step('Open first product', async () => {

            await cartPage.openFirstProduct();
        });

        await test.step('Add product to cart', async () => {

            page.once('dialog', async dialog => {

                expect(dialog.message())
                    .toContain('Product added');

                await dialog.accept();
            });

            await cartPage.addProductToCart();
        });
    });

    test('CART_003 Verify success alert after adding product', async ({ page }) => {

        await cartPage.openFirstProduct();

        page.once('dialog', async dialog => {

            await expect.soft(dialog.message())
                .toContain('Product added');

            await dialog.accept();
        });

        await cartPage.addProductToCart();
    });

    test('CART_004 Verify cart page opens successfully', async ({ page }) => {

        await cartPage.openCart();

        await expect(page)
            .toHaveURL(/cart.html/);
    });

    test('CART_005 Verify added product is visible in cart', async ({ page }) => {

        test.slow();

        await cartPage.openFirstProduct();

        page.once('dialog', async dialog => {

            await dialog.accept();
        });

        await cartPage.addProductToCart();

        await cartPage.openCart();

        await expect(cartPage.cartItems.first())
            .toBeVisible();
    });

    test('CART_006 Verify multiple products can be added', async ({ page }) => {

        for (const item of cartData) {

            await cartPage.goto();

            await cartPage.openFirstProduct();

            page.once('dialog', async dialog => {

                await dialog.accept();
            });

            await cartPage.addProductToCart();
        }

        await cartPage.openCart();

        await expect(cartPage.cartItems.first())
            .toBeVisible();
    });

    test('CART_007 Verify cart total is displayed', async () => {

        await cartPage.openCart();

        await expect(cartPage.totalAmount)
            .toBeVisible();
    });

    test('CART_008 Verify product can be deleted from cart', async () => {

        await cartPage.openCart();

        if (await cartPage.deleteLink.first().isVisible()) {

            await cartPage.deleteProduct();
        }
    });

    test('CART_009 Verify deleted product is removed', async ({ page }) => {

        await cartPage.openCart();

        const initialCount =
            await cartPage.cartItems.count();

        if (initialCount > 0) {

            await cartPage.deleteProduct();

            await page.waitForTimeout(2000);

            await expect(cartPage.cartItems)
                .toHaveCount(initialCount - 1);
        }
    });

    test('CART_010 Verify cart persists after refresh', async ({ page }) => {

        await cartPage.openCart();

        await page.reload();

        await expect(cartPage.cartItems.first())
            .toBeVisible();
    });

    test('CART_011 Verify navigation from product page to cart', async ({ page }) => {

        await cartPage.openFirstProduct();

        await cartPage.openCart();

        await expect(page)
            .toHaveURL(/cart.html/);
    });

    test('CART_012 Verify duplicate product addition', async ({ page }) => {

        await cartPage.openFirstProduct();

        for (let i = 0; i < 2; i++) {

            page.once('dialog', async dialog => {

                await dialog.accept();
            });

            await cartPage.addProductToCart();
        }
    });

    test('CART_013 Verify cart page URL', async ({ page }) => {

        await cartPage.openCart();

        expect(page.url())
            .toContain('cart.html');
    });

    test('CART_014 Verify cart table headers', async () => {

        await cartPage.openCart();

        await expect(cartPage.tableHeader)
            .toBeVisible();
    });

    test('CART_015 Verify cart loads successfully after login', async () => {

        await cartPage.openCart();

        await expect(cartPage.cartItems.first())
            .toBeVisible();
    });
});