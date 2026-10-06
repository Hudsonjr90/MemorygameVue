export interface ScoreEntry {
  playerName: string
  attempts: number
}

const SCOREBOARD_STORAGE_KEY = '@MemoryGame:scoreBoard'

export function loadScores(): ScoreEntry[] {
  try {
    const storedScores = localStorage.getItem(SCOREBOARD_STORAGE_KEY)
    if (!storedScores) return []

    const parsedScores: unknown = JSON.parse(storedScores)
    if (
      !Array.isArray(parsedScores) ||
      !parsedScores.every(
        (score): score is ScoreEntry =>
          typeof score?.playerName === 'string' &&
          typeof score?.attempts === 'number' &&
          Number.isFinite(score.attempts),
      )
    ) {
      throw new Error('O placar salvo possui um formato inválido.')
    }

    return parsedScores
  } catch (error) {
    console.error('Não foi possível carregar o placar salvo.', error)
    return []
  }
}

export function saveScore(score: ScoreEntry): void {
  try {
    const scores = [...loadScores(), score]
    localStorage.setItem(SCOREBOARD_STORAGE_KEY, JSON.stringify(scores))
  } catch (error) {
    console.error('Não foi possível salvar o resultado no placar.', error)
  }
}

export function getTopScores(scores: ScoreEntry[]): ScoreEntry[] {
  return [...scores]
    .sort((first, second) => first.attempts - second.attempts)
    .slice(0, 10)
}
