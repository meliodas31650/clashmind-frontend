
import React, { useState, useEffect } from 'react';
import { calculateTimeRemaining, TimeRemaining } from '../../utils/timeUtils'; // Assuming you'll move these here or import
import useTranslation from '../../hooks/useTranslation';

// Placeholder: Set a future date for the next event
// This should ideally come from a shared constant or props if dynamic
const NEXT_EVENT_DATE = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000 + 25 * 60 * 1000); 

interface NextEventTimerProps {
  // No props needed for this version if NEXT_EVENT_DATE is a local const
  // If NEXT_EVENT_DATE can change, it should be a prop.
}

const TimeSegment: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-lg font-orbitron text-[#FFD700]" style={{textShadow: '0 0 3px rgba(255,215,0,0.5)'}}>{String(value).padStart(2, '0')}</span>
    <span className="text-[10px] text-[#E0E7FF]/60 uppercase">{label}</span>
  </div>
);

const NextEventTimer: React.FC<NextEventTimerProps> = React.memo(() => {
  const { t } = useTranslation();
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(calculateTimeRemaining(NEXT_EVENT_DATE));

  useEffect(() => {
    if (!timeRemaining) return; 

    const timer = setInterval(() => {
      const newTimeRemaining = calculateTimeRemaining(NEXT_EVENT_DATE);
      if (!newTimeRemaining) {
        clearInterval(timer); 
      }
      setTimeRemaining(newTimeRemaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  if (!timeRemaining) {
    return (
      <div className="text-center py-1">
        <span className="text-xs font-semibold text-[#FFD700] animate-pulse">{t('nextEventTimer.eventLive', { defaultValue: 'Event Live / Soon!'})}</span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center space-x-1.5 py-1 mb-1.5">
      <TimeSegment value={timeRemaining.days} label={t('nextEventTimer.days', { defaultValue: 'D'})} />
      <span className="text-lg text-[#A100FF]/60 self-center">:</span>
      <TimeSegment value={timeRemaining.hours} label={t('nextEventTimer.hours', { defaultValue: 'H'})} />
      <span className="text-lg text-[#A100FF]/60 self-center">:</span>
      <TimeSegment value={timeRemaining.minutes} label={t('nextEventTimer.minutes', { defaultValue: 'M'})} />
      <span className="text-lg text-[#A100FF]/60 self-center">:</span>
      <TimeSegment value={timeRemaining.seconds} label={t('nextEventTimer.seconds', { defaultValue: 'S'})} />
    </div>
  );
});

export default NextEventTimer;
