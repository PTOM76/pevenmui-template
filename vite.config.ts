import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import pkg from './package.json' with { type: 'json' }
import { APP_INFO } from './src/appInfo.ts'

const root = dirname(fileURLToPath(import.meta.url))

/**
 * PevenMUI の場所。PEVENMUI_PATH を指定するか、pevenmui の中の template-app なら親、
 * テンプレートから作ったアプリなら自分の submodule（./pevenmui）
 */
const pevenmui = process.env.PEVENMUI_PATH ?? (existsSync(resolve(root, '../src/index.ts')) ? resolve(root, '..') : resolve(root, 'pevenmui'))
// 場所が決まるのは実行時なので、動的に読み込む（Node が .ts の型を取り除いて読む）
const { pevenApp }: typeof import('../src/vite.ts') = await import(pathToFileURL(resolve(pevenmui, 'src/vite.ts')).href)

export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  resolve: {
    alias: [
      { find: /^pevenmui$/, replacement: resolve(pevenmui, 'src/index.ts') },
      { find: /^pevenmui\/web$/, replacement: resolve(pevenmui, 'src/web/index.ts') },
    ],
    // 外にある pevenmui から読み込む React、MUI も、このアプリと同じものにする（2 つになると動かない）
    dedupe: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled', '@fortawesome/react-fontawesome'],
  },
  // 開発サーバーで配ってよい場所（pevenmui の中で開発するときは、上の階の node_modules にフォントなどがある）
  server: { fs: { allow: [root, pevenmui, resolve(pevenmui, '..')] } },
  // 版（__APP_VERSION__、__APP_COMMIT__、version.json）と、index.html の名前、言語、配信先の URL
  plugins: [react(), pevenApp(APP_INFO, { version: pkg.version, root })],
})
