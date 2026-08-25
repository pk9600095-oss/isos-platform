import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Zap, Shield, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedSite, setSelectedSite] = useState('11111111-1111-1111-1111-111111111111');
  const [sites, setSites] = useState<any[]>([]);
  const [readings, setReadings] = useState<any[]>([]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<SVGSVGElement>(null);
  const gridRef = useRef<SVGGElement>(null);
  const linesRef = useRef<SVGPathElement>(null);
  const logoRef = useRef<SVGTextElement>(null);
  const nodesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    async function fetchData() {
      const { data: sitesData } = await supabase.from('sites').select('*');
      if (sitesData) setSites(sitesData);
      
      const { data: readingsData } = await supabase.from('readings').select('*');
      if (readingsData) setReadings(readingsData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (activeTab !== 'home') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2500',
          pin: true,
          scrub: 1
        }
      });

      tl.fromTo(panelRef.current, { scale: 0.2, opacity: 0.3 }, { scale: 1, opacity: 1, duration: 2 })
        .to(gridRef.current, { opacity: 1, scale: 1.1, duration: 2 })
        .to(linesRef.current, { strokeDashoffset: 0, opacity: 1, duration: 3 })
        .to(logoRef.current, { opacity: 1, scale: 1.2, duration: 2 })
        .to(nodesRef.current, { opacity: 1, stagger: 0.5, duration: 2 });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  const activeReading = readings.find(r => r.site_id === selectedSite) || {
    demand_kw: 185.4,
    tariff_rate: 7.20,
    solar_output_kw: 92.0,
    grid_status: 'PEAK_LOAD',
    recommendation_text: 'High morning peak detected. Discharge battery storage to offset peak tariff rate of ₹7.20/kWh.'
  };

  return (
    <div className="min-h-screen bg-[#0B1F2A] text-[#F2F0EA] font-sans flex flex-col">
      <header className="border-b border-[#C9A24B]/20 bg-[#0B1F2A]/90 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-8 h-8 rounded bg-[#C9A24B] text-[#0B1F2A] font-black flex items-center justify-center text-xl">Ί</div>
          <span className="text-xl font-bold tracking-widest text-[#F2F0EA]">ΊΣΟΣ</span>
          <span className="text-xs uppercase px-2 py-0.5 border border-[#C9A24B]/40 text-[#C9A24B] rounded">Enterprise</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'text-[#C9A24B]' : 'hover:text-[#C9A24B]'}>Overview</button>
          <button onClick={() => setActiveTab('product')} className={activeTab === 'product' ? 'text-[#C9A24B]' : 'hover:text-[#C9A24B]'}>What is ΊΣΟΣ</button>
          <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'text-[#C9A24B]' : 'hover:text-[#C9A24B]'}>Live Telemetry</button>
          <button onClick={() => setActiveTab('pricing')} className={activeTab === 'pricing' ? 'text-[#C9A24B]' : 'hover:text-[#C9A24B]'}>Deployment & Pricing</button>
          <button onClick={() => setActiveTab('faq')} className={activeTab === 'faq' ? 'text-[#C9A24B]' : 'hover:text-[#C9A24B]'}>FAQ</button>
          <button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'text-[#C9A24B]' : 'hover:text-[#C9A24B]'}>Nothing Creations</button>
        </nav>

        <button onClick={() => setActiveTab('signup')} className="px-5 py-2 bg-[#C9A24B] text-[#0B1F2A] font-semibold rounded-lg hover:bg-[#b5903f]">
          Access Portal
        </button>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        {activeTab === 'home' && (
          <div ref={sectionRef} className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#07141C] border border-[#C9A24B]/20 rounded-3xl">
            <div className="absolute top-8 text-center space-y-2 z-10">
              <span className="text-xs uppercase tracking-widest text-[#C9A24B] font-mono">Scroll To Explore Grid Sync</span>
              <h1 className="text-3xl font-extrabold">ΊΣΟΣ Autonomous Energy Control</h1>
            </div>

            <svg className="w-full h-96 max-w-3xl" viewBox="0 0 800 400">
              <rect ref={panelRef as any} x="350" y="150" width="100" height="100" fill="none" stroke="#C9A24B" strokeWidth="2" className="origin-center" />
              
              <g ref={gridRef} className="opacity-0">
                <rect x="200" y="150" width="100" height="100" fill="none" stroke="#C9A24B" strokeWidth="1" />
                <rect x="500" y="150" width="100" height="100" fill="none" stroke="#C9A24B" strokeWidth="1" />
              </g>

              <path ref={linesRef} d="M 100 350 Q 400 300 400 200 T 700 350" fill="none" stroke="#C9A24B" strokeWidth="3" strokeDasharray="500" strokeDashoffset="500" className="opacity-0" />

              <text ref={logoRef} x="400" y="210" fill="#F2F0EA" textAnchor="middle" className="text-5xl font-black tracking-widest opacity-0">ΊΣΟΣ</text>

              <g ref={nodesRef} className="opacity-0">
                <circle cx="250" cy="100" r="10" fill="#C9A24B" />
                <text x="250" y="80" fill="#F2F0EA" textAnchor="middle" className="text-xs font-mono">Adyar Node</text>
                
                <circle cx="550" cy="100" r="10" fill="#C9A24B" />
                <text x="550" y="80" fill="#F2F0EA" textAnchor="middle" className="text-xs font-mono">OMR Node</text>
              </g>
            </svg>
          </div>
        )}

        {activeTab === 'product' && (
          <div className="space-y-12 py-6">
            <h2 className="text-3xl font-bold">What is ΊΣΟΣ?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 space-y-3">
                <Zap className="text-[#C9A24B] w-8 h-8" />
                <h3 className="text-xl font-bold">Predictive Load Curves</h3>
                <p className="text-sm text-slate-400">Models hourly demand spikes across facilities using historical patterns.</p>
              </div>
              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 space-y-3">
                <Activity className="text-[#C9A24B] w-8 h-8" />
                <h3 className="text-xl font-bold">Dynamic Tariff Optimization</h3>
                <p className="text-sm text-slate-400">Automatically switches battery storage when local tariffs peak.</p>
              </div>
              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 space-y-3">
                <Shield className="text-[#C9A24B] w-8 h-8" />
                <h3 className="text-xl font-bold">Autonomous Grid Balancing</h3>
                <p className="text-sm text-slate-400">Keeps regional transformer nodes balanced to prevent brownouts.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-8 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <h2 className="text-2xl font-bold">Chennai Regional Telemetry</h2>
                <p className="text-sm text-slate-400">Real-time load profiles and live recommendation engine.</p>
              </div>
              <select 
                value={selectedSite} 
                onChange={(e) => setSelectedSite(e.target.value)}
                className="bg-[#07141C] border border-[#C9A24B]/40 rounded-lg px-4 py-2 text-[#F2F0EA]"
              >
                {sites.map(site => (
                  <option key={site.id} value={site.id}>{site.name} ({site.locality})</option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40">
                <span className="text-xs text-slate-400 uppercase font-mono">Current Demand</span>
                <div className="text-3xl font-extrabold text-[#C9A24B] mt-2">{activeReading.demand_kw} <span className="text-sm font-normal text-slate-300">kW</span></div>
              </div>
              <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40">
                <span className="text-xs text-slate-400 uppercase font-mono">Live Tariff Rate</span>
                <div className="text-3xl font-extrabold text-[#F2F0EA] mt-2">₹{activeReading.tariff_rate} <span className="text-sm font-normal text-slate-300">/kWh</span></div>
              </div>
              <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40">
                <span className="text-xs text-slate-400 uppercase font-mono">Solar Generation</span>
                <div className="text-3xl font-extrabold text-emerald-400 mt-2">{activeReading.solar_output_kw} <span className="text-sm font-normal text-slate-300">kW</span></div>
              </div>
              <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40">
                <span className="text-xs text-slate-400 uppercase font-mono">Grid State</span>
                <div className="text-xl font-bold text-[#C9A24B] mt-3 uppercase tracking-wider">{activeReading.grid_status}</div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-[#C9A24B]/30 bg-[#07141C] space-y-3">
              <span className="text-xs font-mono uppercase text-[#C9A24B]">Active System Advisory</span>
              <p className="text-lg font-medium">{activeReading.recommendation_text}</p>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="space-y-12 py-6">
            <h2 className="text-3xl font-bold text-center">Platform Plans & Tiers</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-6">
                <h3 className="text-xl font-bold">Residential RWA</h3>
                <div className="text-4xl font-extrabold">₹4,999 <span className="text-sm font-normal text-slate-400">/ mo</span></div>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9A24B]" /> Up to 500 kW capacity</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9A24B]" /> Community Solar Balance</li>
                </ul>
              </div>
              <div className="p-8 rounded-2xl border border-[#C9A24B] bg-slate-900/90 space-y-6">
                <h3 className="text-xl font-bold">Commercial Campus</h3>
                <div className="text-4xl font-extrabold">₹18,999 <span className="text-sm font-normal text-slate-400">/ mo</span></div>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9A24B]" /> Up to 2,000 kW capacity</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9A24B]" /> Real-time Supabase Telemetry</li>
                </ul>
              </div>
              <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-6">
                <h3 className="text-xl font-bold">Industrial Node</h3>
                <div className="text-4xl font-extrabold">Custom</div>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9A24B]" /> Multi-site Transformer Relay</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'signup' && (
          <div className="max-w-md mx-auto py-12 space-y-6">
            <h2 className="text-2xl font-bold text-center">Access ΊΣΟΣ Platform</h2>
            <form className="space-y-4 bg-slate-900/50 p-6 rounded-xl border border-slate-800" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-xs uppercase font-mono text-slate-400">Email Address</label>
                <input type="email" placeholder="name@organization.com" className="w-full mt-1 px-4 py-2 bg-[#07141C] border border-slate-700 rounded-lg text-sm text-[#F2F0EA]" />
              </div>
              <div>
                <label className="text-xs uppercase font-mono text-slate-400">Password</label>
                <input type="password" placeholder="••••••••" className="w-full mt-1 px-4 py-2 bg-[#07141C] border border-slate-700 rounded-lg text-sm text-[#F2F0EA]" />
              </div>
              <button className="w-full py-3 bg-[#C9A24B] text-[#0B1F2A] font-bold rounded-lg hover:bg-[#b5903f]">Sign In / Register</button>
            </form>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="max-w-3xl mx-auto py-6 space-y-6">
            <h2 className="text-3xl font-bold border-b border-slate-800 pb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="p-5 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2">
                <h3 className="font-bold">How does ΊΣΟΣ process local grid data?</h3>
                <p className="text-sm text-slate-400">Telemetry is gathered from site meters and synced to Supabase every 15 minutes.</p>
              </div>
              <div className="p-5 rounded-lg border border-slate-800 bg-slate-900/40 space-y-2">
                <h3 className="font-bold">Are the Chennai site locations live?</h3>
                <p className="text-sm text-slate-400">Yes, ΊΣΟΣ models real Chennai localities including Adyar, OMR, Anna Nagar, Oragadam, and T. Nagar.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-3xl mx-auto py-8 space-y-8">
            <div className="border-b border-[#C9A24B]/30 pb-6 space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#C9A24B] font-mono">Brand & Origins</span>
              <h2 className="text-4xl font-extrabold">Nothing Creations</h2>
              <p className="text-lg text-slate-300 italic">"Engineering clarity from zero."</p>
            </div>
            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#F2F0EA]">Prasannakumar V</h3>
                <p className="text-xs font-mono text-[#C9A24B]">Founder & Lead Systems Architect</p>
                <p className="text-xs text-slate-400">Department of Computer Science (Cloud Computing), SRM Institute of Science and Technology, Ramapuram Campus</p>
              </div>
              <blockquote className="border-l-2 border-[#C9A24B] pl-4 text-slate-300 italic">
                "Energy isn't just power flowing through a grid; it's data waiting for direction."
              </blockquote>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800 py-6 px-6 text-center text-xs text-slate-500">
        © 2026 ΊΣΟΣ Platform by Nothing Creations. Built for Yuva Yodha Energy Tech Hackathon.
      </footer>
    </div>
  );
}
