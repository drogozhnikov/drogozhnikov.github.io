<template>
  <div class="resume-header py-6 px-6 px-md-8 mb-6 d-flex flex-column flex-md-row align-start align-md-center justify-space-between gap-4">
    <div class="header-titles">
      <h1 class="resume-name text-uppercase">
        {{ lastName }} {{ firstName }} {{ surname }}
      </h1>
      <div class="text-subtitle-1 text-uppercase text-grey-darken-1 tracking-wider mt-1">
        {{ profession }}
      </div>
    </div>

    <div class="header-actions">
      <v-btn-toggle
          :model-value="currentLang"
          @update:model-value="$emit('update:currentLang', $event)"
          mandatory
          density="compact"
          color="cyan"
          class="lang-toggle elevation-1"
      >
        <v-btn value="rus" size="small">RUS</v-btn>
        <v-btn value="eng" size="small">ENG</v-btn>
      </v-btn-toggle>

      <v-menu location="bottom">
        <template #activator="{ props }">
          <v-btn
              v-bind="props"
              color="success"
              class="print-btn"
              size="small"
              :loading="exporting"
              :disabled="exporting"
          >
            Print
            <v-icon end size="small">mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list density="compact">
          <v-list-item
              title="Rabota.by"
              @click="$emit('print', 'rabota')"
          />
          <v-list-item
              title="Current CV"
              @click="$emit('print', 'current')"
          />
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script setup>
defineProps({
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  lastName: { type: String, required: true },
  profession: { type: String, required: true },
  currentLang: { type: String, default: 'rus' },
  exporting: { type: Boolean, default: false }
})

defineEmits(['update:currentLang', 'print'])
</script>

<style scoped>
.resume-header {
  background-color: #e2e8f0;
  border-left: 6px solid #00bcd4;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.header-titles {
  min-width: 0;
  line-height: 1.2;
}

.resume-name {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.15;
  color: #212121;
}

.header-actions {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  width: 148px;
  flex-shrink: 0;
}

.lang-toggle {
  width: 100%;
}

.lang-toggle :deep(.v-btn) {
  flex: 1;
}

.print-btn {
  width: 100%;
}

@media (max-width: 600px) {
  .resume-name {
    font-size: 1.55rem;
  }
}
</style>
