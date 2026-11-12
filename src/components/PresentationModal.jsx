import React, { useState } from 'react';
import { 
  X, 
  Presentation
} from 'lucide-react';


export const PresentationModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('demo-flow');

  if (!isOpen) return null;

  const vivaQuestions = [
    {
      q: 'Q1: Why is Closest Pair O(n log n) instead of O(n²)? How many points are checked in the strip?',
      a: 'Points are sorted initially in O(n log n). In the combine step, the plane is bounded by a 2δ strip. In 2D Euclidean geometry, within a δ × 2δ rectangle, at most 7-8 points can exist with pairwise distances ≥ δ. Thus, for each point, at most 7 comparisons are needed, making the strip merge strictly O(n). By the Master Theorem: T(n) = 2T(n/2) + O(n) ⇒ O(n log n).'
    },
    {
      q: 'Q2: In Job Sequencing with Deadlines, why do we schedule jobs at the latest possible time slot instead of the earliest?',
      a: 'Greedy strategy: Scheduling a job at its latest valid slot t ≤ deadline leaves earlier slots free for subsequent jobs that have tighter (earlier) deadlines. Scheduling at the earliest slot would unnecessarily preempt high-priority jobs with deadline 1.'
    },
    {
      q: 'Q3: What is the fundamental difference between Minimum Spanning Tree (MST) and Dijkstra’s Shortest Path?',
      a: 'MST connects ALL vertices in the entire graph with minimal total edge weight (cabling/infrastructure cost) without cycles. Dijkstra computes the shortest path between a specific origin and destination. A shortest path between two nodes in an MST is not necessarily the shortest path in the original graph.'
    },
    {
      q: 'Q4: Why does Dijkstra fail on graphs with negative edge weights?',
      a: 'Dijkstra assumes that once a vertex is settled (marked visited), its shortest distance from the source is finalized (Greedy choice property). A negative edge later in the graph could reduce that distance, violating the greedy invariant. Bellman-Ford must be used instead for negative weights.'
    },
    {
      q: 'Q5: Do commercial apps like Uber, Ola, or Google Maps use these textbook algorithms directly?',
      a: 'They build upon these conceptual foundations! In production, spatial matching uses Uber H3 hexagonal spatial indexes or k-d trees; cloud dispatch uses distributed task queues and bin-packing; and road navigation uses Contraction Hierarchies (CH) or A* heuristic search to prune millions of road nodes in milliseconds.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-slate-900 border border-cyan-500/40 shadow-2xl overflow-hidden text-left">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-white">
                College Presentation &amp; Viva Companion
              </h3>
              <p className="text-xs font-mono text-cyan-400">
                DAA UNIT II • DIVIDE &amp; CONQUER AND GREEDY TALKING POINTS
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Nav Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('demo-flow')}
            className={`pb-3 px-3 text-xs font-mono font-semibold transition-all border-b-2 ${
              activeTab === 'demo-flow'
                ? 'text-cyan-400 border-cyan-400'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            1. Presentation Demo Script
          </button>
          <button
            onClick={() => setActiveTab('viva-faq')}
            className={`pb-3 px-3 text-xs font-mono font-semibold transition-all border-b-2 ${
              activeTab === 'viva-faq'
                ? 'text-cyan-400 border-cyan-400'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            2. Professor Viva Q&amp;A
          </button>
          <button
            onClick={() => setActiveTab('concept-map')}
            className={`pb-3 px-3 text-xs font-mono font-semibold transition-all border-b-2 cursor-pointer ${
              activeTab === 'concept-map'
                ? 'text-cyan-400 border-cyan-400'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            3. Unit II Concept Mapping
          </button>
          <button
            onClick={() => setActiveTab('cheat-sheet')}
            className={`pb-3 px-3 text-xs font-mono font-semibold transition-all border-b-2 cursor-pointer ${
              activeTab === 'cheat-sheet'
                ? 'text-cyan-400 border-cyan-400'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            4. Quick Viva Cheat Sheet
          </button>
        </div>


        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200 font-sans text-sm max-h-[calc(90vh-160px)]">
          
          {activeTab === 'demo-flow' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200 space-y-1">
                <strong>How to Present this Project in 3 Minutes:</strong>
                <p>
                  Follow this structured presentation flow during your slide or live software demonstration for maximum marks from evaluators.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
                    <span>STEP 1: THE HOOK (Hero &amp; Timeline)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Start on the <strong>Hero Section</strong>. Point to the dynamic city map: "A single ride request is not just one problem — it spans four algorithmic subproblems across Unit II. We modeled this in 'The Algorithm Mobility Lab'." Scroll to <strong>The Ride Journey</strong> timeline to show the 6 operational steps: REQUEST → MATCH → SCHEDULE → CONNECT → ROUTE → ARRIVE.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
                    <span>STEP 2: CLOSEST PAIR OF POINTS (Divide &amp; Conquer)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Click <strong>Closest Pair</strong> in the Explorer or Simulation Lab. Demonstrate how dividing by the median line x_mid halves the search space. Show how the 2δ strip handles boundary candidates to guarantee O(n log n) instead of O(n²).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-violet-400 font-mono text-xs font-bold">
                    <span>STEP 3: JOB SEQUENCING WITH DEADLINES (Greedy Cloud Scheduling)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Click <strong>Job Sequencing</strong>. Show how incoming surge pricing and dispatch jobs are sorted in profit-descending order, and scheduled greedily at the latest valid slot (preserving early slots). Explain that with Disjoint Set Union (DSU), this operates in O(n log n).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                    <span>STEP 4: MINIMUM SPANNING TREE (Greedy Prim &amp; Kruskal)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Switch between <strong>Kruskal’s</strong> and <strong>Prim’s</strong> tabs. Clarify the academic distinction: "MST models physical cell tower cabling and stationary network infrastructure with minimal cost and zero cycles; it does NOT route an individual car."
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
                    <span>STEP 5: DIJKSTRA'S ALGORITHM &amp; LIVE SIMULATION</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Head to <strong>Dijkstra's Algorithm</strong> in the Live Simulation Lab. Click "Step Next" to demonstrate edge relaxation and how node B's tentative distance is updated via node C to find the optimal path A → C → B → D → E (10 km).
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'viva-faq' && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                Anticipated Professor Viva Inquiries &amp; Authoritative Answers
              </div>
              {vivaQuestions.map((qa, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-heading font-bold text-sm text-cyan-300">
                    {qa.q}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {qa.a}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'cheat-sheet' && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                Rapid-Fire Viva Memory Sheet (Unit II)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="text-cyan-400 font-bold block">1. Closest Pair of Points</span>
                  <p className="text-slate-300"><strong>Paradigm:</strong> Divide &amp; Conquer</p>
                  <p className="text-slate-300"><strong>Recurrence:</strong> T(n) = 2T(n/2) + O(n) ⇒ O(n log n)</p>
                  <p className="text-slate-400 text-[11px]"><strong>Why at most 7 points in strip?</strong> Minimum distance in half-planes is δ. In a δ × 2δ box, geometry permits at most 8 points with pairwise dist ≥ δ.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="text-violet-400 font-bold block">2. Job Sequencing with Deadlines</span>
                  <p className="text-slate-300"><strong>Paradigm:</strong> Greedy Algorithm</p>
                  <p className="text-slate-300"><strong>Complexity:</strong> O(n²) naive or O(n log n) with Disjoint Set Union (DSU)</p>
                  <p className="text-slate-400 text-[11px]"><strong>Greedy rule:</strong> Highest profit scheduled at latest valid slot t ≤ deadline to preserve earlier slots.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="text-emerald-400 font-bold block">3. Minimum Cost Spanning Tree (MST)</span>
                  <p className="text-slate-300"><strong>Paradigm:</strong> Greedy (Cut Property)</p>
                  <p className="text-slate-300"><strong>Complexity:</strong> Kruskal: O(E log E); Prim: O(E log V) or O(V²)</p>
                  <p className="text-slate-400 text-[11px]"><strong>Distinction:</strong> Connects ALL V nodes with V-1 links at minimal cost without cycles. Not a single car route.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <span className="text-amber-400 font-bold block">4. Dijkstra's Algorithm</span>
                  <p className="text-slate-300"><strong>Paradigm:</strong> Greedy / Shortest Path</p>
                  <p className="text-slate-300"><strong>Complexity:</strong> O((V + E) log V) with Min-Heap</p>
                  <p className="text-slate-400 text-[11px]"><strong>Constraint:</strong> Requires non-negative edge weights because settled nodes are finalized greedily.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'concept-map' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="font-heading font-bold text-white text-base">
                  Syllabus Correlation Matrix: Unit II
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-cyan-400 font-bold block mb-1">Divide &amp; Conquer</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                      <li>Recursive Partitioning</li>
                      <li>Master Theorem Analysis</li>
                      <li>Closest Pair of Points (2D Plane)</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-violet-400 font-bold block mb-1">Greedy Paradigm</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                      <li>Greedy Choice Property</li>
                      <li>Optimal Substructure</li>
                      <li>Job Sequencing with Deadlines</li>
                      <li>Prim's and Kruskal's MST</li>
                      <li>Dijkstra's Shortest Path</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
                <strong className="text-emerald-400 font-mono block uppercase">
                  Academic Honesty &amp; Context Statement
                </strong>
                <p>
                  This project emphasizes conceptual rigor. Rather than claiming commercial proprietary architectures are identical to textbook code, it illustrates how foundational algorithms provide the algorithmic models for spatial proximity, cloud concurrency, topology design, and graph pathfinding.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Press ESC or V to toggle companion</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>


      </div>
    </div>
  );
};
