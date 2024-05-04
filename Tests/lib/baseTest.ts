import { test as baseTest } from '@playwright/test';
import { BasePage } from '../pageObjects/basePage';
import { RegisterPage } from '../pageObjects/registerPage';
import { LoginPage } from '../pageObjects/loginPage';
import { MainPage } from '../pageObjects/mainPage';
import { SearchPage } from '../pageObjects/searchPage';
import { HotelPage } from '../pageObjects/hotelPage';
import { BookingPage } from '../pageObjects/bookingPage';
import { MyBookingsPage } from '../pageObjects/myBookingsPage';

const test = baseTest.extend<{
    basePage: BasePage;
    mainPage: MainPage;
    registerPage: RegisterPage;
    loginPage: LoginPage;
    searchPage: SearchPage;
    hotelPage: HotelPage;
    bookingPage: BookingPage;
    myBookingsPage: MyBookingsPage;
}>({
    basePage: async ({ page }, use) => {
        await use(new BasePage(page));
    },
    mainPage: async ({ page }, use) => {
        await use(new MainPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    searchPage: async ({ page }, use) => {
        await use(new SearchPage(page));
    },
    hotelPage: async ({ page }, use) => {
        await use(new HotelPage(page));
    },
    bookingPage: async ({ page }, use) => {
        await use(new BookingPage(page));
    },
    myBookingsPage: async ({ page }, use) => {
        await use(new MyBookingsPage(page));
    },
});

export default test;
