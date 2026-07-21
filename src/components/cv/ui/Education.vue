<template>
  <section class="mb-6">
    <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-4 d-flex align-center">
      {{ title }}
      <v-divider class="ml-4 border-opacity-50" />
    </h3>

    <div v-for="(item, index) in educationList" :key="index" class="mb-6">
      <v-row>
        <v-cols cols="4" class="text-grey-darken-2 text-body-2 font-weight-medium">
          <div>{{ item.period }}</div>
        </v-cols>
        <v-cols cols="8">
          <div class="text-subtitle-2 font-weight-bold text-uppercase text-grey-darken-3">
            {{ item.institution }}
          </div>
          <p class="text-body-2 text-grey-darken-1 mt-1">
            {{ item.description }}
          </p>
        </v-cols>
      </v-row>
    </div>
  </section>
</template>

<script setup>
defineProps({
  educationList: { type: Array, default: () => [] },
  title: { type: String, default: 'EDUCATION' }
})
</script>