import test from '../lib/baseTest';
import { generateRandomEmail, generateRandomLastName, generateRandomName, getRandomString } from '../lib/helpers/randomDataHelper';

const registerSuccessfulAlert = 'User registered successfully';

test.describe.parallel('Register Flow', () => {
    test.beforeEach(async ({ mainPage, loginPage }) => {
        await mainPage.goToMainPage();
        await mainPage.clickOnLoginButton();
        await loginPage.clickOnRegisterButton();
    });

    test('Negative Scenario for register', async ({ registerPage }) => {
        const inavalidEmail = getRandomString();
        const password = getRandomString();
        const firstName = generateRandomName();
        const lastName = generateRandomLastName();
        await registerPage.fillRegisterForm(firstName, lastName, inavalidEmail, password);
        await registerPage.verifyEmailInvalidity();
    });

    test('Positive Scenario for register', async ({ registerPage }) => {
        const email = generateRandomEmail();
        const password = getRandomString();
        const firstName = generateRandomName();
        const lastName = generateRandomLastName();
        await registerPage.fillRegisterForm(firstName, lastName, email, password);
        await registerPage.verifyAlertTextAndDisapearance(registerSuccessfulAlert);
    });
});
