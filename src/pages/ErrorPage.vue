<template>
  <v-empty-state
      action-text="Home"
      headline="Whoops, 404"
      title="Page not found"
      text="The page you were looking for does not exist"
      icon="$ErrorBrokenPage"
  >
    <template v-slot:actions>
      <v-btn
          text="Home"
          color="primary"
          variant="outlined"
          @click="goHome"
      />
    </template>
  </v-empty-state>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => router.push('/')
</script>

<style lang="sass" scoped>
.v-empty-state
  padding: 10%
</style>
