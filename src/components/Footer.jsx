import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';


export const Footer = () => {
  return (
    <footer className="bg-[#05080F] border-t border-slate-800/80 py-16 text-slate-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-left">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 border border-cyan-500/40 text-cyan-400">
                <Activity className="w-4 h-4" />
              </div>
              <span className="font-heading font-bold text-base text-white tracking-wider">
                THE ALGORITHM MOBILITY LAB
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              An interactive academic control center analyzing how Divide &amp; Conquer and Greedy algorithms model 
              spatial matching, cloud dispatching, network infrastructure, and route optimization in modern ride-hailing services.
            </p>
            <div className="text-[11px] font-mono text-cyan-400">
              Unit II • Design &amp; Analysis of Algorithms (DAA) Case Study
            </div>
          </div>

          {/* Col 2: Core Algorithms */}
          <div className="md:col-span-4 space-y-2">
            <div className="font-mono text-xs text-white uppercase tracking-wider font-semibold">
              Covered Unit II Topics
            </div>
            <ul className="space-y-1.5 font-mono text-[11px] text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Closest Pair of Points (Divide &amp; Conquer)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span>Job Sequencing with Deadlines (Greedy)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Minimum Cost Spanning Tree: Prim &amp; Kruskal (Greedy)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Dijkstra's Algorithm (Shortest Path / Greedy)</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Attribution */}
          <div className="md:col-span-3 space-y-2">
            <div className="font-mono text-xs text-white uppercase tracking-wider font-semibold">
              Academic Context
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1 text-[11px] text-slate-400 leading-relaxed">
              <div className="text-slate-300 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                College Curriculum Reference
              </div>
              <p>
                Algorithms are conceptual models demonstrating computational problem-solving principles for college presentation and viva evaluation.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-400">
          <div>
            DAA — UNIT II • Ride-Hailing Services: Divide &amp; Conquer + Greedy Algorithms
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Academic Case Study</span>
            <span>•</span>
            <span className="text-cyan-400">Presentation Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
