<template>
  <v-sheet class="resume-sidebar pa-6 text-white" elevation="0">
    <!-- Аватар -->
    <div class="d-flex justify-center mb-6">
      <v-avatar size="240" class="border-cyan">
        <v-img :src="avatarSrc" alt="Avatar" cover />
      </v-avatar>
    </div>

    <!-- Контакты -->
    <div class="mb-6">
      <h3 class="text-subtitle-1 font-weight-bold mb-3 tracking-wider">{{ labels?.contact || 'CONTACT' }}</h3>
      <div v-for="(contact, index) in contacts" :key="index" class="d-flex align-center mb-2">
        <v-icon :icon="contact.icon" size="small" class="mr-3" />
        <a
            :href="contact.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-body-2 text-white text-decoration-none contact-link"
        >
          {{ contact.text }}
        </a>
      </div>
    </div>

    <v-divider class="border-opacity-25 mb-6" />

    <!-- Персональные данные -->
    <div class="mb-6">
      <h3 class="text-subtitle-1 font-weight-bold mb-3 tracking-wider">{{ labels?.personal || 'PERSONAL' }}</h3>
      <div v-for="(item, index) in personal" :key="index" class="mb-2 text-body-2">
        <div class="text-grey-lighten-1 text-caption">{{ item.label }}</div>
        <div class="font-weight-medium">{{ item.value }}</div>
      </div>
    </div>

    <v-divider class="border-opacity-25 mb-6" />

    <!-- Навыки -->
    <div class="mb-6">
      <h3 class="text-subtitle-1 font-weight-bold mb-3 tracking-wider">{{ labels?.skills || 'SKILLS' }}</h3>
      <div v-for="(skill, index) in skills" :key="index" class="mb-3">
        <div class="d-flex justify-between text-body-2 mb-1">
          <span>{{ skill.name }}</span>
        </div>
        <v-progress-linear :model-value="skill.level" color="white" height="4" bg-color="grey-darken-2" />
      </div>
    </div>

    <v-divider class="border-opacity-25 mb-6" />

    <!-- Софт / Инструменты -->
    <div class="mb-6">
      <h3 class="text-subtitle-1 font-weight-bold mb-3 tracking-wider">{{ labels?.software || 'SOFTWARE' }}</h3>
      <div v-for="(sw, index) in software" :key="index" class="mb-3">
        <div class="text-body-2 mb-1">{{ sw.name }}</div>
        <v-progress-linear :model-value="sw.level" color="white" height="4" bg-color="grey-darken-2" />
      </div>
    </div>

    <v-divider class="border-opacity-25 mb-6" />

    <!-- Хобби -->
    <div class="mb-6">
      <h3 class="text-subtitle-1 font-weight-bold mb-3 tracking-wider">{{ labels?.hobbies || 'HOBBIES' }}</h3>
      <v-row dense class="text-center">
        <v-col
            v-for="(hobby, index) in hobbies"
            :key="index"
            cols="6"
            sm="4"
            class="d-flex flex-column align-center mb-3"
        >
          <v-icon :icon="hobby.icon" size="large" class="mb-2" />
          <div class="text-caption text-grey-lighten-1" style="word-break: break-word; line-height: 1.2;">
            {{ hobby.name }}
          </div>
        </v-col>
      </v-row>
    </div>
  </v-sheet>
</template>

<script setup>
defineProps({
  avatarSrc: { type: String, required: true },
  contacts: { type: Array, default: () => [] },
  personal: { type: Array, default: () => [] },
  skills: { type: Array, default: () => [] },
  software: { type: Array, default: () => [] },
  hobbies: { type: Array, default: () => [] },
  labels: { type: Object, default: () => ({}) }
})
</script>

<style scoped>
.resume-sidebar {
  height: 100%;
}
.border-cyan {
  border: 4px solid #00bcd4;
}
.contact-link:hover {
  text-decoration: underline !important;
}
</style>