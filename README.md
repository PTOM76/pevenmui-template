# PevenMUI Template App
PevenMUI Template Appは、[PevenMUI](https://github.com/PTOM76/pevenmui) を使ったWebアプリのひな形である。

## できること
| 分類 | 機能 |
| --- | --- |
| 画面 | メニューバー（PC）、⋮ メニュー（スマホ）、ステータスバー（PC） |
| 設定 | 言語、テーマ、画面の大きさ。localStorage に保存 |
| 言語 | 英語、日本語 |
| その他 | このアプリについて、ライセンスの一覧、ビルド時に名前と版を index.html と version.json へ反映 |

## 技術スタック
| 項目 | 内容 |
| --- | --- |
| 画面 | React + TypeScript + MUI（[PevenMUI](https://github.com/PTOM76/pevenmui)、Vite） |

## セットアップ
```bash
git clone https://github.com/PTOM76/pevenmui-template-app.git myapp
cd myapp
git submodule add https://github.com/PTOM76/pevenmui.git pevenmui
npm install
npm run dev
```

`pevenmui/` は submodule。ソースのまま読み込む。
場所は `PEVENMUI_PATH`、親のフォルダー（PevenMUI の中の `template-app/` として開発するとき）、`./pevenmui` の順に探す。

## コードの場所
- 画面: `src/`
  - 組み立ては `src/App.tsx`、設定画面は `src/SettingsDialog.tsx`
  - アプリの定義（id、名前、URL、既定の言語）: `src/appInfo.ts`
  - 設定: `src/settings.ts`
  - 言語ファイル: `src/lang/`（キーは `en_us.json` が正。言語を追加するときは `src/i18n.ts` にも追加する）
- アイコン: `public/icon.svg`

`src/appInfo.ts` の id は保存のキーの接頭辞になるため、公開したあとは変更しない。

## License
This template is dedicated to the public domain under CC0 1.0.

Third-party software:
- PevenMUI、React、MUI — MIT
- Font Awesome Free — CC BY 4.0 / MIT
- Roboto — OFL-1.1
