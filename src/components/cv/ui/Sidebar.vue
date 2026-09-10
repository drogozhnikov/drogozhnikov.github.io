<template>
  <LiquidGlass class="resume-sidebar">
    <div class="sidebar-inner pa-6 text-white">
      <Avatar :src="avatarSrc" />

      <Personal :title="labels?.personal || 'PERSONAL'" :items="personal" />
      <v-divider class="border-opacity-25 mb-6" />

      <Contacts :title="labels?.contact || 'CONTACT'" :contacts="contacts" />
      <v-divider class="border-opacity-25 mb-6" />

      <ProgressList :title="labels?.skills || 'SKILLS'" :items="skills" />
      <v-divider class="border-opacity-25 mb-6" />

      <Software :title="labels?.software || 'SOFTWARE'" :items="software" :lang="lang" />
      <v-divider class="border-opacity-25 mb-6" />

      <Technologies :title="labels?.technologies || 'TECHNOLOGIES'" :items="technologies" :lang="lang" />
      <v-divider class="border-opacity-25 mb-6" />

      <Hobbies :title="labels?.hobbies || 'HOBBIES'" :hobbies="hobbies" />
    </div>
  </LiquidGlass>
</template>

<script setup>
import LiquidGlass from "@/components/cv/ui/LiquidGlass.vue";
import Avatar from "@/components/cv/ui/sidebar/Avatar.vue";
import Contacts from "@/components/cv/ui/sidebar/Contacts.vue";
import Personal from "@/components/cv/ui/sidebar/Personal.vue";
import ProgressList from "@/components/cv/ui/sidebar/ProgressList.vue";
import Hobbies from "@/components/cv/ui/sidebar/Hobbies.vue";
import Software from "@/components/cv/ui/sidebar/Software.vue";
import Technologies from "@/components/cv/ui/sidebar/Technologies.vue";

defineProps({
  avatarSrc: { type: String, required: true },
  contacts: { type: Array, default: () => [] },
  personal: { type: Array, default: () => [] },
  skills: { type: Array, default: () => [] },
  software: { type: Array, default: () => [] },
  technologies: { type: Array, default: () => [] },
  hobbies: { type: Array, default: () => [] },
  labels: { type: Object, default: () => ({}) },
  lang: { type: String, default: 'rus' }
})
</script>

<style scoped>
.resume-sidebar {
  height: 100%;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

.sidebar-inner {
  height: 100%;
}

@media (max-width: 959px) {
  .resume-sidebar {
    border-radius: 15px 15px 0 0;
  }
}
</style>
