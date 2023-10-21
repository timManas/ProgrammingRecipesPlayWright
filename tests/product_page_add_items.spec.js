import { test, expect } from '@playwright/test'

test('Product Page Add To Basket', async ({ page }) => {
  await page.goto('localhost:2221') // How to go to a website

  // Locate Button
  const addToBasketButton = page.locator('[data-qa="product-button"]').first()
  const basketCounter = page.locator('[data-qa="header-basket-count"]')

  await addToBasketButton.waitFor() // This line is critical in bug hunting
  await expect(addToBasketButton).toHaveText('Add to Basket')
  await expect(basketCounter).toHaveText('0')

  await addToBasketButton.click() // Click a button
  //   await page.pause()

  await expect(addToBasketButton).toHaveText('Remove from Basket')
  await expect(basketCounter).toHaveText('1')
})
