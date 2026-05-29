import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';

test.describe('Authentication Service - DemoBlaze', () => {

    let loginPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);

        await loginPage.goto();
    });

    test('AUTH_001 Verify Signup button is visible', async () => {

        await expect(loginPage.signupNavBtn).toBeVisible();
    });

    test('AUTH_002 Verify Login button is visible', async () => {

        await expect(loginPage.loginNavBtn).toBeVisible();
    });

    test('AUTH_003 Verify signup modal opens successfully', async () => {

        await loginPage.openSignupModal();

        await expect(loginPage.signupUsername).toBeVisible();
    });

    test('AUTH_004 Verify login modal opens successfully', async () => {

        await loginPage.openLoginModal();

        await expect(loginPage.loginUsername).toBeVisible();
    });

    test('AUTH_005 Verify user can signup with valid credentials', async ({ page }) => {

        const username = "user" + Date.now();

        await loginPage.openSignupModal();

        page.once('dialog', async dialog => {

            expect(dialog.message()).toContain('Sign up successful');
            await dialog.accept();
        });

        await loginPage.signup(username, 'test123');
    });

    test('AUTH_006 Verify existing user cannot signup again', async ({ page }) => {

        await loginPage.openSignupModal();

        page.once('dialog', async dialog => {

            expect(dialog.message()).toContain('This user already exist');
            await dialog.accept();
        });

        await loginPage.signup('existinguser', 'test123');
    });

    test('AUTH_007 Verify signup with empty username', async ({ page }) => {

        await loginPage.openSignupModal();

        page.once('dialog', async dialog => {

            await dialog.accept();
        });

        await loginPage.signup('', 'test123');
    });

    test('AUTH_008 Verify signup with empty password', async ({ page }) => {

        await loginPage.openSignupModal();

        page.once('dialog', async dialog => {

            await dialog.accept();
        });

        await loginPage.signup('testuser', '');
    });

    test('AUTH_009 Verify login with valid credentials', async ({ page }) => {

    await loginPage.openLoginModal();

    await loginPage.login('YOUR_USERNAME', 'YOUR_PASSWORD');

    page.once('dialog', async dialog => {

    await dialog.accept();
});

await loginPage.login('wronguser', 'wrongpass');
    await expect(loginPage.loggedUser)
        .toContainText('Welcome');
});
    test('AUTH_010 Verify login with invalid username', async ({ page }) => {

        await loginPage.openLoginModal();

        page.once('dialog', async dialog => {

            await dialog.accept();
        });

        await loginPage.login('wronguser', 'test123');
    });

    test('AUTH_011 Verify login with invalid password', async ({ page }) => {

        await loginPage.openLoginModal();

        page.once('dialog', async dialog => {

            await dialog.accept();
        });

        await loginPage.login('testuser', 'wrongpass');
    });

    test('AUTH_012 Verify login with empty username', async ({ page }) => {

        await loginPage.openLoginModal();

        page.once('dialog', async dialog => {

            await dialog.accept();
        });

        await loginPage.login('', 'test123');
    });

    test('AUTH_013 Verify login with empty password', async ({ page }) => {

        await loginPage.openLoginModal();

        page.once('dialog', async dialog => {

            await dialog.accept();
        });

        await loginPage.login('testuser', '');
    });

 });
   test('AUTH_014 Verify logout functionality', async ({ page }) => {

    await loginPage.openLoginModal();

    await loginPage.login(username, password);

    await expect(loginPage.logoutBtn).toBeVisible();

    await loginPage.logout();

    await expect(loginPage.loginNavBtn).toBeVisible();
});
   test('AUTH_015 Verify logged-in username is displayed correctly', async ({ page }) => {

    await loginPage.openLoginModal();

    await loginPage.login('YOUR_USERNAME', 'YOUR_PASSWORD');

    await page.waitForSelector('#nameofuser');

    await expect(loginPage.loggedUser)
        .toContainText('Welcome');
});