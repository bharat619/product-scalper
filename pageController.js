const pageScraper = require("./pageScraper");

async function scrapeAll(browserInstance, email, password, product) {
  try {
    const browser = await browserInstance;
    await pageScraper.scraper(browser, email, password, product);
  } catch (error) {
    console.log("Could not resolve the browser instance => ", error);
  }
}

module.exports = (browserInstance, email, password, product) =>
  scrapeAll(browserInstance, email, password, product);
