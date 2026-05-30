import { test, expect } from '@playwright/test';

import { NavigationPage } from '../../Pages/NavigationPage';

test.describe('Navigation Service - DemoBlaze', () => {

    let navigationPage;

    test.beforeEach(async ({ page }) => {

        navigationPage = new NavigationPage(page);

        await navigationPage.goto();
    });

    const modalData = [
        {
            modal: 'Contact'
        },
        {
            modal: 'About'
        },
        {
            modal: 'Login'
        },
        {
            modal: 'Signup'
        }
    ];

    test('NAV_001 Verify Home link is visible', async () => {

        await expect(navigationPage.homeLink)
            .toBeVisible();
    });

    test('NAV_002 Verify Contact link is visible', async () => {

        await expect(navigationPage.contactLink)
            .toBeVisible();
    });

    test('NAV_003 Verify About Us link is visible', async () => {

        await expect(navigationPage.aboutLink)
            .toBeVisible();
    });

    test('NAV_004 Verify Cart link is visible', async () => {

        await expect(navigationPage.cartLink)
            .toBeVisible();
    });

    test.fixme('NAV_005 Verify Login link is visible', async () => {

        await expect(navigationPage.loginLink)
            .toBeVisible();
    });

    test('NAV_006 Verify Sign Up link is visible', async () => {

        await expect(navigationPage.signupLink)
            .toBeVisible();
    });

    test('NAV_007 Verify Home navigation works', async ({ page }) => {

        await navigationPage.homeLink.click();

        await expect(page)
            .toHaveURL(/index.html/);
    });

    test('NAV_008 Verify Cart page navigation', async ({ page }) => {

        await navigationPage.openCart();

        await expect(page)
            .toHaveURL(/cart.html/);
    });

    test('NAV_009 Verify Contact modal opens', async () => {

        await navigationPage.openContact();

        await expect(navigationPage.contactModal)
            .toBeVisible();
    });

    test('NAV_010 Verify About Us modal opens', async () => {

        test.slow();

        await navigationPage.openAbout();

        await expect(navigationPage.aboutModal)
            .toBeVisible();
    });

    test('NAV_011 Verify Login modal opens', async () => {

        await test.step('Open login modal', async () => {

            await navigationPage.openLogin();
        });

        await expect(navigationPage.loginModal)
            .toBeVisible();
    });

    test('NAV_012 Verify Signup modal opens', async () => {

        await navigationPage.openSignup();

        await expect.soft(navigationPage.signupModal)
            .toBeVisible();
    });

    test('NAV_013 Verify Previous carousel button', async () => {

        await navigationPage.clickPrevious();
    });

    test('NAV_014 Verify Next carousel button', async () => {

        await navigationPage.clickNext();
    });

    test('NAV_015 Verify navbar remains visible after navigation',
        async () => {

        await navigationPage.openCart();

        await expect(navigationPage.navbar)
            .toBeVisible();
    });
});