'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CandidateApplication, PipelineStageConfig } from '@/lib/types';
import { 
  Scale, 
  X, 
  AlertCircle, 
  Send, 
  Link as LinkIcon, 
  CheckCircle2, 
  HelpCircle,
  Clock
} from 'lucide-react';

interface ScoreAppealModalProps {
  candidate: CandidateApplication;
  isOpen: boolean;
  onClose: () => void;
}

export default function ScoreAppealModal({ candidate, isOpen, onClose }: ScoreAppealModalProps) {
  const { job, submitAppeal } = useApp();

  const [selectedStageId, setSelectedStageId] = useState<number>(2);
  const [selectedCriterionId, setSelectedCriterionId] = useState<string>('stg2_c4');
  const [candidateReason, setCandidateReason] = useState<string>('');
  const [evidenceUrl, setEvidenceUrl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentStage = job.stages.find((s) => s.id === selectedStageId) || job.stages[0];
  const currentCriterion = currentStage.criteria.find((c) => c.id === selectedCriterionId) || currentStage.criteria[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const result = submitAppeal({
      applicationId: candidate.id,
      stageId: selectedStageId,
      criterionId: currentCriterion.id,
      criterionTitle: currentCriterion.title,
      candidateReason,
      evidenceUrl: evidenceUrl.trim() || undefined
    });

    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error || 'Failed to submit appeal.');
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-zinc-900 to-zinc-950 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-100">
                Submit Structured Score Appeal
              </h3>
              <p className="text-[11px] text-zinc-400">
                24-Hour Blind Panel Re-check for Objective Rubric Criteria
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close appeal dialog"
            className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Info Banner */}
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-start gap-2 text-[11px] leading-relaxed">
            <Clock className="w-4 h-4 flex-shrink-0 text-amber-400 mt-0.5" />
            <span>
              Appeals must cite a verifiable technical discrepancy (e.g., automated test false negative, Git timestamp boundary, or benchmark discrepancy). Subjective opinion disputes are filtered by panel consensus.
            </span>
          </div>

          {/* Stage Selector */}
          <div>
            <label className="block text-zinc-300 font-medium mb-1.5">
              1. Disputed Pipeline Stage
            </label>
            <select
              value={selectedStageId}
              onChange={(e) => {
                const newId = Number(e.target.value);
                setSelectedStageId(newId);
                const newStage = job.stages.find((s) => s.id === newId);
                if (newStage && newStage.criteria.length > 0) {
                  setSelectedCriterionId(newStage.criteria[0].id);
                }
              }}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-emerald-500"
            >
              {job.stages.map((stage) => (
                <option key={stage.id} value={stage.id}>
                  Stage {stage.id}: {stage.name} (Max {stage.maxPoints} pts)
                </option>
              ))}
            </select>
          </div>

          {/* Criterion Selector */}
          <div>
            <label className="block text-zinc-300 font-medium mb-1.5">
              2. Specific Rubric Criterion
            </label>
            <select
              value={selectedCriterionId}
              onChange={(e) => setSelectedCriterionId(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-emerald-500"
            >
              {currentStage.criteria.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} (Max {c.maxPoints} pts)
                </option>
              ))}
            </select>
            <p className="text-[11px] text-zinc-500 mt-1 italic">
              {currentCriterion?.description}
            </p>
          </div>

          {/* Justification Textarea */}
          <div>
            <label className="block text-zinc-300 font-medium mb-1.5">
              3. Objective Technical Justification (Min. 30 characters)
            </label>
            <textarea
              rows={4}
              value={candidateReason}
              onChange={(e) => setCandidateReason(e.target.value)}
              placeholder="Cite exact lines of code, commit signatures, test case logs, or benchmark runs demonstrating why points were deducted erroneously..."
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
            />
            <div className="flex justify-between items-center text-[10px] text-zinc-500 mt-1">
              <span>Must be concrete and verifiable</span>
              <span className={candidateReason.length >= 30 ? 'text-emerald-400' : 'text-zinc-500'}>
                {candidateReason.length} / 30 chars min
              </span>
            </div>
          </div>

          {/* Evidence URL */}
          <div>
            <label className="block text-zinc-300 font-medium mb-1.5 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-zinc-400" />
              <span>4. Supporting Evidence Link (Optional)</span>
            </label>
            <input
              type="url"
              value={evidenceUrl}
              onChange={(e) => setEvidenceUrl(e.target.value)}
              placeholder="https://github.com/.../commit/... or log link"
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || candidateReason.length < 30}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Appeal for Re-Check</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
