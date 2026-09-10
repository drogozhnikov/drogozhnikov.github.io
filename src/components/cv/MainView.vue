<template>
  <v-container class="pa-0" fluid>
    <div class="no-print">

      <v-card class="cv-shell elevation-10 overflow-hidden">
        <v-row no-gutters>
          <v-col cols="12" md="4">
            <Sidebar
                :avatarSrc="currentData.avatar"
                :contacts="currentData.contacts"
                :personal="currentData.personal"
                :skills="currentData.skills"
                :software="currentData.software"
                :technologies="currentData.technologies"
                :hobbies="currentData.hobbies"
                :labels="currentData.labels"
                :lang="currentLang"
            />
          </v-col>

          <v-col cols="12" md="8">
            <MainContent
                :data="currentData"
                v-model:currentLang="currentLang"
                @print="printWithTemplate"
            />
          </v-col>
        </v-row>
      </v-card>
    </div>

    <!-- Версия для печати (отображается только при печати) -->
    <div class="print-only">
      <CvPrintTemplate v-if="printTemplate === 'current'" :data="currentData" />
      <RabotaByTemplate v-else :data="currentData" />
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from "@/components/cv/ui/Sidebar.vue";
import MainContent from "@/components/cv/ui/MainContent.vue";

import { resumeRu } from "@/components/cv/data/dataRu.js"
import { resumeEng } from "@/components/cv/data/dataEng.js";
import CvPrintTemplate from "@/components/cv/print/CvPrintTemplate.vue";
import RabotaByTemplate from "@/components/cv/print/RabotaByTemplate.vue";

const router = useRouter()
const currentLang = ref('rus')
const printTemplate = ref('rabota')

const currentData = computed(() => {
  switch (currentLang.value) {
    case "rus":
      return resumeRu
    default:
      return resumeEng
  }
})

const printWithTemplate = (template) => {
  printTemplate.value = template
  const href = router.resolve({
    name: 'preview',
    query: {
      template,
      lang: currentLang.value,
    },
  }).href
  window.open(href, '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
@media screen {
  .print-only {
    display: none !important;
  }
}

.cv-shell {
  border-radius: 15px !important;
  background: transparent !important;
  overflow: hidden;
}
</style>