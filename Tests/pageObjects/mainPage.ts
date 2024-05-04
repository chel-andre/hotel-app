import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class MainPage extends BasePage {
    readonly DESTINATION_TEXTBOX: Locator;
    readonly CHILD_TEXTBOX: Locator;
    readonly ADULT_TEXTBOX: Locator;
    readonly CHECKIN_DATE_TEXTBOX: Locator;
    readonly CHECOUT_DATE_TEXTBOX: Locator;
    readonly SEARCH_BUTTON: Locator;
    readonly HOTEL_NAME_TEXT: Locator;
    readonly HOTEL_PRICE_TEXT: Locator;
    readonly DETAILS_BUTTON: Locator;
    readonly ARROW_RIGHT_BUTTON: Locator;

    constructor(page: Page) {
        super(page);
        this.DESTINATION_TEXTBOX = page.getByPlaceholder('Enter Destination');
        this.CHILD_TEXTBOX = page.getByPlaceholder('child');
        this.ADULT_TEXTBOX = page.getByPlaceholder('adult');
        this.CHECKIN_DATE_TEXTBOX = page.getByPlaceholder('Check in Date');
        this.CHECOUT_DATE_TEXTBOX = page.getByPlaceholder('Check out Date');
        this.SEARCH_BUTTON = page.locator('#Search');
        this.HOTEL_NAME_TEXT = page.locator('#hotel-name');
        this.HOTEL_PRICE_TEXT = page.locator('#price');
        this.DETAILS_BUTTON = page.locator('#Details');
        this.ARROW_RIGHT_BUTTON = page.locator('button[aria-label="Go to next slide"]');
    }

    async goToMainPage(): Promise<void> {
        await this.page.goto('');
    }

    async fillSearchForm(destination: string, childCount: string, adultCount: string, checkInDate: string,
        checkOutDate: string): Promise<void> {
        await this.DESTINATION_TEXTBOX.fill(destination);
        await this.CHILD_TEXTBOX.fill(childCount);
        await this.ADULT_TEXTBOX.fill(adultCount);
        await this.CHECKIN_DATE_TEXTBOX.fill(checkInDate);
        await this.CHECOUT_DATE_TEXTBOX.fill(checkOutDate);
        await this.SEARCH_BUTTON.click();
    }
}
