import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageSquare, 
  ThumbsUp, 
  CheckCircle2, 
  Plus, 
  Search, 
  Stethoscope, 
  Sparkles, 
  BookOpen, 
  Award, 
  Filter,
  UserCheck
} from 'lucide-react';
import { DoubtPost, SubjectType } from '../types/neet';
import { INITIAL_FORUM_POSTS } from '../data/forumData';

interface DoubtForumViewProps {
  doubts: DoubtPost[];
  onOpenAskModal: () => void;
  onUpvoteDoubt: (doubtId: string) => void;
}

export const DoubtForumView: React.FC<DoubtForumViewProps> = ({
  doubts,
  onOpenAskModal,
  onUpvoteDoubt,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDoubts = doubts.filter((d) => {
    const matchSubject = selectedSubject === 'All' || d.subject === selectedSubject;
    const matchStatus = selectedStatus === 'All' || d.status === selectedStatus;
    const matchSearch = 
      !searchQuery.trim() ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.chapter.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSubject && matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Forum Hero Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Verified Medical Mentors & Specialists
            </span>
            <span className="text-xs text-slate-400">&bull; AIIMS, MAMC & Kota Faculty</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            NEET UG Doubt-Clearing Community
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Never let a conceptual doubt linger. Get verified step-by-step explanations, NCERT page references, 
            and memory mnemonics curated by top medical mentors and subject matter specialists.
          </p>
        </div>

        <button
          onClick={onOpenAskModal}
          className="self-start md:self-auto flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Ask a Doubt</span>
        </button>
      </div>

      {/* Specialist Faculty Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <span>Online Mentors & Subject Specialists Today</span>
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {[
            {
              name: 'Dr. Vikram Sen',
              role: 'AIIMS Delhi Alumnus | NEET AIR 34',
              subject: 'Physics & High-Yield Strategy',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face'
            },
            {
              name: 'Dr. Sneha Rao',
              role: 'MAMC Delhi Alumna | Senior Biology Faculty',
              subject: 'Botany & Genetics Master',
              avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face'
            },
            {
              name: 'Prof. K. R. Verma',
              role: 'Ex-Kota Senior HOD (16+ yrs)',
              subject: 'Mechanics & Electrodynamics',
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
            },
            {
              name: 'Dr. Arvind Gupta',
              role: 'IIT-BHU & Medical Entrance Specialist',
              subject: 'Physical & Organic Chemistry',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
            },
          ].map((m, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover border border-emerald-500/40" />
              <div className="overflow-hidden">
                <p className="font-bold text-slate-200 truncate flex items-center gap-1">
                  <span>{m.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />
                </p>
                <p className="text-[10px] text-slate-400 truncate">{m.role}</p>
                <p className="text-[10px] text-emerald-400 font-semibold truncate">{m.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search doubts by topic, chapter, or formula..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Physics', 'Chemistry', 'Botany', 'Zoology'].map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                selectedSubject === sub
                  ? 'bg-cyan-500 text-white font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Doubt Posts List */}
      <div className="space-y-4">
        {filteredDoubts.map((doubt) => (
          <div
            key={doubt.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700/80 transition-all space-y-4 shadow-sm"
          >
            {/* Post Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={doubt.studentAvatar}
                  alt={doubt.studentName}
                  className="w-9 h-9 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-200">{doubt.studentName}</span>
                    <span className="text-[11px] text-slate-500">&bull; {doubt.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span className="px-1.5 py-0.2 rounded font-bold bg-slate-800 text-slate-300">
                      {doubt.subject}
                    </span>
                    <span>{doubt.classLevel}</span>
                    <span>&bull;</span>
                    <span className="text-slate-300">{doubt.chapter}</span>
                  </div>
                </div>
              </div>

              {/* Verified Mentor status badge */}
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1 border ${
                doubt.status === 'MENTOR_ANSWERED'
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              }`}>
                {doubt.status === 'MENTOR_ANSWERED' ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Mentor Verified</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-3 h-3 text-amber-400" />
                    <span>Under Discussion</span>
                  </>
                )}
              </span>
            </div>

            {/* Title & Question Statement */}
            <div className="space-y-1.5">
              <h4 className="font-bold text-sm sm:text-base text-slate-100">
                {doubt.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {doubt.questionText}
              </p>

              {doubt.userAttempt && (
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Student's Initial Attempt:</span> {doubt.userAttempt}
                </div>
              )}
            </div>

            {/* Mentor Verified Answer Box */}
            {doubt.mentorReply && (
              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={doubt.mentorReply.avatar}
                      alt={doubt.mentorReply.mentorName}
                      className="w-8 h-8 rounded-full object-cover border border-emerald-500"
                    />
                    <div>
                      <p className="font-bold text-xs text-emerald-300 flex items-center gap-1">
                        <span>{doubt.mentorReply.mentorName}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />
                      </p>
                      <p className="text-[10px] text-slate-400">{doubt.mentorReply.mentorRole}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500">{doubt.mentorReply.date}</span>
                </div>

                <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                  {doubt.mentorReply.content}
                </div>

                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold pt-1 border-t border-slate-800/60">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>NCERT Citation: {doubt.mentorReply.ncertCitation}</span>
                </div>
              </div>
            )}

            {/* Post Footer Action: Upvote and Comments count */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
              <button
                onClick={() => onUpvoteDoubt(doubt.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                  doubt.userUpvoted
                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Upvote ({doubt.upvotes})</span>
              </button>

              <div className="flex items-center gap-1.5 text-slate-400">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{doubt.repliesCount} Answers / Comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
