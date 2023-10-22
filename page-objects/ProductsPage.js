import { expect } from '@playwright/test'
import { Navigation } from './Navigation.js'

export class ProductsPage {
  // Place all PageObjects here in constructor
  constructor(page) {
    this.page = page
    this.addButtons = page.locator('[data-qa="product-button"]')
    this.sortDropDown = page.locator('select[data-qa="sort-dropdown"]')
    this.cardPrice = page.locator('[datatype="product-price"]')
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

  sortByCheapest = async () => {
    await this.sortDropDown.waitFor()

    // Get Elements
    let priceBeforeSort = await this.cardPrice.allInnerTexts()
    priceBeforeSort = priceBeforeSort.map((element) => {
      element.replace('$', '')
      return parseInt(element)
    })
    console.log('Before Sort price: ' + priceBeforeSort)
    console.log(
      'isSorted: ' +
        priceBeforeSort.every(
          (value, index, array) => (index === 0) | (value >= array[index - 1])
        )
    )

    // Sort by price ascending
    await this.sortDropDown.selectOption('price-asc')

    // Fetch the new ordered prices
    let priceAfterSort = await this.cardPrice.allInnerTexts()
    priceAfterSort = priceAfterSort.map((element) => {
      element.replace('$', '')
      return parseInt(element)
    })
    console.log('After Sort price: ' + priceAfterSort)
    console.log(
      'isSorted: ' +
        priceAfterSort.every(
          (value, index, array) => (index === 0) | (value >= array[index - 1])
        )
    )
  }
}
