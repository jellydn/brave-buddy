import type { AppState } from '../types'

const STORAGE_KEY = 'sgk-mvp-v1'
export const emptyState: AppState = { profile: null, completions: [], savedStrategies: [] }

export function loadState(): AppState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return emptyState
    const parsed = JSON.parse(stored) as Partial<AppState>
    return {
      profile: parsed.profile ?? null,
      completions: Array.isArray(parsed.completions) ? parsed.completions : [],
      savedStrategies: Array.isArray(parsed.savedStrategies) ? parsed.savedStrategies : [],
    }
  } catch {
    return emptyState
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function clearState(): void {
  localStorage.removeItem(STORAGE_KEY)
}
