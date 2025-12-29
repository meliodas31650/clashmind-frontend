
import React, { useState, useEffect } from 'react';
import { UserProfile, PrivateChatSession, ChatMessage, ActiveConversationType, GroupChatSession, GameInfo } from '../../types';
import ConversationList from './ConversationList';
import ActiveChatWindow from './ActiveChatWindow';
import Button from '../ui/Button'; // For modal buttons
import { BlockIcon, GroupIcon } from '../../constants';
import useTranslation from '../../hooks/useTranslation';

interface MessagingHubViewProps {
  currentUser: UserProfile | null;
  globalChatMessages: ChatMessage[];
  privateConversations: Record<string, PrivateChatSession>;
  groupConversations: Record<string, GroupChatSession>; // Placeholder
  activeConversationId: string | null;
  activeConversationType: ActiveConversationType | null;
  unreadMessages: Record<string, number>;
  allUsers: UserProfile[]; // For create group modal, block user modal
  blockedUserIds: string[]; // Placeholder
  showCreateGroupModal: boolean; // Placeholder
  
  onOpenConversation: (id: string, type: ActiveConversationType) => void;
  onSendMessage: (conversationId: string, conversationType: ActiveConversationType, text: string) => void;
  onChallengeUser?: (opponentId: string, gameId: string, gameName: string) => void; // For ActiveChatWindow
  availableGames?: GameInfo[]; // For ActiveChatWindow's challenge feature
  
  onCreateGroup: (groupName: string, memberIds: string[]) => void; // Placeholder
  onBlockUser: (userId: string) => void; // Placeholder
  onUnblockUser: (userId: string) => void; // Placeholder
  onSetShowCreateGroupModal: (show: boolean) => void; // Placeholder
}

const MemoizedButton = React.memo(Button);

const MessagingHubView: React.FC<MessagingHubViewProps> = React.memo(({
  currentUser,
  globalChatMessages,
  privateConversations,
  groupConversations,
  activeConversationId,
  activeConversationType,
  unreadMessages,
  allUsers,
  blockedUserIds,
  showCreateGroupModal,
  onOpenConversation,
  onSendMessage,
  onChallengeUser,
  availableGames,
  onCreateGroup,
  onBlockUser,
  onUnblockUser,
  onSetShowCreateGroupModal
}) => {
  const { t } = useTranslation();
  const [manageBlockedUsersModalOpen, setManageBlockedUsersModalOpen] = useState(false);
  
  // States for Create Group Modal
  const [newGroupName, setNewGroupName] = useState('');
  const [selectedGroupMembers, setSelectedGroupMembers] = useState<Set<string>>(new Set());

  const handleCreateGroupSubmit = () => {
    if (newGroupName.trim() && selectedGroupMembers.size > 0) {
      onCreateGroup(newGroupName.trim(), Array.from(selectedGroupMembers));
      setNewGroupName('');
      setSelectedGroupMembers(new Set());
    } else {
      alert(t('messagingHub.createGroupError'));
    }
  };

  const toggleGroupMember = (userId: string) => {
    setSelectedGroupMembers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };
  
  // Find the details of the active conversation for ActiveChatWindow
  let activeConversationDetails: PrivateChatSession | GroupChatSession | { userName: string, avatarUrl?: string, messages: ChatMessage[], userId?: string, groupId?: string } | null = null;
  if (activeConversationType === 'global') {
    activeConversationDetails = { userName: t('messagingHub.globalChat'), messages: globalChatMessages, groupId: 'global' };
  } else if (activeConversationType === 'private' && activeConversationId) {
    activeConversationDetails = privateConversations[activeConversationId];
  } else if (activeConversationType === 'group' && activeConversationId) {
    activeConversationDetails = groupConversations[activeConversationId];
  }


  return (
    <div className="h-full flex flex-row bg-[#0B0F1A] text-[#F4F4F4] overflow-hidden">
      <ConversationList
        currentUser={currentUser}
        privateConversations={privateConversations}
        groupConversations={groupConversations}
        unreadMessages={unreadMessages}
        activeConversationId={activeConversationId}
        activeConversationType={activeConversationType}
        onOpenConversation={onOpenConversation}
        onShowCreateGroupModal={() => onSetShowCreateGroupModal(true)}
        onShowManageBlockedUsersModal={() => setManageBlockedUsersModalOpen(true)}
      />
      <ActiveChatWindow
        currentUser={currentUser}
        conversationId={activeConversationId}
        conversationType={activeConversationType}
        conversationDetails={activeConversationDetails}
        onSendMessage={onSendMessage}
        onChallengeUser={onChallengeUser}
        availableGames={availableGames}
        onBlockUser={onBlockUser}
        blockedUserIds={blockedUserIds} // Pass to indicate if the other user in private chat is blocked
      />

      {/* Create Group Modal (Placeholder UI, logic in App.tsx) */}
      {showCreateGroupModal && currentUser && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-[#1F1F2B] p-5 rounded-lg border-2 border-[#FFD700] shadow-xl max-w-md w-full">
            <h4 className="text-lg font-semibold text-yellow-300 mb-4 text-center">{t('messagingHub.createNewGroup')}</h4>
            <input 
              type="text"
              placeholder={t('messagingHub.groupNamePlaceholder')}
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="w-full bg-[#0B0F1A]/80 border border-[#A100FF]/60 text-[#F4F4F4] placeholder-[#F4F4F4]/50 px-3 py-2 rounded-lg focus:ring-1 focus:ring-[#FF00C8] outline-none mb-3"
            />
            <p className="text-sm text-gray-400 mb-2">{t('messagingHub.selectMembers')}</p>
            <div className="max-h-48 overflow-y-auto space-y-1 mb-3 pr-1">
                {allUsers.filter(u => u.id !== currentUser.id && !blockedUserIds.includes(u.id)).map(user => (
                    <label key={user.id} className="flex items-center p-2 rounded hover:bg-[#6A00FF]/20 cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={selectedGroupMembers.has(user.id)}
                            onChange={() => toggleGroupMember(user.id)}
                            className="w-4 h-4 text-[#FF00C8] bg-gray-700 border-gray-600 rounded focus:ring-[#FF00C8] mr-2"
                        />
                        <img src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.username.replace(/\s/g, '+')}`} alt={user.username} className="w-6 h-6 rounded-full mr-2"/>
                        <span className="text-sm text-gray-300">{user.username}</span>
                    </label>
                ))}
            </div>
            <div className="flex justify-end space-x-2">
              <MemoizedButton onClick={() => onSetShowCreateGroupModal(false)} variant="ghost" size="small">{t('common.cancel')}</MemoizedButton>
              <MemoizedButton onClick={handleCreateGroupSubmit} variant="primary" size="small">{t('messagingHub.createGroupButton')}</MemoizedButton>
            </div>
          </div>
        </div>
      )}

      {/* Manage Blocked Users Modal (Placeholder UI) */}
      {manageBlockedUsersModalOpen && (
         <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
          <div className="bg-[#1F1F2B] p-5 rounded-lg border-2 border-red-500 shadow-xl max-w-sm w-full">
            <h4 className="text-lg font-semibold text-red-400 mb-4 text-center">{t('messagingHub.manageBlockedUsers')}</h4>
            {blockedUserIds.length > 0 ? (
                <ul className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {blockedUserIds.map(userId => {
                        const user = allUsers.find(u => u.id === userId);
                        return (
                            <li key={userId} className="flex justify-between items-center p-2 bg-[#0B0F1A]/50 rounded">
                                <span className="text-gray-300">{user?.username || userId}</span>
                                <MemoizedButton onClick={() => onUnblockUser(userId)} variant="ghost" size="small" className="!text-green-400 !border-green-500/50 hover:!border-green-400">
                                    {t('messagingHub.unblockUser')}
                                </MemoizedButton>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className="text-center text-gray-400">{t('messagingHub.noBlockedUsers')}</p>
            )}
            <MemoizedButton onClick={() => setManageBlockedUsersModalOpen(false)} variant="danger" size="small" className="w-full mt-4">
              {t('common.close')}
            </MemoizedButton>
          </div>
        </div>
      )}
    </div>
  );
});

export default MessagingHubView;
