import { test as baseTest } from '@playwright/test';
import { BasePage } from '../pageObjects/basePage';
import { RegisterPage } from '../pageObjects/registerPage';
import { LoginPage } from '../pageObjects/loginPage';
import { MainPage } from '../pageObjects/mainPage';

const test = baseTest.extend<{
    basePage: BasePage;
    mainPage: MainPage;
    registerPage: RegisterPage;
    loginPage: LoginPage;
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
});

export default test;
