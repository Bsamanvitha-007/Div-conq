import React, { useState } from 'react';
import { journeySteps } from '../data/journeyData';
import { 
  ArrowRight, 
  Smartphone, 
  MapPin, 
  Cpu, 
  Radio, 
  Navigation, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';


export const JourneySection = ({ onSelectAlgorithm }) => {
  const [selectedStepIndex, setSelectedStepIndex] = useState(1); // default to MATCH

  const activeStep = journeySteps[selectedStepIndex];

  const getStepIcon = (id) => {
    switch (id) {
      case 'request': return Smartphone;
      case 'match': return MapPin;
      case 'schedule': return Cpu;
      case 'connect': return Radio;
      case 'route': return Navigation;
      case 'arrive': return CheckCircle2;
      default: return Sparkles;
    }
  };

  const getStepColorClass = (color, isActive) => {
    if (!isActive) return 'text-slate-400 border-slate-800 bg-slate-900/60 hover:border-slate-700';
    switch (color) {
      case 'cyan': return 'text-cyan-300 border-cyan-500 bg-cyan-950/50 shadow-lg shadow-cyan-500/20';
      case 'violet': return 'text-violet-300 border-violet-500 bg-violet-950/50 shadow-lg shadow-violet-500/20';
      case 'emerald': return 'text-emerald-300 border-emerald-500 bg-emerald-950/50 shadow-lg shadow-emerald-500/20';
      case 'amber': return 'text-amber-300 border-amber-500 bg-amber-950/50 shadow-lg shadow-amber-500/20';
      default: return 'text-slate-200 border-slate-600 bg-slate-800/80';
    }
  };

  const getBadgeColor = (color) => {
    switch (color) {
      case 'cyan': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'violet': return 'bg-violet-500/10 text-violet-400 border-violet-500/30';
      case 'emerald': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'amber': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="journey" className="py-24 bg-[#090E1A] relative border-t border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            SECTION 01 • RIDE TIMELINE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            One Ride. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">Four Algorithmic Problems.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Follow the complete digital journey of a single ride request from initiation to arrival. 
            Each operational milestone relies on distinct algorithmic strategies from Unit II.
          </p>
        </div>

        {/* Large Horizontal Interactive Timeline */}
        <div className="relative mb-12">
          {/* Connecting Track Line (aligned through icon centers) */}
          <div className="hidden md:block absolute top-[62px] left-6 right-6 h-[2.5px] -translate-y-1/2 bg-slate-800/80 z-0">

            {/* Active filled line */}
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-amber-500 transition-all duration-300"
              style={{ width: `${(selectedStepIndex / (journeySteps.length - 1)) * 100}%` }}
            />
          </div>

          {/* Timeline Nodes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 relative z-10">
            {journeySteps.map((step, idx) => {
              const Icon = getStepIcon(step.id);
              const isSelected = selectedStepIndex === idx;
              const isPast = idx <= selectedStepIndex;

              return (
                <button
                  key={step.id}
                  onClick={() => setSelectedStepIndex(idx)}
                  className={`flex flex-col items-center p-4 rounded-2xl border transition-all duration-200 text-center cursor-pointer group ${
                    getStepColorClass(step.color, isSelected)
                  }`}
                >
                  {/* Step Number */}
                  <span className="font-mono text-[10px] tracking-widest text-slate-500 mb-2">
                    STEP {step.step}
                  </span>

                  {/* Icon Beacon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-110 ${
                    isSelected 
                      ? 'bg-slate-900 border-2 border-current shadow-md' 
                      : isPast 
                        ? 'bg-slate-900/90 border border-slate-700 text-slate-300' 
                        : 'bg-slate-900/50 border border-slate-800 text-slate-500'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Step Title */}
                  <div className="font-heading font-bold text-sm tracking-wide text-white group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </div>

                  {/* Subtitle / Question Hook */}
                  <div className="text-[11px] text-slate-400 font-mono mt-1 line-clamp-1">
                    {step.subtitle}
                  </div>

                  {/* Connected Algorithm Tag */}
                  {step.algorithm && (
                    <div className="mt-2 text-[10px] font-mono text-cyan-400/90 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20 max-w-full truncate">
                      {step.algorithm}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Deep Dive Stage Inspection Card */}
        <div className="relative rounded-2xl bg-slate-900/70 border border-slate-800/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Detail */}
            {/* Left Detail */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold border tracking-wider uppercase bg-slate-950/70 text-slate-300 border-slate-700">
                    STEP {activeStep.step} OF 06 • {activeStep.title}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border ${getBadgeColor(activeStep.color)}`}>
                    {activeStep.algoBadge}
                  </span>
                </div>

                {/* Stage Progression Arrows */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedStepIndex(prev => Math.max(0, prev - 1))}
                    disabled={selectedStepIndex === 0}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs font-mono text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed border border-slate-700 transition-colors"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => setSelectedStepIndex(prev => Math.min(journeySteps.length - 1, prev + 1))}
                    disabled={selectedStepIndex === journeySteps.length - 1}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-xs font-mono text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed border border-slate-700 transition-colors"
                  >
                    Next →
                  </button>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                "{activeStep.question}"
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeStep.description}
              </p>

              {/* Formal Academic Input -> Output State Contract */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono">
                  <span className="text-slate-500 uppercase block text-[10px]">Algorithm Input State</span>
                  <span className="text-cyan-300">
                    {selectedStepIndex === 0 && 'Rider GPS Packet (lat, lon), Timestamp'}
                    {selectedStepIndex === 1 && 'n = 1,420 Driver Coordinates + Rider Origin P(x, y)'}
                    {selectedStepIndex === 2 && 'Batch of 5 Cloud Jobs {Profit p_i, Deadline d_i}'}
                    {selectedStepIndex === 3 && '5 Cell Tower Nodes, 7 Fiber Link Weights'}
                    {selectedStepIndex === 4 && 'Road Network Intersections V, Road Segment Weights E'}
                    {selectedStepIndex === 5 && 'Destination Arrival Beacon, Final Trip Odometer'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono">
                  <span className="text-slate-500 uppercase block text-[10px]">Algorithm Output State</span>
                  <span className="text-emerald-400">
                    {selectedStepIndex === 0 && 'Gateway Acknowledgement, Dispatch Queue Enqueue'}
                    {selectedStepIndex === 1 && 'Driver D2 Paired (Euclidean δ = 1.8 km)'}
                    {selectedStepIndex === 2 && 'VM Optimal Schedule [J2, J1, J4] (Total ₹240)'}
                    {selectedStepIndex === 3 && 'Acyclic Backbone Spanning Tree (Cost = 10 Units)'}
                    {selectedStepIndex === 4 && 'Shortest Turn Path A→C→B→D→E (10 km, ETA 8 min)'}
                    {selectedStepIndex === 5 && 'Fare Reconciled, Driver State Reset to Available'}
                  </span>
                </div>
              </div>

              {/* Algorithm Direct Bridge */}
              {activeStep.algorithm && (
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="text-xs font-mono text-slate-400">
                    Governing Algorithmic Method:
                  </div>
                  <button
                    onClick={() => onSelectAlgorithm && onSelectAlgorithm(activeStep.algoId)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 hover:bg-cyan-900/60 hover:border-cyan-400 transition-all cursor-pointer"
                  >
                    <span>Inspect {activeStep.algorithm} Deep-Dive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Right Telemetry Column */}
            <div className="lg:col-span-4 rounded-xl bg-slate-950/80 border border-slate-800 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Stage Telemetry</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>

              <div className="space-y-3 font-mono text-xs">
                {Object.entries(activeStep.metrics).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="text-white font-semibold">{val}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>System Status</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Optimal Pipeline
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

