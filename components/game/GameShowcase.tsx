
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { GameInfo } from '../../types';
import GlassCard from '../ui/GlassCard'; 
import Button from '../ui/Button';
import SkeletonLoader from '../ui/SkeletonLoader'; 
import { useT } from "../../src/contexts/I18nLiveContext";

/**
 * @typedef GameCardProps
 * @property {GameInfo} game - The game information.
 * @property {(gameId: string, gameName: string) => void} [onPlayGame] - Callback to initiate playing the game.
 * @property {boolean} [isLoading] - Optional flag for loading state.
 */
interface GameCardProps {
  game: GameInfo;
  onPlayGame?: (gameId: string, gameName: string) => void;
  isLoading?: boolean;
}

const MemoizedButton = React.memo(Button);
// Removed MemoizedGlassCard as we use GlassCard directly with interactive prop

/**
 * GameCard component displays information about a single game.
 * Shows skeleton UI if isLoading is true.
 * @param {GameCardProps} props - Component props.
 * @returns {JSX.Element} The rendered GameCard component.
 */
const GameCard: React.FC<GameCardProps> = React.memo(({ game, onPlayGame, isLoading }) => {
  const { t } = useT();
  const [isHoveredForDetails, setIsHoveredForDetails] = useState(false);
  const [showInteractionOptions, setShowInteractionOptions] = useState(false);

  const handleCardClick = useCallback(() => {
    if (isLoading) return;
    setShowInteractionOptions(prev => !prev);
  }, [isLoading]);

  const { style: backgroundStyle, particleOverlayBase } = useMemo(() => {
    let bgStyle: React.CSSProperties = {};
    const overlayBase = `content-[''] absolute inset-0 z-[-1] transition-opacity duration-500 group-hover:opacity-100 opacity-50`;
    let baseCardBg = '#181C27'; 

    switch (game.id) {
      case 'forms-fights':
        baseCardBg = '#0A0D14'; 
        bgStyle = {
          backgroundImage: `
            linear-gradient(145deg, rgba(10, 13, 20, 0.95) 0%, rgba(25, 28, 38, 0.98) 100%),
            repeating-conic-gradient(from 30deg, #A100FF0D 0% 7%, transparent 7% 22%), /* Changed from #00A1FF0D */
            radial-gradient(circle at top left, #A100FF4D, transparent 35%),
            radial-gradient(circle at bottom right, #FF00C830, transparent 45%)
          `,
          backgroundColor: baseCardBg,
          backgroundBlendMode: 'multiply, screen, overlay, overlay',
          backgroundRepeat: 'no-repeat, repeat, no-repeat, no-repeat',
          backgroundSize: '100% 100%, 90px 90px, 110% 110%, 110% 110%'
        };
        break;
      case 'gravity-four':
        baseCardBg = '#03001C'; 
        bgStyle = {
          backgroundImage: `
            radial-gradient(ellipse at 75% 25%, #A100FF40 0%, transparent 55%), /* Changed from #00A1FF40 */
            radial-gradient(ellipse at 25% 75%, #FFD70033 0%, transparent 45%), 
            linear-gradient(to bottom right, ${baseCardBg} 80%, #0A0D14 100%)
          `,
          backgroundColor: baseCardBg
        };
        break;
      case 'memory-mind':
        baseCardBg = '#1A0B1F'; 
        bgStyle = { 
            backgroundImage: `
            linear-gradient(135deg, rgba(26, 11, 31, 0.95) 0%, rgba(45, 15, 62, 0.98) 100%),
            radial-gradient(ellipse at center, #FFD70020 0%, transparent 65%),
            repeating-linear-gradient(-45deg, #A100FF08, #A100FF08 2px, transparent 2px, transparent 12px)
            `,
            backgroundColor: baseCardBg,
            backgroundBlendMode: 'multiply, overlay, normal',
        };
        break;
      default: // Calcul Rush, LogicLink and other defaults
        baseCardBg = '#181C27';
        bgStyle = { 
            backgroundImage: `
            linear-gradient(160deg, rgba(24, 28, 39, 0.92) 0%, rgba(35, 40, 52, 0.96) 100%),
            radial-gradient(ellipse at 50% 50%, #6A00FF1A 0%, transparent 70%)
            `,
            backgroundColor: baseCardBg,
            backgroundSize: 'cover, 150% 150%',
            backgroundPosition: 'center, center',
        };
    }
    return { style: bgStyle, particleOverlayBase: overlayBase };
  }, [game.id]);

  if (isLoading) {
    return (
      <GlassCard className="h-96 flex flex-col p-5 interactive={false}"> {/* No hover for skeleton */}
        <SkeletonLoader type="text" className="w-3/4 h-8 mb-2.5" /> {/* Larger title */}
        <SkeletonLoader type="text" className="w-full h-5 mb-5" /> {/* Larger caption */}
        <div className="flex-grow" />
        <SkeletonLoader type="text" className="w-1/2 h-6 mx-auto mb-3.5" /> {/* Larger wager text */}
        <SkeletonLoader type="button" className="w-full h-12 rounded-xl" /> {/* Match button style */}
      </GlassCard>
    );
  }

  return (
    <GlassCard 
      className={`relative flex flex-col h-96 group overflow-hidden transition-all duration-300 ease-in-out cursor-pointer`}
      interactive={true} // Enable hover effects from GlassCard
      onMouseEnter={() => setIsHoveredForDetails(true)}
      onMouseLeave={() => setIsHoveredForDetails(false)}
      onClick={handleCardClick}
      aria-label={`${t('gameShowcase.play', { gameTitle: game.title })}. ${t('gameShowcase.wager', { sparks: game.starsToWin })}.`}
    >
      <div 
        className="absolute inset-0 z-0 transition-transform duration-500 ease-out group-hover:scale-110" // Enhanced BG scale
        style={backgroundStyle}
      >
        <div className={`${particleOverlayBase} bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF00C81A] via-transparent to-transparent bg-repeat animate-pulse`} /* Changed from #00E0FF1A */
             style={{backgroundSize: '90px 90px', animationDuration: '7s', animationDelay: '0.3s' }}></div>
        <div className={`${particleOverlayBase} bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#A100FF15] via-transparent to-transparent bg-repeat animate-pulse`}
             style={{backgroundSize: '130px 130px', animationDuration: '9s', animationDelay: '1.2s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col h-full p-5 md:p-6">
        <div className="flex-grow mb-4">
          <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-[#FFD700] mb-2 tracking-wide" style={{textShadow: '0 0 5px rgba(255,215,0,0.7), 0 0 8px rgba(255,215,0,0.4)'}}>{game.title}</h3>
          <p className="text-sm text-[#E0E7FF]/90 italic leading-snug">{game.caption}</p>
        </div>
        
        {game.id === 'calcul-rush' && isHoveredForDetails && (
             <div className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translatey-1/2 pointer-events-none">
                <span className="absolute animate-ping inline-flex h-full w-full rounded-full bg-[#FF00C8]/50 opacity-75" style={{animationDuration: '1.3s'}}></span> {/* Changed from #00E0FF */}
                <span className="absolute inline-flex rounded-full h-16 w-16 bg-[#FF00C8]/25 top-2 left-2"></span> {/* Changed from #00E0FF */}
             </div>
        )}
         <div className="text-center mb-3">
            <p className="text-xs text-[#E0E7FF]/70 uppercase tracking-wider">{t('gameShowcase.standardWager')}</p>
            <p className="text-xl font-orbitron text-[#FFD700] tracking-wider">{game.starsToWin} {t('currency.sparks')}</p>
            <p className="text-[11px] text-[#A100FF]/80 mt-1 font-medium">{t('gameShowcase.practiceModeSoon')}</p>
         </div>

        <div className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#0A0D14]/95 to-[#0A0D14]/80 backdrop-blur-sm 
                        border-t-2 border-[#FF00C8]/80 rounded-b-2xl shadow-2xl shadow-black/50
                        transition-all duration-300 ease-in-out transform 
                        ${isHoveredForDetails && !showInteractionOptions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}
        >
          <h4 className="text-md font-orbitron text-[#00E0FF] mb-2.5">{t('gameShowcase.duelDetails')}</h4>
          <ul className="text-xs text-[#E0E7FF]/80 space-y-1.5">
            <li><strong>{t('gameShowcase.type')}:</strong> {game.gameType}</li>
            <li><strong>{t('gameShowcase.duration')}:</strong> {game.estimatedDuration}</li>
            <li><strong>{t('gameShowcase.difficulty')}:</strong> <span className={`font-semibold ${
              game.difficulty === 'Easy' ? 'text-green-300' : 
              game.difficulty === 'Medium' ? 'text-yellow-300' : 
              game.difficulty === 'Hard' ? 'text-orange-300' :
              'text-red-400'}`}>{game.difficulty}</span>
            </li>
            <li><strong>{t('gameShowcase.defaultWager')}:</strong> {game.starsToWin} {t('currency.sparks')} <span className="text-yellow-400">⚡</span></li> 
          </ul>
        </div>
      </div>

      {showInteractionOptions && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-br from-[#0A0D14]/90 to-[#10051C]/95 backdrop-blur-md p-4 space-y-4 transition-opacity duration-300 ease-in-out">
          <MemoizedButton 
            variant="primary"
            size="large"
            onClick={(e) => { 
              e.stopPropagation(); 
              onPlayGame?.(game.id, game.title); 
              setShowInteractionOptions(false); 
            }}
            className="w-4/5 text-base" // Slightly smaller text for large button to fit content
          >
            {t('gameShowcase.playWager', { sparks: game.starsToWin })}
          </MemoizedButton>
          <MemoizedButton 
            variant="ghost"
            size="medium"
            onClick={(e) => { 
              e.stopPropagation(); 
              alert(`${t('gameShowcase.rulesFor', { gameTitle: game.title })}:\n${game.rules}\n\n${t('gameShowcase.ageWarning')}`);
            }}
            className="w-4/5"
          >
            {t('gameShowcase.rulesAndInfo')}
          </MemoizedButton>
          <MemoizedButton 
            variant="secondary"
            size="small" 
            onClick={(e) => { 
              e.stopPropagation(); 
              setShowInteractionOptions(false); 
              setIsHoveredForDetails(false);
            }}
            className="w-4/5 mt-2 opacity-90 hover:opacity-100" // Subtler close
          >
            {t('common.close')}
          </MemoizedButton>
        </div>
      )}
    </GlassCard>
  );
});

/**
 * @typedef GameShowcaseProps
 * @property {GameInfo[]} games - Array of game information objects.
 * @property {(gameId: string, gameName: string) => void} [onPlayGame] - Callback to initiate playing a game.
 */
interface GameShowcaseProps {
  games: GameInfo[];
  onPlayGame?: (gameId: string, gameName: string) => void;
}

/**
 * GameShowcase component displays a grid of available games.
 * Shows skeleton loaders during initial data fetch simulation.
 * @param {GameShowcaseProps} props - Component props.
 * @returns {JSX.Element} The rendered GameShowcase component.
 */
const GameShowcase: React.FC<GameShowcaseProps> = React.memo(({ games, onPlayGame }) => {
  const { t } = useT();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); 
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div>
        <SkeletonLoader type="title" className="w-1/2 h-9 mb-8" /> {/* Larger title skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"> {/* Increased gap */}
          {[...Array(3)].map((_, i) => <GameCard key={`skeleton-${i}`} game={{} as GameInfo} isLoading={true} />)}
        </div>
      </div>
    );
  }
  
  if (!games || games.length === 0) {
    return <GlassCard interactive={false}><p className="text-[#E0E7FF]/70 text-center py-8">{t('gameShowcase.noGames')}</p></GlassCard>;
  }

  return (
    <div>
      <h3 className="text-2xl md:text-3xl font-orbitron text-[#FFD700] mb-6 md:mb-8 tracking-wider" style={{textShadow: '0 0 6px rgba(255,215,0,0.7), 0 0 10px rgba(255,215,0,0.5)'}}>{t('gameShowcase.availableDuels')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"> {/* Increased gap */}
        {games.map((game) => (
          <GameCard key={game.id} game={game} onPlayGame={onPlayGame} />
        ))}
      </div>
      <p className="text-center text-xs text-[#E0E7FF]/60 mt-10 md:mt-12">
        {t('gameShowcase.footerWarning')}
      </p>
    </div>
  );
});

export default GameShowcase;