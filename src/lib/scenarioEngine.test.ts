import { describe, expect, it } from 'vitest'
import { scenarios } from '../content/scenarios'
import type { Completion, Scenario } from '../types'
import { calculateProgress, getDailyScenarios, validateScenarios } from './scenarioEngine'

describe('scenario content safety', () => {
  it('accepts all curated scenarios', () => {
    expect(validateScenarios(scenarios)).toEqual([])
  })

  it('rejects an urgent scenario without a helpful adult-help response', () => {
    const source = scenarios.find((scenario) => scenario.requiresAdultHelp)!
    const unsafeCopy: Scenario = {
      ...source,
      id: 'missing-help-path',
      choices: source.choices.map((choice) => ({ ...choice, getsAdultHelp: false })),
    }

    expect(validateScenarios([unsafeCopy])).toContain('missing-help-path: urgent scenario needs a helpful adult-escalation choice')
  })

  it('covers all five situation distinctions', () => {
    expect(new Set(scenarios.map((scenario) => scenario.kind))).toEqual(new Set(['misunderstanding', 'conflict', 'teasing', 'bullying', 'unsafe']))
  })
})

describe('daily practice and progress', () => {
  it('chooses three stories from three different worlds', () => {
    const daily = getDailyScenarios(scenarios, new Date('2026-09-09T12:00:00Z'))
    expect(daily).toHaveLength(3)
    expect(new Set(daily.map((scenario) => scenario.world)).size).toBe(3)
  })

  it('scores only the selected authored outcome and ignores unknown records', () => {
    const scenario = scenarios[0]
    const helpful = scenario.choices.find((choice) => choice.quality === 'helpful')!
    const completions: Completion[] = [
      { scenarioId: scenario.id, choiceId: helpful.id, completedAt: '2026-09-09T00:00:00Z' },
      { scenarioId: 'unknown', choiceId: 'unknown', completedAt: '2026-09-09T00:00:00Z' },
    ]

    expect(calculateProgress(completions, scenarios)).toMatchObject({ Courage: 2, Friendship: 2, Kindness: 0 })
  })
})
