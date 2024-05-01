import { test, expect } from '@playwright/test';

const email = 'email@gmail.com';
const password = 'password';
const destination = 'Arab';
const invalidDestination = Date.now().toString(36) + Math.random().toString(36).slice(2);;
const child = '1';
const adult = '1';
const checkInDate = '01/01/2000';
const checkoutDate = '01/01/2024';
const resultsFor = 'Results for: ';
const noResultsFoundFor = 'No results found for: ';
const starRatingOption = 'Star Rating';
const priceAscendingOption = 'Price Ascending';
const priceDescendingOption = 'Price Descending';

test.describe.parallel('Search hotels Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('');
        await page.click('#Login');
        await page.fill('input[name=email]', email);
        await page.fill('input[name=password]', password);
        await page.click('#Login-form');
    });

    test('Negative Scenario for search', async ({ page }) => {
        await fillSearchForm(page, invalidDestination);
        const labelResultText = await page.locator('#results');
        await expect(labelResultText).toContainText(`${noResultsFoundFor}${invalidDestination}`);
        const sortDropDown = await page.locator('#sort');
        await expect(sortDropDown).not.toBeVisible();
        const hotel = await page.locator('#hotel');
        await expect(hotel).not.toBeVisible();
    });

    test('Positive Scenario for search + sort by star Rating', async ({ page }) => {
        await fillSearchForm(page, destination);
        const labelResultText = await page.locator('#results');
        await expect(labelResultText).toContainText(`${resultsFor}${destination}`);
        for (const location of await page.locator('#location').allInnerTexts()) {
            await expect(location).toContain(destination);
        }

        await verifySorting(page, starRatingOption);
    });

    test('Sort by Price Ascending', async ({ page }) => {
        await fillSearchForm(page, destination);
        await verifySorting(page, priceAscendingOption);
    });

    test('Sort by Price Descending', async ({ page }) => {
        await fillSearchForm(page, destination);
        await verifySorting(page, priceDescendingOption);
    });
});

async function fillSearchForm(page, destination){
    await page.fill('input[placeholder="Enter Destination"]', destination);
    await page.fill('input[placeholder="child"]', child);
    await page.fill('input[placeholder="adult"]', adult);
    await page.fill('input[placeholder="Check in Date"]', checkInDate);
    await page.fill('input[placeholder="Check out Date"]', checkoutDate);
    await page.click('#Search');
}

async function verifySorting(page, option){
    await page.waitForSelector('#hotel');
    await page.locator('#sort').selectOption(option);
    const hotels = await page.locator('#hotel');
    await expect(hotels).toHaveCount(0);
    await page.waitForSelector('#hotel');
    const hotelsCount = await hotels.count();
    const actualArray: number[] = [];

    switch (option) {
    case starRatingOption:
        for (let i = 0; i < hotelsCount; i++) {
            const starsCount = await hotels.nth(i).locator('svg[data-testid=StarIcon]').count();
            actualArray.push(starsCount);
        }

        break;
    case priceAscendingOption:
    case priceDescendingOption:
        for (let i = 0; i < hotelsCount; i++) {
            const price = (await hotels.nth(i).locator('#Price').textContent()).match(/\d+/g)[0];
            actualArray.push(price);
        }

        break;
    default:
        break;
    }

    const sortedArray = [...actualArray].sort((a, b) => option === priceAscendingOption ? a - b : b - a);
    await expect(actualArray).toEqual(sortedArray);
}
