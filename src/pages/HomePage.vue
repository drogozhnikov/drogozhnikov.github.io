<template>
  <div class="section-center">
    <resume/>
  </div>
</template>
<script>
import MainView from "@/components/cv/MainView.vue";

export default {
  components: {Resume: MainView}
}
</script>

<style lang="sass" scoped>
@use '@/styles/main'
@use '@/styles/variables' as var

.section-center
  margin: 0 auto
  background: var.$transparent
  width: 60%
  border-color: red
  border-width: 1px
  @media (max-width: 1300px)
    width: 70%
    padding: 5px
  @media (max-width: 1000px)
    margin: 1% auto
    width: 85%
    padding: 5px
  @media (max-width: 600px)
    margin: 0 auto
    width: 100%
    padding: 0

</style>
