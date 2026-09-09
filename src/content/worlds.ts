import type { WorldId } from '../types'

export const worlds: Record<WorldId, { name: string; emoji: string; description: string; color: string }> = {
  friends: { name: 'Making Friends', emoji: '🌳', description: 'Say hello, join in, and include others.', color: '#59b88d' },
  problems: { name: 'Friendship Problems', emoji: '🎨', description: 'Work through mix-ups and disagreements.', color: '#738de8' },
  teasing: { name: 'Teasing', emoji: '🛡️', description: 'Use calm words and strong boundaries.', color: '#e89553' },
  bullying: { name: 'Bullying', emoji: '🌟', description: 'Spot repeated harm and get support.', color: '#b873db' },
  help: { name: 'Asking for Help', emoji: '🏡', description: 'Know when and how to find a trusted adult.', color: '#eb6f7c' },
}
