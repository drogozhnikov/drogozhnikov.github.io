<template>
  <div class="personal-block mb-6">
    <h3 class="sidebar-title cv-label">{{ title }}</h3>

    <div
        v-for="(item, index) in items"
        :key="index"
        class="personal-row"
    >
      <div class="personal-label cv-label">{{ item.label }}</div>
      <div class="personal-value">{{ item.value }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'PERSONAL' },
  items: { type: Array, default: () => [] }
})
</script>

<style scoped>
.personal-row {
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);
}

.personal-row:last-child {
  border-bottom: none;
}

.personal-label {
  margin-bottom: 2px;
  font-size: 0.75rem;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.62);
}

.personal-value {
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.35;
  color: #ffffff;
}
</style>
