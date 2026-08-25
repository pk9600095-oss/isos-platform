import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scene Refs
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const curtainTextRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const spaceTextRef = useRef<HTMLDivElement>(null);
  const horizonBgRef = useRef<HTMLDivElement>(null);
  const treeIslandRef = useRef<HTMLDivElement>(null);
  const islandTextRef = useRef<HTMLDivElement>(null);
  const ladderSceneRef = useRef<HTMLDivElement>(null);

  const [activeOverlay, setActiveOverlay] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=4500',
          pin: true,
          scrub: 1.5,
        }
      });

      // --- ACT I: THE CURTAIN REVEAL (Cartier 00:00 - 00:01) ---
      tl.to(curtainTextRef.current, { opacity: 0, scale: 0.95, duration: 1 })
        .to(curtainLeftRef.current, { xPercent: -105, ease: 'power2.inOut', duration: 3 }, "-=0.5")
        .to(curtainRightRef.current, { xPercent: 105, ease: 'power2.inOut', duration: 3 }, "-=3")

      // --- ACT II: CELESTIAL NIGHT & MOON (Cartier 00:02 - 00:08) ---
        .fromTo(moonRef.current, { scale: 1.8, y: 50, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 3 }, "-=1.5")
        .fromTo(spaceTextRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 2 }, "-=1")

      // --- ACT III: DAWN HORIZON & ETHEREAL LAKE (Cartier 00:09 - 00:15) ---
        .to([moonRef.current, spaceTextRef.current], { opacity: 0, y: -40, duration: 2 })
        .to(horizonBgRef.current, { opacity: 1, duration: 3.5 }, "-=1.5")
        .fromTo(treeIslandRef.current, { scale: 0.7, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: 3 }, "-=2")
        .fromTo(islandTextRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 2 }, "-=1")

      // --- ACT IV: CLOUD ASCENSION & GOLDEN LADDER (Cartier 00:17 - 00:23) ---
        .to([treeIslandRef.current, islandTextRef.current], { opacity: 0, duration: 2 })
        .to(ladderSceneRef.current, { opacity: 1, y: 0, duration: 3 }, "-=1");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#0A0C10] text-[#E5DCD3] font-serif selection:bg-[#C5A059] selection:text-[#0A0C10] overflow-x-hidden min-h-screen">
      
      {/* Minimal Luxury Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference">
        <span className="text-xs uppercase tracking-[0.3em] font-sans text-[#D4C3B3]">Ί Σ Ο Σ</span>
        <button 
          onClick={() => setActiveOverlay(!activeOverlay)}
          className="text-[11px] uppercase tracking-[0.25em] font-sans hover:text-[#C5A059] transition-colors"
        >
          {activeOverlay ? "Close Index" : "Overview"}
        </button>
      </header>

      {/* Main Pinned Canvas Container */}
      <div ref={containerRef} className="h-screen w-full relative overflow-hidden flex items-center justify-center">

        {/* --- STAGE 1: CURTAINS (Silk Warm Taupe) --- */}
        <div ref={curtainLeftRef} className="absolute inset-y-0 left-0 w-1/2 bg-[#211C18] border-r border-[#3A322B] z-40 flex items-center justify-end shadow-2xl">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#382F28] via-[#1E1915] to-[#120F0D] opacity-90" />
        </div>
        <div ref={curtainRightRef} className="absolute inset-y-0 right-0 w-1/2 bg-[#211C18] border-l border-[#3A322B] z-40 flex items-center justify-start shadow-2xl">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#382F28] via-[#1E1915] to-[#120F0D] opacity-90" />
        </div>
        
        <div ref={curtainTextRef} className="absolute z-50 text-center space-y-4 px-4">
          <p className="text-xs italic tracking-[0.3em] font-serif text-[#C5A059]">ΊΣΟΣ presents</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-[0.25em] uppercase text-[#F2EBE4]">Grid & Wonders</h1>
          <p className="text-[10px] tracking-[0.4em] font-sans text-[#A39587] uppercase pt-8">Scroll to Reveal</p>
        </div>

        {/* --- STAGE 2: CELESTIAL MOON & DEEP SPACE --- */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#141923_0%,_#07090D_100%)] z-10 flex flex-col items-center justify-center">
          {/* Subtle Starfield backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />

          {/* Luminous Moon Orb */}
          <div ref={moonRef} className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-[radial-gradient(circle_at_30%_30%,_#FFF9E6_0%,_#D0C2A5_40%,_#4A4238_85%,_#1A1714_100%)] shadow-[0_0_80px_rgba(245,230,200,0.15)] relative">
            <div className="absolute inset-0 rounded-full mix-blend-overlay opacity-30 bg-[radial-gradient(circle,_#000_20%,transparent_80%)]" />
          </div>

          <div ref={spaceTextRef} className="absolute bottom-20 text-center max-w-lg px-6 space-y-3">
            <p className="text-sm md:text-base italic text-[#D8C9B9] font-serif font-light leading-relaxed">
              "Playing with energy flows, crossing the border between the physical microgrid and the invisible dynamics of time."
            </p>
          </div>
        </div>

        {/* --- STAGE 3: ETHEREAL LAKE & SQUARE TREE ISLAND --- */}
        <div ref={horizonBgRef} className="absolute inset-0 z-20 opacity-0 bg-[linear-gradient(to_bottom,_#A3B8C8_0%,_#D6C5B3_45%,_#EBE4DC_70%,_#8E9EAA_100%)] flex items-center justify-center">
          
          {/* Horizon Water Line */}
          <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(to_bottom,_rgba(255,255,255,0.2)_0%,_#7A8B99_100%)] backdrop-blur-[1px]" />

          {/* Square Sculptural Tree */}
          <div ref={treeIslandRef} className="relative z-30 flex flex-col items-center">
            <div className="w-44 h-44 md:w-56 md:h-56 bg-[#735A43] border border-[#C5A059]/40 rounded-sm shadow-2xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#C5A059_0%,_#3D2E22_100%)] opacity-80" />
              <span className="relative z-10 text-6xl font-serif text-[#F2EBE4] italic">ΊΣ</span>
            </div>
            {/* Reflection */}
            <div className="w-44 h-24 md:w-56 md:h-28 bg-[#735A43]/20 blur-sm transform scale-y-[-1] opacity-40 mt-1" />
          </div>

          <div ref={islandTextRef} className="absolute left-10 md:left-24 top-1/3 z-30 max-w-sm space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] font-sans text-[#4A3E35]">The Equilibrium</span>
            <h2 className="text-3xl font-light italic text-[#2A221C]">When energy architecture takes form into the sublime.</h2>
          </div>
        </div>

        {/* --- STAGE 4: SKY ASCENSION & GOLDEN LADDER --- */}
        <div ref={ladderSceneRef} className="absolute inset-0 z-30 opacity-0 translate-y-12 bg-[linear-gradient(to_bottom,_#8FA5B5_0%,_#C9D6E0_50%,_#F0F4F7_100%)] flex items-center justify-center">
          
          {/* Ethereal Floating Ladder / Ring Frame */}
          <div className="w-72 h-[450px] border-4 border-[#C5A059] rounded-t-full opacity-80 flex flex-col justify-between py-8 items-center shadow-[0_0_50px_rgba(197,160,89,0.2)]">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-full h-1 bg-[#C5A059]/60" />
            ))}
          </div>

          <div className="absolute left-8 md:left-20 bottom-1/4 max-w-md space-y-4 text-[#1C252C]">
            <h3 className="text-2xl italic font-serif">Reflection of Autonomous Grid</h3>
            <p className="text-xs font-sans tracking-wider leading-relaxed text-[#4A5763]">
              Between demand forecasting and real-time node balancing, ΊΣΟΣ shapes power with understated perfection.
            </p>
          </div>
        </div>

      </div>

      {/* Slide-out Index Modal for Enterprise Telemetry Details */}
      {activeOverlay && (
        <div className="fixed inset-0 z-50 bg-[#0A0C10]/95 backdrop-blur-md p-10 flex flex-col justify-between text-[#E5DCD3]">
          <div className="max-w-4xl mx-auto w-full space-y-8 pt-12">
            <h2 className="text-3xl font-light tracking-widest italic border-b border-[#3A322B] pb-4">Telemetric Index</h2>
            <div className="grid md:grid-cols-2 gap-8 font-sans text-xs tracking-wider">
              <div className="space-y-2">
                <span className="text-[#C5A059] uppercase">Node 01 — Adyar Sector</span>
                <p className="text-slate-400">Peak Demand: 185.4 kW | Grid Status: Optimal</p>
              </div>
              <div className="space-y-2">
                <span className="text-[#C5A059] uppercase">Node 02 — OMR Tech Corridor</span>
                <p className="text-slate-400">Solar Generation Offset: 92.0 kW</p>
              </div>
            </div>
          </div>
          <p className="text-center text-[10px] uppercase font-sans tracking-[0.3em] text-slate-500">© 2026 ΊΣΟΣ by Nothing Creations</p>
        </div>
      )}

    </div>
  );
}
