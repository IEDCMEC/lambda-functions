require("dotenv").config()
const puppeteer = require("puppeteer")

const getExplara = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // Not setting the viewport size will lead to pupeteer opening the site on a smaller screen.
    // This leads to many of the buttons used to reach the dashboard being hidden.
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
  })

  const page = await browser.newPage()
  await page.goto("https://in.explara.com/a/login")

  await page.type("#usernameSignIn", process.env.EXPLARA_EMAIL)
  await page.type("#passwordSignIn", process.env.EXPLARA_PASSWORD)
  await page.click("#loggedInUserPage")

  await page.waitForNavigation()

  await page.waitForSelector("#product")
  await page.click("#product")

  // Clicking on Event icon
  let elements = await page.$x(
    '//*[@id="navbarNav"]/ul/li[1]/div[2]/div[1]/a[1]/div/div/div'
  )
  await elements[0].click()

  await page.waitForNavigation()

  // Clicking on manage button
  elements = await page.$x(
    '//*[@id="content_of_upcoming_event"]/div[1]/div/div[1]/div[3]/p[2]'
  )
  await elements[0].click()

  await page.waitForNavigation()

  // Clicking on dashboard button ticket button from sidebar
  // !! Not working !!
  elements = await page.$x('//*[@id="panel2"]/div/div/div[1]/ul/li[2]')
  await elements[0].click()

  await page.waitForNavigation()

  await page.screenshot({ path: "screenshot.png" })

  await browser.close()

  return "Explara"
}

module.exports = getExplara
