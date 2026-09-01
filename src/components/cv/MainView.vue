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
            />
          </v-col>

          <v-col cols="12" md="8">
            <MainContent
                :data="currentData"
                v-model:currentLang="currentLang"
                :exporting="isExporting"
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
import { ref, computed, nextTick } from 'vue'
import Sidebar from "@/components/cv/ui/Sidebar.vue";
import MainContent from "@/components/cv/ui/MainContent.vue";

import { resumeRu } from "@/components/cv/data/dataRu.js"
import { resumeEng } from "@/components/cv/data/dataEng.js";
import CvPrintTemplate from "@/components/cv/print/CvPrintTemplate.vue";
import RabotaByTemplate from "@/components/cv/print/RabotaByTemplate.vue";
import { exportElementToPdf } from "@/components/cv/print/exportPdf.js";

const currentLang = ref('rus')
const printTemplate = ref('rabota')
const isExporting = ref(false)

const currentData = computed(() => {
  switch (currentLang.value) {
    case "rus":
      return resumeRu
    default:
      return resumeEng
  }
})

const printWithTemplate = async (template) => {
  if (isExporting.value) return

  printTemplate.value = template
  isExporting.value = true
  document.body.classList.add('print-export')

  try {
    await nextTick()
    await nextTick()
    await document.fonts?.ready
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))

    const source = document.querySelector('.cv-print-container, .hh-pdf-container')
    if (!source) {
      throw new Error('Print template is not in the document')
    }

    const images = [...source.querySelectorAll('img')]
    await Promise.all(images.map((img) => {
      if (img.complete) return Promise.resolve()
      return new Promise((resolve) => {
        img.onload = resolve
        img.onerror = resolve
      })
    }))

    const lastName = currentData.value.lastName || 'CV'
    const suffix = template === 'current' ? 'CV' : 'RabotaBy'
    await exportElementToPdf(source, `${lastName}_${suffix}.pdf`)
  } catch (error) {
    console.error('PDF export failed:', error)
  } finally {
    document.body.classList.remove('print-export')
    isExporting.value = false
  }
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