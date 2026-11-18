'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { CandidateApplication, ApplicationStatus } from '@/lib/types';
import { 
  Search, 
  Filter, 
  ArrowUp, 
  ArrowDown, 
  Minus, 
  Check, 
  X, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle,
  Eye,
  Award,
  SlidersHorizontal,
  Flame
} from 'lucide-react';

export default function LeaderboardTable() {
  const { 
    candidates, 
    job, 
    role, 
    setSelectedCandidateId, 
    selectedCandidateId 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'OFFER_ZONE' | 'ADVANCING' | 'NOT_SELECTED'>('ALL');
  const [stageFilter, setStageFilter] = useState<number | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'rank' | 'score' | 'sla'>('rank');

  // Filter & Search Candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      // Search by pseudonym handle or candidate ID or full name
      const matchesSearch =
        c.pseudonymHandle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.candidateId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (role === 'recruiter' && c.fullName.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filter by status
      let matchesStatus = true;
      if (statusFilter === 'OFFER_ZONE') {
        matchesStatus = c.status === 'OFFER_ZONE' || c.status === 'OFFER_EXTENDED';
      } else if (statusFilter === 'ADVANCING') {
        matchesStatus = c.status === 'ADVANCING';
      } else if (statusFilter === 'NOT_SELECTED') {
        matchesStatus = c.status === 'NOT_SELECTED';
      }

      // Filter by stage cleared
      let matchesStage = true;
      if (stageFilter !== 'ALL') {
        matchesStage = c.clearedStages.includes(stageFilter);
      }

      return matchesSearch && matchesStatus && matchesStage;
    });
  }, [candidates, searchQuery, statusFilter, stageFilter, role]);

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

  const getStatusBadge = (status: ApplicationStatus, rank: number) => {
    switch (status) {
      case 'OFFER_EXTENDED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            Offer Extended
          </span>
        );
      case 'OFFER_ZONE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm shadow-amber-500/10">
            <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
            Offer Zone (#{rank})
          </span>
        );
      case 'ADVANCING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            <Check className="w-3 h-3 text-cyan-400" />
            Advancing
          </span>
        );
      case 'NOT_SELECTED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-300 border border-rose-500/30">
            <X className="w-3 h-3 text-rose-400" />
            Cutoff Missed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700">
            In Pipeline
          </span>
        );
    }
  };

  const getRankTrend = (current: number, previous?: number) => {
    if (!previous || previous === current) {
      return (
        <span className="text-zinc-500 flex items-center text-xs">
          <Minus className="w-3 h-3" />
        </span>
      );
    }
    if (current < previous) {
      const diff = previous - current;
      return (
        <span className="text-emerald-400 flex items-center text-xs font-semibold" title={`Advanced ${diff} spots`}>
          <ArrowUp className="w-3 h-3" />
          <span>{diff}</span>
        </span>
      );
    }
    const diff = current - previous;
    return (
      <span className="text-rose-400 flex items-center text-xs font-semibold" title={`Dropped ${diff} spots`}>
        <ArrowDown className="w-3 h-3" />
        <span>{diff}</span>
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      {/* Table Header & Controls Strip */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 mb-4 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <span>Cohort Live Leaderboard</span>
              <span className="text-xs font-mono font-normal bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full border border-zinc-700">
                {candidates.length} Verified Entries
              </span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Deterministic ranking updated in real-time. Strict candidate pseudonymity preserved.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search pseudonym or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/80 transition-colors"
              />
            </div>

            {/* Status Filter Pills */}
            <div className="flex items-center bg-zinc-950/60 p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  statusFilter === 'ALL'
                    ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                All ({candidates.length})
              </button>
              <button
                onClick={() => setStatusFilter('OFFER_ZONE')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  statusFilter === 'OFFER_ZONE'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Offer Zone (Top {job.openSeats})
              </button>
              <button
                onClick={() => setStatusFilter('ADVANCING')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  statusFilter === 'ADVANCING'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Advancing
              </button>
              <button
                onClick={() => setStatusFilter('NOT_SELECTED')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  statusFilter === 'NOT_SELECTED'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Cutoff Missed
              </button>
            </div>

            {/* Stage Filter Dropdown */}
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
              aria-label="Filter candidates by cleared stage"
              className="bg-zinc-950/80 border border-zinc-700/80 rounded-xl px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500/80"
            >
              <option value="ALL">All Stages</option>
              <option value="1">Cleared Stage 1 (Profile Audit)</option>
              <option value="2">Cleared Stage 2 (Blind Code)</option>
              <option value="3">Cleared Stage 3 (Domain Deep-Dive)</option>
              <option value="4">Cleared Stage 4 (System Design)</option>
              <option value="5">Cleared Stage 5 (Bar-Raiser)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Leaderboard Table */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950/60 text-zinc-400 text-[11px] font-semibold uppercase tracking-wider border-b border-zinc-800/80">
                <th className="py-3 px-4 w-16">Rank</th>
                <th className="py-3 px-4">Candidate Identity</th>
                <th className="py-3 px-4 text-center">Stage Gates (1–5)</th>
                <th className="py-3 px-4 text-center">Stage Points</th>
                <th className="py-3 px-4 text-right">Composite Score</th>
                <th className="py-3 px-4">Latest Evaluator Feedback</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-xs">
              {sortedCandidates.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-zinc-400">
                    <AlertCircle className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                    <p className="font-medium">No candidates match your current filter criteria.</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setStatusFilter('ALL');
                        setStageFilter('ALL');
                      }}
                      className="mt-2 text-xs text-emerald-400 hover:underline"
                    >
                      Clear all filters
                    </button>
                  </td>
                </tr>
              ) : (
                sortedCandidates.map((candidate) => {
                  const isYou = candidate.isCurrentUser || candidate.pseudonymHandle.includes('YOU');
                  const isOfferZone = candidate.currentRank <= job.openSeats && candidate.status !== 'NOT_SELECTED';
                  const isSelected = selectedCandidateId === candidate.id;
                  const latestEval = candidate.stageEvaluations[candidate.stageEvaluations.length - 1];

                  return (
                    <tr
                      key={candidate.id}
                      onClick={() => setSelectedCandidateId(candidate.id)}
                      className={`cursor-pointer transition-colors group ${
                        isYou
                          ? 'bg-emerald-950/20 hover:bg-emerald-950/35 border-l-4 border-l-emerald-500'
                          : isOfferZone
                          ? 'bg-amber-950/10 hover:bg-zinc-850/80'
                          : 'hover:bg-zinc-800/50'
                      } ${isSelected ? 'ring-1 ring-inset ring-emerald-500/50' : ''}`}
                    >
                      {/* Rank & Trend */}
                      <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`font-bold text-sm w-7 text-center ${
                              isOfferZone
                                ? 'text-amber-300'
                                : isYou
                                ? 'text-emerald-300 font-extrabold'
                                : 'text-zinc-300'
                            }`}
                          >
                            #{candidate.currentRank}
                          </span>
                          {getRankTrend(candidate.currentRank, candidate.previousRank)}
                        </div>
                      </td>

                      {/* Candidate Handle & Verification */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          {/* Avatar with status dot */}
                          <div className="relative">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700/80 flex items-center justify-center">
                              {candidate.avatar ? (
                                <img
                                  src={candidate.avatar}
                                  alt={candidate.pseudonymHandle}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="font-mono text-xs text-zinc-400 font-semibold">
                                  {candidate.pseudonymHandle.slice(0, 2).toUpperCase()}
                                </span>
                              )}
                            </div>
                            {isYou && (
                              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-zinc-950"></span>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`font-semibold tracking-tight ${
                                  isYou ? 'text-emerald-300' : 'text-zinc-200'
                                }`}
                              >
                                {candidate.pseudonymHandle}
                              </span>
                              {isYou && (
                                <span className="bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-1.5 py-0.2 rounded font-mono">
                                  YOU
                                </span>
                              )}
                              <span title="Cryptographically Verified ID">
                                <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
                              </span>
                            </div>

                            <div className="text-[11px] text-zinc-400 flex items-center gap-2 mt-0.5">
                              <span className="font-mono text-zinc-500">{candidate.candidateId}</span>
                              {role === 'recruiter' && (
                                <span className="text-zinc-400 font-medium">
                                  • {candidate.fullName}
                                </span>
                              )}
                              <span>• Top {(100 - candidate.percentile).toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 5-Node Stepper (Cleared Stages) */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          {[1, 2, 3, 4, 5].map((stageNum) => {
                            const isCleared = candidate.clearedStages.includes(stageNum);
                            const isCurrent = candidate.currentStageOrder === stageNum && candidate.status !== 'NOT_SELECTED';
                            const isFailed = candidate.status === 'NOT_SELECTED' && candidate.currentStageOrder === stageNum;

                            return (
                              <div key={stageNum} className="relative group/node">
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                                    isCleared
                                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                                      : isFailed
                                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50'
                                      : isCurrent
                                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 animate-pulse'
                                      : 'bg-zinc-800/60 text-zinc-500 border border-zinc-700/50'
                                  }`}
                                  title={`Stage ${stageNum}: ${
                                    isCleared
                                      ? 'Passed'
                                      : isFailed
                                      ? 'Cutoff Missed'
                                      : isCurrent
                                      ? 'Active Review'
                                      : 'Locked'
                                  }`}
                                >
                                  {isCleared ? (
                                    <Check className="w-3 h-3 text-emerald-400" />
                                  ) : isFailed ? (
                                    <X className="w-3 h-3 text-rose-400" />
                                  ) : (
                                    stageNum
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </td>

                      {/* Stage Points Mini Breakdown */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          {[1, 2, 3, 4, 5].map((sId) => {
                            const ev = candidate.stageEvaluations.find((e) => e.stageId === sId);
                            const pts = ev ? ev.totalScore : 0;
                            const max = job.stages.find((stg) => stg.id === sId)?.maxPoints || 100;
                            const pct = Math.min(100, Math.round((pts / max) * 100));

                            return (
                              <div
                                key={sId}
                                className="w-5 bg-zinc-800 rounded-sm h-6 overflow-hidden flex flex-col justify-end p-0.5"
                                title={`Stage ${sId}: ${pts} / ${max} pts`}
                              >
                                <div
                                  className={`w-full rounded-xs transition-all ${
                                    pts > 0 ? (ev && ev.totalScore >= (job.stages.find(stg => stg.id === sId)?.cutoffPoints || 0) ? 'bg-emerald-400' : 'bg-rose-400') : 'bg-transparent'
                                  }`}
                                  style={{ height: `${pct}%` }}
                                ></div>
                              </div>
                            );
                          })}
                        </div>
                      </td>

                      {/* Composite Score with Threshold Gauge */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap font-mono">
                        <div className="flex flex-col items-end">
                          <div className="flex items-baseline gap-1">
                            <span
                              className={`text-base font-bold ${
                                isOfferZone
                                  ? 'text-amber-300'
                                  : isYou
                                  ? 'text-emerald-400 font-extrabold'
                                  : candidate.compositeScore >= job.passingCompositeCutoff
                                  ? 'text-emerald-400'
                                  : 'text-zinc-200'
                              }`}
                            >
                              {candidate.compositeScore}
                            </span>
                            <span className="text-[10px] text-zinc-400">/ 1000</span>
                          </div>

                          {/* Mini Progress Bar */}
                          <div className="w-24 bg-zinc-800 rounded-full h-1.5 mt-1 overflow-hidden relative">
                            <div
                              className={`h-full rounded-full transition-all ${
                                isOfferZone
                                  ? 'bg-amber-400'
                                  : candidate.compositeScore >= job.passingCompositeCutoff
                                  ? 'bg-emerald-400'
                                  : 'bg-zinc-500'
                              }`}
                              style={{ width: `${(candidate.compositeScore / 1000) * 100}%` }}
                            ></div>
                            {/* Cutoff Marker */}
                            <div
                              className="absolute top-0 bottom-0 w-0.5 bg-zinc-400 z-10"
                              style={{ left: `${(job.passingCompositeCutoff / 1000) * 100}%` }}
                              title={`Cutoff: ${job.passingCompositeCutoff} pts`}
                            ></div>
                          </div>
                        </div>
                      </td>

                      {/* Latest Evaluator Remark Preview */}
                      <td className="py-3.5 px-4 max-w-xs truncate">
                        {latestEval ? (
                          <div className="text-zinc-300">
                            <p className="truncate italic text-[11px] text-zinc-300">
                              "{latestEval.strengthsRemark}"
                            </p>
                            <span className="text-[10px] text-zinc-400 font-mono">
                              By {latestEval.evaluatorRole.split('(')[0]}
                            </span>
                          </div>
                        ) : (
                          <span className="text-zinc-400 italic text-[11px]">
                            Awaiting initial review
                          </span>
                        )}
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        {getStatusBadge(candidate.status, candidate.currentRank)}
                      </td>

                      {/* Detail Arrow */}
                      <td className="py-3.5 px-4 text-right">
                        <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all" />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
