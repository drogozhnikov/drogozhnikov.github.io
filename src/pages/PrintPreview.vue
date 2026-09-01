<template>
  <div class="preview-page">
    <div class="preview-toolbar">
      <v-btn
          color="success"
          :loading="downloading"
          :disabled="downloading"
          @click="downloadPdf"
      >
        Скачать PDF
      </v-btn>
      <v-btn variant="text" :to="{ name: 'home' }">На главную</v-btn>
    </div>

    <div class="preview-sheet">
      <CvPrintTemplate v-if="template === 'current'" :data="currentData" />
      <RabotaByTemplate v-else :data="currentData" />
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'
import { resumeRu } from '@/components/cv/data/dataRu.js'
import { resumeEng } from '@/components/cv/data/dataEng.js'
import CvPrintTemplate from '@/components/cv/print/CvPrintTemplate.vue'
import RabotaByTemplate from '@/components/cv/print/RabotaByTemplate.vue'
import { exportElementToPdf } from '@/components/cv/print/exportPdf.js'

const route = useRoute()
const downloading = ref(false)

const template = computed(() => (
  route.query.template === 'current' ? 'current' : 'rabota'
))

const currentData = computed(() => (
  route.query.lang === 'eng' ? resumeEng : resumeRu
))

const downloadPdf = async () => {
  if (downloading.value) return
  downloading.value = true

  try {
    await nextTick()
    await document.fonts?.ready
    const source = document.querySelector('.cv-print-container, .hh-pdf-container')
    if (!source) throw new Error('Print template is not in the document')

    const images = [...source.querySelectorAll('img')]
    await Promise.all(images.map((img) => {
      if (img.complete) return Promise.resolve()
      return new Promise((resolve) => {
        img.onload = resolve
        img.onerror = resolve
      })
    }))

    const lastName = currentData.value.lastName || 'CV'
    const suffix = template.value === 'current' ? 'CV' : 'RabotaBy'
    await exportElementToPdf(source, `${lastName}_${suffix}.pdf`)
  } catch (error) {
    console.error('PDF export failed:', error)
  } finally {
    downloading.value = false
  }
}
</script>

<style scoped>
.preview-page {
  min-height: 100%;
  background: #d6d6d6;
  padding: 16px 16px 48px;
}

.preview-toolbar {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 8px 0 16px;
  background: linear-gradient(#d6d6d6 70%, transparent);
}

.preview-sheet {
  width: 210mm;
  max-width: 100%;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
}
</style>
