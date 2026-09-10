import { describe, expect, it } from 'vitest'
import { scenarios } from '../content/scenarios'
import type { Completion } from '../types'
import { calculateProgress, getDailyScenarios, getPracticedKinds } from './scenarioEngine'

describe('daily practice and progress', () => {
  it('chooses three stories from three different worlds', () => {
    const daily = getDailyScenarios(scenarios, new Date('2026-09-09T12:00:00Z'))
    expect(daily).toHaveLength(3)
    expect(new Set(daily.map((scenario) => scenario.world)).size).toBe(3)
  })

  it('is stable within one UTC day and rotates on the next day', () => {
    const morning = getDailyScenarios(scenarios, new Date('2026-09-09T00:01:00Z'))
    const evening = getDailyScenarios(scenarios, new Date('2026-09-09T23:59:00Z'))
    const tomorrow = getDailyScenarios(scenarios, new Date('2026-09-10T12:00:00Z'))

    expect(evening.map((scenario) => scenario.id)).toEqual(morning.map((scenario) => scenario.id))
    expect(tomorrow.map((scenario) => scenario.id)).not.toEqual(morning.map((scenario) => scenario.id))
  })

  it('returns the requested count when distinct worlds run out', () => {
    const fromOneWorld = scenarios.filter((scenario) => scenario.world === 'friends')
    const duplicateWorld = [fromOneWorld[0], fromOneWorld[1], { ...fromOneWorld[0], id: 'another-friend-story' }]

    expect(getDailyScenarios(fromOneWorld, new Date('2026-09-09T12:00:00Z'), 1)).toHaveLength(1)
    expect(getDailyScenarios(fromOneWorld, new Date('2026-09-09T12:00:00Z'), 3)).toEqual(fromOneWorld)
    expect(getDailyScenarios(duplicateWorld, new Date('2026-09-09T12:00:00Z'), 2)).toHaveLength(2)
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

  it('aggregates all five skill themes from completed authored choices', () => {
    const invite = scenarios.find((scenario) => scenario.id === 'friends-party-upstander')?.choices.find((choice) => choice.id === 'invite')
    const boundary = scenarios.find((scenario) => scenario.id === 'teasing-voice')?.choices.find((choice) => choice.id === 'boundary')
    if (!invite || !boundary) throw new Error('Missing progress test choices')

    const completions: Completion[] = [
      { scenarioId: 'friends-party-upstander', choiceId: invite.id, completedAt: '2026-09-09T00:00:00Z' },
      { scenarioId: 'teasing-voice', choiceId: boundary.id, completedAt: '2026-09-09T00:01:00Z' },
    ]

    expect(calculateProgress(completions, scenarios)).toEqual({
      Courage: 3,
      Kindness: 2,
      Calmness: 2,
      Friendship: 2,
      Safety: 1,
    })
  })

  it('lists each practiced situation type once', () => {
    const completions: Completion[] = [
      { scenarioId: 'friends-playground-join', choiceId: 'ask-role', completedAt: '2026-09-09T00:00:00Z' },
      { scenarioId: 'problems-marker-mixup', choiceId: 'ask-check', completedAt: '2026-09-09T00:01:00Z' },
      { scenarioId: 'unknown', choiceId: 'unknown', completedAt: '2026-09-09T00:02:00Z' },
    ]

    expect(getPracticedKinds(completions, scenarios)).toEqual(['misunderstanding'])
  })
})
