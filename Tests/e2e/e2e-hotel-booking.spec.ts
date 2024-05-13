import test from '../lib/baseTest';
import { deleteAllBookingsForUserByEmail, deleteUserByEmail } from '../lib/helpers/dbHelper';
import { testConfig } from '../testConfig';

const checkInDate = '01/01/2024';
const checkOutDate = '02/01/2024';
const expectedAdultErrorText = 'adult count cannot be more than ';
const expectedChildErrorText = 'child count cannot ber more than ';
const bookingHasBeenCreatedAlert = 'Your booking has been created';
let expectedHotelName;
let expectedHotelPrice;
let maxChildCount;
let maxAdultCount;
let email;

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
        email = testConfig.email;
    });

    test.afterEach(async () => {
        if(email) {
            await deleteAllBookingsForUserByEmail(email);
        }
    });
});

test.describe('Hotel booking deleting', () => {
    test.beforeEach(async ({ mainPage, request }) => {
        await mainPage.goToMainPage();
        const { accessToken, email: userEmail } = await mainPage.loginViaApiWithNewCreatedUser(request);
        email = userEmail;
        expectedHotelName = await mainPage.createBookingForRandomHotel(request, accessToken);
        await mainPage.clickOnMyBookingsButton();
    });

    test('Positive Scenario for booking deleting', async ({ myBookingsPage }) => {
        await myBookingsPage.verifyBookingDeleting(expectedHotelName, 'confirm deletion');
    });

    test('Negative Scenario for booking deleting', async ({ myBookingsPage }) => {
        await myBookingsPage.verifyBookingDeleting(expectedHotelName, 'cancel deletion');
    });

    test.afterEach(async () => {
        if(email) {
            await deleteAllBookingsForUserByEmail(email);
            await deleteUserByEmail(email);
        }
    });
});

function calculateDaysDifference() {
    const checkIn: any = new Date(checkInDate);
    const checkout: any = new Date(checkOutDate);
    const differenceMs = checkout - checkIn;
    const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

    return differenceDays;
}
