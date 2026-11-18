'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import confetti from 'canvas-confetti';
import { 
  Briefcase, 
  BarChart3, 
  ShieldAlert, 
  SlidersHorizontal, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Check, 
  RotateCcw,
  Send,
  Zap,
  Award
} from 'lucide-react';

export default function RecruiterDashboard() {
  const { 
    candidates, 
    job, 
    evaluators, 
    simulatedCutoffs, 
    setSimulatedCutoff, 
    resetSimulatedCutoffs, 
    triggerOffer, 
    resolveAppeal,
    setSelectedCandidateId,
    addNotification
  } = useApp();

  const [activeTab, setActiveTab] = useState<'funnel' | 'calibration' | 'simulator' | 'appeals'>('funnel');
  const [appealResolutionText, setAppealResolutionText] = useState<Record<string, string>>({});

  // Offer trigger confetti
  const handleOfferRelease = (candId: string, handle: string) => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    triggerOffer(candId);
  };

  // Funnel calculations
  const total = candidates.length;
  const s1Passed = candidates.filter((c) => c.clearedStages.includes(1)).length;
  const s2Passed = candidates.filter((c) => c.clearedStages.includes(2)).length;
  const s3Passed = candidates.filter((c) => c.clearedStages.includes(3)).length;
  const s4Passed = candidates.filter((c) => c.clearedStages.includes(4)).length;
  const s5Passed = candidates.filter((c) => c.clearedStages.includes(5)).length;

  const funnelStages = [
    { name: 'Stage 1: Profile Audit', count: s1Passed, max: total, cutoff: job.stages[0].cutoffPoints },
    { name: 'Stage 2: Blind Code', count: s2Passed, max: s1Passed, cutoff: job.stages[1].cutoffPoints },
    { name: 'Stage 3: Domain Deep-Dive', count: s3Passed, max: s2Passed, cutoff: job.stages[2].cutoffPoints },
    { name: 'Stage 4: System Design', count: s4Passed, max: s3Passed, cutoff: job.stages[3].cutoffPoints },
    { name: 'Stage 5: Bar-Raiser', count: s5Passed, max: s4Passed, cutoff: job.stages[4].cutoffPoints }
  ];

  // Candidates impacted by simulated cutoffs
  const simulatedOfferZoneCandidates = candidates.filter((c) => {
    const s1 = c.stageEvaluations.find((e) => e.stageId === 1)?.totalScore || 0;
    const s2 = c.stageEvaluations.find((e) => e.stageId === 2)?.totalScore || 0;
    const s3 = c.stageEvaluations.find((e) => e.stageId === 3)?.totalScore || 0;
    const s4 = c.stageEvaluations.find((e) => e.stageId === 4)?.totalScore || 0;
    const s5 = c.stageEvaluations.find((e) => e.stageId === 5)?.totalScore || 0;

    return (
      (s1 >= simulatedCutoffs[1] || c.clearedStages.includes(1)) &&
      (s2 >= simulatedCutoffs[2] || c.clearedStages.includes(2)) &&
      (s3 >= simulatedCutoffs[3] || c.clearedStages.includes(3))
    );
  }).slice(0, job.openSeats);

  // All pending appeals across all candidates
  const allAppeals = candidates.flatMap((c) => 
    c.appeals.map((a) => ({ ...a, candidateHandle: c.pseudonymHandle, candidateRealName: c.fullName }))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Recruiter Header Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/30 border border-zinc-800 rounded-2xl p-4 mb-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                <span>Recruiter & Hiring Committee Command Center</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  FULL GOVERNANCE
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Funnel analytics, evaluator calibration, SLA compliance, and real-time cutoff simulation.
              </p>
            </div>
          </div>

          {/* Quick Stats Pill Strip */}
          <div className="flex items-center gap-2 text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center gap-2">
              <span className="text-zinc-500">SLA Compliance:</span>
              <span className="font-mono font-bold text-emerald-400">95.8%</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center gap-2">
              <span className="text-zinc-500">Open Seats:</span>
              <span className="font-mono font-bold text-amber-300">{job.openSeats} Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-zinc-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('funnel')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'funnel'
              ? 'bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Funnel Conversion & SLAs</span>
        </button>

        <button
          onClick={() => setActiveTab('calibration')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'calibration'
              ? 'bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-cyan-400" />
          <span>Evaluator Z-Score Calibration (Bias Detection)</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'simulator'
              ? 'bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
          <span>Cutoff Simulator (What-If Engine)</span>
        </button>

        <button
          onClick={() => setActiveTab('appeals')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'appeals'
              ? 'bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
          <span>Candidate Appeals Queue ({allAppeals.length})</span>
        </button>
      </div>

      {/* Tab 1: Funnel Conversion & SLAs */}
      {activeTab === 'funnel' && (
        <div className="space-y-6">
          {/* Funnel Progress Visual */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-zinc-200 mb-1 flex items-center justify-between">
              <span>Stage-Gate Funnel Health & Attrition</span>
              <span className="text-xs text-zinc-400 font-mono">Cohort Size: {total}</span>
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Track conversion rate through deterministic cutoffs. Transparent rejections eliminate recruiter ghosting.
            </p>

            <div className="space-y-4">
              {funnelStages.map((stg, i) => {
                const pct = Math.round((stg.count / total) * 100);
                const stepPct = Math.round((stg.count / (stg.max || 1)) * 100);

                return (
                  <div key={stg.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-zinc-200">{stg.name}</span>
                        <span className="text-[10px] text-zinc-400 font-mono">
                          (Cutoff: {stg.cutoff} pts)
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-mono">
                        <span className="text-zinc-400 text-[11px]">{stepPct}% step pass</span>
                        <span className="font-bold text-emerald-400">
                          {stg.count} <span className="text-zinc-500 text-xs">({pct}%)</span>
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-zinc-950 rounded-full h-3 overflow-hidden p-0.5 border border-zinc-800">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Offer Zone Release Trigger Panel */}
          <div className="bg-zinc-900/70 border border-amber-500/30 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Offer Zone Top Finalists (Seats 1–{job.openSeats})</span>
                </h3>
                <p className="text-xs text-zinc-400">
                  These top-ranked candidates have crossed the 695-point composite threshold and cleared all gates.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {candidates.slice(0, 3).map((candidate) => {
                const isExtended = candidate.status === 'OFFER_EXTENDED';
                return (
                  <div
                    key={candidate.id}
                    className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-amber-300 font-bold text-sm">
                          Rank #{candidate.currentRank}
                        </span>
                        <span className="text-xs font-mono text-emerald-400 font-bold">
                          {candidate.compositeScore} / 1000
                        </span>
                      </div>
                      <div className="font-bold text-zinc-200 mt-1">{candidate.pseudonymHandle}</div>
                      <div className="text-[11px] text-zinc-400 font-mono">{candidate.fullName}</div>
                      <p className="text-[11px] text-zinc-400 mt-2 line-clamp-2 italic">
                        "{candidate.stageEvaluations[candidate.stageEvaluations.length - 1]?.strengthsRemark || 'Cleared all requirements.'}"
                      </p>
                    </div>

                    <button
                      onClick={() => handleOfferRelease(candidate.id, candidate.pseudonymHandle)}
                      disabled={isExtended}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isExtended
                          ? 'bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-not-allowed'
                          : 'bg-gradient-to-r from-amber-500 to-emerald-500 text-zinc-950 hover:brightness-110 shadow-lg shadow-amber-500/20 cursor-pointer'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isExtended ? 'Offer Letter Extended' : 'Release Formal Offer'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Evaluator Z-Score Calibration (Interviewer Normalization) */}
      {activeTab === 'calibration' && (
        <div className="space-y-6">
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-cyan-400" />
                  <span>Interviewer Strictness & Z-Score Normalization Engine</span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Monitors evaluator grading distributions. Evaluators deviating &gt; 1.5 standard deviations from the cohort baseline are flagged for calibration.
                </p>
              </div>

              <button
                onClick={() =>
                  addNotification({
                    type: 'info',
                    title: 'Calibration Session Triggered',
                    message: 'Notified Marcus Vance and Elena Rostova to attend Friday grading calibration review.'
                  })
                }
                className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold hover:bg-cyan-500/30 transition-colors"
              >
                Schedule Calibration Sync
              </button>
            </div>

            {/* Evaluator Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {evaluators.map((ev) => {
                const isHarsh = ev.strictnessRating === 'Harsh';
                const isLenient = ev.strictnessRating === 'Lenient';

                return (
                  <div
                    key={ev.id}
                    className={`p-4 rounded-xl bg-zinc-950 border transition-all ${
                      ev.flaggedForCalibration
                        ? 'border-amber-500/40 ring-1 ring-amber-500/20'
                        : 'border-zinc-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-zinc-200 text-xs">{ev.name}</span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          isHarsh
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : isLenient
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        {ev.strictnessRating}
                      </span>
                    </div>

                    <div className="text-[11px] text-zinc-400 mb-3">{ev.roleTitle}</div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs p-2 rounded-lg bg-zinc-900 border border-zinc-800/80 mb-3 font-mono">
                      <div>
                        <div className="text-[9px] text-zinc-500">Mean Score</div>
                        <div className="font-bold text-zinc-200">{ev.meanScoreAwarded}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-zinc-500">Std Dev (σ)</div>
                        <div className="font-bold text-zinc-200">{ev.stdDeviation}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-zinc-500">Z-Score</div>
                        <div
                          className={`font-bold ${
                            ev.zScoreBaseline > 1.0
                              ? 'text-purple-400'
                              : ev.zScoreBaseline < -1.0
                              ? 'text-rose-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {ev.zScoreBaseline > 0 ? `+${ev.zScoreBaseline}` : ev.zScoreBaseline}
                        </div>
                      </div>
                    </div>

                    {ev.flaggedForCalibration ? (
                      <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Deviation &gt; 1.5σ from cohort baseline. Flagged for review.</span>
                      </div>
                    ) : (
                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Calibrated within standard distribution tolerance.</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Interactive Cutoff Simulator (What-If Engine) */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                  <span>One-Click Cutoff Simulator ("What-If" Cohort Modeling)</span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Simulate adjusting stage-gate cutoffs to project Offer Zone composition and pipeline volume before finalizing pipeline changes.
                </p>
              </div>

              <button
                onClick={resetSimulatedCutoffs}
                className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Cutoffs</span>
              </button>
            </div>

            {/* Sliders for Stages 1 to 5 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {job.stages.map((stage) => {
                const currentSim = simulatedCutoffs[stage.id] ?? stage.cutoffPoints;
                const isModified = currentSim !== stage.cutoffPoints;

                return (
                  <div
                    key={stage.id}
                    className={`p-3.5 rounded-xl bg-zinc-950 border transition-all ${
                      isModified ? 'border-amber-500/50 bg-amber-950/10' : 'border-zinc-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-zinc-200">Stage {stage.id}: {stage.name}</span>
                      <span className="font-mono text-emerald-400 font-bold">
                        {currentSim} pts
                      </span>
                    </div>

                    <p className="text-[10px] text-zinc-400 mb-2">
                      Original: {stage.cutoffPoints} pts (Max: {stage.maxPoints})
                    </p>

                    <input
                      type="range"
                      min={Math.round(stage.maxPoints * 0.4)}
                      max={stage.maxPoints}
                      value={currentSim}
                      onChange={(e) => setSimulatedCutoff(stage.id, Number(e.target.value))}
                      className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>
                );
              })}
            </div>

            {/* Projected Impact Preview */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                Simulated Offer Zone Contenders ({simulatedOfferZoneCandidates.length} seats)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {simulatedOfferZoneCandidates.map((cand, idx) => (
                  <div
                    key={cand.id}
                    className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-amber-300">
                        #{idx + 1} {cand.pseudonymHandle}
                      </div>
                      <div className="text-[10px] text-zinc-400">{cand.fullName}</div>
                    </div>
                    <div className="font-mono font-bold text-emerald-400">
                      {cand.compositeScore} pts
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Score Appeals Queue */}
      {activeTab === 'appeals' && (
        <div className="space-y-4">
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2 mb-1">
              <ShieldAlert className="w-4 h-4 text-purple-400" />
              <span>Candidate Score Review Appeals Queue</span>
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              All candidate score appeals are processed under a strict 24-hour turnaround window with objective rubric verification.
            </p>

            {allAppeals.length === 0 ? (
              <div className="py-12 text-center text-zinc-500 text-xs">
                No active score appeals pending in the queue.
              </div>
            ) : (
              <div className="space-y-3">
                {allAppeals.map((appeal) => {
                  const isResolved = appeal.status !== 'PENDING';

                  return (
                    <div
                      key={appeal.id}
                      className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-zinc-200 text-xs">
                              {appeal.candidateHandle} ({appeal.candidateRealName})
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                              Stage {appeal.stageId}: {appeal.criterionTitle}
                            </span>
                          </div>
                          <div className="text-[10px] text-zinc-500 mt-0.5">
                            Logged: {new Date(appeal.submittedAt).toLocaleString()}
                          </div>
                        </div>

                        <span
                          className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                            appeal.status === 'ACCEPTED'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : appeal.status === 'REJECTED'
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                          }`}
                        >
                          {appeal.status}
                        </span>
                      </div>

                      {/* Candidate Reason */}
                      <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800/80 text-xs text-zinc-300 italic">
                        "{appeal.candidateReason}"
                        {appeal.evidenceUrl && (
                          <div className="mt-1.5 not-italic">
                            <a
                              href={appeal.evidenceUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-cyan-400 hover:underline text-[11px] font-mono"
                            >
                              View Attached Evidence Artifact ↗
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Resolution controls if pending */}
                      {!isResolved ? (
                        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-zinc-800/80">
                          <input
                            type="text"
                            placeholder="Add formal panel resolution remark..."
                            value={appealResolutionText[appeal.id] || ''}
                            onChange={(e) =>
                              setAppealResolutionText((prev) => ({
                                ...prev,
                                [appeal.id]: e.target.value
                              }))
                            }
                            className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-zinc-200 flex-1 focus:outline-none focus:border-emerald-500"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                resolveAppeal({
                                  appealId: appeal.id,
                                  status: 'ACCEPTED',
                                  resolutionNote:
                                    appealResolutionText[appeal.id] ||
                                    'Verified objective evidence. Score corrected.',
                                  deltaPointsAwarded: 10,
                                  resolvedBy: 'Hiring Committee Panel'
                                })
                              }
                              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-colors"
                            >
                              Approve (+10 pts)
                            </button>
                            <button
                              onClick={() =>
                                resolveAppeal({
                                  appealId: appeal.id,
                                  status: 'REJECTED',
                                  resolutionNote:
                                    appealResolutionText[appeal.id] ||
                                    'Panel reviewed objective evidence; original score sustained.',
                                  resolvedBy: 'Hiring Committee Panel'
                                })
                              }
                              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-xs transition-colors"
                            >
                              Decline Appeal
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-[11px] text-zinc-400 bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800/80">
                          <span className="font-semibold text-zinc-300">Resolved: </span>
                          {appeal.resolutionNote}
                          {appeal.deltaPointsAwarded && (
                            <span className="text-emerald-400 font-bold ml-1">
                              (+{appeal.deltaPointsAwarded} pts)
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
