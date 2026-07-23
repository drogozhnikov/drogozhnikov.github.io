<template>
  <v-sheet class="resume-main pa-8" elevation="0">
    <!-- Шапка с выбором языка -->
    <Header
        :firstName="data.firstName"
        :lastName="data.lastName"
        :profession="data.profession"
        :currentLang="currentLang"
        @update:currentLang="$emit('update:currentLang', $event)"
    />

    <!-- О себе -->
    <section class="mb-8">
      <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-3">
        {{ data.labels?.about || 'ABOUT' }}
      </h3>
      <p class="text-body-2 text-grey-darken-2 line-height-relaxed">
        {{ data.about }}
      </p>
    </section>

    <!-- Опыт работы -->
    <Experience
        :experienceList="data.experience"
        :title="data.labels?.experience"
    />

    <!-- Образование -->
    <Education
        :educationList="data.education"
        :title="data.labels?.education"
    />
  </v-sheet>
</template>

<script setup>
import Header from "@/components/cv/ui/mainpage/Header.vue";
import Experience from '@/components/cv/ui/mainpage/Experience.vue';
import Education from '@/components/cv/ui/mainpage/Education.vue';

defineProps({
  data: { type: Object, required: true },
  currentLang: { type: String, default: 'rus' }
})

defineEmits(['update:currentLang'])
</script>

<style scoped>
.resume-main {
  background-color: rgba(255, 255, 255, 0.9);
  height: 100%;
}
</style>