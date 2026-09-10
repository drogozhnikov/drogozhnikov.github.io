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
      <div class="glass-shell lang-toggle" role="group" aria-label="Language">
        <span
            class="lang-thumb"
            :class="{ 'lang-thumb--eng': currentLang === 'eng' }"
        />
        <button
            type="button"
            class="lang-btn"
            :class="{ 'is-active': currentLang === 'rus' }"
            :aria-pressed="currentLang === 'rus'"
            @click="$emit('update:currentLang', 'rus')"
        >
          RUS
        </button>
        <button
            type="button"
            class="lang-btn"
            :class="{ 'is-active': currentLang === 'eng' }"
            :aria-pressed="currentLang === 'eng'"
            @click="$emit('update:currentLang', 'eng')"
        >
          ENG
        </button>
      </div>

      <v-menu location="bottom" content-class="glass-print-menu">
        <template #activator="{ props }">
          <button
              v-bind="props"
              type="button"
              class="glass-shell print-btn"
              :disabled="exporting"
              :aria-busy="exporting"
          >
            <span class="print-btn__label">Print</span>
            <v-progress-circular
                v-if="exporting"
                indeterminate
                size="14"
                width="2"
                class="print-btn__spinner"
            />
            <v-icon v-else size="16">mdi-chevron-down</v-icon>
          </button>
        </template>

        <v-list density="compact" class="glass-print-list">
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

.glass-shell {
  --glass-fill: rgba(255, 255, 255, 0.42);
  --glass-stroke: rgba(255, 255, 255, 0.72);
  --glass-shine: rgba(255, 255, 255, 0.85);

  position: relative;
  overflow: hidden;
  isolation: isolate;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.18) 48%, rgba(255, 255, 255, 0.28) 100%),
    var(--glass-fill);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  border: 1px solid var(--glass-stroke);
  border-radius: 999px;
  box-shadow:
    0 1px 1px rgba(255, 255, 255, 0.7) inset,
    0 -1px 1px rgba(15, 23, 42, 0.06) inset,
    0 8px 20px rgba(15, 23, 42, 0.08);
}

.lang-toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 32px;
  padding: 3px;
}

.lang-thumb {
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 3px;
  width: calc(50% - 3px);
  border-radius: 999px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.58) 100%);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.95) inset,
    0 4px 10px rgba(15, 23, 42, 0.12);
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
  z-index: 0;
}

.lang-thumb--eng {
  transform: translateX(100%);
}

.lang-btn {
  position: relative;
  z-index: 1;
  border: 0;
  background: transparent;
  color: rgba(33, 33, 33, 0.62);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  cursor: pointer;
  border-radius: 999px;
}

.lang-btn.is-active {
  color: #111827;
}

.print-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  min-height: 32px;
  padding: 0 12px;
  color: #14532d;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
}

.print-btn:disabled {
  opacity: 0.65;
  cursor: default;
}

.print-btn__label {
  line-height: 1;
}

.print-btn__spinner {
  color: #14532d;
}

@media (max-width: 600px) {
  .resume-name {
    font-size: 1.55rem;
  }
}
</style>

<style>
.glass-print-menu {
  background: rgba(255, 255, 255, 0.52) !important;
  backdrop-filter: blur(22px) saturate(180%);
  -webkit-backdrop-filter: blur(22px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.7) !important;
  border-radius: 16px !important;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.8) inset,
    0 16px 40px rgba(15, 23, 42, 0.16) !important;
  overflow: hidden;
}

.glass-print-menu .v-list {
  background: transparent !important;
}

.glass-print-list .v-list-item {
  min-height: 40px;
  border-radius: 12px;
  margin: 4px;
}

.glass-print-list .v-list-item:hover {
  background: rgba(255, 255, 255, 0.45) !important;
}
</style>
