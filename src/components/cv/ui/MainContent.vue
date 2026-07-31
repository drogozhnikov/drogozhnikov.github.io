<template>
  <v-sheet class="resume-main pa-8" elevation="0">
    <!-- Шапка с выбором языка -->
    <Header
        :firstName="data.firstName"
        :surname="data.surname"
        :lastName="data.lastName"
        :profession="data.profession"
        :currentLang="currentLang"
        @update:currentLang="$emit('update:currentLang', $event)"
    />
    <!-- Опыт работы -->
    <DesiredPosition
        v-if="data.desiredPosition"
        :data="data.desiredPosition"
        :labels="data.labels?.labelsDesired"
        :title="data.labels?.desiredPositionTitle"
    />

    <!-- Опыт работы -->
    <Experience
        :experienceList="data.experience"
        :title="data.labels?.experience"
        :labels="data.labels"
    />

    <!-- Образование -->
    <Education
        :educationList="data.education"
        :title="data.labels?.education"
        :labels="data.labels"
    />

    <!-- О себе -->
    <About
        :aboutData="data.about"
        :title="data.labels?.about"
    />
  </v-sheet>
</template>

<script setup>
import Header from "@/components/cv/ui/mainpage/Header.vue";
import Experience from '@/components/cv/ui/mainpage/Experience.vue';
import Education from '@/components/cv/ui/mainpage/Education.vue';
import About from "@/components/cv/ui/mainpage/About.vue";
import DesiredPosition from "@/components/cv/ui/mainpage/DesiredPosition.vue";

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