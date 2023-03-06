require("dotenv").config();
const puppeteer = require("puppeteer");

const getWorkshopCount = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
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
    console.log("reached events list");

    // Clicking on manage button
    elements = await page.$x(
      "/html/body/div[2]/div/div[2]/div[1]/div[2]/div[4]/div/div[1]/div[3]/p[2]/a"
    );
    await elements[0].click();
    await page.waitForNavigation();
    console.log("reached dashboard");

    // click on attendence section
    elements = await page.$x("/html/body/div[2]/div/div[1]/div/ul/li[4]/a/div");
    await elements[0].click();
    await page.waitForNavigation();
    console.log("reached attendance section");
    await page.screenshot({ path: "screenshot.png" });
    await page.waitForXPath(
      "/html/body/div[3]/div[1]/div[2]/div/div/div[2]/div[4]/div[2]/ul/li[3]/a"
    );

    elements = await page.$x(
      "/html/body/div[3]/div[1]/div[2]/div/div/div[2]/div[4]/div[2]/ul/li[3]/a"
    );
    await elements[0].click();
    await page.waitForXPath(
      "/html/body/div[3]/div[1]/div[2]/div/div/div[2]/div[1]/div/div[2]/div[2]/div/form/div[2]/p[1]"
    );
    elements = await page.$x(
      "/html/body/div[3]/div[1]/div[2]/div/div/div[2]/div[1]/div/div[2]/div[2]/div/form/div[2]/p[1]"
    );
    await elements[0].click();
    console.log("selected all fields");

    elements = await page.$x(
      "/html/body/div[3]/div[1]/div[2]/div/div/div[2]/div[1]/div/div[3]/button[1]"
    );
    await elements[0].click();
    await page.screenshot({ path: "screenshot.png" });
    await page.waitForNavigation();
    await page.screenshot({ path: "screenshot.png" });
    // const registrationCount = await page.evaluate(
    //   (element) => element.innerText,
    //   element
    // );
    // console.log(registrationCount);

    await browser.close();

    return registrationCount;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

module.exports = getWorkshopCount;
