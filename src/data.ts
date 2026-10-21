// このファイルの文章や配列を編集すると、サイトに反映されます。
// 画像は public/images/ に置き、image: '/images/ファイル名.jpg' を指定します。
export const profile = {
  siteName: '168works',
  siteNameReading: 'いろはワークス',
  siteSubtitle: 'iroha works — portfolio',
  name: 'とぶとり',
  tagline: '168works — Webサイト・アプリ制作',
  intro: '「好き」が原動力。\n思いついたアイデアを、Webサイトやアプリにしています。',
  about: '小さなアイデアをきっかけに、ものづくりを楽しんでいます。\n\n現在はWebサイトやアプリづくりを勉強中。\n\n使いやすさと、ちょっとした遊び心を大切に、ひとつずつ形にしています。',
  photo: '',
  tools: ['VS Code', 'Codex', 'Lovable', 'HTML / CSS', 'React'],
};
// 作品はこの配列だけで管理します。idは英数字・ハイフンで重複しない値にします。
export type Work = {
  id: string; name: string; category: string; description: string; image: string;
  subtitle?: string; productionMethod?: string; appUrl?: string;
  listDescription?: string;
  detailsPending: boolean; overview: string; background: string;
  features: string[]; tools: string[]; designNotes: string;
  screenshots: { src: string; caption: string }[];
};
export const works: Work[] = [
  {
    id: 'oshikatsu',
    name: 'OSHI WALLET',
    subtitle: '推し活のお金を、もっと楽しく管理する。',
    category: 'APPLICATION',
    description: '推し活の支出記録から月ごとの予算管理、目標貯金まで。好きなことを楽しみながら、お金の管理ができるWebアプリです。',
    listDescription: '支出の記録も、予算管理も、推しのための貯金も。好きなことを思いきり楽しむためのWebアプリです。',
    image: '/images/oshi-wallet-portfolio.png',
    detailsPending: false,
    overview: 'OSHI WALLETは、推し活に使ったお金を記録・管理できるWebアプリです。\n\n日々の支出記録から、月ごとの予算管理、目標貯金まで。推し活に関するお金をまとめて確認できます。\n\n複数の推しの登録・管理や、好みに合わせたカラーのカスタマイズにも対応しています。',
    background: '推し活にどれくらいお金を使っているのか、ひと目でわかるようにしたい。そんな思いから、OSHI WALLETを作りました。\n\n使いすぎを防ぎながら、好きなことは思いきり楽しみたい。自分にとって使いやすく、無理なく続けられるお金の管理を目指しました。',
    features: [
      '支出記録：推し活に使ったお金を、カテゴリーごとに記録できます。',
      '予算管理：月ごとの予算を設定し、支出状況を確認できます。',
      '支出履歴：過去の支出を振り返り、何にいくら使ったかを確認できます。',
      '目標貯金：ライブやグッズ購入など、目標に向けた貯金を管理できます。',
      '推しの登録・管理：複数の推しを登録し、それぞれの支出を管理できます。',
      'カラーのカスタマイズ：背景やアイコンの色を一部変更し、自分好みの雰囲気に調整できます。',
      'アカウント機能：ログインすると、スマホとPCで同じデータを利用できます。',
    ],
    tools: ['Gemini：アイデアの整理・プロンプト作成', 'Lovable：アプリの開発・実装'],
    productionMethod: 'Geminiでアイデアや必要な機能を整理し、Lovableを使ってアプリを制作しました。\n\n実際に操作しながら修正と調整を重ね、自分にとって使いやすいアプリに仕上げました。',
    designNotes: 'アプリを開いた瞬間に、今月の支出額がひと目でわかるようにしました。\n\n使いすぎを防ぎたい人には、お金の使い方を見直すきっかけに。推し活に全力を注ぎたい人には、これまでの支出を振り返る楽しみに。\n\nお金を管理することが負担にならず、それぞれのスタイルで推し活を楽しめるよう、シンプルで見やすい画面を意識しました。',
    appUrl: 'https://oshi-diary.lovable.app/',
    screenshots: [
      { src: '/images/oshi-wallet-dashboard.png', caption: 'ダッシュボード' },
      { src: '/images/oshi-wallet-expense.png', caption: '支出記録' },
      { src: '/images/oshi-wallet-savings.png', caption: '目標貯金' },
    ],
  },
];
// 空文字の連絡先は無効表示です。設定例: mailto:hello@example.com
export const contacts = [{ label: 'メールで連絡', sub: 'EMAIL', url: '' }, { label: 'Instagram', sub: 'SNS', url: '' }, { label: 'GitHub', sub: 'CODE', url: '' }];
