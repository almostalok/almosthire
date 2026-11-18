'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CandidateApplication } from '@/lib/types';
import CandidateRadarChart from './CandidateRadarChart';
import ScoreAppealModal from './ScoreAppealModal';
import { 
  X, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  Clock, 
  FileText, 
  History, 
  ShieldCheck, 
  ExternalLink,
  Flame,
  Check,
  TrendingUp,
  MessageSquare,
  Lock
} from 'lucide-react';

export default function CandidateDetailDrawer() {
  const { 
    selectedCandidate, 
    setSelectedCandidateId, 
    job, 
    auditLogs, 
    role 
  } = useApp();

  const [expandedStages, setExpandedStages] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
  });
  const [isAppealModalOpen, setIsAppealModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'scorecard' | 'audit'>('scorecard');

  if (!selectedCandidate) return null;

  const toggleStage = (stageId: number) => {
    setExpandedStages((prev) => ({ ...prev, [stageId]: !prev[stageId] }));
  };

  const isYou = selectedCandidate.isCurrentUser || selectedCandidate.pseudonymHandle.includes('YOU');

  // Filter audit logs for this candidate
  const candidateAuditLogs = auditLogs.filter(
    (log) => log.applicationId === selectedCandidate.id || log.candidateHandle.includes(selectedCandidate.pseudonymHandle)
  );

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setSelectedCandidateId(null)}
      />

      {/* Slide-over Drawer */}
      <aside 
        aria-label="Candidate Scorecard and Transparency Drawer"
        className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 overflow-hidden flex items-center justify-center">
                {selectedCandidate.avatar ? (
                  <img
                    src={selectedCandidate.avatar}
                    alt={selectedCandidate.pseudonymHandle}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-mono font-bold text-zinc-300">
                    {selectedCandidate.pseudonymHandle.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              {isYou && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-zinc-950"></span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-zinc-100 flex items-center gap-1.5">
                  {selectedCandidate.pseudonymHandle}
                  {isYou && (
                    <span className="bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-1.5 py-0.5 rounded font-mono">
                      YOU
                    </span>
                  )}
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </h2>
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                <span className="font-mono text-zinc-400">{selectedCandidate.candidateId}</span>
                <span>•</span>
                <span className="font-mono font-semibold text-emerald-400">
                  Rank #{selectedCandidate.currentRank}
                </span>
                <span>•</span>
                <span className="text-purple-300 font-medium">
                  Top {(100 - selectedCandidate.percentile).toFixed(1)}%
                </span>
                {(role === 'recruiter' || isYou) && (
                  <>
                    <span>•</span>
                    <span className="text-zinc-300 font-medium">{selectedCandidate.fullName}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedCandidateId(null)}
              className="text-zinc-400 hover:text-zinc-200 p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Top Metric Strip Inside Drawer */}
        <div className="px-5 py-3 bg-zinc-900/50 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-[10px] uppercase font-semibold text-zinc-400">Composite Score</div>
              <div className="text-lg font-bold font-mono text-emerald-400 flex items-baseline gap-1">
                {selectedCandidate.compositeScore}
                <span className="text-xs text-zinc-400 font-normal">/ 1000 pts</span>
              </div>
            </div>
            <div className="h-6 w-px bg-zinc-800" />
            <div>
              <div className="text-[10px] uppercase font-semibold text-zinc-400">Stages Cleared</div>
              <div className="text-xs font-semibold text-zinc-200 mt-1 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{selectedCandidate.clearedStages.length} of 5 Gates</span>
              </div>
            </div>
          </div>

          {/* Appeal / Score Review CTA */}
          {isYou && (
            <button
              onClick={() => setIsAppealModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Score Review / Appeal</span>
            </button>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-800 bg-zinc-950 px-5">
          <button
            onClick={() => setActiveTab('scorecard')}
            className={`py-2.5 px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'scorecard'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Structured Scorecard & Radar</span>
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`py-2.5 px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'audit'
                ? 'border-emerald-400 text-emerald-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Immutable Audit Trail ({candidateAuditLogs.length})</span>
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
          {activeTab === 'scorecard' ? (
            <>
              {/* Comparative Radar Chart */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-xs font-bold text-zinc-200">
                      Cohort Benchmark Radar Comparison
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      Evaluated across 5 deterministic merit dimensions against Top 10% benchmark
                    </p>
                  </div>
                </div>
                <CandidateRadarChart candidate={selectedCandidate} />
              </div>

              {/* Status Note Banner */}
              {selectedCandidate.statusNote && (
                <div
                  className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${
                    selectedCandidate.status === 'NOT_SELECTED'
                      ? 'bg-rose-500/10 border-rose-500/25 text-rose-300'
                      : selectedCandidate.status === 'OFFER_ZONE'
                      ? 'bg-amber-500/10 border-amber-500/25 text-amber-300'
                      : 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div className="leading-relaxed text-[11px]">
                    <span className="font-semibold block mb-0.5">Pipeline Status Notice:</span>
                    {selectedCandidate.statusNote}
                  </div>
                </div>
              )}

              {/* Active Appeals on Record */}
              {selectedCandidate.appeals.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-amber-400" />
                    <span>Score Review & Appeal History ({selectedCandidate.appeals.length})</span>
                  </h3>
                  {selectedCandidate.appeals.map((appeal) => (
                    <div
                      key={appeal.id}
                      className="p-3 bg-zinc-900/90 border border-amber-500/30 rounded-xl space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-amber-300">
                          {appeal.criterionTitle} (Stage {appeal.stageId})
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                            appeal.status === 'ACCEPTED'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : appeal.status === 'REJECTED'
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse'
                          }`}
                        >
                          {appeal.status}
                        </span>
                      </div>
                      <p className="text-zinc-300 text-[11px] italic">
                        "{appeal.candidateReason}"
                      </p>
                      {appeal.resolutionNote && (
                        <div className="text-[11px] text-emerald-300 bg-emerald-950/30 p-2 rounded-lg border border-emerald-500/20 mt-1">
                          <span className="font-semibold">Panel Resolution: </span>
                          {appeal.resolutionNote}
                          {appeal.deltaPointsAwarded && (
                            <span className="font-bold text-emerald-400 ml-1">
                              (+{appeal.deltaPointsAwarded} pts awarded)
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Stage-by-Stage Accordion Cards */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                    Stage-by-Stage Scorecards & Mandatory Remarks
                  </h3>
                  <span className="text-[11px] text-zinc-400">
                    5-Stage Deterministic Pipeline
                  </span>
                </div>

                {job.stages.map((stage) => {
                  const evaluation = selectedCandidate.stageEvaluations.find(
                    (e) => e.stageId === stage.id
                  );
                  const isCleared = selectedCandidate.clearedStages.includes(stage.id);
                  const isExpanded = expandedStages[stage.id] ?? false;
                  const isCurrent = selectedCandidate.currentStageOrder === stage.id && !evaluation;
                  const isCutoffMissed =
                    evaluation && evaluation.totalScore < stage.cutoffPoints;

                  return (
                    <div
                      key={stage.id}
                      className="bg-zinc-900/70 border border-zinc-800 rounded-xl overflow-hidden"
                    >
                      {/* Accordion Header */}
                      <button
                        onClick={() => toggleStage(stage.id)}
                        className="w-full p-3.5 bg-zinc-900/90 hover:bg-zinc-850 flex items-center justify-between text-left transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                              isCleared
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : isCutoffMissed
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                                : isCurrent
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                                : 'bg-zinc-800 text-zinc-500'
                            }`}
                          >
                            {isCleared ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              stage.id
                            )}
                          </div>

                          <div>
                            <div className="font-semibold text-zinc-200 flex items-center gap-2">
                              <span>Stage {stage.id}: {stage.name}</span>
                              <span className="text-[10px] font-mono text-zinc-400 font-normal">
                                (Weight {stage.weightPct}%)
                              </span>
                              {stage.isBlind && (
                                <span className="text-[9px] bg-purple-500/15 text-purple-300 border border-purple-500/30 px-1.5 py-0.2 rounded font-mono">
                                  BLIND REVIEW
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-zinc-400">
                              Cutoff: {stage.cutoffPoints} pts • Max: {stage.maxPoints} pts • SLA: {stage.slaHours}h
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {evaluation ? (
                            <div className="text-right font-mono">
                              <span
                                className={`font-bold text-sm ${
                                  evaluation.totalScore >= stage.cutoffPoints
                                    ? 'text-emerald-400'
                                    : 'text-rose-400'
                                }`}
                              >
                                {evaluation.totalScore}
                              </span>
                              <span className="text-zinc-500 text-xs"> / {stage.maxPoints} pts</span>
                            </div>
                          ) : (
                            <span className="text-[11px] text-zinc-500 italic">
                              {isCurrent ? 'Under active review' : 'Not yet reached'}
                            </span>
                          )}

                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-zinc-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-zinc-500" />
                          )}
                        </div>
                      </button>

                      {/* Accordion Body */}
                      {isExpanded && (
                        <div className="p-4 border-t border-zinc-800/80 space-y-4 bg-zinc-950/40">
                          {evaluation ? (
                            <>
                              {/* Sub-Criterion Points Breakdown */}
                              <div>
                                <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                  Granular Rubric Item Scoring
                                </h4>
                                <div className="space-y-2">
                                  {stage.criteria.map((criterion) => {
                                    const scoreItem = evaluation.scores.find(
                                      (s) => s.criterionId === criterion.id
                                    );
                                    const pts = scoreItem ? scoreItem.pointsAwarded : 0;
                                    const pct = Math.round((pts / criterion.maxPoints) * 100);

                                    return (
                                      <div
                                        key={criterion.id}
                                        className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80"
                                      >
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="font-medium text-zinc-200">
                                            {criterion.title}
                                          </span>
                                          <span className="font-mono font-semibold text-emerald-400">
                                            {pts} / {criterion.maxPoints} pts
                                          </span>
                                        </div>
                                        <p className="text-[10px] text-zinc-400 mb-1.5">
                                          {criterion.description}
                                        </p>
                                        <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                                          <div
                                            className="bg-emerald-500 h-full rounded-full transition-all"
                                            style={{ width: `${pct}%` }}
                                          />
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Structured Mandatory Evaluator Remarks */}
                              <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                                    Mandatory Evaluator Remarks
                                  </h4>
                                  <span className="text-[10px] text-zinc-400 font-mono">
                                    Evaluator: {evaluation.evaluatorRole}
                                  </span>
                                </div>

                                {/* What Worked (Strengths) */}
                                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
                                  <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                                    <Check className="w-3 h-3" />
                                    <span>What Worked (Verified Strengths)</span>
                                  </div>
                                  <p className="text-zinc-200 text-[11px] leading-relaxed">
                                    {evaluation.strengthsRemark}
                                  </p>
                                </div>

                                {/* Where Points Were Lost (Gaps) */}
                                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20">
                                  <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                                    <AlertTriangle className="w-3 h-3" />
                                    <span>Where Points Were Deducted (Observed Gaps)</span>
                                  </div>
                                  <p className="text-zinc-200 text-[11px] leading-relaxed">
                                    {evaluation.gapsRemark}
                                  </p>
                                </div>

                                {/* Actionable Next Steps */}
                                <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/20">
                                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                                    <TrendingUp className="w-3 h-3" />
                                    <span>Recommended Actionable Growth Steps</span>
                                  </div>
                                  <p className="text-zinc-200 text-[11px] leading-relaxed">
                                    {evaluation.actionableAdvice}
                                  </p>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="py-4 text-center text-zinc-400 text-xs">
                              {isCurrent ? (
                                <div className="space-y-1">
                                  <Clock className="w-5 h-5 text-amber-400 mx-auto animate-spin" />
                                  <p className="text-zinc-300 font-medium">Evaluation In Progress</p>
                                  <p className="text-[11px]">Panel review SLA is currently active.</p>
                                </div>
                              ) : (
                                <div className="space-y-1">
                                  <Lock className="w-5 h-5 text-zinc-600 mx-auto" />
                                  <p>Stage locked until prerequisite stages are cleared.</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* Audit Log Trail */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                  Immutable Cryptographic Audit Trail
                </h3>
                <span className="text-[10px] font-mono text-zinc-400">
                  Total Events: {candidateAuditLogs.length}
                </span>
              </div>

              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-800">
                {candidateAuditLogs.length === 0 ? (
                  <p className="text-zinc-500 italic">No audit records logged yet.</p>
                ) : (
                  candidateAuditLogs.map((log) => (
                    <div key={log.id} className="relative group">
                      <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-zinc-950" />
                      <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-semibold text-zinc-200">{log.title}</span>
                          <span className="text-zinc-400 font-mono">
                            {new Date(log.createdAt).toLocaleDateString()} {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-zinc-400 text-[11px] leading-relaxed">
                          {log.description}
                        </p>
                        <div className="mt-2 flex items-center gap-2 text-[10px] text-zinc-400 font-mono">
                          <span>Actor: {log.actorRole} ({log.actorName})</span>
                          {log.deltaPoints && (
                            <span className="text-emerald-400 font-bold">
                              • Δ {log.deltaPoints > 0 ? `+${log.deltaPoints}` : log.deltaPoints} pts
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Score Appeal Modal */}
      <ScoreAppealModal
        candidate={selectedCandidate}
        isOpen={isAppealModalOpen}
        onClose={() => setIsAppealModalOpen(false)}
      />
    </>
  );
}
