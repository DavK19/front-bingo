import { Card } from './types';

const CARDS_KEY = 'bingo.cards.v1';
const CALLED_KEY = 'bingo.calledNumbers.v1';

export function loadCards(): Card[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CARDS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Card[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCards(cards: Card[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
}

export function loadCalledNumbers(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CALLED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as number[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCalledNumbers(nums: number[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CALLED_KEY, JSON.stringify(nums));
}
