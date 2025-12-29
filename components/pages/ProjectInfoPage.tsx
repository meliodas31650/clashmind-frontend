

import React from 'react';
import Button from '../ui/Button';
import OfficialClashMindLogo from '../ui/OfficialClashMindLogo'; 
import { NeuronIcon, SparkIcon, CortexArenaIcon, WalletIcon, AdminIcon, RulesIcon, AcademyIcon, ChatIcon } from '../../constants';
import useTranslation from '../../hooks/useTranslation';

interface ProjectInfoPageProps {
  onNavigateToAuth: () => void;
  onNavigateToLanding: () => void;
}

const MemoizedButton = React.memo(Button);
const MemoizedOfficialClashMindLogo = React.memo(OfficialClashMindLogo);

const Section: React.FC<{ id?: string, title: string; children: React.ReactNode; className?: string, titleClassName?: string, icon?: React.ReactNode }> = React.memo(({ id, title, children, className, titleClassName, icon }) => (
  <section id={id} className={`py-12 md:py-16 px-4 scroll-mt-20 ${className}`}>
    <div className="container mx-auto max-w-3xl text-center">
      <div className="flex justify-center items-center mb-4">
         {icon && React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-10 h-10 text-[#FFD700] mr-3" })}
        <h2 className={`text-3xl md:text-4xl font-orbitron font-bold text-[#FFD700] ${titleClassName}`} style={{textShadow: '0 0 6px rgba(255,215,0,0.7), 0 0 10px rgba(255,215,0,0.4)'}}>{title}</h2>
      </div>
      <div className="text-lg text-[#F4F4F4]/90 space-y-4 leading-relaxed text-left">
        {children}
      </div>
    </div>
  </section>
));


const ProjectInfoPage: React.FC<ProjectInfoPageProps> = React.memo(({ onNavigateToAuth, onNavigateToLanding }) => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen w-full bg-transparent text-[#F4F4F4] overflow-y-auto relative">
      
      <div className="relative z-10">
        <header className="py-8 text-center sticky top-0 bg-[#0B0F1A]/80 backdrop-blur-md z-50 border-b border-[#A100FF]/30">
          <div className="container mx-auto flex justify-between items-center px-4">
            <MemoizedOfficialClashMindLogo size="small" />
            <div className="space-x-3">
                <MemoizedButton onClick={onNavigateToLanding} variant="ghost" size="small">Back to Home</MemoizedButton>
                <MemoizedButton onClick={onNavigateToAuth} variant="primary" size="small">Play Now (18+)</MemoizedButton>
            </div>
          </div>
        </header>
        
        <div className="pt-8 text-center">
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-[#FFD700] mb-2" style={{textShadow: "0 0 8px rgba(255,215,0,0.7), 0 0 15px rgba(255,215,0,0.5)"}}>ClashMind Grid Protocol</h1>
            <p className="text-xl text-[#F4F4F4]/80 mt-1">Develop Your Mind. Optimize Your Time. Earn Based on Pure Skill.</p>
        </div>


        <Section title="Our Philosophy: Beyond Gaming" className="bg-[#1F1F2B]/70 backdrop-blur-sm" icon={<AcademyIcon />}>
          <p>
            ClashMind is more than a gaming platform; it's a crucible for intellectual growth and a testament to the power of meritocracy. 
            We believe your time is valuable, and your cognitive efforts should be both enriching and rewarding.
          </p>
          <p>
            Our core principles:
            <ul className="list-disc list-inside space-y-2 mt-2 text-[#F4F4F4]/85">
                <li><strong>Develop Your Brain:</strong> Our duels are designed to challenge and expand your strategic thinking, problem-solving skills, and mental agility. Every game is an opportunity to learn and grow.</li>
                <li><strong>Optimize Your Time:</strong> Engage in meaningful competition that respects your time. ClashMind offers focused, high-impact intellectual challenges.</li>
                <li><strong>Earn Based on Competence:</strong> Your success and earnings are solely determined by your performance and skill. There are no shortcuts – only strategy, intellect, and execution.</li>
                <li><strong>The Triple Profitability:</strong> 1. Gain Cognitive Skills. 2. Gain Personal Value (Neuron Ranking). 3. Gain Potential Real-Value Sparks.</li>
            </ul>
          </p>
          <p className="mt-3">
            Join a community where intellectual prowess is celebrated, and fair competition with real stakes defines the experience.
          </p>
        </Section>
        
        <Section id="ethical-manifesto" title={t('projectInfo.ourEthicalManifesto')} icon={<AdminIcon className="w-10 h-10 text-[#FFD700] mr-3" />}>
            <p>ClashMind is built upon a foundation of ethical principles to ensure a fair, transparent, and rewarding experience for all Gridrunners:</p>
            <ul className="list-decimal list-inside space-y-3 mt-4 text-[#F4F4F4]/85">
                <li><strong>{t('projectInfo.ethicalPrinciple1')}</strong></li>
                <li><strong>{t('projectInfo.ethicalPrinciple2')}</strong></li>
                <li><strong>{t('projectInfo.ethicalPrinciple3')}</strong></li>
                <li><strong>{t('projectInfo.ethicalPrinciple4')}</strong></li>
                <li><strong>{t('projectInfo.ethicalPrinciple5')}</strong></li>
            </ul>
            <p className="mt-3 italic">{t('projectInfo.ethiqueClashMindLabel')}</p>
            <p className="mt-3">{t('projectInfo.freePlayModeInfo')}</p>
        </Section>
        
        <Section id="data-transparency" title={t('projectInfo.dataTransparencyTitle')} icon={<RulesIcon />} className="bg-[#1F1F2B]/70 backdrop-blur-sm">
            <p>{t('projectInfo.dataTransparencyDesc')}</p>
        </Section>


        <Section title="The Duel Arena: Test Your Mettle" icon={<CortexArenaIcon />}> 
          <p>
            The heart of ClashMind is the CORTEX ARENA. Here, you'll find a diverse range of games designed to test different cognitive skills. 
            Each duel is a chance to outsmart your opponent, adapt to evolving challenges, and win Sparks. Your performance is the only factor determining victory.
          </p>
          <div className="my-8 text-center">
            <CortexArenaIcon className="w-24 h-24 text-[#A100FF] mx-auto opacity-70" style={{filter: 'drop-shadow(0 0 15px rgba(161,0,255,0.6))'}}/>
            <p className="text-sm text-[#F4F4F4]/60 mt-2">Where pure skill translates to tangible rewards.</p>
          </div>
        </Section>

        <Section title="Neurons & Sparks: Skill and Reward" icon={<WalletIcon />} className="bg-[#1F1F2B]/70 backdrop-blur-sm">
           <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="text-left p-4 border border-[#A100FF]/50 rounded-xl bg-[#0B0F1A]/40">
                <div className="flex items-center mb-2">
                    <NeuronIcon className="w-10 h-10 text-[#A100FF] mr-2" />
                    <h3 className="text-2xl font-orbitron text-[#A100FF]">Neurons (🧠)</h3>
                </div>
                <p className="text-[#F4F4F4]/80">Neurons represent your intellectual development and ranking on the Grid. Accumulate Neurons by outperforming others in duels, showcasing your growing strategic mastery and cognitive abilities. Neurons are a pure measure of skill, with no direct monetary value.</p>
            </div>
            <div className="text-left p-4 border border-[#FFD700]/50 rounded-xl bg-[#0B0F1A]/40">
                <div className="flex items-center mb-2">
                    <SparkIcon className="w-10 h-10 text-[#FFD700] mr-2" />
                    <h3 className="text-2xl font-orbitron text-[#FFD700]" style={{textShadow: '0 0 4px rgba(255,215,0,0.5)'}}>Sparks (⚡)</h3>
                </div>
                <p className="text-[#F4F4F4]/80">Sparks are the currency of ClashMind, holding real monetary value, and are earned solely through your demonstrated skill and performance in duels. Purchase additional Sparks to enter high-stakes games, wager confidently based on your abilities, and withdraw your winnings – a direct result of your competence.</p>
            </div>
          </div>
        </Section>

        <Section id="responsible-gaming" title="Responsible Gaming & Player Protection" icon={<AdminIcon className="w-10 h-10 text-[#FFD700] mr-3" />} >
           <p className="font-semibold text-yellow-400">Your well-being is our priority. ClashMind is committed to responsible gaming practices.</p>
           <ul className="list-disc list-inside space-y-3 mt-4 text-[#F4F4F4]/80">
                <li><strong>Understand the Risks:</strong> Gambling involves financial risk and can be addictive. Only play with funds you can afford to lose. It should be a form of entertainment, not a way to make money.</li>
                <li><strong>Age Verification (18+):</strong> ClashMind is strictly for individuals aged 18 years or older, or the legal age of majority in their jurisdiction. We employ verification processes to ensure compliance.</li>
                <li><strong>Set Limits:</strong> We encourage you to use tools to set deposit, wager, and session time limits. These can be managed in your Wallet section (feature coming soon).</li>
                <li><strong>Self-Assessment:</strong> Be aware of your gaming habits. If you feel you might be developing a problem, take a break or seek help.</li>
                <li><strong>Self-Exclusion:</strong> If you need to stop playing, you can request self-exclusion for a defined period or permanently. Contact support for assistance.</li>
                <li><strong>Know When to Stop:</strong> Recognize signs of problem gambling, such as chasing losses, gambling when distressed, or neglecting responsibilities.</li>
                <li><strong>Seek Help:</strong> If you or someone you know needs help with gambling, confidential support is available:
                    <ul className="list-['-_'] list-inside ml-4 mt-1 space-y-1">
                        <li>GamCare (UK): <a href="https://www.gamcare.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#00E0FF] hover:underline">www.gamcare.org.uk</a></li>
                        <li>Gamblers Anonymous: <a href="https://www.gamblersanonymous.org" target="_blank" rel="noopener noreferrer" className="text-[#00E0FF] hover:underline">www.gamblersanonymous.org</a></li>
                        <li>National Council on Problem Gambling (US): <a href="https://www.ncpgambling.org" target="_blank" rel="noopener noreferrer" className="text-[#00E0FF] hover:underline">www.ncpgambling.org</a></li>
                        <li>(Local resources may also be available in your region)</li>
                    </ul>
                </li>
           </ul>
           <p className="mt-4">We reserve the right to intervene if we detect problematic gaming behavior to protect our players.</p>
        </Section>
        
        <Section id="terms-real-money" title="Terms & Conditions for Real Money Gaming" icon={<RulesIcon className="w-10 h-10 text-[#FFD700] mr-3" />} className="bg-[#1F1F2B]/70 backdrop-blur-sm">
            <p className="font-semibold text-yellow-400">By participating in real money gaming on ClashMind, you agree to the full Terms and Conditions.</p>
            <p>This is a placeholder for detailed legal terms. Key aspects would include:</p>
            <ul className="list-disc list-inside space-y-3 mt-4 text-[#F4F4F4]/80">
                <li><strong>Eligibility:</strong> Age (18+) and jurisdictional restrictions. Users are responsible for ensuring online gambling is legal in their location.</li>
                <li><strong>Account Responsibility:</strong> Security of login credentials, accuracy of personal information for KYC/AML.</li>
                <li><strong>Deposits & Withdrawals:</strong> Accepted payment methods, processing times, fees (if any), withdrawal limits, and verification requirements for withdrawals.</li>
                <li><strong>Spark Value:</strong> The conversion rate of Sparks to real currency, and any conditions affecting this.</li>
                <li><strong>Wagering Rules:</strong> Specific rules for how wagers are placed and settled for each game. All wagers are final once confirmed.</li>
                <li><strong>Fair Play & Prohibited Conduct:</strong> Policies against cheating, collusion, use of bots, multiple accounts, AI-assistance, etc. Consequences for violations include forfeiture of winnings and account closure. ClashMind is a platform for human skill.</li>
                <li><strong>Dispute Resolution:</strong> Process for handling disputes related to game outcomes or transactions.</li>
                <li><strong>Account Suspension/Closure:</strong> Conditions under which accounts may be suspended or closed by ClashMind.</li>
                <li><strong>Limitation of Liability & Disclaimers.</strong></li>
                <li><strong>Intellectual Property.</strong></li>
                <li><strong>Changes to Terms:</strong> How users are notified of updates to the terms.</li>
            </ul>
            <p className="mt-4">A complete and legally reviewed Terms & Conditions document is essential for a real-money gaming platform. This placeholder is not a substitute for professional legal advice.</p>
        </Section>

        <Section id="community-info" title={t('projectInfo.communityTitle')} icon={<ChatIcon />}>
            <p>{t('projectInfo.communityDesc')}</p>
            <p className="mt-3"> (Link to Discord/Forum coming soon!)</p>
        </Section>

        <Section title="Join the Intellectual Vanguard" className="pb-20 md:pb-32" icon={<SparkIcon />}>
          <p className="mb-8 text-center">
            Are you ready to develop your mind, optimize your time, and prove your skill in an arena where performance is paramount? 
            The CORTEX is waiting. The challenge is set. Your intellect is your ultimate asset.
          </p>
          <div className="text-center">
            <MemoizedButton 
                onClick={onNavigateToAuth} 
                variant="primary" 
                size="large"
                className="text-xl px-12 py-5 shadow-xl shadow-[#00E0FF]/30 hover:shadow-[#00E0FF]/50"
            >
                Enter ClashMind & Prove Your Skill (18+)
            </MemoizedButton>
          </div>
        </Section>
        
        <footer className="py-8 text-center bg-[#0B0F1A]/95 border-t border-[#A100FF]/50">
          <p className="text-[#F4F4F4]/70">&copy; {new Date().getFullYear()} ClashMind. Develop. Compete. Earn.</p>
           <p className="text-xs text-[#F4F4F4]/50 mt-1">18+ Only. Play Responsibly. Gambling can be addictive. Terms apply.</p>
        </footer>
      </div>
    </div>
  );
});

export default ProjectInfoPage;