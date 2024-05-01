import { test, expect } from '@playwright/test';

const email = 'email@gmail.com';
const password = 'password';
const invalidEmail = 'ivalidemail@gmail.com';
const invalidPassword = 'invalidpassword';
const loginSuccessfulAlert = 'Login Successful';
const logoutSuccessfulAlert = 'user logged out successfully!';
const invalidCredentials = 'Invalid credentials';
const name = 'first';

test.describe.parallel('Login / Logout Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('');
    });

    test('Negative Scenario for login', async ({ page }) => {
        await page.click('#Login');
        const url = await page.url();
        await page.fill('input[name=email]', invalidEmail);
        await page.fill('input[name=password]', invalidPassword);
        await page.click('#Login-form');
        const alertText = await page.locator('div[role=alert]');
        await expect(alertText).toHaveText(invalidCredentials);
        await expect(page).toHaveURL(url);
    });

    test('Positive Scenario for login + logout', async ({ page }) => {
        await page.click('#Login');
        await page.fill('input[name=email]', email);
        await page.fill('input[name=password]', password);
        await page.click('#Login-form');
        await expect(page).toHaveURL('');
        let alertText = await page.locator('div[role=alert]');
        await expect(alertText).toHaveText(loginSuccessfulAlert);
        const actualName = await page.locator('#name');
        await expect(actualName).toHaveText(name);
        await page.click('#LogOut');
        alertText = await page.locator('div[role=alert]');
        await expect(alertText).toHaveText(logoutSuccessfulAlert);
    });
});
