"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

export interface CardItem {
  imgUrl: string;
  alt?: string;
  linkUrl?: string;
}

interface SocialCardsProps {
  cards: CardItem[];
}

const FAN_POSITIONS = [
  { rot: -8, scale: 0.85, y: 0, zIndex: 5 },
  { rot: 0,  scale: 1.15, y: 0, zIndex: 10 },
  { rot: 8,  scale: 0.85, y: 0, zIndex: 5 },
];

function getResponsiveCardWidth(width: number) {
  if (width < 640) return 80;
  if (width < 1024) return 65;
  return 50;
}

function getXOffset(width: number, slot: number) {
  if (slot === 1) return 0;
  const cardWidth = getResponsiveCardWidth(width);
  const offset = 50 + 0.4 * cardWidth;
  return slot === 0 ? -offset : offset;
}

const ARROW_CLASSES =
  "relative flex items-center justify-center rounded-full border-[1.5px] border-[var(--border-strong)] bg-[var(--bg-card)] backdrop-blur-[16px] text-[var(--fg)] opacity-70 cursor-pointer shrink-0 z-30 outline-none shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:opacity-100 hover:border-[var(--gold-border)] active:opacity-60 transition-all duration-300";

/* ============================================================
   MOBILE SWIPE SLIDER — pointer-events based, no scroll
   Infinite circular loop via index arithmetic only.
   No scrollLeft manipulation — works perfectly on iOS & Android.
   ============================================================ */
function MobileSwipeSlider({ cards }: { cards: CardItem[] }) {
  const N = cards.length;
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [showHint, setShowHint] = useState(true);

  // Swipe gesture tracking
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef(false);
  const dragDeltaX = useRef(0);

  const prev = ((current - 1) + N) % N;
  const next = (current + 1) % N;

  // Hide hint after 4s or first swipe
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const go = useCallback((dir: 'left' | 'right') => {
    if (animating || N <= 1) return;
    setShowHint(false);
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(prev => dir === 'right' ? (prev + 1) % N : ((prev - 1) + N) % N);
      setAnimating(false);
      setDirection(null);
    }, 320);
  }, [animating, N]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    dragDeltaX.current = 0;
    isDragging.current = true;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    // If scrolling vertically more than horizontally, let page scroll
    if (Math.abs(dy) > Math.abs(dx) + 5) {
      isDragging.current = false;
      return;
    }
    dragDeltaX.current = dx;
  };

  const onTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const dx = dragDeltaX.current;
    if (Math.abs(dx) > 44) {
      go(dx < 0 ? 'right' : 'left');
    }
    touchStartX.current = null;
    touchStartY.current = null;
    dragDeltaX.current = 0;
  };

  if (N === 0) return null;

  // Slide transform: during animation, slide current card out + next card in
  const getSlideStyle = (role: 'prev' | 'current' | 'next'): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      transition: animating ? 'transform 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.32s ease' : 'none',
      willChange: 'transform',
    };
    if (!animating) {
      if (role === 'current') return { ...base, transform: 'translateX(0)', opacity: 1 };
      return { ...base, transform: role === 'prev' ? 'translateX(-100%)' : 'translateX(100%)', opacity: 0 };
    }
    // During animation: direction === 'right' means going to next
    if (direction === 'right') {
      if (role === 'current') return { ...base, transform: 'translateX(-100%)', opacity: 0 };
      if (role === 'next')    return { ...base, transform: 'translateX(0)', opacity: 1 };
      return { ...base, transform: 'translateX(-200%)', opacity: 0 };
    } else {
      if (role === 'current') return { ...base, transform: 'translateX(100%)', opacity: 0 };
      if (role === 'prev')    return { ...base, transform: 'translateX(0)', opacity: 1 };
      return { ...base, transform: 'translateX(200%)', opacity: 0 };
    }
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* ── Image stage ── */}
      <div
        style={{
          position: 'relative',
          width: '92vw',
          maxWidth: 460,
          aspectRatio: '4/3',
          borderRadius: '1.2rem',
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.38), 0 2px 8px rgba(0,0,0,0.18)',
          border: '1px solid var(--gold-border)',
          background: 'var(--bg-card)',
          touchAction: 'pan-y',
          userSelect: 'none',
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Prev card */}
        <div style={getSlideStyle('prev')}>
          <img src={cards[prev].imgUrl} alt={cards[prev].alt || ''} draggable={false}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Current card */}
        <div style={getSlideStyle('current')}>
          <img src={cards[current].imgUrl} alt={cards[current].alt || ''} draggable={false}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Next card */}
        <div style={getSlideStyle('next')}>
          <img src={cards[next].imgUrl} alt={cards[next].alt || ''} draggable={false}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Left/right tap zones */}
        {N > 1 && (
          <>
            <button onClick={() => go('left')} aria-label="Previous" style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '30%',
              background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 10,
            }} />
            <button onClick={() => go('right')} aria-label="Next" style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: '30%',
              background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 10,
            }} />

            {/* Subtle arrow hints */}
            <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', zIndex: 11,
              width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.32)',
              backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.2)', pointerEvents: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </div>
            <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', zIndex: 11,
              width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.32)',
              backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.2)', pointerEvents: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </>
        )}
      </div>

      {/* Swipe hint */}
      {showHint && N > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12,
          animation: 'mobileHintPulse 1.8s ease-in-out infinite' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold,#c9a86a)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" />
          </svg>
          <span style={{ fontFamily: 'var(--font-sans,sans-serif)', fontSize: 10, fontWeight: 400,
            letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold,#c9a86a)', opacity: 0.75 }}>
            Swipe to explore
          </span>
        </div>
      )}

      {/* Caption + counter + pill dots */}
      <div style={{ width: '92vw', maxWidth: 460, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginTop: showHint ? 8 : 14, padding: '0 4px' }}>
        <span style={{ fontFamily: 'var(--font-serif,serif)', fontSize: 12, fontWeight: 300,
          letterSpacing: '0.06em', color: 'var(--fg)', opacity: 0.6,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '52%' }}>
          {cards[current]?.alt || `Space ${current + 1}`}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-sans,sans-serif)', fontSize: 10, fontWeight: 300,
            letterSpacing: '0.18em', color: 'var(--gold,#c9a86a)' }}>
            {String(current + 1).padStart(2,'0')} / {String(N).padStart(2,'0')}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {cards.map((_,i) => (
              <button key={i} onClick={() => { if (!animating && i !== current) { setDirection(i > current ? 'right' : 'left'); setAnimating(true); setTimeout(() => { setCurrent(i); setAnimating(false); setDirection(null); }, 320); } }}
                style={{ display: 'block', width: i === current ? 18 : 6, height: 6, borderRadius: 3,
                  background: i === current ? 'var(--gold,#c9a86a)' : 'var(--border-strong)',
                  transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }} />
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes mobileHintPulse {
          0%,100% { opacity:0.55; transform:translateX(0); }
          50% { opacity:0.9; transform:translateX(6px); }
        }
      `}} />
    </div>
  );
}

/* ============================================================
   MAIN EXPORT — mobile uses swipe slider, desktop uses GSAP fan
   ============================================================ */
export default function SocialCards({ cards }: SocialCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const hasEntered = useRef(false);
  const directionRef = useRef<"left" | "right" | null>(null);
  const prevVisible = useRef<Set<number>>(new Set());
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const totalCards = cards.length;
  const needsPagination = totalCards > 1;
  const [centerIndex, setCenterIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const getVisibleMap = useCallback((center: number) => {
    const map = new Map<number, number>();
    if (totalCards === 0) return map;
    if (totalCards === 1) { map.set(0, 1); return map; }
    if (totalCards === 2) { map.set(center, 1); map.set((center + 1) % 2, 2); return map; }
    map.set(((center - 1 + totalCards) % totalCards), 0);
    map.set(center, 1);
    map.set(((center + 1) % totalCards), 2);
    return map;
  }, [totalCards]);

  const cycle = useCallback((direction: "left" | "right") => {
    if (isAnimating.current || !needsPagination) return;
    isAnimating.current = true;
    directionRef.current = direction;
    setCenterIndex(prev =>
      direction === "right" ? (prev + 1) % totalCards : (prev - 1 + totalCards) % totalCards
    );
  }, [totalCards, needsPagination]);

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (isAnimating.current) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
    isDragging.current = true;
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging.current || dragStartX.current === null) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = dragStartX.current - clientX;
    if (Math.abs(diff) > 48) {
      cycle(diff > 0 ? "right" : "left");
      isDragging.current = false;
      dragStartX.current = null;
    }
  };

  const handleDragEnd = () => { isDragging.current = false; dragStartX.current = null; };

  /* GSAP desktop fan animation */
  useEffect(() => {
    if (isMobile) return;
    const container = containerRef.current;
    if (!container) return;
    const cardElements = Array.from(container.querySelectorAll<HTMLElement>(".fan-card"));
    if (!cardElements.length) return;

    const visibleMap = getVisibleMap(centerIndex);
    const direction = directionRef.current;
    const isFirstMount = !hasEntered.current;
    if (!hasEntered.current) hasEntered.current = true;
    const previouslyVisible = prevVisible.current;

    let doneCount = 0;
    const totalAnimating = cardElements.filter((_,i) => visibleMap.has(i) || previouslyVisible.has(i)).length;
    const onCardDone = () => { doneCount++; if (doneCount >= totalAnimating) { isAnimating.current = false; directionRef.current = null; } };
    if (totalAnimating === 0) { isAnimating.current = false; directionRef.current = null; }

    const w = window.innerWidth;
    const config = (slot: number) => FAN_POSITIONS[slot] ?? FAN_POSITIONS[1];

    cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex);
      const wasVisible = previouslyVisible.has(cardIndex);
      if (slot !== undefined) {
        const { y, rot, scale, zIndex } = config(slot);
        const targetX = getXOffset(w, slot);
        const target = { x: `${targetX}vw`, y: `${y}rem`, rotation: rot, scale, opacity: 1, zIndex };
        if (isFirstMount) {
          gsap.set(card, { x:"0vw", y:"15rem", rotation:0, scale:0.5, opacity:0 });
          gsap.to(card, { ...target, duration:1.2, ease:"elastic.out(1.05,.78)", delay:0.2+slot*0.08, onComplete:onCardDone });
        } else if (!wasVisible) {
          const enterX = direction === "right" ? 120 : -120;
          gsap.set(card, { x:`${enterX}vw`, y:0, rotation:direction==="right"?15:-15, scale:0.5, opacity:0 });
          gsap.to(card, { ...target, duration:0.6, ease:"power2.out", onComplete:onCardDone });
        } else {
          gsap.to(card, { ...target, duration:0.5, ease:"power2.out", onComplete:onCardDone });
        }
      } else if (wasVisible) {
        const exitX = direction === "right" ? -120 : 120;
        gsap.to(card, { x:`${exitX}vw`, opacity:0, scale:0.5, rotation:direction==="right"?-15:15, duration:0.4, ease:"power2.in", zIndex:0 });
      } else if (isFirstMount) {
        gsap.set(card, { opacity:0, scale:0.3, x:"0vw", y:0, zIndex:0 });
      }
    });

    prevVisible.current = new Set(visibleMap.keys());

    const visibleEntries: { el:HTMLElement; slot:number }[] = [];
    cardElements.forEach((el,i) => { const slot=visibleMap.get(i); if(slot!==undefined) visibleEntries.push({el,slot}); });
    visibleEntries.sort((a,b) => a.slot-b.slot);

    let activeSlot: number|null = null;
    let leaveTimer: NodeJS.Timeout|null = null;

    const updateHoverLayout = (hoveredSlot: number|null) => {
      const cw = window.innerWidth;
      visibleEntries.forEach(({el,slot}) => {
        const base = config(slot);
        let tx = getXOffset(cw, slot), ty = base.y, tr = base.rot, ts = base.scale, delay = 0;
        if (hoveredSlot !== null) {
          delay = Math.abs(slot-hoveredSlot)*0.02;
          if (slot===hoveredSlot) { ts*=1.05; } else { tx += slot<hoveredSlot ? -4 : 4; }
        }
        gsap.to(el, { x:`${tx}vw`, y:`${ty}rem`, rotation:tr, scale:ts, duration:0.5, delay, ease:"elastic.out(1,.75)", overwrite:"auto" });
        gsap.set(el, { zIndex:base.zIndex });
      });
    };

    const enterHandlers = visibleEntries.map(({el,slot}) => {
      const handler = () => {
        if (isAnimating.current) return;
        if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer=null; }
        if (activeSlot!==slot) { activeSlot=slot; updateHoverLayout(slot); }
      };
      el.addEventListener("mouseenter", handler);
      return {el, handler};
    });

    const onMouseLeave = () => {
      if (isAnimating.current) return;
      if (leaveTimer) clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => { activeSlot=null; updateHoverLayout(null); }, 50);
    };
    container.addEventListener("mouseleave", onMouseLeave);
    const onResize = () => { if(!isAnimating.current) updateHoverLayout(activeSlot); };
    window.addEventListener("resize", onResize);

    return () => {
      enterHandlers.forEach(({el,handler}) => el.removeEventListener("mouseenter",handler));
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      if (leaveTimer) clearTimeout(leaveTimer);
    };
  }, [centerIndex, totalCards, getVisibleMap, needsPagination, isMobile]);

  if (!totalCards) return null;

  const chevron = (direction: "left"|"right") => (
    <svg className="relative z-[2] w-4 h-4 md:w-5 md:h-5" style={{ color: "var(--fg)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points={direction==="left"?"15 18 9 12 15 6":"9 18 15 12 9 6"} />
    </svg>
  );

  /* Mobile: swipe slider */
  if (isMobile) {
    return (
      <section style={{ display:"flex", flexDirection:"column", alignItems:"center", width:"100%", paddingTop:8, paddingBottom:16, zIndex:20 }}>
        <MobileSwipeSlider cards={cards} />
      </section>
    );
  }

  /* Desktop: GSAP fan carousel */
  return (
    <section className="flex flex-col items-center w-full py-4 lg:py-8 relative z-20 overflow-hidden">
      <style dangerouslySetInnerHTML={{__html:`
        .fan-layout{width:100%;position:relative;height:38vw;display:flex;align-items:center;justify-content:center;overflow:hidden;margin-top:2rem;}
        .fan-card{position:absolute;width:50vw;height:28.125vw;border-radius:2rem;overflow:hidden;box-shadow:0 30px 60px rgba(0,0,0,0.35);border:1px solid var(--gold-border);background:var(--bg-card);cursor:grab;user-select:none;}
        .fan-card:active{cursor:grabbing;}
        @media(max-width:1024px){.fan-layout{height:48vw;}.fan-card{width:65vw;height:36.5625vw;border-radius:1.5rem;}}
      `}} />
      <div className="flex items-center justify-center w-full max-w-[90rem]">
        <div ref={containerRef}
          onMouseDown={handleDragStart} onMouseMove={handleDragMove} onMouseUp={handleDragEnd} onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart} onTouchMove={handleDragMove} onTouchEnd={handleDragEnd}
          className="fan-layout flex relative justify-center items-center w-full"
        >
          {cards.map((card,index) => {
            const image = (
              <div className="relative w-full h-full overflow-hidden">
                <img src={card.imgUrl} draggable={false} loading="lazy" alt={card.alt||`Card ${index}`} className="absolute inset-0 w-full h-full object-cover z-10" />
              </div>
            );
            return card.linkUrl ? (
              <a key={index} href={card.linkUrl} target={card.linkUrl.startsWith("http")?"_blank":"_self"} rel="noopener noreferrer" className="fan-card block cursor-pointer">{image}</a>
            ) : (
              <div key={index} className="fan-card">{image}</div>
            );
          })}
        </div>
      </div>
      {needsPagination && (
        <div className="flex items-center justify-center gap-4 mt-6 md:mt-10 z-30">
          <button className={`${ARROW_CLASSES} w-10 h-10 md:w-12 md:h-12`} onClick={() => cycle("left")} aria-label="Previous">{chevron("left")}</button>
          <div className="flex items-center gap-2">
            {cards.map((_,i) => (
              <span key={i} onClick={() => cycle(i > centerIndex ? "right" : "left")}
                className="rounded-full transition-all duration-300 cursor-pointer"
                style={{ display:'block', width: i===centerIndex?18:8, height:8, borderRadius:4,
                  background: i===centerIndex?'var(--gold)':'var(--border-strong)' }} />
            ))}
          </div>
          <button className={`${ARROW_CLASSES} w-10 h-10 md:w-12 md:h-12`} onClick={() => cycle("right")} aria-label="Next">{chevron("right")}</button>
        </div>
      )}
    </section>
  );
}
