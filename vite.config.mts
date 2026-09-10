import Vue from '@vitejs/plugin-vue'
import Fonts from 'unplugin-fonts/vite'
import { copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

function githubPagesSpa() {
    return {
        name: 'github-pages-spa',
        closeBundle() {
            const dist = resolve(rootDir, 'dist')
            const index = resolve(dist, 'index.html')
            mkdirSync(resolve(dist, 'preview'), { recursive: true })
            copyFileSync(index, resolve(dist, '404.html'))
            copyFileSync(index, resolve(dist, 'preview/index.html'))
        },
    }
}

export default defineConfig({
    base: '/',

    plugins: [
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
        githubPagesSpa(),
    ],
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
