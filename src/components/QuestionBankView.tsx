import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Sparkles, 
  Check, 
  X, 
  AlertTriangle, 
  Bookmark, 
  BookmarkCheck, 
  Loader2, 
  RotateCcw,
  Zap,
  HelpCircle,
  Award
} from 'lucide-react';
import { Question, SubjectType, ClassLevel, QuestionType, DifficultyLevel } from '../types/neet';
import { CORE_QUESTION_BANK, QUESTION_CATALOG_STATS } from '../data/questionBankData';
import { generateGuessQuestions } from '../services/apiService';

interface QuestionBankViewProps {
  onAddToMistakes: (question: Question, userOptionIndex: number) => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  onAddToMistakes,
}) => {
  const [questionsList, setQuestionsList] = useState<Question[]>(CORE_QUESTION_BANK);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedSource, setSelectedSource] = useState<string>('All');
  const [practiceMode, setPracticeMode] = useState<'study' | 'quiz'>('study');

  // For quiz mode: questionId -> selectedOptionIndex
  const [userSelectedOptions, setUserSelectedOptions] = useState<Record<string, number>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // AI Guess Question generator state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatorChapter, setGeneratorChapter] = useState('');
  const [generatorSubject, setGeneratorSubject] = useState<SubjectType>('Botany');

  // Filtered list
  const filteredQuestions = questionsList.filter((q) => {
    const matchSubject = selectedSubject === 'All' || q.subject === selectedSubject;
    const matchClass = selectedClass === 'All' || q.classLevel === selectedClass;
    const matchType = selectedType === 'All' || q.type === selectedType;
    const matchSource = 
      selectedSource === 'All' ? true :
      selectedSource === 'PYQ' ? !q.isGuessQuestion :
      selectedSource === 'Guess' ? q.isGuessQuestion : true;

    const matchSearch = 
      !searchQuery.trim() ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.topic && q.topic.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchSubject && matchClass && matchType && matchSource && matchSearch;
  });

  const handleSelectOptionInQuiz = (q: Question, optIdx: number) => {
    setUserSelectedOptions(prev => ({ ...prev, [q.id]: optIdx }));
    setRevealedSolutions(prev => ({ ...prev, [q.id]: true }));

    if (optIdx !== q.correctIndex) {
      onAddToMistakes(q, optIdx);
    }
  };

  const handleGenerateGuessQuestions = async () => {
    if (!generatorChapter.trim()) return;
    setIsGenerating(true);

    try {
      const response = await generateGuessQuestions({
        subject: generatorSubject,
        chapter: generatorChapter,
        difficulty: 'Moderate to High',
        count: 2,
        questionType: 'Statement-Based'
      });

      if (response && response.questions && response.questions.length > 0) {
        setQuestionsList(prev => [...response.questions, ...prev]);
        setGeneratorChapter('');
      }
    } catch (e) {
      console.error('Error generating questions:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Catalog Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              30,000+ Question Engine
            </span>
            <span className="text-xs text-slate-400">Class 11 & 12 Complete NCERT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            NEET UG PYQs & High-Yield Guess Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Filter through past 10 years AIPMT/NEET questions, Assertion-Reason combinations, 
            and targeted 2026/2027 guess questions with line-by-line NCERT verification.
          </p>
        </div>

        {/* Statistics Pill */}
        <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl flex items-center gap-4 text-xs">
          <div>
            <p className="text-slate-400">Total Indexed</p>
            <p className="text-xl font-mono font-bold text-emerald-400">
              {QUESTION_CATALOG_STATS.totalQuestions.toLocaleString()}+
            </p>
          </div>
          <div className="h-8 w-[1px] bg-slate-800" />
          <div>
            <p className="text-slate-400">PYQs (2014-2024)</p>
            <p className="text-xl font-mono font-bold text-cyan-300">
              {QUESTION_CATALOG_STATS.pyqCount.toLocaleString()}
            </p>
          </div>
          <div className="h-8 w-[1px] bg-slate-800" />
          <div>
            <p className="text-slate-400">NTA Guesses</p>
            <p className="text-xl font-mono font-bold text-amber-400">
              {QUESTION_CATALOG_STATS.guessCount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* AI Guess Question Generator Callout */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/20 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-100">
              AIIMS & Kota Faculty Guess Question Synthesizer
            </h4>
            <p className="text-xs text-slate-400">
              Need more questions on a specific tricky topic? Generate fresh NTA-pattern guess questions instantly.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={generatorSubject}
            onChange={(e) => setGeneratorSubject(e.target.value as SubjectType)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 focus:outline-none"
          >
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Botany">Biology (Botany)</option>
            <option value="Zoology">Biology (Zoology)</option>
          </select>

          <input
            type="text"
            placeholder="Enter chapter name..."
            value={generatorChapter}
            onChange={(e) => setGeneratorChapter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-44"
          />

          <button
            onClick={handleGenerateGuessQuestions}
            disabled={isGenerating || !generatorChapter.trim()}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs disabled:opacity-50 transition-colors shadow-sm"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Questions</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Search & Comprehensive Filters Bar */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        {/* Search Input & Mode Switch */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by topic, chapter, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Mode Switch: Study (Instant solution) vs Quiz (Interactive testing) */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setPracticeMode('study')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                practiceMode === 'study'
                  ? 'bg-slate-800 text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Study Mode (Reveal NCERT)
            </button>
            <button
              onClick={() => setPracticeMode('quiz')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                practiceMode === 'quiz'
                  ? 'bg-slate-800 text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Interactive Quiz Mode
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
          {/* Subject Filter */}
          <div className="flex items-center gap-1 mr-2">
            <span className="text-slate-400 font-medium">Subject:</span>
            {['All', 'Physics', 'Chemistry', 'Botany', 'Zoology'].map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  selectedSubject === sub
                    ? 'bg-emerald-500 text-white font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Class Filter */}
          <div className="flex items-center gap-1 mr-2">
            <span className="text-slate-400 font-medium">Class:</span>
            {['All', 'Class 11', 'Class 12'].map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  selectedClass === cls
                    ? 'bg-cyan-500 text-white font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>

          {/* Source Filter */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400 font-medium">Source:</span>
            {['All', 'PYQ', 'Guess'].map((src) => (
              <button
                key={src}
                onClick={() => setSelectedSource(src)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  selectedSource === src
                    ? 'bg-amber-500 text-white font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {src === 'All' ? 'All Sources' : src === 'PYQ' ? '10-Yr PYQs' : 'High-Yield Guesses'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions Listing */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Showing {filteredQuestions.length} Questions</span>
          <span>Marking Scheme: +4 for correct, -1 for wrong</span>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 bg-slate-900 rounded-2xl border border-slate-800">
            <HelpCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="font-bold text-slate-300 text-base">No questions found matching your filter</h4>
            <p className="text-xs text-slate-500 mt-1">Try resetting the filters or searching for another topic.</p>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const userChoice = userSelectedOptions[q.id];
            const isRevealed = practiceMode === 'study' || Boolean(revealedSolutions[q.id]);
            const isCorrect = userChoice === q.correctIndex;

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700/80 transition-all space-y-4 shadow-sm"
              >
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-slate-400">#{idx + 1}</span>
                    <span className="px-2 py-0.5 rounded font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {q.subject}
                    </span>
                    <span className="text-slate-400">{q.classLevel}</span>
                    <span className="text-slate-400">&bull;</span>
                    <span className="text-slate-300 font-semibold">{q.chapter}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                      {q.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {q.year && (
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                        q.isGuessQuestion
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                      }`}>
                        {q.year}
                      </span>
                    )}
                    {q.probabilityScore && (
                      <span className="text-[10px] text-amber-400 font-semibold hidden sm:inline">
                        {q.probabilityScore}% Repeat Likelihood
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Statement */}
                <p className="text-xs sm:text-sm font-medium text-slate-100 leading-relaxed whitespace-pre-line">
                  {q.question}
                </p>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {q.options.map((opt, optIdx) => {
                    const isOptionCorrect = optIdx === q.correctIndex;
                    const isSelected = userChoice === optIdx;

                    let optClasses = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700';

                    if (isRevealed) {
                      if (isOptionCorrect) {
                        optClasses = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && !isOptionCorrect) {
                        optClasses = 'bg-rose-500/20 border-rose-500 text-rose-200 line-through';
                      }
                    } else if (isSelected) {
                      optClasses = 'bg-slate-800 border-slate-600 text-white';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOptionInQuiz(q, optIdx)}
                        className={`text-left p-3 rounded-xl border flex items-center justify-between transition-all ${optClasses}`}
                      >
                        <span className="pr-2">{opt}</span>
                        {isRevealed && isOptionCorrect && (
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        )}
                        {isRevealed && isSelected && !isOptionCorrect && (
                          <X className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Solution & NCERT Citation Accordion */}
                {isRevealed && (
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 space-y-2 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        NCERT Line Breakdown & Explanation
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {q.ncertReference}
                      </span>
                    </div>

                    <p className="text-slate-300 leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
