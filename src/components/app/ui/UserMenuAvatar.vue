<template>
  <div class="menu">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-list-item
          class="center"
          v-bind="props"
          :title="getTitle"
          :subtitle="getSubtitile"
        >
          <template v-slot:prepend>
            <v-avatar>
              <strong>{{ getInitials }}</strong>
            </v-avatar>
          </template>
        </v-list-item>
      </template>

      <v-container>
        <v-list color="red">
          <v-list-item
            rounded="md"
            v-for="(item, index) in menuItems"
            :key="index"
            :value="index"
            :title="item.title"
            :prepend-icon="item.icon"
            @click="route(item)">
          </v-list-item>
        </v-list>
      </v-container>
    </v-menu>
  </div>
</template>

<script>
import router from "@/router/index.js";
import {cleanUserData, getAuthUser} from "@/stores/user.js";

export default {
  name: "UserMenuAvatar",
  data() {
    return {
      menuItems: [
        {title: 'Профиль', icon: '$AccountProfileIcon', route: "/home/profile"},
        {title: 'Настройки', icon: '$AccountSettingsIcon', route: "/home/settings"},
        {title: 'Выйти', icon: '$AccountLogoutIcon', route: "/"},
      ],
    }
  },
  methods: {
    route(item) {
      switch (item.title) {
        case "Logout": {
          cleanUserData()
        }
      }
      router.push(item.route)
    },
  },
  computed: {
    getInitials() {
      let initials = getAuthUser().fullName.split(" ")
      return initials[0][0] + initials[1][0]
    },
    getTitle() {
      return getAuthUser().fullName
    },
    getSubtitile() {
      return getAuthUser().role.title
    }
  }
}
</script>

<style lang="sass" scoped>
@use '@/styles/main'
@use '@/styles/variables' as var

.menu
  width: 300px
  text-align: center

.v-list-item
  border-radius: 20px

.v-list
  background-color: var.$surface07
  backdrop-filter: blur(15px)
  border-radius: 0px 0px 20px 20px

.center
  margin-right: 10px

.v-container
  padding: 0


</style>
