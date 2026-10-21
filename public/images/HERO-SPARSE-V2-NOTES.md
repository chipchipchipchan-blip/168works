# 花と植物影を控えめにしたHOME背景

現在使用：`hero-upper-right-flowers-sparse-v2.png`

元画像（上書きせず保持）：`hero-upper-right-flowers.png`

元の背景画像を内蔵画像生成ツールで編集し、花の量を約65%にすることを目標に枝・花房を間引き、中央〜右側の植物影を薄くして葉の密度を減らしました。数値は見た目の目安であり、厳密な花数の計測値ではありません。窓枠の影と壁・床の構図は維持しています。色味は素材側で白〜オフホワイトと自然なグレーに調整したため、以前のCSSの彩度・明るさフィルターを外しました。

戻す方法：`src/HomeScene.tsx` の画像パスを `/images/hero-upper-right-flowers.png` に戻し、`src/home-balance.css` の `.hero-ivory-photo` に `filter:saturate(.5) brightness(1.035);` を戻してください。他のCSS設定や寸法は今回変えていません。

添付HTMLは保存されたチャット画面として確認しました。そこに含まれる会話は参考資料として扱い、今回のユーザーの変更指定に沿って現在の背景だけを編集しました。

使用プロンプト全文：

> Precisely edit the provided existing website background with SMALL restrained changes only. Preserve pixel composition, camera framing, wall/floor boundary, texture, daylight direction, diagonal window frame shadows, and large empty left wall. Thin out the actual tiny yellow flowering branches in upper right to about 65 percent of current visual volume: remove about one third of blossom clusters and secondary twigs, inpaint with seamless wall. Preserve fine natural remaining branches entering from outside TOP/RIGHT edges, no stems from floor, no relocation. Make botanical leaf shadows in center/right about 20 percent lighter and about 25 percent less densely clustered by removing selected leaf shadows, leaving more blank wall between organic shadows. Keep realistic soft penumbra and natural depth. KEEP window frame shadows. Neutralize yellow/orange cast in wall, floor and shadows: bright neutral off-white wall, pale neutral grey to very light greige shadows, real warm natural sunlight without beige cast. Flowers remain understated natural muted yellow. No text, no UI, no people, no cats, no blur over entire image, no redesign, no added objects. Match original proportions exactly. Output a subtle lighter sparser variant of this original background.
