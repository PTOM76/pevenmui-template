# PevenMUI Template App

[PevenMUI](https://github.com/PTOM76/pevenmui) を使ったアプリのひな形。PC ではデスクトップアプリ、スマホでは Android のアプリに近い操作感になる。

含まれるもの:

- メニューバー（PC）と ⋮ メニュー（スマホ）、PC のステータスバー
- 設定画面（言語、テーマ、画面の大きさ）。設定は localStorage に保存する
- 多言語化（英語と日本語）
- 「このアプリについて」とライセンスの一覧
- ビルド時に、名前、言語、版を index.html と version.json に入れる

## 始め方

```sh
git clone https://github.com/PTOM76/pevenmui-template-app myapp
cd myapp
git submodule add https://github.com/PTOM76/pevenmui.git pevenmui
npm install
npm run dev
```

PevenMUI はソースのまま読み込む。場所は `PEVENMUI_PATH`、親のフォルダー（PevenMUI の中の `template-app/` として開発するとき）、`./pevenmui` の順に探す。

## 最初に変える所

| ファイル | 内容 |
| --- | --- |
| `src/appInfo.ts` | アプリの id、名前、説明、作者、URL、既定の言語。id は保存のキーの接頭辞になるので、公開したあとは変えない |
| `package.json` | `name` と `version`（版は「このアプリについて」に表示される） |
| `public/icon.svg` | アイコン |
| `src/lang/*.json` | 訳文。キーは `en_us.json` が正 |
| `src/App.tsx` | 画面 |

言語を足すときは `src/lang/` に JSON（例: `fr_fr.json`）を置き、`src/i18n.ts` の import と `messages` に足す。設定の言語の選択肢には自動で並ぶ。

## License

このテンプレートは [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)（パブリックドメイン）。作ったアプリのライセンスは自由に決めてよい。
依存しているライブラリ（PevenMUI、React、MUI、Font Awesome など）は、それぞれのライセンスに従う。
