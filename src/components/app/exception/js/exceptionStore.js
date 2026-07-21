import {defineStore} from 'pinia'
import {ref} from "vue";

export const INFO = "INFO"
export const SUCCESS = "SUCCESS"
export const WARNING = "WARNING"
export const EXCEPTION = "EXCEPTION"
export const ERROR = "ERROR"

export const MESSAGE_TYPES = new Map([
    [INFO, {
        color: 'info',
        prependIcon: '$info',
        timeout: 5000,
        timer: 'bottom',
        reverseTimer: true,
    }],
    [SUCCESS, {
        color: 'success',
        prependIcon: '$success',
        timeout: 2000,
        timer: 'bottom',
        reverseTimer: true,
    }],
    [WARNING, {
        color: 'warning',
        prependIcon: '$warning',
        timeout: 4000,
        timer: 'bottom',
        reverseTimer: true,
    }],
    [EXCEPTION, {
        color: 'error',
        prependIcon: '$error',
        timeout: 5000,
        timer: 'bottom',
        reverseTimer: true,
    }],
    [ERROR, {
        color: 'error',
        prependIcon: '$error',
        timeout: 5000,
        timer: 'bottom',
        reverseTimer: true,
    }],
])

export const useExcStore = defineStore('exception', {
    state: () => ({
        isDebug: true,
        queue: ref([]),
    }),
    actions: {

        addInfo(value){
            this.queue.push({
                text: `Info: ${value}`,
                ...MESSAGE_TYPES.get(INFO)
            })
        },

        addSuccess() {
            this.queue.push({
                text: `Success`,
                ...MESSAGE_TYPES.get(SUCCESS)
            })
        },

        addWarning(message) {
            this.queue.push({
                text: `Warning: ${message}`,
                ...MESSAGE_TYPES.get(WARNING)
            })
        },

        addException(code, title, message) {
            this.queue.push({
                title: `Exception: ${code} ${title}`,
                text: message,
                ...MESSAGE_TYPES.get(EXCEPTION)
            })
        },

        addError(code, title, message) {
            this.queue.push({
                title: `Error: ${code} ${title}`,
                text: message,
                ...MESSAGE_TYPES.get(ERROR)
            })
        },
    },
    getters: {}
})
