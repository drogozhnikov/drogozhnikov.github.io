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
  margin: 16px auto
  background: var.$transparent
  width: 70%
  max-width: 1760px
  padding: 0
  box-sizing: border-box
  @media (max-width: 600px)
    margin: 0
    width: 100%
    padding: 0
</style>
