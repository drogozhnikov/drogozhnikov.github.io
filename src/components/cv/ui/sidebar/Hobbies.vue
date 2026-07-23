<template>
  <div class="mb-6">
    <h3 class="text-subtitle-1 font-weight-bold mb-3 tracking-wider">{{ title }}</h3>
    <v-row dense class="text-center">
      <v-col
          v-for="(hobby, index) in hobbies"
          :key="index"
          cols="6"
          sm="4"
          class="d-flex flex-column align-center mb-3"
      >
        <v-icon :icon="hobby.icon" size="large" class="mb-2" />
        <div class="text-caption text-grey-lighten-1" style="word-break: break-word; line-height: 1.2;">
          {{ hobby.name }}
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'HOBBIES' },
  hobbies: { type: Array, default: () => [] }
})
</script>