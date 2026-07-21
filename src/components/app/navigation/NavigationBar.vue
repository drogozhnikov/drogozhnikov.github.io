<template>
  <v-text-field
    v-model="search"
    variant="outlined"
    rounded="xl"
    density="compact"
    label="Поиск компонента"
    append-inner-icon="mdi-magnify"
    clearable
    flat
    hide-details
  />
  <v-treeview
    v-model:activated="active"
    v-model:opened="open"
    :items="items"
    density="compact"
    item-value="title"
    activatable
    hide-actions
    open-on-click
    separate-roots
    indent-lines="default"
    select-strategy="independent"
    :custom-filter="filter"
    :search="search"
  >
    <template v-slot:prepend="{ item, isOpen }">
      <v-icon v-if="!item.icon" :icon="isOpen ? 'mdi-folder-open' : 'mdi-folder'"></v-icon>
      <v-icon v-else :icon="icons[item.icon]"></v-icon>
    </template>

    <template v-slot:no-data>
      <div class="not-found">Совпадений не найдено</div>
    </template>

  </v-treeview>
</template>

<script setup>
import {computed, ref, shallowRef, watch} from 'vue'
import router from "@/router/index.js";
import { getNavigationItems } from "@/components/app/navigation/navigationConfig.js"

const active = ref([])
const open = shallowRef(['public'])
const search = shallowRef(null)
const icons = shallowRef({
  home: '$NavbarHomeIcon',
  about: '$NavbarAboutIcon',
  json: 'mdi-code-json',
  txt: 'mdi-file-document-outline',
  network: 'mdi-folder-network',
  account: 'mdi-account',
})

const items = getNavigationItems('admin')

const selected = computed(() => {
  if (!active.value.length) return undefined

  const title = active.value[0]
  const element = findItemByTitle(items, title)

  if (element?.target) {
    router.push(element.target)
  }
  return element
})

function filter (value, search, item) {
  return value.toLowerCase().includes(search.toLowerCase())
}

watch(selected, (val) => {
  if (val) console.log('Selected item:', val)
})

function findItemByTitle(data, title) {
  for (const item of data) {
    if (item.title === title) return item
    if (item.children) {
      const found = findItemByTitle(item.children, title)
      if (found) return found
    }
  }
  return null
}

</script>

<style scoped lang="sass">

.not-found
  padding-top: 5px
  text-align: center

.v-text-field
  padding-left: 5px
  padding-right: 5px

.v-treeview
  margin-left: 7px
</style>
