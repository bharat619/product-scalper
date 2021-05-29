const puppeteer = require("puppeteer");

async function startBrowser() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
      ignoreDefaultArgs: ["--enable-automation"],
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });

    return browser;
  } catch (error) {
    console.log(`error: ${error}`);
    return null;
  }
}

module.exports = { startBrowser };
