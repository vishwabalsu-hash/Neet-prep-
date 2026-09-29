import React, { useState } from 'react';
import { X, Send, Sparkles, AlertCircle, HelpCircle, Loader2, Stethoscope, BookOpen } from 'lucide-react';
import { SubjectType, ClassLevel, DoubtPost } from '../types/neet';
import { askMentorDoubt } from '../services/apiService';

interface AskDoubtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDoubtCreated: (post: DoubtPost) => void;
}

export const AskDoubtModal: React.FC<AskDoubtModalProps> = ({
  isOpen,
  onClose,
  onDoubtCreated,
}) => {
  const [subject, setSubject] = useState<SubjectType>('Physics');
  const [classLevel, setClassLevel] = useState<ClassLevel>('Class 11');
  const [chapter, setChapter] = useState('');
  const [title, setTitle] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [userAttempt, setUserAttempt] = useState('');
  const [instantMentorReview, setInstantMentorReview] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !questionText.trim()) {
      setErrorMessage('Please provide a title and detailed question statement.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      let mentorReplyData = undefined;

      if (instantMentorReview) {
        const response = await askMentorDoubt({
          subject,
          classLevel,
          chapter: chapter || 'General Core Subject',
          question: `${title}\n${questionText}`,
          studentThought: userAttempt,
        });

        if (response && response.mentorReply) {
          const r = response.mentorReply;
          mentorReplyData = {
            mentorName: r.mentorName || 'Dr. Vikram Sen (AIIMS Delhi)',
            mentorRole: r.mentorTitle || 'Senior NEET UG Medical Mentor',
            verified: true,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
            content: r.content || (Array.isArray(r.stepByStepSolution) ? r.stepByStepSolution.join('\n\n') : 'Verified NCERT solution.'),
            ncertCitation: r.ncertReference || `NCERT Class ${classLevel} ${subject}`,
            date: 'Just now',
          };
        }
      }

      const newPost: DoubtPost = {
        id: 'doubt-' + Date.now(),
        studentName: 'Vishwa (You)',
        studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
        title,
        subject,
        classLevel,
        chapter: chapter || 'Core Topic',
        questionText,
        userAttempt,
        upvotes: 1,
        userUpvoted: true,
        status: mentorReplyData ? 'MENTOR_ANSWERED' : 'DISCUSSING',
        mentorReply: mentorReplyData,
        repliesCount: mentorReplyData ? 1 : 0,
        createdAt: 'Just now',
      };

      onDoubtCreated(newPost);
      onClose();
    } catch (err: any) {
      console.error('Error submitting doubt:', err);
      setErrorMessage('Failed to submit doubt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-lg">Ask NEET Subject Specialists & Mentors</h3>
              <p className="text-xs text-slate-400">Get NCERT line-referenced solutions and trap analyses</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs sm:text-sm">
          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Subject & Class Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as SubjectType)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Botany">Biology (Botany)</option>
                <option value="Zoology">Biology (Zoology)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs">Class Level</label>
              <select
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value as ClassLevel)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs">Chapter Name</label>
              <input
                type="text"
                placeholder="e.g. Rotational Motion"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Doubt Title */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1 text-xs">Doubt Title / Core Question</label>
            <input
              type="text"
              placeholder="e.g. Why does solid sphere roll down faster than disc on incline?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-medium"
              required
            />
          </div>

          {/* Question Body */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1 text-xs">Detailed Question Statement & Options</label>
            <textarea
              rows={4}
              placeholder="Paste or type the full question, given values, options, and what part you are stuck on..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          {/* Student Thought / Attempt */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1 text-xs">Your Attempt / Thinking (Optional)</label>
            <input
              type="text"
              placeholder="e.g. I used standard formula but got negative value; where is my sign error?"
              value={userAttempt}
              onChange={(e) => setUserAttempt(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Instant AI Specialist Resolution Checkbox */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-xs font-bold text-slate-100">
                  Instant AIIMS/Kota Mentor Breakdown
                </p>
                <p className="text-[11px] text-slate-400">
                  Synthesize immediate step-by-step NCERT resolution and NEET trap analysis
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={instantMentorReview}
              onChange={(e) => setInstantMentorReview(e.target.checked)}
              className="w-4 h-4 accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold hover:brightness-110 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Consulting Mentor...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Doubt</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
