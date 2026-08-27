import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SITES = [
  { name: 'Adyar', lat: 13.0063, lng: 80.2574 },
  { name: 'Anna Nagar', lat: 13.0850, lng: 80.2101 },
  { name: 'T. Nagar', lat: 13.0418, lng: 80.2341 },
  { name: 'Oragadam', lat: 12.8439, lng: 79.9481 },
  { name: 'Thoraipakkam (OMR)', lat: 12.9430, lng: 80.2340 },
];

const ARCS = SITES.slice(1).map((site) => ({
  startLat: SITES[0].lat,
  startLng: SITES[0].lng,
  endLat: site.lat,
  endLng: site.lng,
  color: ['#5FD4FF', '#2E7FFF'],
}));

export default function IsosHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const globeContainerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);
  
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=4000',
          scrub: 1,
          pin: true,
        },
      });

      tl.to(stage1Ref.current, { scale: 0.1, opacity: 0, duration: 1 })
        .fromTo(stage2Ref.current, { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 1 }, "<0.5")
        .to(stage2Ref.current, { scale: 0.2, opacity: 0, duration: 1 })
        .fromTo(stage3Ref.current, { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 1 }, "<0.5")
        .to(stage3Ref.current, { opacity: 0, scale: 0.8, duration: 1 })
        .fromTo(globeContainerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, "<0.5");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.5;
      controls.enableZoom = false;
    }
  }, [globeRef.current, reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="h-screen w-full bg-[#050810] flex items-center justify-center font-sans">
        <Globe
          ref={globeRef}
          backgroundColor="#050810"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          arcsData={ARCS}
          arcColor="color"
          arcDashLength={0.5}
          arcDashGap={0.2}
          arcDashAnimateTime={1500}
          pointsData={SITES}
          pointColor={() => '#5FD4FF'}
          pointAltitude={0.02}
          pointRadius={0.4}
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-screen w-full bg-[#050810] overflow-hidden font-sans relative" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* STAGE 1 */}
      <div ref={stage1Ref} className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
        <svg viewBox="0 0 100 100" className="w-[150vw] h-[150vh] text-[#2E7FFF] opacity-80" style={{ filter: 'drop-shadow(0 0 20px #2E7FFF)' }}>
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* STAGE 2 */}
      <div ref={stage2Ref} className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none z-30">
        <div className="relative w-[800px] h-[800px] border border-[#2E7FFF]/20 rounded-full flex items-center justify-center">
          <div className="absolute w-[600px] h-[600px] border border-[#2E7FFF]/40 rounded-full" />
          <div className="absolute w-[400px] h-[400px] border border-[#5FD4FF]/60 rounded-full animate-pulse" />
          <svg className="absolute inset-0 w-full h-full">
            <circle cx="400" cy="400" r="6" fill="#F5F8FF" className="shadow-[0_0_15px_#F5F8FF]" />
            <text x="415" y="405" fill="#F5F8FF" className="text-sm font-semibold">Adyar (Hub)</text>
            <path d="M 400 400 Q 500 300 600 200" fill="none" stroke="#2E7FFF" strokeWidth="2" strokeDasharray="10 5" className="animate-[dash_20s_linear_infinite]" />
            <circle cx="600" cy="200" r="4" fill="#5FD4FF" />
            <text x="615" y="205" fill="#5FD4FF" className="text-xs">Thoraipakkam</text>
            <path d="M 400 400 Q 300 250 250 150" fill="none" stroke="#2E7FFF" strokeWidth="2" strokeDasharray="10 5" />
            <circle cx="250" cy="150" r="4" fill="#5FD4FF" />
            <text x="265" y="155" fill="#5FD4FF" className="text-xs">Anna Nagar</text>
          </svg>
        </div>
      </div>

      {/* STAGE 3 */}
      <div ref={stage3Ref} className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none z-20">
         <div className="relative w-full h-full flex flex-col items-center justify-center">
            <div className="w-[1200px] h-[1200px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2E7FFF]/10 via-[#050810]/5 to-[#050810] rounded-full" />
            <div className="absolute text-[#F5F8FF] text-xl font-light tracking-[0.2em] uppercase">Regional Grid Active</div>
         </div>
      </div>

      {/* STAGE 4 */}
      <div ref={globeContainerRef} className="absolute inset-0 opacity-0 z-10 flex items-center justify-center cursor-grab active:cursor-grabbing">
        <Globe
          ref={globeRef}
          backgroundColor="#050810"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          arcsData={ARCS}
          arcColor="color"
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={1500}
          pointsData={SITES}
          pointColor={() => '#5FD4FF'}
          pointAltitude={0.05}
          pointRadius={0.3}
          pointLabel={(d: any) => `
            <div style="background: #050810; padding: 4px 8px; border: 1px solid #2E7FFF; border-radius: 4px; color: #F5F8FF; font-family: Inter, sans-serif; font-size: 12px;">
              ${d.name}
            </div>
          `}
        />
        <div className="absolute bottom-12 left-0 w-full text-center pointer-events-none">
           <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#F5F8FF] mb-4">Ísos</h1>
           <p className="text-[#5FD4FF] text-lg tracking-wide uppercase">Global Energy Forecasting</p>
        </div>
      </div>

    </div>
  );
}
