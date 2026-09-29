import React, { useState } from 'react';
import { BookmarkCheck, X, CheckCircle, AlertTriangle, ArrowRight, BookOpen, Trash2, RotateCcw } from 'lucide-react';
import { MistakeRecord, Question } from '../types/neet';

interface MistakeBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  mistakes: MistakeRecord[];
  onResolveMistake: (id: string) => void;
  onDeleteMistake: (id: string) => void;
  onStartMistakeDrill: (questions: Question[]) => void;
}

export const MistakeBookModal: React.FC<MistakeBookModalProps> = ({
  isOpen,
  onClose,
  mistakes,
  onResolveMistake,
  onDeleteMistake,
  onStartMistakeDrill,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Unresolved' | 'Mastered'>('Unresolved');

  if (!isOpen) return null;

  const filteredMistakes = mistakes.filter((m) => {
    const matchSubject = selectedSubject === 'All' || m.question.subject === selectedSubject;
    const matchStatus = 
      filterStatus === 'All' ? true :
      filterStatus === 'Unresolved' ? !m.resolved : m.resolved;
    return matchSubject && matchStatus;
  });

  const unresolvedCount = mistakes.filter(m => !m.resolved).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <BookmarkCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-100 text-lg">Personal Mistake Notebook (Error Book)</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30">
                  {unresolvedCount} Pending
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Toppers Golden Rule: Every corrected mistake in this notebook adds +5 marks in NEET UG
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls & Drill Action */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Subject:</span>
            {['All', 'Physics', 'Chemistry', 'Botany', 'Zoology'].map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  selectedSubject === sub
                    ? 'bg-emerald-500 text-white font-semibold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Status:</span>
            {(['Unresolved', 'Mastered', 'All'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  filterStatus === st
                    ? 'bg-slate-700 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {filteredMistakes.length > 0 && (
            <button
              onClick={() => {
                onClose();
                onStartMistakeDrill(filteredMistakes.map(m => m.question));
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold shadow-md hover:brightness-110 transition-all ml-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake {filteredMistakes.length} Mistakes Drill</span>
            </button>
          )}
        </div>

        {/* Mistakes List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {filteredMistakes.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-emerald-400/60 mx-auto mb-3" />
              <h4 className="text-slate-200 font-semibold text-base">No errors in this filter!</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                Any question you get wrong in Daily Mocks or PYQ Practice is automatically cataloged here for revision.
              </p>
            </div>
          ) : (
            filteredMistakes.map((record, index) => {
              const q = record.question;
              return (
                <div
                  key={record.id}
                  className={`p-4 rounded-xl border transition-all ${
                    record.resolved
                      ? 'bg-slate-900/40 border-slate-800/80 opacity-75'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-rose-400">
                        #{index + 1}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        {q.subject}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {q.chapter}
                      </span>
                      {q.year && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                          {q.year}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onResolveMistake(record.id)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                          record.resolved
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-400'
                        }`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{record.resolved ? 'Mastered' : 'Mark Mastered'}</span>
                      </button>

                      <button
                        onClick={() => onDeleteMistake(record.id)}
                        className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                        title="Remove from notebook"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Question statement */}
                  <p className="text-xs sm:text-sm font-medium text-slate-200 mb-3 whitespace-pre-line">
                    {q.question}
                  </p>

                  {/* Options Comparison: User mistake vs Correct */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300">
                      <span className="font-bold flex items-center gap-1 mb-1 text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        Your Incorrect Choice:
                      </span>
                      <span>
                        {record.userChosenIndex >= 0 ? q.options[record.userChosenIndex] : 'Left Unattempted / Skipped'}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                      <span className="font-bold flex items-center gap-1 mb-1 text-[11px]">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        Correct NTA Answer:
                      </span>
                      <span>
                        {q.options[q.correctIndex]}
                      </span>
                    </div>
                  </div>

                  {/* NCERT Explanation */}
                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 space-y-1.5">
                    <p className="font-semibold text-slate-200">NCERT Solution Breakdown:</p>
                    <p className="text-slate-400 leading-relaxed">{q.explanation}</p>
                    <div className="flex items-center gap-1.5 text-emerald-400 pt-1 text-[11px] font-medium">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{q.ncertReference}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <span>{mistakes.length} Total Errors Cataloged</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 font-semibold hover:bg-slate-700 transition-colors"
          >
            Close Notebook
          </button>
        </div>
      </div>
    </div>
  );
};
