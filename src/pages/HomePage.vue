<template>
  <div class="section-center">
    <resume/>
  </div>
</template>

<script setup>
import Resume from "@/components/cv/MainView.vue";
</script>

<style lang="sass" scoped>
@use '@/styles/variables' as var

.section-center
  margin: 24px auto
  background: var.$transparent
  width: 100%
  max-width: 1440px
  padding: 0 24px
  box-sizing: border-box
  @media (max-width: 600px)
    margin: 0
    padding: 0
</style>
