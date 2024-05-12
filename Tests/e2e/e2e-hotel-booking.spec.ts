import test from '../lib/baseTest';

const checkInDate = '01/01/2024';
const checkOutDate = '02/01/2024';
const expectedAdultErrorText = 'adult count cannot be more than ';
const expectedChildErrorText = 'child count cannot ber more than ';
const bookingHasBeenCreatedAlert = 'Your booking has been created';
let expectedHotelName;
let expectedHotelPrice;
let maxChildCount;
let maxAdultCount;

test.describe.parallel('Hotel booking creating', () => {
    test.beforeEach(async ({ mainPage, hotelPage, request }) => {
        await mainPage.goToMainPage();
        await mainPage.loginViaApi(request);
        await mainPage.clickOnFeaturedTab();
        ({ expectedHotelName, expectedHotelPrice } = await mainPage.clickOnRandomHotelDetailsButton());
        ({ maxChildCount, maxAdultCount } = await hotelPage
            .verifyHotelPageAndClickBookNow(expectedHotelName, expectedHotelPrice));
    });

    test('Negative Scenario for booking creating', async ({ bookingPage }) => {
        await bookingPage.fillBokingForm(checkInDate, checkOutDate, (+maxChildCount + 1).toString(),
            (+maxAdultCount + 1).toString());
        await bookingPage.verifyAdultErrorText(expectedAdultErrorText, maxAdultCount);
        await bookingPage.verifyChildErrorText(expectedChildErrorText, maxChildCount);
    });

    test('Positive Scenario for booking creating', async ({ bookingPage, mainPage, myBookingsPage }) => {
        await bookingPage.fillBokingForm(checkInDate, checkOutDate, maxChildCount, maxAdultCount);
        await mainPage.verifyAlertTextAndDisapearance(bookingHasBeenCreatedAlert);
        await mainPage.clickOnMyBookingsButton();
        const daysDifference = calculateDaysDifference();
        const totalPrice = (expectedHotelPrice * daysDifference).toString();
        await myBookingsPage.verifyHotelPageAndClickBookNow(expectedHotelName, maxChildCount, maxAdultCount,
            checkInDate, checkOutDate, totalPrice);
    });
});

test.describe('Hotel booking deleting', () => {
    test('Positive Scenario for booking deleting', async ({ bookingPage, mainPage, myBookingsPage }) => {
        await bookingPage.fillBokingForm(checkInDate, checkOutDate, maxChildCount, maxAdultCount);
        await mainPage.verifyAlertTextAndDisapearance(bookingHasBeenCreatedAlert);
        await mainPage.clickOnMyBookingsButton();
        await myBookingsPage.verifyBookingDeleting(expectedHotelName , 'confirm deletion');
    });

    test('Negative Scenario for booking deleting', async ({ bookingPage, mainPage, myBookingsPage }) => {
        await bookingPage.fillBokingForm(checkInDate, checkOutDate, maxChildCount, maxAdultCount);
        await mainPage.verifyAlertTextAndDisapearance(bookingHasBeenCreatedAlert);
        await mainPage.clickOnMyBookingsButton();
        await myBookingsPage.verifyBookingDeleting(expectedHotelName, 'cancel deletion');
    });
});

function calculateDaysDifference() {
    const checkIn: any = new Date(checkInDate);
    const checkout: any = new Date(checkOutDate);
    const differenceMs = checkout - checkIn;
    const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    return differenceDays;
}

// test('qqqqqqqqq', async ({ page }) => {
//     await page.goto('');
//     await page.click('#Login');
//     await page.fill('input[name=email]', email);
//     await page.fill('input[name=password]', password);
//     await page.click('#Login-form');
//     await expect(await page.locator('div[role=alert]')).toHaveCount(0);
//     await page.click('#My-Bookings');
//     await page.waitForSelector('#hotel');
//     const hotels = await page.locator('#hotel');
//     const hotelsCountBeforeDeleting = await hotels.count();
//     for (let i = 0; i < hotelsCountBeforeDeleting; i++) {
//         await hotels.nth(i).locator('#Delete-Booking').click();
//         await page.click('.swal2-confirm');
//     }
// });
