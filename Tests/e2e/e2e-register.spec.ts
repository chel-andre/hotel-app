import test from '../lib/baseTest';

const registerSuccessfulAlert = 'User registered successfully';
const firstName = 'first';
const lastName = 'last';
const email = 'wgw@gmail.com';
const inavalidEmail = 'w';
const password = 'qqqqqq';

test.describe.parallel('Register Flow', () => {
    test.beforeEach(async ({ mainPage, loginPage }) => {
        await mainPage.goToMainPage();
        await mainPage.clickOnLoginButton();
        await loginPage.clickOnRegisterButton();
    });

    test('Negative Scenario for register', async ({ registerPage }) => {
        await registerPage.fillRegisterForm(firstName, lastName, inavalidEmail, password);
        await registerPage.verifyEmailInvalidity();
    });

    test('Positive Scenario for register', async ({ registerPage }) => {
        await registerPage.fillRegisterForm(firstName, lastName, email, password);
        await registerPage.verifyAlertTextAndDisapearance(registerSuccessfulAlert);
    });
});
