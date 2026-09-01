<template>
  <v-app>
    <particles/>
    <smoke v-if="useSmoke"/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
import Particles from "@/layouts/Particles.vue";
import Smoke from "@/layouts/Smoke.vue";
import {useSmoke} from "@/styles/themes/config.js";
</script>
