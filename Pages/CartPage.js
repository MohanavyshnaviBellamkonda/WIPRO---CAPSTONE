export class CartPage {

    constructor(page) {

        this.page = page;

        this.firstProduct = page.locator('.hrefch').first();

        this.addToCartBtn = page.locator('.btn-success');

        this.cartLink = page.locator('#cartur');

        this.cartItems = page.locator('#tbodyid tr');

        this.deleteLink = page.locator('a', {
            hasText: 'Delete'
        });

        this.totalAmount = page.locator('#totalp');

        this.tableHeader = page.locator('.success');
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

    async deleteProduct() {

        await this.deleteLink.first().click();
    }
}