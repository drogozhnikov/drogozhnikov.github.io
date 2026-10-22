import * as defaultTheme from "@/styles/themes/default/colors.js";
import defaultSakura from "@/styles/themes/default/sakura.json";

import * as winterTheme from "@/styles/themes/winter/colors.js";
import winterSakura from "@/styles/themes/winter/sakura.json";

import * as springTheme from "@/styles/themes/spring/colors.js";
import springSakura from "@/styles/themes/spring/sakura.json";

import * as summerTheme from "@/styles/themes/summer/colors.js";
import summerSakura from "@/styles/themes/summer/sakura.json";

import * as autumnTheme from "@/styles/themes/autumn/colors.js";
import autumnSakura from "@/styles/themes/autumn/sakura.json";

export const DEFAULT = "default"

export const WINTER = "winter"
export const AUTUMN = "autumn"
export const SPRING = "spring"
export const SUMMER = "summer"

export const colorThemes = {
  default: defaultTheme.colors,
  winter: winterTheme.colors,
  spring: springTheme.colors,
  summer: summerTheme.colors,
  autumn: autumnTheme.colors
}
export let currentTheme = DEFAULT

export const useSmoke = true

export const INTERVALS = new Map([
  [DEFAULT, {
    cursor: defaultTheme.cursor,
    sakura: defaultSakura,
    start: '0102',
    end: '0101',
  }],
  [WINTER, {
    cursor: winterTheme.cursor,
    sakura: winterSakura,
    start: '1201',
    end: '0301',
  }],
  [SPRING, {
    cursor: springTheme.cursor,
    sakura: springSakura,
    start: '0302',
    end: '0531',
  }],
  [SUMMER, {
    cursor: summerTheme.cursor,
    sakura: summerSakura,
    start: '0601',
    end: '0831',
  }],
  [AUTUMN, {
    cursor: autumnTheme.cursor,
    sakura: autumnSakura,
    start: '0901',
    end: '1130',
  }],
]);

export const initInterval = () => {
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

export const getCurrentTheme = () => {
  return INTERVALS.get(currentTheme)
}

export const getCursorHue = () => {
  return INTERVALS.get(currentTheme).cursor
}

export const getSakura = () => {
  return INTERVALS.get(currentTheme).sakura
}
