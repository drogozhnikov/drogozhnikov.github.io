<template>
  <div class="mb-6">
    <h3 class="sidebar-title cv-label">{{ title }}</h3>
    <v-row density="compact">
      <v-col
          v-for="(item, index) in items"
          :key="index"
          cols="6"
      >
        <TechItem
            :item="item"
            icon-size="large"
            :font-size="fontSize"
            :line-height="lineHeight"
            :lang="lang"
            :index="index"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TechItem from './TechItem.vue'

export default {
  name: "Software",
  components: { TechItem },
  props: {
    title: {
      type: String,
      default: "SOFTWARE"
    },
    items: {
      type: Array,
      default: () => []
    },
    fontSize: {
      type: String,
      default: "0.875rem"
    },
    lineHeight: {
      type: String,
      default: "1.2"
    },
    lang: {
      type: String,
      default: "rus"
    }
  }
}
</script>
