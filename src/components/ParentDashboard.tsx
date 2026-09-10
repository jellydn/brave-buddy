import { type FormEvent, useState } from 'react'
import { scenarios } from '../content/scenarios'
import { calculateProgress, getPracticedKinds, skillNames } from '../lib/scenarioEngine'
import type { ChildProfile, Completion } from '../types'

interface ParentDashboardProps {
  profile: ChildProfile
  completions: Completion[]
  onReset: () => void
}

const kindNames: Record<string, string> = { misunderstanding: 'Misunderstandings', conflict: 'Ordinary conflict', teasing: 'Teasing', bullying: 'Repeated bullying', unsafe: 'Unsafe behavior' }

export function ParentDashboard({ profile, completions, onReset }: ParentDashboardProps) {
  const [unlocked, setUnlocked] = useState(false)
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState(false)
  const progress = calculateProgress(completions, scenarios)
  const practicedKinds = getPracticedKinds(completions, scenarios)
  const completedIds = new Set(completions.map((completion) => completion.scenarioId))
  const prompts = scenarios.filter((scenario) => completedIds.has(scenario.id)).slice(-3).map((scenario) => scenario.conversationPrompt)

  function unlock(event: FormEvent) {
    event.preventDefault()
    if (answer.trim() === '12') setUnlocked(true)
    else setError(true)
  }

  if (!unlocked) return (
    <main className="page-shell parent-gate" id="main-content">
      <section className="gate-card"><span aria-hidden="true">🔐</span><p className="eyebrow">Grown-ups only</p><h1>Parent space</h1><p>Please answer this quick check to continue.</p>
        <form onSubmit={unlock}><label htmlFor="gate-answer">What is 3 × 4?</label><input id="gate-answer" inputMode="numeric" value={answer} onChange={(event) => { setAnswer(event.target.value); setError(false) }} />
          {error && <p className="gate-error" role="alert">Not quite. Please try again.</p>}<button type="submit" className="primary-button full">Open parent dashboard</button></form>
        <p className="gate-note">This simple gate separates the child experience. It is not identity verification.</p>
      </section>
    </main>
  )

  return (
    <main className="page-shell inner-page parent-page" id="main-content">
      <div className="page-title"><span className="title-icon" aria-hidden="true">🌱</span><div><p className="eyebrow">A private, high-level view</p><h1>{profile.nickname}’s growing skills</h1><p>Progress themes are shown here. Individual answers stay private.</p></div></div>
      <section className="parent-summary" aria-label="Practice summary"><dl><div><dt>stories practiced</dt><dd>{completedIds.size}</dd></div><div><dt>situation types</dt><dd>{practicedKinds.length}</dd></div><div><dt>age adaptation</dt><dd>{profile.ageGroup}</dd></div></dl></section>
      <div className="parent-grid">
        <section className="dashboard-card"><p className="eyebrow">Skills practiced</p><h2>Friendship powers</h2><div className="progress-list">
          {skillNames.map((skill) => <div key={skill}><span><strong>{skill}</strong><small>{progress[skill]} points</small></span><div><i style={{ width: `${Math.min(progress[skill] * 8, 100)}%` }} /></div></div>)}
        </div></section>
        <section className="dashboard-card"><p className="eyebrow">Range, not labels</p><h2>Situation types explored</h2><div className="kind-list">
          {Object.entries(kindNames).map(([id, label]) => <span className={practicedKinds.includes(id) ? 'practiced' : ''} key={id}>{practicedKinds.includes(id) ? '✓' : '○'} {label}</span>)}
        </div><p className="dashboard-note">These categories describe practice content. They do not diagnose a child or report real events.</p></section>
      </div>
      <section className="conversation-card"><div><p className="eyebrow">Talk together</p><h2>Family conversation starters</h2></div><div className="prompt-list">
        {(prompts.length ? prompts : ['Who are the trusted adults you can ask for help?', 'What does a calm, strong boundary sound like?']).map((prompt, index) => <p key={prompt}><span>{index + 1}</span>{prompt}</p>)}
      </div></section>
      <section className="privacy-card"><div><span aria-hidden="true">🛡️</span><div><strong>Privacy in this prototype</strong><p>No account, analytics, messages, or cloud storage. Profile and progress stay in this browser.</p></div></div><button type="button" className="text-button danger" onClick={onReset}>Delete local profile and progress</button></section>
    </main>
  )
}
