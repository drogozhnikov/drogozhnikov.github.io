<template>
  <div class="resume-header py-6 px-8 mb-6 d-flex align-center justify-space-between position-relative">
    <div>
      <h1 class="text-h4 font-weight-bold text-uppercase tracking-widest text-grey-darken-4">
        {{ firstName }} <span class="font-weight-light">{{ lastName }}</span>
      </h1>
      <div class="text-subtitle-1 text-uppercase text-grey-darken-1 tracking-wider mt-1">
        {{ profession }}
      </div>
    </div>

    <div class="lang-switcher">
      <v-btn-toggle
          :model-value="currentLang"
          @update:model-value="$emit('update:currentLang', $event)"
          mandatory
          density="compact"
          color="cyan"
          class="elevation-1"
      >
        <v-btn value="rus" size="small">RUS</v-btn>
        <v-btn value="eng" size="small">ENG</v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script setup>
defineProps({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profession: { type: String, required: true },
  currentLang: { type: String, default: 'rus' }
})

defineEmits(['update:currentLang'])
</script>

<style scoped>
.resume-header {
  background-color: #e2e8f0;
  border-left: 6px solid #00bcd4;
}

.lang-switcher {
  position: absolute;
  top: 16px;
  right: 16px;
}
</style>