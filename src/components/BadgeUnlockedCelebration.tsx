import React, { useEffect } from 'react';
import { Award, Sparkles, CheckCircle2, X, Flame, Shield, Zap, Dna, FileCheck, Target, Atom, Crown, Stethoscope } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VirtualBadge } from '../types/neet';

interface BadgeUnlockedCelebrationProps {
  badge: VirtualBadge | null;
  onClose: () => void;
}

export const BadgeUnlockedCelebration: React.FC<BadgeUnlockedCelebrationProps> = ({
  badge,
  onClose,
}) => {
  useEffect(() => {
    if (badge) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#10b981', '#06b6d4', '#f59e0b', '#ec4899', '#8b5cf6'],
        });
      } catch (e) {
        console.log('Confetti trigger:', e);
      }
    }
  }, [badge]);

  if (!badge) return null;

  const renderBadgeIcon = (name: string, tier: string) => {
    const iconProps = { className: "w-10 h-10" };
    switch (name) {
      case 'Flame': return <Flame {...iconProps} className="w-10 h-10 text-amber-400" />;
      case 'Stethoscope': return <Stethoscope {...iconProps} className="w-10 h-10 text-emerald-400" />;
      case 'Zap': return <Zap {...iconProps} className="w-10 h-10 text-yellow-400" />;
      case 'Shield': return <Shield {...iconProps} className="w-10 h-10 text-blue-400" />;
      case 'Award': return <Award {...iconProps} className="w-10 h-10 text-cyan-400" />;
      case 'Dna': return <Dna {...iconProps} className="w-10 h-10 text-emerald-400" />;
      case 'FileCheck': return <FileCheck {...iconProps} className="w-10 h-10 text-purple-400" />;
      case 'Target': return <Target {...iconProps} className="w-10 h-10 text-rose-400" />;
      case 'Atom': return <Atom {...iconProps} className="w-10 h-10 text-cyan-400" />;
      case 'Crown': return <Crown {...iconProps} className="w-10 h-10 text-amber-300" />;
      default: return <Award {...iconProps} className="w-10 h-10 text-emerald-400" />;
    }
  };

  const tierGradients = {
    Bronze: 'from-amber-700/40 via-amber-800/30 to-amber-900/40 border-amber-600/50 text-amber-300',
    Silver: 'from-slate-400/30 via-slate-500/20 to-slate-600/30 border-slate-300/50 text-slate-200',
    Gold: 'from-amber-500/30 via-yellow-500/20 to-amber-600/30 border-amber-400/60 text-amber-300',
    Diamond: 'from-cyan-500/30 via-teal-400/20 to-blue-600/30 border-cyan-400/60 text-cyan-200',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-center">
        {/* Ambient Glow */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebratory Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold mb-5 tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          <span>NEW BADGE UNLOCKED!</span>
        </div>

        {/* Badge Icon Emblem */}
        <div className="relative mx-auto w-24 h-24 rounded-2xl p-1 bg-gradient-to-tr from-amber-400 via-emerald-400 to-cyan-400 shadow-xl shadow-amber-500/20 mb-4 animate-bounce">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center border border-slate-800">
            {renderBadgeIcon(badge.iconName, badge.tier)}
          </div>
        </div>

        {/* Tier Tag */}
        <span className={`inline-block px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider mb-2 border ${tierGradients[badge.tier]}`}>
          {badge.tier} Tier Milestone
        </span>

        {/* Badge Title & Description */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
          {badge.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 max-w-xs mx-auto">
          {badge.description}
        </p>

        {/* Perks Box */}
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-left space-y-1 mb-6">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Aspirant Reward & Perk:
          </span>
          <p className="text-emerald-300 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{badge.perkText}</span>
          </p>
        </div>

        {/* Claim Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02]"
        >
          Claim Badge & Keep Learning
        </button>
      </div>
    </div>
  );
};
