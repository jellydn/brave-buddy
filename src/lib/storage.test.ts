import { beforeEach, describe, expect, it } from 'vitest'
import type { AppState } from '../types'
import { clearState, emptyState, loadState, saveState, STORAGE_KEY, STORAGE_VERSION } from './storage'

const state: AppState = {
  profile: { nickname: 'Sunny', avatar: '🦊', ageGroup: '9-12' },
  completions: [{ scenarioId: 'teasing-voice', choiceId: 'boundary', completedAt: '2026-09-09T00:00:00.000Z' }],
  savedStrategies: ['teasing-voice'],
}

beforeEach(() => localStorage.clear())

function readStoredValue(): unknown {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) throw new Error('Expected stored application state')
  return JSON.parse(stored)
}

describe('versioned local storage', () => {
  it('round-trips the current version in an explicit envelope', () => {
    saveState(state)

    expect(readStoredValue()).toEqual({ version: STORAGE_VERSION, state })
    expect(loadState()).toEqual(state)
  })

  it('removes all local application state', () => {
    saveState(state)

    clearState()

    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    expect(loadState()).toEqual(emptyState)
  })

  it('migrates the legacy unversioned MVP record', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))

    const migrated = loadState()
    expect(migrated).toEqual(state)

    saveState(migrated)
    expect(readStoredValue()).toEqual({ version: STORAGE_VERSION, state })
  })

  it('recovers from malformed JSON and unknown future versions', () => {
    localStorage.setItem(STORAGE_KEY, '{not json')
    expect(loadState()).toEqual(emptyState)

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 99, state }))
    expect(loadState()).toEqual(emptyState)
  })

  it('fails closed when the profile is corrupt', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: STORAGE_VERSION,
      state: { ...state, profile: { nickname: 'Sunny', avatar: '🦊', ageGroup: 'unknown' } },
    }))

    expect(loadState()).toEqual(emptyState)
  })

  it('drops malformed progress records without losing a valid profile', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: STORAGE_VERSION,
      state: {
        ...state,
        completions: [...state.completions, null, { scenarioId: 12 }, { scenarioId: '', choiceId: '', completedAt: 'not-a-date' }],
        savedStrategies: ['teasing-voice', '', 42, null],
      },
    }))

    expect(loadState()).toEqual(state)
  })
})
