<template>
  <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width="100%"
      height="100%"
  >
    <!-- Контур облака -->
    <path
        fill="#6DB33F"
        d="M 96,44
         C 92.5,26.5 76.8,13 58,13
         C 42,13 28.3,22.7 22.5,36.5
         C 9.8,38 0,48.8 0,62
         C 0,76.4 11.6,88 26,88
         L 98,88
         C 112.4,88 124,76.4 124,62
         C 124,48.2 113.2,37 99.5,36.2
         C 98.6,39 97.4,41.6 96,44 Z"
        opacity="0.2"
    />
    <path
        fill="none"
        stroke="#6DB33F"
        stroke-width="6"
        stroke-linejoin="round"
        stroke-linecap="round"
        d="M 24,70
         C 16.3,70 10,63.7 10,56
         C 10,48.3 16.3,42 24,42
         C 25.2,42 26.4,42.2 27.5,42.5
         C 31.8,28.8 44.5,19 59.5,19
         C 76.3,19 90,32.7 90,49.5
         C 90,50.7 89.9,51.9 89.7,53
         C 98.6,54.2 105.5,61.8 105.5,71
         C 105.5,80.7 97.7,88.5 88,88.5
         L 24,88.5"
    />

    <!-- Фирменный листик Spring внутри -->
    <path
        fill="#6DB33F"
        d="M 76,38
         C 42,38 34,68 34,82
         C 48,82 78,74 78,40
         C 78,39.3 77.5,38 76,38 Z
         M 42,74
         C 44,62 54,48 70,44
         C 64,56 52,68 42,74 Z"
    />
  </svg>
</template>

<script>
export default {
  name: "SpringCloudIcon"
}
</script>

<style scoped lang="sass">
svg
  display: block
  max-width: 100%
  height: auto
</style>