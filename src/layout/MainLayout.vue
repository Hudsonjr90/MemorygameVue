<template>
  <q-layout view="lHh Lpr lFf" class="app-layout">
    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

<style>
:root {
  color-scheme: dark;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #10111c;
  color: #f6f5ff;
}

* {
  box-sizing: border-box;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
}

button,
input {
  font: inherit;
}

.app-layout {
  min-height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 12% 7%, rgb(61 48 141 / 25%), transparent 38rem),
    radial-gradient(ellipse at 92% 82%, rgb(0 183 174 / 12%), transparent 34rem),
    #10111c;
}
</style>
