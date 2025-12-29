
import React from 'react';
import Button from '../ui/Button';
import { GameIcon } from '../../constants'; // Or a more generic "loading" icon
import { useT } from "../../src/contexts/I18nLiveContext";

interface GenericGamePlaceholderProps {
  gameName: string;
  onExitGame: () => void;
}

const MemoizedButton = React.memo(Button);

const GenericGamePlaceholder: React.FC<GenericGamePlaceholderProps> = React.memo(({ gameName, onExitGame }) => {
  const { t } = useT();

  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-gradient-to-br from-[#0B0F1A] via-[#150035] to-[#220A30] text-[#F4F4F4] p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20">
        <MemoizedButton onClick={onExitGame} variant="secondary" size="small" className="opacity-80 hover:opacity-100">
          {t('common.close')} Game
        </MemoizedButton>
      </div>
      
      <GameIcon className="w-24 h-24 text-[#00E0FF] mb-8 animate-pulse opacity-70" style={{filter: 'drop-shadow(0 0 15px #00E0FF)'}} />

      <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-center mb-4 text-[#00E0FF]"
          style={{ textShadow: `0 0 8px #00E0FF, 0 0 15px #A100FF` }}>
        {gameName}
      </h1>
      
      <p className="text-lg md:text-xl text-[#F4F4F4]/80 mb-2 text-center">
        The digital arena for "{gameName}" is initializing...
      </p>
      <p className="text-md text-[#F4F4F4]/70 mb-8 text-center animate-pulse">
        Gameplay experience loading soon!
      </p>

      <div className="mt-auto pt-8 text-center text-xs text-[#F4F4F4]/60">
        <p>Prepare your strategy, Gridrunner. {gameName} awaits your command.</p>
        <p>18+ Only. Play Responsibly.</p>
      </div>

       <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={`line-${i}`}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-[#00E0FF]/20 to-transparent animate-neural-line"
            style={{
              left: `${10 + i * 20}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + i * 1.5}s`,
              transform: 'translateY(-100%)',
              filter: `blur(${i * 0.3}px)`
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes neural-line { 
            0% { transform: translateY(-100%) scaleY(0.5); opacity: 0; }
            10% { opacity: 1; transform: scaleY(1); }
            90% { opacity: 1; transform: scaleY(1); }
            100% { transform: translateY(100%) scaleY(0.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
});

export default GenericGamePlaceholder;
