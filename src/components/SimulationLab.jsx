import React, { useState, useEffect } from 'react';
import { simulationData } from '../data/simulationData';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  SkipBack, 
  Terminal, 
  Activity, 
  Radio, 
  Split, 
  Server, 
  Navigation
} from 'lucide-react';


export const SimulationLab = ({ defaultAlgo = 'closest-pair' }) => {
  const [activeAlgo, setActiveAlgo] = useState(defaultAlgo);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1); // 0.5x, 1x, 2x

  const simConfig = simulationData[activeAlgo] || simulationData['closest-pair'];
  const totalSteps = simConfig.steps.length;
  const currentStep = simConfig.steps[currentStepIndex] || simConfig.steps[0];

  // Auto-play interval effect
  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      const intervalMs = Math.round(2000 / speed);
      timer = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < totalSteps - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, intervalMs);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, totalSteps, speed]);

  // Reset when algorithm changes
  const handleSelectAlgorithm = (algoKey) => {
    setIsPlaying(false);
    setActiveAlgo(algoKey);
    setCurrentStepIndex(0);
  };

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const algoOptions = [
    { key: 'closest-pair', name: 'Closest Pair', icon: Split, color: 'cyan' },
    { key: 'job-sequencing', name: 'Job Sequencing', icon: Server, color: 'violet' },
    { key: 'prims', name: "Prim's MST", icon: Radio, color: 'emerald' },
    { key: 'kruskals', name: "Kruskal's MST", icon: Radio, color: 'emerald' },
    { key: 'dijkstra', name: "Dijkstra's Path", icon: Navigation, color: 'amber' }
  ];

  return (
    <section id="simulation" className="py-24 bg-[#090D18] relative border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-500/30 text-violet-400 text-xs font-mono tracking-widest uppercase">
            SECTION 03 • INTERACTIVE SIMULATION LAB
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Live Algorithm <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400">Simulation Lab</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Witness the exact step-by-step mathematical state transitions of each algorithm. 
            Play, pause, advance discrete iterations, and inspect the real-time execution log.
          </p>
        </div>

        {/* Algorithm Switcher Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {algoOptions.map(opt => {
            const Icon = opt.icon;
            const isSelected = activeAlgo === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => handleSelectAlgorithm(opt.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 text-cyan-300 border-2 border-cyan-400/80 shadow-lg shadow-cyan-950/40 scale-105'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                <span>{opt.name}</span>
              </button>
            );
          })}
        </div>

        {/* Simulation Control Deck */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          
          {/* Top Bar: Title, Step Counter, Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
            <div className="text-left">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="uppercase">{simConfig.algorithm}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mt-0.5">
                {simConfig.title}
              </h3>
            </div>

            {/* Playback Controls */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-slate-950/80 p-2 rounded-xl border border-slate-800">
              {/* Prev */}
              <button
                onClick={handlePrevStep}
                disabled={currentStepIndex === 0}
                className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Step Backward"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              {/* Play / Pause */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-mono text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-md shadow-cyan-500/20"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>PAUSE</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>START</span>
                  </>
                )}
              </button>

              {/* Next */}
              <button
                onClick={handleNextStep}
                disabled={currentStepIndex === totalSteps - 1}
                className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Step Forward"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              {/* Reset */}
              <button
                onClick={handleReset}
                className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Reset to Step 0"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Speed Selector */}
              <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-slate-800 text-[11px] font-mono text-slate-400">
                <span>Speed:</span>
                {[0.5, 1, 2].map(spd => (
                  <button
                    key={spd}
                    onClick={() => setSpeed(spd)}
                    className={`px-1.5 py-0.5 rounded transition-colors ${
                      speed === spd ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/40' : 'hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step Progress Track & Direct Step Jump Pills */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-white font-semibold">{currentStep.label}</span>
              <span className="text-cyan-400">Iteration {currentStepIndex + 1} of {totalSteps}</span>
            </div>
            
            {/* Continuous Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
              />
            </div>

            {/* Direct Step Jump Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase mr-1">Jump to Step:</span>
              {simConfig.steps.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStepIndex(idx);
                  }}
                  className={`px-2 py-1 rounded font-mono text-[10px] transition-all cursor-pointer ${
                    currentStepIndex === idx
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-400/40'
                      : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  Step {s.step}
                </button>
              ))}
            </div>
          </div>


          {/* Canvas Render Area + Telemetry HUD */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Visual Canvas (8 Cols) */}
            <div className="lg:col-span-8 rounded-xl bg-slate-950 border border-slate-800 p-4 relative overflow-hidden min-h-[320px] flex items-center justify-center">
              
              {/* Closest Pair Canvas */}
              {activeAlgo === 'closest-pair' && (
                <svg className="w-full h-[280px]" viewBox="0 0 400 280">
                  <defs>
                    <pattern id="sim-cp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56, 189, 248, 0.05)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#sim-cp-grid)" />

                  {/* Partition Line */}
                  {currentStep.splitLine && (
                    <g>
                      <line x1={currentStep.splitLine} y1="10" x2={currentStep.splitLine} y2="270" stroke="#00F0FF" strokeDasharray="4 4" strokeWidth="2" />
                      <text x={currentStep.splitLine + 6} y="25" fill="#00F0FF" fontSize="10" fontFamily="JetBrains Mono">
                        x_mid = 175
                      </text>
                    </g>
                  )}

                  {/* Strip Zone */}
                  {currentStep.strip && (
                    <g>
                      <rect 
                        x={currentStep.strip.left} 
                        y="10" 
                        width={currentStep.strip.right - currentStep.strip.left} 
                        height="260" 
                        fill="rgba(0, 240, 255, 0.08)" 
                        stroke="#00F0FF" 
                        strokeDasharray="2 2" 
                      />
                      <text x={currentStep.strip.left + 5} y="265" fill="#38BDF8" fontSize="9" fontFamily="JetBrains Mono">
                        2δ Strip
                      </text>
                    </g>
                  )}

                  {/* Connecting line for closest pair */}
                  {currentStep.closestPair && (
                    (() => {
                      const p1 = simConfig.points.find(p => p.id === currentStep.closestPair[0]);
                      const p2 = simConfig.points.find(p => p.id === currentStep.closestPair[1]);
                      if (p1 && p2) {
                        return (
                          <line 
                            x1={p1.x} 
                            y1={p1.y} 
                            x2={p2.x} 
                            y2={p2.y} 
                            stroke="#00F0FF" 
                            strokeWidth="3" 
                            className="animate-dash-stream" 
                          />
                        );
                      }
                      return null;
                    })()
                  )}

                  {/* Points */}
                  {simConfig.points.map(pt => {
                    const isPassenger = pt.type === 'passenger';
                    const isInPair = currentStep.closestPair && currentStep.closestPair.includes(pt.id);

                    return (
                      <g key={pt.id} transform={`translate(${pt.x}, ${pt.y})`}>
                        {isInPair && (
                          <circle r="14" fill="rgba(0, 240, 255, 0.25)" className="animate-ping" />
                        )}
                        <circle
                          r={isPassenger ? 9 : 7}
                          fill={isPassenger ? '#064E3B' : isInPair ? '#083344' : '#1E293B'}
                          stroke={isPassenger ? '#10B981' : isInPair ? '#00F0FF' : '#64748B'}
                          strokeWidth={isInPair ? 2.5 : 1.5}
                        />
                        <text
                          x={10}
                          y={3}
                          fill={isPassenger ? '#34D399' : isInPair ? '#00F0FF' : '#94A3B8'}
                          fontSize="9"
                          fontFamily="JetBrains Mono"
                          fontWeight={isInPair ? 'bold' : 'normal'}
                        >
                          {pt.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              )}

              {/* Job Sequencing Canvas */}
              {activeAlgo === 'job-sequencing' && (
                <div className="w-full space-y-5 p-2">
                  <div className="grid grid-cols-3 gap-3">
                    {[0, 1, 2].map(slotIdx => {
                      const jobId = currentStep.schedule[slotIdx];
                      const jobObj = simConfig.jobs.find(j => j.id === jobId);

                      return (
                        <div 
                          key={slotIdx}
                          className={`p-4 rounded-xl border transition-all ${
                            jobObj 
                              ? 'bg-violet-950/40 border-violet-500/60 shadow-lg shadow-violet-950/30' 
                              : 'bg-slate-900/40 border-slate-800 border-dashed'
                          }`}
                        >
                          <div className="text-[10px] font-mono text-slate-400 uppercase">
                            Slot {slotIdx + 1} (t = {slotIdx + 1})
                          </div>
                          {jobObj ? (
                            <div className="mt-2 space-y-1">
                              <div className="font-heading font-bold text-white text-sm sm:text-base">
                                {jobObj.id}: {jobObj.name}
                              </div>
                              <div className="text-xs font-mono text-emerald-400 font-semibold">
                                Profit: ₹{jobObj.profit} • Deadline: {jobObj.deadline}
                              </div>
                              <div className="text-[10px] font-mono text-violet-300 bg-slate-900/80 px-2 py-0.5 rounded inline-block mt-1">
                                Assigned
                              </div>
                            </div>
                          ) : (
                            <div className="py-5 text-xs font-mono text-slate-500">
                              [ Slot Empty ]
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Active Job Candidate Being Evaluated */}
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Current Greedy Evaluation:</span>
                    <span className="text-cyan-300 font-bold">{currentStep.action}</span>
                  </div>
                </div>
              )}

              {/* Prim's & Kruskal's MST Canvas */}
              {(activeAlgo === 'prims' || activeAlgo === 'kruskals') && (
                <svg className="w-full h-[280px]" viewBox="0 0 380 280">
                  {/* All Edges */}
                  {simConfig.allEdges.map((edge, idx) => {
                    const u = simConfig.nodes.find(n => n.id === edge.u);
                    const v = simConfig.nodes.find(n => n.id === edge.v);
                    if (!u || !v) return null;

                    const isInMst = currentStep.mstEdges && currentStep.mstEdges.some(e => 
                      (e.u === edge.u && e.v === edge.v) || (e.u === edge.v && e.v === edge.u)
                    );
                    const isRejected = currentStep.rejectedEdges && currentStep.rejectedEdges.some(e => 
                      (e.u === edge.u && e.v === edge.v) || (e.u === edge.v && e.v === edge.u)
                    );

                    return (
                      <g key={idx}>
                        <line
                          x1={u.x}
                          y1={u.y}
                          x2={v.x}
                          y2={v.y}
                          stroke={isInMst ? '#10B981' : isRejected ? '#EF4444' : 'rgba(148, 163, 184, 0.2)'}
                          strokeWidth={isInMst ? 3.5 : isRejected ? 2 : 1.5}
                          strokeDasharray={isRejected ? '4 3' : 'none'}
                        />
                        {/* Midpoint Weight Tag */}
                        <circle
                          cx={(u.x + v.x) / 2}
                          cy={(u.y + v.y) / 2}
                          r="9"
                          fill="#0F172A"
                          stroke={isInMst ? '#10B981' : isRejected ? '#EF4444' : '#475569'}
                          strokeWidth="1"
                        />
                        <text
                          x={(u.x + v.x) / 2}
                          y={(u.y + v.y) / 2 + 3}
                          textAnchor="middle"
                          fill={isInMst ? '#34D399' : isRejected ? '#F87171' : '#94A3B8'}
                          fontSize="9"
                          fontFamily="JetBrains Mono"
                          fontWeight="bold"
                        >
                          {edge.weight}
                        </text>
                      </g>
                    );
                  })}

                  {/* Nodes */}
                  {simConfig.nodes.map(n => {
                    const isVisited = currentStep.visitedNodes ? currentStep.visitedNodes.includes(n.id) : true;
                    return (
                      <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                        <circle
                          r="13"
                          fill={isVisited ? '#064E3B' : '#1E293B'}
                          stroke={isVisited ? '#10B981' : '#64748B'}
                          strokeWidth="2"
                        />
                        <text
                          x="0"
                          y="4"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="10"
                          fontFamily="Space Grotesk"
                          fontWeight="bold"
                        >
                          {n.id}
                        </text>
                        <text
                          x="16"
                          y="4"
                          fill={isVisited ? '#A7F3D0' : '#64748B'}
                          fontSize="9"
                          fontFamily="Space Grotesk"
                        >
                          {n.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              )}

              {/* Dijkstra's Algorithm Canvas */}
              {activeAlgo === 'dijkstra' && (
                <svg className="w-full h-[280px]" viewBox="0 0 440 310">
                  {/* Edges */}
                  {simConfig.edges.map((edge, idx) => {
                    const u = simConfig.nodes.find(n => n.id === edge.from);
                    const v = simConfig.nodes.find(n => n.id === edge.to);
                    if (!u || !v) return null;

                    // Check if edge is along active settled route
                    const inRoute = currentStep.activeRoute && (
                      currentStep.activeRoute.includes(edge.from) && 
                      currentStep.activeRoute.includes(edge.to) &&
                      Math.abs(currentStep.activeRoute.indexOf(edge.from) - currentStep.activeRoute.indexOf(edge.to)) === 1
                    );

                    return (
                      <g key={idx}>
                        <line
                          x1={u.x}
                          y1={u.y}
                          x2={v.x}
                          y2={v.y}
                          stroke={inRoute ? '#F59E0B' : 'rgba(148, 163, 184, 0.2)'}
                          strokeWidth={inRoute ? 3.5 : 1.5}
                        />
                        <circle
                          cx={(u.x + v.x) / 2}
                          cy={(u.y + v.y) / 2}
                          r="8"
                          fill="#0F172A"
                          stroke={inRoute ? '#F59E0B' : '#475569'}
                          strokeWidth="1"
                        />
                        <text
                          x={(u.x + v.x) / 2}
                          y={(u.y + v.y) / 2 + 3}
                          textAnchor="middle"
                          fill={inRoute ? '#FCD34D' : '#94A3B8'}
                          fontSize="8"
                          fontFamily="JetBrains Mono"
                          fontWeight="bold"
                        >
                          {edge.weight}
                        </text>
                      </g>
                    );
                  })}

                  {/* Nodes */}
                  {simConfig.nodes.map(n => {
                    const isSettled = currentStep.settled.includes(n.id);
                    const isCurrent = currentStep.currentNode === n.id;
                    const tentativeDist = currentStep.distances[n.id];

                    return (
                      <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                        {isCurrent && (
                          <circle r="18" fill="rgba(245, 158, 11, 0.25)" className="animate-ping" />
                        )}
                        <circle
                          r="13"
                          fill={isSettled ? '#78350F' : '#1E293B'}
                          stroke={isCurrent ? '#F59E0B' : isSettled ? '#D97706' : '#64748B'}
                          strokeWidth={isSettled ? 2.5 : 1.5}
                        />
                        <text
                          x="0"
                          y="4"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="10"
                          fontFamily="Space Grotesk"
                          fontWeight="bold"
                        >
                          {n.id}
                        </text>
                        {/* Distance Label Badge */}
                        <rect
                          x="16"
                          y="-8"
                          width="44"
                          height="16"
                          rx="4"
                          fill="#020617"
                          stroke={isSettled ? '#F59E0B' : '#334155'}
                          strokeWidth="1"
                        />
                        <text
                          x="38"
                          y="4"
                          textAnchor="middle"
                          fill={isSettled ? '#FCD34D' : '#94A3B8'}
                          fontSize="9"
                          fontFamily="JetBrains Mono"
                          fontWeight="bold"
                        >
                          d: {tentativeDist}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              )}

            </div>

            {/* Right Telemetry & Execution Log (4 Cols) */}
            <div className="lg:col-span-4 space-y-4 text-left flex flex-col justify-between">
              
              {/* Telemetry HUD Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 uppercase">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    Live Step Telemetry
                  </span>
                  <span className="text-cyan-400 font-bold">STATE SNAPSHOT</span>
                </div>

                <div className="space-y-2.5 font-mono text-xs">
                  {Object.entries(currentStep.telemetry).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="text-white font-semibold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Execution Console Terminal */}
              <div className="p-4 rounded-xl bg-[#030712] border border-slate-800 space-y-2 font-mono flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-900 pb-2 mb-2">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Terminal className="w-3.5 h-3.5" />
                      ALGO KERNEL LOG
                    </span>
                    <span className="text-[10px] text-slate-500">EXEC_T_{currentStepIndex}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    {currentStep.log}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Unit II State Machine</span>
                  <span className="text-emerald-400">Deterministic</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
