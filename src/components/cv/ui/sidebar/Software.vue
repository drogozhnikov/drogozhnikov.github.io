<template>
  <div class="mb-3">
    <h3 class="text-subtitle-1 font-weight-bold mb-3 tracking-wider">{{ title }}</h3>
    <v-row density="compact">
      <v-col
          v-for="(item, index) in items"
          :key="index"
          cols="6"
      >
        <div
            class="software-item text-grey-lighten-1 d-flex flex-row align-center"
            :style="{
            '--item-font-size': fontSize,
            '--item-line-height': lineHeight
          }"
        >
          <v-icon :icon="item.icon" size="large" class="me-2 flex-shrink-0" />
          <span class="text-truncate">{{ item.name }}</span>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Software",
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
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="sass">
.software-item
  white-space: nowrap
  font-size: var(--item-font-size)
  line-height: var(--item-line-height)
</style>