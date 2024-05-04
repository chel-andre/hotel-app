import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class HotelPage extends BasePage {
    readonly HOTEL_NAME_TEXT: Locator;
    readonly HOTEL_PRICE_TEXT: Locator;
    readonly MAX_PEOPLE_COUNT: Locator;
    readonly BOOK_NOW_BUTTON: Locator;

    constructor(page: Page) {
        super(page);
        this.HOTEL_NAME_TEXT = page.locator('#hotel-name');
        this.HOTEL_PRICE_TEXT = page.locator('#hotel-price');
        this.MAX_PEOPLE_COUNT = page.locator('#people');
        this.BOOK_NOW_BUTTON = page.locator('#Book-Now');
    }

    async verifyHotelPageAndClickBookNow(expectedHotelName: string, expectedHotelPrice: string):
    Promise<{ maxChildCount: string; maxAdultCount: string }> {
        await expect(this.HOTEL_NAME_TEXT).toHaveText(expectedHotelName);
        await expect(this.HOTEL_PRICE_TEXT).toContainText(expectedHotelPrice);
        const maxChildCount = (await this.MAX_PEOPLE_COUNT.textContent()).match(/\d+/g)[0];
        const maxAdultCount = (await this.MAX_PEOPLE_COUNT.textContent()).match(/\d+/g)[1];
        await this.BOOK_NOW_BUTTON.click();

        return { maxChildCount, maxAdultCount };
    }
}
