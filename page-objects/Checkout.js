import { expect } from '@playwright/test'

export class Checkout {
  constructor(page) {
    this.page = page

    this.basketCards = page.locator('[data-qa="basket-card"]')
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
    this.basketItemRemovedButton = page.locator(
      '[data-qa="basket-card-remove-item"]'
    )
  }

  removeCheapestProduct = async () => {
    await this.basketCards.first().waitFor()
    await this.basketItemPrice.first().waitFor()

    const itemsBeforeRemoval = await this.basketCards.count()

    // Get all InnerText
    const allPriceTest = await this.basketItemPrice.allInnerTexts()
    const nums = allPriceTest.map((element) => {
      const formatted = element.replace('?', '')
      return parseInt(formatted)
    })

    // Find the smallest Price and its index
    const smallestPrice = Math.min(...nums)
    const smallestPriceIndex = nums.indexOf(smallestPrice)

    // Click on smallest price card and remove it
    const smallestPriceRemoveButton =
      this.basketItemRemovedButton.nth(smallestPriceIndex)
    await smallestPriceRemoveButton.waitFor()
    await smallestPriceRemoveButton.click()

    // Validate the number of cards left in checkout
    await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)
  }
}
