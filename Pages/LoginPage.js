export class LoginPage {

    constructor(page) {

        this.page = page;

        // Navbar buttons
        this.loginNavBtn = page.locator('#login2');
        this.signupNavBtn = page.locator('#signin2');
        this.logoutBtn = page.locator('#logout2');
        this.loggedUser = page.locator('#nameofuser');

        // Signup modal
        this.signupUsername = page.locator('#sign-username');
        this.signupPassword = page.locator('#sign-password');
        this.signupBtn = page.locator('button[onclick="register()"]');

        // Login modal
        this.loginUsername = page.locator('#loginusername');
        this.loginPassword = page.locator('#loginpassword');
        this.loginBtn = page.locator('button[onclick="logIn()"]');
    }

    async goto() {

        await this.page.goto('https://www.demoblaze.com/');
    }

    async openSignupModal() {

        await this.signupNavBtn.click();
    }

    async openLoginModal() {

        await this.loginNavBtn.click();
    }

    async signup(username, password) {

        await this.signupUsername.fill(username);
        await this.signupPassword.fill(password);
        await this.signupBtn.click();
    }

   async login(username, password) {

    await this.loginUsername.fill(username);

    await this.loginPassword.fill(password);

    await this.loginBtn.click();

    
}

    async logout() {

        await this.logoutBtn.click();
    }
}