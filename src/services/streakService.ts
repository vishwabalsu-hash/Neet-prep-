import { StreakData, VirtualBadge, DayActivity, TestResult, MistakeRecord } from '../types/neet';

const STORAGE_KEYS = {
  STREAK: 'neet_prep_streak_v2',
  BADGES: 'neet_prep_badges_v2',
};

// Initial Badges Catalog with Medical/NEET Theme
export const INITIAL_BADGES: VirtualBadge[] = [
  {
    id: 'badge-pulse-starter',
    title: 'Pulse Starter',
    description: 'Began the active NEET learning journey by establishing your first streak day.',
    iconName: 'Flame',
    category: 'streak',
    tier: 'Bronze',
    unlocked: true,
    unlockedAt: 'Day 1',
    progress: 1,
    maxProgress: 1,
    requirementText: 'Maintain a 1-day study streak',
    perkText: '+20 Aspirant XP & Daily Motivation Boost'
  },
  {
    id: 'badge-clinical-consistency',
    title: 'Clinical Consistency',
    description: '3 consecutive days of disciplined revision across Physics, Chemistry, or Biology.',
    iconName: 'Stethoscope',
    category: 'streak',
    tier: 'Bronze',
    unlocked: true,
    unlockedAt: 'Day 3',
    progress: 3,
    maxProgress: 3,
    requirementText: 'Achieve a 3-day study streak',
    perkText: '+50 XP & Unlocks Streak Freeze Protection'
  },
  {
    id: 'badge-synapse-spark',
    title: 'Synapse Spark',
    description: 'A full 7 days unbroken streak! Synaptic pathways are cementing high-yield NCERT facts.',
    iconName: 'Zap',
    category: 'streak',
    tier: 'Silver',
    unlocked: true,
    unlockedAt: 'Day 7',
    progress: 7,
    maxProgress: 7,
    requirementText: 'Achieve a 7-day study streak',
    perkText: '+150 XP & Silver Stethoscope Flair'
  },
  {
    id: 'badge-fortitude-aiims',
    title: 'Fortitude of AIIMS',
    description: '14 consecutive days of relentless focus. You belong among the top 1 percentile of medical aspirants.',
    iconName: 'Shield',
    category: 'streak',
    tier: 'Gold',
    unlocked: true,
    unlockedAt: 'Day 14',
    progress: 14,
    maxProgress: 14,
    requirementText: 'Achieve a 14-day study streak',
    perkText: '+300 XP & AIIMS Delhi aspirant banner'
  },
  {
    id: 'badge-gmc-grandmaster',
    title: 'GMC Grandmaster',
    description: '21-day streak milestone! You have officially turned study discipline into an automated biological habit.',
    iconName: 'Award',
    category: 'streak',
    tier: 'Diamond',
    unlocked: false,
    progress: 18,
    maxProgress: 21,
    requirementText: 'Achieve a 21-day study streak (3 days left)',
    perkText: '+500 XP & VIP Mentor Priority in Doubt Forum'
  },
  {
    id: 'badge-genetics-guru',
    title: 'Genetics & NCERT Titan',
    description: 'Mastered Mendel, Morgan linkage maps, and DNA molecular biology questions with high precision.',
    iconName: 'Dna',
    category: 'mastery',
    tier: 'Gold',
    unlocked: true,
    unlockedAt: 'Last week',
    progress: 50,
    maxProgress: 50,
    requirementText: 'Attempt 50+ Biology NCERT line questions',
    perkText: '+200 XP & 100% Botany Confidence'
  },
  {
    id: 'badge-centurion-mocker',
    title: 'Grand Mock Centurion',
    description: 'Simulated 3+ authentic full-length or daily speed mock tests under strict exam-hall time limits.',
    iconName: 'FileCheck',
    category: 'discipline',
    tier: 'Silver',
    unlocked: true,
    unlockedAt: 'Yesterday',
    progress: 3,
    maxProgress: 3,
    requirementText: 'Complete at least 3 NTA mock tests',
    perkText: '+150 XP & Advanced All-India Percentile Benchmark'
  },
  {
    id: 'badge-negative-buster',
    title: 'Negative Mark Buster',
    description: 'Turned errors into guaranteed future marks by logging and mastering 10+ questions in your Mistake Book.',
    iconName: 'Target',
    category: 'accuracy',
    tier: 'Gold',
    unlocked: true,
    unlockedAt: '2 days ago',
    progress: 10,
    maxProgress: 10,
    requirementText: 'Catalog & resolve 10 mistakes in Mistake Book',
    perkText: '+250 XP & Guaranteed +20 score surge in mocks'
  },
  {
    id: 'badge-quantum-clinician',
    title: 'Quantum Clinician',
    description: 'Demonstrated exceptional mechanics & electrodynamics accuracy (>80% accuracy in Physics tests).',
    iconName: 'Atom',
    category: 'mastery',
    tier: 'Silver',
    unlocked: false,
    progress: 68,
    maxProgress: 80,
    requirementText: 'Reach 80% accuracy in Physics section',
    perkText: '+200 XP & Formula Master badge display'
  },
  {
    id: 'badge-neet-rank1-vision',
    title: 'AIR 1 Visionary',
    description: 'Unbroken 30-day streak! Peak physical endurance, NCERT mastery, and zero negative-marking mindset.',
    iconName: 'Crown',
    category: 'streak',
    tier: 'Diamond',
    unlocked: false,
    progress: 18,
    maxProgress: 30,
    requirementText: 'Achieve a 30-day study streak (12 days left)',
    perkText: '+1000 XP & Hall of Fame Diamond Trophy'
  }
];

// Helper to format Date as YYYY-MM-DD
function getTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Generate last 7 days activity window
function generateWeeklyHistory(lastActiveDate: string, isTodayActive: boolean): DayActivity[] {
  const days: DayActivity[] = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const isCurrentDay = i === 0;
    
    // For past days, mock realistic activity or check if date was active
    const active = isCurrentDay ? isTodayActive : i <= 5; // e.g. Mon-Sat active
    const dayName = dayNames[d.getDay()];

    days.push({
      dayName,
      dateString: dateStr,
      active,
      isToday: isCurrentDay,
      minutesStudied: active ? (isCurrentDay ? 95 : 120 + ((i * 15) % 45)) : 0,
      questionsSolved: active ? (isCurrentDay ? 25 : 30 + (i * 8)) : 0,
    });
  }

  return days;
}

export const StreakService = {
  getStreakData(): StreakData {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STREAK);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading streak data:', e);
    }

    const todayStr = getTodayString();
    const defaultData: StreakData = {
      currentStreak: 18,
      bestStreak: 24,
      lastActiveDate: todayStr,
      todayCompleted: true,
      streakFreezeCount: 2,
      totalActiveDays: 46,
      totalQuestionsPracticed: 1840,
      weeklyHistory: generateWeeklyHistory(todayStr, true),
    };

    this.saveStreakData(defaultData);
    return defaultData;
  },

  saveStreakData(data: StreakData): void {
    try {
      localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving streak data:', e);
    }
  },

  getBadges(): VirtualBadge[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BADGES);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error reading badges:', e);
    }

    this.saveBadges(INITIAL_BADGES);
    return INITIAL_BADGES;
  },

  saveBadges(badges: VirtualBadge[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
    } catch (e) {
      console.error('Error saving badges:', e);
    }
  },

  // Record an active learning session (solving questions, mocks, NCERT study, or manual check-in)
  recordActiveLearning(
    actionType: 'MOCK_TEST' | 'QUESTION_PRACTICE' | 'NCERT_READ' | 'MANUAL_CHECKIN',
    count: number = 1
  ): { streakData: StreakData; newlyUnlockedBadge: VirtualBadge | null } {
    const data = this.getStreakData();
    const badges = this.getBadges();
    const todayStr = getTodayString();
    let newlyUnlocked: VirtualBadge | null = null;

    if (!data.todayCompleted) {
      data.currentStreak += 1;
      if (data.currentStreak > data.bestStreak) {
        data.bestStreak = data.currentStreak;
      }
      data.todayCompleted = true;
      data.totalActiveDays += 1;
    }

    data.lastActiveDate = todayStr;
    if (actionType === 'QUESTION_PRACTICE' || actionType === 'MOCK_TEST') {
      data.totalQuestionsPracticed += count;
    }

    // Refresh weekly history
    data.weeklyHistory = generateWeeklyHistory(todayStr, true);

    // Evaluate badges updates
    const updatedBadges = badges.map((badge) => {
      let currentVal = badge.progress;
      let shouldUnlock = badge.unlocked;

      if (badge.id === 'badge-gmc-grandmaster') {
        currentVal = Math.min(badge.maxProgress, data.currentStreak);
        if (currentVal >= badge.maxProgress && !badge.unlocked) {
          shouldUnlock = true;
        }
      } else if (badge.id === 'badge-neet-rank1-vision') {
        currentVal = Math.min(badge.maxProgress, data.currentStreak);
        if (currentVal >= badge.maxProgress && !badge.unlocked) {
          shouldUnlock = true;
        }
      } else if (badge.id === 'badge-centurion-mocker' && actionType === 'MOCK_TEST') {
        currentVal = Math.min(badge.maxProgress, badge.progress + 1);
        if (currentVal >= badge.maxProgress && !badge.unlocked) {
          shouldUnlock = true;
        }
      }

      if (shouldUnlock && !badge.unlocked) {
        const unlockedBadge: VirtualBadge = {
          ...badge,
          unlocked: true,
          unlockedAt: 'Just now!',
          progress: currentVal,
        };
        newlyUnlocked = unlockedBadge;
        return unlockedBadge;
      }

      return {
        ...badge,
        progress: currentVal,
        unlocked: shouldUnlock,
      };
    });

    this.saveStreakData(data);
    this.saveBadges(updatedBadges);

    return { streakData: data, newlyUnlockedBadge: newlyUnlocked };
  },

  // Use a streak freeze protection
  useStreakFreeze(): { success: boolean; streakData: StreakData } {
    const data = this.getStreakData();
    if (data.streakFreezeCount > 0) {
      data.streakFreezeCount -= 1;
      this.saveStreakData(data);
      return { success: true, streakData: data };
    }
    return { success: false, streakData: data };
  },

  // Add a streak freeze protection reward
  addStreakFreeze(count: number = 1): StreakData {
    const data = this.getStreakData();
    data.streakFreezeCount += count;
    this.saveStreakData(data);
    return data;
  }
};
