// scrapper.helper.test.ts
import { ScrapperHelpher } from '../src/helphers/scraper.helpher'; 


describe('ScrapperHelpher', () => {
    it('should scrape data from a website by class name', async () => {
      // Define a URL and class name for testing
      const url = 'https://p2p.binance.com/en/trade/all-payments/USDT?fiat=NGN';
      const className = 'css-onyc9z';
  
      // Create an instance of ScrapperHelpher
      const scrapper = new ScrapperHelpher();
  
      // Mock Puppeteer's launch and evaluate methods
      const mockLaunch = jest.spyOn(scrapper as any, 'launch');
      const mockEvaluate = jest.spyOn(scrapper as any, 'evaluate');
  
      // Mock the return values of Puppeteer's methods
      mockLaunch.mockResolvedValueOnce({
        newPage: async () => ({
          goto: async () => {},
          waitForSelector: async () => {},
          evaluate: async () => 'Mocked Data', // Replace with your desired mocked data
          close: async () => {},
        }),
        close: async () => {},
      });
  
      // Call the scrapeJSWebsiteByClassName method
      await scrapper.scrapeJSWebsiteByClassName( );
  
      // Assert that the methods were called with the expected parameters
      expect(mockLaunch).toHaveBeenCalledWith();
      expect(mockEvaluate).toHaveBeenCalledWith(expect.any(Function));
  
      // Perform your assertions on the scraped data here
    });
  });
