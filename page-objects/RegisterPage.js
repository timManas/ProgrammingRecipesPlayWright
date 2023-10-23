import { expect } from '@playwright/test'
import { v4 as uuidv4 } from 'uuid'

export class RegisterPage {
  constructor(page) {
    this.page = page
    this.email = this.page.locator("input[type='text'][placeholder='E-Mail']")
    this.password = this.page.locator(
      "input[type='text'][placeholder='Password']"
    )
    this.registerButton = this.page.locator(
      'button[class~="border-emerald-300"][type=submit]'
    )
  }

  signUpAsNewUser = async () => {
    await this.email.waitFor()
    await this.password.waitFor()
    await this.registerButton.waitFor()

    // Fill email and password
    const emailId = uuidv4()
    await this.email.fill(emailId + '@email.com')
    await this.password.fill('12345')

    // Click
    await this.registerButton.click()
  }
}
