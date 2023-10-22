import { expect } from '@playwright/test'

export class Navigation {
  constructor(page) {
    this.page = page
    this.basketCounter = page.locator('[data-qa="header-basket-count"]')
    this.checkoutLink = page.getByRole('link', { name: 'Checkout' })
  }

  async getBasketCount() {
    this.basketCounter.waitFor()
    const text = await this.basketCounter.innerText()
    return parseInt(text, 10)
  }

  goToCheckout = async () => {
    await this.checkoutLink.waitFor()
    await this.checkoutLink.click()
    await this.page.waitForURL('/basket') // this will go to localhost:2221/basket
  }
}
