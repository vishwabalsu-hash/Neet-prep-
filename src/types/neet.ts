export type SubjectType = 'Physics' | 'Chemistry' | 'Botany' | 'Zoology';
export type ClassLevel = 'Class 11' | 'Class 12';
export type DifficultyLevel = 'Easy' | 'Moderate' | 'NEET-Trap';
export type QuestionType = 'MCQ' | 'Assertion-Reason' | 'Match-Column' | 'Statement-Based' | 'Diagram-Based';

export interface Question {
  id: string;
  subject: SubjectType;
  classLevel: ClassLevel;
  chapter: string;
  topic?: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  ncertReference: string;
  year?: string; // e.g. "NEET 2024", "NEET 2023 Re-exam", "AIPMT 2016", "High-Yield Guess 2026"
  isGuessQuestion?: boolean;
  probabilityScore?: number; // 0-100%
  diagramUrl?: string;
}

export interface SectionConfig {
  name: string; // e.g. "Section A" (35 mandatory), "Section B" (15 choose 10)
  subject: SubjectType;
  questionIds: string[];
  mandatoryCount?: number;
  maxAttemptCount?: number;
}

export interface MockTest {
  id: string;
  title: string;
  category: 'Full-NEET-720' | 'Daily-Sprint' | 'Subject-Mastery' | 'High-Yield-Guess';
  description: string;
  durationMinutes: number;
  totalMarks: number;
  totalQuestions: number;
  questions: Question[];
  sections?: {
    physicsA: Question[];
    physicsB: Question[];
    chemistryA: Question[];
    chemistryB: Question[];
    botanyA: Question[];
    botanyB: Question[];
    zoologyA: Question[];
    zoologyB: Question[];
  };
  isDailyMock?: boolean;
  dateTag?: string;
}

export interface TestResult {
  id: string;
  testId: string;
  testTitle: string;
  completedAt: string;
  timeSpentSeconds: number;
  totalMarks: number;
  scoredMarks: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  accuracyPercentage: number;
  estimatedAirRank: number;
  predictedCollege: string;
  answers: Record<string, number>; // questionId -> chosenIndex (-1 if skipped)
  subjectStats: Record<SubjectType, {
    score: number;
    maxScore: number;
    correct: number;
    incorrect: number;
    unattempted: number;
    accuracy: number;
  }>;
}

export interface MistakeRecord {
  id: string;
  questionId: string;
  question: Question;
  userChosenIndex: number;
  recordedAt: string;
  resolved: boolean;
  notes?: string;
}

export interface MentorReply {
  mentorName: string;
  mentorRole: string;
  verified: boolean;
  avatar: string;
  content: string;
  ncertCitation: string;
  date: string;
}

export interface DoubtPost {
  id: string;
  studentName: string;
  studentAvatar: string;
  title: string;
  subject: SubjectType;
  classLevel: ClassLevel;
  chapter: string;
  questionText: string;
  userAttempt?: string;
  imageUrl?: string;
  upvotes: number;
  userUpvoted?: boolean;
  status: 'MENTOR_ANSWERED' | 'DISCUSSING';
  mentorReply?: MentorReply;
  repliesCount: number;
  createdAt: string;
}

export interface NcertConcept {
  id: string;
  title: string;
  ncertQuote: string;
  explanation: string;
  pyqHistory: string[]; // e.g. ["NEET 2024", "NEET 2021", "NEET 2019"]
  neetTrapWarning: string;
  mnemonic?: string;
}

export interface NcertChapter {
  id: string;
  subject: SubjectType;
  classLevel: ClassLevel;
  unit: string;
  chapterNumber: number;
  title: string;
  weightageScore: number; // e.g. 12 (approx marks)
  pyqCount: number;
  summary: string;
  concepts: NcertConcept[];
  formulaList?: string[];
  sampleQuestionIds: string[];
}

export interface StudyTask {
  id: string;
  timeSlot: string;
  subject: SubjectType;
  chapter: string;
  taskType: 'NCERT_READ' | 'PYQ_PRACTICE' | 'MOCK_TEST' | 'MISTAKE_REVISION';
  completed: boolean;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  description: string;
}

export interface WeaknessInsight {
  subject: SubjectType;
  chapter: string;
  accuracy: number;
  totalAttempts: number;
  status: 'Critical Alert' | 'Needs Attention' | 'Strong';
  recommendedAction: string;
}

export type BadgeTier = 'Bronze' | 'Silver' | 'Gold' | 'Diamond';
export type BadgeCategory = 'streak' | 'accuracy' | 'mastery' | 'discipline';

export interface VirtualBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: BadgeCategory;
  tier: BadgeTier;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  perkText: string;
  requirementText: string;
}

export interface DayActivity {
  dayName: string; // 'Mon', 'Tue', etc.
  dateString: string; // 'YYYY-MM-DD'
  active: boolean;
  isToday: boolean;
  minutesStudied: number;
  questionsSolved: number;
}

export interface StreakData {
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string; // 'YYYY-MM-DD'
  todayCompleted: boolean;
  streakFreezeCount: number;
  totalActiveDays: number;
  totalQuestionsPracticed: number;
  weeklyHistory: DayActivity[];
  recentBadgeUnlocked?: VirtualBadge;
}
