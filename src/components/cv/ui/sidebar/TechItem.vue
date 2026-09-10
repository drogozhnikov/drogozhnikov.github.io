<template>
  <component
      :is="item.link ? 'a' : 'div'"
      class="software-item text-grey-lighten-1 d-flex flex-row align-center py-1 px-2 rounded transition-fast"
      :class="{ 'software-item--link': item.link }"
      :href="item.link || undefined"
      :target="item.link ? '_blank' : undefined"
      :rel="item.link ? 'noopener noreferrer' : undefined"
      :style="{
        '--item-font-size': fontSize,
        '--item-line-height': lineHeight
      }"
  >
    <v-icon :icon="item.icon" :size="iconSize" class="me-2 flex-shrink-0" />
    <span class="text-truncate font-weight-regular">{{ item.name }}</span>
    <v-tooltip
        v-if="tooltipText"
        activator="parent"
        :location="tooltipLocation"
        content-class="tech-tooltip"
        :text="tooltipText"
    />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  iconSize: {
    type: [String, Number],
    default: 'small'
  },
  fontSize: {
    type: String,
    default: '0.85rem'
  },
  lineHeight: {
    type: String,
    default: '1.2'
  },
  lang: {
    type: String,
    default: 'rus'
  },
  index: {
    type: Number,
    default: 0
  }
})

const tooltipLocation = computed(() => (props.index % 2 === 0 ? 'start' : 'end'))

const tooltipText = computed(() => {
  const description = props.item?.description
  if (!description) return ''
  if (typeof description === 'string') return description
  return (props.lang === 'eng' ? description.en : description.ru) || description.ru || description.en || ''
})
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

.software-item--link
  text-decoration: none
  color: inherit
  cursor: pointer

:deep(.v-icon)
  display: inline-flex
  align-items: center
  justify-content: center

  svg
    width: 100%
    height: 100%
    display: block
</style>

<style lang="sass">
.v-tooltip > .v-overlay__content.tech-tooltip
  background: linear-gradient(rgba(128, 128, 128, 0.03), rgba(128, 128, 128, 0.03)), #ffffff
  color: rgba(66, 66, 66, 0.9)
  font-style: italic
  border: 1px solid rgba(66, 66, 66, 0.35)
</style>
