// cambiar la primera linea del import
// @ts-check
import { test, expect } from '@playwright/test';

const CAT_PREFIX_IMAGE_URL = 'http://cataas.com/'
const LOCALHOST_URL = 'http://localhost:5173/'

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  // Expect a title "to contain" a substring.
  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute('src')

  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy
  await expect(imageSrc?.startsWith('hola')).toBeFalsy
});
