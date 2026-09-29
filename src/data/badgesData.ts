import { VirtualBadge, StreakData, DayActivity } from '../types/neet';

export const INITIAL_VIRTUAL_BADGES: VirtualBadge[] = [
  {
    id: 'badge-streak-3',
    title: 'Momentum Igniter',
    description: 'Maintained a consecutive 3-day active learning streak for NEET UG.',
    iconName: 'Flame',
    category: 'streak',
    tier: 'Bronze',
    unlocked: true,
    unlockedAt: '2 days ago',
    progress: 3,
    maxProgress: 3,
    perkText: 'Daily focus boost & unlocks custom study timetable adjustments',
    requirementText: 'Active revision for 3 consecutive days',
  },
  {
    id: 'badge-streak-7',
    title: 'Discipline Titan',
    description: 'Completed 7 days of non-stop daily NEET prep without missing a single day.',
    iconName: 'Flame',
    category: 'streak',
    tier: 'Silver',
    unlocked: false,
    progress: 5,
    maxProgress: 7,
    perkText: '+1 Emergency Streak Freeze & High-Yield PYQ Prediction PDF',
    requirementText: '7-day active study streak',
  },
  {
    id: 'badge-streak-14',
    title: 'GMC Contender',
    description: 'Built a formidable 14-day study habit matching Government Medical College standards.',
    iconName: 'Stethoscope',
    category: 'streak',
    tier: 'Gold',
    unlocked: false,
    progress: 5,
    maxProgress: 14,
    perkText: 'Unlocks AIIMS Rank Diagnostic Model & Priority Mentor review',
    requirementText: '14-day active study streak',
  },
  {
    id: 'badge-streak-30',
    title: 'AIIMS Cadence Legend',
    description: '30 consecutive days of unyielding medical entrance preparation.',
    iconName: 'Crown',
    category: 'streak',
    tier: 'Diamond',
    unlocked: false,
    progress: 5,
    maxProgress: 30,
    perkText: 'Lifetime Hall of Fame Aspirant Badge & Golden Profile Ring',
    requirementText: '30-day active study streak',
  },
  {
    id: 'badge-century-solver',
    title: 'Century Solver',
    description: 'Successfully solved and reviewed over 100 NEET MCQs and PYQs.',
    iconName: 'Target',
    category: 'mastery',
    tier: 'Bronze',
    unlocked: true,
    unlockedAt: 'Yesterday',
    progress: 142,
    maxProgress: 100,
    perkText: 'Instant access to Subject Speed Sprint Drill generation',
    requirementText: 'Solve 100 questions in Question Bank or Mocks',
  },
  {
    id: 'badge-ncert-scholar',
    title: 'NCERT Line Scholar',
    description: 'Thoroughly revised 10+ high-yield NCERT chapters in Physics, Chemistry & Biology.',
    iconName: 'Dna',
    category: 'mastery',
    tier: 'Silver',
    unlocked: true,
    unlockedAt: '3 days ago',
    progress: 10,
    maxProgress: 10,
    perkText: 'Unlocks NCERT "Between The Lines" Hidden Traps cheat-sheet',
    requirementText: 'Revise 10 NCERT interactive chapters',
  },
  {
    id: 'badge-accuracy-shield',
    title: 'Negative Mark Shield',
    description: 'Completed a 45-question drill with over 85% accuracy and minimal negative marks.',
    iconName: 'Shield',
    category: 'accuracy',
    tier: 'Gold',
    unlocked: false,
    progress: 78,
    maxProgress: 85,
    perkText: 'Zero-Guessing algorithm tips & exam panic control guide',
    requirementText: 'Achieve 85%+ accuracy in any full section drill',
  },
  {
    id: 'badge-mock-gladiator',
    title: 'NTA Exam Room Gladiator',
    description: 'Completed a timed full-length NTA 720-mark simulation with all 4 subjects.',
    iconName: 'FileCheck',
    category: 'discipline',
    tier: 'Silver',
    unlocked: true,
    unlockedAt: '5 days ago',
    progress: 1,
    maxProgress: 1,
    perkText: 'All-India Percentile comparison breakdown against 14k+ aspirants',
    requirementText: 'Submit at least 1 full-length 720-mark mock test',
  },
  {
    id: 'badge-error-terminator',
    title: 'Mistake Terminator',
    description: 'Retested and resolved 5+ flagged conceptual mistakes from your personal Mistake Book.',
    iconName: 'Zap',
    category: 'discipline',
    tier: 'Bronze',
    unlocked: false,
    progress: 3,
    maxProgress: 5,
    perkText: 'Dynamic Spaced-Repetition flashcards for resolved traps',
    requirementText: 'Resolve 5 questions in the Mistake Notebook',
  },
  {
    id: 'badge-physics-ace',
    title: 'Mechanics & Electro Ace',
    description: 'Demonstrated mastery across complex Physics numericals and graphical problems.',
    iconName: 'Atom',
    category: 'mastery',
    tier: 'Gold',
    unlocked: false,
    progress: 32,
    maxProgress: 50,
    perkText: 'Derivation shortcuts & 10-second dimension analysis guide',
    requirementText: 'Score 140+ in Physics Section tests',
  },
  {
    id: 'badge-doctor-crest',
    title: 'Future Stethoscope',
    description: 'Crossed 650+ projected marks on the all-India NEET diagnostic tracker.',
    iconName: 'Stethoscope',
    category: 'accuracy',
    tier: 'Diamond',
    unlocked: false,
    progress: 590,
    maxProgress: 650,
    perkText: 'AIIMS & Top GMC counseling probability predictor preview',
    requirementText: 'Reach 650+ aggregate score on Mock Tests',
  }
];

// Helper to generate the current week's 7-day activity sequence ending today
export function generateInitialWeeklyHistory(): DayActivity[] {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const history: DayActivity[] = [];

  // Generate 7 days ending with today (days -6, -5, -4, -3, -2, -1, 0)
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateString = d.toISOString().split('T')[0];
    const dayName = daysOfWeek[d.getDay()];
    const isToday = i === 0;

    // Active for the last 5 days up to today
    // Let's say days -5, -4, -3, -2, -1 were active (5-day streak!), today is in progress/active
    let active = false;
    let minutesStudied = 0;
    let questionsSolved = 0;

    if (i === 0) {
      // Today: active session already started
      active = true;
      minutesStudied = 65;
      questionsSolved = 28;
    } else if (i <= 4) {
      active = true;
      minutesStudied = 90 + ((5 - i) * 15);
      questionsSolved = 35 + ((5 - i) * 10);
    } else {
      active = false;
      minutesStudied = 0;
      questionsSolved = 0;
    }

    history.push({
      dayName,
      dateString,
      active,
      isToday,
      minutesStudied,
      questionsSolved,
    });
  }

  return history;
}

export const INITIAL_STREAK_DATA: StreakData = {
  currentStreak: 5,
  bestStreak: 12,
  lastActiveDate: new Date().toISOString().split('T')[0],
  todayCompleted: true,
  streakFreezeCount: 2,
  totalActiveDays: 34,
  totalQuestionsPracticed: 412,
  weeklyHistory: generateInitialWeeklyHistory(),
};
