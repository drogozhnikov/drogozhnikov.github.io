<template>
  <div class="d-flex justify-center mb-6">
    <v-avatar size="240" class="border-cyan">
      <v-img :src="src" alt="Avatar" cover />
    </v-avatar>
  </div>
</template>

<script setup>
defineProps({
  src: { type: String, required: true }
})
</script>

<style scoped>
.border-cyan {
  border: 4px solid #00bcd4;
}
</style>