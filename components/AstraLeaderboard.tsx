'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { CandidateApplication, ApplicationStatus } from '@/lib/types';
import { 
  Search, 
  SlidersHorizontal, 
  Bookmark, 
  BookmarkCheck, 
  ChevronRight, 
  ChevronLeft, 
  Pause, 
  Play, 
  Flame, 
  Zap, 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  X, 
  Sparkles, 
  Clock, 
  ArrowUp, 
  ArrowDown, 
  Minus,
  HelpCircle
} from 'lucide-react';

interface AstraLeaderboardProps {
  sortBy: 'rank' | 'score' | 'sla';
  setSortBy: (val: 'rank' | 'score' | 'sla') => void;
  statusFilter: 'ALL' | 'OFFER_ZONE' | 'ADVANCING' | 'NOT_SELECTED';
  setStatusFilter: (val: 'ALL' | 'OFFER_ZONE' | 'ADVANCING' | 'NOT_SELECTED') => void;
  stageFilter: number | 'ALL';
  setStageFilter: (val: number | 'ALL') => void;
  selectedStack: string | null;
  onOpenMobileFilters?: () => void;
}

export default function AstraLeaderboard({
  sortBy,
  setSortBy,
  statusFilter,
  setStatusFilter,
  stageFilter,
  setStageFilter,
  selectedStack,
  onOpenMobileFilters
}: AstraLeaderboardProps) {
  const { 
    candidates, 
    job, 
    role, 
    setSelectedCandidateId, 
    selectedCandidateId 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'offer_zone' | 'advancing' | 'missed' | 'you'>('all');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['app-004']);
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(true);

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter logic
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      // Tab filter
      if (activeTab === 'offer_zone') {
        if (c.status !== 'OFFER_ZONE' && c.status !== 'OFFER_EXTENDED') return false;
      } else if (activeTab === 'advancing') {
        if (c.status !== 'ADVANCING') return false;
      } else if (activeTab === 'missed') {
        if (c.status !== 'NOT_SELECTED') return false;
      } else if (activeTab === 'you') {
        if (!c.isCurrentUser && !c.pseudonymHandle.includes('YOU')) return false;
      }

      // Status pill filter
      if (statusFilter === 'OFFER_ZONE') {
        if (c.status !== 'OFFER_ZONE' && c.status !== 'OFFER_EXTENDED') return false;
      } else if (statusFilter === 'ADVANCING') {
        if (c.status !== 'ADVANCING') return false;
      } else if (statusFilter === 'NOT_SELECTED') {
        if (c.status !== 'NOT_SELECTED') return false;
      }

      // Stage filter
      if (stageFilter !== 'ALL') {
        if (!c.clearedStages.includes(stageFilter)) return false;
      }

      // Stack filter
      if (selectedStack) {
        const matchesStack = c.profileData.primaryStack.some((st) =>
          selectedStack.toLowerCase().includes(st.toLowerCase()) ||
          st.toLowerCase().includes(selectedStack.toLowerCase().split('/')[0].trim())
        );
        if (!matchesStack) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.pseudonymHandle.toLowerCase().includes(q);
        const matchesId = c.candidateId.toLowerCase().includes(q);
        const matchesReal = role === 'recruiter' && c.fullName.toLowerCase().includes(q);
        const matchesStack = c.profileData.primaryStack.some((st) => st.toLowerCase().includes(q));
        if (!matchesName && !matchesId && !matchesReal && !matchesStack) return false;
      }

      return true;
    });
  }, [candidates, activeTab, statusFilter, stageFilter, selectedStack, searchQuery, role]);

  const sortedCandidates = useMemo(() => {
    return [...filteredCandidates].sort((a, b) => {
      if (sortBy === 'score') {
        return b.compositeScore - a.compositeScore;
      }
      if (sortBy === 'sla') {
        return a.currentStageSlaDue.localeCompare(b.currentStageSlaDue);
      }
      return a.currentRank - b.currentRank;
    });
  }, [filteredCandidates, sortBy]);

  const getRankTrend = (current: number, previous?: number) => {
    if (!previous || previous === current) {
      return <Minus className="w-3 h-3 text-zinc-500" />;
    }
    if (current < previous) {
      const diff = previous - current;
      return (
        <span className="flex items-center text-emerald-400 font-mono font-bold text-[11px]">
          <ArrowUp className="w-3 h-3" />
          {diff}
        </span>
      );
    }
    const diff = current - previous;
    return (
      <span className="flex items-center text-rose-400 font-mono font-bold text-[11px]">
        <ArrowDown className="w-3 h-3" />
        {diff}
      </span>
    );
  };

  // Stage Velocity Carousel Items
  const stageCarouselItems = [
    {
      company: 'Tekion',
      title: 'Stage 1: Proof-of-Work',
      badge: '10% wt • 65 cut',
      status: '21 cleared • 24 open',
      color: 'bg-emerald-600'
    },
    {
      company: 'Swiggy',
      title: 'Stage 2: Blind Code',
      badge: '25% wt • 175 cut',
      status: '18 cleared • 21 open',
      color: 'bg-orange-500'
    },
    {
      company: 'Marriott',
      title: 'Stage 3: Domain Deep-Dive',
      badge: '30% wt • 210 cut',
      status: '12 cleared • 18 open',
      color: 'bg-red-600'
    },
    {
      company: 'Citi',
      title: 'Stage 4: System Design',
      badge: '20% wt • 140 cut',
      status: '7 cleared • 12 open',
      color: 'bg-blue-600'
    },
    {
      company: 'Stripe',
      title: 'Stage 5: Bar-Raiser',
      badge: '15% wt • 105 cut',
      status: '3 in Offer Zone',
      color: 'bg-purple-600'
    }
  ];

  return (
    <div className="flex-1 bg-[#090a0c] min-h-screen text-zinc-200 font-sans p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full">
      {/* Header matching Astra screenshot */}
      <div className="flex items-start justify-between pb-4 border-b border-[#1c1e22]">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-100 tracking-tight flex items-center gap-2">
            <span>Jobs</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Every open role we track, checked daily with deterministic live leaderboard rankings.
          </p>
        </div>

        <button
          onClick={() => {
            const you = candidates.find((c) => c.isCurrentUser);
            if (you) setSelectedCandidateId(you.id);
          }}
          className="text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition-colors flex items-center gap-1 cursor-pointer pt-1"
        >
          <span>Saved & applied</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Horizontal Navigation Tabs matching Astra's "For you", "All jobs 3,915", "Categories", "From resume" */}
      <div className="flex items-center gap-6 mt-4 border-b border-[#1c1e22] text-xs font-medium overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 transition-colors relative flex items-center gap-1.5 ${
            activeTab === 'all'
              ? 'text-zinc-100 font-bold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span>All candidates</span>
          <span className="text-[10px] font-mono bg-[#16181c] text-zinc-400 px-1.5 py-0.2 rounded border border-[#23262d]">
            {candidates.length}
          </span>
          {activeTab === 'all' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-100 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('offer_zone')}
          className={`pb-3 transition-colors relative flex items-center gap-1.5 ${
            activeTab === 'offer_zone'
              ? 'text-amber-300 font-bold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span>Offer Zone</span>
          <span className="text-[10px] font-mono bg-amber-500/15 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">
            Top {job.openSeats}
          </span>
          {activeTab === 'offer_zone' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('advancing')}
          className={`pb-3 transition-colors relative flex items-center gap-1.5 ${
            activeTab === 'advancing'
              ? 'text-cyan-300 font-bold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span>Advancing Pipeline</span>
          <span className="text-[10px] font-mono text-zinc-500">
            {candidates.filter(c => c.status === 'ADVANCING').length}
          </span>
          {activeTab === 'advancing' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('missed')}
          className={`pb-3 transition-colors relative flex items-center gap-1.5 ${
            activeTab === 'missed'
              ? 'text-rose-300 font-bold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span>Cutoff Missed (Permanent Records)</span>
          {activeTab === 'missed' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-400 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('you')}
          className={`pb-3 transition-colors relative flex items-center gap-1.5 ${
            activeTab === 'you'
              ? 'text-emerald-300 font-bold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>My Standing (YOU #4)</span>
          {activeTab === 'you' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
          )}
        </button>
      </div>

      {/* Search Input Bar & Filter Toggle matching Astra */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 bg-[#121418] border border-[#1f2229] rounded-xl text-xs text-zinc-300 focus-within:border-zinc-500 transition-colors">
            <Search className="w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search role or candidate pseudonym..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-zinc-100 placeholder:text-zinc-500 text-xs"
            />
          </div>

          <button 
            onClick={onOpenMobileFilters}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#121418] border border-[#1f2229] hover:bg-[#181a20] rounded-xl text-xs font-semibold text-zinc-300 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
            <span>Filters</span>
          </button>
        </div>

        {/* Quick Tag Chips matching Astra's "🔥 Top paying 803", "✨ Fresher friendly", etc. */}
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 text-xs">
          <button
            onClick={() => setStatusFilter(statusFilter === 'OFFER_ZONE' ? 'ALL' : 'OFFER_ZONE')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
              statusFilter === 'OFFER_ZONE'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-[#121418] text-zinc-300 border-[#1f2229] hover:bg-[#181a20]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Top scoring &gt; 695</span>
            <span className="text-[10px] font-mono text-zinc-500">
              {candidates.filter(c => c.compositeScore >= 695).length}
            </span>
          </button>

          <button
            onClick={() => setStageFilter(stageFilter === 2 ? 'ALL' : 2)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
              stageFilter === 2
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                : 'bg-[#121418] text-zinc-300 border-[#1f2229] hover:bg-[#181a20]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Blind code cleared</span>
            <span className="text-[10px] font-mono text-zinc-500">18</span>
          </button>

          <button
            onClick={() => setStageFilter(stageFilter === 4 ? 'ALL' : 4)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
              stageFilter === 4
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-sm'
                : 'bg-[#121418] text-zinc-300 border-[#1f2229] hover:bg-[#181a20]'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>System design cleared</span>
            <span className="text-[10px] font-mono text-zinc-500">7</span>
          </button>

          <button
            onClick={() => setStatusFilter(statusFilter === 'NOT_SELECTED' ? 'ALL' : 'NOT_SELECTED')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
              statusFilter === 'NOT_SELECTED'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm'
                : 'bg-[#121418] text-zinc-300 border-[#1f2229] hover:bg-[#181a20]'
            }`}
          >
            <span>Cutoff missed archives</span>
            <span className="text-[10px] font-mono text-zinc-500">5</span>
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Section matching Astra's "● Hiring now Most new roles this week" */}
      <div className="mt-6 p-4 rounded-2xl bg-[#0f1013] border border-[#1b1d22]">
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-zinc-100">Hiring now</span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-400">Most active stage velocity this week</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-500">
            <button className="p-1 hover:text-zinc-200 transition-colors">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 hover:text-zinc-200 transition-colors">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setIsCarouselPlaying(!isCarouselPlaying)}
              className="p-1 hover:text-zinc-200 transition-colors"
            >
              {isCarouselPlaying ? (
                <Pause className="w-3 h-3 text-emerald-400" />
              ) : (
                <Play className="w-3 h-3 text-zinc-400" />
              )}
            </button>
          </div>
        </div>

        {/* Carousel Row Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {stageCarouselItems.slice(0, 4).map((item, idx) => (
            <div
              key={item.title}
              className="p-2.5 rounded-xl bg-[#14161a] border border-[#20232a] flex items-center gap-2.5 hover:border-zinc-700 transition-colors cursor-pointer"
              onClick={() => setStageFilter(idx + 1)}
            >
              <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center font-bold text-xs text-white shadow-sm flex-shrink-0`}>
                {item.company.slice(0, 2).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-xs text-zinc-200 truncate">{item.company}</div>
                <div className="text-[10px] text-zinc-500 truncate">{item.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Candidate Card Rows matching Astra's Job Cards */}
      <div className="mt-6 space-y-2">
        {sortedCandidates.length === 0 ? (
          <div className="py-16 text-center text-zinc-500 text-xs">
            <p>No candidates match your current filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('ALL');
                setStageFilter('ALL');
                setActiveTab('all');
              }}
              className="mt-2 text-blue-400 hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          sortedCandidates.map((candidate) => {
            const isYou = candidate.isCurrentUser || candidate.pseudonymHandle.includes('YOU');
            const isOfferZone = candidate.currentRank <= job.openSeats && candidate.status !== 'NOT_SELECTED';
            const isBookmarked = bookmarkedIds.includes(candidate.id);
            const latestEval = candidate.stageEvaluations[candidate.stageEvaluations.length - 1];

            return (
              <div
                key={candidate.id}
                onClick={() => setSelectedCandidateId(candidate.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group ${
                  isYou
                    ? 'bg-[#121915] border-emerald-500/40 hover:bg-[#15201a] shadow-sm'
                    : isOfferZone
                    ? 'bg-[#151518] border-[#252830] hover:bg-[#1a1b20]'
                    : 'bg-[#121417] border-[#1d2026] hover:bg-[#17191e]'
                } ${selectedCandidateId === candidate.id ? 'ring-1 ring-blue-500' : ''}`}
              >
                {/* Left Side: Avatar/Logo + Info */}
                <div className="flex items-start gap-3.5">
                  {/* Company / Candidate Logo Box */}
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center p-1 shadow-md flex-shrink-0 relative overflow-hidden">
                    {candidate.avatar ? (
                      <img
                        src={candidate.avatar}
                        alt={candidate.pseudonymHandle}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="font-extrabold text-sm text-zinc-900 font-mono">
                        {candidate.pseudonymHandle.slice(0, 2).toUpperCase()}
                      </span>
                    )}

                    {isYou && (
                      <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-bl-md" />
                    )}
                  </div>

                  {/* Information Details */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-bold text-sm tracking-tight ${isYou ? 'text-emerald-300' : 'text-zinc-100'}`}>
                        {candidate.pseudonymHandle}
                      </span>

                      {isYou && (
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-mono font-bold">
                          YOU
                        </span>
                      )}

                      {/* Rank badge */}
                      <span className="text-[11px] font-mono font-bold text-zinc-400 flex items-center gap-1">
                        <span>#{candidate.currentRank}</span>
                        {getRankTrend(candidate.currentRank, candidate.previousRank)}
                      </span>

                      {/* Status Tag */}
                      {candidate.status === 'OFFER_ZONE' || candidate.status === 'OFFER_EXTENDED' ? (
                        <span className="text-[10px] px-2 py-0.2 rounded-full font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1 font-mono">
                          <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                          Offer Zone
                        </span>
                      ) : candidate.status === 'NOT_SELECTED' ? (
                        <span className="text-[10px] px-2 py-0.2 rounded-full font-medium bg-rose-500/15 text-rose-300 border border-rose-500/30 font-mono">
                          Cutoff Missed
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.2 rounded-full font-medium bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-mono">
                          Advancing
                        </span>
                      )}
                    </div>

                    {/* Role & Location Subtitle */}
                    <div className="text-xs text-zinc-400 flex items-center gap-1.5 flex-wrap">
                      <span className="text-zinc-300 font-medium">{job.title}</span>
                      <span className="text-zinc-600">•</span>
                      <span>{candidate.profileData.maskedInBlind.location}</span>
                      {role === 'recruiter' && (
                        <>
                          <span className="text-zinc-600">•</span>
                          <span className="text-zinc-400 font-mono font-bold">
                            {candidate.fullName}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Stepper + Evaluation Snippet */}
                    <div className="flex items-center gap-3 pt-1 flex-wrap">
                      {/* 5-node stepper */}
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((sId) => {
                          const isCleared = candidate.clearedStages.includes(sId);
                          const isCurrent = candidate.currentStageOrder === sId && candidate.status !== 'NOT_SELECTED';
                          const isMissed = candidate.status === 'NOT_SELECTED' && candidate.currentStageOrder === sId;

                          return (
                            <div
                              key={sId}
                              className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-mono font-bold ${
                                isCleared
                                  ? 'bg-emerald-500/25 text-emerald-400 border border-emerald-500/50'
                                  : isMissed
                                  ? 'bg-rose-500/25 text-rose-400 border border-rose-500/50'
                                  : isCurrent
                                  ? 'bg-amber-500/25 text-amber-300 border border-amber-500/50 animate-pulse'
                                  : 'bg-zinc-800 text-zinc-500 border border-zinc-700/40'
                              }`}
                            >
                              {isCleared ? '✓' : isMissed ? '✕' : sId}
                            </div>
                          );
                        })}
                      </div>

                      {/* Time ago & Evaluator remark */}
                      <div className="text-[11px] text-zinc-500 flex items-center gap-1 truncate max-w-sm">
                        <Clock className="w-3 h-3 text-zinc-600 flex-shrink-0" />
                        <span className="truncate">
                          {latestEval ? `"${latestEval.strengthsRemark.slice(0, 55)}..."` : '3 hours ago'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Composite Score & Save Button matching Astra's ₹6-11 LPA */}
                <div className="flex items-center justify-between sm:justify-end gap-4 pl-14 sm:pl-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1c1f25]">
                  <div className="text-left sm:text-right font-mono">
                    <div className="font-bold text-sm text-zinc-100 flex items-baseline gap-1">
                      <span className={isOfferZone ? 'text-amber-300 font-extrabold' : isYou ? 'text-emerald-400 font-extrabold' : 'text-zinc-200'}>
                        {candidate.compositeScore}
                      </span>
                      <span className="text-[11px] text-zinc-500 font-normal">/ 1000 PTS</span>
                    </div>
                    <div className="text-[10px] text-zinc-500">
                      Top {(100 - candidate.percentile).toFixed(1)}% cohort
                    </div>
                  </div>

                  <button
                    onClick={(e) => toggleBookmark(e, candidate.id)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-[#1a1c22] transition-colors"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
