import { expect } from '@playwright/test'

export class Navigation {
  constructor(page) {
    this.page = page
    this.basketCounter = page.locator('[data-qa="header-basket-count"]')
    this.checkoutLink = page.getByRole('link', { name: 'Checkout' })
    this.burgerButton = page.locator('div[class~="burger-button"]')
  }

  async getBasketCount() {
    this.basketCounter.waitFor()
    const text = await this.basketCounter.innerText()
    return parseInt(text, 10)
  }

  goToCheckout = async () => {
    if (this.burgerButton.isVisible()) {
      await this.burgerButton.click()
    }

    // await this.page.pause()
    await this.checkoutLink.waitFor()
    await this.checkoutLink.click()
    await this.page.waitForURL('/basket') // this will go to localhost:2221/basket
  }
}
