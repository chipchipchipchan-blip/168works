# 白とグレーのHero背景

現在の画像：`hero-neutral-shadows.png`（1672 × 941）。ユーザー提供の `g:/ポートフォリオ仮画像4.png` を内蔵画像生成ツールで編集し、ヘッダー・文字・ボタンを除去した写真風背景です。実物の花・色のついた枝・猫はありません。外部URLには依存しません。

以前の背景 `hero-upper-right-flowers-sparse-v2.png` は未変更で保持しています。元に戻す場合は `src/HomeScene.tsx` の画像パスを変更してください。現在の表示位置と白い背景色、PCの画像比率は `src/home-balance.css` にあります。PCは画像全景をcontainで表示し、モバイルは右側の影をトリミングし、本文側に白を重ねています。

使用プロンプト全文：

> Clean up the provided screenshot into a photographic BACKGROUND ONLY for the website hero. Remove/crop the entire top white header (roughly 94px) including logo and navigation, leaving only wall/floor scene below it. Remove ALL headline/body/caption typography, yellow dash, black button/arrow; seamlessly inpaint corresponding wall. Preserve the supplied reference composition as exactly as possible: bright neutral WHITE wall, very subtle plaster texture, window frame soft diagonal/vertical shadows, delicate natural small flower/leaf shadows centered on right, narrow floor strip and shadows at bottom. Neutral grey shadows with NO beige brown yellow cast. Left wall bright and open for real HTML text. No actual visible plants, no flowers or branches themselves, ONLY their projected shadows. No cats, UI, letters, logos, buttons or additional decoration. Keep image clear and photographic; soften only shadow edges naturally. Preserve framing and proportions of the wall scene after removing header, light direction, white balance and shadow shapes. Do not generate a different design.
