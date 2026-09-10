<template>
  <section class="mb-8">
    <h3 class="cv-label text-h6 text-grey-darken-4 mb-4 d-flex align-center text-no-wrap">
      <v-icon :icon="icon" size="small" class="mr-3 flex-shrink-0" />
      {{ title }}
      <v-divider class="ml-4 border-opacity-50" />
    </h3>

    <!-- Если передана просто строка -->
    <p v-if="typeof items === 'string'" class="text-body-2 text-grey-darken-2 line-height-relaxed">
      {{ items }}
    </p>

    <!-- Если передан массив объектов (текст + подпункты) -->
    <div v-else class="d-flex flex-column gap-3">
      <div v-for="(item, index) in items" :key="index">
        <p class="text-body-2 text-grey-darken-2 mb-1">
          {{ item.text }}
        </p>

        <!-- Подпункты (subtext) с плотным прилеганием к тексту и минимальным отступом снизу -->
        <ul v-if="item.subtext && item.subtext.length > 0" class="pl-4 text-body-2 text-grey-darken-1 mb-1">
          <li v-for="(sub, subIdx) in item.subtext" :key="subIdx" class="sub-item">
            <a
                v-if="subUrl(sub)"
                :href="subUrl(sub)"
                target="_blank"
                rel="noopener noreferrer"
                class="text-decoration-none text-grey-darken-1 about-link"
            >
              {{ subText(sub) }}
              <v-icon size="x-small" class="ml-1">mdi-open-in-new</v-icon>
            </a>
            <template v-else>{{ subText(sub) }}</template>
            <ul v-if="subItems(sub).length" class="pl-4 mt-1 mb-1">
              <li v-for="(nested, nIdx) in subItems(sub)" :key="nIdx" class="sub-item">
                {{ nested }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  items: {
    type: [String, Array],
    required: true
  },
  title: {
    type: String,
    default: 'ABOUT'
  },
  icon: {
    type: String,
    default: '$AboutIcon'
  }
})

const subText = (sub) => (typeof sub === 'string' ? sub : (sub?.text ?? ''))
const subUrl = (sub) => (typeof sub === 'string' ? '' : (sub?.url ?? ''))
const subItems = (sub) => (typeof sub === 'string' ? [] : (sub?.items || []))
</script>

<style scoped>
.line-height-relaxed {
  line-height: 1.6;
}
.gap-3 {
  gap: 4px;
}
.sub-item {
  margin-bottom: 0px;
  line-height: 1.4;
}
.about-link:hover {
  color: #1976d2 !important;
}
</style>