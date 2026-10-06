<template>
  <section class="score-panel" aria-labelledby="score-title">
    <div class="score-heading">
      <div>
        <span class="eyebrow">Hall da memória</span>
        <h2 id="score-title">Melhores partidas</h2>
      </div>
      <q-icon name="mdi-gamepad-variant" size="32px" color="amber-5" />
    </div>

    <div v-if="scores.length" class="score-list">
      <div class="score-row score-header" aria-hidden="true">
        <span>#</span>
        <span>Jogador</span>
        <span>Tentativas</span>
      </div>
      <div
        v-for="(score, index) in scores"
        :key="`${score.playerName}-${score.attempts}-${index}`"
        class="score-row"
      >
        <span class="rank">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="player-name">{{ score.playerName }}</span>
        <span class="attempt-count">{{ score.attempts }}</span>
      </div>
    </div>

    <div v-else class="empty-state">
      <q-icon name="mdi-scoreboard" size="34px" />
      <p>O placar está vazio. Seja o primeiro a registrar uma partida!</p>
    </div>

    <!-- <q-btn
      dense
      unelevated
      color="teal-4"
      text-color="white"
      label="Começar novo jogo"
      no-caps
      class="q-mt-lg"
      icon="mdi-arrow-left"
      type="submit"
      aria-label="Começar partida"
      to="/"
    /> -->
  </section>
</template>

<script setup lang="ts">
import type { ScoreEntry } from '../utils/scoreboard';

defineProps<{
  scores: ScoreEntry[];
}>();
</script>

<style scoped>
.score-panel {
  width: min(100%, 600px);
  margin: 36px auto 0;
  padding: clamp(22px, 5vw, 34px);
  border: 1px solid rgb(255 255 255 / 9%);
  border-radius: 24px;
  background: rgb(255 255 255 / 4%);
  box-shadow: 0 24px 80px rgb(0 0 0 / 25%);
}

.score-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 24px;
}

.eyebrow {
  color: #79e4d7;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h2 {
  margin: 6px 0 0;
  font-size: clamp(1.3rem, 4vw, 1.7rem);
}

.score-list {
  display: grid;
  gap: 8px;
}

.score-row {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) 110px;
  align-items: center;
  gap: 12px;
  min-height: 48px;
  padding: 0 14px;
  border-radius: 12px;
  background: rgb(255 255 255 / 4%);
}

.score-header {
  min-height: 32px;
  color: #9294a9;
  background: transparent;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.rank {
  color: #7de0d2;
  font-weight: 700;
}

.player-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.attempt-count {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.empty-state {
  display: grid;
  justify-items: center;
  gap: 10px;
  padding: 28px 12px 14px;
  color: #9294a9;
  text-align: center;
}

.empty-state p {
  max-width: 320px;
  margin: 0;
  line-height: 1.6;
}

@media (max-width: 420px) {
  .score-row {
    grid-template-columns: 36px minmax(0, 1fr) 86px;
    gap: 8px;
    padding: 0 10px;
  }
}
</style>
