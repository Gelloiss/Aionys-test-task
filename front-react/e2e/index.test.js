const faker = require('faker');
const puppeteer = require('puppeteer');

let browser
let page

beforeAll(async () => {
  // launch browser
  browser = await puppeteer.launch(
    {
      //headless: false, // headless mode set to false so browser opens up with visual feedback
      //slowMo: 20, // how slow actions should be
    }
  )
  // creates a new page in the opened browser
  page = await browser.newPage()
})

describe('notes', () => {
  test('add note', async () => {
    const testText = Math.random().toString(36).substring(7);

    await page.goto('http://localhost:3000/');
    await page.waitForSelector('button');

    await page.click('textarea');
    await page.type('textarea', testText);
    await page.click('button');

    await page.waitForFunction(function (testText) {
      return Array.from(document.querySelectorAll('p')).filter(it => it.innerHTML === testText).length > 0
    }, { polling: 100 }, testText);


  }, 1600000);
});

// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
  browser.close()
})
