<template>
  <div class="mb-6">
    <h3 class="sidebar-title cv-label">{{ title }}</h3>
    <v-row density="compact">
      <v-col
          v-for="(hobby, index) in hobbies"
          :key="index"
          cols="6"
      >
        <div
            class="hobby-item text-grey-lighten-1 d-flex flex-row align-center"
            :style="{
            '--hobby-font-size': fontSize,
            '--hobby-line-height': lineHeight
          }"
        >
          <v-icon :icon="hobby.icon" size="large" class="me-2 flex-shrink-0" />
          <span class="text-truncate">{{ hobby.name }}</span>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'HOBBIES' },
  hobbies: { type: Array, default: () => [] },
  fontSize: { type: String, default: '0.875rem' },
  lineHeight: { type: String, default: '1.2' }
})
</script>

<style scoped>
.hobby-item {
  white-space: nowrap;
  font-size: var(--hobby-font-size);
  line-height: var(--hobby-line-height);
}
</style>