
import React, { useState, useEffect, useMemo } from 'react';
import GlassCard from './GlassCard';
import { UserProfile } from '../../types';
import { NeuronIcon, getNeuronTier } from '../../constants';
import SkeletonLoader from './SkeletonLoader'; // Import SkeletonLoader
import { useT } from "../../src/contexts/I18nLiveContext";

/**
 * @typedef LeaderboardDisplayProps
 * @property {UserProfile[]} users - Array of user profiles for the leaderboard.
 * @property {UserProfile | null} currentUser - The currently logged-in user, for highlighting.
 */
interface LeaderboardDisplayProps {
  users: UserProfile[];
  currentUser: UserProfile | null;
}

const MemoizedGlassCard = React.memo(GlassCard);


/**
 * @typedef LeaderboardItemProps
 * @property {UserProfile} user - The user for this leaderboard item.
 * @property {number} rank - The rank of the user.
 * @property {boolean} isCurrentUser - Whether this item represents the logged-in user.
 * @property {boolean} [isLoading] - Optional flag for loading state.
 */
interface LeaderboardItemProps {
  user: UserProfile;
  rank: number;
  isCurrentUser: boolean;
  isLoading?: boolean;
}

/**
 * LeaderboardItem component displays a single user's entry in the leaderboard.
 * Shows skeleton UI if isLoading is true.
 * @param {LeaderboardItemProps} props - Component props.
 * @returns {JSX.Element} The rendered LeaderboardItem.
 */
const LeaderboardItem: React.FC<LeaderboardItemProps> = React.memo(({ user, rank, isCurrentUser, isLoading }) => {
  if (isLoading) {
    return (
      <li className="flex items-center justify-between p-3 rounded-lg bg-[#0B0F1A]/60 border border-[#A100FF]/40">
        <div className="flex items-center">
          <SkeletonLoader type="text" className="w-8 h-6 mr-3" />
          <SkeletonLoader type="avatar" className="w-10 h-10 rounded-full mr-3" />
          <div className="space-y-1.5">
            <SkeletonLoader type="text" className="w-24 h-4" />
            <SkeletonLoader type="text" className="w-16 h-3" />
          </div>
        </div>
        <div className="text-right space-y-1.5">
          <SkeletonLoader type="text" className="w-20 h-5 ml-auto" />
          <SkeletonLoader type="text" className="w-16 h-3 ml-auto" />
        </div>
      </li>
    );
  }

  const neuronTier = getNeuronTier(user.neurons);
  return (
    <li 
      key={user.id} 
      className={`flex items-center justify-between p-3 rounded-lg transition-all
                  ${isCurrentUser 
                      ? 'bg-[#FF00C8]/20 border-2 border-[#FF00C8]' 
                      : 'bg-[#0B0F1A]/60 border border-[#A100FF]/40 hover:bg-[#A100FF]/20'
                  }`}
    >
      <div className="flex items-center">
        <span className={`text-lg font-semibold w-8 text-center mr-3 ${
          rank < 3 ? 'text-[#FFD700]' : 'text-[#F4F4F4]/70'}`
        }>
          {rank + 1}
        </span>
        <img 
          src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.username.replace(/\s/g, '+')}&background=0B0F1A&color=00E0FF&font-size=0.33`} 
          alt={user.username} 
          className="w-10 h-10 rounded-full mr-3 border-2 border-[#1F1F2B]"
        />
        <div>
          <p className={`font-semibold ${isCurrentUser ? 'text-[#FF00C8]' : 'text-[#00E0FF]'}`}>{user.username}</p>
          <p className="text-xs text-[#A100FF]/90">{neuronTier}</p>
        </div>
      </div>
      <div className="text-right">
          <p className="text-lg font-bold text-[#A100FF]">{user.neurons.toLocaleString()} 🧠</p>
          <p className="text-xs text-[#F4F4F4]/60">Sparks: {user.sparks.toLocaleString()} ✨</p>
      </div>
    </li>
  );
});

/**
 * LeaderboardDisplay component shows a ranked list of users.
 * Features skeleton loading states and highlights the current user.
 * @param {LeaderboardDisplayProps} props - Component props.
 * @returns {JSX.Element} The rendered LeaderboardDisplay component.
 */
const LeaderboardDisplay: React.FC<LeaderboardDisplayProps> = React.memo(({ users, currentUser }) => {
  const { t } = useT();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800); // Adjust timeout as needed
    return () => clearTimeout(timer);
  }, []);
  
  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => b.neurons - a.neurons).slice(0, 10); // Top 10
  }, [users]);

  return (
    <MemoizedGlassCard>
      <div className="flex items-center mb-6">
        <NeuronIcon className="w-8 h-8 text-[#A100FF] mr-3" />
        <h3 className="text-2xl font-orbitron text-[#FFD700]" style={{textShadow: '0 0 5px rgba(255,215,0,0.6)'}}>{t('leaderboard.title')}</h3>
      </div>
      {isLoading ? (
        <ul className="space-y-3">
          {[...Array(5)].map((_, i) => <LeaderboardItem key={`skeleton-${i}`} user={{} as UserProfile} rank={i} isCurrentUser={false} isLoading={true} />)}
        </ul>
      ) : sortedUsers.length > 0 ? (
        <ul className="space-y-3">
          {sortedUsers.map((user, index) => (
            <LeaderboardItem 
              key={user.id}
              user={user}
              rank={index}
              isCurrentUser={currentUser?.id === user.id}
            />
          ))}
        </ul>
      ) : (
        <p className="text-[#F4F4F4]/70">{t('leaderboard.noData')}</p>
      )}
       {!isLoading && currentUser && !sortedUsers.find(u => u.id === currentUser.id) && (
        <div className="mt-6 p-3 rounded-lg bg-[#0B0F1A]/70 border-2 border-[#FF00C8]/70 text-center">
            <p className="text-[#FF00C8] font-semibold">{t('leaderboard.yourRankNotInTop10')}</p>
            <p className="text-sm text-[#F4F4F4]/80">{currentUser.username} - {currentUser.neurons.toLocaleString()} 🧠</p>
        </div>
       )}
    </MemoizedGlassCard>
  );
});

export default LeaderboardDisplay;
