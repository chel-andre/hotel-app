import test from '../lib/baseTest';
import { generateRandomEmail, getRandomString } from '../lib/helpers/randomDataHelper';

const loginSuccessfulAlert = 'Login Successful';
const logoutSuccessfulAlert = 'user logged out successfully!';
const invalidCredentials = 'Invalid credentials';
const name = 'first';

test.describe.parallel('Login / Logout Flow', () => {
    test.beforeEach(async ({ mainPage }) => {
        await mainPage.goToMainPage();
        await mainPage.clickOnLoginButton();
    });

    test('Negative Scenario for login', async ({ loginPage }) => {
        const invalidEmail = generateRandomEmail();
        const invalidPassword = getRandomString();
        await loginPage.fillLoginForm(invalidEmail, invalidPassword);
        await loginPage.verifyAlertTextAndDisapearance(invalidCredentials);
    });

    test('Positive Scenario for login + logout', async ({ loginPage, mainPage }) => {
        await loginPage.fillLoginForm();
        await loginPage.verifyAlertTextAndDisapearance(loginSuccessfulAlert);
        await mainPage.verifyUserNameInHeader(name);
        await mainPage.clickOnLogOutButton();
        await loginPage.verifyAlertTextAndDisapearance(logoutSuccessfulAlert);
    });
});
