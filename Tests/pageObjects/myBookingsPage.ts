import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class MyBookingsPage extends BasePage {
    readonly HOTEL_CARD: Locator;
    readonly CONFIRM_DELETION_BUTTON: Locator;
    readonly CANCEL_DELETION_BUTTON: Locator;

    constructor(page: Page) {
        super(page);
        this.HOTEL_CARD = page.locator('#hotel');
        this.CONFIRM_DELETION_BUTTON = page.locator('.swal2-confirm');
        this.CANCEL_DELETION_BUTTON = page.locator('.swal2-cancel');
    }

    async verifyHotelPageAndClickBookNow(expectedHotelName: string, childCount: string, adultCount: string,
        checkInDate: string, checkoutDate: string , totalPrice: string):Promise<void> {
        await this.page.waitForSelector('#hotel');
        const hotel = await this.HOTEL_CARD.last();
        await hotel.scrollIntoViewIfNeeded();
        await expect(hotel.locator('#hotel-name')).toHaveText(expectedHotelName);
        await expect(hotel.locator('#Children')).toContainText(childCount);
        await expect(hotel.locator('#Adults')).toContainText(adultCount);
        await expect(hotel.locator('#Check-In')).toContainText(new Date(checkInDate).toISOString());
        await expect(hotel.locator('#Check-Out')).toContainText(new Date(checkoutDate).toISOString());
        await expect(hotel.locator('#Total-Price')).toContainText(totalPrice);
    }

    async verifyBookingDeleting(expectedHotelName: string, option: 'confirm deletion' | 'cancel deletion'){
        await this.page.waitForSelector('#hotel');
        const hotels = await this.HOTEL_CARD;
        const hotelsCountBeforeDeleting = await hotels.count();
        const hotel = await this.HOTEL_CARD.last();
        await hotel.scrollIntoViewIfNeeded();
        await expect(hotel.locator('#hotel-name')).toHaveText(expectedHotelName);
        await hotel.locator('#Delete-Booking').click();

        switch (option) {
        case 'confirm deletion':
            await this.CONFIRM_DELETION_BUTTON.click();
            await expect(hotels).toHaveCount(0);
            await this.page.waitForSelector('#hotel');
            const hotelsCountAfterDeleting = await hotels.count();
            await expect(hotelsCountAfterDeleting).toEqual(hotelsCountBeforeDeleting - 1);
            break;
        case 'cancel deletion':
            await this.CANCEL_DELETION_BUTTON.click();
            await this.page.waitForSelector('#hotel');
            const hotelsCountAfterAttemptDeleting = await hotels.count();
            await expect(hotelsCountAfterAttemptDeleting).toEqual(hotelsCountBeforeDeleting);
            break;
        default:
            break;
        }
    }
}
