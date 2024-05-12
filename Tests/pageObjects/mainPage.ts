import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class MainPage extends BasePage {
    readonly DESTINATION_TEXTBOX: Locator;
    readonly CHILD_TEXTBOX: Locator;
    readonly ADULT_TEXTBOX: Locator;
    readonly CHECKIN_DATE_TEXTBOX: Locator;
    readonly CHECOUT_DATE_TEXTBOX: Locator;
    readonly SEARCH_BUTTON: Locator;
    readonly HOTEL_CARD: Locator;
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
        this.HOTEL_CARD = page.locator('li');
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

    async clickOnRandomHotelDetailsButton(): Promise<{ expectedHotelName: string; expectedHotelPrice: string }> {
        await this.page.waitForSelector('li');
        const hotelsCount = await this.HOTEL_CARD.count();
        const randomHotel = Math.floor(Math.random() * hotelsCount);
        while (await this.HOTEL_CARD.nth(randomHotel).getAttribute('aria-hidden') === 'true'
            && await this.ARROW_RIGHT_BUTTON.isVisible()) {
            await this.ARROW_RIGHT_BUTTON.click();
        }

        const expectedHotelName = await this.HOTEL_CARD.nth(randomHotel).locator('#hotel-name').textContent();
        const expectedHotelPrice = (await this.HOTEL_CARD.nth(randomHotel).locator('#price').textContent())
            .match(/\d+/g)[0];

        await this.DETAILS_BUTTON.nth(randomHotel).click();

        return { expectedHotelName, expectedHotelPrice };
    }
}
