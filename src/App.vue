<template>
  <v-app :class="{ 'preview-app': isPreview }">
    <sakura v-if="!isPreview"/>
    <smoke v-if="useSmoke && !isPreview"/>
    <v-main class="app-front">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sakura from "@/layouts/Sakura.vue";
import Smoke from "@/layouts/Smoke.vue";
import {useSmoke} from "@/styles/themes/config.js";

const route = useRoute()
const isPreview = computed(() => route.name === 'preview')
</script>

<style>
.app-front {
  position: relative;
  z-index: 2;
}

.preview-app,
.preview-app .v-application,
.preview-app .v-main {
  background: #d6d6d6 !important;
}
</style>
