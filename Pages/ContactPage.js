export class ContactPage {

    constructor(page) {

        this.page = page;

        this.contactLink = page.locator('a', {
            hasText: 'Contact'
        });

        this.contactModal = page.locator('#exampleModal');

        this.modalTitle = page.locator('#exampleModalLabel');

        this.emailInput = page.locator('#recipient-email');

        this.nameInput = page.locator('#recipient-name');

        this.messageInput = page.locator('#message-text');

        this.sendMessageBtn = page.locator('button', {
            hasText: 'Send message'
        });

        this.closeBtn = page.locator('button', {
            hasText: 'Close'
        });
    }

    async goto() {

        await this.page.goto('https://www.demoblaze.com/');
    }

    async openContactModal() {

        await this.contactLink.click();

        await this.contactModal.waitFor({
            state: 'visible'
        });
    }

    async fillContactForm(email, name, message) {

        await this.emailInput.fill(email);

        await this.nameInput.fill(name);

        await this.messageInput.fill(message);
    }

    async sendMessage() {

        await this.sendMessageBtn.click();
    }

    async closeModal() {

        await this.closeBtn.click();
    }
}