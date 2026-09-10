<template>
  <div class="mb-6">
    <h3 class="sidebar-title cv-label">{{ title }}</h3>
    <v-row density="compact">
      <v-col
          v-for="(item, index) in items"
          :key="index"
          cols="6"
      >
        <div
            class="software-item text-grey-lighten-1 d-flex flex-row align-center py-1 px-2 rounded transition-fast"
            :style="{
            '--item-font-size': fontSize,
            '--item-line-height': lineHeight
          }"
        >
          <v-icon :icon="item.icon" size="large" class="me-2 flex-shrink-0" />
          <span class="text-truncate font-weight-regular">{{ item.name }}</span>
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
  }
}
</script>

<style scoped lang="sass">
.software-item
  white-space: nowrap
  font-size: var(--item-font-size)
  line-height: var(--item-line-height)
  border: 1px solid transparent
  background-color: transparent

  &:hover
    background-color: rgba(255, 255, 255, 0.06)
    border-color: rgba(255, 255, 255, 0.05)
    color: #ffffff !important

:deep(.v-icon)
  display: inline-flex
  align-items: center
  justify-content: center

  svg
    width: 100%
    height: 100%
    display: block
</style>