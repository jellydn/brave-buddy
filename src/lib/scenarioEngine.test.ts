import { describe, expect, it } from 'vitest'
import { scenarios } from '../content/scenarios'
import type { Completion } from '../types'
import { calculateProgress, getDailyScenarios } from './scenarioEngine'

describe('daily practice and progress', () => {
  it('chooses three stories from three different worlds', () => {
    const daily = getDailyScenarios(scenarios, new Date('2026-09-09T12:00:00Z'))
    expect(daily).toHaveLength(3)
    expect(new Set(daily.map((scenario) => scenario.world)).size).toBe(3)
  })

  it('scores only the selected authored outcome and ignores unknown records', () => {
    const scenario = scenarios[0]
    const helpful = scenario.choices.find((choice) => choice.quality === 'helpful')
    if (!helpful) throw new Error('Missing helpful test choice')
    const completions: Completion[] = [
      { scenarioId: scenario.id, choiceId: helpful.id, completedAt: '2026-09-09T00:00:00Z' },
      { scenarioId: 'unknown', choiceId: 'unknown', completedAt: '2026-09-09T00:00:00Z' },
    ]

    expect(calculateProgress(completions, scenarios)).toMatchObject({ Courage: 2, Friendship: 2, Kindness: 0 })
  })
})
