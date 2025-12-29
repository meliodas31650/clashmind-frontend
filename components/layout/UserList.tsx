

import React, { useMemo, useState, useEffect } from 'react';
import { UserProfile, ActiveSection } from '../../types'; // Added ActiveSection
import SkeletonLoader from '../ui/SkeletonLoader'; 
import NextEventTimer from '../ui/NextEventTimer'; // Import NextEventTimer
import Button from '../ui/Button'; // Import Button
import { EventsIcon } from '../../constants'; // Import EventsIcon
import { useT } from "../../src/contexts/I18nLiveContext"; // Import useTranslation

/**
 * @typedef UserListItemProps
 * @property {UserProfile} user - The user profile data.
 * @property {boolean} [isLoading] - Optional flag for loading state.
 * @property {() => void} [onClick] - Callback when user item is clicked.
 * @property {boolean} [hasUnread] - Whether this user has unread messages.
 */
interface UserListItemProps {
  user: UserProfile;
  isLoading?: boolean;
  onClick?: () => void;
  hasUnread?: boolean;
}

const UserListItem: React.FC<UserListItemProps> = React.memo(({ user, isLoading, onClick, hasUnread }) => {
  if (isLoading) {
    return (
      <li className="flex items-center p-3 border-b border-[#6A00FF]/30 last:border-b-0">
        <SkeletonLoader type="avatar" className="w-10 h-10 rounded-full mr-3" />
        <div className="flex-grow space-y-1.5">
          <SkeletonLoader type="text" className="w-3/4 h-4" />
          <SkeletonLoader type="text" className="w-1/2 h-3" />
        </div>
      </li>
    );
  }

  return (
    <li 
      className="flex items-center p-3 hover:bg-[#6A00FF]/40 rounded-xl transition-colors cursor-pointer group border-b border-[#6A00FF]/30 last:border-b-0"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
      aria-label={`Chat with ${user.username}${hasUnread ? '. New messages.' : ''}`}
    >
      <div className="relative mr-3">
        <img 
          src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.username.replace(/\s/g, '+')}&background=0B0F1A&color=00E0FF&font-size=0.33`} 
          alt={user.username} 
          className="w-10 h-10 rounded-full border-2 border-[#1F1F2B] group-hover:border-[#FF00C8] transition-colors"
        />
        <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-[#1F1F2B] ring-1 ${user.isOnline ? 'bg-green-400 ring-green-300' : 'bg-yellow-400 ring-yellow-300'}`}></span>
        {hasUnread && (
           <span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-red-500 border-2 border-white animate-pulse"></span>
        )}
      </div>
      <div className="flex-grow">
        <h4 className="font-semibold text-sm text-[#F4F4F4] group-hover:text-[#00E0FF] transition-colors">{user.username}</h4>
        <p className="text-xs text-[#F4F4F4]/70">Neurons: <span className="text-[#A100FF]/90 font-medium">{user.neurons}</span></p>
      </div>
    </li>
  );
});

const MemoizedUserListItem = React.memo(UserListItem);
const MemoizedNextEventTimer = React.memo(NextEventTimer);
const MemoizedButton = React.memo(Button);

/**
 * @typedef UserListProps
 * @property {UserProfile[]} users - Array of user profiles to display.
 * @property {(userId: string) => void} onOpenPrivateChat - Callback to open private chat.
 * @property {Record<string, number>} [unreadMessages] - Unread message counts by user ID.
 * @property {(sectionId: ActiveSection) => void} onNavigate - Callback for navigating dashboard sections.
 */
interface UserListProps {
  users: UserProfile[];
  onOpenPrivateChat: (userId: string) => void;
  unreadMessages?: Record<string, number>;
  onNavigate: (sectionId: ActiveSection) => void; 
}

/**
 * UserList component displays lists of online and offline users.
 * Shows skeleton loaders during initial data fetch simulation.
 * @param {UserListProps} props - Component props.
 * @returns {JSX.Element} The rendered UserList component.
 */
const UserList: React.FC<UserListProps> = React.memo(({ users, onOpenPrivateChat, unreadMessages = {}, onNavigate }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useT();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);
  
  const onlineUsers = useMemo(() => users.filter(u => u.isOnline), [users]);
  const offlineUsers = useMemo(() => users.filter(u => !u.isOnline), [users]);

  if (isLoading) {
    return (
      <aside className="w-72 bg-[#1F1F2B]/80 backdrop-blur-md p-4 border-l border-[#A100FF]/50 shadow-xl shadow-black/20 flex flex-col overflow-hidden">
        <SkeletonLoader type="text" className="w-3/4 h-6 mb-4" />
        <div className="flex-grow space-y-3 pr-1 overflow-y-auto">
          {[...Array(5)].map((_, i) => <MemoizedUserListItem key={`online-skeleton-${i}`} user={{} as UserProfile} isLoading={true} />)}
        </div>
        <SkeletonLoader type="text" className="w-1/2 h-5 mt-6 mb-3" />
        <div className="space-y-3 pr-1 opacity-70 overflow-y-auto max-h-32">
          {[...Array(2)].map((_, i) => <MemoizedUserListItem key={`offline-skeleton-${i}`} user={{} as UserProfile} isLoading={true} />)}
        </div>
        {/* Skeleton for event timer section */}
        <div className="pt-4 border-t border-[#A100FF]/30 mt-auto">
          <SkeletonLoader type="text" className="w-3/4 h-5 mx-auto mb-2" />
          <SkeletonLoader type="button" className="w-full h-10 rounded-lg" />
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-72 bg-[#1F1F2B]/80 backdrop-blur-md p-4 border-l-2 border-[#A100FF]/50 shadow-xl shadow-black/20 flex flex-col overflow-hidden">
      <h3 className="text-lg font-orbitron font-semibold text-[#00E0FF] mb-4 pb-3 border-b border-[#A100FF]/40 shrink-0">Players Online ({onlineUsers.length})</h3>
      
      <div className="overflow-y-auto flex-grow pr-1 space-y-0.5"> {/* This div will scroll */}
        {onlineUsers.length > 0 ? (
          onlineUsers.map((user) => (
            <MemoizedUserListItem 
              key={user.id} 
              user={user} 
              onClick={() => onOpenPrivateChat(user.id)}
              hasUnread={(unreadMessages[user.id] || 0) > 0}
            />
          ))
        ) : (
          <p className="text-[#F4F4F4]/60 text-sm p-3">No players currently online.</p>
        )}
      
        {offlineUsers.length > 0 && (
          <>
            <h3 className="text-md font-orbitron font-semibold text-[#F4F4F4]/70 mt-6 mb-3 pb-2 border-b border-[#A100FF]/30 shrink-0">Offline ({offlineUsers.length})</h3>
            {/* max-h-48 was here, if this section also needs to scroll independently, add overflow-y-auto and max-h here */}
            <div className="space-y-0.5 opacity-70"> 
              {offlineUsers.map((user) => (
                <MemoizedUserListItem 
                  key={user.id} 
                  user={user} 
                  onClick={() => onOpenPrivateChat(user.id)}
                  hasUnread={(unreadMessages[user.id] || 0) > 0}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Events Timer and Button - Fixed at the bottom */}
      <div className="pt-3 border-t-2 border-[#A100FF]/30 mt-auto shrink-0">
        <MemoizedNextEventTimer />
        <MemoizedButton
          onClick={() => onNavigate(ActiveSection.Events)}
          variant="secondary"
          size="medium"
          className="w-full !py-2.5 text-sm"
          leftIcon={<EventsIcon className="w-4 h-4 mr-1.5" />}
          aria-label={t('nextEventTimer.navigateToEvents', {defaultValue: 'View upcoming events'})}
        >
          {t('menu.events')}
        </MemoizedButton>
      </div>
    </aside>
  );
});

export default UserList;