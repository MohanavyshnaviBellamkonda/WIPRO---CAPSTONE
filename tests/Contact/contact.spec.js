import { test, expect } from '@playwright/test';

import { ContactPage } from '../../Pages/ContactPage';

test.describe('Contact Service - DemoBlaze', () => {

    let contactPage;

    test.beforeEach(async ({ page }) => {

        contactPage = new ContactPage(page);

        await contactPage.goto();
    });

    const contactData = [
        {
            email: 'sathya@gmail.com',
            name: 'Sathya',
            message: 'Hello'
        },
        {
            email: 'demo@gmail.com',
            name: 'Demo',
            message: 'Testing'
        }
    ];

    test('CONT_001 Verify Contact link is visible', async () => {

        await expect(contactPage.contactLink)
            .toBeVisible();
    });

    test('CONT_002 Verify Contact modal opens', async () => {

        await contactPage.openContactModal();

        await expect(contactPage.contactModal)
            .toBeVisible();
    });

    test('CONT_003 Verify email textbox is visible', async () => {

        await contactPage.openContactModal();

        await expect(contactPage.emailInput)
            .toBeVisible();
    });

    test('CONT_004 Verify name textbox is visible', async () => {

        await contactPage.openContactModal();

        await expect(contactPage.nameInput)
            .toBeVisible();
    });

    test('CONT_005 Verify message textbox is visible', async () => {

        await contactPage.openContactModal();

        await expect(contactPage.messageInput)
            .toBeVisible();
    });

    test('CONT_006 Verify Send Message button is visible', async () => {

        await contactPage.openContactModal();

        await expect(contactPage.sendMessageBtn)
            .toBeVisible();
    });

    test('CONT_007 Verify user can enter email', async () => {

        await contactPage.openContactModal();

        await contactPage.emailInput.fill('test@gmail.com');

        await expect(contactPage.emailInput)
            .toHaveValue('test@gmail.com');
    });

    test('CONT_008 Verify user can enter name', async () => {

        await contactPage.openContactModal();

        await contactPage.nameInput.fill('Satya');

        await expect(contactPage.nameInput)
            .toHaveValue('Satya');
    });

    test('CONT_009 Verify user can enter message', async () => {

        test.slow();

        await contactPage.openContactModal();

        await contactPage.messageInput.fill('Hello DemoBlaze');

        await expect(contactPage.messageInput)
            .toHaveValue('Hello DemoBlaze');
    });

    test.skip('CONT_010 Verify contact modal can close', async () => {

        await contactPage.openContactModal();

        await contactPage.closeModal();
    });

    test('CONT_011 Verify alert appears after sending message',
        async ({ page }) => {

        await contactPage.openContactModal();

        await contactPage.fillContactForm(
            'test@gmail.com',
            'Satya',
            'Testing'
        );

        page.on('dialog', async dialog => {

            expect(dialog.message())
                .toContain('Thanks');

            await dialog.accept();
        });

        await contactPage.sendMessage();
    });

    test('CONT_012 Verify modal title is visible', async () => {

        await contactPage.openContactModal();

        await expect(contactPage.modalTitle)
            .toBeVisible();
    });

    contactData.forEach(data => {

        test(`CONT_013 Verify multiple data entries ${data.name}`,
            async () => {

            await contactPage.openContactModal();

            await contactPage.fillContactForm(
                data.email,
                data.name,
                data.message
            );

            await expect.soft(contactPage.nameInput)
                .toHaveValue(data.name);
        });
    });

    test('CONT_014 Verify contact modal remains visible',
        async () => {

        await contactPage.openContactModal();

        await expect(contactPage.contactModal)
            .toBeVisible();
    });

    test('CONT_015 Verify modal opens after refresh',
        async ({ page }) => {

        await page.reload();

        await contactPage.openContactModal();

        await expect(contactPage.contactModal)
            .toBeVisible();
    });

    test.skip('Future validation test', async () => {

    });
});