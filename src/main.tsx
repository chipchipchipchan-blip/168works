import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { contacts, profile, works } from './data';
import { assetUrl } from './assetUrl';
import './style.css';
import HomeScene from './HomeScene';
import { AboutLight } from './LightStudy';
import './editorial.css';
import './home-balance.css';
import { ProjectDetail, WorksSection } from './Projects';
import './desktop.css';

function BrandMark({ className = '' }: { className?: string }) {
  return <span className={className} aria-hidden="true">✳</span>;
}
function Cats({ small = false }: { small?: boolean }) {
  return <img className={`cats ${small ? 'small' : ''}`} src={assetUrl('/images/contact-cats-black-left-white-right.png')} alt="" width="519" height="283" loading="lazy"/>;
}
function App() {
  const [hash, setHash] = useState(window.location.hash);
  const match = hash.match(/^#\/works\/([^/]+)$/);
  let projectId: string | null = null;
  if (match) { try { projectId = decodeURIComponent(match[1]); } catch { projectId = ''; } }
  useEffect(() => {
    const update = () => setHash(window.location.hash);
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  useEffect(() => {
    const work = works.find(item => item.id === projectId);
    document.title = projectId !== null ? `${work?.name || '作品が見つかりません'} | ${profile.siteName}` : `${profile.siteName} | Portfolio`;
    const frame = requestAnimationFrame(() => {
      if (projectId !== null) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.getElementById('project-heading')?.focus({ preventScroll: true });
      } else if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView();
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, projectId]);
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }), { threshold: .12 });
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [hash]);
  return <><a className="skip" href="#main">本文へ移動</a><header><a className="brand" href="#home"><BrandMark className="brand-flower"/><span aria-label={`${profile.siteName}（${profile.siteNameReading}）`}>{profile.siteName}</span><small>{profile.siteSubtitle}</small></a><nav aria-label="メインナビゲーション">{['HOME', 'WORKS', 'ABOUT', 'CONTACT'].map(item => <a href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}</nav></header>
  <main id="main">{projectId !== null ? <ProjectDetail id={projectId}/> : <><section className="hero" id="home"><HomeScene/><div className="hero-content"><p className="eyebrow"><span/> SMALL IDEAS, WARM EXPERIENCES</p><h1>“好き”を形にする<br/><span>Webサイトとアプリ。</span></h1><p className="intro">{profile.intro}</p><a className="button" href="#works">つくったものを見る <span>↗</span></a><div className="hero-caption">好奇心の赴くままに、制作中。</div></div><a href="#works" className="scroll-cue">SCROLL <span>↓</span></a></section>
  <WorksSection/>
  <section className="about section" id="about"><div className="about-image reveal">{profile.photo ? <img src={assetUrl(profile.photo)} alt={`${profile.name}のプロフィール写真`}/> : <AboutLight/>}</div><div className="about-copy"><p className="eyebrow">02 / ABOUT ME</p><h2>好きなことを、<br/>少しずつ、かたちに。</h2><p className="profile-name">{profile.name}<span> / {profile.tagline}</span></p>{profile.about.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph.split('\n').map((line, lineIndex) => <React.Fragment key={lineIndex}>{lineIndex > 0 && <br/>}{line}</React.Fragment>)}</p>)}<div className="tool-title">TOOLS & LEARNING</div><div className="tags">{profile.tools.map(t => <span key={t}>{t}</span>)}</div></div></section>
  <section className="contact section" id="contact"><p className="eyebrow"><BrandMark className="contact-mark"/>03 / SAY HELLO</p><h2>お話できるのを、<br className="mobile-break"/>楽しみにしています。</h2><p>制作についてのご相談や、ちょっとしたごあいさつも。<br/>どうぞお気軽にご連絡ください。</p><div className="contact-links">{contacts.map(c => c.url ? <a className="contact-link" href={c.url} key={c.label}>{c.label}<span>↗</span></a> : <button className="contact-link" disabled key={c.label}>{c.label}<span>準備中</span></button>)}</div><p className="data-note">連絡先は未設定です。設定後にリンクが有効になります。</p><div className="contact-cats"><Cats small/></div></section></>}</main><footer><a className="footer-brand" href="#home">{profile.siteName}</a><span>© {new Date().getFullYear()} {profile.siteName}</span><a href="#home">PAGE TOP ↑</a></footer>
</>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
