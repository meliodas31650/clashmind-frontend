
import React from 'react';
import Button from './Button';
import { SparkIcon } from '../../constants';

interface GamblingWarningModalProps {
  onAcknowledge: () => void;
}

const MemoizedButton = React.memo(Button);

const GamblingWarningModal: React.FC<GamblingWarningModalProps> = React.memo(({ onAcknowledge }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="gambling-warning-title"
    >
      <div className="bg-[#1F1F2B] p-6 md:p-8 rounded-2xl shadow-2xl border-2 border-[#FF00C8] max-w-lg w-full transform transition-all animate-fadeIn">
        {/* Grey Cortex background, Pulse Pink border */}
        <div className="text-center">
          <SparkIcon className="w-16 h-16 text-[#FFD700] mx-auto mb-4 animate-pulse" style={{filter: 'drop-shadow(0 0 10px #FFD700)'}} />
          <h2 id="gambling-warning-title" className="text-2xl md:text-3xl font-orbitron font-bold text-[#FFD700] mb-4" style={{textShadow: '0 0 6px rgba(255,215,0,0.7)'}}>
            Important Notice: Real Money Gaming
          </h2>
        </div>

        <div className="text-[#F4F4F4]/90 space-y-3 my-6 text-sm md:text-base">
          <p>
            Welcome to ClashMind! This platform involves wagering with "Sparks," which can be purchased with real money and have real monetary value.
            Winnings can also be withdrawn as real money (subject to terms and conditions).
          </p>
          <p className="font-semibold text-yellow-400">
            You must be 18 years of age or older (or the legal age of majority in your jurisdiction) to participate in real money gaming.
          </p>
          <p>
            Gambling can be addictive. Please play responsibly and only wager what you can afford to lose.
            Understand the risks involved before participating.
          </p>
          <p>
            Resources for help with gambling addiction are available. Visit our "Responsible Gaming" section for more information.
          </p>
        </div>

        <MemoizedButton
          onClick={onAcknowledge}
          variant="primary"
          size="large"
          className="w-full mt-4 text-base md:text-lg"
          aria-describedby="gambling-warning-title"
        >
          I Understand and Confirm I am 18+ (or of Legal Age)
        </MemoizedButton>
        <p className="text-xs text-center mt-3 text-[#F4F4F4]/60">
            By clicking, you acknowledge these risks and confirm your eligibility.
        </p>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
});

export default GamblingWarningModal;
