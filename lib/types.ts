export type UserRole = 'candidate' | 'evaluator' | 'recruiter' | 'public';

export type ApplicationStatus =
  | 'APPLIED'
  | 'ADVANCING'
  | 'OFFER_ZONE'
  | 'OFFER_EXTENDED'
  | 'NOT_SELECTED';

export interface RubricCriterion {
  id: string;
  stageId: number;
  title: string;
  description: string;
  maxPoints: number;
  subCategory?: string;
}

export interface PipelineStageConfig {
  id: number;
  order: number;
  name: string;
  code: string;
  weightPct: number;
  maxPoints: number;
  cutoffPoints: number;
  slaHours: number;
  description: string;
  isBlind: boolean;
  transparencyOutput: string;
  criteria: RubricCriterion[];
}

export interface CriterionScore {
  criterionId: string;
  pointsAwarded: number;
  notes?: string;
}

export interface StageEvaluation {
  id: string;
  applicationId: string;
  stageId: number;
  evaluatorId: string;
  evaluatorRole: string; // e.g. "Staff Engineer #2 (Blind Reviewer)"
  evaluatorName?: string;
  scores: CriterionScore[];
  totalScore: number;
  maxScore: number;
  strengthsRemark: string;
  gapsRemark: string;
  actionableAdvice: string;
  submittedAt: string;
  isCalibrated: boolean;
  isBlind: boolean;
}

export interface AuditLogEntry {
  id: string;
  applicationId: string;
  candidateHandle: string;
  actorRole: string;
  actorName: string;
  eventType: 
    | 'STAGE_SUBMISSION'
    | 'EVALUATION_COMPLETED'
    | 'RANK_CHANGE'
    | 'SLA_BREACH_ALERT'
    | 'APPEAL_SUBMITTED'
    | 'APPEAL_RESOLVED'
    | 'OFFER_TRIGGERED'
    | 'CUTOFF_SIMULATED';
  title: string;
  description: string;
  deltaPoints?: number;
  newCompositeScore?: number;
  oldRank?: number;
  newRank?: number;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface ScoreAppeal {
  id: string;
  applicationId: string;
  stageId: number;
  criterionId: string;
  criterionTitle: string;
  candidateReason: string;
  evidenceUrl?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  submittedAt: string;
  resolutionNote?: string;
  deltaPointsAwarded?: number;
  resolvedAt?: string;
  resolvedBy?: string;
}

export interface CandidateApplication {
  id: string;
  candidateId: string;
  fullName: string; // Hidden in blind mode
  email: string; // Hidden in blind mode
  avatar?: string;
  pseudonymHandle: string; // e.g., "AegisFalcon" or "CAND-8412"
  isCurrentUser: boolean; // Alex Rivera (YOU)
  jobId: string;
  currentStageOrder: number; // 1 to 5
  clearedStages: number[]; // e.g. [1, 2, 3, 4]
  compositeScore: number; // 0 to 1000
  currentRank: number; // 1 to 24
  previousRank?: number;
  percentile: number; // e.g., 97.2 -> Top 2.8%
  status: ApplicationStatus;
  statusNote?: string;
  appliedAt: string;
  stageEvaluations: StageEvaluation[];
  appeals: ScoreAppeal[];
  currentStageSlaDue: string; // ISO string
  slaBreached: boolean;
  lastStageCompletedAt?: string;
  
  // Tie-breaker components
  stage3and4CombinedScore: number;
  stage2Score: number;
  submissionTimestamps: Record<number, string>;

  // Blind profile info (masked for reviewers in stages 1 & 2)
  profileData: {
    githubUrl?: string;
    portfolioUrl?: string;
    yearsOfExperience: number;
    primaryStack: string[];
    // PII (masked in blind mode)
    maskedInBlind: {
      fullName: string;
      university: string;
      previousCompany: string;
      gender: string;
      location: string;
    };
    unmaskedSummary: string;
    codeSubmissionSnippet?: string;
    systemDesignDocTitle?: string;
  };
}

export interface JobRole {
  id: string;
  title: string;
  cohort: string;
  department: string;
  location: string;
  openSeats: number;
  totalMaxPoints: number;
  passingCompositeCutoff: number;
  status: 'ACTIVE' | 'CALIBRATION' | 'CLOSED';
  description: string;
  stages: PipelineStageConfig[];
}

export interface EvaluatorProfile {
  id: string;
  name: string;
  roleTitle: string;
  department: string;
  evaluationsCount: number;
  meanScoreAwarded: number;
  stdDeviation: number;
  zScoreBaseline: number; // e.g. +0.42 (lenient) or -0.85 (strict)
  strictnessRating: 'Harsh' | 'Calibrated' | 'Lenient';
  flaggedForCalibration: boolean;
}
