export class OrderPage {

    constructor(page) {

        this.page = page;

        this.firstProduct = page.locator('.hrefch').first();

        this.addToCartBtn = page.locator('.btn-success');

        this.cartLink = page.locator('#cartur');

        this.placeOrderBtn = page.locator('.btn-success');

        this.orderModal = page.locator('#orderModalLabel');

        this.nameInput = page.locator('#name');

        this.countryInput = page.locator('#country');

        this.cityInput = page.locator('#city');

        this.cardInput = page.locator('#card');

        this.monthInput = page.locator('#month');

        this.yearInput = page.locator('#year');

        this.purchaseBtn = page.getByRole('button', {
            name: 'Purchase'
        });

        this.closeBtn = page.getByRole('button', {
            name: 'Close'
        }).nth(1);

        this.confirmationMsg = page.locator('.sweet-alert');

        this.okBtn = page.getByRole('button', {
            name: 'OK'
        });
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
    async fillOrderDetails(name, country, city, card, month, year) {

        await this.nameInput.fill(name);

        await this.countryInput.fill(country);

        await this.cityInput.fill(city);

        await this.cardInput.fill(card);

        await this.monthInput.fill(month);

        await this.yearInput.fill(year);
    }

    async purchaseOrder() {

        await this.purchaseBtn.click();
    }
}