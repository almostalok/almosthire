'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  Clock, 
  Target, 
  Award, 
  CheckCircle2, 
  Users, 
  ArrowRight, 
  Send, 
  Check, 
  Lock, 
  Flame, 
  HelpCircle,
  FileCheck
} from 'lucide-react';

export default function PublicTransparencyView() {
  const { job, candidates, setRole, addNotification } = useApp();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [handleInput, setHandleInput] = useState('');
  const [githubInput, setGithubInput] = useState('');
  const [submittedApply, setSubmittedApply] = useState(false);

  const totalApplicants = candidates.length;
  const passedS1 = candidates.filter((c) => c.clearedStages.includes(1)).length;
  const inOfferZone = candidates.filter((c) => c.status === 'OFFER_ZONE' || c.status === 'OFFER_EXTENDED').length;

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedApply(true);
    addNotification({
      type: 'success',
      title: 'Application Queued for Blind Audit',
      message: `Handle ${handleInput || 'NewApplicant'} entered into Stage 1 Proof-of-Work verification queue. 48h SLA active!`
    });
    setTimeout(() => {
      setSubmittedApply(false);
      setIsApplyModalOpen(false);
      setRole('candidate');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/40 border border-zinc-800 p-8 lg:p-12 overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            PRE-APPLY OPEN TRANSPARENCY PROTOCOL
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight leading-tight">
            No ghosting. No black boxes. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Live deterministic merit hiring.
            </span>
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Inspect live cohort stats, stage cutoffs, evaluator calibration metrics, and average review turnaround times before you write a single line of code. Every applicant receives an immutable scorecard and mandatory constructive feedback.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsApplyModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <span>Apply with Verified Proof-of-Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setRole('candidate')}
              className="px-5 py-3 rounded-xl bg-zinc-800/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-sm font-semibold transition-all"
            >
              <span>View Live Candidate Demo (YOU #4)</span>
            </button>
          </div>
        </div>

        {/* Background glow decoration */}
        <div className="absolute right-0 top-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* 4 Public Funnel Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium">Cohort Pool</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-zinc-100">{totalApplicants}</div>
            <div className="text-xs text-zinc-400 mt-1">
              {passedS1} candidates cleared Stage 1 audit ({Math.round((passedS1 / totalApplicants) * 100)}%)
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium">Open Seats Available</span>
            <Target className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-amber-300">
              {job.openSeats} Seats
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              Top 3 finalists crossing 695 pts receive formal offers
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium">Avg Review Turnaround</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-cyan-400">
              31.4 Hours
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              Guaranteed SLA under 48h or automatic escalation
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 mb-2">
            <span className="text-xs font-medium">Constructive Feedback</span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-purple-300">
              100%
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              Mandatory Strengths, Gaps, and Advice for all stages
            </div>
          </div>
        </div>
      </div>

      {/* 5-Stage Gate Specification Table */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="mb-6">
          <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <span>Deterministic 5-Stage Pipeline Specifications & SLA Guarantees</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Every threshold is public before application. No ambiguous grading. No opaque interview committees.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider bg-zinc-950/40">
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-4">Focus & Method</th>
                <th className="py-3 px-4 text-center">Weight</th>
                <th className="py-3 px-4 text-center">Max Pts</th>
                <th className="py-3 px-4 text-center">Cutoff</th>
                <th className="py-3 px-4 text-center">Review SLA</th>
                <th className="py-3 px-4">Transparency Artifact Visible to Applicant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-mono">
              {job.stages.map((stg) => (
                <tr key={stg.id} className="hover:bg-zinc-850/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-zinc-200">
                    Stage {stg.id}
                  </td>
                  <td className="py-3 px-4 font-sans">
                    <div className="font-semibold text-zinc-200">{stg.name}</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">{stg.description}</div>
                  </td>
                  <td className="py-3 px-4 text-center text-zinc-300">
                    {stg.weightPct}%
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-emerald-400">
                    {stg.maxPoints}
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-amber-300">
                    {stg.cutoffPoints}
                  </td>
                  <td className="py-3 px-4 text-center text-cyan-400">
                    {stg.slaHours} hrs
                  </td>
                  <td className="py-3 px-4 font-sans text-zinc-300 text-[11px]">
                    {stg.transparencyOutput}
                  </td>
                </tr>
              ))}
              <tr className="bg-zinc-950/80 font-bold border-t-2 border-zinc-700">
                <td className="py-3 px-4 text-emerald-400">TOTAL</td>
                <td className="py-3 px-4 font-sans text-zinc-100">
                  Composite Merit Score & Live Cohort Standing
                </td>
                <td className="py-3 px-4 text-center text-zinc-100">100%</td>
                <td className="py-3 px-4 text-center text-emerald-400">1,000 pts</td>
                <td className="py-3 px-4 text-center text-amber-400">695 pts</td>
                <td className="py-3 px-4 text-center text-cyan-400">10 Days Max</td>
                <td className="py-3 px-4 font-sans text-emerald-300 text-[11px]">
                  Live Rank, Percentile, Stage Badges, Full Immutable Audit Log
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 Core Ethical Commitments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-zinc-100 text-sm">
            1. Cryptographic Blind Grading
          </h3>
          <p className="text-zinc-400 text-xs leading-relaxed">
            Stages 1 & 2 redact candidate names, colleges, gender, and former employers. Evaluators score strictly on verifiable code quality and test case pass rates.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-zinc-100 text-sm">
            2. Anti-Ghosting SLA Watchdog
          </h3>
          <p className="text-zinc-400 text-xs leading-relaxed">
            Every stage features a live countdown timer. If an evaluator breaches the SLA, the review is auto-escalated to the Director of Engineering, and candidates receive immediate status updates.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <FileCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-zinc-100 text-sm">
            3. Permanent Scorecards & Appeals
          </h3>
          <p className="text-zinc-400 text-xs leading-relaxed">
            Even if a cutoff is missed, you own your scorecard forever with actionable advice on what to study. If an objective rubric item was mis-scored, you have 24 hours to file a structured appeal.
          </p>
        </div>
      </div>

      {/* Apply Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="font-bold text-zinc-100 text-sm">
                Apply to Cohort #2026-Q4
              </h3>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="text-zinc-500 hover:text-zinc-300"
              >
                ✕
              </button>
            </div>

            {submittedApply ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <div className="font-bold text-zinc-100">Application Registered!</div>
                <p className="text-xs text-zinc-400">
                  Switching you to your candidate live dashboard...
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    Choose Your Pseudonym Handle
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CyberVanguard, PrismDev"
                    value={handleInput}
                    onChange={(e) => setHandleInput(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                  />
                  <p className="text-[10px] text-zinc-500 mt-0.5">
                    This handle protects your privacy on the public cohort leaderboard.
                  </p>
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">
                    GitHub / Proof-of-Work Repository
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/your-username/project"
                    value={githubInput}
                    onChange={(e) => setGithubInput(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-zinc-400 hover:bg-zinc-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors"
                  >
                    Enter Live Leaderboard
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
