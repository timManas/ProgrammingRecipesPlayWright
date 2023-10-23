import { expect } from '@playwright/test'

export class Login {
  constructor(page) {
    this.page = page
    this.loginButton = this.page.locator(
      'button[class~="border-emerald-300"][type=submit]'
    )

    this.registerButton = this.page.locator(
      'button[data-qa="go-to-signup-button"][type=submit]'
    )
  }

  moveToSignUp = async () => {
    await this.registerButton.waitFor()
    await this.registerButton.click()
    await this.page.waitForURL(/\/signup/)
  }
}
