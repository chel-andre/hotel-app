import { Page, Locator } from '@playwright/test';
import { testConfig } from '../testConfig';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
    readonly EMAIL_TEXTBOX: Locator;
    readonly PASSWORD_TEXTBOX: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly REGISTER_BUTTON: Locator;

    constructor(page: Page) {
        super(page);
        this.EMAIL_TEXTBOX = page.getByPlaceholder('Enter email');
        this.PASSWORD_TEXTBOX = page.getByPlaceholder('Enter password');
        this.LOGIN_BUTTON = page.locator('#Login-form');
        this.REGISTER_BUTTON = page.locator('#Register a');
    }

    async fillLoginForm(email = testConfig.email, password = testConfig.password): Promise<void> {
        await this.EMAIL_TEXTBOX.fill(email);
        await this.PASSWORD_TEXTBOX.fill(password);
        await this.LOGIN_BUTTON.click();
    }

    async clickOnRegisterButton(): Promise<void> {
        await this.REGISTER_BUTTON.click();
    }
}
