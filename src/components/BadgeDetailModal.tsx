import React from 'react';
import { 
  X, 
  Award, 
  Flame, 
  Stethoscope, 
  Zap, 
  Shield, 
  Dna, 
  FileCheck, 
  Target, 
  Atom, 
  Crown, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  ArrowRight,
  Share2
} from 'lucide-react';
import { VirtualBadge } from '../types/neet';

interface BadgeDetailModalProps {
  badge: VirtualBadge | null;
  onClose: () => void;
  onPracticeForBadge?: () => void;
}

export const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({
  badge,
  onClose,
  onPracticeForBadge,
}) => {
  if (!badge) return null;

  const renderBadgeIcon = (iconName: string, className = "w-10 h-10") => {
    switch (iconName) {
      case 'Flame': return <Flame className={`${className} text-amber-400`} />;
      case 'Stethoscope': return <Stethoscope className={`${className} text-emerald-400`} />;
      case 'Zap': return <Zap className={`${className} text-yellow-400`} />;
      case 'Shield': return <Shield className={`${className} text-cyan-400`} />;
      case 'Dna': return <Dna className={`${className} text-emerald-400`} />;
      case 'FileCheck': return <FileCheck className={`${className} text-purple-400`} />;
      case 'Target': return <Target className={`${className} text-rose-400`} />;
      case 'Atom': return <Atom className={`${className} text-cyan-400`} />;
      case 'Crown': return <Crown className={`${className} text-amber-300`} />;
      default: return <Award className={`${className} text-emerald-400`} />;
    }
  };

  const tierBorders = {
    Bronze: 'border-amber-700/60 bg-amber-950/30 text-amber-300',
    Silver: 'border-slate-400/60 bg-slate-800/80 text-slate-200',
    Gold: 'border-amber-500/60 bg-amber-500/20 text-amber-300',
    Diamond: 'border-cyan-400/60 bg-cyan-500/20 text-cyan-300',
  };

  const progressPercent = Math.min(100, Math.round((badge.progress / badge.maxProgress) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700 rounded-2xl p-6 sm:p-7 shadow-2xl overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge Insignia */}
        <div className="text-center pt-2 pb-4">
          <div className="relative inline-block mx-auto mb-3">
            <div className={`w-20 h-20 rounded-2xl p-4 flex items-center justify-center border shadow-xl ${
              badge.unlocked
                ? 'bg-slate-900 border-emerald-500/50 shadow-emerald-500/15'
                : 'bg-slate-900/80 border-slate-800 text-slate-600'
            }`}>
              {renderBadgeIcon(badge.iconName)}
            </div>
            {badge.unlocked && (
              <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full text-slate-950">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 mb-1.5">
            <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded border ${tierBorders[badge.tier]}`}>
              {badge.tier} Tier Medal
            </span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              {badge.category}
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-white tracking-tight">
            {badge.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-sm mx-auto leading-relaxed">
            {badge.description}
          </p>
        </div>

        {/* Milestone Requirement & Progress */}
        <div className="space-y-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800 mb-5 text-xs">
          <div className="flex items-start justify-between gap-2">
            <span className="text-slate-400 font-medium">Unlock Requirement:</span>
            <span className="font-semibold text-slate-200 text-right">{badge.requirementText}</span>
          </div>

          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-slate-400">
              <span>Status:</span>
              <span className={`font-bold ${badge.unlocked ? 'text-emerald-400' : 'text-amber-400'}`}>
                {badge.unlocked ? `Unlocked (${badge.unlockedAt || 'Active'})` : `${badge.progress} / ${badge.maxProgress} (${progressPercent}%)`}
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${badge.unlocked ? 'bg-emerald-500' : 'bg-amber-500'}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
              Aspirant Perk & Reward:
            </span>
            <p className="text-emerald-300 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>{badge.perkText}</span>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {badge.unlocked ? (
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
            >
              Close
            </button>
          ) : (
            <>
              <button
                onClick={onClose}
                className="w-1/3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  if (onPracticeForBadge) onPracticeForBadge();
                }}
                className="w-2/3 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Practice to Unlock</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
