<template>
  <div>
    <v-snackbar-queue
      v-model="useExcStore().queue"
      :total-visible="4"
      contained
      closable
      width="400"
      rounded="pill"
      variant="tonal"
    ></v-snackbar-queue>
  </div>
</template>

<script setup>
import {useExcStore} from "@/components/app/exception/js/exceptionStore.js";
</script>

<style scoped lang="sass">

</style>
