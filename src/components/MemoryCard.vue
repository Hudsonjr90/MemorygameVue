<template>
  <button
    class="memory-card"
    :class="{ 'is-flipped': card.isFlipped || card.isMatched, 'is-matched': card.isMatched }"
    type="button"
    :aria-label="cardAriaLabel"
    :aria-pressed="card.isFlipped || card.isMatched"
    :disabled="card.isMatched || isLocked"
    @click="emit('select', card.id)"
  >
    <span class="card-inner">
      <span class="card-face card-back" aria-hidden="true">
        <span class="back-mark">✦</span>
      </span>
      <span class="card-face card-front" aria-hidden="true">
        <span class="card-symbol">{{ card.symbol }}</span>
        <span class="card-label">{{ card.label }}</span>
      </span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MemoryCard as MemoryCardModel } from '../utils/cards'

const props = defineProps<{
  card: MemoryCardModel
  isLocked: boolean
}>()

const emit = defineEmits<{
  select: [cardId: string]
}>()

const cardAriaLabel = computed(() => {
  if (props.card.isMatched) return `${props.card.label}, par encontrado`
  if (props.card.isFlipped) return props.card.label
  return 'Carta virada para baixo'
})
</script>

<style scoped>
.memory-card {
  width: 100%;
  aspect-ratio: 0.78;
  min-height: 96px;
  padding: 0;
  border: 0;
  border-radius: 15px;
  background: transparent;
  cursor: pointer;
  perspective: 800px;
  -webkit-tap-highlight-color: transparent;
}

.memory-card:focus-visible {
  outline: 3px solid #a6fff1;
  outline-offset: 4px;
}

.memory-card:disabled {
  cursor: default;
}

.card-inner {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  transition: transform 420ms cubic-bezier(0.2, 0.75, 0.25, 1);
  transform-style: preserve-3d;
}

.is-flipped .card-inner {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 12%);
  border-radius: inherit;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.card-back {
  color: #8ceade;
  background:
    radial-gradient(circle at 50% 45%, rgb(80 211 194 / 17%) 0 2px, transparent 3px),
    linear-gradient(145deg, #282b4b, #1a1c32);
  background-size: 16px 16px, auto;
  box-shadow: inset 0 0 0 4px rgb(255 255 255 / 3%);
}

.back-mark {
  display: grid;
  width: 40%;
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid rgb(140 234 222 / 35%);
  border-radius: 50%;
  font-size: clamp(1rem, 3vw, 1.8rem);
  text-shadow: 0 0 16px rgb(140 234 222 / 65%);
}

.card-front {
  gap: 5px;
  border-color: rgb(140 234 222 / 34%);
  background: linear-gradient(145deg, #f3fffc, #c9f5ec);
  color: #22243a;
  transform: rotateY(180deg);
}

.card-symbol {
  font-size: clamp(2rem, 6vw, 3.25rem);
  line-height: 1.1;
}

.card-label {
  font-size: clamp(0.62rem, 1.8vw, 0.76rem);
  font-weight: 700;
  text-transform: capitalize;
}

.is-matched .card-front {
  border-color: #66dfb6;
  box-shadow: inset 0 0 22px rgb(83 221 172 / 26%);
}

@media (hover: hover) {
  .memory-card:not(:disabled):hover .card-inner {
    transform: translateY(-3px) scale(1.025);
  }

  .memory-card.is-flipped:not(:disabled):hover .card-inner {
    transform: rotateY(180deg) translateY(-3px) scale(1.025);
  }
}

@media (prefers-reduced-motion: reduce) {
  .card-inner {
    transition-duration: 1ms;
  }
}
</style>
