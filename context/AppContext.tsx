'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { 
  UserRole, 
  CandidateApplication, 
  AuditLogEntry, 
  JobRole, 
  EvaluatorProfile, 
  ScoreAppeal,
  StageEvaluation,
  CriterionScore
} from '@/lib/types';
import { 
  INITIAL_CANDIDATES, 
  INITIAL_JOB, 
  INITIAL_AUDIT_LOGS, 
  EVALUATORS, 
  recalculateLeaderboard 
} from '@/lib/data';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  job: JobRole;
  setJob: React.Dispatch<React.SetStateAction<JobRole>>;
  candidates: CandidateApplication[];
  currentUserCandidate: CandidateApplication;
  auditLogs: AuditLogEntry[];
  evaluators: EvaluatorProfile[];
  selectedCandidateId: string | null;
  setSelectedCandidateId: (id: string | null) => void;
  selectedCandidate: CandidateApplication | null;
  submitScorecard: (payload: {
    applicationId: string;
    stageId: number;
    evaluatorId: string;
    evaluatorRole: string;
    scores: CriterionScore[];
    strengthsRemark: string;
    gapsRemark: string;
    actionableAdvice: string;
  }) => { success: boolean; error?: string };
  submitAppeal: (payload: {
    applicationId: string;
    stageId: number;
    criterionId: string;
    criterionTitle: string;
    candidateReason: string;
    evidenceUrl?: string;
  }) => { success: boolean; error?: string };
  resolveAppeal: (payload: {
    appealId: string;
    status: 'ACCEPTED' | 'REJECTED';
    resolutionNote: string;
    deltaPointsAwarded?: number;
    resolvedBy: string;
  }) => void;
  triggerOffer: (applicationId: string) => void;
  simulatedCutoffs: Record<number, number>;
  setSimulatedCutoff: (stageId: number, cutoff: number) => void;
  resetSimulatedCutoffs: () => void;
  notifications: Array<{
    id: string;
    type: 'success' | 'info' | 'warning' | 'alert';
    title: string;
    message: string;
    timestamp: string;
  }>;
  dismissNotification: (id: string) => void;
  addNotification: (notification: {
    type: 'success' | 'info' | 'warning' | 'alert';
    title: string;
    message: string;
  }) => void;
  resetToDefaultDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('candidate');
  const [job, setJob] = useState<JobRole>(INITIAL_JOB);
  const [candidates, setCandidates] = useState<CandidateApplication[]>(() => 
    recalculateLeaderboard(INITIAL_CANDIDATES)
  );
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [evaluators, setEvaluators] = useState<EvaluatorProfile[]>(EVALUATORS);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: 'success' | 'info' | 'warning' | 'alert';
    title: string;
    message: string;
    timestamp: string;
  }>>([]);

  // Cutoff simulation values per stage
  const [simulatedCutoffs, setSimulatedCutoffs] = useState<Record<number, number>>({
    1: 65,
    2: 175,
    3: 210,
    4: 140,
    5: 105
  });

  const currentUserCandidate = useMemo(() => {
    return (
      candidates.find((c) => c.isCurrentUser) ||
      candidates.find((c) => c.pseudonymHandle.includes('YOU')) ||
      candidates[0]
    );
  }, [candidates]);

  const selectedCandidate = useMemo(() => {
    if (!selectedCandidateId) return null;
    return candidates.find((c) => c.id === selectedCandidateId) || null;
  }, [candidates, selectedCandidateId]);

  const addNotification = (notif: {
    type: 'success' | 'info' | 'warning' | 'alert';
    title: string;
    message: string;
  }) => {
    const id = 'notif-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
    setNotifications((prev) => [
      { ...notif, id, timestamp: new Date().toLocaleTimeString() },
      ...prev.slice(0, 4) // keep max 5 active
    ]);

    // auto dismiss after 6 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 6000);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const setSimulatedCutoff = (stageId: number, cutoff: number) => {
    setSimulatedCutoffs((prev) => ({ ...prev, [stageId]: cutoff }));
  };

  const resetSimulatedCutoffs = () => {
    setSimulatedCutoffs({
      1: 65,
      2: 175,
      3: 210,
      4: 140,
      5: 105
    });
  };

  // Submit Scorecard from Evaluator Studio
  const submitScorecard = (payload: {
    applicationId: string;
    stageId: number;
    evaluatorId: string;
    evaluatorRole: string;
    scores: CriterionScore[];
    strengthsRemark: string;
    gapsRemark: string;
    actionableAdvice: string;
  }) => {
    // 1. Mandatory feedback validation (> 150 characters total across remarks)
    const totalChars =
      payload.strengthsRemark.trim().length +
      payload.gapsRemark.trim().length +
      payload.actionableAdvice.trim().length;

    if (totalChars < 150) {
      return {
        success: false,
        error: `Mandatory constructive feedback must be at least 150 characters total (currently ${totalChars} chars). Constructive remarks are legally bound to candidate transparency.`
      };
    }

    // 2. Block vague rejections
    const bannedPhrases = [
      'not a fit',
      'not suitable',
      'no vibe',
      'just no',
      'bad fit',
      'culture mismatch',
      'not good enough',
      'didn\'t like'
    ];
    const combinedRemarks = `${payload.strengthsRemark} ${payload.gapsRemark} ${payload.actionableAdvice}`.toLowerCase();
    for (const phrase of bannedPhrases) {
      if (combinedRemarks.includes(phrase)) {
        return {
          success: false,
          error: `Unacceptable vague feedback detected: "${phrase}". Evaluators are strictly required to cite specific technical rubric behaviors, benchmark deficits, or concrete design omissions.`
        };
      }
    }

    const candidate = candidates.find((c) => c.id === payload.applicationId);
    if (!candidate) {
      return { success: false, error: 'Candidate application not found.' };
    }

    const stageConfig = job.stages.find((s) => s.id === payload.stageId);
    if (!stageConfig) {
      return { success: false, error: 'Pipeline stage not found.' };
    }

    const totalStageScore = payload.scores.reduce((sum, s) => sum + s.pointsAwarded, 0);
    const passedStage = totalStageScore >= stageConfig.cutoffPoints;

    const newEvaluation: StageEvaluation = {
      id: `eval-${Date.now()}`,
      applicationId: payload.applicationId,
      stageId: payload.stageId,
      evaluatorId: payload.evaluatorId,
      evaluatorRole: payload.evaluatorRole,
      scores: payload.scores,
      totalScore: totalStageScore,
      maxScore: stageConfig.maxPoints,
      strengthsRemark: payload.strengthsRemark,
      gapsRemark: payload.gapsRemark,
      actionableAdvice: payload.actionableAdvice,
      submittedAt: new Date().toISOString(),
      isCalibrated: true,
      isBlind: stageConfig.isBlind
    };

    // Calculate updated candidate state
    const existingEvals = candidate.stageEvaluations.filter((e) => e.stageId !== payload.stageId);
    const updatedEvals = [...existingEvals, newEvaluation];

    const newCompositeScore = updatedEvals.reduce((sum, e) => sum + e.totalScore, 0);

    const clearedStages = [...candidate.clearedStages];
    if (passedStage && !clearedStages.includes(payload.stageId)) {
      clearedStages.push(payload.stageId);
    } else if (!passedStage && clearedStages.includes(payload.stageId)) {
      const idx = clearedStages.indexOf(payload.stageId);
      if (idx > -1) clearedStages.splice(idx, 1);
    }

    let status = candidate.status;
    let statusNote = candidate.statusNote;

    if (!passedStage) {
      status = 'NOT_SELECTED';
      statusNote = `Not Selected (Cutoff Missed in Stage ${payload.stageId}: ${totalStageScore}/${stageConfig.cutoffPoints} pts). Scorecard and improvement roadmap preserved.`;
    } else {
      if (clearedStages.length === 5 && newCompositeScore >= job.passingCompositeCutoff) {
        status = 'OFFER_ZONE';
        statusNote = 'All 5 stages cleared! Composite score above offer cutoff threshold.';
      } else {
        status = 'ADVANCING';
        statusNote = `Stage ${payload.stageId} successfully cleared (${totalStageScore}/${stageConfig.maxPoints} pts).`;
      }
    }

    // Stage 3 & 4 combined for tie-breaking
    const s3Score = updatedEvals.find((e) => e.stageId === 3)?.totalScore || 0;
    const s4Score = updatedEvals.find((e) => e.stageId === 4)?.totalScore || 0;
    const s2Score = updatedEvals.find((e) => e.stageId === 2)?.totalScore || 0;

    const oldRank = candidate.currentRank;

    const updatedCandidates = candidates.map((c) => {
      if (c.id === payload.applicationId) {
        return {
          ...c,
          compositeScore: newCompositeScore,
          clearedStages,
          status,
          statusNote,
          stageEvaluations: updatedEvals,
          stage3and4CombinedScore: s3Score + s4Score,
          stage2Score: s2Score
        };
      }
      return c;
    });

    // Re-rank full leaderboard
    const reRanked = recalculateLeaderboard(updatedCandidates);
    setCandidates(reRanked);

    const newCandidateState = reRanked.find((c) => c.id === payload.applicationId);
    const newRank = newCandidateState?.currentRank || oldRank;

    // Append to immutable audit log
    const evalLog: AuditLogEntry = {
      id: `log-${Date.now()}-eval`,
      applicationId: candidate.id,
      candidateHandle: candidate.pseudonymHandle,
      actorRole: 'Evaluator',
      actorName: payload.evaluatorRole,
      eventType: 'EVALUATION_COMPLETED',
      title: `Stage ${payload.stageId} Scorecard Published`,
      description: `Evaluator awarded ${totalStageScore} / ${stageConfig.maxPoints} pts. Cutoff was ${stageConfig.cutoffPoints} pts. ${passedStage ? 'Stage Cleared' : 'Cutoff Missed'}.`,
      deltaPoints: totalStageScore,
      newCompositeScore,
      createdAt: new Date().toISOString()
    };

    const rankLog: AuditLogEntry | null =
      oldRank !== newRank
        ? {
            id: `log-${Date.now()}-rank`,
            applicationId: candidate.id,
            candidateHandle: candidate.pseudonymHandle,
            actorRole: 'Leaderboard Engine',
            actorName: 'Real-Time Rank Engine',
            eventType: 'RANK_CHANGE',
            title: 'Leaderboard Rank Shift',
            description: `${candidate.pseudonymHandle} shifted from Rank #${oldRank} to Rank #${newRank} (${
              newRank < oldRank ? `▲ ${oldRank - newRank}` : `▼ ${newRank - oldRank}`
            }).`,
            oldRank,
            newRank,
            createdAt: new Date().toISOString()
          }
        : null;

    setAuditLogs((prev) => [evalLog, ...(rankLog ? [rankLog] : []), ...prev]);

    // Push live reactive toast notification
    const rankDiff = oldRank - newRank;
    const rankText =
      rankDiff > 0
        ? `▲ ${rankDiff} ranks up to #${newRank}!`
        : rankDiff < 0
        ? `▼ ${Math.abs(rankDiff)} ranks down to #${newRank}`
        : `Maintained Rank #${newRank}`;

    addNotification({
      type: passedStage ? 'success' : 'warning',
      title: `Scorecard Published for ${candidate.pseudonymHandle}`,
      message: `Stage ${payload.stageId} recorded ${totalStageScore} pts. Leaderboard updated: ${rankText}`
    });

    return { success: true };
  };

  // Submit Candidate Score Review / Appeal
  const submitAppeal = (payload: {
    applicationId: string;
    stageId: number;
    criterionId: string;
    criterionTitle: string;
    candidateReason: string;
    evidenceUrl?: string;
  }) => {
    if (payload.candidateReason.trim().length < 30) {
      return {
        success: false,
        error: 'Appeal justification must be at least 30 characters and cite objective rubric evidence.'
      };
    }

    const candidate = candidates.find((c) => c.id === payload.applicationId);
    if (!candidate) return { success: false, error: 'Candidate not found.' };

    const newAppeal: ScoreAppeal = {
      id: `appeal-${Date.now()}`,
      applicationId: payload.applicationId,
      stageId: payload.stageId,
      criterionId: payload.criterionId,
      criterionTitle: payload.criterionTitle,
      candidateReason: payload.candidateReason,
      evidenceUrl: payload.evidenceUrl,
      status: 'PENDING',
      submittedAt: new Date().toISOString()
    };

    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === payload.applicationId) {
          return {
            ...c,
            appeals: [newAppeal, ...c.appeals]
          };
        }
        return c;
      })
    );

    const log: AuditLogEntry = {
      id: `log-${Date.now()}-appeal`,
      applicationId: candidate.id,
      candidateHandle: candidate.pseudonymHandle,
      actorRole: 'Candidate (Applicant)',
      actorName: candidate.isCurrentUser ? 'Alex Rivera (YOU)' : candidate.pseudonymHandle,
      eventType: 'APPEAL_SUBMITTED',
      title: `Score Review Appeal Logged: Stage ${payload.stageId}`,
      description: `Disputed criterion "${payload.criterionTitle}". 24-hour SLA panel review countdown initiated.`,
      createdAt: new Date().toISOString()
    };

    setAuditLogs((prev) => [log, ...prev]);

    addNotification({
      type: 'info',
      title: 'Score Appeal Registered',
      message: `Your appeal for "${payload.criterionTitle}" has been queued for blind panel reassessment within 24 hours.`
    });

    return { success: true };
  };

  // Recruiter / Panel resolves score appeal
  const resolveAppeal = (payload: {
    appealId: string;
    status: 'ACCEPTED' | 'REJECTED';
    resolutionNote: string;
    deltaPointsAwarded?: number;
    resolvedBy: string;
  }) => {
    let targetCandidate: CandidateApplication | undefined;

    setCandidates((prev) => {
      const updated = prev.map((cand) => {
        const appeal = cand.appeals.find((a) => a.id === payload.appealId);
        if (!appeal) return cand;

        targetCandidate = cand;
        const delta = payload.status === 'ACCEPTED' ? (payload.deltaPointsAwarded || 0) : 0;

        const updatedAppeals = cand.appeals.map((a) => {
          if (a.id === payload.appealId) {
            return {
              ...a,
              status: payload.status,
              resolutionNote: payload.resolutionNote,
              deltaPointsAwarded: delta,
              resolvedAt: new Date().toISOString(),
              resolvedBy: payload.resolvedBy
            };
          }
          return a;
        });

        // If delta points awarded, update stage evaluation score and composite score
        let updatedEvals = [...cand.stageEvaluations];
        if (delta > 0) {
          updatedEvals = updatedEvals.map((e) => {
            if (e.stageId === appeal.stageId) {
              const updatedScores = e.scores.map((s) => {
                if (s.criterionId === appeal.criterionId) {
                  return { ...s, pointsAwarded: s.pointsAwarded + delta };
                }
                return s;
              });
              return {
                ...e,
                scores: updatedScores,
                totalScore: e.totalScore + delta
              };
            }
            return e;
          });
        }

        const newComposite = updatedEvals.reduce((sum, e) => sum + e.totalScore, 0);

        return {
          ...cand,
          appeals: updatedAppeals,
          stageEvaluations: updatedEvals,
          compositeScore: newComposite
        };
      });

      return recalculateLeaderboard(updated);
    });

    if (targetCandidate) {
      const log: AuditLogEntry = {
        id: `log-${Date.now()}-appeal-res`,
        applicationId: targetCandidate.id,
        candidateHandle: targetCandidate.pseudonymHandle,
        actorRole: 'Recruiter / Review Panel',
        actorName: payload.resolvedBy,
        eventType: 'APPEAL_RESOLVED',
        title: `Appeal ${payload.status === 'ACCEPTED' ? 'Approved' : 'Declined'}`,
        description: payload.resolutionNote + (payload.deltaPointsAwarded ? ` (+${payload.deltaPointsAwarded} pts awarded)` : ''),
        deltaPoints: payload.deltaPointsAwarded,
        createdAt: new Date().toISOString()
      };
      setAuditLogs((prev) => [log, ...prev]);

      addNotification({
        type: payload.status === 'ACCEPTED' ? 'success' : 'warning',
        title: `Appeal ${payload.status === 'ACCEPTED' ? 'Upheld (+Points Awarded)' : 'Declined'}`,
        message: payload.resolutionNote
      });
    }
  };

  // Recruiter triggers formal offer package release
  const triggerOffer = (applicationId: string) => {
    const candidate = candidates.find((c) => c.id === applicationId);
    if (!candidate) return;

    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === applicationId) {
          return {
            ...c,
            status: 'OFFER_EXTENDED',
            statusNote: '🎉 Formal offer letter extended! Candidate verified across all 5 deterministic stage gates.'
          };
        }
        return c;
      })
    );

    const log: AuditLogEntry = {
      id: `log-${Date.now()}-offer`,
      applicationId: candidate.id,
      candidateHandle: candidate.pseudonymHandle,
      actorRole: 'Hiring Manager',
      actorName: 'Devon Miller (Director of Engineering)',
      eventType: 'OFFER_TRIGGERED',
      title: 'Formal Offer Extended',
      description: `Candidate ${candidate.pseudonymHandle} (Composite: ${candidate.compositeScore}/1000) officially extended written offer for open seat.`,
      createdAt: new Date().toISOString()
    };

    setAuditLogs((prev) => [log, ...prev]);

    addNotification({
      type: 'success',
      title: '🎉 Formal Offer Extended!',
      message: `Offer package successfully generated and sent to ${candidate.pseudonymHandle}!`
    });
  };

  const resetToDefaultDemoData = () => {
    setCandidates(recalculateLeaderboard(INITIAL_CANDIDATES));
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setEvaluators(EVALUATORS);
    setJob(INITIAL_JOB);
    resetSimulatedCutoffs();
    addNotification({
      type: 'info',
      title: 'Demo Environment Reset',
      message: 'Restored initial cohort state, test applicants, and baseline scores.'
    });
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        job,
        setJob,
        candidates,
        currentUserCandidate,
        auditLogs,
        evaluators,
        selectedCandidateId,
        setSelectedCandidateId,
        selectedCandidate,
        submitScorecard,
        submitAppeal,
        resolveAppeal,
        triggerOffer,
        simulatedCutoffs,
        setSimulatedCutoff,
        resetSimulatedCutoffs,
        notifications,
        dismissNotification,
        addNotification,
        resetToDefaultDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
