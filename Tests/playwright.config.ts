import { PlaywrightTestConfig, devices, defineConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    testMatch: '**/*.spec.ts',
    use: {
        headless: false,
        viewport: { width: 1920, height: 1080 },
        ignoreHTTPSErrors: true,
        baseURL: 'http://localhost:5173/',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                launchOptions: {
                    args: ['--start-fullscreen'],
                },
            },
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                launchOptions: {
                    args: ['--start-maximized'],
                },
            },
        },
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
                launchOptions: {
                    args: ['--start-maximized'],
                },
            },
        },
    ],
  
    timeout: 10000,
    retries: 0,
};
  
export default defineConfig(config);
