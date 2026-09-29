import { MistakeRecord, TestResult, StudyTask, DoubtPost, StreakData, VirtualBadge } from '../types/neet';
import { INITIAL_STREAK_DATA, INITIAL_VIRTUAL_BADGES } from '../data/badgesData';

const STORAGE_KEYS = {
  MISTAKES: 'neet_prep_mistakes_v1',
  RESULTS: 'neet_prep_test_results_v1',
  TASKS: 'neet_prep_tasks_v1',
  DOUBTS: 'neet_prep_doubts_v1',
  OFFLINE_DOWNLOADS: 'neet_prep_offline_downloads_v1',
  OFFLINE_MODE_PREF: 'neet_prep_offline_mode_pref_v1',
  BOOKMARKS: 'neet_prep_bookmarks_v1',
  STREAK: 'neet_prep_streak_v1',
  BADGES: 'neet_prep_badges_v1',
};

export interface OfflinePackage {
  id: string;
  name: string;
  sizeMb: number;
  category: string;
  downloaded: boolean;
  downloadedAt?: string;
  itemCount: number;
}

export const DEFAULT_OFFLINE_PACKAGES: OfflinePackage[] = [
  {
    id: 'pkg-all-india-mocks',
    name: 'All-India Full 720 Marks Mock Tests (Tests 1-5)',
    sizeMb: 14.5,
    category: 'Mock Tests',
    downloaded: true,
    downloadedAt: 'Today',
    itemCount: 1000
  },
  {
    id: 'pkg-ncert-bio-11-12',
    name: 'NCERT Biology Class 11 & 12 Line-by-Line Notes & Traps',
    sizeMb: 22.8,
    category: 'NCERT Interactive',
    downloaded: true,
    downloadedAt: 'Today',
    itemCount: 38
  },
  {
    id: 'pkg-pyq-2014-2024',
    name: '10 Years NEET / AIPMT Solved PYQ Bank with NCERT References',
    sizeMb: 35.2,
    category: 'PYQ Engine',
    downloaded: false,
    itemCount: 5400
  },
  {
    id: 'pkg-formula-physics-chem',
    name: 'Physics & Physical Chemistry Formula & Mnemonics Handbook',
    sizeMb: 8.4,
    category: 'Formulas',
    downloaded: true,
    downloadedAt: 'Yesterday',
    itemCount: 420
  }
];

export const OfflineStorage = {
  // Test Results
  getTestResults(): TestResult[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RESULTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveTestResult(result: TestResult): void {
    try {
      const existing = this.getTestResults();
      const updated = [result, ...existing];
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save test result offline:', e);
    }
  },

  // Mistakes
  getMistakes(): MistakeRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MISTAKES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveMistake(mistake: MistakeRecord): void {
    try {
      const existing = this.getMistakes();
      if (!existing.find(m => m.questionId === mistake.questionId)) {
        const updated = [mistake, ...existing];
        localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(updated));
      }
    } catch (e) {
      console.error('Failed to save mistake:', e);
    }
  },

  resolveMistake(mistakeId: string): void {
    try {
      const existing = this.getMistakes();
      const updated = existing.map(m => m.id === mistakeId ? { ...m, resolved: !m.resolved } : m);
      localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to resolve mistake:', e);
    }
  },

  deleteMistake(mistakeId: string): void {
    try {
      const existing = this.getMistakes();
      const updated = existing.filter(m => m.id !== mistakeId);
      localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to delete mistake:', e);
    }
  },

  // Study Tasks
  getTasks(): StudyTask[] | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TASKS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveTasks(tasks: StudyTask[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks:', e);
    }
  },

  // Doubt Posts
  getDoubts(): DoubtPost[] | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DOUBTS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveDoubts(doubts: DoubtPost[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.DOUBTS, JSON.stringify(doubts));
    } catch (e) {
      console.error('Failed to save doubts:', e);
    }
  },

  // Offline Packages
  getOfflinePackages(): OfflinePackage[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.OFFLINE_DOWNLOADS);
      return data ? JSON.parse(data) : DEFAULT_OFFLINE_PACKAGES;
    } catch {
      return DEFAULT_OFFLINE_PACKAGES;
    }
  },

  togglePackageDownload(packageId: string): OfflinePackage[] {
    try {
      const current = this.getOfflinePackages();
      const updated = current.map(p => {
        if (p.id === packageId) {
          const newStatus = !p.downloaded;
          return {
            ...p,
            downloaded: newStatus,
            downloadedAt: newStatus ? new Date().toLocaleDateString() : undefined
          };
        }
        return p;
      });
      localStorage.setItem(STORAGE_KEYS.OFFLINE_DOWNLOADS, JSON.stringify(updated));
      return updated;
    } catch {
      return DEFAULT_OFFLINE_PACKAGES;
    }
  },

  // Offline mode preference
  getOfflineModePreference(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEYS.OFFLINE_MODE_PREF) === 'true';
    } catch {
      return false;
    }
  },

  setOfflineModePreference(val: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEYS.OFFLINE_MODE_PREF, String(val));
    } catch (e) {
      console.error('Failed to save offline preference:', e);
    }
  },

  // Daily Streak Data
  getStreakData(): StreakData {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STREAK);
      if (data) {
        return JSON.parse(data);
      }
      return INITIAL_STREAK_DATA;
    } catch {
      return INITIAL_STREAK_DATA;
    }
  },

  saveStreakData(data: StreakData): void {
    try {
      localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save streak data:', e);
    }
  },

  // Virtual Badges
  getBadges(): VirtualBadge[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BADGES);
      if (data) {
        return JSON.parse(data);
      }
      return INITIAL_VIRTUAL_BADGES;
    } catch {
      return INITIAL_VIRTUAL_BADGES;
    }
  },

  saveBadges(badges: VirtualBadge[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
    } catch (e) {
      console.error('Failed to save badges:', e);
    }
  },

  // Check and unlock badges based on streak and learning progress
  checkBadgeUnlocks(
    streakCount: number,
    totalQuestions: number,
    badges?: VirtualBadge[]
  ): { updatedBadges: VirtualBadge[]; newlyUnlockedBadge: VirtualBadge | null } {
    const currentBadges = badges || this.getBadges();
    let newlyUnlockedBadge: VirtualBadge | null = null;

    const updatedBadges = currentBadges.map(badge => {
      if (badge.unlocked) return badge;

      let newProgress = badge.progress;
      let shouldUnlock = false;

      if (badge.id === 'badge-streak-7') {
        newProgress = streakCount;
        if (streakCount >= 7) shouldUnlock = true;
      } else if (badge.id === 'badge-streak-14') {
        newProgress = streakCount;
        if (streakCount >= 14) shouldUnlock = true;
      } else if (badge.id === 'badge-streak-30') {
        newProgress = streakCount;
        if (streakCount >= 30) shouldUnlock = true;
      } else if (badge.id === 'badge-century-solver') {
        newProgress = totalQuestions;
        if (totalQuestions >= 100) shouldUnlock = true;
      }

      if (shouldUnlock) {
        const unlockedBadge: VirtualBadge = {
          ...badge,
          unlocked: true,
          unlockedAt: 'Just now',
          progress: badge.maxProgress,
        };
        if (!newlyUnlockedBadge) {
          newlyUnlockedBadge = unlockedBadge;
        }
        return unlockedBadge;
      }

      return {
        ...badge,
        progress: newProgress,
      };
    });

    this.saveBadges(updatedBadges);
    return { updatedBadges, newlyUnlockedBadge };
  },

  // Record an active learning session (question solved, mock completed, or manual check-in)
  recordActiveLearning(
    questionsDelta = 10,
    minutesDelta = 25
  ): { updatedStreak: StreakData; newlyUnlockedBadge: VirtualBadge | null } {
    const streak = this.getStreakData();
    const today = new Date().toISOString().split('T')[0];
    const isNewActiveDay = !streak.todayCompleted;

    const newCurrentStreak = isNewActiveDay ? streak.currentStreak + 1 : streak.currentStreak;
    const newBestStreak = Math.max(streak.bestStreak, newCurrentStreak);
    const newTotalActiveDays = isNewActiveDay ? streak.totalActiveDays + 1 : streak.totalActiveDays;
    const newTotalQuestions = streak.totalQuestionsPracticed + questionsDelta;

    // Update weekly history
    const updatedHistory = streak.weeklyHistory.map(day => {
      if (day.isToday || day.dateString === today) {
        return {
          ...day,
          active: true,
          minutesStudied: day.minutesStudied + minutesDelta,
          questionsSolved: day.questionsSolved + questionsDelta,
        };
      }
      return day;
    });

    const updatedStreak: StreakData = {
      ...streak,
      currentStreak: newCurrentStreak,
      bestStreak: newBestStreak,
      lastActiveDate: today,
      todayCompleted: true,
      totalActiveDays: newTotalActiveDays,
      totalQuestionsPracticed: newTotalQuestions,
      weeklyHistory: updatedHistory,
    };

    this.saveStreakData(updatedStreak);

    // Check badge unlocks
    const { newlyUnlockedBadge } = this.checkBadgeUnlocks(newCurrentStreak, newTotalQuestions);
    return { updatedStreak, newlyUnlockedBadge };
  },

  // Use a streak freeze protection
  useStreakFreeze(): StreakData | null {
    const streak = this.getStreakData();
    if (streak.streakFreezeCount <= 0) return null;

    const updatedStreak: StreakData = {
      ...streak,
      streakFreezeCount: streak.streakFreezeCount - 1,
      todayCompleted: true,
    };

    this.saveStreakData(updatedStreak);
    return updatedStreak;
  },

  // Simulate advancing streak (useful for demo/testing or student goal catchup)
  advanceStreakSimulated(
    daysToAdd = 1
  ): { updatedStreak: StreakData; newlyUnlockedBadge: VirtualBadge | null } {
    const streak = this.getStreakData();
    const newStreak = streak.currentStreak + daysToAdd;
    const newBest = Math.max(streak.bestStreak, newStreak);
    const newQuestions = streak.totalQuestionsPracticed + 15;

    const updatedStreak: StreakData = {
      ...streak,
      currentStreak: newStreak,
      bestStreak: newBest,
      todayCompleted: true,
      totalActiveDays: streak.totalActiveDays + daysToAdd,
      totalQuestionsPracticed: newQuestions,
    };

    this.saveStreakData(updatedStreak);
    const { newlyUnlockedBadge } = this.checkBadgeUnlocks(newStreak, newQuestions);
    return { updatedStreak, newlyUnlockedBadge };
  }
};
