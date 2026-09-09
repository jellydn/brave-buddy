import type { Completion, Scenario, Skill } from '../types'

export const skillNames: Skill[] = ['Courage', 'Kindness', 'Calmness', 'Friendship', 'Safety']

export function validateScenarios(items: Scenario[]): string[] {
  const errors: string[] = []
  const ids = new Set<string>()

  for (const scenario of items) {
    if (ids.has(scenario.id)) errors.push(`${scenario.id}: duplicate id`)
    ids.add(scenario.id)
    if (scenario.choices.length < 3 || scenario.choices.length > 4) {
      errors.push(`${scenario.id}: must have 3–4 choices`)
    }
    if (!scenario.feelings.some((feeling) => feeling.id === scenario.likelyFeeling)) {
      errors.push(`${scenario.id}: likely feeling is not offered`)
    }
    if (!scenario.choices.some((choice) => choice.quality === 'helpful')) {
      errors.push(`${scenario.id}: needs a helpful choice`)
    }
    if (scenario.requiresAdultHelp && !scenario.choices.some((choice) => choice.quality === 'helpful' && choice.getsAdultHelp)) {
      errors.push(`${scenario.id}: urgent scenario needs a helpful adult-escalation choice`)
    }
  }

  return errors
}

export function getDailyScenarios(items: Scenario[], date: Date, count = 3): Scenario[] {
  if (items.length <= count) return items
  const day = Math.floor(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 86_400_000)
  const start = day % items.length
  const result: Scenario[] = []
  const usedWorlds = new Set<string>()

  for (let offset = 0; offset < items.length && result.length < count; offset += 1) {
    const scenario = items[(start + offset) % items.length]
    if (!usedWorlds.has(scenario.world)) {
      result.push(scenario)
      usedWorlds.add(scenario.world)
    }
  }

  for (let offset = 0; result.length < count; offset += 1) {
    const scenario = items[(start + offset) % items.length]
    if (!result.includes(scenario)) result.push(scenario)
  }

  return result
}

export function calculateProgress(completions: Completion[], items: Scenario[]): Record<Skill, number> {
  const totals = Object.fromEntries(skillNames.map((skill) => [skill, 0])) as Record<Skill, number>

  for (const completion of completions) {
    const scenario = items.find((item) => item.id === completion.scenarioId)
    const choice = scenario?.choices.find((item) => item.id === completion.choiceId)
    if (!choice) continue
    for (const skill of skillNames) totals[skill] += choice.skills[skill] ?? 0
  }

  return totals
}

export function getPracticedKinds(completions: Completion[], items: Scenario[]): string[] {
  const completedIds = new Set(completions.map((completion) => completion.scenarioId))
  return [...new Set(items.filter((scenario) => completedIds.has(scenario.id)).map((scenario) => scenario.kind))]
}
