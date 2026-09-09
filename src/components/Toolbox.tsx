import { scenarios } from '../content/scenarios'
import type { AgeGroup } from '../types'

interface ToolboxProps {
  ageGroup: AgeGroup
  savedStrategies: string[]
  onPractice: (scenarioId: string) => void
}

export function Toolbox({ ageGroup, savedStrategies, onPractice }: ToolboxProps) {
  const saved = savedStrategies.flatMap((id) => {
    const scenario = scenarios.find((item) => item.id === id)
    const authoredStrategy = scenario?.choices.find((choice) => choice.strategy)?.strategy
    return scenario && authoredStrategy ? [{ scenario, strategy: authoredStrategy[ageGroup] }] : []
  })

  return (
    <main className="page-shell inner-page" id="main-content">
      <div className="page-title"><span className="title-icon" aria-hidden="true">🧰</span><div><p className="eyebrow">Ready when you need it</p><h1>Response Toolbox</h1><p>Keep your favorite calm, kind, and safe strategies here.</p></div></div>
      {saved.length ? (
        <div className="tool-grid">
          {saved.map(({ scenario, strategy }) => (
            <article className="tool-card" key={scenario.id}>
              <span className="tool-setting">{scenario.setting}</span><span className="tool-emoji" aria-hidden="true">{scenario.visual.emoji}</span>
              <h2>{strategy}</h2><p>From “{scenario.title}”</p>
              <button type="button" onClick={() => onPractice(scenario.id)}>Practice again <span aria-hidden="true">→</span></button>
            </article>
          ))}
        </div>
      ) : (
        <section className="empty-card"><span aria-hidden="true">🪴</span><h2>Your toolbox is ready to grow</h2><p>Play a story and save a helpful strategy. It will appear here.</p></section>
      )}
      <section className="quick-tools"><h2>Three tools you always have</h2><div><span><b>1</b> Take one slow breath</span><span><b>2</b> Use clear, short words</span><span><b>3</b> Move to a trusted adult</span></div></section>
    </main>
  )
}
