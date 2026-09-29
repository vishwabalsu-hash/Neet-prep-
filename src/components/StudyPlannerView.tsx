import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Flame, 
  Target, 
  RotateCcw, 
  Plus, 
  BookOpen, 
  FileText, 
  Loader2,
  BookmarkCheck
} from 'lucide-react';
import { StudyTask, WeaknessInsight } from '../types/neet';
import { generateAdaptiveSchedulePlan } from '../services/apiService';

interface StudyPlannerViewProps {
  tasks: StudyTask[];
  onToggleTask: (taskId: string) => void;
  onUpdateTasks: (tasks: StudyTask[]) => void;
  weaknesses: WeaknessInsight[];
}

export const StudyPlannerView: React.FC<StudyPlannerViewProps> = ({
  tasks,
  onToggleTask,
  onUpdateTasks,
  weaknesses,
}) => {
  const [dailyHours, setDailyHours] = useState<number>(8);
  const [targetScore, setTargetScore] = useState<number>(680);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);
  const [aiPlanSummary, setAiPlanSummary] = useState<string | null>(null);

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const handleGenerateAdaptivePlan = async () => {
    setIsGeneratingPlan(true);
    try {
      const weakChapterNames = weaknesses.map(w => `${w.subject}: ${w.chapter}`);
      const res = await generateAdaptiveSchedulePlan({
        weakTopics: weakChapterNames,
        currentScore: 590,
        targetScore,
        dailyHours,
      });

      if (res && res.plan && res.plan.recommendedDailyRoutine) {
        const newTasks: StudyTask[] = res.plan.recommendedDailyRoutine.map((r: any, idx: number) => ({
          id: 'task-ai-' + Date.now() + '-' + idx,
          timeSlot: r.time,
          subject: r.focus.includes('Physics') ? 'Physics' : r.focus.includes('Chemistry') ? 'Chemistry' : 'Botany',
          chapter: r.focus,
          taskType: r.slot.includes('NCERT') ? 'NCERT_READ' : r.slot.includes('PYQ') ? 'PYQ_PRACTICE' : 'MOCK_TEST',
          completed: false,
          priority: idx < 2 ? 'CRITICAL' : 'HIGH',
          description: `${r.slot}: ${r.notes || ''}`
        }));

        onUpdateTasks(newTasks);
        setAiPlanSummary(res.plan.headline || 'Adaptive weakness schedule updated successfully.');
      }
    } catch (e) {
      console.error('Error generating plan:', e);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Personalized Weakness-Based Planner
            </span>
            <span className="text-xs text-slate-400">&bull; Spaced Repetition Cycles</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Adaptive Study Timetable & Recovery Routine
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Never study blindly. Your daily schedule dynamically adjusts based on the chapters where you lost marks in mock tests.
          </p>
        </div>

        {/* Daily Streak & Completion Status */}
        <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl flex items-center gap-5 text-xs">
          <div>
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Flame className="w-4 h-4" />
              <span>18 Days Streak</span>
            </div>
            <p className="text-slate-400 text-[11px] mt-0.5">Consecutive Mock & Study Days</p>
          </div>
          <div className="h-8 w-[1px] bg-slate-800" />
          <div>
            <p className="text-slate-400">Today's Target</p>
            <p className="text-lg font-mono font-bold text-emerald-400">
              {completedCount} / {tasks.length} Completed ({progressPercent}%)
            </p>
          </div>
        </div>
      </div>

      {/* AI Adaptive Generator Bar */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/20 via-slate-900 to-slate-900 border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-100">
              Recalculate Schedule Based on Latest Test Mistakes
            </h4>
            <p className="text-xs text-slate-400">
              Reallocates hours to lowest accuracy chapters (e.g. Rotational Motion, Coordination Compounds)
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span>Daily Hours:</span>
            <select
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
              className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-white"
            >
              <option value={6}>6 hrs</option>
              <option value={8}>8 hrs</option>
              <option value={10}>10 hrs</option>
              <option value={12}>12 hrs (Full-time)</option>
            </select>
          </div>

          <button
            onClick={handleGenerateAdaptivePlan}
            disabled={isGeneratingPlan}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold text-xs shadow-md hover:brightness-110 disabled:opacity-50 transition-all"
          >
            {isGeneratingPlan ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Optimizing Schedule...</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-4 h-4" />
                <span>Auto-Adapt Timetable</span>
              </>
            )}
          </button>
        </div>
      </div>

      {aiPlanSummary && (
        <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-200 flex items-center justify-between">
          <span>{aiPlanSummary}</span>
          <button onClick={() => setAiPlanSummary(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Main Grid: Left Tasks Timetable, Right Weakness Insights & Spaced Repetition */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Tasks Timetable */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-100 text-base">
                Today's High-Yield Action Timetable
              </h3>
              <p className="text-xs text-slate-400">
                Tick off sessions as you complete them to maintain your study velocity
              </p>
            </div>
            <span className="text-xs text-slate-400">
              {progressPercent}% Complete
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Tasks List */}
          <div className="space-y-3 pt-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onToggleTask(task.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  task.completed
                    ? 'bg-slate-950/40 border-slate-800/80 opacity-70'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                  task.completed
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'border-slate-600 bg-slate-900 hover:border-emerald-400'
                }`}>
                  {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-emerald-400 font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.timeSlot}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-slate-800 text-slate-300">
                        {task.subject}
                      </span>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      task.priority === 'CRITICAL'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        : task.priority === 'HIGH'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {task.priority} Priority
                    </span>
                  </div>

                  <p className={`text-xs sm:text-sm font-semibold ${task.completed ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                    {task.chapter}
                  </p>

                  <p className="text-xs text-slate-400">
                    {task.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Spaced Repetition Cycles & Weakness Priority */}
        <div className="space-y-6">
          {/* Spaced Repetition Box */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
              <RotateCcw className="w-4 h-4" />
              <span>Spaced Repetition Review Cycles</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Based on the Ebbinghaus forgetting curve, revision must happen at Day 1, 3, 7, and 21 to lock into long-term memory for NEET UG.
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-200">Day 1 Review (Tomorrow)</p>
                  <p className="text-[11px] text-slate-400">Incomplete Dominance & Linkage (Botany)</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  Scheduled
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-200">Day 3 Review (In 2 Days)</p>
                  <p className="text-[11px] text-slate-400">Rolling on Incline & Moment of Inertia (Physics)</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                  Due Soon
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-200">Day 7 Cycle</p>
                  <p className="text-[11px] text-slate-400">Placentation & Floral Formulas (Biology)</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  Upcoming
                </span>
              </div>
            </div>
          </div>

          {/* Golden Rules */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2.5">
            <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>NEET Revision Discipline</span>
            </h4>
            <ul className="space-y-1.5 text-slate-400 list-disc list-inside">
              <li>Morning slots (06:00 - 08:30) are strictly for NCERT line-by-line reading.</li>
              <li>Evening slots (16:00 - 18:00) simulate exam pressure with 45-question speed tests.</li>
              <li>Never sleep without reviewing every question in your Mistake Book.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
