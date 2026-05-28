export class NavigationPage {

    constructor(page) {

        this.page = page;

        this.homeLink = page.locator('#nava');

        this.contactLink = page.locator('a', {
            hasText: 'Contact'
        });

        this.aboutLink = page.locator('a', {
            hasText: 'About us'
        });

        this.cartLink = page.locator('#cartur');

        this.loginLink = page.locator('#login2');

        this.signupLink = page.locator('#signin2');

        this.prevBtn = page.locator('.carousel-control-prev');

        this.nextBtn = page.locator('.carousel-control-next');

        this.contactModal = page.locator('#exampleModalLabel');

        this.aboutModal = page.locator('#videoModalLabel');

        this.loginModal = page.locator('#logInModalLabel');

        this.signupModal = page.locator('#signInModalLabel');

        this.navbar = page.locator('#navbarExample');
    }

    async goto() {

        await this.page.goto('https://www.demoblaze.com/');
    }

    async openContact() {

        await this.contactLink.click();
    }

    async openAbout() {

        await this.aboutLink.click();
    }

    async openLogin() {

        await this.loginLink.click();
    }

    async openSignup() {

        await this.signupLink.click();
    }

    async openCart() {

        await this.cartLink.click();
    }

    async clickPrevious() {

        await this.prevBtn.click();
    }

    async clickNext() {

        await this.nextBtn.click();
    }
}