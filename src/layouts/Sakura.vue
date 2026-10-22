<template>
  <div class="sakura-root">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import {useTheme} from "vuetify";
import {mountSakura} from "@/layouts/sakura/mountSakura.js";
import {currentTheme, getSakura, initInterval} from "@/styles/themes/config.js";

const canvas = ref(null);
const theme = useTheme();
let stop = () => {};

function boot(config = getSakura()) {
  stop();
  if (!canvas.value || !config) return;
  stop = mountSakura(canvas.value, config);
}

function applyTheme(mod) {
  const init = mod?.initInterval ?? initInterval;
  const sakura = mod?.getSakura ?? getSakura;
  init();
  const name = mod?.currentTheme ?? currentTheme;
  if (name) theme.global.name.value = name;
  boot(sakura());
}

onMounted(() => {
  document.documentElement.classList.add("sakura-bg");
  initInterval();
  if (currentTheme) theme.global.name.value = currentTheme;
  boot();
});

if (import.meta.hot) {
  import.meta.hot.accept("@/styles/themes/config.js", (mod) => {
    applyTheme(mod);
  });
}

onUnmounted(() => {
  stop();
  document.documentElement.classList.remove("sakura-bg");
});
</script>

<style scoped>
.sakura-root {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

<style>
html.sakura-bg,
html.sakura-bg body,
html.sakura-bg #app,
html.sakura-bg .v-application {
  background: transparent !important;
}

html.sakura-bg #app {
  position: relative;
  z-index: 0;
}
</style>
