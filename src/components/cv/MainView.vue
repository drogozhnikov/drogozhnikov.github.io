<template>
  <v-container max-width="100%">
    <v-card class="elevation-10 rounded-0 overflow-hidden">
      <v-row no-gutters>
        <v-col cols="12" md="4">
          <Sidebar
              :avatarSrc="currentData.avatar"
              :contacts="currentData.contacts"
              :personal="currentData.personal"
              :skills="currentData.skills"
              :software="currentData.software"
              :hobbies="currentData.hobbies"
              :labels="currentData.labels"
          />
        </v-col>

        <v-col cols="12" md="8">
          <MainContent
              :data="currentData"
              v-model:currentLang="currentLang"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import Sidebar from "@/components/cv/ui/Sidebar.vue";
import MainContent from "@/components/cv/MainContent.vue";

import { resumeRu } from "@/components/cv/data/dataRu.js"
import { resumeEn } from "@/components/cv/data/dataEng.js";

const currentLang = ref('rus')

const currentData = computed(() => {
  return currentLang.value === 'rus' ? resumeRu : resumeEn
})
</script>

<style scoped>
</style>