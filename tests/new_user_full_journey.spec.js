import { test, expect } from '@playwright/test'
import { ProductsPage } from '../page-objects/ProductsPage.js'

test.only('New user Full End to End Test', async ({ page }) => {
  const productsPage = new ProductsPage(page)
  await productsPage.visit()
  //   await page.pause()
})
