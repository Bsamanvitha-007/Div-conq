import React, { useState } from 'react';
import { InteractiveCityMap } from './InteractiveCityMap';
import { 
  ArrowDown, 
  MapPin, 
  Route, 
  Clock, 
  Network, 
  ShieldCheck, 
  Cpu
} from 'lucide-react';


export const HeroSection = ({ onExploreClick }) => {
  const [activeDriverId, setActiveDriverId] = useState('D2');

  const driverStats = {
    D1: { dist: '4.2 km', eta: '12 min' },
    D2: { dist: '1.8 km', eta: '08 min' },
    D3: { dist: '5.1 km', eta: '15 min' },
    D4: { dist: '3.9 km', eta: '10 min' },
    D5: { dist: '4.8 km', eta: '13 min' }
  };

  const currentStats = driverStats[activeDriverId] || driverStats.D2;

  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Subtle Glow Spheres */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Context, and CTA */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Small label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 backdrop-blur-md text-cyan-300 text-xs font-mono tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>UNIT II • DIVIDE &amp; CONQUER + GREEDY</span>
            </div>

            {/* Main Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
                Algorithms Behind <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">
                  Every Ride
                </span>
              </h1>
              <p className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                THE ALGORITHM MOBILITY LAB • COMMAND CENTER
              </p>
            </div>

            {/* Supporting Text */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
              From finding nearby drivers to scheduling resources, connecting communication infrastructure, and calculating efficient routes — algorithms shape the technology behind modern mobility.
            </p>

            {/* Academic Rigor Callout */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-slate-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Academic Conceptual Modeling</span>
              </div>
              <p>
                Algorithms are presented as foundational theoretical models ("conceptually applies to", "helps explain") that illustrate algorithmic optimization in transport ecosystems.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#journey"
                onClick={onExploreClick}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-heading font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-sky-200 transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40"
              >
                <span>Explore the Algorithm Journey</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#simulation"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-heading font-medium text-sm text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all duration-200"
              >
                <Cpu className="w-4 h-4 text-violet-400" />
                <span>Live Simulation Lab</span>
              </a>
            </div>

            {/* Quick Algorithm Anchor Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-mono text-slate-400">
              <span className="text-slate-500 uppercase tracking-wider">Features:</span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/20 text-cyan-300">01 Closest Pair</span>
              <span className="px-2 py-0.5 rounded bg-violet-950/50 border border-violet-500/20 text-violet-300">02 Job Sequencing</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/20 text-emerald-300">03 MST (Prim &amp; Kruskal)</span>
              <span className="px-2 py-0.5 rounded bg-amber-950/50 border border-amber-500/20 text-amber-300">04 Dijkstra</span>
            </div>
          </div>

          {/* Right Column: Dynamic Interactive City Map & Floating Telemetry Panels */}
          <div className="lg:col-span-6 relative">
            {/* The 4 Floating Telemetry Panels */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {/* Panel 1: Nearest Driver */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-950/20 text-left">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">Nearest Driver</span>
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="text-xl font-bold font-mono text-white tracking-tight">
                  {currentStats.dist}
                </div>
                <div className="text-[10px] font-mono text-cyan-400/90 mt-0.5">
                  Divide &amp; Conquer
                </div>
              </div>

              {/* Panel 2: Route */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/30 backdrop-blur-md shadow-lg text-left">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">Route</span>
                  <Route className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-xl font-bold font-mono text-white tracking-tight">
                  12.4 km
                </div>
                <div className="text-[10px] font-mono text-amber-400/90 mt-0.5">
                  Dijkstra Shortest Path
                </div>
              </div>

              {/* Panel 3: ETA */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-violet-500/30 backdrop-blur-md shadow-lg text-left">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">ETA</span>
                  <Clock className="w-3.5 h-3.5 text-violet-400" />
                </div>
                <div className="text-xl font-bold font-mono text-white tracking-tight">
                  {currentStats.eta}
                </div>
                <div className="text-[10px] font-mono text-violet-400/90 mt-0.5">
                  Resource Scheduled
                </div>
              </div>

              {/* Panel 4: Network */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md shadow-lg text-left">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">Network</span>
                  <Network className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-base font-bold font-mono text-emerald-300 tracking-tight leading-7">
                  OPTIMIZED
                </div>
                <div className="text-[10px] font-mono text-emerald-400/90 mt-0.5">
                  MST Tower Backbone
                </div>
              </div>
            </div>

            {/* Interactive City Map */}
            <InteractiveCityMap 
              activeDriverId={activeDriverId} 
              onSelectDriver={(id) => setActiveDriverId(id)} 
            />

            {/* Driver Fleet Selector Sub-bar */}
            <div className="mt-3 flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
              <span className="font-mono text-[11px] text-slate-400">Select driver to simulate distance:</span>
              <div className="flex items-center gap-1.5">
                {['D1', 'D2', 'D3', 'D4', 'D5'].map(id => (
                  <button
                    key={id}
                    onClick={() => setActiveDriverId(id)}
                    className={`px-2 py-0.5 rounded font-mono text-[11px] transition-colors ${
                      activeDriverId === id
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-400/30'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
