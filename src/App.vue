<template>
  <v-app :class="{ 'preview-app': isPreview }">
    <particles v-if="!isPreview"/>
    <smoke v-if="useSmoke && !isPreview"/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Particles from "@/layouts/Particles.vue";
import Smoke from "@/layouts/Smoke.vue";
import {useSmoke} from "@/styles/themes/config.js";

const route = useRoute()
const isPreview = computed(() => route.name === 'preview')
</script>

<style>
.preview-app,
.preview-app .v-application,
.preview-app .v-main {
  background: #d6d6d6 !important;
}
</style>
