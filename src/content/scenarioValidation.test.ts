import { describe, expect, it } from 'vitest'
import type { Scenario } from '../types'
import { getPlayableScenarios, scenarioCatalog } from './scenarios'
import { validateScenarios } from './scenarioValidation'

function copyScenario(id: string): Scenario {
  const scenario = scenarioCatalog.find((item) => item.id === id)
  if (!scenario) throw new Error(`Missing test scenario: ${id}`)
  return structuredClone(scenario)
}

describe('scenario content validation', () => {
  it('accepts the full human-authored catalog', () => {
    expect(validateScenarios(scenarioCatalog)).toEqual([])
  })

  it('covers all five situation distinctions', () => {
    expect(new Set(scenarioCatalog.map((scenario) => scenario.kind))).toEqual(new Set(['misunderstanding', 'conflict', 'teasing', 'bullying', 'unsafe']))
  })

  it('keeps withdrawn scenarios in the catalog but out of practice', () => {
    const withdrawn = copyScenario('friends-playground-join')
    withdrawn.editorial.status = 'withdrawn'
    const active = copyScenario('friends-party-upstander')

    expect(getPlayableScenarios([withdrawn, active])).toEqual([active])
  })

  it('rejects unsafe content that bypasses the adult-help flag', () => {
    const scenario = copyScenario('problems-pressure-dare')
    scenario.requiresAdultHelp = false

    expect(validateScenarios([scenario])).toContain(`${scenario.id}: bullying and unsafe scenarios must require adult help`)
  })

  it('rejects an urgent scenario without a helpful adult-help response', () => {
    const scenario = copyScenario('bullying-repeated-exclusion')
    scenario.choices = scenario.choices.map((choice) => ({ ...choice, getsAdultHelp: false }))

    expect(validateScenarios([scenario])).toContain(`${scenario.id}: urgent scenario needs a helpful adult-escalation choice`)
  })

  it('rejects duplicate choice IDs and missing age-band text', () => {
    const scenario = copyScenario('friends-playground-join')
    scenario.choices[1].id = scenario.choices[0].id
    scenario.choices[0].label['9-12'] = ' '

    expect(validateScenarios([scenario])).toEqual(expect.arrayContaining([
      `${scenario.id}.${scenario.choices[0].id}: duplicate choice id`,
      `${scenario.id}.${scenario.choices[0].id}.label.9-12: text is required`,
    ]))
  })

  it('rejects harmful instructions in a helpful response', () => {
    const scenario = copyScenario('teasing-voice')
    const helpful = scenario.choices.find((choice) => choice.quality === 'helpful')
    if (!helpful) throw new Error('Missing helpful test choice')
    helpful.strategy = { '6-8': 'Hit them back.', '9-12': 'Threaten them back.' }

    expect(validateScenarios([scenario])).toContain(`${scenario.id}.${helpful.id}: helpful choice contains a prohibited retaliation or secrecy instruction`)
  })

  it('does not treat automated checks as expert approval', () => {
    const scenario = copyScenario('friends-party-upstander')
    scenario.editorial.status = 'approved'

    expect(validateScenarios([scenario])).toContain(`${scenario.id}: approved or published content needs a named reviewer and valid review date`)
  })
})
