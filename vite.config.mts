import VueRouter from 'unplugin-vue-router/vite';
import {fileURLToPath, URL} from 'node:url'
import Vue from '@vitejs/plugin-vue'
import Fonts from 'unplugin-fonts/vite'
import {defineConfig} from 'vite'
import Vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [VueRouter(), Vue({
        template: {transformAssetUrls},
    }), // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
        Vuetify({
            autoImport: true,
            styles: {
                configFile: 'src/styles/settings.scss',
            },
        }), Fonts({
            fontsource: {
                families: [
                    {
                        name: 'Roboto',
                        weights: [100, 300, 400, 500, 700, 900],
                        styles: ['normal', 'italic'],
                    },
                ],
            },
        })],
    define: {'process.env': {}},
    css: {
        preprocessorOptions: {
            scss: {
                // Указываем SASS, где искать файлы для @use и @import
                includePaths: [fileURLToPath(new URL('./src', import.meta.url))],
                // Если используешь новый компилятор (рекомендуется)
                api: 'modern-compiler'
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
        extensions: [
            '.js',
            '.json',
            '.jsx',
            '.mjs',
            '.ts',
            '.tsx',
            '.vue',
            '.scss',
        ],
    },
    server: {
        host: '0.0.0.0',
        port: 23000,
    },
})