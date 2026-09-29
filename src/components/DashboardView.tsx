import React from 'react';
import { 
  Flame, 
  Target, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Award, 
  TrendingUp, 
  Clock, 
  Zap, 
  Stethoscope, 
  BookmarkCheck,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { TestResult, WeaknessInsight, StreakData, VirtualBadge } from '../types/neet';
import { QUESTION_CATALOG_STATS } from '../data/questionBankData';
import { DailyStreakTracker } from './DailyStreakTracker';

interface DashboardViewProps {
  onStartMock: (testId: string) => void;
  onNavigateTab: (tabId: string) => void;
  openMistakeBook: () => void;
  unresolvedMistakesCount: number;
  recentResults: TestResult[];
  weaknesses: WeaknessInsight[];
  streakData: StreakData;
  badges: VirtualBadge[];
  onLogActiveLearning: () => void;
  onUseStreakFreeze: () => void;
  onAdvanceSimulatedStreak: () => void;
  onSelectBadge: (badge: VirtualBadge) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onStartMock,
  onNavigateTab,
  openMistakeBook,
  unresolvedMistakesCount,
  recentResults,
  weaknesses,
  streakData,
  badges,
  onLogActiveLearning,
  onUseStreakFreeze,
  onAdvanceSimulatedStreak,
  onSelectBadge,
}) => {
  const latestResult = recentResults[0];
  const projectedScore = latestResult ? latestResult.scoredMarks : 590;
  const targetScore = 680;
  const progressPercent = Math.min(100, Math.round((projectedScore / 720) * 100));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Hero Banner: Target & Countdown */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 p-6 sm:p-8 shadow-xl">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NTA NEET UG 2026/2027 MISSION GMC &bull; 720 MARKS</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Master NCERT & Overcome Every Weakness
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Access over <strong className="text-emerald-400 font-bold">32,450+ indexed PYQ & high-yield guess questions</strong>, 
              daily full-length 720-mark NTA simulation mocks, and line-by-line Class 11 & 12 NCERT breakdown.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onStartMock('mock-daily-sprint-today')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 hover:brightness-110 transition-all hover:scale-[1.02]"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Start Today's Live Mock</span>
              </button>

              <button
                onClick={() => onNavigateTab('question-bank')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Explore 30k+ Questions</span>
              </button>

              <button
                onClick={openMistakeBook}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-semibold text-sm border border-rose-500/30 transition-all"
              >
                <BookmarkCheck className="w-4 h-4 text-rose-400" />
                <span>Mistake Book ({unresolvedMistakesCount})</span>
              </button>
            </div>
          </div>

          {/* Projected Score & Target AIIMS Card */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 w-full lg:w-80 shadow-inner flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Current Diagnostic Score
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                AIR ~{latestResult ? latestResult.estimatedAirRank.toLocaleString() : '3,840'}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-extrabold text-white tracking-tight">
                {projectedScore}
              </span>
              <span className="text-sm font-semibold text-slate-400">/ 720 Marks</span>
            </div>

            {/* Progress Bar towards Target 680+ */}
            <div className="space-y-1 mb-3">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Govt Medical College Cutoff (620+)</span>
                <span className="text-emerald-400 font-bold">Target: {targetScore}+</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-2.5">
              <span>Goal: AIIMS / Top State GMC</span>
              <span className="text-amber-400 font-semibold">Need +{Math.max(0, targetScore - projectedScore)} pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Study Streak Tracker & Badges Showcase */}
      <DailyStreakTracker
        streakData={streakData}
        badges={badges}
        onLogActiveLearning={onLogActiveLearning}
        onUseStreakFreeze={onUseStreakFreeze}
        onAdvanceSimulatedStreak={onAdvanceSimulatedStreak}
        onSelectBadge={onSelectBadge}
        onOpenQuickDrill={() => onStartMock('mock-daily-sprint-today')}
      />

      {/* 4 Core Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Question Repository</p>
            <p className="text-lg sm:text-xl font-bold text-slate-100">
              {QUESTION_CATALOG_STATS.totalQuestions.toLocaleString()}+
            </p>
            <p className="text-[10px] text-emerald-400 font-semibold">2014-2024 PYQs + Guess</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Daily Live Mocks</p>
            <p className="text-lg sm:text-xl font-bold text-slate-100">200 Qs NTA</p>
            <p className="text-[10px] text-cyan-400 font-semibold">Section A & B format</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <BookmarkCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Mistake Notebook</p>
            <p className="text-lg sm:text-xl font-bold text-slate-100">
              {unresolvedMistakesCount} Pending
            </p>
            <p className="text-[10px] text-rose-400 font-semibold">One-click Retry Drill</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">NCERT Books</p>
            <p className="text-lg sm:text-xl font-bold text-slate-100">Class 11 & 12</p>
            <p className="text-[10px] text-amber-400 font-semibold">Physics, Chem, Bio</p>
          </div>
        </div>
      </div>

      {/* Main Two-Column Row: Weakness-Based Recommendations vs Daily Mock Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Individual Weakness Radar & Adaptive Recommendation */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-base">
                  Individual Weakness Diagnostics & Study Advice
                </h3>
                <p className="text-xs text-slate-400">
                  Calculated from your previous test accuracy and recurring negative mark patterns
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('study-planner')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <span>View Full Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {weaknesses.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {item.subject}
                    </span>
                    <span className="font-semibold text-xs sm:text-sm text-slate-200">
                      {item.chapter}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.status === 'Critical Alert'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : item.status === 'Needs Attention'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {item.status} ({item.accuracy}% Accuracy)
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    &bull; {item.recommendedAction}
                  </p>
                </div>

                <button
                  onClick={() => onNavigateTab('ncert-reader')}
                  className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold whitespace-nowrap transition-colors"
                >
                  Revise NCERT Lines
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Daily Mock Test Spotlight */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30 relative flex flex-col justify-between shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                TODAY'S DAILY MOCK
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                45 Mins
              </span>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-1">
                Daily High-Yield NCERT Speed Sprint
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                45 questions carefully balanced across Physics, Chemistry, Botany, and Zoology. Tests speed, negative mark control, and assertion-reason mastery.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs space-y-1.5">
              <div className="flex justify-between text-slate-300">
                <span>Total Marks:</span>
                <strong className="text-white">180 Marks (+4, -1)</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Questions:</span>
                <strong className="text-white">45 NTA Pattern Qs</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Live Participants:</span>
                <strong className="text-emerald-400">14,820 Aspirants</strong>
              </div>
            </div>
          </div>

          <button
            onClick={() => onStartMock('mock-daily-sprint-today')}
            className="w-full mt-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Enter Daily Mock Exam</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Jump Subjects Grid */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-100 text-base">
          Core NEET Subjects & Question Bank Explorer
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: 'Physics',
              classInfo: 'Class 11 & 12',
              count: QUESTION_CATALOG_STATS.subjects.Physics,
              description: 'Mechanics, Electrodynamics, Optics, Modern Physics',
              color: 'border-blue-500/30 hover:border-blue-500/60 bg-blue-950/10'
            },
            {
              name: 'Chemistry',
              classInfo: 'Physical, Inorganic, Organic',
              count: QUESTION_CATALOG_STATS.subjects.Chemistry,
              description: 'Bonding, Coordination, Thermodynamics, Named Reactions',
              color: 'border-amber-500/30 hover:border-amber-500/60 bg-amber-950/10'
            },
            {
              name: 'Botany',
              classInfo: 'Biology Paper 1',
              count: QUESTION_CATALOG_STATS.subjects.Botany,
              description: 'Plant Kingdom, Morphology, Genetics, Plant Physiology',
              color: 'border-emerald-500/30 hover:border-emerald-500/60 bg-emerald-950/10'
            },
            {
              name: 'Zoology',
              classInfo: 'Biology Paper 2',
              count: QUESTION_CATALOG_STATS.subjects.Zoology,
              description: 'Human Physiology, Reproduction, Animal Kingdom, Evolution',
              color: 'border-purple-500/30 hover:border-purple-500/60 bg-purple-950/10'
            },
          ].map((sub) => (
            <div
              key={sub.name}
              onClick={() => onNavigateTab('question-bank')}
              className={`p-4 rounded-xl border transition-all cursor-pointer group bg-slate-900 ${sub.color}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-100 text-base group-hover:text-emerald-400 transition-colors">
                  {sub.name}
                </h4>
                <span className="text-xs font-mono font-bold text-slate-400">
                  {sub.count.toLocaleString()} Qs
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3">{sub.description}</p>
              <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold pt-1 border-t border-slate-800">
                <span>Start Practice Drill</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
