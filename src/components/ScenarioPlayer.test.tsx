import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { scenarios } from '../content/scenarios'
import { ScenarioPlayer } from './ScenarioPlayer'

describe('ScenarioPlayer safety feedback', () => {
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
