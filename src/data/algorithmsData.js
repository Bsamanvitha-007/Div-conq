export const algorithmsData = [
  {
    id: 'closest-pair',
    number: '01',
    name: 'Closest Pair of Points',
    shortName: 'Closest Pair',
    category: 'Divide & Conquer',
    categoryColor: 'cyan',
    badge: 'DIVIDE & CONQUER',
    application: 'Real-time Driver-Passenger Spatial Matching',
    systemStage: 'MATCHING PHASE',
    problem: 'Given n coordinates of available drivers and passenger pickup locations on a 2D city plane, find the pair with the minimum Euclidean distance.',
    goal: 'Minimize spatial pickup distance and reduce passenger waiting time (ETA).',
    wording: 'can be used to model spatial proximity and localized driver pairing in ride-hailing networks',
    academicDisclaimer: 'Note: Modern production systems typically combine spatial indexing (e.g., Geohashes, Uber H3 hexagonal spatial cells, R-trees) with geometric divide-and-conquer principles to search nearby spatial buckets.',
    idea: {
      divide: 'Sort points by X-coordinate and divide the 2D plane with a vertical median line x = x_mid into two equal subsets: Left (L) and Right (R).',
      solve: 'Recursively compute the minimum distance in L (delta_L) and in R (delta_R). Let delta = min(delta_L, delta_R).',
      compare: 'Inspect points within a 2*delta strip centered on x_mid. For every point in the strip, only compare with points within delta vertical distance (at most 7 points in 2D Euclidean space).',
      combine: 'Return the global minimum distance d_min = min(delta, delta_strip).'
    },
    example: {
      passenger: { name: 'P (Pickup)', x: 52, y: 48 },
      drivers: [
        { id: 'D1', name: 'Driver 1', x: 20, y: 70, dist: '4.2 km' },
        { id: 'D2', name: 'Driver 2', x: 48, y: 52, dist: '1.8 km', isClosest: true },
        { id: 'D3', name: 'Driver 3', x: 80, y: 35, dist: '6.1 km' },
        { id: 'D4', name: 'Driver 4', x: 35, y: 25, dist: '3.9 km' },
        { id: 'D5', name: 'Driver 5', x: 70, y: 75, dist: '5.4 km' }
      ],
      result: 'Driver D2 matched at 1.8 km distance in the central strip region.'
    },
    complexity: {
      time: 'O(n log n)',
      timeNote: 'With arrays pre-sorted by X and Y coordinates (Recurrence: T(n) = 2T(n/2) + O(n)). Naive brute-force is O(n²).',
      space: 'O(n)',
      spaceNote: 'Auxiliary memory for strip points and recursive call stack.'
    },
    keyTakeaway: 'Spatial proximity problems can be recursively divided into half-planes to break through the quadratic O(n²) bottleneck without missing boundary pairs.'
  },
  {
    id: 'job-sequencing',
    number: '02',
    name: 'Job Sequencing with Deadlines',
    shortName: 'Job Sequencing',
    category: 'Greedy Algorithm',
    categoryColor: 'violet',
    badge: 'GREEDY',
    application: 'Cloud Computing & Dispatch Resource Allocation',
    systemStage: 'BACKEND DISPATCH & COMPUTE',
    problem: 'A ride-hailing backend processes continuous real-time jobs (surge pricing calculations, dispatch queries, payment validations, telemetry pings) where each job has an execution deadline and a profit/priority score.',
    goal: 'Schedule jobs on cloud compute nodes within unit time slots to maximize total accumulated profit/system utility before deadlines expire.',
    wording: 'conceptually applies to backend job batching, microservice prioritization, and cloud server resource allocation',
    academicDisclaimer: 'Note: Commercial cloud systems employ distributed orchestrators (e.g., Kubernetes, task queues) using priority queues, rate limiters, and bin-packing heuristics inspired by deadline scheduling.',
    idea: {
      divide: 'Sort all incoming jobs in non-increasing (descending) order of their profit/priority score.',
      solve: 'Initialize time slots 1, 2, ..., max_deadline as unoccupied.',
      compare: 'For each candidate job in sorted order, search greedily for the latest available empty time slot t <= job.deadline.',
      combine: 'If an eligible slot is found, assign the job to slot t and add its profit to the system total. If no slot exists before the deadline, discard the job.'
    },
    example: {
      resources: ['VM-01 (Dispatch Engine)', 'VM-02 (Pricing Node)', 'VM-03 (Telemetry Worker)'],
      jobs: [
        { id: 'J1', name: 'Surge Price Calculation', deadline: 2, profit: 100, status: 'Scheduled (Slot 2)' },
        { id: 'J2', name: 'High-Priority Dispatch', deadline: 1, profit: 90, status: 'Scheduled (Slot 1)' },
        { id: 'J3', name: 'ETA Matrix Refresh', deadline: 2, profit: 70, status: 'Rejected (Slots Full)' },
        { id: 'J4', name: 'Driver Telemetry Ingest', deadline: 3, profit: 50, status: 'Scheduled (Slot 3)' },
        { id: 'J5', name: 'Log Archival Sync', deadline: 1, profit: 20, status: 'Rejected (Slot 1 Taken)' }
      ],
      result: 'Maximized utility score: ₹240 (Jobs J2, J1, J4 assigned to slots 1, 2, 3).'
    },
    complexity: {
      time: 'O(n²)',
      timeNote: 'O(n²) for naive slot search; can be optimized to O(n log n) or O(n · α(d)) using Disjoint Set Union (DSU) to find available slots in almost constant time.',
      space: 'O(n + d)',
      spaceNote: 'Array storage for time slots and parent pointers in DSU tree.'
    },
    keyTakeaway: 'Greedy choices that prioritize maximal profit first and schedule at the latest possible valid moment preserve earlier slots for tightly constrained tasks.'
  },
  {
    id: 'mst',
    number: '03',
    name: 'Minimum Cost Spanning Tree (MST)',
    shortName: 'Minimum Spanning Tree',
    category: 'Greedy Algorithm',
    categoryColor: 'emerald',
    badge: 'GREEDY',
    application: 'Telecommunication & Urban Cell Tower Network Infrastructure',
    systemStage: 'NETWORK INFRASTRUCTURE',
    problem: 'Connect multiple urban cellular base stations and 5G edge towers across city sectors with high-bandwidth optical fiber cables so all towers communicate without communication loops and with minimum total installation cabling cost.',
    goal: 'Connect V vertices with exactly V - 1 edges while minimizing the sum of edge weights.',
    wording: 'used here as a conceptual model for cost-efficient network infrastructure; distinctly separate from individual vehicle navigation routes',
    academicDisclaimer: 'Note: MST optimizes stationary infrastructure wiring (cabling cost). It should NOT be confused with single-source passenger route finding, which requires path algorithms like Dijkstra.',
    idea: {
      divide: "Kruskal's Approach: Sort all network edges by weight in ascending order. Use Disjoint Set Union (DSU) to add edges one by one, discarding any edge that creates a cycle until V - 1 edges are connected.",
      solve: "Prim's Approach: Start from an arbitrary seed tower. Maintain a cut of visited vs unvisited towers; greedily select the minimum-weight edge crossing the cut until all towers belong to the tree.",
      compare: 'Both algorithms guarantee a globally optimal minimum spanning tree thanks to the Cut Property and Cycle Property of matroids.',
      combine: 'Produces an acyclic connected subgraph covering all nodes with the minimum possible total edge weight.'
    },
    example: {
      towers: ['Tower A (Hub)', 'Tower B (Downtown)', 'Tower C (Uptown)', 'Tower D (Industrial)', 'Tower E (Suburbs)'],
      edges: [
        { u: 'A', v: 'B', weight: 4 },
        { u: 'A', v: 'C', weight: 2, inMst: true },
        { u: 'B', v: 'C', weight: 5 },
        { u: 'B', v: 'D', weight: 10 },
        { u: 'C', v: 'D', weight: 3, inMst: true },
        { u: 'C', v: 'E', weight: 7 },
        { u: 'D', v: 'E', weight: 1, inMst: true },
        { u: 'A', v: 'B', weight: 4, inMst: true }
      ],
      result: 'Total minimal cabling cost: 10 units connecting all 5 towers with 4 links: (D-E: 1) + (A-C: 2) + (C-D: 3) + (A-B: 4).'
    },
    complexity: {
      time: "Kruskal: O(E log E) | Prim: O(E log V) or O(V²)",
      timeNote: "Kruskal is optimal for sparse graphs (E << V²). Prim with a binary min-heap achieves O(E log V); with a Fibonacci heap O(E + V log V); naive array is O(V²).",
      space: 'O(V + E)',
      spaceNote: 'Storage for adjacency lists, parent arrays, and priority queues.'
    },
    keyTakeaway: 'By repeatedly applying the Cut Property greedily, MST constructs a connected, cycle-free communication topology with minimal expenditure.'
  },
  {
    id: 'dijkstra',
    number: '04',
    name: "Dijkstra's Algorithm",
    shortName: "Dijkstra's Algorithm",
    category: 'Shortest Path / Greedy',
    categoryColor: 'amber',
    badge: 'GREEDY / SHORTEST PATH',
    application: 'Road-Network Real-time Vehicle Route Planning',
    systemStage: 'NAVIGATION & ROUTE PLANNING',
    problem: 'Given a city road network modeled as a directed/undirected weighted graph where vertices represent road intersections and edge weights represent travel times/distances, find the least-cost path from the driver’s current location to the passenger’s destination.',
    goal: 'Minimize total travel time, fuel burn, and routing latency between pickup and dropoff.',
    wording: 'similar to digital map and navigation systems; serves as the foundational algorithm upon which production routing engines are built',
    academicDisclaimer: 'Note: Commercial navigation platforms (Google Maps, OSRM) preprocess continental graphs using Contraction Hierarchies (CH), Transit Node Routing, or A* heuristics to answer shortest path queries in milliseconds.',
    idea: {
      divide: 'Initialize source distance dist[S] = 0, and all other vertices dist[v] = ∞. Maintain a set of unvisited nodes.',
      solve: 'Greedily extract the unvisited node u with the minimum tentative distance dist[u] from the priority queue.',
      compare: 'For each neighbor v of u, perform Edge Relaxation: if dist[u] + weight(u, v) < dist[v], update dist[v] = dist[u] + weight(u, v) and record u as the predecessor of v.',
      combine: 'Lock u as permanently visited. Repeat until destination node is settled, then backtrack predecessor pointers to reconstruct the optimal route.'
    },
    example: {
      start: 'A (Driver & Passenger Origin)',
      destination: 'E (Airport Terminal)',
      nodes: ['A', 'B', 'C', 'D', 'E', 'F'],
      edges: [
        { from: 'A', to: 'B', weight: 4 },
        { from: 'A', to: 'C', weight: 2 },
        { from: 'C', to: 'B', weight: 1 },
        { from: 'B', to: 'D', weight: 5 },
        { from: 'C', to: 'D', weight: 8 },
        { from: 'C', to: 'E', weight: 10 },
        { from: 'D', to: 'E', weight: 2 }
      ],
      path: ['A', 'C', 'B', 'D', 'E'],
      cost: '10 km (A-C:2 + C-B:1 + B-D:5 + D-E:2)'
    },
    complexity: {
      time: 'O((V + E) log V)',
      timeNote: 'With Binary Min-Heap Priority Queue. Naive linear array is O(V²). With Fibonacci Heap it is O(E + V log V). Does not support negative edge weights.',
      space: 'O(V)',
      spaceNote: 'Storage for distance table, visited bitset, and predecessor map.'
    },
    keyTakeaway: 'The greedy choice of settling the globally nearest unvisited vertex guarantees optimal subpaths under non-negative edge costs.'
  }
];
