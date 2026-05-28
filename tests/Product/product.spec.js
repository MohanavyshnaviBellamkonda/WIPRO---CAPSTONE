import { test, expect } from '@playwright/test';

import { ProductPage } from '../../pages/ProductPage';

test.describe('Product Catalog Service - DemoBlaze', () => {

    let productPage;

    test.beforeEach(async ({ page }) => {

        productPage = new ProductPage(page);

        await productPage.goto();
    });

    test('PROD_001 Verify homepage products are visible', async () => {

        await expect(productPage.productCards.first())
            .toBeVisible();
    });

    test('PROD_002 Verify product cards are displayed', async () => {

        await expect(productPage.productCards)
            .toHaveCount(9);
    });

    test('PROD_003 Verify product image is visible', async () => {

        await expect(productPage.productImage)
            .toBeVisible();
    });

    test('PROD_004 Verify product title is visible', async () => {

        await expect(productPage.productTitle)
            .toBeVisible();
    });

    test('PROD_005 Verify product price is visible', async () => {

        await expect(productPage.productPrice)
            .toBeVisible();
    });

    test('PROD_006 Verify clicking product opens product details page', async ({ page }) => {

        await productPage.openFirstProduct();

        await expect(page)
            .toHaveURL(/prod.html/);
    });

    test('PROD_007 Verify product description is displayed', async () => {

        await productPage.openFirstProduct();

        await expect(productPage.productDescription)
            .toBeVisible();
    });

    test('PROD_008 Verify Phones category filter works', async () => {

        await productPage.selectPhonesCategory();

        await expect(productPage.productCards.first())
            .toBeVisible();
    });

    test('PROD_009 Verify Laptops category filter works', async () => {

        await productPage.selectLaptopsCategory();

        await expect(productPage.productCards.first())
            .toBeVisible();
    });

    test('PROD_010 Verify Monitors category filter works', async () => {

        await productPage.selectMonitorsCategory();

        await expect(productPage.productCards.first())
            .toBeVisible();
    });

    test('PROD_011 Verify category switching works correctly', async () => {

        await productPage.selectPhonesCategory();

        await productPage.selectLaptopsCategory();

        await expect(productPage.productCards.first())
            .toBeVisible();
    });

    test('PROD_012 Verify product detail page URL changes', async ({ page }) => {

        await productPage.openFirstProduct();

        await expect(page)
            .toHaveURL(/prod.html/);
    });

    test('PROD_013 Verify Next button navigation', async () => {

        await productPage.clickNext();

        await expect(productPage.productCards.first())
            .toBeVisible();
    });

    test('PROD_014 Verify Previous button navigation', async () => {

        await productPage.clickNext();

        await productPage.clickPrevious();

        await expect(productPage.productCards.first())
            .toBeVisible();
    });

    test('PROD_015 Verify product page loads successfully after refresh', async ({ page }) => {

        await page.reload();

        await expect(productPage.productCards.first())
            .toBeVisible();
    });
});