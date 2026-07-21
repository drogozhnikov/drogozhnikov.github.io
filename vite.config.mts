import VueRouter from 'unplugin-vue-router/vite'
import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import Fonts from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',

    plugins: [
        VueRouter(),
        Vue({
            template: { transformAssetUrls },
        }),
        Vuetify({
            autoImport: true,
            styles: {
                configFile: 'src/styles/settings.scss',
            },
        }),
        Fonts({
            fontsource: {
                families: [
                    {
                        name: 'Roboto',
                        weights: [100, 300, 400, 500, 700, 900],
                        styles: ['normal', 'italic'],
                    },
                ],
            },
        }),
    ],
    define: { 'process.env': {} },
    css: {
        preprocessorOptions: {
            scss: {
                // Пути поиска для Sass (Modern API)
                loadPaths: [fileURLToPath(new URL('./src', import.meta.url))],
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