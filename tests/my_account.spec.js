import { test } from '@playwright/test'
import { MyAccountPage } from '../page-objects/MyAccountPage.js'
import { getLoginToken } from '../api-calls/getLoginToken.js'
import { adminDetails } from '../data/userDetails.js'

test('My account using cookie injection', async ({ page }) => {
  // Make a request to get login token
  const loginToken = await getLoginToken(
    adminDetails.username,
    adminDetails.password
  )
  console.log({ loginToken })

  const myAccount = new MyAccountPage(page)
  await myAccount.visit()

  // Inject login to the browser
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
