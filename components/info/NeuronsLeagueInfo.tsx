import React from 'react';
import GlassCard from '../ui/GlassCard';
import { NeuronIcon } from '../../constants';

const MemoizedGlassCard = React.memo(GlassCard);

const NeuronsLeagueInfo: React.FC = React.memo(() => {
  return (
    <MemoizedGlassCard className="mb-6">
      <div className="flex items-center mb-4">
        <NeuronIcon className="w-10 h-10 text-[#A100FF] mr-3" />
        <h3 className="text-2xl font-orbitron text-[#A100FF]">About the Neurons League</h3>
      </div>
      <p className="text-[#F4F4F4]/80 mb-3">
        The Neurons League is where Gridrunners prove their intellectual dominance. 
        Earn Neurons (🧠) by winning duels in the Cortex Arena. The more Neurons you accumulate, the higher you'll climb in the ranks.
      </p>
      <p className="text-[#F4F4F4]/80 mb-3">
        Compete for top spots, earn exclusive titles, and showcase your strategic mind. 
        Seasonal resets will offer new challenges and opportunities to rise.
      </p>
      <p className="text-[#FFD700] font-semibold animate-pulse">
        Detailed league structure, tiers, and rewards coming soon!
      </p>
    </MemoizedGlassCard>
  );
});

export default NeuronsLeagueInfo;