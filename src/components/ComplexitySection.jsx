import React, { useState } from 'react';
import { complexityData } from '../data/complexityData';
import { 
  AlertCircle, 
  Database, 
  Clock, 
  HardDrive
} from 'lucide-react';


export const ComplexitySection = () => {
  const [activeImplementationTab, setActiveImplementationTab] = useState({});

  const handleTabChange = (algoId, index) => {
    setActiveImplementationTab(prev => ({ ...prev, [algoId]: index }));
  };

  return (
    <section id="complexity" className="py-24 bg-[#090E1A] relative border-t border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            SECTION 05 • PERFORMANCE LAB
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Algorithm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">Performance Lab</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Rigorous asymptotic time and space complexity evaluations across data structure choices.
          </p>
        </div>

        {/* Mandatory Academic Disclaimer Banner */}
        <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md max-w-4xl mx-auto flex items-start gap-3.5 text-left">
          <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-mono text-xs text-cyan-300 uppercase font-bold tracking-wider">
              Academic Complexity Notice
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              "Time complexity may vary depending on implementation and data structure." 
              Textbook algorithms yield vastly different asymptotic upper bounds when paired with flat arrays versus min-heaps, Fibonacci heaps, or Disjoint Set Union structures.
            </p>
          </div>
        </div>

        {/* Four Visual Metric Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {complexityData.map((item) => {
            const selectedIdx = activeImplementationTab[item.id] || 0;
            const currentImpl = item.implementations[selectedIdx];

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 backdrop-blur-xl shadow-xl space-y-6 flex flex-col justify-between"
              >
                {/* Panel Header */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                      {item.paradigm}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${item.accentClass}`}>
                      {item.primaryComplexity}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                    {item.algorithm}
                  </h3>
                  <div className="font-mono text-xs text-slate-400">
                    Recurrence: <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded">{item.recurrence}</code>
                  </div>
                </div>

                {/* Implementation Selector Tabs */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    Select Data Structure Variant:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.implementations.map((impl, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTabChange(item.id, idx)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          selectedIdx === idx
                            ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/60 font-semibold shadow-sm shadow-cyan-500/20'
                            : 'bg-slate-950/70 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {impl.shortLabel || `Variant ${idx + 1}`}
                      </button>

                    ))}
                  </div>
                </div>

                {/* Active Implementation Metrics Card */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 space-y-3 font-mono">
                  <div className="text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{currentImpl.structure}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-500 uppercase flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        Time Complexity
                      </div>
                      <div className="text-base font-bold text-white mt-0.5">
                        {currentImpl.time}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-[10px] text-slate-500 uppercase flex items-center gap-1">
                        <HardDrive className="w-3 h-3 text-violet-400" />
                        Space Complexity
                      </div>
                      <div className="text-base font-bold text-slate-200 mt-0.5">
                        {currentImpl.space}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 font-sans leading-relaxed pt-1">
                    {currentImpl.notes}
                  </p>
                </div>

                {/* Formula Breakdown Footer */}
                <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span className="text-slate-500">Asymptotic Analysis:</span>
                  <span className="text-cyan-400 font-semibold">{item.formulaBreakdown}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
