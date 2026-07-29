<template>
  <section class="mb-8">
    <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-4 d-flex align-center">
      <v-icon icon="$ExperiencesIcon" size="small" class="mr-3" />
      {{ title }}
      <v-divider class="ml-4 border-opacity-50" />
    </h3>

    <div v-for="(item, index) in experienceList" :key="index" class="mb-6">
      <v-row>
        <v-col cols="4" class="text-grey-darken-2 text-body-2 font-weight-medium">
          <div>{{ item.period }}</div>
          <div class="text-caption text-grey">{{ item.role }}</div>
        </v-col>
        <v-col cols="8">
          <div class="text-subtitle-2 font-weight-bold text-uppercase text-grey-darken-3">
            {{ item.company }}
          </div>
          <p class="text-body-2 text-grey-darken-1 mt-1">
            {{ item.description }}
          </p>
        </v-col>
      </v-row>
    </div>
  </section>
</template>

<script setup>

defineProps({
  experienceList: { type: Array, default: () => [] },
  title: { type: String, default: 'EXPERIENCE' }
})
</script>