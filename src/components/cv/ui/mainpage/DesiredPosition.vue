<template>
  <section class="mb-8">
    <h3 class="cv-label text-h6 text-grey-darken-4 mb-4 section-heading">
      <v-icon icon="$DesiredPositionIcon" size="small" class="flex-shrink-0" />
      <span class="section-heading__text">{{ title }}</span>
      <v-divider class="section-heading__line border-opacity-50" />
    </h3>

    <!-- Желаемая должность и зарплата -->
    <div class="d-flex flex-column flex-sm-row justify-space-between align-sm-center mb-3 pb-3 border-bottom">
      <div class="text-subtitle-1 font-weight-bold text-grey-darken-4">
        {{ data.title }}
      </div>

      <!-- Зарплата с увеличенной цифрой и обычным постфиксом -->
      <div v-if="data.salary" class="mt-1 mt-sm-0 d-flex align-center">
        <span class="text-h8 font-weight-bold text-primary">{{ formattedNumber }}</span>
        <span class="text-subtitle-1 text-primary">{{ labels.salarySuffix }}</span>
      </div>
    </div>

    <!-- Детальные параметры -->
    <div class="d-flex flex-column gap-2 text-body-2">
      <!-- Специализации -->
      <div v-if="data.specializations && data.specializations.length">
        <span class="cv-label text-grey-darken-3">{{ labels.specializations }}:</span>
        <span class="text-grey-darken-2 ml-2">
          {{ data.specializations.join(' — ') }}
        </span>
      </div>

      <!-- Занятость -->
      <div v-if="data.employment">
        <span class="cv-label text-grey-darken-3">{{ labels.employment }}:</span>
        <span class="text-grey-darken-2 ml-2">{{ data.employment }}</span>
      </div>

      <!-- График работы -->
      <div v-if="data.schedule && data.schedule.length">
        <span class="cv-label text-grey-darken-3">{{ labels.schedule }}:</span>
        <span class="text-grey-darken-2 ml-2">{{ data.schedule.join(', ') }}</span>
      </div>

      <!-- Время в пути -->
      <div v-if="data.travelTime">
        <span class="cv-label text-grey-darken-3">{{ labels.travelTime }}:</span>
        <span class="text-grey-darken-2 ml-2">{{ data.travelTime }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  labels: {
    type: Object,
    default: () => ({})
  },
  title: {
    type: String,
    default: 'ЖЕЛАЕМАЯ ДОЛЖНОСТЬ И ЗАРПЛАТА'
  }
})

// Форматирование только цифровой части (например: 9600 -> "9 600")
const formattedNumber = computed(() => {
  if (!props.data.salary) return ''
  return props.data.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
})
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
.gap-2 {
  gap: 8px;
}
</style>