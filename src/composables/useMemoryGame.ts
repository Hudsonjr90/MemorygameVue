import { computed, onScopeDispose, ref } from 'vue'
import { createShuffledCards, type MemoryCard } from '../utils/cards'
import { saveScore } from '../utils/scoreboard'

export function useMemoryGame() {
  const cards = ref<MemoryCard[]>(createShuffledCards())
  const attempts = ref(0)
  const playerName = ref('')
  const isLocked = ref(false)
  const isStarted = ref(false)
  const hasWon = ref(false)
  const selectedCards = ref<string[]>([])
  let mismatchTimeout: ReturnType<typeof setTimeout> | undefined

  const matchedPairs = computed(
    () => cards.value.filter(card => card.isMatched).length / 2,
  )

  function startGame(name: string) {
    const trimmedName = name.trim()
    if (!trimmedName) return

    if (mismatchTimeout) {
      clearTimeout(mismatchTimeout)
      mismatchTimeout = undefined
    }

    playerName.value = trimmedName
    isStarted.value = true
    hasWon.value = false
    attempts.value = 0
    isLocked.value = false
    cards.value = createShuffledCards()
    selectedCards.value = []
  }

  function selectCard(cardId: string) {
    if (isLocked.value) return

    const card = cards.value.find(currentCard => currentCard.id === cardId)
    if (!card || card.isMatched || card.isFlipped) return

    card.isFlipped = true
    selectedCards.value = [...selectedCards.value, cardId]

    if (selectedCards.value.length !== 2) return

    attempts.value += 1
    isLocked.value = true

    const [firstId, secondId] = selectedCards.value
    const firstCard = cards.value.find(currentCard => currentCard.id === firstId)
    const secondCard = cards.value.find(currentCard => currentCard.id === secondId)

    if (!firstCard || !secondCard) {
      throw new Error('Não foi possível encontrar as cartas selecionadas.')
    }

    if (firstCard.pairId === secondCard.pairId) {
      firstCard.isMatched = true
      secondCard.isMatched = true
      selectedCards.value = []
      isLocked.value = false

      if (cards.value.every(currentCard => currentCard.isMatched)) {
        hasWon.value = true
        saveScore({ playerName: playerName.value, attempts: attempts.value })
      }

      return
    }

    mismatchTimeout = setTimeout(() => {
      firstCard.isFlipped = false
      secondCard.isFlipped = false
      selectedCards.value = []
      isLocked.value = false
      mismatchTimeout = undefined
    }, 900)
  }

  function restartGame() {
    if (!playerName.value) return
    startGame(playerName.value)
  }

  onScopeDispose(() => {
    if (mismatchTimeout) clearTimeout(mismatchTimeout)
  })

  return {
    attempts,
    cards,
    hasWon,
    isLocked,
    isStarted,
    matchedPairs,
    playerName,
    restartGame,
    selectCard,
    startGame,
  }
}
