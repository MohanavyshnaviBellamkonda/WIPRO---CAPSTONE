

export class CheckoutPage {


constructor(page) {

    this.page = page;

    this.firstProduct = page.locator('.hrefch').first();

    this.addToCartBtn = page.locator('.btn-success');

    this.cartLink = page.locator('#cartur');

    this.placeOrderBtn = page.locator('.btn-success');

    this.orderModal = page.locator('#orderModal');

    this.nameInput = page.locator('#name');

    this.countryInput = page.locator('#country');

    this.cityInput = page.locator('#city');

    this.cardInput = page.locator('#card');

    this.monthInput = page.locator('#month');

    this.yearInput = page.locator('#year');

    this.purchaseBtn = page.locator('button', {
        hasText: 'Purchase'
    });

    this.confirmationMessage = page.locator('.sweet-alert');

    this.okBtn = page.locator('.confirm');

    this.closeBtn = page.locator('#orderModal .btn-secondary');
}

async goto() {

    await this.page.goto('https://www.demoblaze.com/');
}

async openFirstProduct() {

    await this.firstProduct.click();
}

async addProductToCart() {

    await this.addToCartBtn.click();
}

async openCart() {

    await this.cartLink.click();
}

async clickPlaceOrder() {

    await this.placeOrderBtn.click();

    await this.orderModal.waitFor({
        state: 'visible'
    });
}

async fillOrderDetails(data) {

    await this.nameInput.fill(data.name);

    await this.countryInput.fill(data.country);

    await this.cityInput.fill(data.city);

    await this.cardInput.fill(data.card);

    await this.monthInput.fill(data.month);

    await this.yearInput.fill(data.year);
}

async purchaseOrder() {

    await this.purchaseBtn.click();
}

async closeOrderModal() {

    await this.closeBtn.click();
}

}
