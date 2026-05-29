// tests/Session/session.spec.js

import { test, expect } from '@playwright/test';

import { SessionPage } from '../../pages/SessionPage';

test.describe('User Session Management Service - DemoBlaze', () => {

test.use({
    storageState: 'auth.json'
});

let sessionPage;

test.beforeEach(async ({ page }) => {

    sessionPage = new SessionPage(page);

    await sessionPage.goto();
});

test('SESSION_001 Verify user session persists after refresh', async () => {

    await sessionPage.refreshPage();

    await expect(sessionPage.userName)
        .toBeVisible();
});

test('SESSION_002 Verify logged in username is displayed', async () => {

    await expect(sessionPage.userName)
        .toContainText('Welcome');
});

test('SESSION_003 Verify session persists during navigation', async () => {

    await sessionPage.openCart();

    await expect(sessionPage.logoutBtn)
        .toBeVisible();
});

test('SESSION_004 Verify logout button is visible', async () => {

    await expect(sessionPage.logoutBtn)
        .toBeVisible();
});

test('SESSION_005 Verify logout functionality works', async () => {

    await sessionPage.logout();

    await expect(sessionPage.loginBtn)
        .toBeVisible();
});

test('SESSION_006 Verify session removed after logout', async () => {

    await sessionPage.logout();

    await sessionPage.refreshPage();

    await expect(sessionPage.loginBtn)
        .toBeVisible();
});

test('SESSION_007 Verify user remains logged in after opening cart', async () => {

    await sessionPage.openCart();

    await expect(sessionPage.userName)
        .toBeVisible();
});

test('SESSION_008 Verify user session persists on homepage', async () => {

    await sessionPage.goToHomepage();

    await expect(sessionPage.userName)
        .toBeVisible();
});

test('SESSION_009 Verify session persists after multiple refreshes', async () => {

    await sessionPage.refreshPage();

    await sessionPage.refreshPage();

    await expect(sessionPage.userName)
        .toBeVisible();
});

test('SESSION_010 Verify cart access during active session', async ({ page }) => {

    await sessionPage.openCart();

    await expect(page)
        .toHaveURL(/cart.html/);
});

test('SESSION_011 Verify session remains active after browsing products', async () => {

    await sessionPage.openFirstProduct();

    await expect(sessionPage.userName)
        .toBeVisible();
});

test('SESSION_012 Verify logout removes welcome message', async () => {

    await sessionPage.logout();

    await expect(sessionPage.userName)
        .not.toBeVisible();
});

test('SESSION_013 Verify login button appears after logout', async () => {

    await sessionPage.logout();

    await expect(sessionPage.loginBtn)
        .toBeVisible();
});

test('SESSION_014 Verify signup button appears after logout', async () => {

    await sessionPage.logout();

    await expect(sessionPage.signupBtn)
        .toBeVisible();
});

test('SESSION_015 Verify session handling across pages', async () => {

    await sessionPage.openCart();

    await sessionPage.goToHomepage();

    await expect(sessionPage.userName)
        .toBeVisible();
});

});
