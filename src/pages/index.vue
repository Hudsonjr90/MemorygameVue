<template>
  <q-page class="game-page">
    <main class="game-shell">
      <header class="page-header">
        <div class="brand">
          <div class="brand-icon" aria-hidden="true">
            <q-icon name="mdi-cards" size="24px" />
          </div>
          <span>Memó<span class="brand-accent">ria</span></span>
        </div>

        <q-btn
          outline
          rounded
          color="white"
          no-caps
          :icon="isScoreboardOpen ? 'mdi-arrow-left' : 'mdi-bullseye-arrow'"
          :label="isScoreboardOpen ? 'Voltar ao jogo' : 'Placar'"
          @click="isScoreboardOpen = !isScoreboardOpen"
        />
      </header>

      <section class="intro" aria-labelledby="game-title">
        <span class="eyebrow">Um desafio para a sua memória</span>
        <h1 id="game-title">Jogo da Memória</h1>
        <p v-if="isStarted && !isScoreboardOpen" class="player-line">
          Boa sorte, <strong>{{ playerName }}</strong>! Encontre todos os pares.
        </p>
        <p v-else class="intro-copy">
          Vire as cartas, encontre os pares e entre para o placar.
        </p>
      </section>

      <ScoreBoard v-if="isScoreboardOpen" :scores="topScores" />

      <PlayerForm v-else-if="!isStarted" @start="startGame" />

      <section v-else class="game-content" aria-label="Tabuleiro do jogo">
        <div class="game-toolbar">
          <div class="stat">
            <span class="stat-icon"><q-icon name="mdi-cursor-default-click" size="32px" /></span>
            <span class="stat-copy">
              <span class="stat-label">Tentativas</span>
              <strong>{{ attempts }}</strong>
            </span>
          </div>

          <div class="stat stat-pairs">
            <span class="stat-icon"><q-icon name="mdi-star" size="32px" /></span>
            <span class="stat-copy">
              <span class="stat-label">Pares</span>
              <strong>{{ matchedPairs }} <span>/ 10</span></strong>
            </span>
          </div>

          <q-btn
            class="restart-button"
            flat
            rounded
            color="white"
            icon="mdi-shuffle-variant"
            no-caps
            label="Recomeçar"
            @click="restartGame"
          />
        </div>

        <div class="card-grid">
          <MemoryCard
            v-for="card in cards"
            :key="card.id"
            :card="card"
            :is-locked="isLocked"
            @select="selectCard"
          />
        </div>
        <p class="game-hint">Dica: tente memorizar a posição de cada fruta.</p>
      </section>
    </main>

    <q-dialog :model-value="hasWon" persistent>
      <q-card class="win-card">
        <div class="win-trophy">
          <q-icon name="mdi-trophy" size="42px" />
        </div>
        <span class="eyebrow">Partida concluída</span>
        <h2>Mandou bem, {{ playerName }}!</h2>
        <p>
          Você encontrou todos os pares em
          <strong>{{ attempts }} {{ attempts === 1 ? 'tentativa' : 'tentativas' }}</strong>.
        </p>
        <q-btn
          unelevated
          rounded
          color="teal-4"
          text-color="dark"
          icon="mdi-replay"
          no-caps
          label="Jogar novamente"
          @click="restartGame"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import MemoryCard from '../components/MemoryCard.vue'
import PlayerForm from '../components/PlayerForm.vue'
import ScoreBoard from '../components/ScoreBoard.vue'
import { useMemoryGame } from '../composables/useMemoryGame'
import { getTopScores, loadScores } from '../utils/scoreboard'

const {
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
} = useMemoryGame()

const isScoreboardOpen = ref(false)
const savedScores = ref(loadScores())
const topScores = computed(() => getTopScores(savedScores.value))

watch(hasWon, won => {
  if (won) savedScores.value = loadScores()
})
</script>

<style scoped>
.game-page {
  min-height: 100vh;
  padding: 24px clamp(16px, 4vw, 56px) 64px;
}

.game-shell {
  width: min(100%, 920px);
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.94rem;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.brand-icon {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 1px solid rgb(121 228 215 / 28%);
  border-radius: 12px;
  color: #79e4d7;
  background: rgb(121 228 215 / 8%);
}

.brand-accent {
  color: #79e4d7;
}

.intro {
  margin: clamp(46px, 8vw, 86px) auto 0;
  text-align: center;
}

.eyebrow {
  color: #79e4d7;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

h1 {
  margin: 14px 0 10px;
  font-size: clamp(2.8rem, 9vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.07em;
  line-height: 1.02;
}

h1 span {
  color: #79e4d7;
}

.intro-copy,
.player-line {
  margin: 0;
  color: #a8a9bb;
  font-size: clamp(0.94rem, 2vw, 1.08rem);
}

.player-line strong {
  color: #f6f5ff;
}

.game-content {
  margin-top: 38px;
}

.game-toolbar {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 20px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stat-icon {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: 12px;
  color: #79e4d7;
  background: rgb(121 228 215 / 9%);
  font-size: 1.2rem;
}

.stat-copy {
  display: grid;
  gap: 1px;
}

.stat-label {
  color: #9294a9;
  font-size: 0.74rem;
}

.stat-copy strong {
  font-size: 1.05rem;
  font-variant-numeric: tabular-nums;
}

.stat-copy strong span {
  color: #9294a9;
  font-size: 0.8rem;
  font-weight: 500;
}

.stat-pairs .stat-icon {
  color: #ee90ba;
  background: rgb(238 144 186 / 9%);
}

.restart-button {
  margin-left: auto;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: clamp(8px, 2vw, 15px);
  padding: clamp(12px, 3vw, 22px);
  border: 1px solid rgb(255 255 255 / 8%);
  border-radius: 22px;
  background: rgb(25 27 45 / 80%);
  box-shadow: 0 22px 65px rgb(0 0 0 / 24%);
}

.game-hint {
  margin: 16px 0 0;
  color: #77798e;
  font-size: 0.82rem;
  text-align: center;
}

.win-card {
  display: grid;
  justify-items: center;
  width: min(100%, 440px);
  padding: 38px 28px 32px;
  border: 1px solid rgb(121 228 215 / 25%);
  border-radius: 26px;
  background: #191b2d;
  color: #f6f5ff;
  text-align: center;
}

.win-trophy {
  display: grid;
  width: 76px;
  height: 76px;
  margin-bottom: 24px;
  place-items: center;
  border-radius: 24px;
  color: #ffd36b;
  background: rgb(255 211 107 / 11%);
}

.win-card h2 {
  margin: 10px 0;
  font-size: clamp(1.5rem, 5vw, 2rem);
}

.win-card p {
  margin: 0 0 24px;
  color: #aaabba;
  line-height: 1.6;
}

.win-card p strong {
  color: #f6f5ff;
}

@media (max-width: 640px) {
  .game-page {
    padding-top: 16px;
  }

  .intro {
    margin-top: 52px;
  }

  .game-toolbar {
    flex-wrap: wrap;
    gap: 14px;
  }

  .restart-button {
    padding-right: 0;
  }

  .card-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 380px) {
  .card-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 7px;
    padding: 10px;
  }

  .memory-card {
    min-height: 76px;
  }
}
</style>
