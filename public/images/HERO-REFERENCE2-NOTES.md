# 参考画像2に合わせたHero

現在の背景：`hero-upper-right-flowers.png`（1672 × 941）。ユーザー提供の `g:/ポートフォリオ仮画像2.png` を内蔵画像生成ツールで編集しました。元画像は変更していません。

ヘッダーを背景から除き、文字・ボタン・SCROLLなどの描き込みを除去しています。右上から入る花枝、自然光、壁と床の影を維持するよう編集した画像です。サイトの文字や操作は既存のHTMLを使用します。画像はpublic内に保存し、外部配信には依存しません。

表示画像：`src/HomeScene.tsx`。表示位置・文字側の明るさ・モバイル調整：`src/home-balance.css`。

使用プロンプト全文：

> Edit this provided screenshot into a clean photographic hero BACKGROUND with no user interface. First exclude the entire white header/nav strip at top (roughly top 100px); output ONLY the scene below the header as a landscape image. Preserve the scene as precisely as possible: white ivory plaster wall and narrow floor at bottom, warm natural sunlight, soft diagonal window shadows and real delicate botanical shadows on center right. Preserve the actual tiny yellow flowering branches entering FROM OUTSIDE THE TOP AND RIGHT EDGES at UPPER RIGHT, connected to off-frame branches. Flowers only in upper-right corner/upper half, NOT standing from bottom; keep lower right empty of actual flowers, only shadows. Preserve same colors, natural photographic detail, realistic sharp flowers and softly defocused shadows, do not globally blur. REMOVE every letter of all text, eyebrow label and yellow dash, Japanese headline/body/caption, black button with arrow, SCROLL label and vertical line. Seamlessly inpaint wall/floor where text/UI was. No header, logo, nav, lettering, lines, buttons, UI, cats or additional objects. Do not redesign the composition. The left wall must be blank for actual HTML typography.
