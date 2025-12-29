
import React from 'react';
import GlassCard from '../ui/GlassCard';
import { AcademyIcon } from '../../constants';
import { useT } from "../../src/contexts/I18nLiveContext";

const MemoizedGlassCard = React.memo(GlassCard);

const AcademyPlaceholderView: React.FC = React.memo(() => {
  const { t } = useT();

  return (
    <div className="p-4 md:p-6 h-full flex flex-col space-y-6 overflow-y-auto">
      <div>
        <div className="flex items-center mb-2">
            <AcademyIcon className="w-10 h-10 text-[#FFD700] mr-3" style={{filter: 'drop-shadow(0 0 5px rgba(255,215,0,0.5))'}}/>
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-[#FFD700]" style={{textShadow: '0 0 6px rgba(255,215,0,0.7), 0 0 10px rgba(255,215,0,0.4)'}}>
            {t('academy.title')}
            </h2>
        </div>
        <p className="text-[#F4F4F4]/70 text-lg">{t('academy.description')}</p>
      </div>

      <MemoizedGlassCard>
        <ul className="list-disc list-inside space-y-2 text-[#F4F4F4]/80">
          <li>{t('academy.topic1')}</li>
          <li>{t('academy.topic2')}</li>
          <li>{t('academy.topic3')}</li>
          <li>{t('academy.topic4')}</li>
        </ul>
      </MemoizedGlassCard>

      <MemoizedGlassCard className="text-center">
        <p className="text-xl text-[#FFD700] font-orbitron animate-pulse">
          {t('academy.comingSoon')}
        </p>
      </MemoizedGlassCard>

       <div className="mt-auto pt-8 text-center text-sm text-[#F4F4F4]/60">
        <p>ClashMind Academy: Sharpen Your Intellect. Elevate Your Game.</p>
      </div>
    </div>
  );
});

export default AcademyPlaceholderView;
