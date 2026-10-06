// アプリの定義。vite.config.ts からも読み込むので、ほかのファイルを import しない（画面からは appConfig.ts の app を使う）
export const APP_INFO = {
  // 保存のキーの接頭辞。公開したあとに変えると、保存済みの設定が読めなくなる
  id: 'pevenmui-template',
  name: 'Template App',
  description: 'A starter app built with PevenMUI',
  author: 'Your Name',
  repository: 'https://github.com/PTOM76/pevenmui-template-app',
  // OGP の絶対 URL（ビルド時は SITE_URL が優先）
  site: 'https://example.com/',
  // <html lang> と og:locale
  lang: 'en_us',
}
