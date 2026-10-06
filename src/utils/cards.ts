export interface MemoryCard {
  id: string
  pairId: number
  symbol: string
  label: string
  isFlipped: boolean
  isMatched: boolean
}

const pairs = [
  { symbol: '🍓', label: 'morango' },
  { symbol: '🍋', label: 'limão' },
  { symbol: '🍉', label: 'melancia' },
  { symbol: '🍍', label: 'abacaxi' },
  { symbol: '🍇', label: 'uvas' },
  { symbol: '🍒', label: 'cerejas' },
  { symbol: '🥝', label: 'kiwi' },
  { symbol: '🍊', label: 'laranja' },
  { symbol: '🥑', label: 'abacate' },
  { symbol: '🥥', label: 'coco' },
]

export function createShuffledCards(): MemoryCard[] {
  const cards = pairs.flatMap(({ symbol, label }, pairId) => [
    {
      id: `${pairId}-a`,
      pairId,
      symbol,
      label,
      isFlipped: false,
      isMatched: false,
    },
    {
      id: `${pairId}-b`,
      pairId,
      symbol,
      label,
      isFlipped: false,
      isMatched: false,
    },
  ])

  for (let index = cards.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[cards[index], cards[randomIndex]] = [cards[randomIndex], cards[index]]
  }

  return cards
}
