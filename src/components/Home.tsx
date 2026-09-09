import { scenarios } from '../content/scenarios'
import { worlds } from '../content/worlds'
import { calculateProgress, getDailyScenarios, skillNames } from '../lib/scenarioEngine'
import type { ChildProfile, Completion, Scenario, WorldId } from '../types'

interface HomeProps {
  profile: ChildProfile
  completions: Completion[]
  onStartMission: (items: Scenario[]) => void
  onStartWorld: (world: WorldId) => void
}

const skillIcons = { Courage: '⚡', Kindness: '♥', Calmness: '◉', Friendship: '●', Safety: '◆' }

export function Home({ profile, completions, onStartMission, onStartWorld }: HomeProps) {
  const daily = getDailyScenarios(scenarios, new Date())
  const dailyDone = daily.filter((item) => completions.some((completion) => completion.scenarioId === item.id)).length
  const progress = calculateProgress(completions, scenarios)

  return (
    <main className="page-shell" id="main-content">
      <section className="hello-row">
        <div>
          <p className="eyebrow">Your adventure map</p>
          <h1>Hi {profile.nickname}! <span aria-hidden="true">👋</span></h1>
          <p>Ready to grow your friendship powers?</p>
        </div>
        <div className="profile-bubble" role="img" aria-label={`${profile.nickname}'s avatar`}>{profile.avatar}</div>
      </section>

      <section className="mission-card" aria-labelledby="daily-title">
        <div className="mission-copy">
          <span className="mission-badge">TODAY'S MINI MISSION</span>
          <h2 id="daily-title">Three stories. One brave star.</h2>
          <p>Practice SEE → THINK → RESPOND → GET HELP in about 7 minutes.</p>
          <div className="mission-dots" role="progressbar" aria-label="Daily stories complete" aria-valuemin={0} aria-valuemax={daily.length} aria-valuenow={dailyDone}>
            {daily.map((item, index) => <span key={item.id} className={index < dailyDone ? 'done' : ''}>{index < dailyDone ? '✓' : index + 1}</span>)}
          </div>
          <button type="button" className="primary-button" onClick={() => onStartMission(daily)}>{dailyDone ? 'Keep going' : 'Start today’s mission'} <span aria-hidden="true">→</span></button>
        </div>
        <div className="mission-art" aria-hidden="true"><span className="cloud cloud-one">☁</span><span className="mission-star">★</span><span className="hill">🌈</span></div>
      </section>

      <section className="section-block" aria-labelledby="worlds-title">
        <div className="section-heading"><div><p className="eyebrow">Choose a path</p><h2 id="worlds-title">Learning worlds</h2></div><span className="tiny-note">Every world is open</span></div>
        <div className="world-grid">
          {(Object.entries(worlds) as [WorldId, (typeof worlds)[WorldId]][]).map(([id, world], index) => {
            const worldScenarios = scenarios.filter((scenario) => scenario.world === id)
            const done = worldScenarios.filter((scenario) => completions.some((completion) => completion.scenarioId === scenario.id)).length
            return (
              <button type="button" className="world-card" style={{ '--world-color': world.color } as React.CSSProperties} key={id} onClick={() => onStartWorld(id)}>
                <span className="world-number">0{index + 1}</span><span className="world-emoji" aria-hidden="true">{world.emoji}</span>
                <strong>{world.name}</strong><small>{world.description}</small>
                <span className="world-progress"><span style={{ width: `${(done / worldScenarios.length) * 100}%` }} /></span>
                <span className="world-count">{done}/{worldScenarios.length} stories</span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="section-block powers" aria-labelledby="powers-title">
        <div className="section-heading"><div><p className="eyebrow">Growing with every choice</p><h2 id="powers-title">Your powers</h2></div></div>
        <div className="skill-row">
          {skillNames.map((skill) => <div className="skill-chip" key={skill}><span aria-hidden="true">{skillIcons[skill]}</span><div><strong>{skill}</strong><small>{progress[skill]} points</small></div></div>)}
        </div>
      </section>
    </main>
  )
}
