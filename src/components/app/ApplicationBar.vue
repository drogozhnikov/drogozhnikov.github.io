<template>
  <v-app-bar class="glass layer-2-styles " height="50">

    <v-app-bar-nav-icon
      icon="$MenuIcon"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>

    <v-app-bar-title>
      <v-img width="200" src="@/assets/icons/svg/main-logo.svg"/>
    </v-app-bar-title>

    <eyes v-if="useEyes()"/>
    <!--    <v-app-bar-nav-icon size="50">-->
    <!--      <toggle-theme-btn></toggle-theme-btn>-->
    <!--    </v-app-bar-nav-icon>-->
    <!--<date-time></date-time>-->
    <user-menu-avatar></user-menu-avatar>

  </v-app-bar>

  <v-navigation-drawer
      class="glass layer-2-styles "
      v-model="drawer">
    <navigation-bar/>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block @click="test">Logout</v-btn>
      </div>
    </template>
  </v-navigation-drawer>

</template>

<script>
import ToggleThemeBtn from "@/components/app/ui/ToggleThemeBtn.vue";
import NavigationBar from "@/components/app/navigation/NavigationBar.vue";
import UserMenuAvatar from "@/components/app/ui/UserMenuAvatar.vue";
import Eyes from "@/components/tests/Eyes.vue";
import {useEyes} from "@/styles/themes/config.js";
import {useExcStore} from "@/components/app/exception/js/exceptionStore.js";

export default {
  name: "ApplicationBar",
  methods: {
    useExcStore,
    useEyes() {
      return useEyes
    },
    test(){
      useExcStore().addInfo("test")
    }
  },
  components: {Eyes, UserMenuAvatar, NavigationBar, ToggleThemeBtn},
  data() {
    return {
      drawer: true
    }
  }
}
</script>

<style lang="sass" scoped>
@use '@/styles/main'
@use '@/styles/effects/glass'
@use '@/styles/variables' as var

.v-app-bar
  margin: 0 auto

.layer-2-styles
  border-radius: 0 !important
  border: none !important


</style>
