import { test, expect } from '@playwright/test'

test('un usuario inicia sesión y ve el listado de mascotas', async ({ page }) => {
  // 1. Login
  await page.goto('/login')
  await page.getByLabel('Email').fill('valen@fluffy.com')
  // exact: true evita que matchee también el botón "Mostrar contraseña"
  await page.getByLabel('Contraseña', { exact: true }).fill('valen123')
  await page.getByRole('button', { name: 'Ingresar' }).click()

  // Esperar a que salga de /login (redirige según el rol)
  await page.waitForURL((url) => !url.pathname.startsWith('/login'))

  // 2. Listado de mascotas (/adopt lo pueden ver Adopter, Publisher y Admin)
  await page.goto('/adopt')
  await expect(page).toHaveURL(/\/adopt$/)

  // 3. Hay al menos una tarjeta de mascota
  await expect(
    page.getByRole('link', { name: 'Solicitar adopción' }).first(),
  ).toBeVisible()
})