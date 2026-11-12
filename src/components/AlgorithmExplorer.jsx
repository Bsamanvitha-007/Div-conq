import React, { useState } from 'react';
import { algorithmsData } from '../data/algorithmsData';
import { 
  Cpu, 
  Split, 
  Navigation, 
  CheckCircle2, 
  Zap, 
  Layers, 
  ArrowRight, 
  AlertCircle,
  Sparkles,
  Server,
  Radio
} from 'lucide-react';

export const AlgorithmExplorer = ({ selectedAlgoId = 'closest-pair', onSelectAlgo, onLaunchSimulation }) => {
  const [internalTab, setInternalTab] = useState('closest-pair');
  const [mstMode, setMstMode] = useState('kruskal'); // 'prim' or 'kruskal'

  const activeTab = selectedAlgoId || internalTab;

  const handleTabClick = (id) => {
    setInternalTab(id);
    if (onSelectAlgo) onSelectAlgo(id);
  };

  const currentAlgo = algorithmsData.find(a => a.id === activeTab) || algorithmsData[0];


  const getAlgoIcon = (id) => {
    switch (id) {
      case 'closest-pair': return Split;
      case 'job-sequencing': return Server;
      case 'mst': return Radio;
      case 'dijkstra': return Navigation;
      default: return Cpu;
    }
  };

  const getBadgeStyle = (color) => {
    switch (color) {
      case 'cyan': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40';
      case 'violet': return 'bg-violet-500/10 text-violet-400 border-violet-500/40';
      case 'emerald': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40';
      case 'amber': return 'bg-amber-500/10 text-amber-400 border-amber-500/40';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="algorithms" className="py-24 bg-[#070B14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            SECTION 02 • ALGORITHM EXPLORER
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Algorithmic Deep-Dive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">Control Panel</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Select an algorithm from the vertical navigation console to inspect its mathematical formulation,
            geometric or graph visualization, and academic application in ride-hailing services.
          </p>
        </div>

        {/* Master Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Vertical Algorithm Selector Navigation */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400 px-2 mb-2 flex items-center justify-between">
              <span>ALGORITHM REPOSITORY</span>
              <span>4 TOPICS</span>
            </div>

            {algorithmsData.map((algo) => {
              const Icon = getAlgoIcon(algo.id);
              const isActive = activeTab === algo.id;

              return (
                <button
                  key={algo.id}
                  onClick={() => handleTabClick(algo.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                    isActive
                      ? 'bg-slate-900/90 border-cyan-500/70 shadow-xl shadow-cyan-950/40'
                      : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700'
                  }`}
                >
                  {/* Left Active Edge Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-400 to-violet-400" />
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40'
                          : 'bg-slate-800/60 text-slate-400 group-hover:text-slate-200'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-slate-500">{algo.number}</span>
                          <span className="font-heading font-bold text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors">
                            {algo.shortName}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 line-clamp-1 font-sans">
                          {algo.application}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono">
                    <span className={`px-2 py-0.5 rounded border text-[10px] font-semibold ${getBadgeStyle(algo.categoryColor)}`}>
                      {algo.badge}
                    </span>
                    <span className="text-slate-400">{algo.complexity.time}</span>
                  </div>
                </button>
              );
            })}

            {/* Quick action button to launch full interactive simulation */}
            <div className="pt-4">
              <button
                onClick={() => onLaunchSimulation && onLaunchSimulation(currentAlgo.id)}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl font-mono text-xs font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/50 hover:border-cyan-400 transition-all shadow-lg shadow-cyan-950/30"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Simulate {currentAlgo.shortName} Step-by-Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Large Dynamic Visualization & Deep Information Panel */}
          <div className="lg:col-span-8 rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-8 text-left">
            
            {/* Header / Meta bar */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-6">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border tracking-wider uppercase ${getBadgeStyle(currentAlgo.categoryColor)}`}>
                    {currentAlgo.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
                    {currentAlgo.systemStage}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                  {currentAlgo.name}
                </h3>
                <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Applied To: {currentAlgo.application}</span>
                </div>
              </div>

              {/* Time Complexity Quick Pill */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-right">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Time Complexity</div>
                <div className="text-lg font-mono font-bold text-cyan-300">{currentAlgo.complexity.time}</div>
                <div className="text-[10px] font-mono text-slate-400">Space: {currentAlgo.complexity.space}</div>
              </div>
            </div>

            {/* Problem Statement & Optimization Goal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-sky-400" />
                  Problem Being Solved
                </span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                  {currentAlgo.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Optimization Goal
                </span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                  {currentAlgo.goal}
                </p>
              </div>
            </div>

            {/* Academic Nuance Disclaimer Banner */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-900/40 text-xs text-slate-300 space-y-1 font-sans">
              <div className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                Academic Rigor &amp; Modeling Context
              </div>
              <p className="text-slate-400">
                This algorithm <strong className="text-cyan-300">{currentAlgo.wording}</strong>. {currentAlgo.academicDisclaimer}
              </p>
            </div>

            {/* Dynamic Interactive Visual Component (per algorithm) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  Visual Interactive Model
                </span>
                {currentAlgo.id === 'mst' && (
                  <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono">
                    <button
                      onClick={() => setMstMode('kruskal')}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        mstMode === 'kruskal' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      KRUSKAL'S TAB
                    </button>
                    <button
                      onClick={() => setMstMode('prim')}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        mstMode === 'prim' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      PRIM'S TAB
                    </button>
                  </div>
                )}
              </div>

              {/* Render specific diagram based on active algorithm */}
              {currentAlgo.id === 'closest-pair' && (
                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                  <div className="relative aspect-[16/9] max-h-[300px] w-full rounded-lg bg-[#070B14] overflow-hidden border border-slate-800/80">
                    <svg className="w-full h-full" viewBox="0 0 500 280">
                      {/* Grid */}
                      <defs>
                        <pattern id="cp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56, 189, 248, 0.05)" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#cp-grid)" />

                      {/* Median Divide Line */}
                      <line x1="250" y1="10" x2="250" y2="270" stroke="#00F0FF" strokeDasharray="4 4" strokeWidth="2" />
                      <text x="255" y="26" fill="#00F0FF" fontSize="11" fontFamily="JetBrains Mono" fontWeight="600">
                        x_mid = 250 (Divide)
                      </text>

                      {/* 2*Delta Strip Corridor */}
                      <rect x="180" y="10" width="140" height="260" fill="rgba(0, 240, 255, 0.05)" stroke="rgba(0, 240, 255, 0.2)" strokeDasharray="2 2" />
                      <text x="185" y="260" fill="#38BDF8" fontSize="10" fontFamily="JetBrains Mono">
                        2δ Strip Corridor
                      </text>

                      {/* Left Region Label */}
                      <text x="50" y="30" fill="#94A3B8" fontSize="12" fontFamily="Space Grotesk">
                        Region L (δ_L = 2.4 km)
                      </text>
                      {/* Right Region Label */}
                      <text x="350" y="30" fill="#94A3B8" fontSize="12" fontFamily="Space Grotesk">
                        Region R (δ_R = 2.3 km)
                      </text>

                      {/* Points */}
                      {/* Drivers */}
                      <g transform="translate(100, 90)">
                        <circle r="7" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
                        <text x="12" y="4" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">D1 (4.2km)</text>
                      </g>
                      <g transform="translate(140, 200)">
                        <circle r="7" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
                        <text x="12" y="4" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">D4 (3.9km)</text>
                      </g>
                      <g transform="translate(410, 80)">
                        <circle r="7" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
                        <text x="12" y="4" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">D3 (6.1km)</text>
                      </g>
                      <g transform="translate(380, 210)">
                        <circle r="7" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
                        <text x="12" y="4" fill="#94A3B8" fontSize="10" fontFamily="JetBrains Mono">D5 (5.4km)</text>
                      </g>

                      {/* Closest Pair Match (inside strip) */}
                      <line x1="220" y1="140" x2="270" y2="155" stroke="#00F0FF" strokeWidth="3" className="animate-dash-stream" />
                      <g transform="translate(220, 140)">
                        <circle r="12" fill="rgba(0, 240, 255, 0.2)" className="animate-ping" />
                        <circle r="8" fill="#0C4A6E" stroke="#00F0FF" strokeWidth="2.5" />
                        <text x="-28" y="-12" fill="#00F0FF" fontSize="11" fontFamily="JetBrains Mono" fontWeight="700">D2 (1.8km)</text>
                      </g>
                      <g transform="translate(270, 155)">
                        <circle r="12" fill="rgba(16, 185, 129, 0.2)" className="animate-ping" />
                        <circle r="8" fill="#064E3B" stroke="#10B981" strokeWidth="2.5" />
                        <text x="14" y="4" fill="#34D399" fontSize="11" fontFamily="Space Grotesk" fontWeight="700">P (Pickup)</text>
                      </g>
                    </svg>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-300">
                    <span className="text-cyan-400 font-semibold">Closest Driver Found: Driver D2</span>
                    <span className="text-emerald-400 font-bold">Minimum Distance: 1.8 km</span>
                  </div>
                </div>
              )}

              {currentAlgo.id === 'job-sequencing' && (
                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-4">
                  <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                    <span>CLOUD RESOURCE POOL: 3 VIRTUAL MACHINE SLOTS</span>
                    <span className="text-violet-400 font-bold">MAXIMIZED UTILITY SCORE: ₹240</span>
                  </div>

                  {/* Slot Timeline Visual */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-violet-950/40 border border-violet-500/50">
                      <div className="text-[10px] font-mono text-violet-300 uppercase">VM Slot 1 (t = 1)</div>
                      <div className="font-heading font-bold text-base text-white mt-1">Job J2: Dispatch</div>
                      <div className="text-xs font-mono text-emerald-400 mt-1">Profit: ₹90 • Deadline: 1</div>
                      <div className="mt-2 text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">High Priority Assigned</div>
                    </div>

                    <div className="p-3 rounded-xl bg-violet-950/40 border border-violet-500/50">
                      <div className="text-[10px] font-mono text-violet-300 uppercase">VM Slot 2 (t = 2)</div>
                      <div className="font-heading font-bold text-base text-white mt-1">Job J1: Surge Matrix</div>
                      <div className="text-xs font-mono text-emerald-400 mt-1">Profit: ₹100 • Deadline: 2</div>
                      <div className="mt-2 text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">Scheduled at Latest Slot</div>
                    </div>

                    <div className="p-3 rounded-xl bg-violet-950/40 border border-violet-500/50">
                      <div className="text-[10px] font-mono text-violet-300 uppercase">VM Slot 3 (t = 3)</div>
                      <div className="font-heading font-bold text-base text-white mt-1">Job J4: Ingest Worker</div>
                      <div className="text-xs font-mono text-emerald-400 mt-1">Profit: ₹50 • Deadline: 3</div>
                      <div className="mt-2 text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">Assigned to Slot 3</div>
                    </div>
                  </div>

                  {/* Rejected Tasks Backlog Chips */}
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-red-500/20 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                    <span className="text-red-400 font-semibold uppercase flex items-center gap-1">
                      <span>Rejected Task Backlog:</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-0.5 rounded bg-red-950/40 text-red-300 border border-red-500/30">
                        J3: ETA Refresh (₹70, D:2) — Slots 1 &amp; 2 Full
                      </span>
                      <span className="px-2 py-0.5 rounded bg-red-950/40 text-red-300 border border-red-500/30">
                        J5: Log Sync (₹20, D:1) — Slot 1 Full
                      </span>
                    </div>
                  </div>

                  {/* Greedy Decision Rationale Log */}
                  <div className="rounded-lg bg-slate-900/60 p-3 text-xs font-mono text-slate-300 space-y-1 border border-slate-800/80">
                    <div className="text-slate-400 font-semibold mb-1">Greedy Step Execution Log:</div>
                    <div className="text-emerald-400">✓ 1. Pick highest profit J1 (₹100, D=2) → Assigned to latest free slot 2.</div>
                    <div className="text-emerald-400">✓ 2. Pick next highest J2 (₹90, D=1) → Assigned to latest free slot 1.</div>
                    <div className="text-red-400">✕ 3. Evaluate J3 (₹70, D=2) → Slots 1 and 2 occupied, deadline 2 expired → REJECT.</div>
                    <div className="text-emerald-400">✓ 4. Pick J4 (₹50, D=3) → Slot 3 is free → Assigned to slot 3.</div>
                    <div className="text-red-400">✕ 5. Evaluate J5 (₹20, D=1) → Slot 1 occupied → REJECT.</div>
                  </div>
                </div>
              )}


              {currentAlgo.id === 'mst' && (
                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-3">
                  <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                    <span>CELL TOWER FIBER BACKBONE INFRASTRUCTURE</span>
                    <span className="text-emerald-400 font-bold">MINIMAL CABLING COST: 10 UNITS</span>
                  </div>

                  {/* Graph Visual */}
                  <div className="relative aspect-[16/8] max-h-[260px] w-full rounded-lg bg-[#070B14] overflow-hidden border border-slate-800/80">
                    <svg className="w-full h-full" viewBox="0 0 500 240">
                      {/* Background Unselected Edges */}
                      <line x1="80" y1="60" x2="250" y2="50" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1.5" />
                      <line x1="250" y1="50" x2="140" y2="160" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1.5" />
                      <line x1="250" y1="50" x2="380" y2="130" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="140" y1="160" x2="260" y2="210" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />

                      {/* Selected MST Edges (Bold Glowing Green) */}
                      {/* A-C (wt 2) */}
                      <line x1="80" y1="60" x2="140" y2="160" stroke="#10B981" strokeWidth="3.5" />
                      {/* C-D (wt 3) */}
                      <line x1="140" y1="160" x2="380" y2="130" stroke="#10B981" strokeWidth="3.5" />
                      {/* D-E (wt 1) */}
                      <line x1="380" y1="130" x2="260" y2="210" stroke="#10B981" strokeWidth="3.5" />
                      {/* A-B (wt 4) */}
                      <line x1="80" y1="60" x2="250" y2="50" stroke="#10B981" strokeWidth="3.5" />

                      {/* Edge weight labels */}
                      <text x="100" y="115" fill="#34D399" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">2</text>
                      <text x="240" y="140" fill="#34D399" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">3</text>
                      <text x="325" y="180" fill="#34D399" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">1</text>
                      <text x="160" y="45" fill="#34D399" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">4</text>
                      <text x="310" y="80" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono">10 (Rejected)</text>
                      <text x="190" y="95" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono">5 (Cycle)</text>

                      {/* Towers / Vertices */}
                      {[
                        { id: 'A', x: 80, y: 60, name: 'Tower A (Hub)' },
                        { id: 'B', x: 250, y: 50, name: 'Tower B' },
                        { id: 'C', x: 140, y: 160, name: 'Tower C' },
                        { id: 'D', x: 380, y: 130, name: 'Tower D' },
                        { id: 'E', x: 260, y: 210, name: 'Tower E' }
                      ].map(t => (
                        <g key={t.id} transform={`translate(${t.x}, ${t.y})`}>
                          <circle r="12" fill="#064E3B" stroke="#10B981" strokeWidth="2.5" />
                          <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="Space Grotesk" fontWeight="bold">
                            {t.id}
                          </text>
                          <text x="16" y="4" fill="#A7F3D0" fontSize="10" fontFamily="Space Grotesk">
                            {t.name}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                    {mstMode === 'kruskal' ? (
                      <div>
                        <strong className="text-emerald-400">Kruskal Strategy:</strong> Global edge sorting + Disjoint Set Union (Union-Find).
                        Inspected edges: (D-E:1 accepted), (A-C:2 accepted), (C-D:3 accepted), (A-B:4 accepted). Edge (B-C:5) discarded due to cycle!
                      </div>
                    ) : (
                      <div>
                        <strong className="text-emerald-400">Prim Strategy:</strong> Local tree cut expansion starting at Tower A.
                        At each iteration, greedily pick minimum edge crossing cut S to V \ S until all 5 towers are spanned with 4 links.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentAlgo.id === 'dijkstra' && (
                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-3">
                  <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                    <span>ROAD INTERSECTION NAVIGATION GRAPH</span>
                    <span className="text-amber-400 font-bold">SHORTEST ROUTE FOUND: 10 KM</span>
                  </div>

                  {/* Road Network Visual */}
                  <div className="relative aspect-[16/8] max-h-[260px] w-full rounded-lg bg-[#070B14] overflow-hidden border border-slate-800/80">
                    <svg className="w-full h-full" viewBox="0 0 500 240">
                      {/* Unselected Road Segments */}
                      <line x1="80" y1="120" x2="200" y2="50" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1.5" />
                      <line x1="200" y1="190" x2="340" y2="60" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1.5" />
                      <line x1="200" y1="190" x2="420" y2="160" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1.5" />

                      {/* Optimal Illuminated Route: A -> C -> B -> D -> E */}
                      <path
                        d="M 80 120 L 200 190 L 200 50 L 340 60 L 420 160"
                        stroke="#F59E0B"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-dash-stream"
                      />

                      {/* Segment weight tags along optimal route */}
                      <text x="130" y="165" fill="#FCD34D" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">2 km (A-C)</text>
                      <text x="210" y="120" fill="#FCD34D" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">1 km (C-B)</text>
                      <text x="260" y="45" fill="#FCD34D" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">5 km (B-D)</text>
                      <text x="390" y="105" fill="#FCD34D" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">2 km (D-E)</text>

                      {/* Intersections */}
                      {[
                        { id: 'A', x: 80, y: 120, label: 'Origin (A)', settled: true, dist: '0 km' },
                        { id: 'B', x: 200, y: 50, label: 'Junction B', settled: true, dist: '3 km' },
                        { id: 'C', x: 200, y: 190, label: 'Junction C', settled: true, dist: '2 km' },
                        { id: 'D', x: 340, y: 60, label: 'Flyover D', settled: true, dist: '8 km' },
                        { id: 'E', x: 420, y: 160, label: 'Dest (E)', settled: true, dist: '10 km' }
                      ].map(n => (
                        <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                          <circle r="12" fill="#78350F" stroke="#F59E0B" strokeWidth="2.5" />
                          <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="Space Grotesk" fontWeight="bold">
                            {n.id}
                          </text>
                          <text x="16" y="-5" fill="#FDE68A" fontSize="10" fontFamily="Space Grotesk" fontWeight="600">
                            {n.label}
                          </text>
                          <text x="16" y="8" fill="#F59E0B" fontSize="9" fontFamily="JetBrains Mono">
                            dist: {n.dist}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>

                  {/* Distance Relaxation State Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[11px] font-mono">

                    <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="text-slate-500 text-[10px]">Intersection A</div>
                      <div className="text-amber-400 font-bold text-xs mt-0.5">dist[A] = 0</div>
                      <div className="text-[9px] text-emerald-400">Origin Settle</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="text-slate-500 text-[10px]">Intersection C</div>
                      <div className="text-amber-400 font-bold text-xs mt-0.5">dist[C] = 2</div>
                      <div className="text-[9px] text-slate-400">direct from A</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="text-slate-500 text-[10px]">Intersection B</div>
                      <div className="text-amber-400 font-bold text-xs mt-0.5">dist[B] = 3</div>
                      <div className="text-[9px] text-cyan-400">relaxed (via C)</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800">
                      <div className="text-slate-500 text-[10px]">Intersection D</div>
                      <div className="text-amber-400 font-bold text-xs mt-0.5">dist[D] = 8</div>
                      <div className="text-[9px] text-cyan-400">relaxed (via B)</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/90 border border-amber-500/40">
                      <div className="text-slate-500 text-[10px]">Destination E</div>
                      <div className="text-emerald-400 font-bold text-xs mt-0.5">dist[E] = 10</div>
                      <div className="text-[9px] text-emerald-400">relaxed (via D)</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                    <strong className="text-amber-400">Shortest Path Found:</strong> A → C → B → D → E (Total Cost: 10 km).
                    Dijkstra's greedy relaxation updated dist[B] via C (2+1=3 &lt; direct 4), and dist[E] via D (8+2=10 &lt; direct C→E of 12).
                  </div>
                </div>
              )}

            </div>

            {/* How It Works 4-Step Breakdown */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                ALGORITHMIC EXECUTION MECHANISM
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="text-[11px] font-mono text-cyan-400 font-semibold uppercase">01 • Phase 1</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{currentAlgo.idea.divide}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="text-[11px] font-mono text-cyan-400 font-semibold uppercase">02 • Phase 2</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{currentAlgo.idea.solve}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="text-[11px] font-mono text-cyan-400 font-semibold uppercase">03 • Phase 3</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{currentAlgo.idea.compare}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <div className="text-[11px] font-mono text-cyan-400 font-semibold uppercase">04 • Phase 4</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{currentAlgo.idea.combine}</p>
                </div>
              </div>
            </div>

            {/* Key Academic Takeaway */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs sm:text-sm">
                <strong className="text-cyan-300 font-heading block">Core Academic Insight:</strong>
                <p className="text-slate-300 leading-relaxed">
                  {currentAlgo.keyTakeaway}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
