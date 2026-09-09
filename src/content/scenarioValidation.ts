import type { AgeText, Choice, Scenario } from '../types'

const ageGroups: (keyof AgeText)[] = ['6-8', '9-12']
const unsafeRecommendationPatterns = [
  /\bkeep (?:it |this |that )?secret\b/i,
  /\b(?:fight|hit|hurt|insult|mock|threaten|humiliate|make fun of).{0,24}\bback\b/i,
]

function validateAgeText(value: AgeText, path: string, errors: string[]) {
  for (const ageGroup of ageGroups) {
    if (!value[ageGroup].trim()) errors.push(`${path}.${ageGroup}: text is required`)
  }
}

function validateChoice(choice: Choice, scenarioId: string, errors: string[]) {
  const path = `${scenarioId}.${choice.id}`
  validateAgeText(choice.label, `${path}.label`, errors)
  validateAgeText(choice.explanation, `${path}.explanation`, errors)
  validateAgeText(choice.outcome, `${path}.outcome`, errors)
  if (choice.strategy) validateAgeText(choice.strategy, `${path}.strategy`, errors)

  if (choice.quality !== 'helpful') return
  if (!choice.strategy) errors.push(`${path}: helpful choice needs a Toolbox strategy`)

  const recommendations = [choice.label, choice.outcome, ...(choice.strategy ? [choice.strategy] : [])]
  for (const text of recommendations.flatMap((item) => ageGroups.map((ageGroup) => item[ageGroup]))) {
    if (unsafeRecommendationPatterns.some((pattern) => pattern.test(text))) {
      errors.push(`${path}: helpful choice contains a prohibited retaliation or secrecy instruction`)
      break
    }
  }
}

export function validateScenarios(items: Scenario[]): string[] {
  const errors: string[] = []
  const ids = new Set<string>()

  for (const scenario of items) {
    if (ids.has(scenario.id)) errors.push(`${scenario.id}: duplicate id`)
    ids.add(scenario.id)

    if (!Number.isInteger(scenario.editorial.version) || scenario.editorial.version < 1) {
      errors.push(`${scenario.id}: editorial version must be a positive integer`)
    }
    if (scenario.editorial.status === 'approved' || scenario.editorial.status === 'published') {
      if (!scenario.editorial.reviewedBy?.trim() || !scenario.editorial.reviewedAt || Number.isNaN(Date.parse(scenario.editorial.reviewedAt))) {
        errors.push(`${scenario.id}: approved or published content needs a named reviewer and valid review date`)
      }
    }

    validateAgeText(scenario.scene, `${scenario.id}.scene`, errors)
    if (scenario.choices.length < 3 || scenario.choices.length > 4) {
      errors.push(`${scenario.id}: must have 3–4 choices`)
    }
    if (!scenario.feelings.some((feeling) => feeling.id === scenario.likelyFeeling)) {
      errors.push(`${scenario.id}: likely feeling is not offered`)
    }
    if (!scenario.choices.some((choice) => choice.quality === 'helpful')) {
      errors.push(`${scenario.id}: needs a helpful choice`)
    }

    const choiceIds = new Set<string>()
    for (const choice of scenario.choices) {
      if (choiceIds.has(choice.id)) errors.push(`${scenario.id}.${choice.id}: duplicate choice id`)
      choiceIds.add(choice.id)
      validateChoice(choice, scenario.id, errors)
    }

    const mustEscalate = scenario.kind === 'bullying' || scenario.kind === 'unsafe'
    if (mustEscalate && !scenario.requiresAdultHelp) {
      errors.push(`${scenario.id}: bullying and unsafe scenarios must require adult help`)
    }
    if (scenario.requiresAdultHelp && !scenario.choices.some((choice) => choice.quality === 'helpful' && choice.getsAdultHelp)) {
      errors.push(`${scenario.id}: urgent scenario needs a helpful adult-escalation choice`)
    }
  }

  return errors
}
