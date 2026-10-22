import './home.css';
import { assetUrl } from './assetUrl';

// Hero専用の背景。Aboutで使用する画像や装飾とは独立しています。
export default function HomeScene() {
  return <div className="home-scene" aria-hidden="true">
    <img
      className="hero-ivory-photo reveal"
      src={assetUrl('/images/hero-soft-shadows.png')}
      alt=""
      width="1672"
      height="941"
      fetchPriority="high"
    />
  </div>;
}
