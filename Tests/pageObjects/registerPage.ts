import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class RegisterPage extends BasePage {
    readonly FIRST_NAME_TEXTBOX: Locator;
    readonly LAST_NAME_TEXTBOX: Locator;
    readonly EMAIL_TEXTBOX: Locator;
    readonly PASSWORD_TEXTBOX: Locator;
    readonly CONFIRM_PASSWORD_TEXTBOX: Locator;
    readonly SUBMIT_BUTTON: Locator;

    constructor(page: Page) {
        super(page);
        this.FIRST_NAME_TEXTBOX = page.getByPlaceholder('First Name');
        this.LAST_NAME_TEXTBOX = page.getByPlaceholder('Last Name');
        this.EMAIL_TEXTBOX = page.getByPlaceholder('Email');
        this.PASSWORD_TEXTBOX = page.getByPlaceholder('Password', { exact: true });
        this.CONFIRM_PASSWORD_TEXTBOX = page.getByPlaceholder('Confirm Password');
        this.SUBMIT_BUTTON = page.locator('#submit');
    }

    async fillRegisterForm(firstName: string, lastName: string, email: string, password: string): Promise<void> {
        await this.FIRST_NAME_TEXTBOX.fill(firstName);
        await this.LAST_NAME_TEXTBOX.fill(lastName);
        await this.EMAIL_TEXTBOX.fill(email);
        await this.PASSWORD_TEXTBOX.fill(password);
        await this.CONFIRM_PASSWORD_TEXTBOX.fill(password);
        await this.SUBMIT_BUTTON.click();
    }

    async verifyEmailInvalidity(): Promise<void> {
        const isValid = await this.page.evaluate(() => {
            const inputElement: HTMLInputElement = document.querySelector('input[type="email"]');

            return inputElement.checkValidity();
        });
        await expect(isValid).toBeFalsy();
    }
}
