<template>
  <section class="mb-6">
    <h3 class="cv-label text-h6 text-grey-darken-4 mb-4 d-flex align-center">
      <v-icon icon="$EducationIcon" size="small" class="mr-3 flex-shrink-0" />
      {{ title }}
      <v-divider class="ml-4 border-opacity-50" />
    </h3>

    <div v-for="(item, index) in educationList" :key="index" class="mb-4">
      <!-- v-card делает блок цельным, а align-stretch вытягивает колонки на одинаковую высоту -->
      <v-card variant="flat" class="pa-4 bg-grey-lighten-4 rounded-lg">
        <v-row density="compact" align="stretch">

          <!-- Левый блок: аватар, годы, тип (выровнен по центру по вертикали и горизонтали) -->
          <v-col cols="12" sm="3" md="3" class="d-flex flex-column align-center justify-center text-center text-grey-darken-2 text-body-2 font-weight-medium border-sm-right">
            <v-avatar
                v-if="item.avatar"
                size="65"
                color="transparent"
                class="mb-2"
            >
              <v-img
                  :src="item.avatar"
                  contain
              />
            </v-avatar>
            <div>{{ item.period }}</div>
            <div class="text-caption font-weight-bold text-primary mt-1">{{ item.type }}</div>
          </v-col>

          <!-- Правый блок: основная информация -->
          <v-col cols="12" sm="9" md="9" class="d-flex flex-column justify-center pl-sm-4">
            <div>
              <!-- Название учебного заведения и ссылка -->
              <div class="text-subtitle-2 font-weight-bold text-uppercase text-grey-darken-3">
                <a
                    v-if="item.url"
                    :href="item.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-decoration-none text-grey-darken-3 title-link"
                >
                  {{ item.title }}
                  <v-icon size="x-small" class="ml-1 icon-link">mdi-open-in-new</v-icon>
                </a>
                <span v-else>{{ item.title }}</span>
              </div>

              <!-- Факультет -->
              <div v-if="item.faculty" class="text-caption font-weight-medium text-grey-darken-2 mt-1">
                <span class="cv-label">{{ labels.faculty }}:</span> {{ item.faculty }}
              </div>

              <!-- Кафедра -->
              <div v-if="item.department" class="text-caption font-weight-medium text-grey-darken-2 mt-0.5">
                <span class="cv-label">{{ labels.department }}:</span> {{ item.department }}
              </div>

              <!-- Специальность / Детали -->
              <div v-if="item.details" class="text-caption font-weight-medium text-grey-darken-2 mt-0.5">
                <span class="cv-label">{{ labels.speciality }}:</span> {{ item.details }}
              </div>
            </div>
          </v-col>

        </v-row>
      </v-card>
    </div>
  </section>
</template>

<script setup>
defineProps({
  educationList: { type: Array, default: () => [] },
  title: { type: String, default: 'EDUCATION' },
  labels: { type: Object, default: () => ({}) }
})
</script>

<style scoped>
.title-link {
  transition: color 0.2s ease;
}

.title-link:hover {
  color: var(--v-theme-primary) !important;
}

.icon-link {
  vertical-align: baseline;
  opacity: 0.7;
}

/* Легкая разделительная линия на десктопе между левым и правым блоком (опционально) */
@media (min-width: 600px) {
  .border-sm-right {
    border-right: 1px solid rgba(0, 0, 0, 0.08);
  }
}
</style>