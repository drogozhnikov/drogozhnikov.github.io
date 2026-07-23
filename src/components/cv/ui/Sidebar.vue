<template>
  <v-sheet class="resume-sidebar pa-6 text-white" elevation="0">

    <Avatar :src="avatarSrc" />

    <Personal :title="labels?.personal || 'PERSONAL'" :items="personal" />
    <v-divider class="border-opacity-25 mb-6" />

    <Contacts :title="labels?.contact || 'CONTACT'" :contacts="contacts" />
    <v-divider class="border-opacity-25 mb-6" />

    <ProgressList :title="labels?.skills || 'SKILLS'" :items="skills" />
    <v-divider class="border-opacity-25 mb-6" />

    <ProgressList :title="labels?.software || 'SOFTWARE'" :items="software" />
    <v-divider class="border-opacity-25 mb-6" />

    <Hobbies :title="labels?.hobbies || 'HOBBIES'" :hobbies="hobbies" />
  </v-sheet>
</template>

<script setup>
import Avatar from "@/components/cv/ui/sidebar/Avatar.vue";
import Contacts from "@/components/cv/ui/sidebar/Contacts.vue";
import Personal from "@/components/cv/ui/sidebar/Personal.vue";
import ProgressList from "@/components/cv/ui/sidebar/ProgressList.vue";
import Hobbies from "@/components/cv/ui/sidebar/Hobbies.vue";

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
</style>