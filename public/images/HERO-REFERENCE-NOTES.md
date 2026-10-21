# 現在のHero背景

ファイル：`hero-reference-clean.png`（1670 × 941）

ユーザー提供の `g:/ポートフォリオ仮画像.png` を内蔵画像生成ツールで編集し、画像内の文字、黄色い短線、黒いボタン、矢印、SCROLL表記を除去しました。元画像は変更していません。植物、壁、床、光、影の構図をできるだけ維持した編集画像です。外部URLには依存しません。

表示先は `src/HomeScene.tsx`、サイズやモバイル表示の調整は `src/home-balance.css` です。Webサイトの文章とボタンは既存HTMLを使用しています。

使用プロンプト全文：

> Edit the supplied portfolio reference image into a clean website BACKGROUND. Preserve the original photographic scene as closely as possible: same framing and aspect ratio, warm ivory white wall texture, floor at bottom, actual delicate tiny yellow flowers down the extreme right edge, botanical shadows on center right, soft diagonal window shadows, exact warm natural light and exposure. ONLY REMOVE ALL typography, ALL lettering, the orange short line near top left, the entire black rectangular button and its arrow, and bottom SCROLL label and its vertical line. Inpaint those locations with plausible seamless continuation of the wall/floor and existing illumination. Left side should be empty wall where real HTML text will be overlaid. Do not add anything. No text anywhere, no buttons, no UI, no cats, no new flowers, no additional decoration. Preserve flower arrangement, shadow composition and realism. This is an image cleanup edit, not a redesign. Save image and return local path.
