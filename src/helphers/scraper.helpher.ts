import puppeteer, { Browser, Page } from 'puppeteer';
import * as Sentry from '@sentry/node';

export class ScrapperHelpher {
  private browser: Browser | null = null;
  private page: Page | null = null;

  constructor() { }

  private async launchBrowser() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
  }

  private async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  public async scrapeJSWebsiteByClassName() {
    const url = "https://p2p.binance.com/en/trade/sell/USDT?fiat=NGN&payment=all-payments";
    const searchResultSelector = 'button';
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {

     
      page.waitForTimeout(100000);

      await page.goto(url);
      // Set screen size
      await page.setViewport({ width: 1080, height: 1024 });
      await page.waitForSelector(searchResultSelector);

      const textSelector = await page.waitForSelector(
        'div.css-onyc9z'
      );


      const price = await page.evaluate(() => {
        const prices = document.querySelectorAll('div.css-onyc9z');
        const resp: any[] = [];
        console.log(prices);
        prices.forEach((p) => {
          resp.push(p.textContent)
        })
        return resp;
      })


      console.log('The full prices "%s".', price);
      const firstFiveNumbers = price.slice(0, 5);

      // Convert the string numbers to floats and calculate their sum
      const sum = firstFiveNumbers.reduce((acc: number, numStr: string) => acc + parseFloat(numStr), 0);

      // Calculate the average
      const average = sum / firstFiveNumbers.length;

      console.log('Average:', average.toFixed(2));



      await browser.close();

      return average;
    } catch (error) {
      await browser.close();
      console.error('Error:', error);
      Sentry.captureException(error);
      throw error;
    } 
  }
}

