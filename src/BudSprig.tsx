type BudSprigProps = {
  className?: string;
  color?: string;
};

// サイト専用のつぼみモチーフ。装飾として再利用できる、塗りのない線画です。
export default function BudSprig({ className = '', color = '#D8BC67' }: BudSprigProps) {
  return <svg
    className={className}
    viewBox="0 0 64 144"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <g stroke={color} strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
      {/* B案の軽やかさをもとに、新しく描いた細い主茎と3本の枝。 */}
      <path d="M33 136C34 118 29 101 29 83C29 62 34 40 32 17"/>
      <path d="M29 83C29 69 18 62 15 48M30 68C31 56 45 53 48 42M32 37C33 30 39 28 41 23"/>
      {/* 高さと向きをずらした4つの丸いつぼみ。すべて輪郭線のみ。 */}
      <path d="M32 17C29 17 28 14 29 11C30 8 33 8 35 10C37 13 35 17 32 17Z"/>
      <path d="M15 48C12 49 9 47 10 44C10 41 13 40 15 42C18 43 18 47 15 48Z"/>
      <path d="M48 42C45 42 44 39 46 37C47 34 51 34 52 37C53 39 51 42 48 42Z"/>
      <path d="M41 23C38 23 37 21 38 18C39 16 42 16 44 18C45 20 44 23 41 23Z"/>
      {/* 葉は1枚。茎に沿う丸みのある小さな輪郭に留めます。 */}
      <path d="M29 96C30 87 38 78 43 77C44 85 37 94 29 96Z"/>
    </g>
  </svg>;
}
