import { test } from '@playwright/test'
import { MyAccountPage } from '../page-objects/MyAccountPage.js'
import { getLoginToken } from '../api-calls/getLoginToken.js'

test.only('My account using cookie injection', async ({ page }) => {
  // Make a request to get login token
  const loginToken = await getLoginToken()
  console.log({ loginToken })

  // Inject login to the browser

  const myAccount = new MyAccountPage(page)
  await myAccount.visit()

  // This is part where we inject a cookie to be able to login
  await page.evaluate(
    (loginTokenInsideBrowserCode) => {
      document.cookie = 'token=' + loginTokenInsideBrowserCode
    },
    [loginToken]
  )

  await myAccount.visit()
  await myAccount.waitForPageHeading()
})
