import { expect } from '@playwright/test'

export class Navigation {
  constructor(page) {
    this.page = page
    this.basketCounter = page.locator('[data-qa="header-basket-count"]')
  }

  async getBasketCount() {
    this.basketCounter.waitFor()
    const text = await this.basketCounter.innerText()
    return parseInt(text, 10)
  }
}
