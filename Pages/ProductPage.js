export class ProductPage {

    constructor(page) {

        this.page = page;

        this.firstProduct = page.locator('.hrefch').first();

        this.productCards = page.locator('.card');

        this.productImage = page.locator('.card-img-top').first();

        this.productTitle = page.locator('.hrefch').first();

        this.productPrice = page.locator('.card-block h5').first();

        this.productDescription = page.locator('#more-information');

        this.phonesCategory = page.locator('a', {
            hasText: 'Phones'
        });

        this.laptopsCategory = page.locator('a', {
            hasText: 'Laptops'
        });

        this.monitorsCategory = page.locator('a', {
            hasText: 'Monitors'
        });

        this.nextBtn = page.locator('#next2');

        this.previousBtn = page.locator('#prev2');
    }

    async goto() {

        await this.page.goto('https://www.demoblaze.com/');
    }

    async openFirstProduct() {

        await this.firstProduct.click();
    }

    async selectPhonesCategory() {

        await this.phonesCategory.click();
    }

    async selectLaptopsCategory() {

        await this.laptopsCategory.click();
    }

    async selectMonitorsCategory() {

        await this.monitorsCategory.click();
    }

    async clickNext() {

        await this.nextBtn.click();
    }

    async clickPrevious() {

        await this.previousBtn.click();
    }
}