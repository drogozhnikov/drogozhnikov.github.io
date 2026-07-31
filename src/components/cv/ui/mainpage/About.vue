<template>
  <section class="mb-8">
    <h3 class="text-h6 font-weight-bold text-grey-darken-4 mb-4 d-flex align-center text-no-wrap">
      {{ title }}
      <v-divider class="ml-4 border-opacity-50" />
    </h3>

    <!-- Если передана просто строка -->
    <p v-if="typeof aboutData === 'string'" class="text-body-2 text-grey-darken-2 line-height-relaxed">
      {{ aboutData }}
    </p>

    <!-- Если передан массив объектов (текст + подпункты) -->
    <div v-else class="d-flex flex-column gap-3">
      <div v-for="(item, index) in indexList(aboutData)" :key="index">
        <p class="text-body-2 text-grey-darken-2 mb-1">
          {{ item.text }}
        </p>

        <!-- Подпункты (subtext) с плотным прилеганием к тексту и минимальным отступом снизу -->
        <ul v-if="item.subtext && item.subtext.length > 0" class="pl-4 text-body-2 text-grey-darken-1 mb-1">
          <li v-for="(sub, subIdx) in item.subtext" :key="subIdx" class="sub-item">
            {{ sub }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  aboutData: {
    type: [String, Array],
    required: true
  },
  title: {
    type: String,
    default: 'ABOUT'
  }
})

const indexList = (data) => data
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
</style>