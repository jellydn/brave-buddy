import { type FormEvent, useState } from 'react'
import type { AgeGroup, ChildProfile } from '../types'

const avatars = ['🦊', '🐼', '🦁', '🐙', '🦋', '🐸']

interface ProfileSetupProps {
  onComplete: (profile: ChildProfile) => void
}

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [nickname, setNickname] = useState('')
  const [avatar, setAvatar] = useState(avatars[0])
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('6-8')

  function submit(event: FormEvent) {
    event.preventDefault()
    const safeNickname = nickname.trim().slice(0, 16)
    if (safeNickname) onComplete({ nickname: safeNickname, avatar, ageGroup })
  }

  return (
    <main className="setup-shell">
      <section className="setup-card" aria-labelledby="welcome-title">
        <div className="brand-mark" aria-hidden="true"><span>★</span></div>
        <p className="eyebrow">Your story starts here</p>
        <h1 id="welcome-title">Welcome, brave star!</h1>
        <p className="setup-intro">Build friendship superpowers through quick stories and kind choices.</p>
        <form onSubmit={submit}>
          <label className="field-label" htmlFor="nickname">Choose a fun nickname</label>
          <input id="nickname" value={nickname} maxLength={16} onChange={(event) => setNickname(event.target.value)} placeholder="Try Sunny or Star" required />
          <p className="privacy-hint">🔒 Use a nickname, not your real name. It stays on this device.</p>

          <fieldset>
            <legend>Pick your guide</legend>
            <div className="avatar-grid">
              {avatars.map((item) => (
                <button className={avatar === item ? 'avatar-option selected' : 'avatar-option'} type="button" key={item} onClick={() => setAvatar(item)} aria-label={`Choose ${item} avatar`} aria-pressed={avatar === item}>{item}</button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Choose your age group</legend>
            <div className="age-options">
              {(['6-8', '9-12'] as AgeGroup[]).map((group) => (
                <button className={ageGroup === group ? 'age-option selected' : 'age-option'} type="button" key={group} onClick={() => setAgeGroup(group)} aria-pressed={ageGroup === group}>
                  <strong>Ages {group}</strong><span>{group === '6-8' ? 'Short & simple' : 'More detail'}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <button className="primary-button full" type="submit">Start my adventure <span aria-hidden="true">→</span></button>
        </form>
      </section>
    </main>
  )
}
