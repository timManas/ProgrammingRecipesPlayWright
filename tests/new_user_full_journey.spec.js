import { test, expect } from '@playwright/test'
import { v4 as uuidv4 } from 'uuid'
import { ProductsPage } from '../page-objects/ProductsPage.js'
import { Navigation } from '../page-objects/Navigation.js'
import { Checkout } from '../page-objects/Checkout.js'
import { Login } from '../page-objects/Login.js'
import { RegisterPage } from '../page-objects/RegisterPage.js'
import { DeliveryDetails } from '../page-objects/DeliveryDetails.js'
import { deliveryDetails as userAddress } from '../data/deliveryDetails.js'

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

  const registerPage = new RegisterPage(page)
  const emailId = uuidv4() + '@email.com'
  const password = uuidv4()
  await registerPage.signUpAsNewUser(emailId, password)

  const deliveryDetails = new DeliveryDetails(page)
  await deliveryDetails.fillDeliveryDetails(userAddress)
  await deliveryDetails.saveDetails()

  await page.pause()
})
