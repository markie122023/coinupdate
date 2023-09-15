"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// scrapper.helper.test.ts
const scraper_helpher_1 = require("../src/helphers/scraper.helpher");
describe('ScrapperHelpher', () => {
    it('should scrape data from a website by class name', async () => {
        // Define a URL and class name for testing
        const url = 'https://p2p.binance.com/en/trade/all-payments/USDT?fiat=NGN';
        const className = 'css-onyc9z';
        // Create an instance of ScrapperHelpher
        const scrapper = new scraper_helpher_1.ScrapperHelpher();
        // Mock Puppeteer's launch and evaluate methods
        const mockLaunch = jest.spyOn(scrapper, 'launch');
        const mockEvaluate = jest.spyOn(scrapper, 'evaluate');
        // Mock the return values of Puppeteer's methods
        mockLaunch.mockResolvedValueOnce({
            newPage: async () => ({
                goto: async () => { },
                waitForSelector: async () => { },
                evaluate: async () => 'Mocked Data',
                close: async () => { },
            }),
            close: async () => { },
        });
        // Call the scrapeJSWebsiteByClassName method
        await scrapper.scrapeJSWebsiteByClassName();
        // Assert that the methods were called with the expected parameters
        expect(mockLaunch).toHaveBeenCalledWith();
        expect(mockEvaluate).toHaveBeenCalledWith(expect.any(Function));
        // Perform your assertions on the scraped data here
    });
});
