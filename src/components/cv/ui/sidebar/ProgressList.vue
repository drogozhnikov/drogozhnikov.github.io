<template>
  <div class="mb-6">
    <h3 class="text-subtitle-1 font-weight-bold mb-3 tracking-wider">{{ title }}</h3>
    <div v-for="(item, index) in items" :key="index" class="mb-3">
      <div class="d-flex justify-between text-body-2 mb-1">
        <span>{{ item.name }}</span>
      </div>
      <v-progress-linear :model-value="item.level" color="white" height="4" bg-color="grey-darken-2" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  items: { type: Array, default: () => [] }
})
</script>