'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { CandidateApplication, PipelineStageConfig, RubricCriterion } from '@/lib/types';
import { 
  UserCheck, 
  ShieldAlert, 
  Check, 
  Sliders, 
  Send, 
  EyeOff, 
  FileCode, 
  AlertCircle, 
  Sparkles, 
  Info,
  Clock,
  Layers,
  Award
} from 'lucide-react';

export default function EvaluatorStudio() {
  const { 
    candidates, 
    job, 
    evaluators, 
    submitScorecard, 
    setSelectedCandidateId 
  } = useApp();

  // Pick target candidate to evaluate (default to Alex Rivera who is awaiting Stage 5 evaluation!)
  const [selectedCandidateId, setSelectedCandidateIdState] = useState<string>(() => {
    const you = candidates.find((c) => c.isCurrentUser || c.pseudonymHandle.includes('YOU'));
    return you ? you.id : candidates[0].id;
  });

  const [selectedStageId, setSelectedStageId] = useState<number>(5); // Default to Stage 5 Bar-Raiser
  const [selectedEvaluatorId, setSelectedEvaluatorId] = useState<string>('eval-5'); // Priya Patel (Bar-Raiser)

  const candidate = candidates.find((c) => c.id === selectedCandidateId) || candidates[0];
  const stage = job.stages.find((s) => s.id === selectedStageId) || job.stages[4];
  const evaluator = evaluators.find((e) => e.id === selectedEvaluatorId) || evaluators[0];

  // Rubric Scores State: map criterionId -> points
  const [criterionScores, setCriterionScores] = useState<Record<string, number>>({});

  // Structured Feedback Fields
  const [strengthsRemark, setStrengthsRemark] = useState<string>('');
  const [gapsRemark, setGapsRemark] = useState<string>('');
  const [actionableAdvice, setActionableAdvice] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  // Initialize default rubric slider scores when stage changes
  useEffect(() => {
    const initialScores: Record<string, number> = {};
    stage.criteria.forEach((c) => {
      // Default to 80% of max points for quick ergonomic testing
      initialScores[c.id] = Math.round(c.maxPoints * 0.85);
    });
    setCriterionScores(initialScores);

    // Provide default structured starter text for Stage 5 to make testing smooth
    if (stage.id === 5) {
      setStrengthsRemark(
        'Demonstrated exceptional end-to-end accountability during Sev1 incident simulations. Communicated system state transparently without deflecting blame onto dependencies.'
      );
      setGapsRemark(
        'Could formalize multi-team escalation protocols slightly earlier rather than spending the initial 15 minutes in solo deep-dive diagnostics.'
      );
      setActionableAdvice(
        'Practice chairing cross-functional war rooms with non-engineering stakeholders, distilling technical status into clear customer impact updates.'
      );
    } else {
      setStrengthsRemark('');
      setGapsRemark('');
      setActionableAdvice('');
    }
    setFormError(null);
    setSubmissionSuccess(false);
  }, [stage]);

  const handleScoreChange = (criterionId: string, val: number, max: number) => {
    const clamped = Math.max(0, Math.min(max, val));
    setCriterionScores((prev) => ({ ...prev, [criterionId]: clamped }));
  };

  const totalCalculatedStageScore = Object.values(criterionScores).reduce(
    (sum, val) => sum + val,
    0
  );

  const totalFeedbackChars =
    strengthsRemark.trim().length +
    gapsRemark.trim().length +
    actionableAdvice.trim().length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const scoresPayload = stage.criteria.map((c) => ({
      criterionId: c.id,
      pointsAwarded: criterionScores[c.id] ?? 0
    }));

    const result = submitScorecard({
      applicationId: candidate.id,
      stageId: stage.id,
      evaluatorId: evaluator.id,
      evaluatorRole: `${evaluator.name} (${evaluator.roleTitle})`,
      scores: scoresPayload,
      strengthsRemark,
      gapsRemark,
      actionableAdvice
    });

    if (!result.success) {
      setFormError(result.error || 'Evaluation submission failed.');
    } else {
      setSubmissionSuccess(true);
      setTimeout(() => setSubmissionSuccess(false), 5000);
    }
  };

  const isBlindStage = stage.isBlind;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Studio Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-cyan-950/30 border border-zinc-800 rounded-2xl p-4 mb-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                <span>Evaluator & Interviewer Studio</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  ANTI-BIAS ACTIVE
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Rigorous rubric grading with mandatory constructive feedback. Peer scores remain blind until submission.
              </p>
            </div>
          </div>

          {/* Target Candidate & Stage Dropdown Selectors */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Candidate Selector */}
            <div className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 font-medium">Candidate:</span>
              <select
                value={selectedCandidateId}
                onChange={(e) => setSelectedCandidateIdState(e.target.value)}
                className="bg-transparent text-zinc-200 font-medium focus:outline-none cursor-pointer"
              >
                {candidates.map((c) => (
                  <option key={c.id} value={c.id} className="bg-zinc-900">
                    {c.pseudonymHandle} {c.isCurrentUser ? '(YOU - Pending Stage 5!)' : ''} (Rank #{c.currentRank})
                  </option>
                ))}
              </select>
            </div>

            {/* Stage Selector */}
            <div className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 font-medium">Stage:</span>
              <select
                value={selectedStageId}
                onChange={(e) => setSelectedStageId(Number(e.target.value))}
                className="bg-transparent text-zinc-200 font-medium focus:outline-none cursor-pointer"
              >
                {job.stages.map((s) => (
                  <option key={s.id} value={s.id} className="bg-zinc-900">
                    Stage {s.id}: {s.name} ({s.maxPoints} pts)
                  </option>
                ))}
              </select>
            </div>

            {/* Evaluator Identity */}
            <div className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 font-medium">Evaluator:</span>
              <select
                value={selectedEvaluatorId}
                onChange={(e) => setSelectedEvaluatorId(e.target.value)}
                className="bg-transparent text-zinc-200 font-medium focus:outline-none cursor-pointer"
              >
                {evaluators.map((ev) => (
                  <option key={ev.id} value={ev.id} className="bg-zinc-900">
                    {ev.name} ({ev.strictnessRating})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {submissionSuccess && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Check className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="font-bold">Scorecard Successfully Published & Sealed!</div>
              <p className="text-xs text-emerald-200/80">
                Leaderboard ranks recalculated. Immutable audit log updated. Candidate notified.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedCandidateId(candidate.id)}
            className="px-3 py-1.5 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
          >
            Inspect Candidate Leaderboard Standing →
          </button>
        </div>
      )}

      {/* Split-Screen Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Pane: Candidate Submission & Masked Dossier (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-zinc-100 text-sm">
                  Candidate Dossier & Artifacts
                </h3>
              </div>
              {isBlindStage ? (
                <span className="flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <EyeOff className="w-3 h-3" />
                  Blind Grading Active
                </span>
              ) : (
                <span className="text-[10px] font-mono text-zinc-400">
                  Unmasked Domain Stage
                </span>
              )}
            </div>

            {/* Blind Mode Notice */}
            {isBlindStage && (
              <div className="mt-3 p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 text-purple-200 text-xs flex items-start gap-2">
                <EyeOff className="w-4 h-4 flex-shrink-0 text-purple-400 mt-0.5" />
                <div className="leading-relaxed text-[11px]">
                  Candidate name, academic institution, gender, and former employer names are cryptographically redacted to eliminate pedigree bias during early-stage grading.
                </div>
              </div>
            )}

            {/* Candidate Metadata */}
            <div className="mt-4 space-y-3 text-xs">
              <div>
                <span className="text-zinc-500 block text-[11px]">Pseudonym Identity</span>
                <span className="font-mono font-bold text-zinc-200 text-sm">
                  {candidate.pseudonymHandle} ({candidate.candidateId})
                </span>
              </div>

              <div>
                <span className="text-zinc-500 block text-[11px]">Years of Production Experience</span>
                <span className="text-zinc-300 font-medium">
                  {candidate.profileData.yearsOfExperience} Years
                </span>
              </div>

              <div>
                <span className="text-zinc-500 block text-[11px]">Verified Primary Stack</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {candidate.profileData.primaryStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/60 font-mono text-[10px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Masked vs Unmasked Section */}
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-1.5">
                <span className="text-zinc-400 font-semibold block text-[11px]">
                  {isBlindStage ? 'Redacted PII Signals' : 'Verified Candidate Profile'}
                </span>
                <div className="space-y-1 text-zinc-300 text-[11px]">
                  <div>
                    <span className="text-zinc-500">Applicant Name: </span>
                    {isBlindStage ? (
                      <span className="font-mono bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded select-none">
                        ████████████
                      </span>
                    ) : (
                      <span className="font-medium">{candidate.fullName}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-zinc-500">Pedigree / Alma Mater: </span>
                    {isBlindStage ? (
                      <span className="font-mono bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded select-none">
                        ██████████████████
                      </span>
                    ) : (
                      <span>{candidate.profileData.maskedInBlind.university}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-zinc-500">Prior Employers: </span>
                    {isBlindStage ? (
                      <span className="font-mono bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded select-none">
                        ████████████████
                      </span>
                    ) : (
                      <span>{candidate.profileData.maskedInBlind.previousCompany}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Submission Work Sample */}
              <div>
                <span className="text-zinc-400 font-semibold block text-[11px] mb-1">
                  Submitted Code / System Architecture Artifact
                </span>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-48 leading-relaxed">
                  <pre>
                    {candidate.profileData.codeSubmissionSnippet ||
                      '// Automated test suite passed 10/10 with 0 flakiness.\n// Peak latency under load: 12ms p99.\n// Architecture diagram: Dual-write ring queue with idempotency keys.'}
                  </pre>
                </div>
              </div>

              {/* Anti-Anchoring Bias Notice */}
              <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-[11px] text-zinc-400 flex items-start gap-2">
                <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>
                  Anti-anchoring protocol: You cannot view grades or notes from other panel members until your evaluation is finalized and sealed into the audit log.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane: Locked Rubric Sliders & Mandatory Remarks (7 cols) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div>
                <h3 className="font-bold text-zinc-100 text-sm flex items-center gap-2">
                  <span>Stage {stage.id}: {stage.name}</span>
                  <span className="text-xs font-mono font-normal text-zinc-400">
                    (Passing Cutoff: {stage.cutoffPoints} pts)
                  </span>
                </h3>
              </div>

              <div className="text-right font-mono">
                <div className="text-xs text-zinc-500">Calculated Score</div>
                <div
                  className={`text-xl font-bold ${
                    totalCalculatedStageScore >= stage.cutoffPoints
                      ? 'text-emerald-400'
                      : 'text-rose-400'
                  }`}
                >
                  {totalCalculatedStageScore}
                  <span className="text-xs text-zinc-500 font-normal"> / {stage.maxPoints} pts</span>
                </div>
              </div>
            </div>

            {formError && (
              <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            {/* Rubric Criteria Sliders */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                1. Locked Rubric Criteria Scoring
              </h4>

              {stage.criteria.map((criterion) => {
                const currentScore = criterionScores[criterion.id] ?? 0;
                const pct = Math.round((currentScore / criterion.maxPoints) * 100);

                return (
                  <div
                    key={criterion.id}
                    className="p-3.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-zinc-200">
                        {criterion.title}
                      </span>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="font-bold text-emerald-400 text-sm">
                          {currentScore}
                        </span>
                        <span className="text-zinc-500">/ {criterion.maxPoints} pts</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-400">
                      {criterion.description}
                    </p>

                    {/* Range Slider & Quick Buttons */}
                    <div className="flex items-center gap-3 pt-1">
                      <input
                        type="range"
                        min={0}
                        max={criterion.maxPoints}
                        value={currentScore}
                        onChange={(e) =>
                          handleScoreChange(
                            criterion.id,
                            Number(e.target.value),
                            criterion.maxPoints
                          )
                        }
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                      <input
                        type="number"
                        min={0}
                        max={criterion.maxPoints}
                        value={currentScore}
                        onChange={(e) =>
                          handleScoreChange(
                            criterion.id,
                            Number(e.target.value),
                            criterion.maxPoints
                          )
                        }
                        className="w-14 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1 text-center font-mono text-xs text-zinc-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mandatory Structured Feedback Section */}
            <div className="space-y-4 pt-3 border-t border-zinc-800">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>2. Mandatory Structured Evaluator Feedback</span>
                </h4>
                <div
                  className={`text-xs font-mono font-semibold ${
                    totalFeedbackChars >= 150 ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {totalFeedbackChars} / 150 chars min
                </div>
              </div>

              {/* Field 1: What Worked */}
              <div>
                <label className="block text-xs font-medium text-emerald-300 mb-1 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Strengths (What Worked)</span>
                </label>
                <textarea
                  rows={2}
                  value={strengthsRemark}
                  onChange={(e) => setStrengthsRemark(e.target.value)}
                  placeholder="Detail clear evidence of technical excellence, clean patterns, or fast debugging..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Field 2: Where Points Were Lost */}
              <div>
                <label className="block text-xs font-medium text-amber-300 mb-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Observed Gaps (Where Points Were Lost)</span>
                </label>
                <textarea
                  rows={2}
                  value={gapsRemark}
                  onChange={(e) => setGapsRemark(e.target.value)}
                  placeholder="Explain missing edge cases, architectural trade-offs, or unaddressed failure modes..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Field 3: Actionable Advice */}
              <div>
                <label className="block text-xs font-medium text-cyan-300 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Actionable Guidance (Roadmap for Growth)</span>
                </label>
                <textarea
                  rows={2}
                  value={actionableAdvice}
                  onChange={(e) => setActionableAdvice(e.target.value)}
                  placeholder="Provide concrete documentation references, profiling tools, or architectural literature..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Submission Button */}
            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
              <div className="text-[11px] text-zinc-500">
                Sealing this scorecard broadcasts updates to the cohort leaderboard.
              </div>

              <button
                type="submit"
                disabled={totalFeedbackChars < 150}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold text-xs flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit & Publish Scorecard</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
