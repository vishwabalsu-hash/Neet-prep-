import React from 'react';
import { 
  Stethoscope, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Calendar, 
  BarChart3, 
  Wifi, 
  WifiOff, 
  BookmarkCheck, 
  Sparkles,
  Flame,
  Award
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOfflineMode: boolean;
  toggleOfflineMode: () => void;
  openOfflineModal: () => void;
  openMistakeBook: () => void;
  unresolvedMistakesCount: number;
  streakCount?: number;
  streakActiveToday?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isOfflineMode,
  toggleOfflineMode,
  openOfflineModal,
  openMistakeBook,
  unresolvedMistakesCount,
  streakCount = 5,
  streakActiveToday = true,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Sparkles },
    { id: 'mock-tests', label: 'Daily Mocks', icon: FileText, badge: 'NTA 720' },
    { id: 'question-bank', label: '30k+ PYQ Bank', icon: BookOpen, badge: '30k+' },
    { id: 'ncert-reader', label: 'NCERT 11 & 12', icon: Award },
    { id: 'study-planner', label: 'Study Planner', icon: Calendar, badge: 'Adaptive' },
    { id: 'doubt-forum', label: 'Doubt Forum', icon: HelpCircle, badge: 'Mentors' },
    { id: 'performance', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-200 bg-clip-text text-transparent">
                  NEET PREP
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                30k+ PYQ &bull; Daily NTA Mocks &bull; NCERT Line-by-Line
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1 py-0.2 rounded font-bold ${
                      isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Streak, Mistake Book, Offline Status, Countdown */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Daily Streak Flame Indicator */}
            <button
              onClick={() => setActiveTab('dashboard')}
              title={`Daily Study Streak: ${streakCount} Days (${streakActiveToday ? 'Completed today' : 'Goal pending today'})`}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                streakActiveToday
                  ? 'bg-gradient-to-r from-amber-500/15 to-orange-500/15 border-amber-500/40 text-amber-300 hover:brightness-110 shadow-sm shadow-amber-500/10'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-amber-500/40'
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${streakActiveToday ? 'text-amber-400 fill-amber-400 animate-pulse' : 'text-slate-400'}`} />
              <span className="font-mono text-amber-300">{streakCount}</span>
              <span className="hidden md:inline font-semibold text-slate-300">Streak</span>
            </button>

            {/* Mistake Notebook Quick Link */}
            <button
              onClick={openMistakeBook}
              title="Open Mistake Notebook"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-all"
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Mistake Book</span>
              {unresolvedMistakesCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center">
                  {unresolvedMistakesCount}
                </span>
              )}
            </button>

            {/* Offline Mode / Download Manager */}
            <button
              onClick={openOfflineModal}
              title={isOfflineMode ? 'Running in Offline Mode' : 'Offline Download Manager'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isOfflineMode
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              {isOfflineMode ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span className="hidden md:inline">Offline Mode</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden md:inline">Offline Sync</span>
                </>
              )}
            </button>

            {/* NEET Exam Countdown */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>NEET 2026:</span>
              <span className="font-mono font-bold text-amber-400">224 Days</span>
            </div>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center gap-1 py-2 overflow-x-auto no-scrollbar border-t border-slate-800/80 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md whitespace-nowrap font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
