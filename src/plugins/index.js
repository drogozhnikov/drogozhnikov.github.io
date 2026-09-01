import vuetify from './vuetify'
import router from '@/router'
import VueParticles from "@tsparticles/vue3"
import {loadSlim} from "@tsparticles/slim";

export function registerPlugins(app) {
  app.use(vuetify)
    .use(router)
    .use(VueParticles, {
      init: async engine => {
        await loadSlim(engine);
      },
    })
}
