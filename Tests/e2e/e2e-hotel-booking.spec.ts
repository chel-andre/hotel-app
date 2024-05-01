import { test, expect } from '@playwright/test';

const email = 'email@gmail.com';
const password = 'password';
const checkInDate = '01/01/2024';
const checkoutDate = '02/01/2024';
const expectedAdultErrorText = 'adult count cannot be more than ';
const expectedChildErrorText = 'child count cannot ber more than ';
const bookingHasBeenCreatedAlert = 'Your booking has been created';
const positiveOption = 'positiveOption';
const negativeOption = 'negativeOption';
let expectedHotelName;
let expectedHotelPrice;
let maxChildCount;
let maxAdultCount;

test.describe('Hotel booking Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('');
        await page.click('#Login');
        await page.fill('input[name=email]', email);
        await page.fill('input[name=password]', password);
        await page.click('#Login-form');
        await page.click('#Featured');
        await page.waitForSelector('li');
        const hotels = await page.locator('li');
        const hotelsCount = await hotels.count();
        const randomHotel = Math.floor(Math.random() * hotelsCount);
        while (await hotels.nth(randomHotel).getAttribute('aria-hidden') === 'true'
            && await page.locator('button[aria-label="Go to next slide"]').isVisible()) {
            await page.click('button[aria-label="Go to next slide"]');
        }

        expectedHotelName = await hotels.nth(randomHotel).locator('#hotel-name').textContent();
        expectedHotelPrice = (await hotels.nth(randomHotel).locator('#price').textContent())
            .match(/\d+/g)[0];

        await page.locator('#Details').nth(randomHotel).click();
        await expect(page.locator('#hotel-name')).toHaveText(expectedHotelName);
        await expect(page.locator('#hotel-price')).toContainText(expectedHotelPrice);
        maxChildCount = (await page.locator('#people').textContent()).match(/\d+/g)[0];
        maxAdultCount = (await page.locator('#people').textContent()).match(/\d+/g)[1];
        await page.click('#Book-Now');
        await page.fill('input[placeholder="Check in Date"]', checkInDate);
        await page.keyboard.press('Enter');
        await page.fill('input[placeholder="Check out Date"]', checkoutDate);
        await page.keyboard.press('Enter');
    });

    test('Negative Scenario for booking creating', async ({ page }) => {
        await page.fill('#adultCount', (+maxAdultCount + 1).toString());
        await page.fill('#childCount', (+maxChildCount + 1).toString());
        await page.click('#Book-Now');
        const adultErrorText = await page.locator('#errorAdult');
        await expect(adultErrorText).toHaveText(expectedAdultErrorText + maxAdultCount);
        const childErrorText = await page.locator('#errorChild');
        await expect(childErrorText).toHaveText(expectedChildErrorText + maxChildCount);
    });

    test('Positive Scenario for booking creating', async ({ page }) => {
        await page.fill('#adultCount', maxAdultCount);
        await page.fill('#childCount', maxChildCount);
        await page.click('#Book-Now');
        const alertText = await page.locator('div[role=alert]').last();
        await expect(alertText).toHaveText(bookingHasBeenCreatedAlert);
        await expect(await page.locator('div[role=alert]')).toHaveCount(0);
        await page.click('#My-Bookings');
        await page.waitForSelector('#hotel');
        const hotel = await page.locator('#hotel').last();
        await hotel.scrollIntoViewIfNeeded();
        await expect(hotel.locator('#hotel-name')).toHaveText(expectedHotelName);
        await expect(hotel.locator('#Children')).toContainText(maxChildCount);
        await expect(hotel.locator('#Adults')).toContainText(maxAdultCount);
        await expect(hotel.locator('#Check-In')).toContainText(new Date(checkInDate).toISOString());
        await expect(hotel.locator('#Check-Out')).toContainText(new Date(checkoutDate).toISOString());
        const daysDifference = calculateDaysDifference();
        await expect(hotel.locator('#Total-Price')).toContainText((expectedHotelPrice * daysDifference).toString());
    });

    test('Positive Scenario for booking deleting', async ({ page }) => {
        await verifyBookingDeleting(page, positiveOption);
    });

    test('Negative Scenario for booking deleting', async ({ page }) => {
        await verifyBookingDeleting(page, negativeOption);
    });
});

function calculateDaysDifference() {
    const checkIn: any = new Date(checkInDate);
    const checkout: any = new Date(checkoutDate);
    const differenceMs = checkout - checkIn;
    const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    return differenceDays;
}

async function verifyBookingDeleting(page, option){
    await page.fill('#adultCount', maxAdultCount);
    await page.fill('#childCount', maxChildCount);
    await page.click('#Book-Now');
    await expect(await page.locator('div[role=alert]')).toHaveCount(0);
    await page.click('#My-Bookings');
    await page.waitForSelector('#hotel');
    const hotels = await page.locator('#hotel');
    const hotelsCountBeforeDeleting = await hotels.count();
    const hotel = await hotels.last();
    await hotel.scrollIntoViewIfNeeded();
    await expect(hotel.locator('#hotel-name')).toHaveText(expectedHotelName);
    await hotel.locator('#Delete-Booking').click();

    switch (option) {
    case positiveOption:
        await page.click('.swal2-confirm');
        await expect(hotels).toHaveCount(0);
        await page.waitForSelector('#hotel');
        const hotelsCountAfterDeleting = await hotels.count();
        await expect(hotelsCountAfterDeleting).toEqual(hotelsCountBeforeDeleting - 1);
        break;
    case negativeOption:
        await page.click('.swal2-cancel');
        await page.waitForSelector('#hotel');
        const hotelsCountAfterAttemptDeleting = await hotels.count();
        await expect(hotelsCountAfterAttemptDeleting).toEqual(hotelsCountBeforeDeleting);
        break;
    default:
        break;
    }
}
