import { expect } from '@playwright/test'

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
    await this.email.fill('admin@email.com')
    await this.password.fill('12345')

    // Click
    await this.registerButton.click()
  }
}
