<template>
  <section class="mb-8">
    <h3 class="cv-label text-h6 text-grey-darken-4 mb-4 d-flex align-center flex-nowrap">
      <v-icon icon="$ExperiencesIcon" size="small" class="mr-3 flex-shrink-0" />

      <!-- Заголовок и суммарный стаж в одну строку -->
      <span class="text-no-wrap me-2">
        {{ title }}
        <span v-if="totalExperienceText" class="text-body-2 text-grey-darken-1 font-weight-regular ms-1">
          ({{ totalExperienceText }})
        </span>
      </span>

      <v-divider class="ml-2 border-opacity-50" />
    </h3>

    <div v-for="(item, index) in experienceList" :key="index" class="experience-card mb-6 pa-4 pa-md-5">
      <v-row align="center" class="mb-0">
        <!-- БЛОК ВЫРОВНЕН ПО ЦЕНТРУ -->
        <v-col cols="12" sm="4" md="4" class="text-grey-darken-2 text-body-2 py-1 d-flex flex-column align-center text-center">

          <!-- Период работы -->
          <div class="text-caption text-grey-darken-1">
            {{ formatPeriod(item) }}
          </div>

          <!-- Название роли -->
          <div class="font-weight-bold text-grey-darken-4 text-subtitle-2 mb-1">
            {{ item.role }}
          </div>

          <!-- Длительность -->
          <div v-if="getItemDuration(item)" class="mt-1">
            <v-chip
                size="default"
                variant="flat"
                color="grey-lighten-3"
                class="text-grey-darken-2 font-weight-medium px-2"
            >
              <v-icon icon="mdi-clock-outline" start></v-icon>
              {{ getItemDuration(item) }}
            </v-chip>
          </div>
        </v-col>

        <!-- Аватар компании -->
        <v-col cols="12" sm="2" md="1" class="d-flex justify-start justify-sm-center py-1">
          <v-avatar
              v-if="item.icon || item.avatar"
              size="56"
              class="company-avatar"
          >
            <v-img
                :src="item.icon || item.avatar"
                cover
                class="company-img"
            />
          </v-avatar>
        </v-col>

        <v-col cols="12" sm="6" md="7" class="text-sm-left py-1">
          <div class="cv-label text-subtitle-2 text-uppercase text-grey-darken-3">
            <a
                v-if="item.url"
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-decoration-none text-grey-darken-3 company-link"
            >
              {{ item.company }}
              <v-icon size="x-small" class="ml-1 icon-link">mdi-open-in-new</v-icon>
            </a>
            <span v-else>{{ item.company }}</span>
          </div>

          <!-- Краткое описание -->
          <p
              v-if="item.summary"
              class="text-body-2 text-grey-darken-3 mt-1 mb-0 summary-text"
          >
            {{ item.summary }}
          </p>
        </v-col>
      </v-row>

      <!-- Блоки Обязанности, Достижения и Проекты -->
      <v-row v-if="item.responsibilities || item.achievements || item.projects || item.details" class="mt-2">
        <v-col cols="12" class="pt-1">

          <!-- Обязанности -->
          <div v-if="item.responsibilities && item.responsibilities.length" class="mb-3">
            <div class="cv-label text-body-2 text-grey-darken-3 mb-2 d-flex align-center">
              <v-icon icon="$ResponsibilitiesIcon" size="small" class="mr-1 text-primary" />
              {{ labels?.responsibilities || 'Обязанности' }}:
            </div>
            <ul class="details-list text-caption text-grey-darken-2 pl-4 ml-sm-6 ml-md-8">
              <li v-for="(resp, rIndex) in item.responsibilities" :key="rIndex" class="mb-1">
                {{ resp }}
              </li>
            </ul>
          </div>

          <!-- Достижения -->
          <div v-if="item.achievements && item.achievements.length" class="mb-3">
            <div class="cv-label text-body-2 text-grey-darken-3 mb-2 d-flex align-center">
              <v-icon icon="$AchievementsIcon" size="small" class="mr-1 text-amber-darken-2" />
              {{ labels?.achievements || 'Достижения' }}:
            </div>
            <ul class="details-list text-caption text-grey-darken-2 pl-4 ml-sm-6 ml-md-8">
              <li v-for="(ach, aIndex) in item.achievements" :key="aIndex" class="mb-1">
                {{ ach }}
              </li>
            </ul>
          </div>

          <!-- СВЯЗАННЫЕ ПРОЕКТЫ ДЛЯ ДАННОГО МЕСТА РАБОТЫ -->
          <div v-if="item.projects && item.projects.length" class="mb-3">
            <div class="cv-label text-body-2 text-grey-darken-3 mb-2 d-flex align-center">
              <v-icon icon="$LinkedProjectsIcon" size="small" class="mr-1 text-info" />
              {{ labels?.projects || 'Связанные проекты' }}:
            </div>

            <div class="pl-4 ml-sm-6 ml-md-8">
              <div v-for="(project, pIndex) in item.projects" :key="pIndex" class="mb-3">
                <div class="font-weight-bold text-caption text-grey-darken-4 mb-1">
                  <a
                      v-if="project.url"
                      :href="project.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-decoration-none text-primary project-link"
                  >
                    {{ project.name }}
                    <v-icon size="x-small" class="ml-1 icon-link">mdi-open-in-new</v-icon>
                  </a>
                  <span v-else>{{ project.name }}</span>
                </div>

                <p v-if="project.description" class="text-caption text-grey-darken-2 mb-2">
                  {{ project.description }}
                </p>

                <div v-if="project.stack && project.stack.length" class="d-flex flex-wrap mt-1">
                  <v-chip
                      v-for="(tech, tIndex) in project.stack"
                      :key="tIndex"
                      size="small"
                      variant="tonal"
                      color="primary"
                      class="project-tech-chip mr-1.5 mb-1.5 font-weight-medium"
                      :href="tech.link || undefined"
                      :target="tech.link ? '_blank' : undefined"
                      :rel="tech.link ? 'noopener noreferrer' : undefined"
                  >
                    <v-icon v-if="tech.icon" :icon="tech.icon" start size="16"></v-icon>
                    {{ tech.name }}
                  </v-chip>
                </div>

                <v-divider
                    v-if="pIndex !== item.projects.length - 1"
                    class="mt-3 border-opacity-25"
                ></v-divider>
              </div>
            </div>
          </div>

          <ul v-if="item.details && !item.responsibilities && !item.achievements && !item.projects" class="details-list text-caption text-grey-darken-2 pl-4 ml-sm-6 ml-md-8">
            <li v-for="(detail, dIndex) in item.details" :key="dIndex" class="mb-1">
              {{ detail }}
            </li>
          </ul>

        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import {
  calculateMonthsBetween,
  formatDuration,
  formatPeriod as formatPeriodByLabels
} from '@/components/cv/utils/experienceDates.js'

const props = defineProps({
  experienceList: { type: Array, default: () => [] },
  title: { type: String, default: 'ОПЫТ РАБОТЫ' },
  labels: { type: Object, default: () => ({}) }
})

const formatPeriod = (item) => formatPeriodByLabels(item, props.labels)

const getItemDuration = (item) => {
  if (!item.startDate) return ''
  return formatDuration(calculateMonthsBetween(item.startDate, item.endDate), props.labels)
}

const totalExperienceText = computed(() => {
  if (!props.experienceList.length) return ''

  let totalMonths = 0
  props.experienceList.forEach(item => {
    totalMonths += calculateMonthsBetween(item.startDate, item.endDate)
  })

  return formatDuration(totalMonths, props.labels)
})
</script>

<style scoped>
.experience-card {
  background-color: rgba(128, 128, 128, 0.03);
  border-radius: 16px;
  transition: background-color 0.2s ease;
}

.experience-card:hover {
  background-color: rgba(128, 128, 128, 0.05);
}

.details-list {
  list-style-type: disc;
}

.details-list li {
  line-height: 1.4;
}

.summary-text {
  line-height: 1.5;
}

.company-link {
  transition: color 0.2s ease;
}

.company-link:hover {
  color: var(--v-theme-primary) !important;
}

.project-link {
  transition: opacity 0.2s ease;
}

.project-link:hover {
  opacity: 0.8;
}

.icon-link {
  vertical-align: baseline;
  opacity: 0.7;
}

.project-tech-chip {
  font-size: 0.8rem !important;
  height: 28px !important;
}

.company-avatar {
  border-radius: 50% !important;
  overflow: hidden;
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
}

.company-img {
  width: 100%;
  height: 100%;
}

.company-img :deep(img) {
  object-fit: cover !important;
  width: 100% !important;
  height: 100% !important;
  border-radius: 50% !important;
}
</style>