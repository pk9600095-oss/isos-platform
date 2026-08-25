import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Real Chennai Site Data (Roadmap Part 3)
const CHENNAI_SITES = [
  { id: 'adyar', name: 'Adyar Residency Grid', location: 'Adyar, Chennai', type: 'Residential RWA', load: '185.4 kW', solarOffset: '42.1 kW', status: 'Optimal', rate: '₹6.20/kWh' },
  { id: 'omr', name: 'OMR Tech Corridor Site', location: 'Old Mahabalipuram Road', type: 'Commercial IT Campus', load: '420.8 kW', solarOffset: '128.5 kW', status: 'Peak Load', rate: '₹8.10/kWh' },
  { id: 'annanagar', name: 'Anna Nagar Community Block', location: 'Anna Nagar, Chennai', type: 'Residential Society', load: '142.0 kW', solarOffset: '35.0 kW', status: 'Optimal', rate: '₹5.90/kWh' },
  { id: 'oragadam', name: 'Oragadam Industrial Node', location: 'Oragadam, Chennai', type: 'Industrial Manufacturing', load: '890.2 kW', solarOffset: '210.0 kW', status: 'Balancing', rate: '₹7.40/kWh' },
  { id: 'tnagar', name: 'T. Nagar Retail Cluster', location: 'T. Nagar, Chennai', type: 'Commercial Retail', load: '310.5 kW', solarOffset: '64.2 kW', status: 'Optimal', rate: '₹8.50/kWh' },
];

export default function App() {
  const heroContainerRef = useRef<HTMLDivElement>(null);
  
  // GSAP Scene References
  const scene1PanelRef = useRef<SVGSVGElement>(null);
  const scene2GridRef = useRef<HTMLDivElement>(null);
  const scene3WiresRef = useRef<SVGSVGElement>(null);
  const scene4WordmarkRef = useRef<HTMLDivElement>(null);
  const scene5MapRef = useRef<HTMLDivElement>(null);
  const scene6CardsRef = useRef<HTMLDivElement>(null);

  // App UI States
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState(CHENNAI_SITES[0]);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [telemetryTime, setTelemetryTime] = useState(new Date().toLocaleTimeString());

  // Live 15-Minute Telemetry Timer Simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetryTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // GSAP 7-Scene ScrollTrigger Setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroContainerRef.current,
          start: 'top top',
          end: '+=5000',
          pin: true,
          scrub: 1.2,
        }
      });

      // Scene 1: Single Solar Panel illuminates & scales up
      tl.fromTo(scene1PanelRef.current, { scale: 0.5, opacity: 0.2 }, { scale: 1.2, opacity: 1, duration: 2 })
        .to('.panel-cell', { fill: '#C5A059', stagger: 0.2, duration: 2.5 }, "-=1.5")

      // Scene 2: Panel multiplies into grid field
        .to(scene1PanelRef.current, { opacity: 0, scale: 2, duration: 1.5 })
        .fromTo(scene2GridRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 2 }, "-=1")

      // Scene 3: Light becomes current (Wire lines draw inward)
        .to(scene2GridRef.current, { opacity: 0, duration: 1.5 })
        .fromTo(scene3WiresRef.current, { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1")
        .fromTo('.wire-path', { strokeDashoffset: 1000 }, { strokeDashoffset: 0, stagger: 0.3, duration: 3 }, "-=0.5")

      // Scene 4: Converged current draws the ΊΣΟΣ wordmark
        .to(scene3WiresRef.current, { opacity: 0, duration: 1 })
        .fromTo(scene4WordmarkRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 2.5 }, "-=0.5")

      // Scene 5: Wire network redrawn into City Node Map
        .to(scene4WordmarkRef.current, { opacity: 0, y: -30, duration: 1.5 })
        .fromTo(scene5MapRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 2.5 }, "-=1")

      // Scene 6: Nodes expand into Chennai site cards
        .to(scene5MapRef.current, { opacity: 0, duration: 1.5 })
        .fromTo(scene6CardsRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 2.5 }, "-=1");

    }, heroContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#0C0B0A] text-[#F5F2EC] selection:bg-[#C5A059] selection:text-[#0C0B0A] min-h-screen font-serif">
      
      {/* --- TOP FIXED NAVIGATION --- */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-5 flex justify-between items-center bg-[#0C0B0A]/80 backdrop-blur-md border-b border-[#24211E]">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold tracking-[0.3em] text-[#F5F2EC]">ΊΣΟΣ</span>
          <span className="text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 border border-[#C5A059]/40 text-[#C5A059] font-sans">
            Grid Autopilot
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-xs font-sans tracking-widest text-[#A3978C]">
          <a href="#hero" className="hover:text-[#C5A059] transition-colors uppercase">Story</a>
          <a href="#about" className="hover:text-[#C5A059] transition-colors uppercase">What is ΊΣΟΣ</a>
          <a href="#telemetry" className="hover:text-[#C5A059] transition-colors uppercase">Telemetry</a>
          <a href="#pricing" className="hover:text-[#C5A059] transition-colors uppercase">Pricing</a>
          <a href="#auth" className="hover:text-[#C5A059] transition-colors uppercase">Portal</a>
          <a href="#faq" className="hover:text-[#C5A059] transition-colors uppercase">FAQ</a>
        </nav>

        <button 
          onClick={() => setIsOverviewOpen(true)}
          className="text-xs uppercase font-sans tracking-[0.2em] px-4 py-2 border border-[#3A342E] hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
        >
          Overview
        </button>
      </header>

      {/* --- OVERVIEW SLIDE-OUT DRAWER --- */}
      {isOverviewOpen && (
        <div className="fixed inset-0 z-50 bg-[#0C0B0A]/95 backdrop-blur-xl p-8 md:p-12 flex flex-col justify-between border-l border-[#24211E]">
          <div>
            <div className="flex justify-between items-center border-b border-[#24211E] pb-6">
              {/* Functional Close Button requested */}
              <button 
                onClick={() => setIsOverviewOpen(false)}
                className="flex items-center space-x-2 text-xs font-sans tracking-widest text-[#C5A059] hover:text-[#F5F2EC] transition-colors uppercase"
              >
                <span>← Back to Experience</span>
              </button>
              <span className="text-xs font-sans tracking-widest text-[#A3978C] uppercase">System Index</span>
            </div>

            <div className="mt-12 space-y-8 max-w-4xl">
              <h2 className="text-3xl font-light italic text-[#F5F2EC]">Platform Telemetry Overview</h2>
              <div className="grid md:grid-cols-2 gap-6 font-sans text-xs">
                {CHENNAI_SITES.map((s) => (
                  <div key={s.id} className="p-4 bg-[#181614] border border-[#24211E] space-y-1">
                    <div className="flex justify-between text-[#C5A059] uppercase font-semibold">
                      <span>{s.name}</span>
                      <span>{s.status}</span>
                    </div>
                    <p className="text-[#A3978C]">{s.location} • {s.type}</p>
                    <p className="text-[#F5F2EC] pt-2">Load: {s.load} | Solar: {s.solarOffset} | Tariff: {s.rate}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center font-sans text-[10px] tracking-[0.3em] text-[#A3978C] uppercase border-t border-[#24211E] pt-4">
            © 2026 ΊΣΟΣ Platform • Built by Nothing Creations for Yuva Yodha Hackathon
          </div>
        </div>
      )}

      {/* --- SECTION 1: GSAP 7-SCENE ANIMATION HERO CONTAINER --- */}
      <section id="hero" ref={heroContainerRef} className="h-screen w-full relative overflow-hidden flex items-center justify-center">
        
        {/* Scene 1: Single Solar Panel */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <svg ref={scene1PanelRef} className="w-64 h-64 md:w-80 md:h-80 text-[#3A342E]" viewBox="0 0 100 100">
            <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 10 36.6 L 90 36.6 M 10 63.3 L 90 63.3 M 36.6 10 L 36.6 90 M 63.3 10 L 63.3 90" stroke="currentColor" strokeWidth="1" />
            <rect className="panel-cell opacity-40 transition-all duration-300" x="12" y="12" width="22" height="22" fill="#24211E" />
            <rect className="panel-cell opacity-40 transition-all duration-300" x="39" y="12" width="22" height="22" fill="#24211E" />
            <rect className="panel-cell opacity-40 transition-all duration-300" x="66" y="12" width="22" height="22" fill="#24211E" />
            <rect className="panel-cell opacity-40 transition-all duration-300" x="12" y="39" width="22" height="22" fill="#24211E" />
            <rect className="panel-cell opacity-40 transition-all duration-300" x="39" y="39" width="22" height="22" fill="#24211E" />
          </svg>
        </div>

        {/* Scene 2: Panel Field Array */}
        <div ref={scene2GridRef} className="absolute inset-0 z-10 opacity-0 flex items-center justify-center p-8 pointer-events-none">
          <div className="grid grid-cols-4 md:grid-cols-6 gap-4 w-full max-w-4xl opacity-80">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-20 border border-[#C5A059]/40 bg-[#181614] rounded-sm p-2 flex flex-col justify-between shadow-lg">
                <div className="w-full h-1 bg-[#C5A059]/30" />
                <span className="text-[8px] font-sans text-[#C5A059] tracking-widest uppercase">Node #{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scene 3: Light Becomes Current (SVG Wire Paths) */}
        <svg ref={scene3WiresRef} className="absolute inset-0 w-full h-full z-10 opacity-0 pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path className="wire-path" d="M 100 100 L 500 500" stroke="#C5A059" strokeWidth="2" strokeDasharray="1000" fill="none" />
          <path className="wire-path" d="M 900 100 L 500 500" stroke="#C5A059" strokeWidth="2" strokeDasharray="1000" fill="none" />
          <path className="wire-path" d="M 100 900 L 500 500" stroke="#C5A059" strokeWidth="2" strokeDasharray="1000" fill="none" />
          <path className="wire-path" d="M 900 900 L 500 500" stroke="#C5A059" strokeWidth="2" strokeDasharray="1000" fill="none" />
        </svg>

        {/* Scene 4: Converged Current Draws Wordmark */}
        <div ref={scene4WordmarkRef} className="absolute z-10 opacity-0 text-center space-y-4 px-6 pointer-events-none">
          <p className="text-xs uppercase tracking-[0.4em] font-sans text-[#C5A059]">Energy Architecture</p>
          <h1 className="text-6xl md:text-8xl font-light tracking-[0.2em] italic text-[#F5F2EC]">ΊΣΟΣ</h1>
          <p className="text-xs font-sans tracking-[0.3em] text-[#A3978C] uppercase">Autonomous Microgrid Balancing</p>
        </div>

        {/* Scene 5: Abstract Grid City Map */}
        <div ref={scene5MapRef} className="absolute inset-0 z-10 opacity-0 flex items-center justify-center pointer-events-none">
          <div className="w-80 h-80 border border-[#3A342E] rounded-full relative flex items-center justify-center">
            <div className="w-56 h-56 border border-[#C5A059]/30 rounded-full animate-ping" />
            <div className="absolute top-6 left-12 w-3 h-3 rounded-full bg-[#C5A059] shadow-[0_0_12px_#C5A059]" />
            <div className="absolute bottom-10 right-14 w-3 h-3 rounded-full bg-[#C5A059] shadow-[0_0_12px_#C5A059]" />
            <div className="absolute top-1/2 right-4 w-3 h-3 rounded-full bg-[#C5A059] shadow-[0_0_12px_#C5A059]" />
          </div>
        </div>

        {/* Scene 6 & 7: Site Cards & Transition into Platform */}
        <div ref={scene6CardsRef} className="absolute z-20 opacity-0 text-center space-y-6 px-6 max-w-xl">
          <span className="text-xs uppercase tracking-[0.3em] font-sans text-[#C5A059]">Connected Localities</span>
          <h2 className="text-3xl font-light italic">5 Real Chennai Nodes Active</h2>
          <p className="text-xs font-sans text-[#A3978C] leading-relaxed tracking-wider">
            Scroll down into the Live Telemetry Dashboard to monitor real-time demand forecasting and solar offset optimization across Adyar, OMR, and Oragadam.
          </p>
          <a href="#telemetry" className="inline-block border border-[#C5A059] text-[#C5A059] text-xs font-sans tracking-widest px-6 py-3 uppercase hover:bg-[#C5A059] hover:text-[#0C0B0A] transition-colors">
            Enter Live Dashboard
          </a>
        </div>

      </section>

      {/* --- SECTION 2: WHAT IS ΊΣΟΣ EXPLAINER --- */}
      <section id="about" className="py-24 px-8 md:px-16 bg-[#141312] border-t border-[#24211E]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="space-y-4">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C5A059]">Core Technology</span>
            <h2 className="text-4xl font-light italic">Predictive Equilibrium for Modern Microgrids</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 font-sans text-xs leading-relaxed text-[#A3978C]">
            <div className="p-6 bg-[#0C0B0A] border border-[#24211E] space-y-3">
              <h3 className="text-sm font-serif italic text-[#F5F2EC]">01. Demand Forecasting</h3>
              <p>Analyzes localized usage curves across residential and industrial sectors to anticipate peak grid stress before overloads occur.</p>
            </div>
            <div className="p-6 bg-[#0C0B0A] border border-[#24211E] space-y-3">
              <h3 className="text-sm font-serif italic text-[#F5F2EC]">02. Dynamic Tariff Matching</h3>
              <p>Automatically shifts non-essential load towards off-peak windows when renewable solar generation is at maximum capacity.</p>
            </div>
            <div className="p-6 bg-[#0C0B0A] border border-[#24211E] space-y-3">
              <h3 className="text-sm font-serif italic text-[#F5F2EC]">03. NVIDIA NIM Integration</h3>
              <p>Translates complex power telemetry into single-sentence plain language recommendations for grid dispatchers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: LIVE TELEMETRY DASHBOARD --- */}
      <section id="telemetry" className="py-24 px-8 md:px-16 bg-[#0C0B0A]">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#24211E] pb-6 space-y-4 md:space-y-0">
            <div>
              <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C5A059]">Real-Time Control Panel</span>
              <h2 className="text-3xl font-light italic">Chennai Localized Telemetry</h2>
            </div>
            <div className="text-right font-sans text-xs text-[#A3978C]">
              <span>Last 15-Min Refresh: </span>
              <span className="text-[#C5A059] font-mono">{telemetryTime}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Site List Selector */}
            <div className="space-y-3 font-sans text-xs">
              <h4 className="text-[#A3978C] uppercase tracking-widest text-[10px]">Select Telemetry Node</h4>
              {CHENNAI_SITES.map((site) => (
                <button
                  key={site.id}
                  onClick={() => setSelectedSite(site)}
                  className={`w-full text-left p-4 border transition-colors flex justify-between items-center ${
                    selectedSite.id === site.id 
                      ? 'border-[#C5A059] bg-[#181614] text-[#F5F2EC]' 
                      : 'border-[#24211E] bg-[#0C0B0A] text-[#A3978C] hover:border-[#3A342E]'
                  }`}
                >
                  <div>
                    <p className="font-semibold text-xs">{site.name}</p>
                    <p className="text-[10px] opacity-70">{site.location}</p>
                  </div>
                  <span className="text-[10px] uppercase px-2 py-0.5 border border-[#3A342E] text-[#C5A059]">{site.status}</span>
                </button>
              ))}
            </div>

            {/* Selected Node Telemetry View */}
            <div className="lg:col-span-2 bg-[#141312] border border-[#24211E] p-8 space-y-8 font-sans">
              <div className="flex justify-between items-start border-b border-[#24211E] pb-4">
                <div>
                  <h3 className="text-2xl font-serif italic text-[#F5F2EC]">{selectedSite.name}</h3>
                  <p className="text-xs text-[#A3978C] pt-1">{selectedSite.location} • {selectedSite.type}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#A3978C]">Effective Tariff</span>
                  <p className="text-xl font-mono text-[#C5A059]">{selectedSite.rate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="p-4 bg-[#0C0B0A] border border-[#24211E]">
                  <span className="text-[10px] text-[#A3978C] uppercase tracking-widest">Active Demand Load</span>
                  <p className="text-xl font-mono text-[#F5F2EC] mt-1">{selectedSite.load}</p>
                </div>
                <div className="p-4 bg-[#0C0B0A] border border-[#24211E]">
                  <span className="text-[10px] text-[#A3978C] uppercase tracking-widest">Solar Generation Offset</span>
                  <p className="text-xl font-mono text-[#C5A059] mt-1">{selectedSite.solarOffset}</p>
                </div>
                <div className="p-4 bg-[#0C0B0A] border border-[#24211E] col-span-2 md:col-span-1">
                  <span className="text-[10px] text-[#A3978C] uppercase tracking-widest">Grid Stability Index</span>
                  <p className="text-xl font-mono text-emerald-400 mt-1">99.4%</p>
                </div>
              </div>

              <div className="p-4 bg-[#0C0B0A] border border-[#C5A059]/30 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                  <span className="text-xs uppercase tracking-widest text-[#C5A059]">NVIDIA Advisory Recommendation</span>
                </div>
                <p className="text-xs font-serif italic text-[#F5F2EC]">
                  "Shift non-essential residential load by 14% between 14:00–16:00 to maximize local solar absorption and reduce peak tariff exposure."
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 4: PRICING & DEVELOPMENT TIERS --- */}
      <section id="pricing" className="py-24 px-8 md:px-16 bg-[#141312] border-t border-[#24211E]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C5A059]">Deployment Tiers</span>
            <h2 className="text-4xl font-light italic">Scalable Infrastructure</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 font-sans">
            <div className="p-8 bg-[#0C0B0A] border border-[#24211E] space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C5A059]">Hackathon & Pilot</span>
                <h3 className="text-3xl font-serif italic text-[#F5F2EC] mt-2">Community Grid</h3>
                <p className="text-xs text-[#A3978C] mt-1">Free tier deployment for RWAs and local microgrids.</p>
              </div>
              <ul className="space-y-3 text-xs text-[#A3978C] border-t border-[#24211E] pt-6">
                <li>• Up to 5 Local Telemetry Nodes</li>
                <li>• 15-Minute Synthetic Data Feeds</li>
                <li>• Basic Tariff Optimization Rules</li>
                <li>• Community Web Portal Access</li>
              </ul>
            </div>

            <div className="p-8 bg-[#0C0B0A] border border-[#C5A059] space-y-6 relative">
              <div className="absolute top-4 right-4 text-[9px] uppercase tracking-widest px-2 py-0.5 bg-[#C5A059] text-[#0C0B0A] font-semibold">
                Enterprise
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C5A059]">Industrial & Utility</span>
                <h3 className="text-3xl font-serif italic text-[#F5F2EC] mt-2">Grid Autopilot Pro</h3>
                <p className="text-xs text-[#A3978C] mt-1">Full autonomous load balancing with hardware integrations.</p>
              </div>
              <ul className="space-y-3 text-xs text-[#A3978C] border-t border-[#24211E] pt-6">
                <li>• Unlimited Regional Microgrid Nodes</li>
                <li>• Real-Time IoT Relay Integration</li>
                <li>• NVIDIA NIM Powered Natural Language Engine</li>
                <li>• Supabase Enterprise Database Persistence</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: AUTHENTICATION PORTAL --- */}
      <section id="auth" className="py-24 px-8 md:px-16 bg-[#0C0B0A]">
        <div className="max-w-md mx-auto bg-[#141312] border border-[#24211E] p-8 space-y-6 font-sans">
          <div className="flex border-b border-[#24211E] pb-4">
            <button 
              onClick={() => setAuthMode('signup')}
              className={`flex-1 text-center text-xs uppercase tracking-widest pb-2 ${authMode === 'signup' ? 'text-[#C5A059] border-b-2 border-[#C5A059]' : 'text-[#A3978C]'}`}
            >
              Request Access
            </button>
            <button 
              onClick={() => setAuthMode('signin')}
              className={`flex-1 text-center text-xs uppercase tracking-widest pb-2 ${authMode === 'signin' ? 'text-[#C5A059] border-b-2 border-[#C5A059]' : 'text-[#A3978C]'}`}
            >
              Sign In
            </button>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#A3978C] uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" placeholder="dispatcher@grid.in" className="w-full bg-[#0C0B0A] border border-[#24211E] p-3 text-[#F5F2EC] focus:border-[#C5A059] outline-none" />
            </div>
            <div>
              <label className="block text-[#A3978C] uppercase tracking-wider mb-2">Password</label>
              <input type="password" placeholder="••••••••••••" className="w-full bg-[#0C0B0A] border border-[#24211E] p-3 text-[#F5F2EC] focus:border-[#C5A059] outline-none" />
            </div>
            <button type="submit" className="w-full bg-[#C5A059] text-[#0C0B0A] font-semibold uppercase tracking-widest p-3 hover:bg-[#D4C4B5] transition-colors">
              {authMode === 'signup' ? 'Register Account' : 'Authenticate Session'}
            </button>
          </form>

          <p className="text-[10px] text-center text-[#A3978C] uppercase tracking-wider">
            Connected via Supabase Auth Engine
          </p>
        </div>
      </section>

      {/* --- SECTION 6: KNOWLEDGE BASE & FAQ --- */}
      <section id="faq" className="py-24 px-8 md:px-16 bg-[#141312] border-t border-[#24211E]">
        <div className="max-w-4xl mx-auto space-y-8 font-sans">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059]">Documentation</span>
            <h2 className="text-3xl font-serif italic text-[#F5F2EC]">Knowledge Base & FAQ</h2>
          </div>

          <div className="space-y-4 text-xs">
            {[
              { q: 'Is the Chennai locality telemetry dataset real or synthetic?', a: 'The locality names (Adyar, OMR, Oragadam, T. Nagar) represent genuine geographical clusters in Chennai. The numerical load data and solar generation figures are synthetically generated for benchmark testing.' },
              { q: 'How does the 15-minute refresh cycle operate?', a: 'A scheduled Vercel serverless cron function recalculates load forecast offsets every 15 minutes and updates the Supabase database instance.' },
              { q: 'What is the role of NVIDIA NIM in ΊΣΟΣ?', a: 'NVIDIA hosted models convert telemetry state matrices into natural language recommendations for human grid operators.' }
            ].map((faq, i) => (
              <div key={i} className="border border-[#24211E] bg-[#0C0B0A] p-4">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left font-semibold text-[#F5F2EC] flex justify-between items-center"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#C5A059]">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <p className="mt-3 text-[#A3978C] leading-relaxed border-t border-[#24211E] pt-3">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 7: NOTHING CREATIONS FOOTER --- */}
      <footer className="py-16 px-8 bg-[#0C0B0A] border-t border-[#24211E] text-center space-y-6 font-sans text-xs">
        <h3 className="text-2xl font-serif italic text-[#F5F2EC]">Ί Σ Ο Σ</h3>
        <p className="text-[#A3978C] max-w-md mx-auto">
          Autonomous Microgrid Equilibrium & Telemetry Engine.
        </p>
        <div className="text-[10px] text-[#A3978C] tracking-[0.3em] uppercase pt-6 border-t border-[#24211E] max-w-xs mx-auto">
          Built by Nothing Creations • Yuva Yodha 2026
        </div>
      </footer>

    </div>
  );
}
