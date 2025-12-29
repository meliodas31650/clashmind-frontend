
import React, { useMemo } from 'react';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import MainContentArea from '../layout/MainContentArea';
import UserList from '../layout/UserList';
// import NextEventTimer from '../ui/NextEventTimer'; // Removed: No longer floating here
import { ActiveSection, UserProfile, GameInfo, PlayingGameInfo, MenuItemKey, PrivateChatSession, MatchmakingStatus, ChatMessage, ActiveConversationType, GroupChatSession } from '../../types';
import GravityFourGame from '../game/GravityFourGame'; 
import GenericGamePlaceholder from '../game/GenericGamePlaceholder';
import MemoryMindGame from '../game/MemoryMindGame';


/**
 * @typedef DashboardPageProps
 * @property {UserProfile | null} currentUser - The currently logged-in user or null if guest/not logged in.
 * @property {ActiveSection} activeSection - The currently active section in the dashboard.
 * @property {(sectionId: ActiveSection) => void} onNavigate - Callback for navigating dashboard sections.
 * @property {() => void} onLogout - Callback for user logout.
 * @property {MenuItemKey[]} menuItemKeys - Array of menu item configurations with translation keys.
 * @property {GameInfo[]} games - Array of available games.
 * @property {UserProfile[]} onlineUsers - Array of currently online users.
 * @property {UserProfile[]} [allUsers] - Optional array of all users (for leaderboards etc.).
 * @property {PlayingGameInfo | null} playingGame - Information about the game currently being played, or null.
 * @property {(gameId: string, gameName: string) => void} onPlayGame - Callback to start playing a game.
 * @property {() => void} onExitGame - Callback to exit the current game.
 * 
 * @property {ChatMessage[]} globalChatMessages - Messages for global chat.
 * @property {Record<string, PrivateChatSession>} privateConversations - All private chat sessions.
 * @property {Record<string, GroupChatSession>} groupConversations - All group chat sessions.
 * @property {string | null} activeConversationId - ID of the active conversation.
 * @property {ActiveConversationType | null} activeConversationType - Type of the active conversation.
 * @property {Record<string, number>} unreadMessages - Unread message counts by conversation ID.
 * @property {string[]} blockedUserIds - IDs of blocked users.
 * @property {boolean} showCreateGroupModal - Flag to show create group modal.
 * 
 * @property {(id: string, type: ActiveConversationType) => void} onOpenConversation - Opens a conversation.
 * @property {(conversationId: string, conversationType: ActiveConversationType, text: string) => void} onSendMessage - Sends a message.
 * @property {(opponentId: string, gameId: string, gameName: string) => void} onChallengeUser - Challenges a user.
 * @property {(groupName: string, memberIds: string[]) => void} onCreateGroup - Creates a group.
 * @property {(userId: string) => void} onBlockUser - Blocks a user.
 * @property {(userId: string) => void} onUnblockUser - Unblocks a user.
 * @property {(show: boolean) => void} onSetShowCreateGroupModal - Sets visibility of create group modal.
 * @property {(conversationId: string) => void} onClearUnreadForConversation - Clears unread messages.
 * 
 * @property {boolean} isMatchmaking - Whether the user is currently matchmaking.
 * @property {MatchmakingStatus} matchmakingStatus - Current status of matchmaking.
 * @property {() => void} onQuickMatch - Starts quick matchmaking.
 */
interface DashboardPageProps {
  currentUser: UserProfile | null; 
  activeSection: ActiveSection;
  onNavigate: (sectionId: ActiveSection) => void;
  onLogout: () => void;
  menuItemKeys: MenuItemKey[]; 
  games: GameInfo[];
  onlineUsers: UserProfile[];
  allUsers?: UserProfile[];
  playingGame: PlayingGameInfo | null;
  onPlayGame: (gameId: string, gameName: string) => void;
  onExitGame: () => void;

  // Enhanced Chat Props
  globalChatMessages: ChatMessage[];
  privateConversations: Record<string, PrivateChatSession>;
  groupConversations: Record<string, GroupChatSession>;
  activeConversationId: string | null;
  activeConversationType: ActiveConversationType | null;
  unreadMessages: Record<string, number>;
  blockedUserIds: string[];
  showCreateGroupModal: boolean;
  
  onOpenConversation: (id: string, type: ActiveConversationType) => void;
  onSendMessage: (conversationId: string, conversationType: ActiveConversationType, text: string) => void;
  onChallengeUser: (opponentId: string, gameId: string, gameName: string) => void;
  onCreateGroup: (groupName: string, memberIds: string[]) => void;
  onBlockUser: (userId: string) => void;
  onUnblockUser: (userId: string) => void;
  onSetShowCreateGroupModal: (show: boolean) => void;
  onClearUnreadForConversation: (conversationId: string) => void;

  // Matchmaking Props
  isMatchmaking: boolean;
  matchmakingStatus: MatchmakingStatus;
  onQuickMatch: () => void;
}

const MemoizedSidebar = React.memo(Sidebar);
const MemoizedHeader = React.memo(Header);
const MemoizedMainContentArea = React.memo(MainContentArea);
const MemoizedUserList = React.memo(UserList);
const MemoizedGravityFourGame = React.memo(GravityFourGame);
const MemoizedGenericGamePlaceholder = React.memo(GenericGamePlaceholder);
const MemoizedMemoryMindGame = React.memo(MemoryMindGame);
// const MemoizedNextEventTimer = React.memo(NextEventTimer); // Removed: No longer floating here


const DashboardPage: React.FC<DashboardPageProps> = React.memo(({
  currentUser,
  activeSection,
  onNavigate,
  onLogout,
  menuItemKeys, 
  games,
  onlineUsers,
  allUsers,
  playingGame,
  onPlayGame,
  onExitGame,
  // Enhanced Chat Props
  globalChatMessages,
  privateConversations,
  groupConversations,
  activeConversationId,
  activeConversationType,
  unreadMessages,
  blockedUserIds,
  showCreateGroupModal,
  onOpenConversation,
  onSendMessage,
  onChallengeUser,
  onCreateGroup,
  onBlockUser,
  onUnblockUser,
  onSetShowCreateGroupModal,
  onClearUnreadForConversation,
  // Matchmaking Props
  isMatchmaking,
  matchmakingStatus,
  onQuickMatch,
}) => {
  const effectiveUser = useMemo(() => currentUser || { 
    id: 'guest', username: 'TempUser', sparks: 0, neurons: 0, isOnline: true, isGuest: true,
    initialGamblingWarningAcknowledged: true, ageVerified: true 
  }, [currentUser]);

  const renderGameContent = () => {
    if (playingGame) {
      switch (playingGame.id) {
        case 'gravity-four':
          return <MemoizedGravityFourGame gameName={playingGame.name} onExitGame={onExitGame} />;
        case 'memory-mind': 
          return <MemoizedMemoryMindGame gameName={playingGame.name} onExitGame={onExitGame} />;
        default:
          return <MemoizedGenericGamePlaceholder gameName={playingGame.name} onExitGame={onExitGame} />;
      }
    }
    return <MemoizedMainContentArea 
              activeSection={activeSection} 
              games={games} 
              onPlayGame={onPlayGame} 
              allUsers={allUsers} 
              currentUser={currentUser}
              onQuickMatch={onQuickMatch}
              // Pass new chat props to MainContentArea for MessagingHubView
              globalChatMessages={globalChatMessages}
              privateConversations={privateConversations}
              groupConversations={groupConversations}
              activeConversationId={activeConversationId}
              activeConversationType={activeConversationType}
              unreadMessages={unreadMessages}
              blockedUserIds={blockedUserIds}
              showCreateGroupModal={showCreateGroupModal}
              onOpenConversation={onOpenConversation}
              onSendMessage={onSendMessage}
              onChallengeUser={onChallengeUser}
              onCreateGroup={onCreateGroup}
              onBlockUser={onBlockUser}
              onUnblockUser={onUnblockUser}
              onSetShowCreateGroupModal={onSetShowCreateGroupModal}
            />;
  };

  const activeSectionForHeader = playingGame ? ActiveSection.CortexArena : activeSection;

  return (
    <div className="flex h-screen w-screen bg-transparent">
      <MemoizedSidebar 
        menuItemKeys={menuItemKeys} 
        activeItem={activeSectionForHeader} 
        onNavigate={onNavigate}
      />
      
      <div className="flex flex-col flex-grow bg-[#1F1F2B]/70 backdrop-blur-lg relative"> 
        <MemoizedHeader 
          sparks={effectiveUser.sparks} 
          neurons={effectiveUser.neurons} 
          username={effectiveUser.username} 
          avatarUrl={effectiveUser.avatarUrl}
          onLogout={onLogout}
          onNavigate={onNavigate} 
          activeSectionLabel={ 
            playingGame 
            ? playingGame.name.toUpperCase() 
            : activeSectionForHeader
          }
          menuItemKeys={menuItemKeys} 
          // Fix: Explicitly type sum and count to number for correct operator '+' application
          unreadPrivateMessagesCount={Object.values(unreadMessages).reduce((sum: number, count: number) => sum + count, 0)}
          matchmakingStatus={matchmakingStatus}
          onOpenGlobalChat={() => onNavigate(ActiveSection.MessagingHub)} 
        />
        
        <div className="flex flex-grow overflow-hidden">
          <main className={`flex-grow overflow-y-auto ${playingGame ? 'p-0 bg-[#0B0F1A]' : 'p-0'}`}> 
            {renderGameContent()}
          </main>
          
          {!playingGame && activeSection !== ActiveSection.MessagingHub && (
            <MemoizedUserList 
              users={onlineUsers} 
              onOpenPrivateChat={(userId) => onOpenConversation(userId, 'private')} 
              unreadMessages={unreadMessages}
              onNavigate={onNavigate} 
            />
          )}
        </div>
        {/* Removed floating NextEventTimer from here as its functionality is now within UserList */}
      </div>
    </div>
  );
});

export default DashboardPage;
