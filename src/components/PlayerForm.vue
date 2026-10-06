<template>
  <q-form class="player-form" @submit.prevent="submit">
    <div class="form-copy">
      <span class="eyebrow">Pronto para jogar?</span>
      <h2>Qual é o seu nome?</h2>
      <p>Encontre os 10 pares usando o menor número de tentativas.</p>
    </div>

    <q-input
      v-model="name"
      outlined
      dark
      rounded
      autofocus
      maxlength="24"
      placeholder="Digite seu nome"
      aria-label="Nome do jogador"
      class="name-input"
    >
      <template #prepend>
        <q-icon name="mdi-account" color="white" />
      </template>
    </q-input>

    <q-btn
      class="start-button"
      unelevated
      rounded
      color="teal-4"
      text-color="dark"
      label="Começar partida"
      no-caps
      icon-right="mdi-play"
      type="submit"
      :disable="!name.trim()"
    />
  </q-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  start: [name: string]
}>()

const name = ref('')

function submit() {
  const trimmedName = name.value.trim()
  if (trimmedName) emit('start', trimmedName)
}
</script>

<style scoped>
.player-form {
  display: grid;
  gap: 22px;
  width: min(100%, 430px);
  margin: 42px auto 0;
  padding: 34px;
  border: 1px solid rgb(255 255 255 / 9%);
  border-radius: 24px;
  background: rgb(255 255 255 / 4%);
  box-shadow: 0 24px 80px rgb(0 0 0 / 25%);
}

.form-copy {
  text-align: center;
}

.eyebrow {
  color: #79e4d7;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

h2 {
  margin: 10px 0 8px;
  font-size: clamp(1.4rem, 4vw, 1.8rem);
  font-weight: 700;
}

p {
  margin: 0;
  color: #a8a9bb;
  line-height: 1.6;
}

.name-input {
  width: 100%;
}

.start-button {
  min-height: 48px;
  font-weight: 700;
}

@media (max-width: 480px) {
  .player-form {
    margin-top: 28px;
    padding: 25px 20px;
  }
}
</style>
