export const comparisonData = [
  {
    id: 'closest-pair',
    algorithm: 'Closest Pair of Points',
    paradigm: 'Divide & Conquer',
    paradigmColor: 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30',
    problem: 'Geometric Proximity',
    application: 'Driver-Passenger Matching',
    goal: 'Minimize pickup distance & rider wait time',
    primaryStructure: 'Presorted Arrays (by X and Y coordinates)',
    decisionStyle: 'Top-down recursive decomposition; strip-based conquer',
    keyDistinction: 'Solves geometric continuous 2D space; combines subproblem boundaries across the median strip.',
    edgeCases: 'Points collocated exactly on the median line; dense clusters inside the 2δ strip.'
  },
  {
    id: 'job-sequencing',
    algorithm: 'Job Sequencing with Deadlines',
    paradigm: 'Greedy Algorithm',
    paradigmColor: 'text-violet-400 bg-violet-950/40 border-violet-500/30',
    problem: 'Constrained Scheduling',
    application: 'Cloud Resource Allocation',
    goal: 'Maximize total profit & utility within slot limits',
    primaryStructure: 'Disjoint Set Union (DSU) / Priority Queue',
    decisionStyle: 'Greedy choice property: greatest profit assigned latest valid slot',
    keyDistinction: 'Discrete unit time slots; schedules each task as late as possible to preserve earlier slots.',
    edgeCases: 'Multiple jobs sharing the same deadline; job profit low with tight deadline.'
  },
  {
    id: 'mst',
    algorithm: "Prim's & Kruskal's (MST)",
    paradigm: 'Greedy Algorithm',
    paradigmColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
    problem: 'Acyclic Subgraph Connection',
    application: 'Cell Tower & Fiber Network Infrastructure',
    goal: 'Connect all V nodes with V-1 links at minimum cost',
    primaryStructure: 'DSU (Kruskal) / Min-Heap Priority Queue (Prim)',
    decisionStyle: 'Kruskal: global minimum edge; Prim: local cut expansion',
    keyDistinction: 'Covers the ENTIRE infrastructure network without cycles. NOT for routing a passenger between two specific points.',
    edgeCases: 'Disconnected graphs (produces a Minimum Spanning Forest); graphs with identical edge weights.'
  },
  {
    id: 'dijkstra',
    algorithm: "Dijkstra's Algorithm",
    paradigm: 'Greedy / Shortest Path',
    paradigmColor: 'text-amber-400 bg-amber-950/40 border-amber-500/30',
    problem: 'Single-Source Shortest Path',
    application: 'Road-Network Turn-by-Turn Navigation',
    goal: 'Minimize path cost (time/distance) from origin to destination',
    primaryStructure: 'Min-Heap Priority Queue + Distance Table',
    decisionStyle: 'Greedily extracts minimum tentative distance node; relaxes incident edges',
    keyDistinction: 'Finds an optimal PATH between designated source and target. Does NOT connect all nodes globally with minimal total cable.',
    edgeCases: 'Negative edge weights (violates greedy assumption); non-planar multi-tier highway flyovers.'
  }
];
