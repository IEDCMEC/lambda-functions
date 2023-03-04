require("dotenv").config();
const puppeteer = require("puppeteer");
module.exports = getWorkShopCount = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  });
  const page = await browser.newPage();
  await page.goto("https://in.explara.com/a/login");
  await page.type("#usernameSignIn", process.env.EXPLARA_EMAIL);
  await page.type("#passwordSignIn", process.env.EXPLARA_PASSWORD);

  await page.waitForNavigation();

  await page.waitForSelector("#product");
  await page.click("#product");

  // Clicking on Event icon
  let elements = await page.$x(
    '//*[@id="navbarNav"]/ul/li[1]/div[2]/div[1]/a[1]/div/div/div'
  );
  console.log("here");
};
