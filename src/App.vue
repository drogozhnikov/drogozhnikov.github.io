<template>
  <particles/>
  <smoke v-if="useSmoke"/>
  <router-view/>

  <svg style="position: absolute; width: 0; height: 0; pointer-events: none">
    <filter id="glass-distortion" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence
          type="turbulence"
          baseFrequency="0.01"
          numOctaves="3"
          result="noise"
      />
      <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="60"
          xChannelSelector="R"
          yChannelSelector="G"
          edgeMode="edge"
      />
    </filter>
  </svg>
  <snack-bar-queue/>
</template>

<script setup>
import Particles from "@/layouts/Particles.vue";
import Smoke from "@/layouts/Smoke.vue";
import {useSmoke} from "@/styles/themes/config.js";
import SnackBarQueue from "@/components/app/exception/SnackBarQueue.vue";
</script>
