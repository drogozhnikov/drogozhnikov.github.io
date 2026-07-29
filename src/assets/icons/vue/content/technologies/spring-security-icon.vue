<template>
  <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 130"
      width="100%"
      height="100%"
  >
    <!-- Зеленый щит -->
    <path
        fill="#6bb343"
        d="M 50,0
         L 100,10
         V 65
         C 100,100 70,120 50,130
         C 30,120 0,100 0,65
         V 10
         Z"
    />

    <!-- Белая горизонтальная полоса -->
    <rect x="0" y="47" width="100" height="5" fill="#ffffff" />

    <!-- Белая центральная окружность -->
    <circle cx="50" cy="49.5" r="18" fill="#ffffff" />

    <!-- Замок в центре (изменен fill на темно-серый/черный для видимости на белом фоне) -->
    <g fill="#333333">
      <circle cx="50" cy="44" r="4.5" />
      <circle cx="50" cy="44" r="2" fill="#ffffff" />

      <path d="M 48.5,47.5 H 51.5 V 56 L 50,58 L 48.5,56 Z" />
      <path d="M 50,49.5 H 52.5 V 51 H 50 Z" />
      <path d="M 50,52.5 H 53 V 54 H 50 Z" />
    </g>
  </svg>
</template>

<script>
export default {
  name: "SpringSecurityIcon"
}
</script>

<style scoped lang="sass">
svg
  display: block
  max-width: 100%
  height: auto
</style>