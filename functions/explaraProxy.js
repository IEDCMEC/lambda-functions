require("dotenv").config();
const puppeteer = require("puppeteer");

const getExplara = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      // Not setting the viewport size will lead to pupeteer opening the site on a smaller screen.
      // This leads to many of the buttons used to reach the dashboard being hidden.
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });

    const page = await browser.newPage();
    await page.goto("https://in.explara.com/a/login");

    await page.type("#usernameSignIn", process.env.EXPLARA_EMAIL);
    await page.type("#passwordSignIn", process.env.EXPLARA_PASSWORD);
    await page.click("#loggedInUserPage");

    await page.waitForNavigation();

    await page.waitForSelector("#product");
    await page.click("#product");

    // Clicking on Event icon
    let elements = await page.$x(
      '//*[@id="navbarNav"]/ul/li[1]/div[2]/div[1]/a[1]/div/div/div'
    );
    console.log("here");

    await elements[0].click();

    await page.waitForNavigation();

    // await page.screenshot({ path: "screenshot2.png" });
    // Clicking on manage button
    elements = await page.$x(
      "/html/body/div[2]/div/div[2]/div[1]/div[2]/div[3]/div/div[1]/div[3]/p[2]/a"
    );
    await elements[0].click();

    await page.waitForNavigation();

    await page.waitForSelector(".data-count");
    const element = await page.$(".data-count");
    const registrationCount = await page.evaluate(
      (element) => element.innerText,
      element
    );
    // console.log(registrationCount);
    // console.log(typeof registrationCount);

    await page.screenshot({ path: "screenshot.png" });

    await browser.close();

    return registrationCount;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};
// getExplara().then((res) => console.log(res));

module.exports = getExplara;
