export type AgeGroup = '6-8' | '9-12'
export type WorldId = 'friends' | 'problems' | 'teasing' | 'bullying' | 'help'
export type ScenarioKind = 'misunderstanding' | 'conflict' | 'teasing' | 'bullying' | 'unsafe'
export type Skill = 'Courage' | 'Kindness' | 'Calmness' | 'Friendship' | 'Safety'

export interface AgeText {
  '6-8': string
  '9-12': string
}

export interface Choice {
  id: string
  label: AgeText
  quality: 'helpful' | 'try-again' | 'unsafe'
  explanation: AgeText
  outcome: AgeText
  strategy?: AgeText
  skills: Partial<Record<Skill, number>>
  getsAdultHelp?: boolean
}

export interface Scenario {
  id: string
  world: WorldId
  kind: ScenarioKind
  setting: string
  title: string
  scene: AgeText
  visual: { emoji: string; label: string; accent: string }
  feelings: { id: string; emoji: string; label: string }[]
  likelyFeeling: string
  choices: Choice[]
  requiresAdultHelp: boolean
  skills: Skill[]
  conversationPrompt: string
}

export interface ChildProfile {
  nickname: string
  avatar: string
  ageGroup: AgeGroup
}

export interface Completion {
  scenarioId: string
  choiceId: string
  completedAt: string
}

export interface AppState {
  profile: ChildProfile | null
  completions: Completion[]
  savedStrategies: string[]
}
