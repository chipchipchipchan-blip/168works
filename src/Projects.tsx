import { useEffect, useRef, useState } from 'react';
import { works, type Work } from './data';
import { assetUrl } from './assetUrl';
import './projects.css';

type ZoomPosition = { scale: number; x: number; y: number };
type TouchPoint = { x: number; y: number };

function ZoomableScreenshot({ src, caption }: { src: string; caption: string }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [zoom, setZoom] = useState<ZoomPosition>({ scale: 1, x: 0, y: 0 });
  const zoomRef = useRef(zoom);
  const points = useRef(new Map<number, TouchPoint>());
  const gesture = useRef<{ points: TouchPoint[]; zoom: ZoomPosition } | null>(null);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);

  const update = (next: ZoomPosition) => {
    const image = imageRef.current!;
    const scale = Math.min(4, Math.max(1, next.scale));
    const maxX = image.offsetWidth * (scale - 1) / 2;
    const maxY = image.offsetHeight * (scale - 1) / 2;
    const bounded = { scale, x: Math.max(-maxX, Math.min(maxX, next.x)), y: Math.max(-maxY, Math.min(maxY, next.y)) };
    zoomRef.current = bounded;
    setZoom(bounded);
  };
  const toggle = () => update({ scale: zoomRef.current.scale > 1 ? 1 : 2, x: 0, y: 0 });
  const rebase = () => { gesture.current = { points: [...points.current.values()], zoom: { ...zoomRef.current } }; };
  const endPointer = (event: React.PointerEvent<HTMLImageElement>) => {
    if (event.type === 'pointercancel') suppressClick.current = true;
    points.current.delete(event.pointerId);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    rebase();
    setDragging(points.current.size > 0);
  };

  return <img ref={imageRef} src={assetUrl(src)} alt={caption} draggable={false} tabIndex={0} role="button"
    aria-label={`${caption}：${zoom.scale > 1 ? '元のサイズに戻す' : '2倍に拡大する'}。拡大中はドラッグ、タッチではピンチ操作ができます`}
    className={`screenshot-zoomable${zoom.scale > 1 ? ' is-zoomed' : ''}${dragging ? ' is-dragging' : ''}`}
    style={{ transform: `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.scale})` }}
    onClick={event => { event.stopPropagation(); if (!suppressClick.current) toggle(); }}
    onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); toggle(); } }}
    onPointerDown={event => {
      if (event.button !== 0) return;
      if (!points.current.size) suppressClick.current = false;
      points.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (points.current.size > 1) suppressClick.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      rebase();
      setDragging(true);
    }}
    onPointerMove={event => {
      if (!points.current.has(event.pointerId) || !gesture.current) return;
      points.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
      const current = [...points.current.values()];
      const start = gesture.current;
      if (current.length >= 2 && start.points.length >= 2) {
        const distance = (pair: TouchPoint[]) => Math.hypot(pair[1].x - pair[0].x, pair[1].y - pair[0].y);
        const midpoint = (pair: TouchPoint[]) => ({ x: (pair[0].x + pair[1].x) / 2, y: (pair[0].y + pair[1].y) / 2 });
        const before = midpoint(start.points);
        const after = midpoint(current);
        const scale = Math.min(4, Math.max(1, start.zoom.scale * distance(current) / Math.max(1, distance(start.points))));
        const rect = event.currentTarget.getBoundingClientRect();
        const center = { x: rect.left + rect.width / 2 - zoomRef.current.x, y: rect.top + rect.height / 2 - zoomRef.current.y };
        const ratio = scale / start.zoom.scale;
        update({ scale, x: after.x - center.x - (before.x - center.x - start.zoom.x) * ratio, y: after.y - center.y - (before.y - center.y - start.zoom.y) * ratio });
      } else if (current.length === 1) {
        const dx = current[0].x - start.points[0].x;
        const dy = current[0].y - start.points[0].y;
        if (Math.hypot(dx, dy) > 5) suppressClick.current = true;
        if (start.zoom.scale > 1) update({ ...start.zoom, x: start.zoom.x + dx, y: start.zoom.y + dy });
      }
    }}
    onPointerUp={endPointer} onPointerCancel={endPointer}
  />;
}

export function ProjectImage({ src, name, caption }: { src: string; name: string; caption?: string }) {
  return src ? <img className="project-image" src={assetUrl(src)} alt={caption || `${name}の制作画面`} loading="lazy"/> :
    <div className="project-placeholder"><span>PROJECT IMAGE</span><p>作品画像を準備中です</p><small>実際のアプリ画面を後から掲載します</small></div>;
}

export function WorksSection() {
  return <section className="works section projects-list" id="works" aria-labelledby="works-heading">
    <div className="section-top"><div className="works-heading-group"><p className="eyebrow">01 / SELECTED WORKS</p><h2 id="works-heading">つくったもの<span>Works</span></h2><svg className="works-sprig" viewBox="0 0 40 72" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M14 66C18 50 20 30 27 8M19 46C9 44 6 36 7 30C16 32 20 38 19 46ZM23 32C32 30 36 23 35 17C27 19 23 25 23 32ZM26 17C21 13 22 7 26 3C30 7 30 12 26 17Z"/></svg></div><p>小さなアイデアから生まれた、制作のきろく。</p></div>
    <div className="projects-grid">{works.map((work, index) => <a className="project-card" id={`project-${work.id}`} href={`#/works/${encodeURIComponent(work.id)}`} key={work.id} aria-label={`${work.name}の詳細を見る`}>
      <div className="project-cover"><ProjectImage src={work.image} name={work.name}/></div>
      <div className="project-card-copy">
      <div className="project-card-meta"><span>{work.category}</span><span>{String(index + 1).padStart(2, '0')}</span></div>
      <h3>{work.name}</h3><p className="project-summary">{work.subtitle && <>{work.subtitle}<br/></>}{work.listDescription ?? work.description}</p>
      <span className="project-view">View Project <span aria-hidden="true">↗</span></span>
      </div>
    </a>)}</div>
  </section>;
}

function ScreenshotGallery({ work }: { work: Work }) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = active !== null;
  const count = work.screenshots.length;
  const move = (direction: number) => setActive(current => current === null ? null : (current + direction + count) % count);

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current!;
    const scrollY = window.scrollY;
    const body = document.body;
    const previous = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow };
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      Object.assign(body.style, previous);
      window.scrollTo({ top: scrollY, behavior: 'instant' });
      if (triggerRef.current?.isConnected) triggerRef.current.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const shot = active === null ? null : work.screenshots[active];
  return <>
    <div className="project-screen-grid">{count ? work.screenshots.map((item, index) => <figure key={item.src}>
      <button type="button" className="screenshot-trigger" aria-label={`${item.caption}を拡大表示`} aria-haspopup="dialog" onClick={event => { triggerRef.current = event.currentTarget; setActive(index); }}><ProjectImage src={item.src} name={work.name} caption={item.caption}/></button>
      <figcaption>{item.caption}</figcaption>
    </figure>) : <div className="project-screen-empty"><ProjectImage src="" name={work.name}/><p>スクリーンショットは準備中です。</p></div>}</div>
    <dialog ref={dialogRef} className="screenshot-lightbox" aria-label={`${work.name}のスクリーンショット拡大表示`} aria-modal="true"
      onCancel={event => { event.preventDefault(); setActive(null); }}
      onClick={event => { if (event.target === event.currentTarget) setActive(null); }}
      onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1); } }}>
      <button type="button" className="screenshot-close" aria-label="拡大表示を閉じる" autoFocus onClick={() => setActive(null)}>×</button>
      <button type="button" className="screenshot-prev" aria-label="前の画像" onClick={() => move(-1)}>‹</button>
      {shot && <figure className="screenshot-enlarged"><ZoomableScreenshot key={shot.src} src={shot.src} caption={shot.caption}/><figcaption aria-live="polite" aria-atomic="true">{shot.caption}（{active! + 1} / {count}）</figcaption></figure>}
      <button type="button" className="screenshot-next" aria-label="次の画像" onClick={() => move(1)}>›</button>
    </dialog>
  </>;
}

function ProjectText({ number, english, title, children }: { number: string; english: string; title: string; children: React.ReactNode }) {
  return <section className="project-text-section"><div><p className="eyebrow">{number} / {english}</p><h2>{title}</h2></div><div className="project-text-content">{children}</div></section>;
}

export function ProjectDetail({ id }: { id: string }) {
  const work: Work | undefined = works.find(item => item.id === id);
  if (!work) return <article className="project-detail"><a className="project-back" href="#works">← WORKS一覧へ</a><h1 id="project-heading" tabIndex={-1}>作品が見つかりませんでした</h1><p>一覧から作品を選び直してください。</p></article>;
  return <article className="project-detail" aria-labelledby="project-heading">
    <a className="project-back" href="#works">← WORKS一覧へ</a>
    <div className="project-title"><p className="eyebrow">WORKS / {work.category}</p><h1 id="project-heading" tabIndex={-1}>{work.name}</h1><p>{work.subtitle || work.description}</p></div>
    <div className="project-main-image"><ProjectImage src={work.image} name={work.name}/></div>
    {work.detailsPending && <p className="project-edit-note">作品詳細は編集用の仮テキストです。実際の内容を確認後に更新します。</p>}
    <ProjectText number="01" english="OVERVIEW" title="作品概要"><p>{work.overview}</p>{work.appUrl && <a className="project-back project-app-link" href={work.appUrl} target="_blank" rel="noopener noreferrer">アプリを見る ↗</a>}</ProjectText>
    <ProjectText number="02" english="BACKGROUND" title="制作のきっかけ"><p>{work.background}</p></ProjectText>
    <ProjectText number="03" english="FEATURES" title="主な機能"><ul>{work.features.map((item, i) => <li key={i}>{item}</li>)}</ul></ProjectText>
    <ProjectText number="04" english="TOOLS" title="使用ツール"><ul>{work.tools.map((item, i) => <li key={i}>{item}</li>)}</ul></ProjectText>
    {work.productionMethod && <ProjectText number="05" english="PROCESS" title="制作方法"><p>{work.productionMethod}</p></ProjectText>}
    <ProjectText number={work.productionMethod ? '06' : '05'} english="DESIGN NOTES" title="工夫したポイント"><p>{work.designNotes}</p></ProjectText>
    <section className="project-screenshots"><p className="eyebrow">{work.productionMethod ? '07' : '06'} / SCREENS</p><h2>制作画面のスクリーンショット</h2><ScreenshotGallery key={work.id} work={work}/></section>
    <a className="project-back project-back-bottom" href="#works">← WORKS一覧に戻る</a>
  </article>;
}
