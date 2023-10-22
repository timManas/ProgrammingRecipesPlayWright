import { expect } from '@playwright/test'
import { Navigation } from './Navigation.js'

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

    const navigation = new Navigation(this.page)
    const basketCountBeforeAdding = await navigation.getBasketCount()

    await specificAddButton.click() // Click

    await expect(specificAddButton).toHaveText('Remove from Basket')
    const basketCountAfterAdding = await navigation.getBasketCount()

    expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
  }
}
