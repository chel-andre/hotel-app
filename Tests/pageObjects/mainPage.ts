import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class MainPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async goToMainPage(): Promise<void> {
        await this.page.goto('');
    }
}
