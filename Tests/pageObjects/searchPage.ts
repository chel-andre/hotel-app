import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class SearchPage extends BasePage {
    readonly DESTINATION_RESULT_TEXT: Locator;
    readonly SORT_DROPDOWN: Locator;
    readonly HOTEL_CARD: Locator;
    readonly HOTEL_DESTINATION_TEXT: Locator;

    constructor(page: Page) {
        super(page);
        this.DESTINATION_RESULT_TEXT = page.locator('#results');
        this.SORT_DROPDOWN = page.locator('#sort');
        this.HOTEL_CARD = page.locator('#hotel');
        this.HOTEL_DESTINATION_TEXT = page.locator('#location');
    }

    async verifyResultText(resultText: string, destination: string): Promise<void> {
        await expect(this.DESTINATION_RESULT_TEXT).toHaveText(`${resultText}${destination}`);
    }

    async verifyThatAnyHotelAndSortDropdownNotExist(): Promise<void> {
        await expect(this.SORT_DROPDOWN).not.toBeVisible();
        await expect(this.HOTEL_CARD).not.toBeVisible();
    }

    async verifyThatAllSearchResultsContainSearchQuery(destination: string): Promise<void> {
        for (const location of await this.HOTEL_DESTINATION_TEXT.allInnerTexts()) {
            await expect(location).toContain(destination);
        }
    }

    async verifySorting(option: 'Star Rating' | 'Price Ascending' | 'Price Descending' ){
        await this.SORT_DROPDOWN.selectOption(option);
        const hotelsCount = await this.HOTEL_CARD.count();
        const actualArray: number[] = [];

        switch (option) {
        case 'Star Rating':
            for (let i = 0; i < hotelsCount; i++) {
                const starsCount = await this.HOTEL_CARD.nth(i).locator('svg[data-testid=StarIcon]').count();
                actualArray.push(starsCount);
            }

            break;
        case 'Price Ascending':
        case 'Price Descending':
            for (let i = 0; i < hotelsCount; i++) {
                const price = (await this.HOTEL_CARD.nth(i).locator('#Price').textContent()).match(/\d+/g)[0];
                actualArray.push(+price);
            }

            break;
        default:
            break;
        }

        const sortedArray = [...actualArray].sort((a, b) => option === 'Price Ascending' ? a - b : b - a);
        await expect(actualArray).toEqual(sortedArray);
    }
}
