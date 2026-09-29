import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { MockTestView } from './components/MockTestView';
import { ExamRoom } from './components/ExamRoom';
import { QuestionBankView } from './components/QuestionBankView';
import { NcertReaderView } from './components/NcertReaderView';
import { StudyPlannerView } from './components/StudyPlannerView';
import { DoubtForumView } from './components/DoubtForumView';
import { PerformanceTrackerView } from './components/PerformanceTrackerView';
import { OfflineModal } from './components/OfflineModal';
import { MistakeBookModal } from './components/MistakeBookModal';
import { AskDoubtModal } from './components/AskDoubtModal';
import { BadgeUnlockedCelebration } from './components/BadgeUnlockedCelebration';
import { BadgeDetailModal } from './components/BadgeDetailModal';

import { 
  MockTest, 
  Question, 
  TestResult, 
  MistakeRecord, 
  StudyTask, 
  DoubtPost, 
  WeaknessInsight, 
  StreakData, 
  VirtualBadge 
} from './types/neet';
import { MOCK_TESTS } from './data/mockTestsData';
import { INITIAL_STUDY_TASKS, INITIAL_WEAKNESS_INSIGHTS } from './data/initialSchedule';
import { INITIAL_FORUM_POSTS } from './data/forumData';
import { OfflineStorage, OfflinePackage } from './services/offlineStorage';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeExam, setActiveExam] = useState<MockTest | null>(null);

  // Daily Streak and Badges State
  const [streakData, setStreakData] = useState<StreakData>(() => OfflineStorage.getStreakData());
  const [badges, setBadges] = useState<VirtualBadge[]>(() => OfflineStorage.getBadges());
  const [selectedBadgeForDetail, setSelectedBadgeForDetail] = useState<VirtualBadge | null>(null);
  const [celebrationBadge, setCelebrationBadge] = useState<VirtualBadge | null>(null);

  // Offline State
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(() => OfflineStorage.getOfflineModePreference());
  const [offlinePackages, setOfflinePackages] = useState<OfflinePackage[]>(() => OfflineStorage.getOfflinePackages());
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState<boolean>(false);

  // Mistakes State
  const [mistakes, setMistakes] = useState<MistakeRecord[]>(() => OfflineStorage.getMistakes());
  const [isMistakeModalOpen, setIsMistakeModalOpen] = useState<boolean>(false);

  // Test Results State
  const [results, setResults] = useState<TestResult[]>(() => OfflineStorage.getTestResults());

  // Tasks State
  const [tasks, setTasks] = useState<StudyTask[]>(() => OfflineStorage.getTasks() || INITIAL_STUDY_TASKS);

  // Doubts State
  const [doubts, setDoubts] = useState<DoubtPost[]>(() => OfflineStorage.getDoubts() || INITIAL_FORUM_POSTS);
  const [isAskDoubtModalOpen, setIsAskDoubtModalOpen] = useState<boolean>(false);

  // Weaknesses State
  const [weaknesses, setWeaknesses] = useState<WeaknessInsight[]>(INITIAL_WEAKNESS_INSIGHTS);

  // Sync tasks & doubts to offline storage on change
  useEffect(() => {
    OfflineStorage.saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    OfflineStorage.saveDoubts(doubts);
  }, [doubts]);

  const handleToggleOfflineMode = () => {
    const newVal = !isOfflineMode;
    setIsOfflineMode(newVal);
    OfflineStorage.setOfflineModePreference(newVal);
  };

  const handleTogglePackageDownload = (pkgId: string) => {
    const updated = OfflineStorage.togglePackageDownload(pkgId);
    setOfflinePackages(updated);
  };

  // Launch a mock test
  const handleStartMock = (testId: string) => {
    const foundTest = MOCK_TESTS.find(t => t.id === testId);
    if (foundTest) {
      setActiveExam(foundTest);
    }
  };

  // Launch a custom drill of mistakes
  const handleStartMistakeDrill = (mistakeQuestions: Question[]) => {
    const mistakeTest: MockTest = {
      id: 'mistake-drill-' + Date.now(),
      title: `Mistake Recovery Speed Drill (${mistakeQuestions.length} Questions)`,
      category: 'Daily-Sprint',
      description: 'Practice only your past mistakes until you achieve 100% accuracy.',
      durationMinutes: Math.max(15, mistakeQuestions.length * 1.5),
      totalMarks: mistakeQuestions.length * 4,
      totalQuestions: mistakeQuestions.length,
      questions: mistakeQuestions,
      isDailyMock: false,
      dateTag: 'Mistake Drill'
    };
    setActiveExam(mistakeTest);
  };

  // Handle test completion
  const handleSaveResult = (newResult: TestResult) => {
    OfflineStorage.saveTestResult(newResult);
    setResults(prev => [newResult, ...prev]);

    // Record active learning for test completion & check badges
    const questionsCompleted = newResult.correctCount + newResult.incorrectCount;
    const minutesTaken = Math.max(15, Math.round(newResult.timeSpentSeconds / 60));
    const { updatedStreak, newlyUnlockedBadge } = OfflineStorage.recordActiveLearning(questionsCompleted, minutesTaken);
    setStreakData(updatedStreak);
    setBadges(OfflineStorage.getBadges());
    if (newlyUnlockedBadge) {
      setCelebrationBadge(newlyUnlockedBadge);
    }

    // Dynamically update weaknesses based on lowest scoring subject
    const lowestSub = (Object.entries(newResult.subjectStats) as [string, { accuracy: number }][])
      .sort((a, b) => a[1].accuracy - b[1].accuracy)[0];

    if (lowestSub) {
      setWeaknesses(prev => [
        {
          subject: lowestSub[0] as any,
          chapter: `Recent ${lowestSub[0]} Section`,
          accuracy: lowestSub[1].accuracy,
          totalAttempts: 35,
          status: lowestSub[1].accuracy < 60 ? 'Critical Alert' : 'Needs Attention',
          recommendedAction: `Focus on ${lowestSub[0]} NCERT tables and formula derivations.`
        },
        ...prev.slice(1)
      ]);
    }
  };

  // Streak & Badge Handlers
  const handleLogActiveLearning = () => {
    const { updatedStreak, newlyUnlockedBadge } = OfflineStorage.recordActiveLearning(15, 30);
    setStreakData(updatedStreak);
    setBadges(OfflineStorage.getBadges());
    if (newlyUnlockedBadge) {
      setCelebrationBadge(newlyUnlockedBadge);
    }
  };

  const handleUseStreakFreeze = () => {
    const updated = OfflineStorage.useStreakFreeze();
    if (updated) {
      setStreakData(updated);
    }
  };

  const handleAdvanceSimulatedStreak = () => {
    const { updatedStreak, newlyUnlockedBadge } = OfflineStorage.advanceStreakSimulated(1);
    setStreakData(updatedStreak);
    setBadges(OfflineStorage.getBadges());
    if (newlyUnlockedBadge) {
      setCelebrationBadge(newlyUnlockedBadge);
    }
  };

  // Handle adding mistakes to Mistake Book
  const handleAddMistakesFromExam = (wrongList: { question: Question; userChosenIndex: number }[]) => {
    wrongList.forEach(item => {
      const rec: MistakeRecord = {
        id: 'mistake-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
        questionId: item.question.id,
        question: item.question,
        userChosenIndex: item.userChosenIndex,
        recordedAt: new Date().toLocaleDateString(),
        resolved: false,
      };
      OfflineStorage.saveMistake(rec);
    });
    setMistakes(OfflineStorage.getMistakes());
  };

  const handleResolveMistake = (id: string) => {
    OfflineStorage.resolveMistake(id);
    setMistakes(OfflineStorage.getMistakes());
  };

  const handleDeleteMistake = (id: string) => {
    OfflineStorage.deleteMistake(id);
    setMistakes(OfflineStorage.getMistakes());
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(prev => {
      const updated = prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
      const changed = updated.find(t => t.id === taskId);
      if (changed?.completed) {
        const { updatedStreak, newlyUnlockedBadge } = OfflineStorage.recordActiveLearning(10, 20);
        setStreakData(updatedStreak);
        setBadges(OfflineStorage.getBadges());
        if (newlyUnlockedBadge) {
          setCelebrationBadge(newlyUnlockedBadge);
        }
      }
      return updated;
    });
  };

  const handleUpvoteDoubt = (doubtId: string) => {
    setDoubts(prev => prev.map(d => {
      if (d.id === doubtId) {
        const isUpvoted = d.userUpvoted;
        return {
          ...d,
          upvotes: isUpvoted ? d.upvotes - 1 : d.upvotes + 1,
          userUpvoted: !isUpvoted,
        };
      }
      return d;
    }));
  };

  const handleDoubtCreated = (newDoubt: DoubtPost) => {
    setDoubts(prev => [newDoubt, ...prev]);
  };

  const unresolvedMistakesCount = mistakes.filter(m => !m.resolved).length;

  // If inside an active exam session, show full-screen Exam Room
  if (activeExam) {
    return (
      <ExamRoom
        test={activeExam}
        onExit={() => setActiveExam(null)}
        onSaveResult={handleSaveResult}
        onAddMistakes={handleAddMistakesFromExam}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOfflineMode={isOfflineMode}
        toggleOfflineMode={handleToggleOfflineMode}
        openOfflineModal={() => setIsOfflineModalOpen(true)}
        openMistakeBook={() => setIsMistakeModalOpen(true)}
        unresolvedMistakesCount={unresolvedMistakesCount}
        streakCount={streakData.currentStreak}
        streakActiveToday={streakData.todayCompleted}
      />

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            onStartMock={handleStartMock}
            onNavigateTab={setActiveTab}
            openMistakeBook={() => setIsMistakeModalOpen(true)}
            unresolvedMistakesCount={unresolvedMistakesCount}
            recentResults={results}
            weaknesses={weaknesses}
            streakData={streakData}
            badges={badges}
            onLogActiveLearning={handleLogActiveLearning}
            onUseStreakFreeze={handleUseStreakFreeze}
            onAdvanceSimulatedStreak={handleAdvanceSimulatedStreak}
            onSelectBadge={(badge) => setSelectedBadgeForDetail(badge)}
          />
        )}

        {activeTab === 'mock-tests' && (
          <MockTestView
            onStartTest={handleStartMock}
            recentResults={results}
          />
        )}

        {activeTab === 'question-bank' && (
          <QuestionBankView
            onAddToMistakes={(question, userOptionIndex) => {
              const rec: MistakeRecord = {
                id: 'm-' + Date.now(),
                questionId: question.id,
                question,
                userChosenIndex: userOptionIndex,
                recordedAt: new Date().toLocaleDateString(),
                resolved: false,
              };
              OfflineStorage.saveMistake(rec);
              setMistakes(OfflineStorage.getMistakes());
            }}
          />
        )}

        {activeTab === 'ncert-reader' && (
          <NcertReaderView
            onStartChapterDrill={handleStartMock}
          />
        )}

        {activeTab === 'study-planner' && (
          <StudyPlannerView
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onUpdateTasks={setTasks}
            weaknesses={weaknesses}
          />
        )}

        {activeTab === 'doubt-forum' && (
          <DoubtForumView
            doubts={doubts}
            onOpenAskModal={() => setIsAskDoubtModalOpen(true)}
            onUpvoteDoubt={handleUpvoteDoubt}
          />
        )}

        {activeTab === 'performance' && (
          <PerformanceTrackerView
            recentResults={results}
            weaknesses={weaknesses}
            openMistakeBook={() => setIsMistakeModalOpen(true)}
            unresolvedMistakesCount={unresolvedMistakesCount}
          />
        )}
      </main>

      {/* Offline Management Modal */}
      <OfflineModal
        isOpen={isOfflineModalOpen}
        onClose={() => setIsOfflineModalOpen(false)}
        isOfflineMode={isOfflineMode}
        onToggleOfflineMode={handleToggleOfflineMode}
        packages={offlinePackages}
        onTogglePackage={handleTogglePackageDownload}
      />

      {/* Personal Mistake Book (Error Notebook) Modal */}
      <MistakeBookModal
        isOpen={isMistakeModalOpen}
        onClose={() => setIsMistakeModalOpen(false)}
        mistakes={mistakes}
        onResolveMistake={handleResolveMistake}
        onDeleteMistake={handleDeleteMistake}
        onStartMistakeDrill={handleStartMistakeDrill}
      />

      {/* Ask Doubt Modal */}
      <AskDoubtModal
        isOpen={isAskDoubtModalOpen}
        onClose={() => setIsAskDoubtModalOpen(false)}
        onDoubtCreated={handleDoubtCreated}
      />

      {/* Badge Unlocked Celebration Modal with Confetti */}
      <BadgeUnlockedCelebration
        badge={celebrationBadge}
        onClose={() => setCelebrationBadge(null)}
      />

      {/* Badge Detail Inspection & Requirement Modal */}
      <BadgeDetailModal
        badge={selectedBadgeForDetail}
        onClose={() => setSelectedBadgeForDetail(null)}
        onPracticeForBadge={() => {
          setSelectedBadgeForDetail(null);
          handleStartMock('mock-daily-sprint-today');
        }}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 NEET PREP &bull; Dedicated to Aspiring Doctors across India</p>
          <p className="text-slate-400">
            NTA Pattern &bull; 720 Marks &bull; NCERT Class 11 & 12 Complete Syllabus
          </p>
        </div>
      </footer>
    </div>
  );
}
