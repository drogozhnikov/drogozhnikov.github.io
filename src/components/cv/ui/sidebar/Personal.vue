<template>
  <div class="mb-6">
    <h3 class="text-subtitle-1 font-weight-bold mb-3 tracking-wider">{{ title }}</h3>
    <div v-for="(item, index) in items" :key="index" class="mb-2 text-body-2">
      <div class="text-grey-lighten-1 text-caption">{{ item.label }}</div>
      <div class="font-weight-medium">{{ item.value }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'PERSONAL' },
  items: { type: Array, default: () => [] }
})
</script>