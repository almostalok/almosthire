'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Users, 
  Target, 
  Trophy, 
  Clock, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2,
  Zap,
  HelpCircle
} from 'lucide-react';

export default function KPIStrip() {
  const { candidates, currentUserCandidate, job, role } = useApp();

  // Active Countdown Timer for Candidate SLA
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 21,
    minutes: 42,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const totalApplicants = candidates.length;
  const activePool = candidates.filter(
    (c) => c.status === 'ADVANCING' || c.status === 'OFFER_ZONE' || c.status === 'OFFER_EXTENDED'
  ).length;
  const offerZoneCount = candidates.filter(
    (c) => c.status === 'OFFER_ZONE' || c.status === 'OFFER_EXTENDED'
  ).length;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* KPI 1: Total Applicants */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3.5 flex flex-col justify-between hover:border-zinc-700/80 transition-all">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Total Cohort Pool</span>
            <Users className="w-4 h-4 text-zinc-500" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-zinc-100 font-mono tracking-tight">
              {totalApplicants}
            </div>
            <div className="text-[11px] text-zinc-400 mt-0.5 flex items-center gap-1">
              <span>Verified applicants</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Active Advancing Pool */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3.5 flex flex-col justify-between hover:border-zinc-700/80 transition-all">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Active Pipeline</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-emerald-400 font-mono tracking-tight">
              {activePool}
            </div>
            <div className="text-[11px] text-zinc-400 mt-0.5">
              <span>{Math.round((activePool / totalApplicants) * 100)}% passing rate</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Open Seats & Offer Zone */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3.5 flex flex-col justify-between hover:border-zinc-700/80 transition-all">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Offer Zone Seats</span>
            <Target className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-cyan-400 font-mono tracking-tight flex items-baseline gap-1.5">
              {offerZoneCount}
              <span className="text-xs text-zinc-500 font-normal">/ {job.openSeats} seats</span>
            </div>
            <div className="text-[11px] text-zinc-400 mt-0.5">
              <span>Final cutoff: {job.passingCompositeCutoff} pts</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Candidate Live Rank */}
        <div className="bg-gradient-to-br from-emerald-950/30 to-zinc-900/80 border border-emerald-500/30 rounded-xl p-3.5 flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-sm">
          <div className="flex items-center justify-between text-emerald-300">
            <span className="text-xs font-medium flex items-center gap-1">
              <span>Your Standing</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            </span>
            <Trophy className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-emerald-300 font-mono tracking-tight flex items-baseline gap-1.5">
              #{currentUserCandidate.currentRank}
              <span className="text-xs text-emerald-400 font-normal">of {totalApplicants}</span>
            </div>
            <div className="text-[11px] text-zinc-300 mt-0.5 flex items-center gap-1 font-mono">
              <span className="text-emerald-400 font-semibold">
                {currentUserCandidate.compositeScore}
              </span>
              <span className="text-zinc-500">/ 1000 pts</span>
            </div>
          </div>
        </div>

        {/* KPI 5: Candidate Percentile Badge */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3.5 flex flex-col justify-between hover:border-zinc-700/80 transition-all">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-medium">Percentile Rank</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-purple-300 font-mono tracking-tight">
              Top {(100 - currentUserCandidate.percentile).toFixed(1)}%
            </div>
            <div className="text-[11px] text-zinc-400 mt-0.5">
              <span>Ahead of {currentUserCandidate.percentile}% cohort</span>
            </div>
          </div>
        </div>

        {/* KPI 6: Live Anti-Ghosting SLA Timer */}
        <div className="bg-zinc-900/60 border border-amber-500/30 rounded-xl p-3.5 flex flex-col justify-between hover:border-amber-500/50 transition-all">
          <div className="flex items-center justify-between text-amber-300">
            <span className="text-xs font-medium flex items-center gap-1">
              <span>Review SLA</span>
              <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded font-mono">
                STAGE 5
              </span>
            </span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold text-amber-300 font-mono tracking-tight flex items-center gap-1">
              <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span className="text-amber-500">:</span>
              <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span className="text-amber-500">:</span>
              <span className="text-xs text-amber-400 font-normal">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
            <div className="text-[11px] text-zinc-400 mt-0.5 truncate">
              <span>Escalates at 00:00:00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
