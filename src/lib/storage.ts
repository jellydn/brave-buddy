import type { AppState, ChildProfile, Completion } from '../types'

export const STORAGE_KEY = 'sgk-mvp-v1'
export const STORAGE_VERSION = 1
export const emptyState: AppState = { profile: null, completions: [], savedStrategies: [] }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function readProfile(value: unknown): ChildProfile | null {
  if (!isRecord(value)) return null
  if (value.ageGroup !== '6-8' && value.ageGroup !== '9-12') return null
  if (typeof value.nickname !== 'string' || !value.nickname.trim() || value.nickname.length > 16) return null
  if (typeof value.avatar !== 'string' || !value.avatar) return null
  return { nickname: value.nickname, avatar: value.avatar, ageGroup: value.ageGroup }
}

function isCompletion(value: unknown): value is Completion {
  return isRecord(value)
    && typeof value.scenarioId === 'string' && Boolean(value.scenarioId)
    && typeof value.choiceId === 'string' && Boolean(value.choiceId)
    && typeof value.completedAt === 'string' && !Number.isNaN(Date.parse(value.completedAt))
}

function readState(value: unknown): AppState {
  if (!isRecord(value)) return emptyState
  const profile = readProfile(value.profile)
  if (!profile) return emptyState

  return {
    profile,
    completions: Array.isArray(value.completions) ? value.completions.filter(isCompletion) : [],
    savedStrategies: Array.isArray(value.savedStrategies)
      ? value.savedStrategies.filter((item): item is string => typeof item === 'string' && Boolean(item))
      : [],
  }
}

export function loadState(): AppState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return emptyState
    const parsed: unknown = JSON.parse(stored)
    if (!isRecord(parsed)) return emptyState

    if ('version' in parsed) {
      return parsed.version === STORAGE_VERSION ? readState(parsed.state) : emptyState
    }

    return readState(parsed)
  } catch {
    return emptyState
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, state }))
}

export function clearState(): void {
  localStorage.removeItem(STORAGE_KEY)
}
