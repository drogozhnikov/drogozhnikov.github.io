import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import "@fontsource/montserrat";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/400-italic.css";
import "@fontsource/montserrat/700.css";

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import {aliases, mdi} from "vuetify/lib/iconsets/mdi";

import * as config from "@/styles/themes/config"
import {app_icons} from "@/styles/icons/icons.js"
import '@/styles/settings.scss'

const aliasesCustom = {
  ...aliases, ...app_icons
}

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...aliasesCustom
    },
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: defineTheme(),
    themes: {
      ...config.colorThemes,
      light: {
        dark: false,
        colors: {
          background: '#FFFFFF',
          surface: '#FFFFFF',
          primary: '#00ACC1',
          secondary: '#546E7A',
          error: '#E53935',
          info: '#0288D1',
          success: '#43A047',
          warning: '#FB8C00',
          hover: '#EEEEEE',
          icons: '#424242',
          text: '#212121',
          copy: '#FFC107',
          descr: '#00BCD4',
          update: '#4CAF50',
        },
      },
    },
  },
  styles: {
    configFile: '@/styles/settings.scss',
  },
})

export function defineTheme() {
  config.initInterval()
  return config.currentTheme
}
