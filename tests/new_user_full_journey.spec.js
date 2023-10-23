import { test, expect } from '@playwright/test'
import { ProductsPage } from '../page-objects/ProductsPage.js'
import { Navigation } from '../page-objects/Navigation.js'
import { Checkout } from '../page-objects/Checkout.js'
import { Login } from '../page-objects/Login.js'

test.only('New user Full End to End Test', async ({ page }) => {
  const productsPage = new ProductsPage(page)
  await productsPage.visit()
  await productsPage.sortByCheapest()
  await productsPage.addProductToBasket(0)
  await productsPage.addProductToBasket(1)
  await productsPage.addProductToBasket(2)

  const navigation = new Navigation(page)
  await navigation.goToCheckout()

  const checkout = new Checkout(page)
  await checkout.removeCheapestProduct()
  await checkout.continueToCheckout()

  const login = new Login(page)
  await login.moveToSignUp()

  await page.pause()
})
