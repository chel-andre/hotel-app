import { Page, Locator, expect, APIRequestContext } from '@playwright/test';
import { createBookingForRandomHotel, login, register } from '../lib/helpers/apiHelper';

export class BasePage {
    readonly page: Page;
    readonly ALERT_TEXT: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly FEATURED_TAB: Locator;
    readonly NAME_TEXT: Locator;
    readonly MYBOOKINGS_BUTTON: Locator;
    readonly LOGOUT_BUTTON: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ALERT_TEXT = page.locator('div[role=alert]');
        this.LOGIN_BUTTON = page.locator('#Login');
        this.FEATURED_TAB = page.locator('#Featured');
        this.NAME_TEXT = page.locator('#name');
        this.MYBOOKINGS_BUTTON = page.locator('#My-Bookings');
        this.LOGOUT_BUTTON = page.locator('#LogOut');
    }

    async verifyAlertTextAndDisapearance(alertText: string): Promise<void> {
        await expect(this.ALERT_TEXT).toHaveText(alertText);
        await this.page.mouse.move(0, 0);
        await expect(this.ALERT_TEXT).toHaveCount(0);
    }

    async clickOnLoginButton() {
        await this.LOGIN_BUTTON.click();
    }

    async clickOnFeaturedTab() {
        await this.FEATURED_TAB.click();
    }

    async verifyUserNameInHeader(userName: string) {
        await expect(this.NAME_TEXT).toHaveText(userName);
    }

    async clickOnMyBookingsButton() {
        await this.MYBOOKINGS_BUTTON.click();
    }

    async clickOnLogOutButton() {
        await this.LOGOUT_BUTTON.click();
    }

    async loginViaApi(request: APIRequestContext) {
        await login(request, this.page);
        await this.page.reload();
    }

    async loginViaApiWithNewCreatedUser(request: APIRequestContext) {
        const { email, password } = await register(request);
        const accessToken = await login(request, this.page, email, password);
        await this.page.reload();

        return accessToken;
    }

    async createBookingForRandomHotel(request: APIRequestContext, accessToken: string ) {
        return await createBookingForRandomHotel(request, accessToken);
    }
}
