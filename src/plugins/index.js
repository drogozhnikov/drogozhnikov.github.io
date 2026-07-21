// Plugins
import vuetify from './vuetify'
import router from '@/router'
import moment from "moment";
import {createPinia} from 'pinia'
import {vMaska} from "maska/vue"
import VueParticles from "@tsparticles/vue3"
import {loadSlim} from "@tsparticles/slim";


export function registerPlugins(app) {
  app.use(vuetify)
    .use(router)
    .use(createPinia())
    .use(moment)
    .use(VueParticles, {
      init: async engine => {
        await loadSlim(engine);
      },
    })
  app.directive('mask', vMaska)
}
