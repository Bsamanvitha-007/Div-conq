export const complexityData = [
  {
    id: 'closest-pair',
    algorithm: 'Closest Pair of Points',
    paradigm: 'Divide & Conquer',
    color: 'cyan',
    accentClass: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20',
    primaryComplexity: 'O(n log n)',
    recurrence: 'T(n) = 2T(n/2) + O(n)',
    implementations: [
      {
        shortLabel: 'Presorted Arrays (Optimal)',
        structure: 'Presorted X and Y Coordinate Arrays',
        time: 'O(n log n)',
        space: 'O(n)',
        notes: 'Pre-sorting points takes O(n log n). The merge step evaluates at most 7-8 points per strip element in O(n).'
      },
      {
        shortLabel: 'Recursive Sorting',
        structure: 'Naive Recursive (Sorting at each level)',
        time: 'O(n log² n)',
        space: 'O(n)',
        notes: 'Occurs if coordinates are sorted repeatedly at every recursive subdivision step.'
      },
      {
        shortLabel: 'Brute Force Pairwise',
        structure: 'Brute Force Pairwise Comparison',
        time: 'O(n²)',
        space: 'O(1)',
        notes: 'Compares all n(n - 1)/2 coordinate combinations. Intolerable for thousands of real-time drivers.'
      }
    ],
    efficiencyScore: 88,
    formulaBreakdown: 'Master Theorem Case 2: a = 2, b = 2, f(n) = O(n) ⇒ T(n) = Θ(n log n)'
  },
  {
    id: 'job-sequencing',
    algorithm: 'Job Sequencing with Deadlines',
    paradigm: 'Greedy Algorithm',
    color: 'violet',
    accentClass: 'text-violet-400 border-violet-500/30 bg-violet-950/20',
    primaryComplexity: 'O(n log n) or O(n²)',
    recurrence: 'Sorting + Slot Searching',
    implementations: [
      {
        shortLabel: 'Disjoint Set Union (DSU)',
        structure: 'Disjoint Set Union (DSU / Tree Union-Find)',
        time: 'O(n log n + n · α(d))',
        space: 'O(d)',
        notes: 'Sorting takes O(n log n). DSU find() locates the latest available time slot in near constant amortized time α(d).'
      },
      {
        shortLabel: 'Linear Slot Search',
        structure: 'Naive Linear Slot Search (Array-based)',
        time: 'O(n · min(n, max_d)) ≈ O(n²)',
        space: 'O(max_d)',
        notes: 'Iterates backward through array slots from deadline to 1 for each of the n sorted candidate jobs.'
      },
      {
        shortLabel: 'Priority Queue Heap',
        structure: 'Priority Queue / Min-Heap of Scheduled Jobs',
        time: 'O(n log k)',
        space: 'O(k)',
        notes: 'Where k is the maximum deadline. Maintains active schedule and ejects minimum profit jobs when conflicts arise.'
      }
    ],
    efficiencyScore: 82,
    formulaBreakdown: 'Depends critically on whether slot lookup is linear O(d) or DSU-accelerated O(α(d))'
  },
  {
    id: 'mst',
    algorithm: "Minimum Cost Spanning Tree (MST)",
    paradigm: 'Greedy Algorithm (Prim & Kruskal)',
    color: 'emerald',
    accentClass: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20',
    primaryComplexity: 'O(E log E) or O(E log V)',
    recurrence: 'Edge Selection / Cut Property',
    implementations: [
      {
        shortLabel: 'Kruskal + DSU',
        structure: "Kruskal's + Disjoint Set (Path Compression & Rank)",
        time: 'O(E log E) = O(E log V)',
        space: 'O(V + E)',
        notes: 'Sorting edges dominates time. Union-find cycle validation takes O(E · α(V)). Ideal for sparse networks.'
      },
      {
        shortLabel: 'Prim + Min-Heap',
        structure: "Prim's + Binary Min-Heap Priority Queue",
        time: 'O((V + E) log V) = O(E log V)',
        space: 'O(V)',
        notes: 'Extract-min takes O(log V) for V vertices; edge key updates take O(E log V). Optimal for general networks.'
      },
      {
        shortLabel: 'Prim + Fibonacci',
        structure: "Prim's + Fibonacci Heap",
        time: 'O(E + V log V)',
        space: 'O(V)',
        notes: 'Amortized O(1) key decreases with O(log V) vertex extraction. Asymptotically fastest for dense networks.'
      },
      {
        shortLabel: 'Prim + Adj Matrix',
        structure: "Prim's + Adjacency Matrix (Naive Array)",
        time: 'O(V²)',
        space: 'O(V²)',
        notes: 'Linear scan to find min key among V unvisited vertices. Efficient only for ultra-dense graphs (E ≈ V²).'
      }
    ],
    efficiencyScore: 85,
    formulaBreakdown: 'Sparse Graph (E ≈ V): Kruskal & Binary Heap Prim excel. Dense Graph (E ≈ V²): Fibonacci Heap Prim wins.'
  },
  {
    id: 'dijkstra',
    algorithm: "Dijkstra's Shortest Path",
    paradigm: 'Greedy / Shortest Path',
    color: 'amber',
    accentClass: 'text-amber-400 border-amber-500/30 bg-amber-950/20',
    primaryComplexity: 'O((V + E) log V)',
    recurrence: 'Vertex Settle + Relaxation',
    implementations: [
      {
        shortLabel: 'Binary Min-Heap (Standard)',
        structure: 'Binary Min-Heap Priority Queue',
        time: 'O((V + E) log V)',
        space: 'O(V + E)',
        notes: 'Standard textbook implementation. Each vertex extracted once; incident edges relaxed with heap rebalancing.'
      },
      {
        shortLabel: 'Fibonacci Heap',
        structure: 'Fibonacci Heap',
        time: 'O(E + V log V)',
        space: 'O(V)',
        notes: 'Provides O(1) amortized decrease-key operations. Optimal theoretical bound for non-negative graph routing.'
      },
      {
        shortLabel: 'Naive Flat Array',
        structure: 'Naive Array (Unordered Linear Table)',
        time: 'O(V²)',
        space: 'O(V)',
        notes: 'Scans all vertices to find min distance in each of the V iterations. Impractical for road graphs with thousands of nodes.'
      }
    ],
    efficiencyScore: 90,
    formulaBreakdown: 'Road graphs are typically sparse (average vertex degree ~3-4), making Heap implementations O(V log V) in practice.'
  }
];

