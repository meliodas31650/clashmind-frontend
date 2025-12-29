

import React from 'react';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';
import { SparkIcon, NeuronIcon, RulesIcon, MyAccountIcon, CortexArenaIcon } from '../../constants'; 

const MemoizedGlassCard = React.memo(GlassCard);
const MemoizedButton = React.memo(Button);

const AdminFeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode, actionText?: string, onAction?: () => void }> = React.memo(({ title, description, icon, actionText, onAction }) => (
  <MemoizedGlassCard className="bg-[#1F1F2B]/80 border-[#A100FF]/60 p-6 flex flex-col items-center text-center">
    {/* Grey Cortex background, Neon Purple border */}
    <div className="text-[#FFD700] mb-4">{icon}</div> {/* Gold icon */}
    <h3 className="text-xl font-orbitron text-[#FFD700] mb-2" style={{textShadow: '0 0 4px rgba(255,215,0,0.5)'}}>{title}</h3> {/* Gold title */}
    <p className="text-sm text-[#F4F4F4]/80 mb-4 flex-grow">{description}</p>
    {actionText && onAction && (
      <MemoizedButton variant="secondary" size="small" onClick={onAction} className="mt-auto"> {/* Neon Purple button */}
        {actionText}
      </MemoizedButton>
    )}
  </MemoizedGlassCard>
));

const AdminPlaceholder: React.FC = React.memo(() => {
  const siteStats = {
    totalUsers: 1258,
    activeDuels: 72,
    totalGamesPlayed: 10923,
    sparksInCirculation: 1570300,
  };

  return (
    <div className="p-2 md:p-6 h-full flex flex-col bg-transparent"> 
      <div className="mb-8">
        <h2 className="text-4xl font-orbitron font-bold text-[#FFD700]" style={{textShadow: '0 0 6px rgba(255,215,0,0.7)'}}>Admin Control Panel</h2> {/* Gold title */}
        <p className="text-[#F4F4F4]/80 text-lg mt-1">Manage ClashMind operations and monitor Grid activity.</p>
      </div>

      <section className="mb-10">
        <h3 className="text-2xl font-orbitron text-[#FFD700] mb-4" style={{textShadow: '0 0 5px rgba(255,215,0,0.6)'}}>Site Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MemoizedGlassCard className="p-5 bg-[#0B0F1A]/80 border-[#A100FF]/50"> {/* Deep Space bg, Neon Purple border */}
            <div className="flex items-center">
              <MyAccountIcon className="w-8 h-8 text-[#A100FF] mr-3" /> {/* Neon Purple icon */}
              <div>
                <p className="text-2xl font-bold text-[#F4F4F4]">{siteStats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-[#F4F4F4]/70">Total Users</p>
              </div>
            </div>
          </MemoizedGlassCard>
          <MemoizedGlassCard className="p-5 bg-[#0B0F1A]/80 border-[#A100FF]/50">
            <div className="flex items-center">
              <CortexArenaIcon className="w-8 h-8 text-[#A100FF] mr-3" />
              <div>
                <p className="text-2xl font-bold text-[#F4F4F4]">{siteStats.activeDuels.toLocaleString()}</p>
                <p className="text-sm text-[#F4F4F4]/70">Active Duels</p>
              </div>
            </div>
          </MemoizedGlassCard>
          <MemoizedGlassCard className="p-5 bg-[#0B0F1A]/80 border-[#A100FF]/50">
             <div className="flex items-center">
              <RulesIcon className="w-8 h-8 text-[#A100FF] mr-3" />
              <div>
                <p className="text-2xl font-bold text-[#F4F4F4]">{siteStats.totalGamesPlayed.toLocaleString()}</p>
                <p className="text-sm text-[#F4F4F4]/70">Games Played</p>
              </div>
            </div>
          </MemoizedGlassCard>
          <MemoizedGlassCard className="p-5 bg-[#0B0F1A]/80 border-[#A100FF]/50">
            <div className="flex items-center">
              <SparkIcon className="w-8 h-8 text-[#FFD700] mr-3" /> {/* Gold Spark icon */}
              <div>
                <p className="text-2xl font-bold text-[#F4F4F4]">{siteStats.sparksInCirculation.toLocaleString()}</p>
                <p className="text-sm text-[#F4F4F4]/70">Sparks in Circulation</p>
              </div>
            </div>
          </MemoizedGlassCard>
        </div>
      </section>
      
      <section>
        <h3 className="text-2xl font-orbitron text-[#FFD700] mb-6" style={{textShadow: '0 0 5px rgba(255,215,0,0.6)'}}>Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AdminFeatureCard 
            title="User Management"
            description="View, edit, or manage user accounts and permissions."
            icon={<MyAccountIcon className="w-10 h-10" />}
            actionText="Manage Users"
            onAction={() => alert('Navigate to User Management (not implemented)')}
          />
          <AdminFeatureCard 
            title="Game Configuration"
            description="Adjust game rules, add new games, or manage existing ones."
            icon={<RulesIcon className="w-10 h-10" />}
            actionText="Configure Games"
            onAction={() => alert('Navigate to Game Configuration (not implemented)')}
          />
          <AdminFeatureCard 
            title="Site Announcements"
            description="Create or schedule global announcements for all users."
            icon={<NeuronIcon className="w-10 h-10 text-[#A100FF]" />} 
            actionText="Create Announcement"
            onAction={() => alert('Navigate to Announcements (not implemented)')}
          />
           <AdminFeatureCard 
            title="Content Moderation"
            description="Review reported content, manage chat logs, and maintain community standards."
            icon={<CortexArenaIcon className="w-10 h-10" />} 
            actionText="Moderate Content"
            onAction={() => alert('Navigate to Content Moderation (not implemented)')}
          />
           <AdminFeatureCard 
            title="System Health"
            description="Check server status, view error logs, and monitor performance."
            icon={<SparkIcon className="w-10 h-10 text-[#FFD700]" />} 
            actionText="View System Health"
            onAction={() => alert('Navigate to System Health (not implemented)')}
          />
           <AdminFeatureCard 
            title="View Analytics"
            description="Access detailed analytics on user engagement, game popularity, and more."
            icon={<NeuronIcon className="w-10 h-10 text-[#A100FF]" />} 
            actionText="Open Analytics"
            onAction={() => alert('Navigate to Analytics (not implemented)')}
          />
        </div>
      </section>

      <div className="mt-auto pt-8 text-center text-sm text-[#F4F4F4]/60">
        <p>ClashMind Admin Panel v0.1. Gridrunner Protocol.</p>
      </div>
    </div>
  );
});

export default AdminPlaceholder;