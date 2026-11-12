import React, { useState } from 'react';
import { Flag } from 'lucide-react';


export const InteractiveCityMap = ({ onSelectDriver, activeDriverId = 'D2' }) => {
  const [hoveredNode, setHoveredNode] = useState(null);

  // Map coordinates (SVG 500x400 viewBox)
  const passenger = { id: 'P', name: 'Passenger (Rider)', x: 190, y: 190, label: 'Pickup Point: 37.7749° N, 122.4194° W' };
  const destination = { id: 'Dest', name: 'Destination (Terminal 2)', x: 420, y: 80, label: 'Airport Hub: Gate 14 Dropoff' };

  const drivers = [
    { id: 'D1', name: 'Driver D1 (Sedan)', x: 70, y: 110, dist: '4.2 km', eta: '12 min', rating: '4.92', status: 'In-Transit' },
    { id: 'D2', name: 'Driver D2 (Electric)', x: 145, y: 155, dist: '1.8 km', eta: '04 min', rating: '4.98', isClosest: true, status: 'Matched' },
    { id: 'D3', name: 'Driver D3 (Compact)', x: 110, y: 310, dist: '5.1 km', eta: '15 min', rating: '4.85', status: 'Available' },
    { id: 'D4', name: 'Driver D4 (XL SUV)', x: 290, y: 320, dist: '3.9 km', eta: '10 min', rating: '4.91', status: 'Available' },
    { id: 'D5', name: 'Driver D5 (Prime)', x: 330, y: 160, dist: '4.8 km', eta: '13 min', rating: '4.89', status: 'Available' },
  ];

  const currentDriver = drivers.find(d => d.id === activeDriverId) || drivers[1];

  // Intermediate road junctions for the route from passenger to destination
  const routeWaypoints = [
    { x: passenger.x, y: passenger.y },
    { x: 230, y: 160 },
    { x: 280, y: 130 },
    { x: 350, y: 110 },
    { x: destination.x, y: destination.y }
  ];

  const routePathD = `M ${routeWaypoints.map(p => `${p.x} ${p.y}`).join(' L ')}`;

  // Calculate live Euclidean distance pixel metric for the active driver
  const deltaX = Math.abs(currentDriver.x - passenger.x);
  const deltaY = Math.abs(currentDriver.y - passenger.y);
  const pixelDist = Math.round(Math.sqrt(deltaX * deltaX + deltaY * deltaY));

  return (
    <div className="relative w-full aspect-[5/4] max-w-xl mx-auto rounded-2xl bg-[#050913] border border-cyan-500/20 shadow-2xl shadow-cyan-950/40 overflow-hidden group">
      {/* Background City Grid & Radar Network */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 400" fill="none">
        <defs>
          <pattern id="city-grid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(56, 189, 248, 0.04)" strokeWidth="1" />
          </pattern>
          <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="radar-sweep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 240, 255, 0.15)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <rect width="100%" height="100%" fill="url(#city-grid)" />

        {/* Concentric Distance Rings around Passenger (1km, 2km, 3km radius equivalents) */}
        <g stroke="rgba(56, 189, 248, 0.08)" strokeDasharray="3 3">
          <circle cx={passenger.x} cy={passenger.y} r="55" />
          <circle cx={passenger.x} cy={passenger.y} r="110" />
          <circle cx={passenger.x} cy={passenger.y} r="165" />
          <text x={passenger.x + 58} y={passenger.y - 4} fill="#475569" fontSize="8" fontFamily="JetBrains Mono">1.8 km</text>
          <text x={passenger.x + 113} y={passenger.y - 4} fill="#475569" fontSize="8" fontFamily="JetBrains Mono">3.6 km</text>
          <text x={passenger.x + 168} y={passenger.y - 4} fill="#475569" fontSize="8" fontFamily="JetBrains Mono">5.4 km</text>
        </g>

        {/* Abstract Arterial City Road Network */}
        <g stroke="rgba(148, 163, 184, 0.08)" strokeWidth="1.5">
          <line x1="30" y1="80" x2="470" y2="80" />
          <line x1="30" y1="160" x2="470" y2="160" />
          <line x1="30" y1="240" x2="470" y2="240" />
          <line x1="30" y1="320" x2="470" y2="320" />
          <line x1="100" y1="20" x2="100" y2="380" />
          <line x1="200" y1="20" x2="200" y2="380" />
          <line x1="300" y1="20" x2="300" y2="380" />
          <line x1="400" y1="20" x2="400" y2="380" />
          {/* Diagonals / Expressways */}
          <line x1="50" y1="50" x2="450" y2="350" strokeDasharray="4 6" stroke="rgba(56, 189, 248, 0.05)" />
          <line x1="50" y1="350" x2="450" y2="50" strokeDasharray="4 6" stroke="rgba(56, 189, 248, 0.05)" />
        </g>

        {/* Inactive candidate driver lines (subtle dashed) */}
        {drivers.map(d => {
          if (d.id === currentDriver.id) return null;
          return (
            <line
              key={`inactive-line-${d.id}`}
              x1={d.x}
              y1={d.y}
              x2={passenger.x}
              y2={passenger.y}
              stroke="rgba(148, 163, 184, 0.12)"
              strokeDasharray="3 4"
              strokeWidth="1"
            />
          );
        })}

        {/* Highlighted Match Line: Selected Driver -> Passenger */}
        <line
          x1={currentDriver.x}
          y1={currentDriver.y}
          x2={passenger.x}
          y2={passenger.y}
          stroke="#00F0FF"
          strokeWidth="2.5"
          className="animate-dash-stream"
          filter="url(#glow)"
        />

        {/* Euclidean Distance Formula Midpoint Tag */}
        <g transform={`translate(${(currentDriver.x + passenger.x) / 2}, ${(currentDriver.y + passenger.y) / 2 - 8})`}>
          <rect x="-35" y="-9" width="70" height="18" rx="4" fill="#030712" stroke="#00F0FF" strokeWidth="1" />
          <text x="0" y="3" textAnchor="middle" fill="#00F0FF" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">
            d: {currentDriver.dist}
          </text>
        </g>

        {/* Highlighted Optimal Highway Route: Passenger -> Destination */}
        <path
          d={routePathD}
          stroke="rgba(0, 240, 255, 0.25)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={routePathD}
          stroke="url(#route-gradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Animated pulse packet moving along the route */}
        <circle r="4.5" fill="#00F0FF" filter="url(#glow)">
          <animateMotion dur="3.5s" repeatCount="indefinite" path={routePathD} />
        </circle>

        {/* Destination Beacon */}
        <g 
          transform={`translate(${destination.x}, ${destination.y})`}
          className="cursor-pointer"
          onMouseEnter={() => setHoveredNode(destination)}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <circle r="16" fill="rgba(16, 185, 129, 0.15)" className="animate-ping" />
          <circle r="9" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
          <Flag className="w-3.5 h-3.5 text-emerald-400 -translate-x-1.5 -translate-y-1.5 pointer-events-none" />
          <text x="14" y="4" fill="#6EE7B7" fontSize="10" fontFamily="Space Grotesk" fontWeight="600">
            DESTINATION
          </text>
        </g>

        {/* Passenger Beacon */}
        <g 
          transform={`translate(${passenger.x}, ${passenger.y})`}
          className="cursor-pointer"
          onMouseEnter={() => setHoveredNode(passenger)}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <circle r="22" fill="rgba(0, 240, 255, 0.15)" className="animate-pulse-subtle" />
          <circle r="11" fill="#0C4A6E" stroke="#00F0FF" strokeWidth="2.5" />
          <circle r="4" fill="#00F0FF" />
          <text x="14" y="4" fill="#38BDF8" fontSize="11" fontFamily="Space Grotesk" fontWeight="700">
            PASSENGER (P)
          </text>
        </g>

        {/* Driver Fleet Nodes */}
        {drivers.map(d => {
          const isSelected = d.id === currentDriver.id;
          return (
            <g
              key={d.id}
              transform={`translate(${d.x}, ${d.y})`}
              className="cursor-pointer transition-transform duration-200 hover:scale-125"
              onClick={() => onSelectDriver && onSelectDriver(d.id)}
              onMouseEnter={() => setHoveredNode(d)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {isSelected && (
                <circle r="18" fill="rgba(0, 240, 255, 0.25)" className="animate-ping" />
              )}
              <circle
                r="9"
                fill={isSelected ? '#083344' : '#1E293B'}
                stroke={isSelected ? '#00F0FF' : '#64748B'}
                strokeWidth={isSelected ? 2.5 : 1.5}
              />
              <text
                x="0"
                y="3"
                textAnchor="middle"
                fill={isSelected ? '#00F0FF' : '#94A3B8'}
                fontSize="8"
                fontWeight="700"
                fontFamily="JetBrains Mono"
              >
                {d.id}
              </text>
              <text
                x="12"
                y="3"
                fill={isSelected ? '#38BDF8' : '#64748B'}
                fontSize="9"
                fontFamily="Space Grotesk"
                fontWeight={isSelected ? '600' : '400'}
              >
                {d.dist}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Modern HUD Card Over Map */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-cyan-500/30 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-slate-300">
            Dispatch Pair: <strong className="text-cyan-300">{currentDriver.name}</strong> ({currentDriver.dist})
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
          <span>ETA: <strong className="text-emerald-400">{currentDriver.eta}</strong></span>
          <span className="hidden sm:inline">Euclidean: <strong className="text-cyan-400">{pixelDist}px</strong></span>
        </div>
      </div>

      {/* Hover Info Tooltip */}
      {hoveredNode && (
        <div className="absolute top-3 left-3 px-3 py-2 rounded-lg bg-slate-950/95 border border-cyan-500/50 backdrop-blur-md text-[11px] font-mono text-slate-200 shadow-2xl pointer-events-none space-y-0.5">
          <div className="text-cyan-400 font-bold">{hoveredNode.name}</div>
          {hoveredNode.dist && <div>Proximity: {hoveredNode.dist} • ETA: {hoveredNode.eta}</div>}
          {hoveredNode.label && <div className="text-slate-400 text-[10px]">{hoveredNode.label}</div>}
        </div>
      )}

      {/* Top Right Live Telemetry Chip */}
      <div className="absolute top-3 right-3 flex items-center gap-2 px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-300">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>RADAR 10Hz • TAP DRIVER</span>
      </div>
    </div>
  );
};

