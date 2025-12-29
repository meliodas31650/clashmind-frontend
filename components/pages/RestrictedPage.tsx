

import React, { CSSProperties } from 'react';
import Button from '../ui/Button';

interface RestrictedPageProps {
  onNavigateToAuth: () => void;
}

const MemoizedButton = React.memo(Button);

interface GoldenLockIconProps {
    className?: string;
    style?: CSSProperties;
}

const GoldenLockIcon: React.FC<GoldenLockIconProps> = React.memo(({className, style}) => (
    <svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
));

const AnimatedNeuralLines: React.FC = React.memo(() => (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="absolute w-full h-px bg-gradient-to-r from-transparent via-[#00E0FF]/20 to-transparent animate-neural-line" 
                 style={{
                    top: `${20 + i * 30}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${5 + i * 2}s`,
                    filter: `blur(${i * 0.5}px)`
                 }}
            />
        ))}
    </div>
));


const RestrictedPage: React.FC<RestrictedPageProps> = React.memo(({ onNavigateToAuth }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-transparent">
      
      <AnimatedNeuralLines />

      <div className="relative z-20 text-center bg-[#1F1F2B]/80 p-8 md:p-12 rounded-2xl shadow-2xl border border-[#A100FF]/60 max-w-lg mx-auto backdrop-blur-md">
        {/* Grey Cortex panel, Neon Purple border */}
        <GoldenLockIcon className="w-20 h-20 text-[#FFD700] mx-auto mb-6 opacity-80" style={{filter: 'drop-shadow(0 0 10px #FFD700)'}}/> {/* Gold icon & glow */}
        <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-[#FFD700] mb-4"
            style={{ textShadow: '0 0 6px rgba(255,215,0,0.7), 0 0 10px rgba(255,215,0,0.5)' }}> 
          Access Restricted
        </h1>
        <p className="text-lg text-[#F4F4F4]/90 mb-8">
          Access to the CORTEX ARENA requires authentication. Please log in or create an account to enter the Grid.
        </p>
        <MemoizedButton 
          onClick={onNavigateToAuth} 
          variant="primary" 
          size="large"
          className="shadow-lg shadow-[#00E0FF]/30 hover:shadow-[#00E0FF]/50"
          style={{ textShadow: '0 0 8px rgba(0,0,0,0.3)'}}
        >
          Log In or Register
        </MemoizedButton>
      </div>
    </div>
  );
});

export default RestrictedPage;