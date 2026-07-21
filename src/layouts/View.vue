<template>
  <v-main>
    <router-view v-slot="{ Component, route }">
      <transition name="slide-y" mode="out-in">
        <component :is="Component" :key="route.path" class="dataview"/>
      </transition>
    </router-view>
  </v-main>
</template>

<script setup lang="ts"></script>

<style scoped lang="sass">

.dataview
  border-bottom-left-radius: 25px
  border-bottom-right-radius: 25px
  padding-bottom: 10px

.slide-y-enter-active,
.slide-y-leave-active
  transition: transform .4s cubic-bezier(0.25, 0.8, 0.5, 1), opacity .6s

.slide-y-enter-from
  opacity: 0
  transform: translateY(-200px)

.slide-y-leave-to
  opacity: 0
  transform: translateY(-200px)

</style>

