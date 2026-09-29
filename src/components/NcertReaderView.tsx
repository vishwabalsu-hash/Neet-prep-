import React, { useState } from 'react';
import { 
  Award, 
  BookOpen, 
  AlertTriangle, 
  Sparkles, 
  Bookmark, 
  ArrowRight, 
  Play, 
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  FileSpreadsheet
} from 'lucide-react';
import { NcertChapter, SubjectType, ClassLevel } from '../types/neet';
import { NCERT_CHAPTERS } from '../data/ncertCurriculum';

interface NcertReaderViewProps {
  onStartChapterDrill: (testId: string) => void;
}

export const NcertReaderView: React.FC<NcertReaderViewProps> = ({
  onStartChapterDrill,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>('Botany');
  const [selectedClass, setSelectedClass] = useState<ClassLevel>('Class 11');
  const [activeChapterId, setActiveChapterId] = useState<string>(NCERT_CHAPTERS[0].id);
  const [activeSectionTab, setActiveSectionTab] = useState<'concepts' | 'traps' | 'mnemonics' | 'formulas'>('concepts');

  const filteredChapters = NCERT_CHAPTERS.filter(
    ch => ch.subject === selectedSubject && ch.classLevel === selectedClass
  );

  // Active selected chapter
  const currentChapter = 
    NCERT_CHAPTERS.find(ch => ch.id === activeChapterId) || 
    filteredChapters[0] || 
    NCERT_CHAPTERS[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              NCERT Core Line-by-Line Navigator
            </span>
            <span className="text-xs text-slate-400">&bull; 100% NEET UG Mapped</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Class 11 & 12 NCERT Core Subjects
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            90%+ of NEET biology and chemistry questions are lifted directly from NCERT tables and paragraphs.
            Read between the lines, master memory mnemonics, and avoid NTA traps.
          </p>
        </div>

        <button
          onClick={() => onStartChapterDrill('mock-daily-sprint-today')}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-colors"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Launch NCERT Speed Drill</span>
        </button>
      </div>

      {/* Selectors Bar: Subject & Class Tabs */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-semibold">Subject:</span>
          {(['Botany', 'Zoology', 'Chemistry', 'Physics'] as SubjectType[]).map((sub) => (
            <button
              key={sub}
              onClick={() => {
                setSelectedSubject(sub);
                const first = NCERT_CHAPTERS.find(c => c.subject === sub && c.classLevel === selectedClass);
                if (first) setActiveChapterId(first.id);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedSubject === sub
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-semibold">Class:</span>
          {(['Class 11', 'Class 12'] as ClassLevel[]).map((cls) => (
            <button
              key={cls}
              onClick={() => {
                setSelectedClass(cls);
                const first = NCERT_CHAPTERS.find(c => c.subject === selectedSubject && c.classLevel === cls);
                if (first) setActiveChapterId(first.id);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                selectedClass === cls
                  ? 'bg-cyan-500 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout: Left Chapter Selector, Right Chapter Details */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left 1 Col: Chapter List */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3 px-1">
            {selectedSubject} Chapters ({filteredChapters.length})
          </h4>

          {filteredChapters.map((ch) => {
            const isActive = ch.id === currentChapter.id;
            return (
              <div
                key={ch.id}
                onClick={() => setActiveChapterId(ch.id)}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-bold shadow-sm'
                    : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-slate-400">Chapter {ch.chapterNumber}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-amber-400 font-bold">
                    ~{ch.weightageScore} Marks
                  </span>
                </div>
                <p className="font-medium text-slate-200 line-clamp-1">{ch.title}</p>
                <p className="text-[11px] text-slate-500 mt-1">{ch.pyqCount} Solved PYQs</p>
              </div>
            );
          })}
        </div>

        {/* Right 3 Cols: Active Chapter Deep Dive */}
        <div className="lg:col-span-3 space-y-5">
          {/* Chapter Header Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded font-bold bg-slate-800 text-slate-300">
                  {currentChapter.classLevel} &bull; Unit: {currentChapter.unit}
                </span>
                <span className="text-slate-400">Chapter {currentChapter.chapterNumber}</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                NEET Repeat Frequency: {currentChapter.pyqCount}+ PYQs
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {currentChapter.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentChapter.summary}
            </p>

            {/* Navigation Tabs inside Chapter */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800 text-xs">
              <button
                onClick={() => setActiveSectionTab('concepts')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeSectionTab === 'concepts'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Line-by-Line Highlights ({currentChapter.concepts.length})</span>
              </button>

              <button
                onClick={() => setActiveSectionTab('traps')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeSectionTab === 'traps'
                    ? 'bg-rose-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>NEET Traps & Pitfalls</span>
              </button>

              <button
                onClick={() => setActiveSectionTab('mnemonics')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeSectionTab === 'mnemonics'
                    ? 'bg-amber-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Topper Mnemonics</span>
              </button>

              {currentChapter.formulaList && currentChapter.formulaList.length > 0 && (
                <button
                  onClick={() => setActiveSectionTab('formulas')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                    activeSectionTab === 'formulas'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Formula Summary</span>
                </button>
              )}
            </div>
          </div>

          {/* Section 1: Line-by-Line Concepts */}
          {activeSectionTab === 'concepts' && (
            <div className="space-y-4">
              {currentChapter.concepts.map((concept) => (
                <div
                  key={concept.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-bold text-sm sm:text-base text-slate-100 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      {concept.title}
                    </h4>

                    {/* PYQ occurrences */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {concept.pyqHistory.map((yr) => (
                        <span key={yr} className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {yr}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Verbatim NCERT quote in clinical highlight box */}
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border-l-4 border-emerald-500 text-xs text-slate-200 leading-relaxed font-mono">
                    "{concept.ncertQuote}"
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong className="text-slate-300">NTA Framing Insight:</strong> {concept.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Section 2: NEET Traps */}
          {activeSectionTab === 'traps' && (
            <div className="space-y-4">
              {currentChapter.concepts.map((concept) => (
                <div
                  key={concept.id}
                  className="p-5 rounded-2xl bg-rose-950/10 border border-rose-500/30 space-y-2.5"
                >
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{concept.title}: Common NEET Negative Trap</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {concept.neetTrapWarning}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Section 3: Mnemonics */}
          {activeSectionTab === 'mnemonics' && (
            <div className="space-y-4">
              {currentChapter.concepts.map((concept) => {
                if (!concept.mnemonic) return null;
                return (
                  <div
                    key={concept.id}
                    className="p-5 rounded-2xl bg-amber-950/15 border border-amber-500/30 space-y-2"
                  >
                    <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      <span>{concept.title}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/60 font-mono font-bold text-xs text-amber-300">
                      {concept.mnemonic}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Section 4: Formulas */}
          {activeSectionTab === 'formulas' && currentChapter.formulaList && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="font-bold text-sm text-cyan-300 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" />
                <span>High-Yield Formula & Rule Sheet</span>
              </h4>

              <div className="space-y-2">
                {currentChapter.formulaList.map((formula, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 font-mono text-xs text-slate-200"
                  >
                    {formula}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
