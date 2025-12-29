

import React from 'react';
import { GameInfo, UserProfile } from '../../types';
import Button from '../ui/Button';
import OfficialClashMindLogo from '../ui/OfficialClashMindLogo'; 
import { SparkIcon, NeuronIcon, CortexArenaIcon, MyAccountIcon, RulesIcon, WalletIcon, GameIcon } from '../../constants';
import { useT } from "../../src/contexts/I18nLiveContext";

/**
 * @typedef LandingPageProps
 * @property {() => void} onNavigateToAuth - Callback to navigate to the authentication page.
 * @property {() => void} onNavigateToProjectInfo - Callback to navigate to the project info page.
 * @property {GameInfo[]} games - Array of available games.
 * @property {UserProfile[]} users - Array of online users.
 */
interface LandingPageProps {
  onNavigateToAuth: () => void;
  onNavigateToProjectInfo: () => void;
  games: GameInfo[];
  users: UserProfile[];
}

const MemoizedButton = React.memo(Button);
const MemoizedOfficialClashMindLogo = React.memo(OfficialClashMindLogo);

const SectionCard: React.FC<{icon: React.ReactNode, titleKey: string, descriptionKey: string, t: Function}> = React.memo(({icon, titleKey, descriptionKey, t}) => (
  <div className="p-6 md:p-8 bg-[#0A0D14]/70 rounded-2xl border-2 border-[#A100FF]/60 shadow-xl hover:shadow-[#A100FF]/30 transition-shadow duration-300">
    {icon}
    <h3 className="text-xl md:text-2xl font-orbitron text-[#FFD700] mb-3" style={{textShadow: '0 0 4px rgba(255,215,0,0.6)'}}>{t(titleKey)}</h3>
    <p className="text-[#E0E7FF]/80 text-sm md:text-base leading-relaxed">{t(descriptionKey)}</p>
  </div>
));

/**
 * LandingPage component. Serves as the main entry point for the application.
 * @param {LandingPageProps} props - Component props.
 * @returns {JSX.Element} The rendered LandingPage component.
 */
const LandingPage: React.FC<LandingPageProps> = React.memo(({ onNavigateToAuth, onNavigateToProjectInfo, games, users }) => {
  const { t } = useT();
  const topGames = games.slice(0, 3); 

  return (
    <div className="min-h-screen w-full bg-transparent overflow-y-auto">
      
      <div className="relative z-10"> 
        <header className="py-5 px-4 md:px-8 flex justify-between items-center sticky top-0 bg-[#03001C]/80 backdrop-blur-md z-50 border-b border-[#A100FF]/30">
          <MemoizedOfficialClashMindLogo size="small" className="drop-shadow-[0_2px_8px_rgba(0,224,255,0.3)]"/>
          <div className="space-x-3 md:space-x-4">
            <MemoizedButton onClick={onNavigateToProjectInfo} variant="ghost" size="medium" className="!border-[#00E0FF]/70 hover:!border-[#00E0FF] !text-[#00E0FF]">{t('landingPage.aboutSafetyButton')}</MemoizedButton>
            <MemoizedButton onClick={onNavigateToAuth} variant="secondary" size="medium">{t('landingPage.loginSignupButton')}</MemoizedButton>
          </div>
        </header>

        <section className="min-h-[calc(85vh)] md:min-h-[calc(75vh)] flex flex-col items-center justify-center text-center px-4 py-16 md:py-20 bg-gradient-to-b from-transparent via-[#0A0D14]/40 to-[#181C27]/90 relative">
          {/* Subtle animated grid lines in hero background */}
          <div className="absolute inset-0 z-[-1] overflow-hidden opacity-20">
            {[...Array(5)].map((_, i) => (
                <div key={`hr-${i}`} className="absolute w-full h-px bg-gradient-to-r from-transparent via-[#A100FF]/50 to-transparent animate-neural-line" style={{top: `${10 + i * 20}%`, animationDelay: `${i*0.4}s`, animationDuration: `${6+i*1.5}s` }}></div>
            ))}
            {[...Array(3)].map((_, i) => (
                <div key={`vr-${i}`} className="absolute h-full w-px bg-gradient-to-b from-transparent via-[#00E0FF]/40 to-transparent animate-neural-line" style={{left: `${20 + i * 30}%`, animationDelay: `${0.5 + i*0.4}s`, animationDuration: `${7+i*1.5}s`, animationDirection: 'reverse' }}></div>
            ))}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-bold text-[#00E0FF] mt-4" style={{textShadow: '0 0 8px #00E0FF, 0 0 15px #A100FF, 0 0 25px #A100FF60'}}>
            {t('landingPage.heroTitle1')}
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-semibold text-[#FFD700] mt-2" style={{textShadow: '0 0 7px #FFD700, 0 0 12px #FF8C0080'}}>
            {t('landingPage.heroTitle2')}
          </h2>
          <p className="mt-8 text-lg md:text-xl text-[#E0E7FF]/90 max-w-2xl leading-relaxed">
            {t('landingPage.heroSubtitle')}
          </p>
          <div className="mt-6 space-y-1.5">
            <p className="text-md text-[#00E0FF]/90 italic font-medium">"{t('landingPage.slogan1')}"</p>
            <p className="text-md text-[#A100FF]/90 italic font-medium">"{t('landingPage.slogan2')}"</p>
          </div>
          <MemoizedButton 
            onClick={onNavigateToAuth} 
            variant="primary" 
            size="large" 
            className="mt-12 text-lg md:text-xl px-12 py-4 shadow-xl shadow-[#00E0FF]/40 hover:shadow-[#00A1FF]/60"
          >
            {t('landingPage.enterCortexButton')}
          </MemoizedButton>
           <p className="text-xs text-[#E0E7FF]/70 mt-5">{t('landingPage.ageWarning')}</p>
        </section>

        <section className="py-20 md:py-28 bg-gradient-to-b from-[#181C27]/90 to-[#0A0D14]/90 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-[#FFD700] mb-16" style={{textShadow: '0 0 6px rgba(255,215,0,0.7)'}}>{t('landingPage.howItWorksTitle')}</h2>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <SectionCard icon={<MyAccountIcon className="w-14 h-14 text-[#00E0FF] mx-auto mb-5" />} titleKey="landingPage.step1Title" descriptionKey="landingPage.step1Desc" t={t} />
              <SectionCard icon={<CortexArenaIcon className="w-14 h-14 text-[#00E0FF] mx-auto mb-5" />} titleKey="landingPage.step2Title" descriptionKey="landingPage.step2Desc" t={t} />
              <SectionCard icon={<WalletIcon className="w-14 h-14 text-[#00E0FF] mx-auto mb-5" />} titleKey="landingPage.step3Title" descriptionKey="landingPage.step3Desc" t={t} />
            </div>
          </div>
        </section>
        
        <section className="py-20 md:py-28 bg-[#0A0D14]/90">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-[#FFD700] mb-8" style={{textShadow: '0 0 6px #FFD700B0'}}>{t('landingPage.tripleProfitabilityTitle')}</h2>
            <p className="text-lg text-[#E0E7FF]/80 max-w-3xl mx-auto mb-12 leading-relaxed">{t('landingPage.slogan3')}</p>
            <div className="grid md:grid-cols-3 gap-8 md:gap-10">
                <div className="p-6 bg-[#181C27]/80 rounded-2xl border-2 border-[#A100FF]/50 shadow-lg">
                    <h3 className="text-xl font-orbitron text-[#FFD700] mb-2" style={{textShadow: '0 0 4px rgba(255,215,0,0.5)'}}>1. {t('landingPage.tripleProfitabilityDesc1')}</h3>
                </div>
                <div className="p-6 bg-[#181C27]/80 rounded-2xl border-2 border-[#A100FF]/50 shadow-lg">
                    <h3 className="text-xl font-orbitron text-[#FFD700] mb-2" style={{textShadow: '0 0 4px rgba(255,215,0,0.5)'}}>2. {t('landingPage.tripleProfitabilityDesc2')}</h3>
                </div>
                <div className="p-6 bg-[#181C27]/80 rounded-2xl border-2 border-[#A100FF]/50 shadow-lg">
                    <h3 className="text-xl font-orbitron text-[#FFD700] mb-2" style={{textShadow: '0 0 4px rgba(255,215,0,0.5)'}}>3. {t('landingPage.tripleProfitabilityDesc3')}</h3>
                </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-gradient-to-b from-[#0A0D14]/90 to-[#181C27]/90 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-[#FFD700] mb-16 text-center" style={{textShadow: '0 0 6px rgba(255,215,0,0.7)'}}>{t('landingPage.featuredDuelsTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {topGames.map(game => (
                <div key={game.id} className="bg-[#0A0D14]/80 p-6 rounded-2xl border-2 border-[#A100FF]/70 shadow-xl flex flex-col items-center text-center hover:border-[#FF00C8] hover:shadow-[#FF00C8]/30 transition-all duration-300 group">
                  <img src={game.imageUrl || `https://source.unsplash.com/random/400x200/?${game.id},futuristic,grid,neon`} alt={game.title} className="w-full h-44 object-cover rounded-lg mb-5 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  <h3 className="text-xl md:text-2xl font-orbitron text-[#FFD700] mb-2" style={{textShadow: '0 0 4px rgba(255,215,0,0.6)'}}>{game.title}</h3>
                  <p className="text-sm text-[#E0E7FF]/80 mb-3 flex-grow leading-relaxed">{game.description}</p>
                  <p className="text-sm text-[#FFD700] font-semibold mb-4">{t('landingPage.skillWager', {sparks: game.starsToWin})}</p>
                   <MemoizedButton onClick={onNavigateToAuth} variant="ghost" size="medium" className="mt-auto !border-[#00E0FF]/80 hover:!border-[#00E0FF] !text-[#00E0FF]">{t('landingPage.playNowButton')}</MemoizedButton>
                </div>
              ))}
            </div>
             {games.length === 0 && <p className="text-center text-[#E0E7FF]/70 mt-8">{t('landingPage.noGamesAvailable')}</p>}
          </div>
        </section>

        <section className="py-20 md:py-28 bg-[#181C27]/90">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-[#FFD700] mb-16" style={{textShadow: '0 0 6px rgba(255,215,0,0.7)'}}>{t('landingPage.rewardsTitle')}</h2>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 max-w-4xl mx-auto">
              <div className="p-8 bg-[#0A0D14]/70 rounded-2xl border-2 border-[#A100FF]/60 shadow-xl flex flex-col items-center">
                <NeuronIcon className="w-20 h-20 text-[#A100FF] mb-4 drop-shadow-[0_0_12px_rgba(161,0,255,0.5)]" />
                <h3 className="text-2xl md:text-3xl font-orbitron text-[#A100FF] mb-3">{t('landingPage.neuronsTitle')}</h3>
                <p className="text-[#E0E7FF]/80 leading-relaxed">{t('landingPage.neuronsDesc')}</p>
              </div>
              <div className="p-8 bg-[#0A0D14]/70 rounded-2xl border-2 border-[#A100FF]/60 shadow-xl flex flex-col items-center">
                <SparkIcon className="w-20 h-20 text-[#FFD700] mb-4 drop-shadow-[0_0_12px_rgba(255,215,0,0.5)]" />
                <h3 className="text-2xl md:text-3xl font-orbitron text-[#FFD700] mb-3" style={{textShadow: '0 0 5px rgba(255,215,0,0.6)'}}>{t('landingPage.sparksTitle')}</h3>
                <p className="text-[#E0E7FF]/80 leading-relaxed">{t('landingPage.sparksDesc')}</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#181C27]/90 to-[#0A0D14]/90 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-[#FFD700] mb-8" style={{textShadow: '0 0 6px rgba(255,215,0,0.7)'}}>{t('landingPage.brainValueSimulatorTitle')}</h2>
            <p className="text-lg text-[#E0E7FF]/80 max-w-2xl mx-auto mb-10 leading-relaxed">{t('landingPage.brainValueSimulatorDesc')}</p>
             <p className="text-md text-[#FFD700] font-semibold animate-pulse">{t('landingPage.brainValueSimulatorTitle')} (Coming Soon)</p>
          </div>
        </section>

         <section className="py-20 md:py-28 bg-[#0A0D14]/90">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-[#FFD700] mb-8 text-center" style={{textShadow: '0 0 6px rgba(255,215,0,0.7)'}}>{t('landingPage.buildersProgramTitle')}</h2>
             <p className="text-lg text-[#E0E7FF]/80 max-w-2xl mx-auto mb-12 text-center leading-relaxed">{t('landingPage.buildersProgramDesc')}</p>
            <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-[#FFD700] mb-16 text-center" style={{textShadow: '0 0 6px rgba(255,215,0,0.7)'}}>{t('landingPage.communityTitle')}</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {users.slice(0, 5).map(user => (
                <div key={user.id} className="flex flex-col items-center p-4 bg-[#181C27]/80 rounded-xl border-2 border-[#A100FF]/50 w-36 text-center shadow-lg hover:shadow-[#A100FF]/30 transition-shadow">
                  <img src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.username.replace(/\s/g, '+')}&background=0A0D14&color=00E0FF`} alt={user.username} className="w-20 h-20 rounded-full mb-3 border-2 border-[#FF00C8]/70" />
                  <p className="text-md text-[#00E0FF] font-semibold truncate w-full">{user.username}</p>
                  <p className="text-xs text-[#E0E7FF]/70">⚡{user.sparks}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-[#E0E7FF]/70 mt-10 text-md">{t('landingPage.communitySubtitle')}</p>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-gradient-to-b from-[#0A0D14]/90 to-[#181C27]/95 backdrop-blur-md border-t-2 border-[#A100FF]/40">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-[#FFD700] mb-8" style={{textShadow: '0 0 6px rgba(255,215,0,0.7)'}}>{t('landingPage.responsibleGamingTitle')}</h2>
                <p className="text-[#E0E7FF]/80 max-w-2xl mx-auto mb-6 leading-relaxed">
                    {t('landingPage.responsibleGamingDesc1')}
                </p>
                <p className="text-[#E0E7FF]/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                    {t('landingPage.responsibleGamingDesc2')}
                </p>
                <MemoizedButton onClick={onNavigateToProjectInfo} variant="secondary" size="medium" className="!bg-gradient-to-br !from-[#FF00C8] !to-[#C900A1] hover:!from-[#E000B0] hover:!to-[#A100FF]">{t('landingPage.learnMoreButton')}</MemoizedButton>
                 <p className="text-sm text-[#E0E7FF]/60 mt-10">
                    {t('landingPage.responsibleGamingDesc3')}
                </p>
            </div>
        </section>

        <footer className="py-10 text-center bg-[#03001C]/95 border-t-2 border-[#A100FF]/70">
          <p className="text-[#E0E7FF]/80 text-sm">&copy; {new Date().getFullYear()} ClashMind. {t('landingPage.footerRights')}</p>
          <p className="text-xs text-[#E0E7FF]/60 mt-1.5">{t('landingPage.footerSlogan')}</p>
        </footer>
      </div>
    </div>
  );
});

export default LandingPage;