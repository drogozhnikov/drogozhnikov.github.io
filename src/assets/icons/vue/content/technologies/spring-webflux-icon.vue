<template>
  <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width="100%"
      height="100%"
  >
    <defs>
      <!-- Градиент Spring Green -->
      <linearGradient id="spring-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#477E23" />
        <stop offset="100%" stop-color="#6DB33F" />
      </linearGradient>
    </defs>

    <!-- Фон в виде реактивных волн (Flux Stream) -->
    <path
        fill="url(#spring-grad)"
        d="M 12,68
         C 28,48 44,48 60,68
         C 76,88 92,88 108,68
         L 108,82
         C 92,102 76,102 60,82
         C 44,62 28,62 12,82 Z"
        opacity="0.4"
    />

    <path
        fill="url(#spring-grad)"
        d="M 12,42
         C 28,22 44,22 60,42
         C 76,62 92,62 108,42
         L 108,56
         C 92,76 76,76 60,56
         C 44,36 28,36 12,56 Z"
    />

    <!-- Маленький акцентный элемент капли/листка сверху -->
    <path
        fill="#6DB33F"
        d="M 60,18
         C 48,18 42,30 42,36
         C 48,36 60,32 60,18 Z"
    />
  </svg>
</template>

<script>
export default {
  name: "SpringWebFluxIcon"
}
</script>

<style scoped lang="sass">
svg
  display: block
  max-width: 100%
  height: auto
</style>