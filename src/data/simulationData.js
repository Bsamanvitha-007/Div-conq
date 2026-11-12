// Precomputed discrete simulation steps for all 5 algorithms

export const simulationData = {
  'closest-pair': {
    title: 'Closest Pair of Points Simulation',
    algorithm: 'Divide & Conquer',
    canvasType: '2d-points',
    badge: 'DIVIDE & CONQUER',
    color: 'cyan',
    totalSteps: 6,
    points: [
      { id: 'P', name: 'Passenger (P)', x: 190, y: 155, type: 'passenger' },
      { id: 'D1', name: 'Driver D1', x: 60, y: 80, type: 'driver' },
      { id: 'D2', name: 'Driver D2', x: 155, y: 140, type: 'driver' },
      { id: 'D3', name: 'Driver D3', x: 260, y: 95, type: 'driver' },
      { id: 'D4', name: 'Driver D4', x: 320, y: 190, type: 'driver' },
      { id: 'D5', name: 'Driver D5', x: 110, y: 220, type: 'driver' }
    ],
    steps: [
      {
        step: 0,
        label: 'Step 0: Initial Spatial Ingestion',
        log: 'Ingested 1 passenger coordinate P(190, 155) and 5 active driver GPS pings across the sector. Points presorted by X coordinate: [D1, D5, D2, P, D3, D4].',
        splitLine: null,
        activeRegions: [],
        strip: null,
        activePair: null,
        closestPair: null,
        minDistance: '∞',
        telemetry: { evaluated: 0, currentDelta: 'None', status: 'Presorted by X' }
      },
      {
        step: 1,
        label: 'Step 1: Divide Sector with Median Line',
        log: 'Calculated median coordinate x_mid = 175. Partitioned plane into Left Sub-sector L (x ≤ 175) with {D1, D5, D2} and Right Sub-sector R (x > 175) with {P, D3, D4}.',
        splitLine: 175,
        activeRegions: ['left', 'right'],
        strip: null,
        activePair: null,
        closestPair: null,
        minDistance: 'Partitioning...',
        telemetry: { evaluated: 0, currentDelta: 'Dividing at x=175', status: '2 Equal Subproblems' }
      },
      {
        step: 2,
        label: 'Step 2: Conquer Left Sub-sector (δ_L)',
        log: 'Recursively evaluated Left sector {D1, D5, D2}. Minimum local distance found between D5(110, 220) and D2(155, 140) with Euclidean distance δ_L = 92.2 px (≈ 2.4 km).',
        splitLine: 175,
        activeRegions: ['left'],
        strip: null,
        activePair: ['D5', 'D2'],
        closestPair: ['D5', 'D2'],
        minDistance: '2.4 km (δ_L)',
        telemetry: { evaluated: 3, currentDelta: 'δ_L = 2.4 km', status: 'Left subproblem solved' }
      },
      {
        step: 3,
        label: 'Step 3: Conquer Right Sub-sector (δ_R)',
        log: 'Recursively evaluated Right sector {P, D3, D4}. Minimum distance found between P(190, 155) and D3(260, 95) with Euclidean distance δ_R = 92.2 px (≈ 2.3 km). Overall δ = min(2.4, 2.3) = 2.3 km.',
        splitLine: 175,
        activeRegions: ['right'],
        strip: null,
        activePair: ['P', 'D3'],
        closestPair: ['P', 'D3'],
        minDistance: '2.3 km (δ)',
        telemetry: { evaluated: 6, currentDelta: 'δ = min(δ_L, δ_R) = 2.3 km', status: 'Right subproblem solved' }
      },
      {
        step: 4,
        label: 'Step 4: Construct the 2δ Central Strip',
        log: 'Constructed central strip [x_mid - δ, x_mid + δ] spanning [130, 220]. Points falling inside strip: {D2, P}. Any closer pair across the split line MUST reside in this corridor.',
        splitLine: 175,
        activeRegions: [],
        strip: { left: 135, right: 215 },
        activePair: null,
        closestPair: ['P', 'D3'],
        minDistance: '2.3 km',
        telemetry: { evaluated: 6, currentDelta: 'Strip Width: 2δ', status: 'Filtering strip candidates' }
      },
      {
        step: 5,
        label: 'Step 5: Combine & Cross-Compare Inside Strip',
        log: 'Compared candidate pairs in strip sorted by Y coordinate. Euclidean distance between Driver D2(155, 140) and Passenger P(190, 155) is d = √((190-155)² + (155-140)²) = 38 px (≈ 1.8 km) < δ! Optimal closest pair found!',
        splitLine: 175,
        activeRegions: [],
        strip: { left: 135, right: 215 },
        activePair: ['D2', 'P'],
        closestPair: ['D2', 'P'],
        minDistance: '1.8 km (Optimal)',
        telemetry: { evaluated: 7, currentDelta: 'δ_final = 1.8 km', status: 'MATCH DISPATCHED: D2 → P' }
      }
    ]
  },

  'job-sequencing': {
    title: 'Job Sequencing with Deadlines Simulation',
    algorithm: 'Greedy Scheduling',
    canvasType: 'cloud-slots',
    badge: 'GREEDY ALGORITHM',
    color: 'violet',
    totalSteps: 6,
    slots: [1, 2, 3],
    jobs: [
      { id: 'J1', name: 'Surge Pricing Matrix', deadline: 2, profit: 100, color: '#818CF8' },
      { id: 'J2', name: 'High-Priority Dispatch', deadline: 1, profit: 90, color: '#A855F7' },
      { id: 'J3', name: 'ETA Route Refresh', deadline: 2, profit: 70, color: '#C084FC' },
      { id: 'J4', name: 'Driver Telemetry Ingest', deadline: 3, profit: 50, color: '#38BDF8' },
      { id: 'J5', name: 'Audit Log Sync', deadline: 1, profit: 20, color: '#64748B' }
    ],
    steps: [
      {
        step: 0,
        label: 'Step 0: Job Pool Ingestion & Sorting',
        log: 'Incoming batch of 5 cloud jobs sorted in descending order of profit: J1 (Profit: 100, D: 2), J2 (Profit: 90, D: 1), J3 (Profit: 70, D: 2), J4 (Profit: 50, D: 3), J5 (Profit: 20, D: 1). Time slots [Slot 1, Slot 2, Slot 3] initialized empty.',
        schedule: [null, null, null],
        currentJob: null,
        totalProfit: 0,
        action: 'Sort by profit descending',
        telemetry: { slotsOccupied: '0 / 3', totalProfit: '₹0', efficiency: '0%' }
      },
      {
        step: 1,
        label: 'Step 1: Evaluate Job J1 (Profit 100, Deadline 2)',
        log: 'Greedy choice: J1 has highest profit (100). Check latest slot ≤ deadline 2: Slot 2 is free. Assign J1 to Slot 2. Total accumulated profit = ₹100.',
        schedule: [null, 'J1', null],
        currentJob: 'J1',
        totalProfit: 100,
        action: 'Assigned J1 to Slot 2',
        telemetry: { slotsOccupied: '1 / 3', totalProfit: '₹100', efficiency: '42%' }
      },
      {
        step: 2,
        label: 'Step 2: Evaluate Job J2 (Profit 90, Deadline 1)',
        log: 'Greedy choice: J2 has next highest profit (90). Check latest slot ≤ deadline 1: Slot 1 is free. Assign J2 to Slot 1. Total accumulated profit = ₹190.',
        schedule: ['J2', 'J1', null],
        currentJob: 'J2',
        totalProfit: 190,
        action: 'Assigned J2 to Slot 1',
        telemetry: { slotsOccupied: '2 / 3', totalProfit: '₹190', efficiency: '79%' }
      },
      {
        step: 3,
        label: 'Step 3: Evaluate Job J3 (Profit 70, Deadline 2)',
        log: 'Greedy evaluation: J3 has profit 70, deadline 2. Check slots ≤ 2: Slot 2 is occupied by J1; Slot 1 is occupied by J2. No free slot before deadline! REJECT J3 to preserve higher-profit jobs.',
        schedule: ['J2', 'J1', null],
        currentJob: 'J3 (REJECTED)',
        totalProfit: 190,
        action: 'Rejected J3 (Slots 1 & 2 full)',
        telemetry: { slotsOccupied: '2 / 3', totalProfit: '₹190', efficiency: '79%' }
      },
      {
        step: 4,
        label: 'Step 4: Evaluate Job J4 (Profit 50, Deadline 3)',
        log: 'Greedy choice: J4 has profit 50, deadline 3. Check latest slot ≤ 3: Slot 3 is free. Assign J4 to Slot 3. Total accumulated profit = ₹240.',
        schedule: ['J2', 'J1', 'J4'],
        currentJob: 'J4',
        totalProfit: 240,
        action: 'Assigned J4 to Slot 3',
        telemetry: { slotsOccupied: '3 / 3', totalProfit: '₹240', efficiency: '100%' }
      },
      {
        step: 5,
        label: 'Step 5: Evaluate Job J5 (Profit 20, Deadline 1)',
        log: 'Greedy evaluation: J5 has profit 20, deadline 1. Slot 1 is already taken by J2. No slot available. REJECT J5. Optimal schedule complete with maximum profit: ₹240.',
        schedule: ['J2', 'J1', 'J4'],
        currentJob: 'J5 (REJECTED)',
        totalProfit: 240,
        action: 'Complete: Optimal schedule [J2, J1, J4]',
        telemetry: { slotsOccupied: '3 / 3 (Full)', totalProfit: '₹240 (Max)', efficiency: 'Optimal' }
      }
    ]
  },

  'prims': {
    title: "Prim's Algorithm (Minimum Spanning Tree)",
    algorithm: 'Greedy Tree Growing',
    canvasType: 'graph-network',
    badge: 'GREEDY (PRIM)',
    color: 'emerald',
    totalSteps: 5,
    nodes: [
      { id: 'A', label: 'Tower A', x: 80, y: 70 },
      { id: 'B', label: 'Tower B', x: 260, y: 60 },
      { id: 'C', label: 'Tower C', x: 130, y: 180 },
      { id: 'D', label: 'Tower D', x: 300, y: 160 },
      { id: 'E', label: 'Tower E', x: 210, y: 240 }
    ],
    allEdges: [
      { u: 'A', v: 'B', weight: 4 },
      { u: 'A', v: 'C', weight: 2 },
      { u: 'B', v: 'C', weight: 5 },
      { u: 'B', v: 'D', weight: 10 },
      { u: 'C', v: 'D', weight: 3 },
      { u: 'C', v: 'E', weight: 7 },
      { u: 'D', v: 'E', weight: 1 }
    ],
    steps: [
      {
        step: 0,
        label: 'Step 0: Seed Selection at Tower A',
        log: 'Selected seed hub Tower A to begin tree growth. Visited Cut set S = {A}, Unvisited V \\ S = {B, C, D, E}. Cabling cost = 0.',
        visitedNodes: ['A'],
        mstEdges: [],
        candidateEdge: null,
        totalCost: 0,
        telemetry: { cutSize: '1 / 5 Nodes', activeLinks: 0, totalWeight: 0 }
      },
      {
        step: 1,
        label: 'Step 1: Evaluate Edges Crossing Cut from {A}',
        log: 'Outgoing edges from {A}: (A-C: 2) and (A-B: 4). Greedily select minimum crossing edge (A-C, weight 2). Add Tower C to visited set S = {A, C}.',
        visitedNodes: ['A', 'C'],
        mstEdges: [{ u: 'A', v: 'C', weight: 2 }],
        candidateEdge: { u: 'A', v: 'C' },
        totalCost: 2,
        telemetry: { cutSize: '2 / 5 Nodes', activeLinks: 1, totalWeight: 2 }
      },
      {
        step: 2,
        label: 'Step 2: Evaluate Edges Crossing Cut from {A, C}',
        log: 'Crossing edges: (A-B: 4), (C-B: 5), (C-D: 3), (C-E: 7). Minimum crossing edge is (C-D, weight 3). Add Tower D to visited set S = {A, C, D}.',
        visitedNodes: ['A', 'C', 'D'],
        mstEdges: [{ u: 'A', v: 'C', weight: 2 }, { u: 'C', v: 'D', weight: 3 }],
        candidateEdge: { u: 'C', v: 'D' },
        totalCost: 5,
        telemetry: { cutSize: '3 / 5 Nodes', activeLinks: 2, totalWeight: 5 }
      },
      {
        step: 3,
        label: 'Step 3: Evaluate Edges Crossing Cut from {A, C, D}',
        log: 'Crossing edges: (A-B: 4), (C-B: 5), (D-E: 1), (C-E: 7), (B-D: 10). Minimum crossing edge is (D-E, weight 1). Add Tower E to visited set S = {A, C, D, E}.',
        visitedNodes: ['A', 'C', 'D', 'E'],
        mstEdges: [{ u: 'A', v: 'C', weight: 2 }, { u: 'C', v: 'D', weight: 3 }, { u: 'D', v: 'E', weight: 1 }],
        candidateEdge: { u: 'D', v: 'E' },
        totalCost: 6,
        telemetry: { cutSize: '4 / 5 Nodes', activeLinks: 3, totalWeight: 6 }
      },
      {
        step: 4,
        label: 'Step 4: Settle Remaining Node Tower B',
        log: 'Edges connecting {A, C, D, E} to remaining Tower B: (A-B: 4), (C-B: 5), (D-B: 10). Greedily pick lowest crossing edge (A-B, weight 4). All 5 towers connected with 4 edges. Minimum Cost Spanning Tree complete: Total cabling cost = 10 units.',
        visitedNodes: ['A', 'B', 'C', 'D', 'E'],
        mstEdges: [{ u: 'A', v: 'C', weight: 2 }, { u: 'C', v: 'D', weight: 3 }, { u: 'D', v: 'E', weight: 1 }, { u: 'A', v: 'B', weight: 4 }],
        candidateEdge: { u: 'A', v: 'B' },
        totalCost: 10,
        telemetry: { cutSize: '5 / 5 Nodes (Spanned)', activeLinks: 4, totalWeight: 10 }
      }
    ]
  },

  'kruskals': {
    title: "Kruskal's Algorithm (Minimum Spanning Tree)",
    algorithm: 'Greedy Edge Sorting + DSU',
    canvasType: 'graph-network',
    badge: 'GREEDY (KRUSKAL)',
    color: 'emerald',
    totalSteps: 7,
    nodes: [
      { id: 'A', label: 'Tower A', x: 80, y: 70 },
      { id: 'B', label: 'Tower B', x: 260, y: 60 },
      { id: 'C', label: 'Tower C', x: 130, y: 180 },
      { id: 'D', label: 'Tower D', x: 300, y: 160 },
      { id: 'E', label: 'Tower E', x: 210, y: 240 }
    ],
    allEdges: [
      { u: 'D', v: 'E', weight: 1 },
      { u: 'A', v: 'C', weight: 2 },
      { u: 'C', v: 'D', weight: 3 },
      { u: 'A', v: 'B', weight: 4 },
      { u: 'B', v: 'C', weight: 5 },
      { u: 'C', v: 'E', weight: 7 },
      { u: 'B', v: 'D', weight: 10 }
    ],
    steps: [
      {
        step: 0,
        label: 'Step 0: Global Edge Sorting',
        log: 'Sorted all 7 network edges in ascending order of cabling weight: (D-E: 1), (A-C: 2), (C-D: 3), (A-B: 4), (B-C: 5), (C-E: 7), (B-D: 10). Initialized 5 disjoint sets: {A}, {B}, {C}, {D}, {E}.',
        mstEdges: [],
        rejectedEdges: [],
        currentEdge: null,
        totalCost: 0,
        telemetry: { edgesExamined: '0 / 7', inMst: '0 / 4', totalCost: 0 }
      },
      {
        step: 1,
        label: 'Step 1: Inspect Edge (D-E, Weight 1)',
        log: 'Find(D) ≠ Find(E). Endpoints in separate sets. Union({D}, {E}) formed. No cycle. ACCEPT edge (D-E).',
        mstEdges: [{ u: 'D', v: 'E', weight: 1 }],
        rejectedEdges: [],
        currentEdge: { u: 'D', v: 'E', status: 'accepted' },
        totalCost: 1,
        telemetry: { edgesExamined: '1 / 7', inMst: '1 / 4', totalCost: 1 }
      },
      {
        step: 2,
        label: 'Step 2: Inspect Edge (A-C, Weight 2)',
        log: 'Find(A) ≠ Find(C). Endpoints in separate sets. Union({A}, {C}) formed. No cycle. ACCEPT edge (A-C).',
        mstEdges: [{ u: 'D', v: 'E', weight: 1 }, { u: 'A', v: 'C', weight: 2 }],
        rejectedEdges: [],
        currentEdge: { u: 'A', v: 'C', status: 'accepted' },
        totalCost: 3,
        telemetry: { edgesExamined: '2 / 7', inMst: '2 / 4', totalCost: 3 }
      },
      {
        step: 3,
        label: 'Step 3: Inspect Edge (C-D, Weight 3)',
        log: 'Find(C)={A, C} ≠ Find(D)={D, E}. Merge sets via Union. No cycle. ACCEPT edge (C-D). Spanning set now {A, C, D, E}.',
        mstEdges: [{ u: 'D', v: 'E', weight: 1 }, { u: 'A', v: 'C', weight: 2 }, { u: 'C', v: 'D', weight: 3 }],
        rejectedEdges: [],
        currentEdge: { u: 'C', v: 'D', status: 'accepted' },
        totalCost: 6,
        telemetry: { edgesExamined: '3 / 7', inMst: '3 / 4', totalCost: 6 }
      },
      {
        step: 4,
        label: 'Step 4: Inspect Edge (A-B, Weight 4)',
        log: 'Find(A)={A, C, D, E} ≠ Find(B)={B}. Endpoints in separate sets. Union({A, C, D, E}, {B}). ACCEPT edge (A-B). MST has reached V - 1 = 4 edges!',
        mstEdges: [{ u: 'D', v: 'E', weight: 1 }, { u: 'A', v: 'C', weight: 2 }, { u: 'C', v: 'D', weight: 3 }, { u: 'A', v: 'B', weight: 4 }],
        rejectedEdges: [],
        currentEdge: { u: 'A', v: 'B', status: 'accepted' },
        totalCost: 10,
        telemetry: { edgesExamined: '4 / 7', inMst: '4 / 4 (Target Reached)', totalCost: 10 }
      },
      {
        step: 5,
        label: 'Step 5: Inspect Edge (B-C, Weight 5) [Cycle Check]',
        log: 'Find(B) == Find(C) because both already belong to the same connected component. Adding (B-C) would create cycle A-B-C-A! REJECT edge (B-C).',
        mstEdges: [{ u: 'D', v: 'E', weight: 1 }, { u: 'A', v: 'C', weight: 2 }, { u: 'C', v: 'D', weight: 3 }, { u: 'A', v: 'B', weight: 4 }],
        rejectedEdges: [{ u: 'B', v: 'C', weight: 5 }],
        currentEdge: { u: 'B', v: 'C', status: 'rejected' },
        totalCost: 10,
        telemetry: { edgesExamined: '5 / 7', inMst: '4 / 4', totalCost: 10 }
      },
      {
        step: 6,
        label: 'Step 6: Algorithm Termination',
        log: 'V - 1 = 4 edges selected spanning all 5 vertices with zero loops. Discard remaining edges (C-E: 7, B-D: 10). Final MST cabling cost = 10 units.',
        mstEdges: [{ u: 'D', v: 'E', weight: 1 }, { u: 'A', v: 'C', weight: 2 }, { u: 'C', v: 'D', weight: 3 }, { u: 'A', v: 'B', weight: 4 }],
        rejectedEdges: [{ u: 'B', v: 'C', weight: 5 }, { u: 'C', v: 'E', weight: 7 }, { u: 'B', v: 'D', weight: 10 }],
        currentEdge: null,
        totalCost: 10,
        telemetry: { edgesExamined: '7 / 7', inMst: '4 / 4', totalCost: 10 }
      }
    ]
  },

  'dijkstra': {
    title: "Dijkstra's Shortest Path Road Simulation",
    algorithm: 'Greedy Shortest Path',
    canvasType: 'road-network',
    badge: 'GREEDY / SHORTEST PATH',
    color: 'amber',
    totalSteps: 6,
    nodes: [
      { id: 'A', label: 'A (Origin)', x: 70, y: 150 },
      { id: 'B', label: 'B (Junction 1)', x: 190, y: 80 },
      { id: 'C', label: 'C (Junction 2)', x: 170, y: 220 },
      { id: 'D', label: 'D (Overpass)', x: 310, y: 90 },
      { id: 'E', label: 'E (Destination)', x: 370, y: 210 },
      { id: 'F', label: 'F (Detour)', x: 250, y: 280 }
    ],
    edges: [
      { from: 'A', to: 'B', weight: 4 },
      { from: 'A', to: 'C', weight: 2 },
      { from: 'C', to: 'B', weight: 1 },
      { from: 'B', to: 'D', weight: 5 },
      { from: 'C', to: 'D', weight: 8 },
      { from: 'C', to: 'E', weight: 10 },
      { from: 'D', to: 'E', weight: 2 },
      { from: 'C', to: 'F', weight: 6 },
      { from: 'F', to: 'E', weight: 7 }
    ],
    steps: [
      {
        step: 0,
        label: 'Step 0: Distance Table Initialization',
        log: 'Initialized distance table from Source A: dist[A] = 0 km, and dist[B, C, D, E, F] = ∞. Priority queue Q = {A:0}. Settled set = ∅.',
        settled: [],
        currentNode: null,
        distances: { A: 0, B: '∞', C: '∞', D: '∞', E: '∞', F: '∞' },
        activeRoute: [],
        telemetry: { minQueue: 'A (0 km)', settledCount: '0 / 6', optimalDist: 'Pending' }
      },
      {
        step: 1,
        label: 'Step 1: Settle Node A & Relax Neighbors',
        log: 'Extracted min node A (dist 0). Settle A. Relax outgoing road segments: (A→B, wt 4) ⇒ dist[B] = 4; (A→C, wt 2) ⇒ dist[C] = 2. Priority queue updated.',
        settled: ['A'],
        currentNode: 'A',
        distances: { A: 0, B: 4, C: 2, D: '∞', E: '∞', F: '∞' },
        activeRoute: ['A'],
        telemetry: { minQueue: 'C (2 km)', settledCount: '1 / 6', optimalDist: 'Scanning' }
      },
      {
        step: 2,
        label: 'Step 2: Settle Node C (dist 2) & Relax Edges',
        log: 'Greedily extracted unvisited node with min distance: C (dist 2). Settle C. Relax edges from C: C→B (wt 1): dist[C]+1 = 3 < dist[B]=4! Relax dist[B] down to 3! C→D (wt 8): dist[D] = 10; C→E (wt 10): dist[E] = 12; C→F (wt 6): dist[F] = 8.',
        settled: ['A', 'C'],
        currentNode: 'C',
        distances: { A: 0, B: 3, C: 2, D: 10, E: 12, F: 8 },
        activeRoute: ['A', 'C'],
        telemetry: { minQueue: 'B (3 km)', settledCount: '2 / 6', optimalDist: 'Updated via C' }
      },
      {
        step: 3,
        label: 'Step 3: Settle Node B (dist 3) & Relax Edges',
        log: 'Greedily extracted min node B (dist 3). Settle B. Relax edge B→D (wt 5): dist[B]+5 = 8 < dist[D]=10! Relax dist[D] down from 10 to 8! Predecessor of D is now B.',
        settled: ['A', 'C', 'B'],
        currentNode: 'B',
        distances: { A: 0, B: 3, C: 2, D: 8, E: 12, F: 8 },
        activeRoute: ['A', 'C', 'B'],
        telemetry: { minQueue: 'D / F (8 km)', settledCount: '3 / 6', optimalDist: 'Shortcut via B found' }
      },
      {
        step: 4,
        label: 'Step 4: Settle Node D (dist 8) & Relax Edges',
        log: 'Greedily extracted min node D (dist 8). Settle D. Relax edge D→E (wt 2): dist[D]+2 = 10 < dist[E]=12! Relax dist[E] down from 12 to 10! Predecessor of E is now D.',
        settled: ['A', 'C', 'B', 'D'],
        currentNode: 'D',
        distances: { A: 0, B: 3, C: 2, D: 8, E: 10, F: 8 },
        activeRoute: ['A', 'C', 'B', 'D'],
        telemetry: { minQueue: 'F (8 km)', settledCount: '4 / 6', optimalDist: 'Route to E improved' }
      },
      {
        step: 5,
        label: 'Step 5: Settle Destination Node E (dist 10) & Trace Optimal Path',
        log: 'Extracted min node E (dist 10). Destination reached and permanently settled! Backtracking predecessor pointers yields shortest path: A → C → B → D → E with total distance: 10 km (2 + 1 + 5 + 2). Navigation guidance active!',
        settled: ['A', 'C', 'B', 'D', 'E'],
        currentNode: 'E',
        distances: { A: 0, B: 3, C: 2, D: 8, E: 10, F: 8 },
        activeRoute: ['A', 'C', 'B', 'D', 'E'],
        telemetry: { minQueue: 'Destination Reached', settledCount: '5 / 6', optimalDist: '10 km (Shortest Route Found)' }
      }
    ]
  }
};
