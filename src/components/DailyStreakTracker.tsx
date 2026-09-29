import React, { useState } from 'react';
import { 
  Flame, 
  Award, 
  Shield, 
  CheckCircle2, 
  Zap, 
  Calendar, 
  ChevronRight, 
  Sparkles, 
  Clock, 
  Target, 
  ArrowUpRight,
  RefreshCw,
  Info,
  Lock,
  Stethoscope,
  Dna,
  FileCheck,
  Atom,
  Crown
} from 'lucide-react';
import { StreakData, VirtualBadge, DayActivity } from '../types/neet';

interface DailyStreakTrackerProps {
  streakData: StreakData;
  badges: VirtualBadge[];
  onLogActiveLearning: () => void;
  onUseStreakFreeze: () => void;
  onAdvanceSimulatedStreak: () => void;
  onSelectBadge: (badge: VirtualBadge) => void;
  onOpenQuickDrill: () => void;
}

export const DailyStreakTracker: React.FC<DailyStreakTrackerProps> = ({
  streakData,
  badges,
  onLogActiveLearning,
  onUseStreakFreeze,
  onAdvanceSimulatedStreak,
  onSelectBadge,
  onOpenQuickDrill,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'streak' | 'mastery' | 'accuracy' | 'discipline'>('all');
  const [showAllBadges, setShowAllBadges] = useState(false);

  const unlockedCount = badges.filter(b => b.unlocked).length;
  const totalBadges = badges.length;

  // Find next closest locked milestone badge to motivate the student
  const nextMilestoneBadge = badges.find(b => !b.unlocked && b.category === 'streak') || badges.find(b => !b.unlocked);

  const filteredBadges = badges.filter(b => {
    if (selectedCategory === 'all') return true;
    return b.category === selectedCategory;
  });

  const renderBadgeIcon = (iconName: string, className = "w-4 h-4") => {
    switch (iconName) {
      case 'Flame': return <Flame className={className} />;
      case 'Stethoscope': return <Stethoscope className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'Shield': return <Shield className={className} />;
      case 'Dna': return <Dna className={className} />;
      case 'FileCheck': return <FileCheck className={className} />;
      case 'Target': return <Target className={className} />;
      case 'Atom': return <Atom className={className} />;
      case 'Crown': return <Crown className={className} />;
      default: return <Award className={className} />;
    }
  };

  const tierStyles = {
    Bronze: {
      border: 'border-amber-700/40',
      badgeBg: 'bg-amber-950/40 text-amber-300',
      glow: 'shadow-amber-900/20',
      text: 'text-amber-400',
      gradient: 'from-amber-600 to-amber-800'
    },
    Silver: {
      border: 'border-slate-500/40',
      badgeBg: 'bg-slate-800/80 text-slate-200',
      glow: 'shadow-slate-500/20',
      text: 'text-slate-200',
      gradient: 'from-slate-300 to-slate-500'
    },
    Gold: {
      border: 'border-amber-500/50',
      badgeBg: 'bg-amber-500/20 text-amber-300',
      glow: 'shadow-amber-500/25',
      text: 'text-amber-400',
      gradient: 'from-amber-400 to-yellow-500'
    },
    Diamond: {
      border: 'border-cyan-500/50',
      badgeBg: 'bg-cyan-500/20 text-cyan-300',
      glow: 'shadow-cyan-500/25',
      text: 'text-cyan-300',
      gradient: 'from-cyan-400 via-teal-300 to-blue-500'
    },
  };

  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-5 sm:p-6 shadow-xl space-y-6">
      {/* Top Header: Streak Flame & Core Indicators */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="flex items-center gap-3.5">
          {/* Flame Icon Container with Pulse */}
          <div className="relative flex-shrink-0">
            <div className={`w-13 h-13 sm:w-15 sm:h-15 rounded-2xl flex items-center justify-center p-3 shadow-lg transition-transform ${
              streakData.todayCompleted
                ? 'bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 shadow-orange-500/30'
                : 'bg-slate-800 border border-slate-700 text-slate-400'
            }`}>
              <Flame className={`w-8 h-8 ${streakData.todayCompleted ? 'text-white fill-white animate-pulse' : 'text-slate-400'}`} />
            </div>
            {streakData.todayCompleted && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border-2 border-slate-900"></span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>{streakData.currentStreak} Day Study Streak</span>
              </h2>
              {streakData.todayCompleted ? (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Active Today
                </span>
              ) : (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                  Goal Incomplete
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>Personal Best: <strong className="text-slate-200">{streakData.bestStreak} days</strong></span>
              <span className="text-slate-600">&bull;</span>
              <span>Total Active Days: <strong className="text-slate-200">{streakData.totalActiveDays}</strong></span>
              <span className="text-slate-600">&bull;</span>
              <span>Practice Count: <strong className="text-emerald-400">{streakData.totalQuestionsPracticed} Qs</strong></span>
            </p>
          </div>
        </div>

        {/* Quick Streak Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {!streakData.todayCompleted ? (
            <button
              onClick={onLogActiveLearning}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02]"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Complete Today's Goal</span>
            </button>
          ) : (
            <button
              onClick={onOpenQuickDrill}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-semibold text-xs transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Today's Streak Secured! +5Q Boost</span>
            </button>
          )}

          {/* Streak Freeze Badge Counter */}
          <div 
            title={`${streakData.streakFreezeCount} streak freezes available. Protects streak if you miss a day.`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-cyan-300 font-semibold"
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>{streakData.streakFreezeCount} Freezes</span>
          </div>

          {/* Quick Demo Simulator for Testing Milestones */}
          <button
            onClick={onAdvanceSimulatedStreak}
            title="Simulate active study day to test next badge milestone"
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">+1 Day</span>
          </button>
        </div>
      </div>

      {/* 7-Day Weekly Learning Activity Calendar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-200">
              Active Revision Velocity &bull; Past 7 Days
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">
            AIR 1 Rule: <strong>Consistency &gt; Intensity</strong>
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {streakData.weeklyHistory.map((day, idx) => (
            <div
              key={idx}
              className={`relative rounded-xl p-2 sm:p-3 text-center transition-all border flex flex-col items-center justify-between ${
                day.isToday
                  ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-amber-500/60 ring-2 ring-amber-500/20'
                  : day.active
                  ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-500/70'
                  : 'bg-slate-950/60 border-slate-800/80 text-slate-500'
              }`}
            >
              {day.isToday && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] uppercase tracking-wider">
                  TODAY
                </span>
              )}

              <span className="text-[11px] sm:text-xs font-bold text-slate-300">
                {day.dayName}
              </span>

              <div className="my-1.5 sm:my-2">
                {day.active ? (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-emerald-400 flex items-center justify-center shadow-sm shadow-amber-500/30 mx-auto">
                    <Flame className="w-4 h-4 text-slate-950 fill-slate-950" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700/80 flex items-center justify-center mx-auto text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <div className="space-y-0.5">
                <span className={`text-[10px] font-bold block ${day.active ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {day.active ? `${day.questionsSolved} Qs` : 'Rest'}
                </span>
                <span className="text-[9px] text-slate-400 block hidden sm:block">
                  {day.active ? `${day.minutesStudied}m` : '0m'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Milestone Motivation Card */}
      {nextMilestoneBadge && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800/60 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              {renderBadgeIcon(nextMilestoneBadge.iconName, "w-5 h-5 text-amber-400")}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Upcoming Milestone Badge
                </span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-xs font-semibold text-slate-300">
                  {nextMilestoneBadge.tier} Tier
                </span>
              </div>
              <p className="text-sm font-bold text-white">
                {nextMilestoneBadge.title} &mdash; <span className="font-normal text-slate-300 text-xs">{nextMilestoneBadge.description}</span>
              </p>
            </div>
          </div>

          <div className="sm:w-56 space-y-1.5 flex-shrink-0">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Progress:</span>
              <span className="text-amber-400 font-bold">
                {nextMilestoneBadge.progress} / {nextMilestoneBadge.maxProgress}
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
              <div 
                className="bg-gradient-to-r from-amber-500 to-yellow-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((nextMilestoneBadge.progress / nextMilestoneBadge.maxProgress) * 100))}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 block text-right">
              {Math.max(0, nextMilestoneBadge.maxProgress - nextMilestoneBadge.progress)} more to unlock!
            </span>
          </div>
        </div>
      )}

      {/* Virtual Badges Showcase Section */}
      <div className="space-y-4 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-100 text-base">
                  Aspirant Virtual Medals & Badges
                </h3>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {unlockedCount} / {totalBadges} Unlocked
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Reward milestones celebrating consistency, accuracy, NCERT revisions, and NTA mock discipline
              </p>
            </div>
          </div>

          {/* Badge Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'all', label: 'All Badges' },
              { id: 'streak', label: 'Streaks' },
              { id: 'mastery', label: 'Mastery' },
              { id: 'accuracy', label: 'Accuracy' },
              { id: 'discipline', label: 'Discipline' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-slate-700 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {(showAllBadges ? filteredBadges : filteredBadges.slice(0, 4)).map((badge) => {
            const style = tierStyles[badge.tier];
            const isUnlocked = badge.unlocked;

            return (
              <div
                key={badge.id}
                onClick={() => onSelectBadge(badge)}
                className={`group relative rounded-xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                  isUnlocked
                    ? `bg-slate-900/90 ${style.border} hover:border-slate-500 shadow-md ${style.glow}`
                    : 'bg-slate-950/60 border-slate-800/80 opacity-75 hover:opacity-100 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className={`w-10 h-10 rounded-xl p-2 flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isUnlocked
                        ? `bg-gradient-to-tr ${style.gradient} text-slate-950 shadow-md`
                        : 'bg-slate-800 border border-slate-700 text-slate-500'
                    }`}>
                      {renderBadgeIcon(badge.iconName, "w-5 h-5")}
                    </div>

                    <div className="text-right">
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${style.badgeBg} border border-current/20`}>
                        {badge.tier}
                      </span>
                      {isUnlocked && (
                        <span className="block text-[10px] text-emerald-400 font-semibold mt-1 flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Unlocked
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="font-bold text-slate-100 text-sm mb-1 group-hover:text-emerald-300 transition-colors">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {badge.description}
                  </p>
                </div>

                {/* Bottom Section: Progress or Perk */}
                <div className="pt-2 border-t border-slate-800/80 text-xs">
                  {isUnlocked ? (
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span className="text-emerald-400 font-medium">Perk Active</span>
                      <span className="text-slate-500 flex items-center gap-1 group-hover:text-slate-300 transition-colors">
                        View Details <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Lock className="w-3 h-3 text-slate-500" />
                          <span>Progress:</span>
                        </span>
                        <span className="font-mono font-bold text-slate-300">
                          {badge.progress} / {badge.maxProgress}
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-1.5 rounded-full"
                          style={{ width: `${Math.min(100, Math.round((badge.progress / badge.maxProgress) * 100))}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* View All / Collapse Badges Toggle */}
        {filteredBadges.length > 4 && (
          <div className="text-center pt-2">
            <button
              onClick={() => setShowAllBadges(!showAllBadges)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <span>{showAllBadges ? 'Show Fewer Badges' : `View All ${filteredBadges.length} Virtual Badges`}</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showAllBadges ? '-rotate-90' : 'rotate-90'}`} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
