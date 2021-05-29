const browserObject = require("./browser");
const scraperController = require("./pageController");

const email = process.argv[2];
const password = process.argv[3];
const product = process.argv[4];

// start the browser instance and create a browser instance
const browserInstance = browserObject.startBrowser();

// pass the browser instane to scraper
scraperController(browserInstance, email, password, product);
