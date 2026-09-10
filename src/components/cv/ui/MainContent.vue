<template>
  <v-sheet theme="light" class="resume-main pa-8" elevation="0">
    <!-- Шапка с выбором языка -->
    <Header
        :firstName="data.firstName"
        :surname="data.surname"
        :lastName="data.lastName"
        :profession="data.profession"
        :currentLang="currentLang"
        :exporting="exporting"
        @update:currentLang="$emit('update:currentLang', $event)"
        @print="$emit('print', $event)"
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

    <!-- Сопроводительное письмо -->
    <About
        v-if="data.coverLetter?.length"
        :items="data.coverLetter"
        :title="data.labels?.coverLetter"
        icon="$AboutIcon"
    />

    <!-- О себе -->
    <About
        v-if="data.about?.length"
        :items="data.about"
        :title="data.labels?.about"
        icon="mdi-account-outline"
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
  currentLang: { type: String, default: 'rus' },
  exporting: { type: Boolean, default: false }
})

defineEmits(['update:currentLang', 'print'])
</script>

<style scoped>
.resume-main {
  background-color: #ffffff !important;
  color: #212121;
  height: 100%;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

@media (max-width: 959px) {
  .resume-main {
    border-radius: 0 0 15px 15px;
  }
}
</style>