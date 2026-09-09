import { useState } from 'react'
import type { AgeGroup, Choice, Scenario } from '../types'

interface ScenarioPlayerProps {
  scenarios: Scenario[]
  ageGroup: AgeGroup
  savedStrategies: string[]
  onComplete: (scenario: Scenario, choice: Choice) => void
  onSaveStrategy: (scenarioId: string) => void
  onClose: () => void
}

export function ScenarioPlayer({ scenarios, ageGroup, savedStrategies, onComplete, onSaveStrategy, onClose }: ScenarioPlayerProps) {
  const [index, setIndex] = useState(0)
  const [feeling, setFeeling] = useState<string | null>(null)
  const [choice, setChoice] = useState<Choice | null>(null)
  const scenario = scenarios[index]

  function chooseResponse(selected: Choice) {
    setChoice(selected)
    onComplete(scenario, selected)
  }

  function next() {
    if (index === scenarios.length - 1) return onClose()
    setIndex((current) => current + 1)
    setFeeling(null)
    setChoice(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isSaved = savedStrategies.includes(scenario.id)
  const feelingMatch = feeling === scenario.likelyFeeling

  return (
    <main className="scenario-shell" id="main-content">
      <div className="scenario-topbar">
        <button type="button" className="icon-button" onClick={onClose} aria-label="Close story">×</button>
        <div className="scenario-progress" role="progressbar" aria-label="Stories complete" aria-valuemin={1} aria-valuemax={scenarios.length} aria-valuenow={index + 1}><span style={{ width: `${((index + 1) / scenarios.length) * 100}%` }} /></div>
        <span className="step-count">{index + 1}/{scenarios.length}</span>
      </div>

      <article className="scenario-card">
        <div className="scene-visual" style={{ background: scenario.visual.accent }} role="img" aria-label={scenario.visual.label}>
          <span className="scene-setting">{scenario.setting}</span>
          <div className="scene-emoji">{scenario.visual.emoji}</div>
          <div className="scene-people" aria-hidden="true"><span>🙂</span><span>🧒</span><span>🙂</span></div>
        </div>
        <div className="story-copy">
          <p className="kind-label">{scenario.kind.replace('-', ' ')}</p>
          <h1>{scenario.title}</h1>
          <p className="scene-text">{scenario.scene[ageGroup]}</p>
        </div>

        <ol className="framework-strip" aria-label="SEE then THINK then RESPOND then GET HELP">
          {['SEE', 'THINK', 'RESPOND', 'GET HELP'].map((step, stepIndex) => <li className={stepIndex <= (choice ? 3 : feeling ? 2 : 0) ? 'active' : ''} key={step}><b>{stepIndex + 1}</b>{step}</li>)}
        </ol>

        {!feeling && (
          <section className="question-block" aria-labelledby="feeling-title">
            <p className="step-kicker">SEE</p><h2 id="feeling-title">How might someone feel here?</h2>
            <div className="feeling-grid">
              {scenario.feelings.map((item) => <button type="button" key={item.id} onClick={() => setFeeling(item.id)}><span>{item.emoji}</span>{item.label}</button>)}
            </div>
            <p className="gentle-note">There can be more than one feeling. Pick the closest one.</p>
          </section>
        )}

        {feeling && !choice && (
          <section className="question-block" aria-labelledby="response-title">
            <div className={feelingMatch ? 'notice-box good' : 'notice-box'}>{feelingMatch ? '✓ That makes sense.' : 'That feeling is possible too.'} <span>Now think about what could help.</span></div>
            <p className="step-kicker">THINK + RESPOND</p><h2 id="response-title">What would you do?</h2>
            <div className="choice-list">
              {scenario.choices.map((item, choiceIndex) => <button type="button" key={item.id} onClick={() => chooseResponse(item)}><span>{String.fromCharCode(65 + choiceIndex)}</span>{item.label[ageGroup]}</button>)}
            </div>
          </section>
        )}

        {choice && (
          <section className="feedback-block" aria-live="polite">
            <div className={`feedback-banner ${choice.quality}`}>
              <span className="feedback-icon">{choice.quality === 'helpful' ? '★' : choice.quality === 'try-again' ? '↻' : '♥'}</span>
              <div><p className="step-kicker">{choice.quality === 'helpful' ? 'STRONG CHOICE' : 'LET’S THINK AGAIN'}</p><h2>{choice.explanation[ageGroup]}</h2></div>
            </div>
            <div className="outcome-card"><span aria-hidden="true">→</span><div><strong>What happens next</strong><p>{choice.outcome[ageGroup]}</p></div></div>
            {scenario.requiresAdultHelp && <div className="adult-help"><span aria-hidden="true">🛟</span><div><strong>GET HELP</strong><p>This situation is not yours to solve alone. Move toward safety and tell a trusted adult.</p></div></div>}
            {choice.strategy && <button type="button" className={isSaved ? 'save-button saved' : 'save-button'} onClick={() => onSaveStrategy(scenario.id)} disabled={isSaved}>{isSaved ? '✓ Saved to Toolbox' : '+ Save this strategy'}</button>}
            <button type="button" className="primary-button full" onClick={next}>{index === scenarios.length - 1 ? 'Finish adventure' : 'Next story'} <span aria-hidden="true">→</span></button>
          </section>
        )}
      </article>
    </main>
  )
}
