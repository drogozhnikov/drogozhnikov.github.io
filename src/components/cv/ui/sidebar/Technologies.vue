<template>
  <div class="mb-4">
    <!-- Главный заголовок секции -->
    <h3 class="text-subtitle-1 font-weight-bold mb-3 tracking-wider text-uppercase text-grey-lighten-2">
      {{ title }}
    </h3>

    <!-- Итерация по подкатегориям -->
    <div
        v-for="(group, gIndex) in items"
        :key="gIndex"
        class="mb-4"
    >
      <!-- Название подкатегории -->
      <div class="text-caption font-weight-medium text-primary mb-2 text-uppercase letter-spacing-1">
        {{ group.category }}
      </div>

      <!-- Список технологий в подкатегории (2 колонки) -->
      <v-row density="compact">
        <v-col
            v-for="(item, iIndex) in group.items"
            :key="iIndex"
            cols="6"
        >
          <div
              class="software-item text-grey-lighten-1 d-flex flex-row align-center py-1 px-2 rounded transition-fast"
              :style="{
              '--item-font-size': fontSize,
              '--item-line-height': lineHeight
            }"
          >
            <v-icon :icon="item.icon" size="small" class="me-2 flex-shrink-0" />
            <span class="text-truncate font-weight-regular">{{ item.name }}</span>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Technologies",
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
    }
  }
}
</script>

<style scoped lang="sass">
.letter-spacing-1
  letter-spacing: 0.08em

.software-item
  white-space: nowrap
  font-size: var(--item-font-size)
  line-height: var(--item-line-height)
  background-color: rgba(255, 255, 255, 0.02)
  border: 1px solid rgba(255, 255, 255, 0.05)

  &:hover
    background-color: rgba(255, 255, 255, 0.06)
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