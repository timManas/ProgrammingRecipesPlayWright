import { test, expect } from '@playwright/test'

test('Product Page Add To Basket', async ({ page }) => {
  await page.goto('/') // Go to base url page ...which is set in the baseURL

  // Locate Button
  const addToBasketButton = page.locator('[data-qa="product-button"]').first()
  const basketCounter = page.locator('[data-qa="header-basket-count"]')

  await addToBasketButton.waitFor() // This line is critical in bug hunting
  await expect(addToBasketButton).toHaveText('Add to Basket')
  await expect(basketCounter).toHaveText('0')

  await addToBasketButton.click() // Click a button

  await expect(addToBasketButton).toHaveText('Remove from Basket')
  await expect(basketCounter).toHaveText('1')

  const checkoutLink = page.getByRole('link', { name: 'Checkout' })
  await checkoutLink.waitFor()
  await checkoutLink.click()

  await page.waitForURL('/baskets') // this will go to localhost:2221/basket

  //   await page.pause()
})
