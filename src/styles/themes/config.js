import * as defaultTheme from "@/styles/themes/default/default.js";

import * as winterTheme from "@/styles/themes/winter/winter.js";
import * as springTheme from "@/styles/themes/spring/spring.js";
import * as summerTheme from "@/styles/themes/summer/summer.js";
import * as autumnTheme from "@/styles/themes/autumn/autumn.js";

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
  } else {
    const currentDate = new Date();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    const currentMD = currentMonth + currentDay;
    for (const [key, season] of INTERVALS.entries()) {
      const startMD = season.start;
      const endMD = season.end;
      if (startMD <= endMD) {
        if (currentMD >= startMD && currentMD <= endMD) {
          currentTheme = key
        }
      } else if (currentMD >= startMD || currentMD <= endMD) {
        currentTheme = key
      }
    }
  }
  fillImages()
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

export const fillImages = () => {
  const config = INTERVALS.get(currentTheme)
  const themeFolderPath = `${import.meta.env.BASE_URL}images/themes/${currentTheme}`

  if (config.images > 0) {
    const particleImages = []
    for (let i = 1; i <= config.images; i++) {
      particleImages.push({
        src: `${themeFolderPath}/png/${currentTheme}${i}.png`
      })
    }
    config.particle.particles.shape.options.image = particleImages
  }
  config.particle.background.image = `url('${themeFolderPath}/background.svg')`
}
