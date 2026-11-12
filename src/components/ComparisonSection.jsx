import React, { useState } from 'react';
import { comparisonData } from '../data/comparisonData';
import { 
  Split, 
  Server, 
  Radio, 
  Navigation, 
  Layers, 
  ChevronRight
} from 'lucide-react';

export const ComparisonSection = () => {
  const [selectedRow, setSelectedRow] = useState(null);


  const [filterParadigm, setFilterParadigm] = useState('ALL');

  const filteredData = comparisonData.filter(item => {
    if (filterParadigm === 'ALL') return true;
    if (filterParadigm === 'DIVIDE') return item.paradigm.includes('Divide');
    if (filterParadigm === 'GREEDY') return item.paradigm.includes('Greedy');
    return true;
  });

  const getAlgoIcon = (id) => {
    switch (id) {
      case 'closest-pair': return Split;
      case 'job-sequencing': return Server;
      case 'mst': return Radio;
      case 'dijkstra': return Navigation;
      default: return Layers;
    }
  };

  return (
    <section id="comparison" className="py-24 bg-[#070B14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            SECTION 04 • COMPARATIVE ANALYSIS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Four Problems. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">Four Algorithmic Approaches.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Side-by-side synthesis comparing algorithmic paradigms, target problem domains, 
            ride-hailing applications, optimization objectives, and critical edge cases.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8 font-mono text-xs">
          {[
            { id: 'ALL', label: 'All 4 Algorithms' },
            { id: 'DIVIDE', label: 'Divide & Conquer (1)' },
            { id: 'GREEDY', label: 'Greedy Optimization (3)' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterParadigm(f.id)}
              className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                filterParadigm === f.id
                  ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/60 shadow-sm shadow-cyan-500/20 font-bold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Desktop Interactive Table View */}
        <div className="hidden lg:block rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-2xl backdrop-blur-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/90 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6">Algorithm</th>
                <th className="py-4 px-6">Paradigm</th>
                <th className="py-4 px-6">Problem</th>
                <th className="py-4 px-6">Ride-Hailing Application</th>
                <th className="py-4 px-6">Optimization Goal</th>
                <th className="py-4 px-6 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-sm font-sans">
              {filteredData.map((item) => {
                const Icon = getAlgoIcon(item.id);
                const isExpanded = selectedRow === item.id;


                return (
                  <React.Fragment key={item.id}>
                    <tr 
                      onClick={() => setSelectedRow(isExpanded ? null : item.id)}
                      className={`transition-colors cursor-pointer ${
                        isExpanded ? 'bg-slate-800/60' : 'hover:bg-slate-850 hover:bg-slate-800/30'
                      }`}
                    >
                      {/* Algorithm Name */}
                      <td className="py-4 px-6 font-heading font-semibold text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 border border-slate-700">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span>{item.algorithm}</span>
                        </div>
                      </td>

                      {/* Paradigm */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-mono font-semibold border ${item.paradigmColor}`}>
                          {item.paradigm}
                        </span>
                      </td>

                      {/* Problem */}
                      <td className="py-4 px-6 text-slate-300 font-mono text-xs">
                        {item.problem}
                      </td>

                      {/* Application */}
                      <td className="py-4 px-6 text-slate-300">
                        {item.application}
                      </td>

                      {/* Goal */}
                      <td className="py-4 px-6 text-emerald-400 font-medium text-xs font-mono">
                        {item.goal}
                      </td>

                      {/* Expand Action */}
                      <td className="py-4 px-6 text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400">
                          {isExpanded ? 'Hide' : 'Inspect'}
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </span>
                      </td>
                    </tr>

                    {/* Expandable Drawer Row */}
                    {isExpanded && (
                      <tr className="bg-slate-950/80 border-b border-slate-800">
                        <td colSpan="6" className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                              <span className="text-slate-400 uppercase">Primary Data Structure</span>
                              <p className="text-cyan-300 font-semibold">{item.primaryStructure}</p>
                            </div>
                            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                              <span className="text-slate-400 uppercase">Decision Mechanism</span>
                              <p className="text-slate-200">{item.decisionStyle}</p>
                            </div>
                            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                              <span className="text-amber-400 uppercase">Critical Boundary / Edge Cases</span>
                              <p className="text-slate-300">{item.edgeCases}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile-Optimized Card Matrix (Guarantees zero overflow!) */}
        <div className="lg:hidden space-y-4">
          {filteredData.map((item) => {
            const Icon = getAlgoIcon(item.id);


            return (
              <div 
                key={item.id}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 border border-slate-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-white">{item.algorithm}</h4>
                      <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${item.paradigmColor}`}>
                        {item.paradigm}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Problem Domain:</span>
                    <span className="text-slate-200 font-semibold">{item.problem}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ride Application:</span>
                    <span className="text-slate-200">{item.application}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Optimization:</span>
                    <span className="text-emerald-400 font-semibold">{item.goal}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400">Data Structure:</span>
                    <span className="text-cyan-300">{item.primaryStructure}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-sans">
                  <strong className="text-amber-400 font-mono block text-[11px] mb-1">Edge Cases &amp; Pitfalls:</strong>
                  {item.edgeCases}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
