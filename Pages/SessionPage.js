// pages/SessionPage.js

export class SessionPage {


constructor(page) {

    this.page = page;

    this.userName = page.locator('#nameofuser');

    this.logoutBtn = page.locator('#logout2');

    this.loginBtn = page.locator('#login2');

    this.signupBtn = page.locator('#signin2');

    this.cartLink = page.locator('#cartur');

    this.homeLink = page.locator('.navbar-brand');

    this.firstProduct = page.locator('.hrefch').first();
}

async goto() {

    await this.page.goto('https://www.demoblaze.com/');
}

async refreshPage() {

    await this.page.reload();
}

async openCart() {

    await this.cartLink.click();
}

async logout() {

    await this.logoutBtn.click();
}

async goToHomepage() {

    await this.homeLink.click();
}

async openFirstProduct() {

    await this.firstProduct.click();
}


}
