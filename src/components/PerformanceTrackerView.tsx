import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  BookmarkCheck, 
  Award, 
  RotateCcw,
  Zap,
  ArrowRight
} from 'lucide-react';
import { TestResult, WeaknessInsight, Question } from '../types/neet';

interface PerformanceTrackerViewProps {
  recentResults: TestResult[];
  weaknesses: WeaknessInsight[];
  openMistakeBook: () => void;
  unresolvedMistakesCount: number;
}

export const PerformanceTrackerView: React.FC<PerformanceTrackerViewProps> = ({
  recentResults,
  weaknesses,
  openMistakeBook,
  unresolvedMistakesCount,
}) => {
  const latestResult = recentResults[0];
  const projectedScore = latestResult ? latestResult.scoredMarks : 590;
  const targetScore = 680;
  const accuracy = latestResult ? latestResult.accuracyPercentage : 78;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Personalized Diagnostics
            </span>
            <span className="text-xs text-slate-400">&bull; AIIMS & GMC Predictor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Performance Analytics & Weakness Heatmap
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Real-time tracking of subject accuracy, negative mark leakages, speed velocity per question, 
            and chapter-by-chapter mastery thresholds.
          </p>
        </div>

        <button
          onClick={openMistakeBook}
          className="self-start md:self-auto flex items-center gap-2 px-5 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-bold text-sm border border-rose-500/30 transition-all"
        >
          <BookmarkCheck className="w-4 h-4 text-rose-400" />
          <span>Open Mistake Book ({unresolvedMistakesCount})</span>
        </button>
      </div>

      {/* Top 4 Diagnostic Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Estimated NEET Score</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-emerald-400">{projectedScore}</span>
            <span className="text-xs text-slate-400 font-medium">/ 720</span>
          </div>
          <p className="text-[11px] text-emerald-400 font-semibold pt-1">
            Govt Medical College Qualifying Range
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Predicted AIR Rank</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-cyan-300">
              ~{latestResult ? latestResult.estimatedAirRank.toLocaleString() : '3,840'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 pt-1 truncate">
            {latestResult ? latestResult.predictedCollege : 'AIIMS & Tier 1 State GMCs'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Overall Accuracy</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-amber-400">{accuracy}%</span>
          </div>
          <p className="text-[11px] text-amber-400/90 pt-1">
            Target &gt; 85% for top 1000 ranks
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Time Velocity</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-purple-400">54s</span>
            <span className="text-xs text-slate-400">/ question</span>
          </div>
          <p className="text-[11px] text-purple-400/90 pt-1">
            Optimal pace (NEET allows 60s per Q)
          </p>
        </div>
      </div>

      {/* Subject-Wise Mastery Radar */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
        <h3 className="font-bold text-slate-100 text-base">
          Subject-Wise Accuracy & Marks Distribution
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { subject: 'Botany', score: 165, max: 180, accuracy: 92, status: 'Mastered', color: 'from-emerald-500 to-teal-400' },
            { subject: 'Zoology', score: 155, max: 180, accuracy: 86, status: 'Strong', color: 'from-teal-500 to-cyan-400' },
            { subject: 'Chemistry', score: 140, max: 180, accuracy: 78, status: 'Needs Review', color: 'from-amber-500 to-yellow-400' },
            { subject: 'Physics', score: 130, max: 180, accuracy: 68, status: 'Critical Priority', color: 'from-rose-500 to-orange-400' },
          ].map((sub) => (
            <div key={sub.subject} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-200">{sub.subject}</span>
                <span className="text-xs font-mono font-bold text-slate-300">
                  {sub.score} / {sub.max}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${sub.color}`}
                  style={{ width: `${sub.accuracy}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Accuracy: <strong className="text-white">{sub.accuracy}%</strong></span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                  sub.accuracy >= 85 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {sub.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chapter Heatmap Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-100 text-base">
              Chapter-Wise Accuracy & Risk Breakdown
            </h3>
            <p className="text-xs text-slate-400">
              Directly influences your recommended study routine
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Chapter Title</th>
                <th className="py-3 px-4">Questions Attempted</th>
                <th className="py-3 px-4">Accuracy</th>
                <th className="py-3 px-4">Risk Status</th>
                <th className="py-3 px-4">Prescribed Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {weaknesses.map((w, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-300">{w.subject}</td>
                  <td className="py-3 px-4 font-semibold text-slate-100">{w.chapter}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{w.totalAttempts} Qs</td>
                  <td className="py-3 px-4 font-bold font-mono">
                    <span className={w.accuracy < 50 ? 'text-rose-400' : w.accuracy < 75 ? 'text-amber-400' : 'text-emerald-400'}>
                      {w.accuracy}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      w.status === 'Critical Alert'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : w.status === 'Needs Attention'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {w.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{w.recommendedAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
