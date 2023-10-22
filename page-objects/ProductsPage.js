import { expect } from '@playwright/test'

export class ProductsPage {
  // Place all PageObjects here in constructor
  constructor(page) {
    this.page = page
    this.addButtons = page.locator('[data-qa="product-button"]')
  }

  // This is visit function
  visit = async () => {
    await this.page.goto('/')
  }

  async addProductToBasket(index) {
    const specificAddButton = this.addButtons.nth(index)
    await specificAddButton.waitFor()

    await expect(specificAddButton).toHaveText('Add to Basket')
    await specificAddButton.click()
    await expect(specificAddButton).toHaveText('Remove from Basket')
  }
}
