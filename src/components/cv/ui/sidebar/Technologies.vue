<template>
  <div class="mb-6">
    <h3 class="sidebar-title cv-label">{{ title }}</h3>

    <div
        v-for="(group, gIndex) in items"
        :key="gIndex"
        class="mb-4"
    >
      <div class="cv-label text-caption text-primary mb-2 text-uppercase letter-spacing-1">
        {{ group.category }}
      </div>

      <v-row density="compact">
        <v-col
            v-for="(item, iIndex) in group.items"
            :key="iIndex"
            cols="6"
        >
          <TechItem
              :item="item"
              icon-size="small"
              :font-size="fontSize"
              :line-height="lineHeight"
              :lang="lang"
              :index="iIndex"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import TechItem from './TechItem.vue'

export default {
  name: "Technologies",
  components: { TechItem },
  props: {
    title: {
      type: String,
      default: "Technologies & Tools"
    },
    items: {
      type: Array,
      default: () => []
    },
    fontSize: {
      type: String,
      default: "0.85rem"
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

<style scoped lang="sass">
.letter-spacing-1
  letter-spacing: 0.08em
</style>
