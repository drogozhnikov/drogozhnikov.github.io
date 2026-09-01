<template>
  <div id="particles-bg">
    <vue-particles
        id="tsparticles"
        :options="getParticle()"
    />
  </div>
</template>

<script setup>
import {getParticle} from "@/styles/themes/config.js";
</script>
