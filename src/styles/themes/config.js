import * as defaultTheme from "@/styles/themes/default/default.js";

import * as winterTheme from "@/styles/themes/winter/winter.js";
import * as springTheme from "@/styles/themes/spring/spring.js";
import * as summerTheme from "@/styles/themes/summer/summer.js";
import * as autumnTheme from "@/styles/themes/autumn/autumn.js";

import {getActiveProfile} from "@/stores/app.js";

export const DEFAULT = "default"

export const WINTER = "winter"
export const AUTUMN = "autumn"
export const SPRING = "spring"
export const SUMMER = "summer"

export const colorThemes = {
  default: defaultTheme.VALUES,
  winter: winterTheme.VALUES,
  spring: springTheme.VALUES,
  summer: summerTheme.VALUES,
  autumn: autumnTheme.VALUES
}
export let currentTheme = DEFAULT

export let useParticles = true
export let useSmoke = true
export let useEyes = true

export const INTERVALS = new Map([
  [DEFAULT, {
    particle: defaultTheme.VALUES.particle,
    cursor: defaultTheme.VALUES.cursor,
    start: '0102',
    end: '0101',
    images: 0
  }],
  [WINTER, {
    particle: winterTheme.VALUES.particle,
    cursor: winterTheme.VALUES.cursor,
    start: '1201',
    end: '0301',
    images: 9
  }],
  [SPRING, {
    particle: springTheme.VALUES.particle,
    cursor: springTheme.VALUES.cursor,
    start: '0302',
    end: '0531',
    images: 3
  }],
  [SUMMER, {
    particle: summerTheme.VALUES.particle,
    cursor: summerTheme.VALUES.cursor,
    start: '0601',
    end: '0831',
    images: 3
  }],
  [AUTUMN, {
    particle: autumnTheme.VALUES.particle,
    cursor: autumnTheme.VALUES.cursor,
    start: '0901',
    end: '1130',
    images: 5
  }],
]);

export const initInterval = () => {
  if (!useParticles) {
    currentTheme = DEFAULT
  }else{
    let currentDate = new Date();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    const currentMD = currentMonth + currentDay;
    for (const [key, season] of INTERVALS.entries()) {
      const startMD = season.start;
      const endMD = season.end;
      // Обычные сезоны
      if (startMD <= endMD) {
        if (currentMD >= startMD && currentMD <= endMD) {
          currentTheme = key
        }
        // Сезон, переходящий через конец года
      } else {
        if (currentMD >= startMD || currentMD <= endMD) {
          currentTheme = key
        }
      }
    }
  }
  console.log(currentTheme)
  fillConfig()
}

export const getCurrentTheme = () => {
  return INTERVALS.get(currentTheme)
}

export const getParticle = () => {
  return INTERVALS.get(currentTheme).particle
}

export const getCursorHue = () => {
  return INTERVALS.get(currentTheme).cursor
}

export const fillConfig = () => {
  let config = INTERVALS.get(currentTheme)
  fillImages(config)
}

export const fillImages = () => {
  let config = INTERVALS.get(currentTheme)
  let profile = getActiveProfile()
  let themeFolderPath = profile.baseUrl[0] + profile.imagesUrl + currentTheme

  let particleImages = []
  if (config.images > 0) {
    for (let i = 1; i <= config.images; i++) {
      particleImages.push({
        src: themeFolderPath + "/png/" + currentTheme + i + '.png'
      })
    }
    config.particle.particles.shape.options.image = particleImages
  }
  config.particle.background.image = "url('" + themeFolderPath + "/background.svg')"
  // config.particle.background.image = "url('" +
  //   "https://i.pinimg.com/1200x/44/a4/a4/44a4a44fa4c40746a2a8b982155e06f4.jpg" +
  //   "')"
}
