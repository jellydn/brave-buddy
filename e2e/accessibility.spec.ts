import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

async function expectNoAccessibilityViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()

  expect(results.violations, results.violations.map((violation) => `${violation.id}: ${violation.help}`).join('\n')).toEqual([])
}

async function createProfile(page: Page) {
  await page.getByLabel('Choose a fun nickname').fill('A11yStar')
  await page.getByRole('button', { name: 'Start my adventure' }).click()
  await expect(page.getByRole('heading', { name: 'Hi A11yStar!' })).toBeVisible()
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('has no automated WCAG A or AA violations in critical child and parent states', async ({ page }) => {
  await expectNoAccessibilityViolations(page)
  await createProfile(page)
  await expectNoAccessibilityViolations(page)

  await page.getByRole('button', { name: 'Start today’s mission' }).click()
  await expectNoAccessibilityViolations(page)
  await page.getByRole('region', { name: 'How might someone feel here?' }).getByRole('button').first().click()
  await expectNoAccessibilityViolations(page)
  await page.getByRole('region', { name: 'What would you do?' }).getByRole('button').first().click()
  await expectNoAccessibilityViolations(page)

  await page.getByRole('button', { name: 'Close story' }).click()
  await page.getByRole('button', { name: 'Toolbox' }).click()
  await expectNoAccessibilityViolations(page)
  await page.getByRole('button', { name: 'Grown-ups' }).click()
  await expectNoAccessibilityViolations(page)
  await page.getByLabel('What is 3 × 4?').fill('12')
  await page.getByRole('button', { name: 'Open parent dashboard' }).click()
  await expectNoAccessibilityViolations(page)
})

test('keeps setup controls in logical keyboard order', async ({ page }) => {
  const expectedNames = [
    'Choose a fun nickname',
    'Choose 🦊 avatar',
    'Choose 🐼 avatar',
    'Choose 🦁 avatar',
    'Choose 🐙 avatar',
    'Choose 🦋 avatar',
    'Choose 🐸 avatar',
    'Ages 6-8 Short & simple',
    'Ages 9-12 More detail',
    'Start my adventure',
  ]

  for (const name of expectedNames) {
    await page.keyboard.press('Tab')
    await expect(page.getByRole(name === expectedNames[0] ? 'textbox' : 'button', { name })).toBeFocused()
  }
})

test('removes transitions when reduced motion is requested', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await createProfile(page)

  const transitionDuration = await page.getByRole('button', { name: 'Start today’s mission' })
    .evaluate((element) => getComputedStyle(element).transitionDuration)

  expect(transitionDuration).toBe('0s')
})
