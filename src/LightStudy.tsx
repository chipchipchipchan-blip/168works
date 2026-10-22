import { assetUrl } from './assetUrl';

// 植物影の画像。画像の差し替え先はこの定数だけです。
export const botanicalLightImage = assetUrl('/images/botanical-light-original.png');

export function LineFlower({ className = '' }: { className?: string }) {
  return <svg className={`line-flower ${className}`} viewBox="0 0 90 140" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M39 136C44 111 33 92 42 65C45 54 46 43 46 34M40 104C24 100 22 88 20 83C32 87 39 94 40 104ZM41 84C53 81 61 73 63 67C49 70 44 76 41 84Z"/>
      <path d="M46 34C38 31 32 23 36 20C40 17 45 24 47 28C44 19 45 10 50 11C55 12 51 23 49 28C56 21 64 20 65 25C66 29 57 32 51 32C60 35 65 42 61 45C57 49 50 39 48 35C49 45 46 51 42 48C38 46 42 38 46 34Z"/>
    </g>
  </svg>;
}

export function AboutLight() {
  return <div className="about-light" aria-hidden="true">
    <img className="about-light-photo reveal" src={botanicalLightImage} alt="" loading="lazy" width="1536" height="1024"/>
    <img
      className="about-line-flower"
      src={assetUrl('/images/flower_B_trace.svg')}
      alt=""
      width="520"
      height="1350"
      style={{ objectFit: 'contain' }}
    />
    <span className="light-caption">LIGHT, SHADOW & A LITTLE INSPIRATION</span>
  </div>;
}
