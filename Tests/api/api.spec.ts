import { test, expect } from '@playwright/test';
import { validateJsonSchema } from '../lib/helpers/validateJsonSchema';
import { testConfig } from '../testConfig';
import { generateRandomEmail, generateRandomLastName, generateRandomName, getRandomString } from '../lib/helpers/randomDataHelper';

test.describe.parallel('API Testing', () => {
    test('GET Request - Get all hotels', async ({ request }) => {
        const response = await request.get(`${testConfig.baseApiUrl}/hotel/featured`);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.success).toBeTruthy();
        expect(body.message).toBe('featured hotels found');
        expect(body.data.length).toBeGreaterThanOrEqual(1);
        await validateJsonSchema(body);
    });

    test('POST Request - Create New User Negative', async ({ request }) => {
        const response = await request.post(`${testConfig.baseApiUrl}/auth/register`);
        expect(response.status()).toBe(500);
        const body = await response.json();
        expect(body.message).toStrictEqual(['Password is required',
            'Last name is required', 'First name is required', 'Email is required..']);
    });

    test('POST Request - Create New User Positive', async ({ request }) => {
        const firstName = generateRandomName();
        const lastName = generateRandomLastName();
        const email = generateRandomEmail();
        const password = getRandomString();
        const response = await request.post(`${testConfig.baseApiUrl}/auth/register`, {
            data: {
                firstName,
                lastName,
                email,
                password,
            },
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.success).toBeTruthy();
        expect(body.message).toBe('User registered successfully');
        expect(body.data).toStrictEqual({ email, firstName, lastName });
    });

    test('POST Request - Login Positive', async ({ request }) => {
        const response = await request.post(`${testConfig.baseApiUrl}/auth/login`, {
            data: {
                email: testConfig.email,
                password: testConfig.password,
            },
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.success).toBeTruthy();
        expect(body.message).toBe('Login Successful');
        expect(body.data).toMatchObject({ firstName: 'first', lastName: 'last', userType: 'customer' });
    });

    test('POST Request - Login Negative', async ({ request }) => {
        const response = await request.post(`${testConfig.baseApiUrl}/auth/login`);
        expect(response.status()).toBe(401);
        const body = await response.json();
        expect(body.success).toBeFalsy();
        expect(body.message).toBe('Email or password is missing!!!');
    });
});
