import React from 'react';
import { Split, Cpu, Radio, Navigation } from 'lucide-react';


export const TakeawaysSection = () => {
  const takeaways = [
    {
      number: '01',
      title: 'Spatial Subproblems',
      badge: 'DIVIDE & CONQUER',
      color: 'cyan',
      icon: Split,
      heading: 'Spatial problems can be divided into smaller problems.',
      text: 'By recursively halving geographic sectors and bounding cross-border candidates within a narrow 2δ corridor, Divide & Conquer eliminates the O(n²) all-pairs bottleneck in spatial pairing.'
    },
    {
      number: '02',
      title: 'Greedy Local Optimality',
      badge: 'GREEDY PARADIGM',
      color: 'violet',
      icon: Cpu,
      heading: 'Greedy methods make efficient local choices for suitable optimization problems.',
      text: 'When problems exhibit optimal substructure and the greedy-choice property (such as unit job scheduling on cloud VM pools), selecting locally maximal profit guarantees a globally optimal total score.'
    },
    {
      number: '03',
      title: 'Acyclic Topology',
      badge: 'MINIMUM SPANNING TREE',
      color: 'emerald',
      icon: Radio,
      heading: 'MST algorithms can help explain cost-efficient network infrastructure.',
      text: 'Kruskal and Prim demonstrate how urban telecommunication base stations can be interconnected with minimal optical fiber cabling while rigorously avoiding data communication loops.'
    },
    {
      number: '04',
      title: 'Shortest-Path Navigation',
      badge: 'DIJKSTRA NAVIGATION',
      color: 'amber',
      icon: Navigation,
      heading: 'Shortest-path algorithms model efficient routing through weighted road networks.',
      text: 'By greedily settling nearest unvisited road intersections and continually relaxing tentative neighbor distances, Dijkstra models turn-by-turn navigation over non-negative weighted road networks.'
    }
  ];

  const getBorderColor = (color) => {
    switch (color) {
      case 'cyan': return 'border-cyan-500/30 hover:border-cyan-400/60 shadow-cyan-950/20';
      case 'violet': return 'border-violet-500/30 hover:border-violet-400/60 shadow-violet-950/20';
      case 'emerald': return 'border-emerald-500/30 hover:border-emerald-400/60 shadow-emerald-950/20';
      case 'amber': return 'border-amber-500/30 hover:border-amber-400/60 shadow-amber-950/20';
      default: return 'border-slate-800';
    }
  };

  const getBadgeClass = (color) => {
    switch (color) {
      case 'cyan': return 'text-cyan-300 bg-cyan-950/40 border-cyan-500/30';
      case 'violet': return 'text-violet-300 bg-violet-950/40 border-violet-500/30';
      case 'emerald': return 'text-emerald-300 bg-emerald-950/40 border-emerald-500/30';
      case 'amber': return 'text-amber-300 bg-amber-950/40 border-amber-500/30';
      default: return 'text-slate-300 bg-slate-800 border-slate-700';
    }
  };

  return (
    <section id="takeaways" className="py-24 bg-[#090E1A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            SECTION 07 • CORE TAKEAWAYS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Key Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">Takeaways</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Essential theoretical insights derived from Unit II: Divide &amp; Conquer and Greedy algorithms in the context of transport computing.
          </p>
        </div>

        {/* Four Elegant Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {takeaways.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.number}
                className={`p-6 sm:p-8 rounded-2xl bg-slate-900/80 border backdrop-blur-xl shadow-xl transition-all duration-300 space-y-4 group ${getBorderColor(item.color)}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-500 font-bold tracking-wider">
                    TAKEAWAY {item.number}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border ${getBadgeClass(item.color)}`}>
                    {item.badge}
                  </span>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {item.heading}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed pt-2 border-t border-slate-800/80">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
