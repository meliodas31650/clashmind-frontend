

import React, { useState, useCallback, useEffect, useMemo, Suspense } from 'react';
import { PLACEHOLDER_USERS, AVAILABLE_GAMES, MENU_ITEMS_KEYS, GLOBAL_CHAT_ID, GLOBAL_CHAT_NAME } from './constants';
import { ActiveSection, UserProfile, AppView, PlayingGameInfo, PrivateChatSession, GroupChatSession, ChatMessage, MatchmakingStatus, GameInfo, ActiveConversationType } from './types';
import { LocalizationProvider } from './contexts/LocalizationContext';
import ErrorBoundary from './components/ui/ErrorBoundary';
import useTranslation from './hooks/useTranslation'; 

// Page Components
import LandingPage from './components/pages/LandingPage';
import AuthPage from './components/pages/AuthPage';
import DashboardPage from './components/pages/DashboardPage';
import RestrictedPage from './components/pages/RestrictedPage';
import ProjectInfoPage from './components/pages/ProjectInfoPage';
import AdminI18nPage from './components/pages/AdminI18nPage';
import GamblingWarningModal from './components/ui/GamblingWarningModal';

const MemoizedLandingPage = React.memo(LandingPage);
const MemoizedAuthPage = React.memo(AuthPage);
const MemoizedDashboardPage = React.memo(DashboardPage);
const MemoizedRestrictedPage = React.memo(RestrictedPage);
const MemoizedProjectInfoPage = React.memo(ProjectInfoPage);
const MemoizedGamblingWarningModal = React.memo(GamblingWarningModal);

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [playingGame, setPlayingGame] = useState<PlayingGameInfo | null>(null); 
  
  const [activeDashboardSection, setActiveDashboardSection] = useState<ActiveSection>(ActiveSection.CortexArena);
  const [onlineUsers, setOnlineUsers] = useState<UserProfile[]>([]);
  const [showGamblingWarning, setShowGamblingWarning] = useState<boolean>(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // --- Enhanced Chat State ---
  const [globalChatMessages, setGlobalChatMessages] = useState<ChatMessage[]>([]);
  const [privateConversations, setPrivateConversations] = useState<Record<string, PrivateChatSession>>({});
  const [groupConversations, setGroupConversations] = useState<Record<string, GroupChatSession>>({}); // Placeholder
  
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [activeConversationType, setActiveConversationType] = useState<ActiveConversationType | null>(null);
  
  const [unreadMessages, setUnreadMessages] = useState<Record<string, number>>({}); // Key: conversationId (userId or groupId)
  const [showCreateGroupModal, setShowCreateGroupModal] = useState<boolean>(false); // Placeholder
  const [blockedUserIds, setBlockedUserIds] = useState<string[]>([]); // Placeholder

  // Matchmaking State
  const [isMatchmaking, setIsMatchmaking] = useState<boolean>(false);
  const [matchmakingStatus, setMatchmakingStatus] = useState<MatchmakingStatus>(MatchmakingStatus.Idle);

  useEffect(() => {
    const warningAcknowledged = localStorage.getItem('clashmindGamblingWarningAcknowledged');
    if (!warningAcknowledged) {
      setShowGamblingWarning(true);
    }
    setIsInitialLoad(false); 
  }, []);

  const handleGamblingWarningAcknowledge = useCallback(() => {
    localStorage.setItem('clashmindGamblingWarningAcknowledged', 'true');
    setShowGamblingWarning(false);
  }, []);

  useEffect(() => {
    if (currentUser) {
      setOnlineUsers(PLACEHOLDER_USERS.filter(u => u.isOnline && u.id !== currentUser.id));
    } else {
      setOnlineUsers(PLACEHOLDER_USERS.filter(u => u.isOnline).slice(0,4)); 
    }
  }, [currentUser]);

  const navigateTo = useCallback((view: AppView) => {
    if (view === 'dashboard' && !currentUser && !playingGame) { 
      setCurrentView('restricted');
      return;
    }
    setCurrentView(view);
    window.scrollTo(0, 0); 
  }, [currentUser, playingGame]);

  const handleLoginSuccess = useCallback((userData: UserProfile) => {
    setCurrentUser(userData);
    navigateTo('dashboard');
     // Initialize global chat with some messages (can be moved to a more appropriate place)
    setGlobalChatMessages([
        { id: 'g1', userId: 'System', username: 'ClashMind System', text: 'Global Cortex Link Established. Welcome Gridrunners!', timestamp: new Date(Date.now() - 1000 * 60 * 10), isSystem: true, isOwn: false },
        { id: 'g2', userId: 'user1', username: 'LogicWeaver', text: 'Nexus online! Anyone for Gravity Four?', timestamp: new Date(Date.now() - 1000 * 60 * 5), isOwn: false, avatarUrl: PLACEHOLDER_USERS.find(u=>u.id==='user1')?.avatarUrl },
    ]);
  }, [navigateTo]);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setPlayingGame(null); 
    setActiveConversationId(null);
    setActiveConversationType(null);
    setPrivateConversations({}); 
    setGroupConversations({});
    setUnreadMessages({});
    setGlobalChatMessages([]);
    navigateTo('landing');
  }, [navigateTo]);

  const handleDashboardNavigation = useCallback((sectionId: ActiveSection) => {
    setActiveDashboardSection(sectionId);
    if (playingGame) setPlayingGame(null); 
    if (sectionId !== ActiveSection.MessagingHub) {
        setActiveConversationId(null);
        setActiveConversationType(null);
    }
  }, [playingGame]);

  const handlePlayGame = useCallback((gameId: string, gameName: string) => {
    setPlayingGame({ id: gameId, name: gameName });
    setActiveConversationId(null); 
    setActiveConversationType(null);
    if (currentView !== 'dashboard') {
        navigateTo('dashboard'); 
    }
    setActiveDashboardSection(ActiveSection.CortexArena);
  }, [navigateTo, currentView]);

  const handleExitGame = useCallback(() => {
    setPlayingGame(null);
    setActiveDashboardSection(ActiveSection.CortexArena); 
  }, []);

  // --- Enhanced Chat Handlers ---
  const clearUnreadForConversation = useCallback((conversationId: string) => {
    setUnreadMessages(prev => ({ ...prev, [conversationId]: 0 }));
  }, []);
  
  const handleOpenConversation = useCallback((id: string, type: ActiveConversationType) => {
    setActiveConversationId(id);
    setActiveConversationType(type);

    if (type === 'private') {
      const targetUser = PLACEHOLDER_USERS.find(u => u.id === id);
      if (!targetUser) return;

      if (!privateConversations[id]) {
        setPrivateConversations(prev => ({
          ...prev,
          [id]: { userId: targetUser.id, userName: targetUser.username, avatarUrl: targetUser.avatarUrl, messages: [], isOnline: targetUser.isOnline }
        }));
      }
      clearUnreadForConversation(id);
    } else if (type === 'group') {
      // Logic for opening/initializing group chat if needed
      clearUnreadForConversation(id);
    }
    // Global chat doesn't have specific unread count in this model, shown directly
  }, [privateConversations, clearUnreadForConversation]);

  const handleSendMessage = useCallback((conversationId: string, conversationType: ActiveConversationType, text: string) => {
    if (!currentUser) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: currentUser.id,
      username: currentUser.username,
      avatarUrl: currentUser.avatarUrl,
      text,
      timestamp: new Date(),
      isOwn: true,
    };

    if (conversationType === 'global') {
      setGlobalChatMessages(prev => [...prev, newMessage]);
      // Simulate other users seeing it
    } else if (conversationType === 'private') {
      setPrivateConversations(prev => {
        const updatedConvo = { ...(prev[conversationId] || { userId: conversationId, userName: 'Unknown', messages: [] }) };
        updatedConvo.messages = [...updatedConvo.messages, newMessage];
        return { ...prev, [conversationId]: updatedConvo };
      });

      // Simulate receiving a reply for demo
      setTimeout(() => {
        const replyUser = PLACEHOLDER_USERS.find(u => u.id === conversationId);
        if (!replyUser) return;
        const reply: ChatMessage = {
          id: (Date.now() + 1).toString(), userId: replyUser.id, username: replyUser.username, avatarUrl: replyUser.avatarUrl,
          text: `Roger that, ${currentUser.username}! (Auto-reply from ${replyUser.username})`, timestamp: new Date(), isOwn: false,
        };
        setPrivateConversations(prev => {
          const convoForReply = { ...(prev[conversationId] || { userId: conversationId, userName: replyUser.username, messages: [] }) };
          convoForReply.messages = [...convoForReply.messages, reply];
          return { ...prev, [conversationId]: convoForReply };
        });
        if (activeConversationId !== conversationId || activeConversationType !== 'private') {
          setUnreadMessages(prev => ({ ...prev, [conversationId]: (prev[conversationId] || 0) + 1 }));
        }
      }, 1200);
    } else if (conversationType === 'group') {
      setGroupConversations(prev => {
        const updatedGroup = { ...(prev[conversationId] || { groupId: conversationId, groupName: 'Unknown Group', members:[], messages: [] }) };
        updatedGroup.messages = [...updatedGroup.messages, newMessage];
        return { ...prev, [conversationId]: updatedGroup };
      });
      // Simulate replies or other group activity
    }
  }, [currentUser, activeConversationId, activeConversationType]);

  const handleCreateGroup = useCallback((groupName: string, memberIds: string[]) => { // Placeholder
    if(!currentUser) return;
    const newGroupId = `group_${Date.now()}`;
    const newGroup: GroupChatSession = {
      groupId: newGroupId,
      groupName,
      members: [currentUser, ...PLACEHOLDER_USERS.filter(u => memberIds.includes(u.id))],
      messages: [{id: 'sys_created', userId: 'system', username: 'System', text: `${currentUser.username} created group "${groupName}"`, timestamp: new Date(), isSystem: true, isOwn: false}],
      avatarUrl: `https://ui-avatars.com/api/?name=${groupName.substring(0,2)}&background=2A0F3E&color=00E0FF&bold=true`
    };
    setGroupConversations(prev => ({...prev, [newGroupId]: newGroup}));
    setShowCreateGroupModal(false);
    handleOpenConversation(newGroupId, 'group');
    alert(`Group "${groupName}" created (simulated).`);
  }, [currentUser, handleOpenConversation]);

  const handleBlockUser = useCallback((userIdToBlock: string) => { // Placeholder
    if(currentUser?.id === userIdToBlock) {
        alert("You cannot block yourself.");
        return;
    }
    setBlockedUserIds(prev => prev.includes(userIdToBlock) ? prev : [...prev, userIdToBlock]);
    // Potentially close chat with blocked user, or indicate blocked status in chat window
    if (activeConversationId === userIdToBlock && activeConversationType === 'private') {
        // May want to close or show a "blocked" message in ActiveChatWindow
    }
    alert(`${PLACEHOLDER_USERS.find(u=>u.id===userIdToBlock)?.username || 'User'} blocked (simulated).`);
  }, [currentUser, activeConversationId, activeConversationType]);
  
  const handleUnblockUser = useCallback((userIdToUnblock: string) => { // Placeholder
    setBlockedUserIds(prev => prev.filter(id => id !== userIdToUnblock));
    alert(`${PLACEHOLDER_USERS.find(u=>u.id===userIdToUnblock)?.username || 'User'} unblocked (simulated).`);
  }, []);


  // --- Duel Invitation Handler ---
  const handleChallengeUser = useCallback((opponentId: string, gameId: string, gameName: string) => {
    if (!currentUser) return;
    const opponent = PLACEHOLDER_USERS.find(u => u.id === opponentId);
    if (!opponent) return;

    const systemMessage: ChatMessage = {
      id: Date.now().toString(), userId: 'system', username: 'ClashMind System',
      text: `${currentUser.username} challenged ${opponent.username} to a duel of ${gameName}! (Game starting for you)`,
      timestamp: new Date(), isSystem: true, isOwn: false,
    };

    setPrivateConversations(prev => {
      const updatedConvo = { ...(prev[opponentId] || {userId: opponentId, userName: opponent.username, avatarUrl: opponent.avatarUrl, messages: []}) };
      updatedConvo.messages = [...updatedConvo.messages, systemMessage];
      return { ...prev, [opponentId]: updatedConvo };
    });
    
    handlePlayGame(gameId, gameName);
  }, [currentUser, handlePlayGame]);

  // --- Matchmaking Handler ---
  const handleQuickMatch = useCallback(async () => {
    if (!currentUser) {
        navigateTo('auth'); 
        return;
    }
    setIsMatchmaking(true);
    setMatchmakingStatus(MatchmakingStatus.Searching);
    await new Promise(resolve => setTimeout(resolve, 3000)); 
    const randomGameIndex = Math.floor(Math.random() * AVAILABLE_GAMES.length);
    const gameToPlay = AVAILABLE_GAMES[randomGameIndex];
    setMatchmakingStatus(MatchmakingStatus.OpponentFound);
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    setMatchmakingStatus(MatchmakingStatus.StartingGame);
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    setIsMatchmaking(false);
    setMatchmakingStatus(MatchmakingStatus.Idle);
    handlePlayGame(gameToPlay.id, gameToPlay.title);
  }, [currentUser, handlePlayGame, navigateTo]);

  const particleLayers = useMemo(() => Array(5).fill(null).map((_, i) => (
    <div
      key={`particle-${i}`}
      className="fixed inset-0 pointer-events-none z-0" 
      style={{
        backgroundImage: `radial-gradient(circle, #FF00C830 1px, transparent 1.5px)`, 
        backgroundRepeat: 'repeat',
        backgroundSize: `${50 + i * 20}px ${50 + i * 20}px`,
        animation: `floatParticles ${10 + i * 5}s linear infinite`,
        animationDelay: `${i * -2}s`,
        opacity: 0,
        '--particle-tx': Math.random() > 0.5 ? 1 : -1,
      } as React.CSSProperties & { '--particle-tx': number }}
    />
  )), []);

  const renderView = () => {
    if (!isInitialLoad && showGamblingWarning && currentView !== 'auth') { 
        return null; 
    }
    switch (currentView) {
      case 'landing':
        return <MemoizedLandingPage 
                  onNavigateToAuth={() => navigateTo('auth')} 
                  onNavigateToProjectInfo={() => navigateTo('projectInfo')} 
                  games={AVAILABLE_GAMES} 
                  users={onlineUsers}
                />;
      case 'auth':
        return <MemoizedAuthPage onLoginSuccess={handleLoginSuccess} onNavigateToLanding={() => navigateTo('landing')} />;
      case 'dashboard':
        if (currentUser || playingGame) { 
          return <MemoizedDashboardPage
                    currentUser={currentUser} 
                    activeSection={activeDashboardSection}
                    onNavigate={handleDashboardNavigation}
                    menuItemKeys={MENU_ITEMS_KEYS} 
                    games={AVAILABLE_GAMES}
                    onlineUsers={onlineUsers} 
                    allUsers={PLACEHOLDER_USERS}
                    onLogout={handleLogout}
                    playingGame={playingGame}
                    onPlayGame={handlePlayGame}
                    onExitGame={handleExitGame}
                    // Enhanced Chat Props
                    globalChatMessages={globalChatMessages}
                    privateConversations={privateConversations}
                    groupConversations={groupConversations}
                    activeConversationId={activeConversationId}
                    activeConversationType={activeConversationType}
                    unreadMessages={unreadMessages}
                    blockedUserIds={blockedUserIds}
                    showCreateGroupModal={showCreateGroupModal}
                    onOpenConversation={handleOpenConversation}
                    onSendMessage={handleSendMessage}
                    onChallengeUser={handleChallengeUser}
                    onCreateGroup={handleCreateGroup} // Pass placeholder
                    onBlockUser={handleBlockUser} // Pass placeholder
                    onUnblockUser={handleUnblockUser} // Pass placeholder
                    onSetShowCreateGroupModal={setShowCreateGroupModal} // Pass placeholder setter
                    onClearUnreadForConversation={clearUnreadForConversation}
                    // Matchmaking Props
                    isMatchmaking={isMatchmaking}
                    matchmakingStatus={matchmakingStatus}
                    onQuickMatch={handleQuickMatch}
                  />;
        }
        navigateTo('restricted'); 
        return null; 
      case 'restricted':
        return <MemoizedRestrictedPage onNavigateToAuth={() => navigateTo('auth')} />;
      case 'projectInfo':
        return <MemoizedProjectInfoPage onNavigateToAuth={() => navigateTo('auth')} onNavigateToLanding={() => navigateTo('landing')} />;
      default:
        return <MemoizedLandingPage onNavigateToAuth={() => navigateTo('auth')} onNavigateToProjectInfo={() => navigateTo('projectInfo')} games={AVAILABLE_GAMES} users={onlineUsers}/>;
    }
  };
  
  const AppContent: React.FC = () => {
    const { t } = useTranslation(); 
    return (
      <div className="min-h-screen w-screen overflow-x-hidden bg-transparent text-[#F4F4F4] font-inter particle-effect relative">
        {particleLayers}
        {renderView()}
        {!isInitialLoad && showGamblingWarning && <MemoizedGamblingWarningModal onAcknowledge={handleGamblingWarningAcknowledge} />}
      </div>
    );
  };

  return (
    <ErrorBoundary>
      <LocalizationProvider>
        <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-[#0B0F1A] text-[#00E0FF] text-xl font-orbitron">Loading Grid Protocol...</div>}>
          <AppContent />
        </Suspense>
      </LocalizationProvider>
    </ErrorBoundary>
  );
};

export default App;