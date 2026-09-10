import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { scenarios } from '../content/scenarios'
import { ScenarioPlayer } from './ScenarioPlayer'

afterEach(cleanup)

describe('ScenarioPlayer safety feedback', () => {
  it.each(scenarios.filter((scenario) => scenario.requiresAdultHelp))('shows trusted-adult guidance for $id', (scenario) => {
    render(<ScenarioPlayer scenarios={[scenario]} ageGroup="9-12" savedStrategies={[]} onComplete={vi.fn()} onSaveStrategy={vi.fn()} onClose={vi.fn()} />)

    fireEvent.click(within(screen.getByRole('region', { name: 'How might someone feel here?' })).getAllByRole('button')[0])
    fireEvent.click(within(screen.getByRole('region', { name: 'What would you do?' })).getAllByRole('button')[0])

    expect(screen.getByRole('note', { name: 'Trusted adult guidance' })).toHaveTextContent(/move toward safety and tell a trusted adult/i)
  })

  it('shows immediate adult-help guidance after an unsafe choice in an urgent story', () => {
    const scenario = scenarios.find((item) => item.id === 'bullying-physical-threat')
    if (!scenario) throw new Error('Expected physical-threat scenario fixture')
    const complete = vi.fn()
    render(<ScenarioPlayer scenarios={[scenario]} ageGroup="9-12" savedStrategies={[]} onComplete={complete} onSaveStrategy={vi.fn()} onClose={vi.fn()} />)

    fireEvent.click(screen.getByRole('button', { name: /unsafe/i }))
    fireEvent.click(screen.getByRole('button', { name: /meet them alone/i }))

    expect(screen.getByText('GET HELP', { selector: 'strong' })).toBeInTheDocument()
    expect(screen.getByText(/not yours to solve alone/i)).toBeInTheDocument()
    expect(screen.getByText(/going alone could put you in danger/i)).toBeInTheDocument()
    expect(complete).toHaveBeenCalledWith(scenario, expect.objectContaining({ id: 'meet' }))
  })
})
