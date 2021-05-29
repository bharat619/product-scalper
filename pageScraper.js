const scraperObject = {
  // url: "https://www.amazon.in/PS5-Marvels-Spiderman-Miles-Morales/dp/B08RFC9DRQ/ref=pd_sbs_3/258-7365067-4173358?pd_rd_w=uumL0&pf_rd_p=0c8e3028-bc6c-4807-b0b1-4a89b7a75284&pf_rd_r=WF9YTVAAV4Z47NTYMSTB&pd_rd_r=43aa3291-b699-4e8b-8fe0-d7a6e3cb4d2b&pd_rd_wg=WI4VH&pd_rd_i=B08RFC9DRQ&psc=1",
  async scraper(browser, email, password, product) {
    const page = await browser.newPage();
    console.log(`Navigating to ${product}`);
    this.page = page;
    await page.goto(product);
    // check for add to cart button
    let button = await page.$("#add-to-cart-button");

    // refresh the page till ad to cart button isnt available
    while (!button) {
      await page.reload({ waitUntil: ["domcontentloaded"] });
      button = await page.$("#add-to-cart-button");
    }

    // click the add to cart button and wait for next page to load
    await clickAndLoadPage(page, null, button);

    // click on proceed to checkout button
    await clickAndLoadPage(page, ".a-button-text.a-text-center");

    // fll in email
    await this.fillInputField("#ap_email", email);

    // click continue
    await clickAndLoadPage(page, ".a-button-input");

    // fill in password
    await this.fillInputField("#ap_password", password);

    // click continue
    await clickAndLoadPage(page, ".a-button-input");

    // click on Deliver to this address button
    await clickAndLoadPage(page, ".a-declarative.a-button-text");

    // voilaa... Make your payment manually and continue
  },

  fillInputField: async function (selector, inputValue) {
    await this.page.$eval(
      selector,
      (el, value) => (el.value = value),
      inputValue
    );
  },
};

async function clickAndLoadPage(page, selector = null, button = null) {
  const clicker = button || (await page.$(selector));
  await Promise.all([
    clicker.click(),
    page.waitForNavigation({
      waitUntil: ["domcontentloaded"],
    }),
  ]);
}

module.exports = scraperObject;
