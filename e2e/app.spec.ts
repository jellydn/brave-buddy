import { expect, type Page, test } from '@playwright/test'

async function createProfile(page: Page, ageGroup: '6-8' | '9-12', nickname = 'Sunny') {
  await page.getByLabel('Choose a fun nickname').fill(nickname)
  await page.getByRole('button', { name: new RegExp(`^Ages ${ageGroup}`) }).click()
  await page.getByRole('button', { name: 'Start my adventure' }).click()
  await expect(page.getByRole('heading', { name: `Hi ${nickname}!` })).toBeVisible()
}

async function openParentDashboard(page: Page) {
  await page.getByRole('button', { name: 'Grown-ups' }).click()
  await page.getByLabel('What is 3 × 4?').fill('12')
  await page.getByRole('button', { name: 'Open parent dashboard' }).click()
}

async function answerCurrentStory(page: Page) {
  const see = page.getByRole('region', { name: 'How might someone feel here?' })
  await see.getByRole('button').first().click()
  const respond = page.getByRole('region', { name: 'What would you do?' })
  await respond.getByRole('button').first().click()
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('publishes the Brave Buddy app identity and local icon assets', async ({ page, request }) => {
  await expect(page).toHaveTitle('Brave Buddy — Starring Generation Kids')
  await expect(page.locator('meta[name="application-name"]')).toHaveAttribute('content', 'Brave Buddy')
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://brave-buddy.itman.fyi/assets/brave-buddy-logo.png')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://brave-buddy.itman.fyi/')
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', '/site.webmanifest')

  for (const path of ['/favicon.ico', '/favicon-32x32.png', '/apple-touch-icon.png', '/assets/brave-buddy-logo.png', '/assets/icon-192.png', '/site.webmanifest']) {
    const response = await request.get(path)
    expect(response.ok(), `${path} should be published`).toBe(true)
  }
})

for (const ageGroup of ['6-8', '9-12'] as const) {
  test(`persists an ages ${ageGroup} profile`, async ({ page }) => {
    await createProfile(page, ageGroup, `Star${ageGroup.replace('-', '')}`)
    await page.reload()

    await expect(page.getByRole('heading', { name: `Hi Star${ageGroup.replace('-', '')}!` })).toBeVisible()
    await openParentDashboard(page)
    await expect(page.getByRole('region', { name: 'Practice summary' }).getByText(ageGroup, { exact: true })).toBeVisible()
  })
}

test('moves through a daily SEE, THINK, RESPOND, GET HELP story', async ({ page }) => {
  await createProfile(page, '6-8')
  await page.getByRole('button', { name: 'Start today’s mission' }).click()

  const framework = page.getByRole('list', { name: 'SEE then THINK then RESPOND then GET HELP' })
  const steps = framework.getByRole('listitem')
  await expect(steps).toHaveCount(4)
  for (const [index, step] of ['SEE', 'THINK', 'RESPOND', 'GET HELP'].entries()) {
    await expect(steps.nth(index)).toContainText(step)
  }

  await answerCurrentStory(page)
  await expect(page.getByText('What happens next')).toBeVisible()
  await page.getByRole('button', { name: 'Next story' }).click()
  await expect(page.getByRole('progressbar', { name: 'Stories complete' })).toHaveAttribute('aria-valuenow', '2')
})

test('shows trusted-adult guidance for every story in the Bullying world', async ({ page }) => {
  await createProfile(page, '9-12')
  await page.getByRole('button', { name: /Bullying/ }).click()

  for (let story = 0; story < 2; story += 1) {
    await answerCurrentStory(page)
    await expect(page.getByRole('note', { name: 'Trusted adult guidance' })).toContainText('Move toward safety and tell a trusted adult.')
    await page.getByRole('button', { name: story === 0 ? 'Next story' : 'Finish adventure' }).click()
  }

  await expect(page.getByRole('heading', { name: 'Hi Sunny!' })).toBeVisible()
})

test('saves, restores, and removes a response strategy from the Toolbox', async ({ page }) => {
  await createProfile(page, '9-12')
  await page.getByRole('button', { name: /Teasing/ }).click()
  await answerCurrentStory(page)
  await page.getByRole('button', { name: 'Save this strategy' }).click()
  await expect(page.getByRole('button', { name: 'Saved to Toolbox' })).toBeDisabled()

  await page.reload()
  await page.getByRole('button', { name: 'Toolbox' }).click()

  await expect(page.getByRole('heading', { name: 'Response Toolbox' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Use a short boundary: “Stop. I do not like that.”' })).toBeVisible()

  await page.getByRole('button', { name: /Remove .* from Toolbox/ }).click()
  await expect(page.getByRole('heading', { name: 'Your toolbox is ready to grow' })).toBeVisible()
  await page.reload()
  await page.getByRole('button', { name: 'Toolbox' }).click()
  await expect(page.getByRole('heading', { name: 'Your toolbox is ready to grow' })).toBeVisible()
})

test('protects the parent dashboard and deletes all local progress', async ({ page }) => {
  await createProfile(page, '6-8')
  await page.getByRole('button', { name: /Making Friends/ }).click()
  await answerCurrentStory(page)
  await page.getByRole('button', { name: 'Next story' }).click()
  await page.getByRole('button', { name: 'Close story' }).click()
  await page.reload()

  await page.getByRole('button', { name: 'Grown-ups' }).click()
  await page.getByLabel('What is 3 × 4?').fill('10')
  await page.getByRole('button', { name: 'Open parent dashboard' }).click()
  await expect(page.getByRole('alert')).toHaveText('Not quite. Please try again.')

  await page.getByLabel('What is 3 × 4?').fill('12')
  await page.getByRole('button', { name: 'Open parent dashboard' }).click()
  await expect(page.getByRole('heading', { name: 'Sunny’s growing skills' })).toBeVisible()
  const summary = page.getByRole('region', { name: 'Practice summary' })
  await expect(summary.getByText('stories practiced', { exact: true })).toBeVisible()
  await expect(summary.getByRole('definition').first()).toHaveText('1')
  await expect(page.getByRole('heading', { name: 'Family conversation starters' })).toBeVisible()

  await page.getByRole('button', { name: 'Delete local profile and progress' }).click()
  await expect(page.getByRole('heading', { name: 'Welcome, brave star!' })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Welcome, brave star!' })).toBeVisible()
})

test('has visible keyboard focus and no horizontal overflow at 390 px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  const nickname = page.getByLabel('Choose a fun nickname')

  await page.keyboard.press('Tab')
  await expect(nickname).toBeFocused()
  await expect(nickname).toHaveCSS('outline-style', 'solid')
  await page.keyboard.type('MobileStar')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Choose 🦊 avatar' })).toBeFocused()
  await page.keyboard.press('Enter')
  await page.getByRole('button', { name: 'Start my adventure' }).click()

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
  expect(hasHorizontalOverflow).toBe(false)

  await page.reload()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Go to adventure map' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Adventure', exact: true })).toBeFocused()
  await page.keyboard.press('Tab')
  const toolbox = page.getByRole('button', { name: 'Toolbox' })
  await expect(toolbox).toBeFocused()
  await expect(toolbox).toHaveCSS('outline-style', 'solid')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('heading', { name: 'Response Toolbox' })).toBeVisible()
})
