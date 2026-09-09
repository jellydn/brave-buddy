import { useEffect, useState } from 'react'
import { Home } from './components/Home'
import { ParentDashboard } from './components/ParentDashboard'
import { ProfileSetup } from './components/ProfileSetup'
import { ScenarioPlayer } from './components/ScenarioPlayer'
import { Toolbox } from './components/Toolbox'
import { scenarios } from './content/scenarios'
import { clearState, loadState, saveState } from './lib/storage'
import type { AppState, ChildProfile, Choice, Scenario, WorldId } from './types'

type View = 'home' | 'toolbox' | 'parent'

export default function App() {
  const [state, setState] = useState<AppState>(loadState)
  const [view, setView] = useState<View>('home')
  const [activeScenarios, setActiveScenarios] = useState<Scenario[] | null>(null)

  useEffect(() => saveState(state), [state])

  function setProfile(profile: ChildProfile) {
    setState((current) => ({ ...current, profile }))
  }

  function completeScenario(scenario: Scenario, choice: Choice) {
    setState((current) => ({
      ...current,
      completions: [...current.completions.filter((item) => item.scenarioId !== scenario.id), { scenarioId: scenario.id, choiceId: choice.id, completedAt: new Date().toISOString() }],
    }))
  }

  function saveStrategy(scenarioId: string) {
    setState((current) => current.savedStrategies.includes(scenarioId) ? current : { ...current, savedStrategies: [...current.savedStrategies, scenarioId] })
  }

  function reset() {
    clearState()
    setState({ profile: null, completions: [], savedStrategies: [] })
    setView('home')
  }

  if (!state.profile) return <ProfileSetup onComplete={setProfile} />
  if (activeScenarios) return <ScenarioPlayer scenarios={activeScenarios} ageGroup={state.profile.ageGroup} savedStrategies={state.savedStrategies} onComplete={completeScenario} onSaveStrategy={saveStrategy} onClose={() => setActiveScenarios(null)} />

  function startWorld(world: WorldId) {
    setActiveScenarios(scenarios.filter((scenario) => scenario.world === world))
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <button type="button" className="wordmark" onClick={() => setView('home')} aria-label="Go to adventure map"><span>★</span><strong>Starring<br /><em>Generation Kids</em></strong></button>
        <nav aria-label="Main navigation">
          <button type="button" className={view === 'home' ? 'active' : ''} onClick={() => setView('home')}><span aria-hidden="true">⌂</span> Adventure</button>
          <button type="button" className={view === 'toolbox' ? 'active' : ''} onClick={() => setView('toolbox')}><span aria-hidden="true">▣</span> Toolbox</button>
          <button type="button" className={view === 'parent' ? 'active' : ''} onClick={() => setView('parent')}><span aria-hidden="true">♧</span> Grown-ups</button>
        </nav>
      </header>
      {view === 'home' && <Home profile={state.profile} completions={state.completions} onStartMission={setActiveScenarios} onStartWorld={startWorld} />}
      {view === 'toolbox' && <Toolbox ageGroup={state.profile.ageGroup} savedStrategies={state.savedStrategies} onPractice={(id) => setActiveScenarios(scenarios.filter((scenario) => scenario.id === id))} />}
      {view === 'parent' && <ParentDashboard profile={state.profile} completions={state.completions} onReset={reset} />}
      <footer><span>Made for brave, kind kids</span><span aria-hidden="true">★</span><span>Human-authored practice stories</span></footer>
    </div>
  )
}
