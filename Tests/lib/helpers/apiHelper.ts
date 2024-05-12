import { APIRequestContext, Page } from '@playwright/test';
import { testConfig } from '../../testConfig';
import { generateRandomEmail, generateRandomLastName, generateRandomName, getRandomString } from './randomDataHelper';

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

export async function register(request: APIRequestContext): Promise<{ email: string; password: string }> {
    const email = generateRandomEmail();
    const password = getRandomString();
    const response = await request.post(`${testConfig.baseApiUrl}/auth/register`, {
        data: {
            firstName: generateRandomName(),
            lastName: generateRandomLastName(),
            email,
            password,
        },
    });

    if(response.status() !== 200) {
        throw new Error('Could not create new user!');
    }

    return { email, password };
}

export async function createBookingForRandomHotel(request: APIRequestContext, accessToken: string):
Promise<string> {
    let response = await request.get(`${testConfig.baseApiUrl}/hotel/featured`);
    if(response.status() !== 200) {
        throw new Error('Hotels not found!');
    }

    const body = await response.json();
    const hotels = body.data;
    const randomHotel = hotels[Math.floor(Math.random() * body.data.length)];
    const randomHotelName = randomHotel.name;

    response = await request.post(`${testConfig.baseApiUrl}/booking`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        data: {
            childCount: 1,
            adultCount: 1,
            checkInDate: '2024-01-30T22:00:00.000Z',
            checkOutDate: '2024-01-30T22:00:00.000Z',
            hotelId: randomHotel._id,
            pricePerNight: 1,
            totalPrice: 1,
        },
    });

    if(response.status() !== 200) {
        throw new Error('Could not create booking!');
    }

    return randomHotelName;
}
