import { APIRequestContext, Page } from '@playwright/test';
import { testConfig } from '../../testConfig';

export async function login(
    request: APIRequestContext, page: Page, email = testConfig.email, password = testConfig.password,
): Promise<string> {
    const response = await request.post(`${testConfig.baseApiUrl}/auth/login`, {
        data: { email, password },
    });
    const body = await response.json();
    const accessToken = body.data.AccessToken;
    await page.evaluate(({ accessToken }) => {
        localStorage.setItem('AccessToken', accessToken);
    }, { accessToken });

    return accessToken;
}
