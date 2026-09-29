import React, { useState, useEffect, useMemo } from 'react';
import { 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  Flag, 
  RotateCcw, 
  ArrowLeft, 
  ArrowRight, 
  Award, 
  BookmarkCheck, 
  BookOpen, 
  ChevronRight, 
  Grid,
  Check,
  TrendingUp,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MockTest, Question, TestResult, SubjectType } from '../types/neet';

interface ExamRoomProps {
  test: MockTest;
  onExit: () => void;
  onSaveResult: (result: TestResult) => void;
  onAddMistakes: (wrongQuestions: { question: Question; userChosenIndex: number }[]) => void;
}

export const ExamRoom: React.FC<ExamRoomProps> = ({
  test,
  onExit,
  onSaveResult,
  onAddMistakes,
}) => {
  // Time management: duration in minutes converted to seconds
  const [timeLeft, setTimeLeft] = useState<number>(test.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);
  const [showOmrModal, setShowOmrModal] = useState<boolean>(false);

  // Selected subject & active question index in the entire test question array
  const [currentSubject, setCurrentSubject] = useState<SubjectType>('Physics');
  const [currentSection, setCurrentSection] = useState<'A' | 'B'>('A');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // User state maps
  // answers: questionId -> chosen option index (0, 1, 2, 3) or undefined
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  // markedForReview: questionId -> boolean
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  // visitedQuestions: questionId -> boolean
  const [visited, setVisited] = useState<Record<string, boolean>>({
    [test.questions[0]?.id]: true
  });

  // Test result stored after submission
  const [finalResult, setFinalResult] = useState<TestResult | null>(null);

  // Group questions by subject
  const subjectQuestionsMap = useMemo(() => {
    const map: Record<SubjectType, Question[]> = {
      Physics: test.questions.filter(q => q.subject === 'Physics'),
      Chemistry: test.questions.filter(q => q.subject === 'Chemistry'),
      Botany: test.questions.filter(q => q.subject === 'Botany'),
      Zoology: test.questions.filter(q => q.subject === 'Zoology'),
    };
    return map;
  }, [test]);

  // Current question
  const currentQuestion = test.questions[currentIndex] || test.questions[0];

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  // Mark current question as visited
  useEffect(() => {
    if (currentQuestion) {
      setVisited(prev => ({ ...prev, [currentQuestion.id]: true }));
      setCurrentSubject(currentQuestion.subject);
    }
  }, [currentIndex, currentQuestion]);

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    if (!currentQuestion) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleClearResponse = () => {
    if (!currentQuestion) return;
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  const handleToggleReview = () => {
    if (!currentQuestion) return;
    setMarkedForReview(prev => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
  };

  const handleNext = () => {
    if (currentIndex < test.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentIndex(index);
  };

  // NTA Marking scheme: +4 for correct, -1 for incorrect, 0 for unattempted
  const handleSubmitTest = () => {
    setIsSubmitted(true);
    setShowSubmitConfirm(false);

    let scoredMarks = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    const subjectStats: TestResult['subjectStats'] = {
      Physics: { score: 0, maxScore: 0, correct: 0, incorrect: 0, unattempted: 0, accuracy: 0 },
      Chemistry: { score: 0, maxScore: 0, correct: 0, incorrect: 0, unattempted: 0, accuracy: 0 },
      Botany: { score: 0, maxScore: 0, correct: 0, incorrect: 0, unattempted: 0, accuracy: 0 },
      Zoology: { score: 0, maxScore: 0, correct: 0, incorrect: 0, unattempted: 0, accuracy: 0 },
    };

    const wrongList: { question: Question; userChosenIndex: number }[] = [];

    test.questions.forEach((q) => {
      const chosen = userAnswers[q.id];
      const sub = q.subject;
      subjectStats[sub].maxScore += 4;

      if (chosen === undefined) {
        unattemptedCount++;
        subjectStats[sub].unattempted++;
      } else if (chosen === q.correctIndex) {
        correctCount++;
        scoredMarks += 4;
        subjectStats[sub].correct++;
        subjectStats[sub].score += 4;
      } else {
        incorrectCount++;
        scoredMarks -= 1;
        subjectStats[sub].incorrect++;
        subjectStats[sub].score -= 1;
        wrongList.push({ question: q, userChosenIndex: chosen });
      }
    });

    // Compute subject accuracies
    (Object.keys(subjectStats) as SubjectType[]).forEach((sub) => {
      const totalAtt = subjectStats[sub].correct + subjectStats[sub].incorrect;
      subjectStats[sub].accuracy = totalAtt > 0 ? Math.round((subjectStats[sub].correct / totalAtt) * 100) : 0;
    });

    const totalAttempted = correctCount + incorrectCount;
    const accuracyPercentage = totalAttempted > 0 ? Math.round((correctCount / totalAttempted) * 100) : 0;

    // Approximate All India Rank estimation based on NEET percentile curves
    let estimatedAirRank = 50000;
    let predictedCollege = 'State Private Medical Colleges';

    if (scoredMarks >= 690) {
      estimatedAirRank = Math.max(1, Math.round(50 - (scoredMarks - 690) * 1.5));
      predictedCollege = 'AIIMS New Delhi / JIPMER Puducherry';
    } else if (scoredMarks >= 650) {
      estimatedAirRank = Math.round(500 + (690 - scoredMarks) * 80);
      predictedCollege = 'MAMC Delhi / VMMC / Top State GMC (Tier 1)';
    } else if (scoredMarks >= 610) {
      estimatedAirRank = Math.round(3500 + (650 - scoredMarks) * 250);
      predictedCollege = 'Government Medical College (All India / State Quota)';
    } else if (scoredMarks >= 550) {
      estimatedAirRank = Math.round(15000 + (610 - scoredMarks) * 600);
      predictedCollege = 'Semi-Government & Premier Deemed Universities';
    } else {
      estimatedAirRank = Math.round(50000 + (550 - scoredMarks) * 1200);
      predictedCollege = 'Need Revision for Govt Medical Seat';
    }

    const result: TestResult = {
      id: 'res-' + Date.now(),
      testId: test.id,
      testTitle: test.title,
      completedAt: new Date().toLocaleDateString(),
      timeSpentSeconds: test.durationMinutes * 60 - timeLeft,
      totalMarks: test.totalMarks,
      scoredMarks: Math.max(0, scoredMarks),
      correctCount,
      incorrectCount,
      unattemptedCount,
      accuracyPercentage,
      estimatedAirRank,
      predictedCollege,
      answers: userAnswers,
      subjectStats,
    };

    setFinalResult(result);
    onSaveResult(result);
    if (wrongList.length > 0) {
      onAddMistakes(wrongList);
    }

    // Launch celebratory confetti if student achieved > 580 marks
    if (scoredMarks >= 550) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log('Confetti error:', e);
      }
    }
  };

  // Status computation for question palette
  const getQuestionStatus = (q: Question) => {
    const isAns = userAnswers[q.id] !== undefined;
    const isRev = Boolean(markedForReview[q.id]);
    const isVis = Boolean(visited[q.id]);

    if (isAns && isRev) return 'ANSWERED_MARKED'; // purple with dot
    if (isRev) return 'MARKED'; // purple
    if (isAns) return 'ANSWERED'; // green
    if (isVis) return 'NOT_ANSWERED'; // red
    return 'NOT_VISITED'; // gray
  };

  // ==================== RESULT SCREEN ====================
  if (isSubmitted && finalResult) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300 pb-12">
        {/* Scorecard Hero */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Official NTA Scorecard & Detailed Analysis
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {test.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Completed in {Math.floor(finalResult.timeSpentSeconds / 60)}m {finalResult.timeSpentSeconds % 60}s
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onExit}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
              >
                Back to Tests
              </button>
            </div>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-700/80">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <p className="text-xs text-slate-400 font-medium">Total Score</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                  {finalResult.scoredMarks}
                </span>
                <span className="text-xs text-slate-400">/ {test.totalMarks}</span>
              </div>
              <p className="text-[10px] text-emerald-400 font-semibold mt-1">
                {Math.round((finalResult.scoredMarks / test.totalMarks) * 100)}% Marks
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <p className="text-xs text-slate-400 font-medium">Estimated AIR</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-cyan-300 mt-1">
                ~{finalResult.estimatedAirRank.toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-400 mt-1 truncate">
                {finalResult.predictedCollege}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <p className="text-xs text-slate-400 font-medium">Accuracy</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1">
                {finalResult.accuracyPercentage}%
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                {finalResult.correctCount} Correct / {finalResult.correctCount + finalResult.incorrectCount} Attempted
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <p className="text-xs text-slate-400 font-medium">Negative Marks Lost</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-rose-400 mt-1">
                -{finalResult.incorrectCount} pts
              </p>
              <p className="text-[10px] text-rose-400/80 mt-1">
                Auto-added to Mistake Book
              </p>
            </div>
          </div>
        </div>

        {/* Subject Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(['Physics', 'Chemistry', 'Botany', 'Zoology'] as SubjectType[]).map((sub) => {
            const stats = finalResult.subjectStats[sub];
            if (!stats) return null;
            return (
              <div key={sub} className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-200 text-sm">{sub}</span>
                  <span className="text-xs font-bold text-emerald-400">
                    {stats.score} / {stats.maxScore}
                  </span>
                </div>
                <div className="space-y-1 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Correct (+4):</span>
                    <strong className="text-emerald-400">{stats.correct}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Wrong (-1):</span>
                    <strong className="text-rose-400">{stats.incorrect}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Unattempted:</span>
                    <strong className="text-slate-400">{stats.unattempted}</strong>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-800 text-[11px]">
                    <span>Subject Accuracy:</span>
                    <strong className="text-white">{stats.accuracy}%</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Question by Question Detailed Review */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-100">
                Exhaustive Question-by-Question NCERT Review
              </h3>
              <p className="text-xs text-slate-400">
                Verify each answer key with official NCERT line references and explanations
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {test.questions.map((q, idx) => {
              const userChoice = userAnswers[q.id];
              const isCorrect = userChoice === q.correctIndex;
              const isSkipped = userChoice === undefined;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isCorrect
                      ? 'bg-emerald-950/10 border-emerald-500/30'
                      : isSkipped
                      ? 'bg-slate-950/40 border-slate-800'
                      : 'bg-rose-950/15 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-400">Q{idx + 1}</span>
                      <span className="px-2 py-0.5 rounded font-bold bg-slate-800 text-slate-300">
                        {q.subject}
                      </span>
                      <span className="text-slate-400">{q.chapter}</span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${
                      isCorrect
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : isSkipped
                        ? 'bg-slate-800 text-slate-400'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {isCorrect ? '+4 Marks (Correct)' : isSkipped ? '0 Marks (Skipped)' : '-1 Mark (Incorrect)'}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-slate-200 mb-3 whitespace-pre-line">
                    {q.question}
                  </p>

                  {/* Options list */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                    {q.options.map((opt, optIdx) => {
                      const isOptionCorrect = optIdx === q.correctIndex;
                      const isOptionChosen = optIdx === userChoice;

                      let optClasses = 'bg-slate-800/40 border-slate-700/60 text-slate-300';
                      if (isOptionCorrect) {
                        optClasses = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200 font-bold';
                      } else if (isOptionChosen && !isCorrect) {
                        optClasses = 'bg-rose-500/20 border-rose-500/50 text-rose-200 line-through';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${optClasses}`}
                        >
                          <span>{opt}</span>
                          {isOptionCorrect && (
                            <Check className="w-4 h-4 text-emerald-400" />
                          )}
                          {isOptionChosen && !isCorrect && (
                            <X className="w-4 h-4 text-rose-400" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* NCERT line explanation */}
                  <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                    <p className="font-semibold text-slate-200">Solution & NCERT Breakdown:</p>
                    <p className="text-slate-400 leading-relaxed">{q.explanation}</p>
                    <p className="text-emerald-400 font-medium text-[11px] pt-1">
                      &bull; Reference: {q.ncertReference}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ==================== LIVE EXAM ROOM INTERFACE ====================
  const subjectList: SubjectType[] = ['Physics', 'Chemistry', 'Botany', 'Zoology'];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Exam Header */}
      <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 px-4 py-2.5 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Do you really want to exit the test? Progress will not be evaluated.')) {
                onExit();
              }
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Exit Exam"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-bold text-sm sm:text-base text-slate-100 truncate max-w-xs sm:max-w-md">
              {test.title}
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>Candidate: Vishwa</span>
              <span>&bull;</span>
              <span>NEET UG (NTA Latest 720 Pattern)</span>
            </div>
          </div>
        </div>

        {/* Center: Timer Alert */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-sm ${
          timeLeft <= 600
            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
            : 'bg-slate-800 text-emerald-400 border-slate-700'
        }`}>
          <Clock className="w-4 h-4" />
          <span>{formatTimer(timeLeft)}</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowOmrModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700"
          >
            <Grid className="w-3.5 h-3.5 text-cyan-400" />
            <span>OMR Grid</span>
          </button>

          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold hover:brightness-110 shadow-sm transition-all"
          >
            Submit Test
          </button>
        </div>
      </header>

      {/* Main Exam Body: Split View (Left Question Area, Right Palette) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Column: Subject Switcher, Question statement, Options */}
        <div className="flex-1 flex flex-col overflow-y-auto border-r border-slate-800 p-4 sm:p-6 space-y-4">
          {/* Subject Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-800">
            {subjectList.map((sub) => {
              const isActive = currentSubject === sub;
              const subQuestions = subjectQuestionsMap[sub];
              const answeredInSub = subQuestions.filter(q => userAnswers[q.id] !== undefined).length;

              return (
                <button
                  key={sub}
                  onClick={() => {
                    const firstSubQ = test.questions.findIndex(q => q.subject === sub);
                    if (firstSubQ !== -1) setCurrentIndex(firstSubQ);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span>{sub}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                    isActive ? 'bg-emerald-700 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {answeredInSub}/{subQuestions.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Section Indicator (Section A vs Section B) */}
          <div className="flex items-center justify-between text-xs bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200">
                Question #{currentIndex + 1} of {test.questions.length}
              </span>
              <span className="text-slate-400">({currentQuestion?.subject} - {currentQuestion?.chapter})</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                +4 Marks, -1 Negative
              </span>
            </div>

            <button
              onClick={handleToggleReview}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                markedForReview[currentQuestion?.id]
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Flag className="w-3.5 h-3.5 text-purple-400" />
              <span>{markedForReview[currentQuestion?.id] ? 'Marked for Review' : 'Mark for Review'}</span>
            </button>
          </div>

          {/* Question Text */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed whitespace-pre-line">
              {currentQuestion?.question}
            </div>

            {/* Options List */}
            <div className="space-y-2.5 pt-2">
              {currentQuestion?.options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentQuestion.id] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-200 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                    }`}
                  >
                    <span className="pr-4">{opt}</span>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-xs font-bold ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500 text-white'
                        : 'border-slate-600 bg-slate-900 text-slate-400'
                    }`}>
                      {isSelected ? '✓' : String.fromCharCode(65 + optIdx)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Bar: Action Controls (Clear, Prev, Save & Next) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleClearResponse}
                disabled={userAnswers[currentQuestion?.id] === undefined}
                className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 disabled:opacity-40 transition-colors"
              >
                Clear Response
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-1 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold disabled:opacity-40 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === test.questions.length - 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold disabled:opacity-40 transition-colors shadow-sm"
              >
                <span>Save & Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Question Palette & Legends */}
        <div className="w-full lg:w-80 bg-slate-900/70 border-t lg:border-t-0 lg:border-l border-slate-800 p-4 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
              NTA Question Palette
            </h3>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-500 flex-shrink-0" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-rose-500 flex-shrink-0" />
                <span>Not Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-slate-700 flex-shrink-0" />
                <span>Not Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-purple-600 flex-shrink-0" />
                <span>Review</span>
              </div>
            </div>

            {/* Current Subject's Questions Matrix */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-300 mb-2">
                {currentSubject} Questions ({subjectQuestionsMap[currentSubject]?.length} Qs):
              </p>
              
              <div className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-5 gap-1.5 max-h-80 overflow-y-auto pr-1">
                {test.questions.map((q, idx) => {
                  const status = getQuestionStatus(q);
                  const isCurrent = idx === currentIndex;

                  let colorClass = 'bg-slate-800 text-slate-400 border-slate-700'; // NOT_VISITED
                  if (status === 'ANSWERED') colorClass = 'bg-emerald-500 text-white font-bold border-emerald-400';
                  else if (status === 'NOT_ANSWERED') colorClass = 'bg-rose-500 text-white font-bold border-rose-400';
                  else if (status === 'MARKED') colorClass = 'bg-purple-600 text-white font-bold border-purple-500';
                  else if (status === 'ANSWERED_MARKED') colorClass = 'bg-purple-600 text-white font-bold border-purple-400 ring-2 ring-emerald-400';

                  return (
                    <button
                      key={q.id}
                      onClick={() => handleJumpToQuestion(idx)}
                      className={`h-8 rounded text-xs font-mono font-medium border flex items-center justify-center transition-all ${colorClass} ${
                        isCurrent ? 'ring-2 ring-cyan-400 scale-105' : 'hover:opacity-90'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Summary in Palette */}
          <div className="pt-4 border-t border-slate-800/80 mt-4 text-xs space-y-1 text-slate-400">
            <div className="flex justify-between">
              <span>Total Answered:</span>
              <strong className="text-emerald-400">
                {Object.keys(userAnswers).length} / {test.questions.length}
              </strong>
            </div>
            <div className="flex justify-between">
              <span>Marked for Review:</span>
              <strong className="text-purple-400">
                {Object.values(markedForReview).filter(Boolean).length}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Submit Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-lg">Submit NEET Mock Test?</h3>
                <p className="text-xs text-slate-400">Verify your question attempt distribution</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span>Total Questions:</span>
                <strong>{test.questions.length}</strong>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Questions Answered:</span>
                <strong>{Object.keys(userAnswers).length}</strong>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>Unattempted Questions:</span>
                <strong>{test.questions.length - Object.keys(userAnswers).length}</strong>
              </div>
              <div className="flex justify-between text-purple-400">
                <span>Marked for Review:</span>
                <strong>{Object.values(markedForReview).filter(Boolean).length}</strong>
              </div>
              <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800">
                <span>Time Remaining:</span>
                <span className="font-mono text-emerald-400 font-bold">{formatTimer(timeLeft)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors"
              >
                Resume Exam
              </button>
              <button
                onClick={handleSubmitTest}
                className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors shadow-md"
              >
                Yes, Final Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OMR Simulation Modal */}
      {showOmrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Grid className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-slate-100 text-base">NEET UG Simulated OMR Sheet</h3>
              </div>
              <button
                onClick={() => setShowOmrModal(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Click any bubble below to fill or change your choice directly as on an OMR paper.
            </p>

            <div className="flex-1 overflow-y-auto space-y-2 pr-2 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {test.questions.map((q, qIdx) => (
                  <div key={q.id} className="p-2 rounded bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                    <span className="font-mono text-slate-400 font-bold w-7">Q{qIdx + 1}</span>
                    <div className="flex items-center gap-1.5">
                      {[0, 1, 2, 3].map((optIdx) => {
                        const isFilled = userAnswers[q.id] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => setUserAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                            className={`w-6 h-6 rounded-full border text-[10px] font-bold flex items-center justify-center transition-all ${
                              isFilled
                                ? 'bg-slate-200 border-white text-slate-950 scale-110 shadow-sm'
                                : 'border-slate-600 text-slate-400 hover:border-slate-400'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowOmrModal(false)}
                className="px-4 py-2 rounded-lg bg-emerald-500 text-white font-semibold text-xs hover:bg-emerald-600 transition-colors"
              >
                Return to Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
