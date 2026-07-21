export const APP_VERSION = '0.0.1'

export const PROD = "prod"
export const DEV = "dev"
export const LIME = "lime"
export const DEFAULT = "default"

// let ActiveProfile = PROD
// let ActiveProfile = LIME
let ActiveProfile = DEV

export const PROFILES = new Map([
  [PROD, {
    baseUrl: ["https://drogozhnikov.github.io/"],
    imagesUrl: "images/themes/",
    isDebug: false
  }],
  [DEV, {
    baseUrl: ["http://192.168.100.8:23000/"],
    gatewayUrl: "http://192.168.100.8:8080/api/",
    imagesUrl: "public/images/themes/",
    isDebug: true
  }],
])

export const defineProfile = () => {
  const currentUrl = window.location.href;
  for (const [profileKey, profileData] of PROFILES) {
    if (profileData.baseUrl.some(url => {
      return currentUrl.startsWith(url)
    })) {
      ActiveProfile = profileKey;
      break;
    }
  }
}

export const getActiveProfile = () => {
  return PROFILES.get(ActiveProfile)
}

export const getGatewayUrl = () => {
  return PROFILES.get(ActiveProfile).gatewayUrl
}

export const getWSUrl = () => {
  return PROFILES.get(ActiveProfile).wsUrl
}

export const isDebug = () => {
  return PROFILES.get(ActiveProfile).isDebug
}

export const getAppVersion =() =>{
  return `Version: ${APP_VERSION}-${ActiveProfile}`
}
