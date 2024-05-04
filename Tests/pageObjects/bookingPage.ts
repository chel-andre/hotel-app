import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class BookingPage extends BasePage {
    readonly CHECK_IN_DATE_TEXTBOX: Locator;
    readonly CHECK_OUT_DATE_TEXTBOX: Locator;
    readonly ADULT_COUNT_TEXTBOX: Locator;
    readonly CHILD_COUNT_TEXTBOX: Locator;
    readonly BOOK_NOW_BUTTON: Locator;
    readonly ADULT_ERROR_TEXT: Locator;
    readonly CHILD_ERROR_TEXT: Locator;

    constructor(page: Page) {
        super(page);
        this.CHECK_IN_DATE_TEXTBOX = page.getByPlaceholder('Check in Date');
        this.CHECK_OUT_DATE_TEXTBOX = page.getByPlaceholder('Check out Date');
        this.ADULT_COUNT_TEXTBOX = page.locator('#adultCount');
        this.CHILD_COUNT_TEXTBOX = page.locator('#childCount');
        this.BOOK_NOW_BUTTON = page.locator('#Book-Now');
        this.ADULT_ERROR_TEXT = page.locator('#errorAdult');
        this.CHILD_ERROR_TEXT = page.locator('#errorChild');
    }

    async fillBokingForm(checkInDate: string, checkOutDate: string, childCount: string, adultCount: string):
    Promise<void> {
        await this.CHECK_IN_DATE_TEXTBOX.fill(checkInDate);
        await this.page.keyboard.press('Enter');
        await this.CHECK_OUT_DATE_TEXTBOX.fill(checkOutDate);
        await this.page.keyboard.press('Enter');
        await this.ADULT_COUNT_TEXTBOX.fill(adultCount);
        await this.CHILD_COUNT_TEXTBOX.fill(childCount);
        await this.BOOK_NOW_BUTTON.click();
    }

    async verifyAdultErrorText(expectedAdultErrorText: string, adultCount: string):Promise<void> {
        await expect(this.ADULT_ERROR_TEXT).toHaveText(expectedAdultErrorText + adultCount);
    }

    async verifyChildErrorText(expectedChildErrorText: string, childCount: string):Promise<void> {
        await expect(this.CHILD_ERROR_TEXT).toHaveText(expectedChildErrorText + childCount);
    }
}
