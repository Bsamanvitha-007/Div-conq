import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { JourneySection } from './components/JourneySection';
import { AlgorithmExplorer } from './components/AlgorithmExplorer';
import { SimulationLab } from './components/SimulationLab';
import { ComparisonSection } from './components/ComparisonSection';
import { ComplexitySection } from './components/ComplexitySection';
import { FinalStorySection } from './components/FinalStorySection';
import { TakeawaysSection } from './components/TakeawaysSection';
import { PresentationModal } from './components/PresentationModal';
import { Footer } from './components/Footer';

export function App() {
  const [selectedAlgoId, setSelectedAlgoId] = useState('closest-pair');
  const [simAlgoId, setSimAlgoId] = useState('closest-pair');
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  // Keyboard shortcut listener ('v' or 'p' opens viva guide, 'Escape' closes it)
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'v' || e.key === 'V' || e.key === 'p' || e.key === 'P') && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        setIsPresentationOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsPresentationOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth scroll and select algorithm in explorer
  const handleSelectAlgorithmFromJourney = (algoId) => {
    setSelectedAlgoId(algoId);
    const explorerEl = document.getElementById('algorithms');
    if (explorerEl) {
      explorerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Launch simulation from explorer
  const handleLaunchSimulation = (algoId) => {
    let targetSimKey = algoId;
    if (algoId === 'mst') targetSimKey = 'kruskals';

    setSimAlgoId(targetSimKey);
    const simEl = document.getElementById('simulation');
    if (simEl) {
      simEl.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden font-sans">
      {/* Sticky Header Navigation */}
      <Navbar onOpenPresentation={() => setIsPresentationOpen(true)} />

      {/* Main Page Sections */}
      <main>
        {/* Hero Section with Interactive City Map & Floating Telemetry Panels */}
        <HeroSection 
          onExploreClick={() => {
            const el = document.getElementById('journey');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} 
        />

        {/* Section 1: The Ride Journey Timeline */}
        <JourneySection 
          onSelectAlgorithm={handleSelectAlgorithmFromJourney} 
        />

        {/* Section 2: Algorithm Explorer with Split-Pane Vertical Nav */}
        <AlgorithmExplorer 
          selectedAlgoId={selectedAlgoId} 
          onSelectAlgo={(id) => setSelectedAlgoId(id)}
          onLaunchSimulation={handleLaunchSimulation}
        />

        {/* Section 3: Live Algorithm Simulation Lab */}
        <SimulationLab 
          key={simAlgoId}
          defaultAlgo={simAlgoId} 
        />

        {/* Section 4: Comprehensive Comparison Section */}
        <ComparisonSection 
          onSelectAlgorithm={(id) => {
            setSelectedAlgoId(id);
            const el = document.getElementById('algorithms');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} 
        />

        {/* Section 5: Complexity Section ("Algorithm Performance Lab") */}
        <ComplexitySection />

        {/* Section 6: Final Story Section ("From Request to Destination") */}
        <FinalStorySection />

        {/* Section 7: Key Takeaways */}
        <TakeawaysSection />
      </main>

      {/* College Presentation & Viva Guide Modal */}
      <PresentationModal 
        isOpen={isPresentationOpen} 
        onClose={() => setIsPresentationOpen(false)} 
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
