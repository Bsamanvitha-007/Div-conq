import React from 'react';
import { 
  Smartphone, 
  Split, 
  Server, 
  Radio, 
  Navigation, 
  CheckCircle2, 
  ArrowDown
} from 'lucide-react';


export const FinalStorySection = () => {
  const [activeStageIdx, setActiveStageIdx] = React.useState(1);

  const storyPipeline = [
    {
      stage: 'STAGE 01',
      title: 'REQUEST',
      subtitle: 'Rider Ingestion',
      algo: 'Client Mobile Dispatch',
      badge: 'INPUT',
      color: 'slate',
      icon: Smartphone,
      summary: 'Passenger pings ride request with GPS coordinates to the edge dispatch gateway.',
      contract: {
        input: 'Rider GPS: (37.7749° N, 122.4194° W)',
        process: 'Reverse geocoding & WebSocket packet transmission to edge gateway.',
        output: 'Trip ID #TX-9041 created in dispatch message broker.'
      }
    },
    {
      stage: 'STAGE 02',
      title: 'CLOSEST DRIVER',
      subtitle: 'Spatial Pairing',
      algo: 'Closest Pair of Points',
      badge: 'DIVIDE & CONQUER',
      color: 'cyan',
      icon: Split,
      summary: 'Recursively partitions city sectors to identify candidate driver with minimal Euclidean distance.',
      contract: {
        input: '1,420 Driver pings presorted by X and Y coordinates.',
        process: 'Median split at x_mid; conquer half-planes; cross-compare 2δ central strip.',
        output: 'Driver D2 matched (Euclidean δ = 1.8 km) in O(n log n).'
      }
    },
    {
      stage: 'STAGE 03',
      title: 'RESOURCE SCHEDULING',
      subtitle: 'Backend Cloud Dispatch',
      algo: 'Job Sequencing with Deadlines',
      badge: 'GREEDY ALGORITHM',
      color: 'violet',
      icon: Server,
      summary: 'Schedules server jobs (surge pricing, dispatch queues) across VM cores to maximize system utility.',
      contract: {
        input: 'Microservice job batch: Surge Matrix (P:100, D:2), Dispatch (P:90, D:1), Telemetry (P:50, D:3).',
        process: 'Greedy choice: Place highest-profit jobs in latest available time slot.',
        output: 'Cloud schedule [J2, J1, J4] executed; maximized value ₹240.'
      }
    },
    {
      stage: 'STAGE 04',
      title: 'NETWORK CONNECTIVITY',
      subtitle: 'Cell Tower Backbone',
      algo: "Minimum Spanning Tree (Prim's & Kruskal's)",
      badge: 'GREEDY ALGORITHM',
      color: 'emerald',
      icon: Radio,
      summary: 'Maintains cost-minimal, loop-free optical fiber communication links between urban base stations.',
      contract: {
        input: '5 Urban cell tower stations, 7 inter-tower fiber route costs.',
        process: 'Kruskal: Sort edges, accept lowest valid link using DSU to prevent communication cycles.',
        output: 'Minimum cabling cost 10 units spanning all 5 towers without loops.'
      }
    },
    {
      stage: 'STAGE 05',
      title: 'SHORTEST ROUTE',
      subtitle: 'Turn-by-Turn Navigation',
      algo: "Dijkstra's Algorithm",
      badge: 'GREEDY / SHORTEST PATH',
      color: 'amber',
      icon: Navigation,
      summary: 'Calculates the optimal least-cost path across street intersections to minimize trip travel time.',
      contract: {
        input: 'City road graph with non-negative travel times between junctions.',
        process: 'Extract-min from priority queue, relax outgoing edges, lock settled nodes.',
        output: 'Optimal trajectory: A → C → B → D → E (Distance: 10 km, ETA: 08 min).'
      }
    },
    {
      stage: 'STAGE 06',
      title: 'ARRIVAL',
      subtitle: 'Trip Completion',
      algo: 'Reconciliation & Billing',
      badge: 'TERMINATION',
      color: 'emerald',
      icon: CheckCircle2,
      summary: 'Vehicle safely arrives at destination; driver flips back to available status in spatial index.',
      contract: {
        input: 'Terminal destination arrival GPS ping, vehicle odometer confirmation.',
        process: 'Trip reconciliation, cashless fare settlement, telemetry logging.',
        output: 'Session closed; Driver D2 restored to spatial candidate pool.'
      }
    }
  ];

  const getColorClasses = (color, isActive) => {
    if (!isActive) return 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700';
    switch (color) {
      case 'cyan': return 'border-cyan-500/80 bg-cyan-950/40 text-cyan-300 shadow-lg shadow-cyan-950/30';
      case 'violet': return 'border-violet-500/80 bg-violet-950/40 text-violet-300 shadow-lg shadow-violet-950/30';
      case 'emerald': return 'border-emerald-500/80 bg-emerald-950/40 text-emerald-300 shadow-lg shadow-emerald-950/30';
      case 'amber': return 'border-amber-500/80 bg-amber-950/40 text-amber-300 shadow-lg shadow-amber-950/30';
      default: return 'border-slate-600 bg-slate-850 text-slate-200';
    }
  };

  const activeStage = storyPipeline[activeStageIdx];

  return (
    <section className="py-24 bg-[#070B14] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            SECTION 06 • FULL LIFECYCLE INTEGRATION
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            From Request <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">to Destination</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            The complete synthesis: How Divide &amp; Conquer and Greedy algorithms cooperate 
            to power the lifecycle of an autonomous ride-hailing transaction. Tap any stage to inspect its data contract.
          </p>
        </div>

        {/* Master Pipeline Flow Visual */}
        <div className="max-w-4xl mx-auto space-y-3">
          {storyPipeline.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === storyPipeline.length - 1;
            const isActive = activeStageIdx === idx;

            return (
              <React.Fragment key={step.stage}>
                <div 
                  onClick={() => setActiveStageIdx(idx)}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left group ${
                    getColorClasses(step.color, isActive)
                  }`}
                >
                  {/* Left Icon & Identity */}
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-110 ${
                      isActive ? 'bg-slate-900 border-current shadow-md' : 'bg-slate-900/60 border-slate-800 text-slate-400'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-slate-500 font-bold">{step.stage}</span>
                        <h4 className="font-heading font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                          {step.title}
                        </h4>
                      </div>
                      <div className="text-xs font-mono text-slate-400 mt-0.5">
                        {step.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Middle Summary */}
                  <p className="text-xs sm:text-sm text-slate-300 max-w-sm font-sans">
                    {step.summary}
                  </p>

                  {/* Right Algorithm Badge */}
                  <div className="text-right sm:shrink-0">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold border border-current">
                      {step.badge}
                    </span>
                    <div className="text-[11px] font-mono text-slate-400 mt-1">
                      {step.algo}
                    </div>
                  </div>
                </div>

                {/* Connecting Arrow */}
                {!isLast && (
                  <div className="flex justify-center my-0.5">
                    <div className="w-6 h-6 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500">
                      <ArrowDown className="w-3 h-3 text-cyan-400" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Selected Stage Data Contract Card */}
        <div className="max-w-4xl mx-auto mt-8 p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 backdrop-blur-xl shadow-2xl text-left space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-mono text-xs text-cyan-400 uppercase font-bold tracking-wider">
              {activeStage.stage} DATA CONTRACT: {activeStage.title} ({activeStage.algo})
            </span>
            <span className="text-xs font-mono text-slate-500">I/O SPECIFICATION</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono pt-1">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-500 uppercase text-[10px] block">Input Stream</span>
              <p className="text-slate-200">{activeStage.contract.input}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-cyan-400 uppercase text-[10px] block">Algorithmic Transformation</span>
              <p className="text-slate-300">{activeStage.contract.process}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-emerald-400 uppercase text-[10px] block">Output Resolution</span>
              <p className="text-emerald-300 font-semibold">{activeStage.contract.output}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

