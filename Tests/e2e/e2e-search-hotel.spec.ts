import test from '../lib/baseTest';

const destination = 'Arab';
const invalidDestination = Date.now().toString(36) + Math.random().toString(36).slice(2);
const childCount = '1';
const adultCount = '1';
const checkInDate = '01/01/2000';
const checkoutDate = '01/01/2024';
const resultsFor = 'Results for: ';
const noResultsFoundFor = 'No results found for: ';
const starRatingOption = 'Star Rating';
const priceAscendingOption = 'Price Ascending';
const priceDescendingOption = 'Price Descending';

test.describe.parallel('Search hotels Flow', () => {
    test.beforeEach(async ({ mainPage }) => {
        await mainPage.goToMainPage();
    });

    test('Negative Scenario for search', async ({ mainPage, searchPage }) => {
        await mainPage.fillSearchForm(invalidDestination, childCount, adultCount, checkInDate, checkoutDate );
        await searchPage.verifyResultText(noResultsFoundFor, invalidDestination);
        await searchPage.verifyThatAnyHotelAndSortDropdownNotExist();
    });

    test('Positive Scenario for search + sort by star Rating', async ({ mainPage, searchPage }) => {
        await mainPage.fillSearchForm(destination, childCount, adultCount, checkInDate, checkoutDate );
        await searchPage.verifyResultText(resultsFor, destination);
        await searchPage.verifyThatAllSearchResultsContainSearchQuery(destination);
        await searchPage.verifySorting(starRatingOption);
    });

    test('Sort by Price Ascending', async ({ mainPage, searchPage }) => {
        await mainPage.fillSearchForm(destination, childCount, adultCount, checkInDate, checkoutDate );
        await searchPage.verifySorting(priceAscendingOption);
    });

    test('Sort by Price Descending', async ({ mainPage, searchPage }) => {
        await mainPage.fillSearchForm(destination, childCount, adultCount, checkInDate, checkoutDate );
        await searchPage.verifySorting(priceDescendingOption);
    });
});
