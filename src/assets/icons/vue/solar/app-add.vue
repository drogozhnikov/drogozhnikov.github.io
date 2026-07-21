<template>
  <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10"  class="icon-path" stroke-width="2"/>
    <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"  class="icon-path" stroke-width="2" stroke-linecap="round"/>
  </svg>
</template>

<script>
export default {
  name: "app-add",
  data() {
    return {}
  }
}
</script>

<style scoped lang="sass">
@use '@/styles/variables' as var

.icon-path
  stroke: var.$icons
</style>