<template>
  <div class="mb-6">
    <h3 class="text-subtitle-1 font-weight-bold mb-3 tracking-wider">{{ title }}</h3>
    <div v-for="(contact, index) in contacts" :key="index" class="d-flex align-center mb-2">
      <v-icon :icon="contact.icon" size="small" class="mr-3" />
      <a
          :href="contact.url"
          target="_blank"
          rel="noopener noreferrer"
          class="text-body-2 text-white text-decoration-none contact-link"
      >
        {{ contact.text }}
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'CONTACT' },
  contacts: { type: Array, default: () => [] }
})
</script>

<style scoped>
.contact-link:hover {
  text-decoration: underline !important;
}
</style>