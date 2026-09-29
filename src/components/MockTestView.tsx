import React from 'react';
import { 
  FileText, 
  Clock, 
  Award, 
  Play, 
  TrendingUp, 
  RotateCcw, 
  CheckCircle2, 
  Calendar,
  Zap,
  Target,
  AlertTriangle
} from 'lucide-react';
import { MockTest, TestResult } from '../types/neet';
import { MOCK_TESTS } from '../data/mockTestsData';

interface MockTestViewProps {
  onStartTest: (testId: string) => void;
  recentResults: TestResult[];
}

export const MockTestView: React.FC<MockTestViewProps> = ({
  onStartTest,
  recentResults,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              NTA Exam Hall Simulation
            </span>
            <span className="text-xs text-slate-400">&bull; Latest 2026/2027 Pattern</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Daily Mock Tests & Grand Tests (720 Marks)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Simulate authentic exam conditions: Section A & B choice rules, negative marking calculations, 
            3 hr 20 min timer, and percentile benchmarks against 100,000+ serious medical aspirants.
          </p>
        </div>

        <button
          onClick={() => onStartTest('mock-daily-sprint-today')}
          className="self-start md:self-auto flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all hover:scale-[1.02]"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Start Today's Live Mock</span>
        </button>
      </div>

      {/* Available Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MOCK_TESTS.map((test) => {
          const isFull = test.category === 'Full-NEET-720';
          const isSprint = test.category === 'Daily-Sprint';

          return (
            <div
              key={test.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                isFull
                  ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                    isFull
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : isSprint
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    {test.dateTag || test.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {test.durationMinutes} Mins
                  </span>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-white leading-snug">
                  {test.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {test.description}
                </p>

                {/* Specs Box */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1.5 text-slate-300">
                  <div className="flex justify-between">
                    <span>Total Marks:</span>
                    <strong className="text-white">{test.totalMarks} Marks (+4, -1)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <strong className="text-white">{test.totalQuestions} Questions</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Subjects:</span>
                    <span className="text-slate-400">Physics, Chem, Botany, Zoology</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-800">
                <button
                  onClick={() => onStartTest(test.id)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                    isFull
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Test Now</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Past Mock Test Attempts Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-100 text-base">Your Mock Test Performance History</h3>
            <p className="text-xs text-slate-400">Track progress curves and projected AIR improvements</p>
          </div>
        </div>

        {recentResults.length === 0 ? (
          <div className="text-center py-8 bg-slate-950/40 rounded-xl border border-slate-800/80">
            <FileText className="w-10 h-10 text-slate-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No mock tests completed yet.</p>
            <p className="text-xs text-slate-500 mt-0.5">Start today's daily sprint above to establish your baseline score!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Test Title</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Accuracy</th>
                  <th className="py-3 px-4">Estimated AIR</th>
                  <th className="py-3 px-4">Target GMC Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recentResults.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-200">{res.testTitle}</td>
                    <td className="py-3 px-4 text-slate-400">{res.completedAt}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                      {res.scoredMarks} / {res.totalMarks}
                    </td>
                    <td className="py-3 px-4 font-semibold text-amber-400">{res.accuracyPercentage}%</td>
                    <td className="py-3 px-4 font-mono text-cyan-300">~{res.estimatedAirRank.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-medium text-slate-300 border border-slate-700">
                        {res.predictedCollege}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
