export const journeySteps = [
  {
    step: '01',
    id: 'request',
    title: 'REQUEST',
    subtitle: 'Trip Ingestion',
    question: 'Passenger triggers ride request with GPS coordinates',
    algorithm: null,
    algoBadge: 'CLIENT INPUT',
    description: 'The mobile app captures the rider’s exact coordinates (Latitude, Longitude), resolves reverse-geocoding, and broadcasts a trip packet to the edge dispatch gateway.',
    metrics: { latency: '12 ms', payload: '0.8 KB', status: 'Active' },
    color: 'slate'
  },
  {
    step: '02',
    id: 'match',
    title: 'MATCH',
    subtitle: 'Driver Proximity Search',
    question: 'Which available driver is geographically closest?',
    algorithm: 'Closest Pair of Points',
    algoBadge: 'DIVIDE & CONQUER',
    algoId: 'closest-pair',
    description: 'Models candidate driver locations and pickup coordinates on a 2D plane. Recursively divides city quadrants to find the minimum Euclidean distance in O(n log n) time.',
    metrics: { candidates: '1,420 Drivers', nearestDist: '1.8 km', matchTime: '4 ms' },
    color: 'cyan'
  },
  {
    step: '03',
    id: 'schedule',
    title: 'SCHEDULE',
    subtitle: 'Cloud Resource Dispatching',
    question: 'How do cloud clusters schedule computing tasks within deadlines?',
    algorithm: 'Job Sequencing with Deadlines',
    algoBadge: 'GREEDY ALGORITHM',
    algoId: 'job-sequencing',
    description: 'Backend server tasks (driver verification, surge matrix, ETA compute) are greedily sorted by utility and mapped to latest valid execution time slots on VM worker pools.',
    metrics: { vmPool: '3 Nodes', scheduled: '92% Tasks', profitScore: '₹240' },
    color: 'violet'
  },
  {
    step: '04',
    id: 'connect',
    title: 'CONNECT',
    subtitle: 'Cell Tower Backbone Mesh',
    question: 'How do urban base stations maintain redundant low-cost connectivity?',
    algorithm: 'Minimum Cost Spanning Tree',
    algoBadge: 'GREEDY (PRIM & KRUSKAL)',
    algoId: 'mst',
    description: 'Models stationary telecommunication towers as graph vertices. Applies Prim’s or Kruskal’s greedy strategy to establish fiber/microwave cabling with minimum total cost and no loops.',
    metrics: { towers: '5 Core Nodes', links: '4 Minimum Cables', totalCost: '10 Units' },
    color: 'emerald'
  },
  {
    step: '05',
    id: 'route',
    title: 'ROUTE',
    subtitle: 'Optimal Turn-by-Turn Navigation',
    question: 'Which path through intersections minimizes travel time?',
    algorithm: "Dijkstra's Shortest Path",
    algoBadge: 'GREEDY / SHORTEST PATH',
    algoId: 'dijkstra',
    description: 'Interprets city intersections as vertices and road segments as weighted directed edges. Continuously relaxes edge distances to calculate the least-cost path from origin to destination.',
    metrics: { distance: '12.4 km', eta: '08 min', settledNodes: '6 Intersections' },
    color: 'amber'
  },
  {
    step: '06',
    id: 'arrive',
    title: 'ARRIVE',
    subtitle: 'Destination Reached',
    question: 'Passenger successfully drops off with verified telemetry',
    algorithm: null,
    algoBadge: 'MISSION COMPLETE',
    description: 'The vehicle reaches destination coordinates, trip metrics are reconciled, digital fare settlement triggers, and the driver status flips back to available in the spatial index.',
    metrics: { tripStatus: 'Completed', tripTime: '8m 42s', satisfaction: '99.4%' },
    color: 'emerald'
  }
];
