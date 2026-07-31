<template>
  <v-container max-width="100%">
    <!-- Экранная версия (скрывается при печати) -->
    <div class="no-print">
      <v-btn color="success" class="mb-4" @click="printPdf">
        Распечатать / Сохранить в PDF
      </v-btn>

      <v-card class="elevation-10 rounded-0 overflow-hidden">
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
    </div>

    <!-- Версия для печати (отображается только при печати) -->
    <div class="print-only">
      <CvPrintTemplate :data="currentData" />
<!--      <RabotaByTemplate :data="currentData" />-->
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import Sidebar from "@/components/cv/ui/Sidebar.vue";
import MainContent from "@/components/cv/ui/MainContent.vue";

import { resumeRu } from "@/components/cv/data/dataRu.js"
import { resumeEng } from "@/components/cv/data/dataEng.js";
import CvPrintTemplate from "@/components/cv/print/CvPrintTemplate.vue";
import RabotaByTemplate from "@/components/cv/print/RabotaByTemplate.vue";

const printPdf = () => {
  window.print();
}

const currentLang = ref('rus')

const currentData = computed(() => {
  switch (currentLang.value) {
    case "rus":
      return resumeRu
    default:
      return resumeEng
  }
})
</script>

<style scoped>
@media screen {
  .print-only {
    display: none !important;
  }
}

@media print {
  /* Полностью скрываем фон и лишние элементы */
  body, html {
    background: none !important;
    background-color: #ffffff !important;
  }

  /* Скрываем экранный интерфейс */
  .no-print {
    display: none !important;
  }

  /* Показываем печатную верстку */
  .print-only {
    display: block !important;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  @page {
    size: A4;
    margin: 0;
  }
}
</style>