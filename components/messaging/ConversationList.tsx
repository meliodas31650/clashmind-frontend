
import React, { useMemo, useState } from 'react';
import { UserProfile, PrivateChatSession, GroupChatSession, ActiveConversationType } from '../../types';
import { DefaultUserIcon, SearchIcon, GroupIcon, ChatIcon, BlockIcon } from '../../constants';
import useTranslation from '../../hooks/useTranslation';

interface ConversationListProps {
  currentUser: UserProfile | null;
  privateConversations: Record<string, PrivateChatSession>;
  groupConversations: Record<string, GroupChatSession>;
  unreadMessages: Record<string, number>;
  activeConversationId: string | null;
  activeConversationType: ActiveConversationType | null;
  onOpenConversation: (id: string, type: ActiveConversationType) => void;
  onShowCreateGroupModal: () => void;
  onShowManageBlockedUsersModal: () => void;
}

const ConversationListItem: React.FC<{
  id: string;
  type: ActiveConversationType;
  name: string;
  avatarUrl?: string;
  lastMessageSnippet?: string;
  unreadCount?: number;
  isActive: boolean;
  isOnline?: boolean;
  onClick: () => void;
}> = React.memo(({ id, type, name, avatarUrl, lastMessageSnippet, unreadCount, isActive, isOnline, onClick }) => {
  const { t } = useTranslation();
  const defaultAvatarUrl = type === 'group' 
    ? `https://ui-avatars.com/api/?name=${name.substring(0,2)}&background=2A0F3E&color=00E0FF&bold=true&size=128`
    : `https://ui-avatars.com/api/?name=${name.replace(/\s/g, '+').substring(0,1)}&background=181C27&color=00E0FF&bold=true&size=128`;

  return (
    <li
      onClick={onClick}
      className={`flex items-center p-3.5 rounded-xl cursor-pointer transition-all duration-200 ease-in-out group relative
                  ${isActive 
                    ? 'bg-gradient-to-r from-[#FF00C8]/25 to-[#A100FF]/15 shadow-inner shadow-black/20' 
                    : 'hover:bg-gradient-to-r hover:from-[#6A00FF]/25 hover:to-[#A100FF]/15'
                  }`}
      role="button"
      aria-current={isActive ? "page" : undefined}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-3/5 w-1.5 bg-gradient-to-b from-[#FF00C8] to-[#00E0FF] rounded-r-full shadow-[0_0_10px_1px_#FF00C8]"></div>}
      <div className="relative mr-3.5 shrink-0">
        <img
          src={avatarUrl || defaultAvatarUrl}
          alt={name}
          className="w-11 h-11 rounded-full border-2 border-[#10051C]/70 group-hover:border-[#FF00C8]/80 transition-colors shadow-md"
        />
        {type === 'private' && isOnline !== undefined && (
           <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-[#10051C] ${isOnline ? 'bg-green-400 ring-1 ring-green-300/50' : 'bg-gray-500 ring-1 ring-gray-400/50'}`}></span>
        )}
        {unreadCount && unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white text-[10px] font-bold border-2 border-[#10051C] shadow-md">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </div>
      <div className="flex-grow overflow-hidden">
        <p className={`font-semibold text-sm truncate ${isActive ? 'text-[#00E0FF]' : 'text-[#E0E7FF]/90 group-hover:text-[#00E0FF]'}`}>{name}</p>
        {lastMessageSnippet && (
          <p className={`text-xs truncate ${isActive ? 'text-[#E0E7FF]/70' : 'text-[#E0E7FF]/60 group-hover:text-[#E0E7FF]/70'}`}>
            {lastMessageSnippet}
          </p>
        )}
      </div>
    </li>
  );
});

const ConversationList: React.FC<ConversationListProps> = ({
  currentUser,
  privateConversations,
  groupConversations,
  unreadMessages,
  activeConversationId,
  activeConversationType,
  onOpenConversation,
  onShowCreateGroupModal,
  onShowManageBlockedUsersModal
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const sortedPrivateConversations = useMemo(() => {
    // Fix: Explicitly cast Object.values to PrivateChatSession[] to avoid 'unknown' type spreading issues
    return (Object.values(privateConversations) as PrivateChatSession[])
      .map(session => ({
        ...session,
        lastMessage: session.messages[session.messages.length - 1]
      }))
      .sort((a, b) => (b.lastMessage?.timestamp.getTime() || 0) - (a.lastMessage?.timestamp.getTime() || 0))
      .filter(session => session.userName.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [privateConversations, searchTerm]);

  const sortedGroupConversations = useMemo(() => { 
    // Fix: Explicitly cast Object.values to GroupChatSession[] to avoid 'unknown' type property access issues
    return (Object.values(groupConversations) as GroupChatSession[])
      .sort((a,b) => (b.lastMessageTimestamp?.getTime() || 0) - (a.lastMessageTimestamp?.getTime() || 0))
      .filter(session => session.groupName.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [groupConversations, searchTerm]);

  return (
    <aside className="w-80 md:w-96 bg-gradient-to-b from-[#10051C]/95 to-[#181C27]/95 border-r-2 border-[#A100FF]/50 p-3.5 flex flex-col shrink-0">
      <div className="flex items-center justify-between mb-4 p-1.5">
        <h2 className="text-xl md:text-2xl font-orbitron text-[#FFD700] tracking-wider" style={{textShadow: '0 0 5px rgba(255,215,0,0.6)'}}>{t('messagingHub.title')}</h2>
        <div className="flex space-x-1.5">
            <button 
                onClick={onShowCreateGroupModal} 
                title={t('messagingHub.createNewGroup')}
                className="p-2 rounded-lg hover:bg-gradient-to-tr hover:from-[#6A00FF]/30 hover:to-[#A100FF]/20 transition-all text-[#00E0FF]/90 hover:text-[#00E0FF] focus:outline-none focus:ring-2 focus:ring-[#FF00C8]"
            >
                <GroupIcon className="w-5 h-5" />
            </button>
            <button 
                onClick={onShowManageBlockedUsersModal} 
                title={t('messagingHub.manageBlockedUsers')}
                className="p-2 rounded-lg hover:bg-gradient-to-tr hover:from-[#6A00FF]/30 hover:to-[#A100FF]/20 transition-all text-red-400/90 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
                <BlockIcon className="w-5 h-5" />
            </button>
        </div>
      </div>

      <div className="relative mb-4">
        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A100FF]/80 pointer-events-none" />
        <input
          type="text"
          placeholder={t('messagingHub.searchConversations')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#0A0D14]/80 border-2 border-[#6A00FF]/60 text-[#E0E7FF] placeholder-[#E0E7FF]/50 pl-10 pr-4 py-2.5 rounded-xl focus:ring-2 focus:ring-[#FF00C8] focus:border-transparent outline-none text-sm transition-all"
        />
      </div>

      <div className="flex-grow overflow-y-auto space-y-1.5 pr-1 -mr-1"> {/* Negative margin for scrollbar */}
        <ConversationListItem
            id="global"
            type="global"
            name={t('messagingHub.globalChat')}
            avatarUrl={'https://ui-avatars.com/api/?name=CG&background=FFD700&color=10051C&bold=true&size=128'} // Specific avatar for Global, gold background
            lastMessageSnippet={t('messagingHub.accessGlobalChat')}
            isActive={activeConversationId === 'global' && activeConversationType === 'global'}
            onClick={() => onOpenConversation('global', 'global')}
        />
        
        {sortedPrivateConversations.map(session => (
          <ConversationListItem
            key={session.userId}
            id={session.userId}
            type="private"
            name={session.userName}
            avatarUrl={session.avatarUrl}
            lastMessageSnippet={session.lastMessage?.text}
            unreadCount={unreadMessages[session.userId]}
            isActive={activeConversationId === session.userId && activeConversationType === 'private'}
            isOnline={session.isOnline}
            onClick={() => onOpenConversation(session.userId, 'private')}
          />
        ))}

        {sortedGroupConversations.length > 0 && (
            <h3 className="text-xs uppercase text-[#A100FF]/90 font-semibold pt-3 pb-1 px-1 tracking-wider">{t('messagingHub.groupChats')}</h3>
        )}
        {sortedGroupConversations.map(session => (
           <ConversationListItem
            key={session.groupId}
            id={session.groupId}
            type="group"
            name={session.groupName}
            avatarUrl={session.avatarUrl}
            lastMessageSnippet={session.messages[session.messages.length - 1]?.text}
            unreadCount={session.unreadCount}
            isActive={activeConversationId === session.groupId && activeConversationType === 'group'}
            onClick={() => onOpenConversation(session.groupId, 'group')}
          />
        ))}
         {searchTerm && sortedPrivateConversations.length === 0 && sortedGroupConversations.length === 0 && (
            <p className="text-center text-sm text-gray-500 py-6 px-2">{t('messagingHub.noSearchResults')}</p>
         )}
      </div>
    </aside>
  );
};

export default ConversationList;
