import { 
  JobRole, 
  PipelineStageConfig, 
  CandidateApplication, 
  EvaluatorProfile, 
  AuditLogEntry, 
  ScoreAppeal 
} from './types';

export const PIPELINE_STAGES: PipelineStageConfig[] = [
  {
    id: 1,
    order: 1,
    code: 'STAGE_1',
    name: 'Proof-of-Work & Profile Audit',
    weightPct: 10,
    maxPoints: 100,
    cutoffPoints: 65,
    slaHours: 48,
    description: 'Verifiable production achievements, open-source work, and domain stack depth.',
    isBlind: true,
    transparencyOutput: 'Skill match breakdown, GitHub/portfolio audit score, verifier remark',
    criteria: [
      {
        id: 'stg1_c1',
        stageId: 1,
        title: 'Verifiable Project / Outcome Depth',
        description: 'Quality of shipped features, architectural complexity, and demonstrable user or business scale.',
        maxPoints: 40,
        subCategory: 'Portfolio'
      },
      {
        id: 'stg1_c2',
        stageId: 1,
        title: 'Core Tech & Domain Stack Alignment',
        description: 'Proficiency in TypeScript, distributed systems, Next.js, and modern concurrency models.',
        maxPoints: 35,
        subCategory: 'Tech Alignment'
      },
      {
        id: 'stg1_c3',
        stageId: 1,
        title: 'Documentation, Open-Source & Clarity',
        description: 'Code readability, PR descriptions, test hygiene, and technical writing rigor.',
        maxPoints: 25,
        subCategory: 'Engineering Hygiene'
      }
    ]
  },
  {
    id: 2,
    order: 2,
    code: 'STAGE_2',
    name: 'Blind Practical Assessment',
    weightPct: 25,
    maxPoints: 250,
    cutoffPoints: 175,
    slaHours: 72,
    description: 'Anonymized real-world engineering challenge with automated test suites and rubric grading.',
    isBlind: true,
    transparencyOutput: 'Test-case pass rate, code quality score, speed efficiency bonus, detailed critique',
    criteria: [
      {
        id: 'stg2_c1',
        stageId: 2,
        title: 'Functional Accuracy & Edge-Case Coverage',
        description: 'Passes all primary and hidden test suites, handles nullability, race conditions, and edge boundaries.',
        maxPoints: 100,
        subCategory: 'Correctness'
      },
      {
        id: 'stg2_c2',
        stageId: 2,
        title: 'Craft, Maintainability & Structural Quality',
        description: 'Clean abstractions, modular separation of concerns, DRY principles, and type safety.',
        maxPoints: 80,
        subCategory: 'Code Craft'
      },
      {
        id: 'stg2_c3',
        stageId: 2,
        title: 'Clarity of Reasoning & Assumptions',
        description: 'Structured README, trade-off notes, algorithmic complexity explanations, and setup simplicity.',
        maxPoints: 40,
        subCategory: 'Communication'
      },
      {
        id: 'stg2_c4',
        stageId: 2,
        title: 'Early Submission Efficiency Bonus',
        description: 'Awarded for complete, high-quality submissions delivered within the first 50% of the SLA window.',
        maxPoints: 30,
        subCategory: 'Velocity Bonus'
      }
    ]
  },
  {
    id: 3,
    order: 3,
    code: 'STAGE_3',
    name: 'Core Domain Deep-Dive',
    weightPct: 30,
    maxPoints: 300,
    cutoffPoints: 210,
    slaHours: 48,
    description: 'Interactive technical interview testing first-principles thinking, live debugging, and system depth.',
    isBlind: false,
    transparencyOutput: 'Criterion-by-criterion interviewer scores, strengths, and missed signals',
    criteria: [
      {
        id: 'stg3_c1',
        stageId: 3,
        title: 'First-Principles Problem Solving',
        description: 'Ability to decompose unstructured technical bottlenecks, propose foundational invariants, and analyze time/space bottlenecks.',
        maxPoints: 120,
        subCategory: 'Problem Solving'
      },
      {
        id: 'stg3_c2',
        stageId: 3,
        title: 'Execution Speed & Debugging Agility',
        description: 'Hypothesis generation under live breakages, systematic binary search of root causes, and clean fix deployment.',
        maxPoints: 90,
        subCategory: 'Execution'
      },
      {
        id: 'stg3_c3',
        stageId: 3,
        title: 'Trade-off Articulation & Communication',
        description: 'Clear defense of architectural decisions, memory vs latency trade-offs, and receptiveness to interviewer counter-proposals.',
        maxPoints: 90,
        subCategory: 'Technical Dialogue'
      }
    ]
  },
  {
    id: 4,
    order: 4,
    code: 'STAGE_4',
    name: 'System Design / Applied Case',
    weightPct: 20,
    maxPoints: 200,
    cutoffPoints: 140,
    slaHours: 48,
    description: 'End-to-end distributed system design for high-concurrency event ingestion, caching, and failover.',
    isBlind: false,
    transparencyOutput: 'Architecture trade-off scorecard, scalability rating, panel notes',
    criteria: [
      {
        id: 'stg4_c1',
        stageId: 4,
        title: 'Constraints, Scale & Risk Handling',
        description: 'Identifies single points of failure, partition tolerance, backpressure management, and replication lag strategies.',
        maxPoints: 80,
        subCategory: 'Reliability'
      },
      {
        id: 'stg4_c2',
        stageId: 4,
        title: 'User & Business Impact Alignment',
        description: 'Cost modeling per million requests, latency SLAs (p99 < 50ms), and API ergonomical simplicity for product consumers.',
        maxPoints: 60,
        subCategory: 'Product Sense'
      },
      {
        id: 'stg4_c3',
        stageId: 4,
        title: 'Structured Thinking Under Ambiguity',
        description: 'Asks clarifying boundary questions, drives scope prioritization, and avoids over-engineering.',
        maxPoints: 60,
        subCategory: 'Design Method'
      }
    ]
  },
  {
    id: 5,
    order: 5,
    code: 'STAGE_5',
    name: 'Bar-Raiser & Culture-Add',
    weightPct: 15,
    maxPoints: 150,
    cutoffPoints: 105,
    slaHours: 24,
    description: 'Evaluation by an independent bar-raiser focusing on high ownership, cross-functional leverage, and integrity.',
    isBlind: false,
    transparencyOutput: 'Ownership, collaboration, and leadership calibration score + final decision note',
    criteria: [
      {
        id: 'stg5_c1',
        stageId: 5,
        title: 'Extreme Ownership & Accountability Signals',
        description: 'Track record of taking responsibility for outages, post-mortems, end-to-end delivery without passing blame.',
        maxPoints: 60,
        subCategory: 'Accountability'
      },
      {
        id: 'stg5_c2',
        stageId: 5,
        title: 'Cross-Functional Empathy & Collaboration',
        description: 'Ability to partner effectively with Product, Design, and non-technical stakeholders under tight deadlines.',
        maxPoints: 50,
        subCategory: 'Teamwork'
      },
      {
        id: 'stg5_c3',
        stageId: 5,
        title: 'Coachability & Learning Velocity',
        description: 'Evidence of rapid unlearning, response to constructive critiques, and proactive mentorship of peers.',
        maxPoints: 40,
        subCategory: 'Growth'
      }
    ]
  }
];

export const INITIAL_JOB: JobRole = {
  id: 'job-senior-fullstack-2026-q4',
  title: 'Senior Full-Stack Product Engineer',
  cohort: 'Cohort #2026-Q4',
  department: 'Core Product & Infrastructure',
  location: 'San Francisco, CA / Remote (US/EU)',
  openSeats: 3,
  totalMaxPoints: 1000,
  passingCompositeCutoff: 695,
  status: 'ACTIVE',
  description: 'Join the core team building deterministic high-concurrency cloud systems. We eliminate opaque hiring with an open candidate leaderboard, public stage cutoffs, and guaranteed 48-hour constructive feedback.',
  stages: PIPELINE_STAGES
};

export const EVALUATORS: EvaluatorProfile[] = [
  {
    id: 'eval-1',
    name: 'Dr. Sarah Chen',
    roleTitle: 'Principal Systems Architect',
    department: 'Core Infrastructure',
    evaluationsCount: 38,
    meanScoreAwarded: 812,
    stdDeviation: 41,
    zScoreBaseline: 0.22,
    strictnessRating: 'Calibrated',
    flaggedForCalibration: false
  },
  {
    id: 'eval-2',
    name: 'Marcus Vance',
    roleTitle: 'Staff Engineer (Blind Grader)',
    department: 'Backend Platform',
    evaluationsCount: 42,
    meanScoreAwarded: 728,
    stdDeviation: 64,
    zScoreBaseline: -1.68,
    strictnessRating: 'Harsh',
    flaggedForCalibration: true
  },
  {
    id: 'eval-3',
    name: 'Elena Rostova',
    roleTitle: 'Lead Product Engineer',
    department: 'Frontend Experience',
    evaluationsCount: 35,
    meanScoreAwarded: 868,
    stdDeviation: 36,
    zScoreBaseline: 1.58,
    strictnessRating: 'Lenient',
    flaggedForCalibration: true
  },
  {
    id: 'eval-4',
    name: 'Devon Miller',
    roleTitle: 'Director of Engineering',
    department: 'Engineering Leadership',
    evaluationsCount: 29,
    meanScoreAwarded: 798,
    stdDeviation: 44,
    zScoreBaseline: -0.08,
    strictnessRating: 'Calibrated',
    flaggedForCalibration: false
  },
  {
    id: 'eval-5',
    name: 'Priya Patel',
    roleTitle: 'Designated Bar-Raiser',
    department: 'Platform Architecture',
    evaluationsCount: 45,
    meanScoreAwarded: 804,
    stdDeviation: 39,
    zScoreBaseline: 0.04,
    strictnessRating: 'Calibrated',
    flaggedForCalibration: false
  }
];

export const INITIAL_CANDIDATES: CandidateApplication[] = [
  {
    id: 'app-001',
    candidateId: 'cand-9281',
    fullName: 'David K. Sorenson',
    email: 'd.sorenson@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    pseudonymHandle: 'AegisFalcon',
    isCurrentUser: false,
    jobId: 'job-senior-fullstack-2026-q4',
    currentStageOrder: 5,
    clearedStages: [1, 2, 3, 4, 5],
    compositeScore: 914,
    currentRank: 1,
    previousRank: 1,
    percentile: 98.5,
    status: 'OFFER_ZONE',
    statusNote: 'Rank #1 overall. Crossed final Bar-Raiser threshold with exceptional system design depth.',
    appliedAt: '2026-10-28T09:15:00Z',
    currentStageSlaDue: '2026-11-16T18:00:00Z',
    slaBreached: false,
    stage3and4CombinedScore: 472,
    stage2Score: 242,
    submissionTimestamps: {
      1: '2026-10-29T11:00:00Z',
      2: '2026-11-01T14:30:00Z',
      3: '2026-11-04T16:00:00Z',
      4: '2026-11-08T17:15:00Z',
      5: '2026-11-12T10:45:00Z'
    },
    profileData: {
      githubUrl: 'https://github.com/aegisfalcon',
      portfolioUrl: 'https://aegisfalcon.dev',
      yearsOfExperience: 8,
      primaryStack: ['Rust', 'TypeScript', 'Distributed Key-Value', 'Next.js', 'PostgreSQL'],
      maskedInBlind: {
        fullName: 'David K. Sorenson',
        university: 'Stanford University (BS CS)',
        previousCompany: 'Stripe, Cloudflare',
        gender: 'Male',
        location: 'San Francisco, CA'
      },
      unmaskedSummary: 'Built production rate-limiters handling 450k req/sec with Raft consensus. Extensive open-source contributions to Tokio and RocksDB bindings.',
      codeSubmissionSnippet: '// Lock-free ring buffer implementation with zero-copy SIMD serialization\nexport class ConcurrentPipelineRingBuffer<T> {...}'
    },
    appeals: [],
    stageEvaluations: [
      {
        id: 'eval-app001-s1',
        applicationId: 'app-001',
        stageId: 1,
        evaluatorId: 'eval-2',
        evaluatorRole: 'Staff Engineer (Blind Grader)',
        isBlind: true,
        scores: [
          { criterionId: 'stg1_c1', pointsAwarded: 38 },
          { criterionId: 'stg1_c2', pointsAwarded: 34 },
          { criterionId: 'stg1_c3', pointsAwarded: 24 }
        ],
        totalScore: 96,
        maxScore: 100,
        strengthsRemark: 'High-signal public GitHub artifacts with rigorous documentation and zero superfluous dependencies. Shipped real distributed state machines.',
        gapsRemark: 'Minor gap in client-side accessibility specs on personal portfolio pages.',
        actionableAdvice: 'Document benchmark test harness methodology more prominently in repository root.',
        submittedAt: '2026-10-30T10:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app001-s2',
        applicationId: 'app-001',
        stageId: 2,
        evaluatorId: 'eval-2',
        evaluatorRole: 'Staff Engineer (Blind Grader)',
        isBlind: true,
        scores: [
          { criterionId: 'stg2_c1', pointsAwarded: 98 },
          { criterionId: 'stg2_c2', pointsAwarded: 76 },
          { criterionId: 'stg2_c3', pointsAwarded: 38 },
          { criterionId: 'stg2_c4', pointsAwarded: 30 }
        ],
        totalScore: 242,
        maxScore: 250,
        strengthsRemark: '100% test-suite pass rate including all hidden race condition edge cases. Submitted in the top 20% of the timeline window earning full speed bonus.',
        gapsRemark: 'Slightly dense abstraction around error type cascades could benefit from flattening.',
        actionableAdvice: 'Use discriminated unions rather than nested try/catch wrapper objects for custom errors.',
        submittedAt: '2026-11-02T16:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app001-s3',
        applicationId: 'app-001',
        stageId: 3,
        evaluatorId: 'eval-1',
        evaluatorRole: 'Principal Systems Architect',
        isBlind: false,
        scores: [
          { criterionId: 'stg3_c1', pointsAwarded: 114 },
          { criterionId: 'stg3_c2', pointsAwarded: 84 },
          { criterionId: 'stg3_c3', pointsAwarded: 86 }
        ],
        totalScore: 284,
        maxScore: 300,
        strengthsRemark: 'Deconstructed a complex memory fragmentation simulation from first principles within 12 minutes. Exceptional clarity on cache invalidation boundaries.',
        gapsRemark: 'Could have explored eBPF tracing alternatives sooner during the kernel observability segment.',
        actionableAdvice: 'Continue deepening production Linux cgroup resource quota intuition.',
        submittedAt: '2026-11-05T12:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app001-s4',
        applicationId: 'app-001',
        stageId: 4,
        evaluatorId: 'eval-4',
        evaluatorRole: 'Director of Engineering',
        isBlind: false,
        scores: [
          { criterionId: 'stg4_c1', pointsAwarded: 76 },
          { criterionId: 'stg4_c2', pointsAwarded: 56 },
          { criterionId: 'stg4_c3', pointsAwarded: 56 }
        ],
        totalScore: 188,
        maxScore: 200,
        strengthsRemark: 'Designed an elegant dual-write ingestion bus with idempotent consumers and Redis Bloom filters. Anticipated partition splits accurately.',
        gapsRemark: 'Estimated cloud egress costs were slightly aggressive on inter-AZ replica transfers.',
        actionableAdvice: 'Incorporate active compression algorithms into cross-region egress calculations.',
        submittedAt: '2026-11-09T18:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app001-s5',
        applicationId: 'app-001',
        stageId: 5,
        evaluatorId: 'eval-5',
        evaluatorRole: 'Designated Bar-Raiser',
        isBlind: false,
        scores: [
          { criterionId: 'stg5_c1', pointsAwarded: 42 },
          { criterionId: 'stg5_c2', pointsAwarded: 35 },
          { criterionId: 'stg5_c3', pointsAwarded: 27 }
        ],
        totalScore: 104,
        maxScore: 150,
        strengthsRemark: 'Strong conviction in root cause ownership without passing blame. Exemplary incident retrospect culture.',
        gapsRemark: 'Interviewee tends to take on solo heroic debugging rather than immediately enlisting cross-functional teammates during Sev1 incidents.',
        actionableAdvice: 'Practice earlier delegation and structured escalation paths when orchestrating multi-team crisis responses.',
        submittedAt: '2026-11-13T11:00:00Z',
        isCalibrated: true
      }
    ]
  },
  {
    id: 'app-002',
    candidateId: 'cand-7402',
    fullName: 'Maya Lin Chen',
    email: 'maya.chen@example.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    pseudonymHandle: 'QuantumNova',
    isCurrentUser: false,
    jobId: 'job-senior-fullstack-2026-q4',
    currentStageOrder: 5,
    clearedStages: [1, 2, 3, 4, 5],
    compositeScore: 896,
    currentRank: 2,
    previousRank: 2,
    percentile: 96.0,
    status: 'OFFER_ZONE',
    statusNote: 'Rank #2 overall. Top marks in full-stack UI performance and reactive state architectures.',
    appliedAt: '2026-10-29T10:00:00Z',
    currentStageSlaDue: '2026-11-16T18:00:00Z',
    slaBreached: false,
    stage3and4CombinedScore: 462,
    stage2Score: 236,
    submissionTimestamps: {
      1: '2026-10-30T14:00:00Z',
      2: '2026-11-02T11:00:00Z',
      3: '2026-11-05T15:30:00Z',
      4: '2026-11-09T16:00:00Z',
      5: '2026-11-13T14:00:00Z'
    },
    profileData: {
      githubUrl: 'https://github.com/quantumnova',
      portfolioUrl: 'https://mayachen.tech',
      yearsOfExperience: 7,
      primaryStack: ['React', 'Next.js App Router', 'TypeScript', 'Web Workers', 'WebSockets', 'Tailwind'],
      maskedInBlind: {
        fullName: 'Maya Lin Chen',
        university: 'Carnegie Mellon University (MS ECE)',
        previousCompany: 'Figma, Vercel',
        gender: 'Female',
        location: 'Seattle, WA'
      },
      unmaskedSummary: 'Authored virtualized multi-column table rendering 200,000 DOM rows at steady 60fps with canvas fallback.',
      codeSubmissionSnippet: '// OffscreenCanvas worker for WebGL timeline audio spectrum'
    },
    appeals: [],
    stageEvaluations: [
      {
        id: 'eval-app002-s1',
        applicationId: 'app-002',
        stageId: 1,
        evaluatorId: 'eval-1',
        evaluatorRole: 'Principal Systems Architect',
        isBlind: true,
        scores: [
          { criterionId: 'stg1_c1', pointsAwarded: 39 },
          { criterionId: 'stg1_c2', pointsAwarded: 34 },
          { criterionId: 'stg1_c3', pointsAwarded: 23 }
        ],
        totalScore: 96,
        maxScore: 100,
        strengthsRemark: 'Exceptional open-source UI libraries with 4.5k stars and spotless test coverage. Flawless type definitions and zero any leaks.',
        gapsRemark: 'Could showcase more raw backend distributed consensus tooling.',
        actionableAdvice: 'Broaden portfolio samples with multi-node replication benchmarks.',
        submittedAt: '2026-10-31T12:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app002-s2',
        applicationId: 'app-002',
        stageId: 2,
        evaluatorId: 'eval-2',
        evaluatorRole: 'Staff Engineer (Blind Grader)',
        isBlind: true,
        scores: [
          { criterionId: 'stg2_c1', pointsAwarded: 96 },
          { criterionId: 'stg2_c2', pointsAwarded: 78 },
          { criterionId: 'stg2_c3', pointsAwarded: 36 },
          { criterionId: 'stg2_c4', pointsAwarded: 26 }
        ],
        totalScore: 236,
        maxScore: 250,
        strengthsRemark: 'Pristine code structure with custom React hooks, clean memoization guards, and zero unnecessary re-renders under synthetic stress.',
        gapsRemark: 'One edge case on offline queue reconnect synchronization required manual trigger.',
        actionableAdvice: 'Add exponential backoff jitter directly to the offline synchronization worker.',
        submittedAt: '2026-11-03T18:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app002-s3',
        applicationId: 'app-002',
        stageId: 3,
        evaluatorId: 'eval-3',
        evaluatorRole: 'Lead Product Engineer',
        isBlind: false,
        scores: [
          { criterionId: 'stg3_c1', pointsAwarded: 110 },
          { criterionId: 'stg3_c2', pointsAwarded: 84 },
          { criterionId: 'stg3_c3', pointsAwarded: 86 }
        ],
        totalScore: 280,
        maxScore: 300,
        strengthsRemark: 'Mastery of browser render lifecycle, layout shifts, paint bottlenecks, and microtask scheduling.',
        gapsRemark: 'Slight hesitation when asked about kernel-level TCP socket buffers.',
        actionableAdvice: 'Review Linux networking stack socket buffers (SO_RCVBUF, SO_SNDBUF).',
        submittedAt: '2026-11-06T15:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app002-s4',
        applicationId: 'app-002',
        stageId: 4,
        evaluatorId: 'eval-1',
        evaluatorRole: 'Principal Systems Architect',
        isBlind: false,
        scores: [
          { criterionId: 'stg4_c1', pointsAwarded: 74 },
          { criterionId: 'stg4_c2', pointsAwarded: 56 },
          { criterionId: 'stg4_c3', pointsAwarded: 52 }
        ],
        totalScore: 182,
        maxScore: 200,
        strengthsRemark: 'Designed a real-time collaborative document editor with Operational Transformation (OT) and CRDT fallback nodes.',
        gapsRemark: 'Did not detail garbage collection of deleted CRDT tombstone nodes in depth.',
        actionableAdvice: 'Detail epoch-based tombstone pruning for long-running document histories.',
        submittedAt: '2026-11-10T12:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app002-s5',
        applicationId: 'app-002',
        stageId: 5,
        evaluatorId: 'eval-5',
        evaluatorRole: 'Designated Bar-Raiser',
        isBlind: false,
        scores: [
          { criterionId: 'stg5_c1', pointsAwarded: 40 },
          { criterionId: 'stg5_c2', pointsAwarded: 35 },
          { criterionId: 'stg5_c3', pointsAwarded: 27 }
        ],
        totalScore: 102,
        maxScore: 150,
        strengthsRemark: 'High empathy for junior engineers, active champion for accessibility and inclusive design reviews.',
        gapsRemark: 'Could speak more about balancing technical perfectionism with critical launch time-to-market constraints.',
        actionableAdvice: 'Explicitly quantify when an 80/20 product MVP beats an exhaustive perfectionist release.',
        submittedAt: '2026-11-14T10:00:00Z',
        isCalibrated: true
      }
    ]
  },
  {
    id: 'app-003',
    candidateId: 'cand-8114',
    fullName: 'Liam Patrick Hayes',
    email: 'l.hayes@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    pseudonymHandle: 'Hyperion77',
    isCurrentUser: false,
    jobId: 'job-senior-fullstack-2026-q4',
    currentStageOrder: 5,
    clearedStages: [1, 2, 3, 4, 5],
    compositeScore: 866,
    currentRank: 3,
    previousRank: 3,
    percentile: 91.5,
    status: 'OFFER_ZONE',
    statusNote: 'Rank #3 overall. Occupies final open seat allocation. Strong data-pipeline architecture.',
    appliedAt: '2026-10-30T11:20:00Z',
    currentStageSlaDue: '2026-11-16T18:00:00Z',
    slaBreached: false,
    stage3and4CombinedScore: 448,
    stage2Score: 230,
    submissionTimestamps: {
      1: '2026-10-31T15:00:00Z',
      2: '2026-11-03T17:00:00Z',
      3: '2026-11-06T18:00:00Z',
      4: '2026-11-10T14:00:00Z',
      5: '2026-11-14T15:00:00Z'
    },
    profileData: {
      githubUrl: 'https://github.com/hyperion77',
      portfolioUrl: 'https://hyperion.io',
      yearsOfExperience: 9,
      primaryStack: ['Go', 'Node.js', 'PostgreSQL', 'Kafka', 'React'],
      maskedInBlind: {
        fullName: 'Liam Patrick Hayes',
        university: 'University of Michigan (BS CS)',
        previousCompany: 'Datadog, HashiCorp',
        gender: 'Male',
        location: 'Austin, TX'
      },
      unmaskedSummary: 'Architected high-throughput ingestion clusters processing 30GB/min of structured metrics.',
      codeSubmissionSnippet: '// Kafka partition consumer group rebalancing handler'
    },
    appeals: [],
    stageEvaluations: [
      {
        id: 'eval-app003-s1',
        applicationId: 'app-003',
        stageId: 1,
        evaluatorId: 'eval-4',
        evaluatorRole: 'Director of Engineering',
        isBlind: true,
        scores: [
          { criterionId: 'stg1_c1', pointsAwarded: 37 },
          { criterionId: 'stg1_c2', pointsAwarded: 33 },
          { criterionId: 'stg1_c3', pointsAwarded: 22 }
        ],
        totalScore: 92,
        maxScore: 100,
        strengthsRemark: 'Impressive track record of shipping fault-tolerant data pipelines with clean GitHub release notes.',
        gapsRemark: 'Front-end repository demonstrates older class-based React patterns in secondary utilities.',
        actionableAdvice: 'Update sample repositories to showcase modern React 19 functional hooks and server components.',
        submittedAt: '2026-11-01T12:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app003-s2',
        applicationId: 'app-003',
        stageId: 2,
        evaluatorId: 'eval-2',
        evaluatorRole: 'Staff Engineer (Blind Grader)',
        isBlind: true,
        scores: [
          { criterionId: 'stg2_c1', pointsAwarded: 94 },
          { criterionId: 'stg2_c2', pointsAwarded: 74 },
          { criterionId: 'stg2_c3', pointsAwarded: 38 },
          { criterionId: 'stg2_c4', pointsAwarded: 24 }
        ],
        totalScore: 230,
        maxScore: 250,
        strengthsRemark: 'Clean architecture with robust error recovery loops and thorough test boundaries.',
        gapsRemark: 'Could have utilized worker threads for the heavy hashing step rather than synchronous event loop chunks.',
        actionableAdvice: 'Leverage Piscina or native Web Workers for CPU-bound hashing calculations.',
        submittedAt: '2026-11-04T12:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app003-s3',
        applicationId: 'app-003',
        stageId: 3,
        evaluatorId: 'eval-1',
        evaluatorRole: 'Principal Systems Architect',
        isBlind: false,
        scores: [
          { criterionId: 'stg3_c1', pointsAwarded: 112 },
          { criterionId: 'stg3_c2', pointsAwarded: 80 },
          { criterionId: 'stg3_c3', pointsAwarded: 82 }
        ],
        totalScore: 274,
        maxScore: 300,
        strengthsRemark: 'High command of database isolation levels, multi-version concurrency control (MVCC), and phantom read prevention.',
        gapsRemark: 'Slightly slow on live syntax debugging of a recursive tree query.',
        actionableAdvice: 'Rehearse Common Table Expression (CTE) recursive queries without IDE assistance.',
        submittedAt: '2026-11-07T11:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app003-s4',
        applicationId: 'app-003',
        stageId: 4,
        evaluatorId: 'eval-4',
        evaluatorRole: 'Director of Engineering',
        isBlind: false,
        scores: [
          { criterionId: 'stg4_c1', pointsAwarded: 72 },
          { criterionId: 'stg4_c2', pointsAwarded: 52 },
          { criterionId: 'stg4_c3', pointsAwarded: 50 }
        ],
        totalScore: 174,
        maxScore: 200,
        strengthsRemark: 'Clear partitioning strategy using consistent hashing ring with virtual nodes.',
        gapsRemark: 'Cost modeling overlooked secondary cross-region read replicas bandwidth.',
        actionableAdvice: 'Factor multi-cloud egress transit gateways into operational balance sheets.',
        submittedAt: '2026-11-11T13:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app003-s5',
        applicationId: 'app-003',
        stageId: 5,
        evaluatorId: 'eval-5',
        evaluatorRole: 'Designated Bar-Raiser',
        isBlind: false,
        scores: [
          { criterionId: 'stg5_c1', pointsAwarded: 38 },
          { criterionId: 'stg5_c2', pointsAwarded: 32 },
          { criterionId: 'stg5_c3', pointsAwarded: 26 }
        ],
        totalScore: 96,
        maxScore: 150,
        strengthsRemark: 'Pragmatic leadership, comfortable saying no to premature optimizations when business context dictates.',
        gapsRemark: 'Could share more stories of cross-functional alignment with product marketing.',
        actionableAdvice: 'Articulate engineering wins in direct customer retention and business revenue metrics.',
        submittedAt: '2026-11-15T12:00:00Z',
        isCalibrated: true
      }
    ]
  },
  {
    id: 'app-004',
    candidateId: 'cand-8412',
    fullName: 'Alex Rivera (YOU)',
    email: 'alex.rivera.dev@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    pseudonymHandle: 'AegisSeeker (YOU)',
    isCurrentUser: true,
    jobId: 'job-senior-fullstack-2026-q4',
    currentStageOrder: 5,
    clearedStages: [1, 2, 3, 4],
    compositeScore: 785, // currently sum of stages 1-4 = 92 + 235 + 278 + 180 = 785!
    currentRank: 4,
    previousRank: 5,
    percentile: 87.5,
    status: 'ADVANCING',
    statusNote: 'Live Rank #4. Just 81 points behind Rank #3. Stage 5 Bar-Raiser interview completed—pending final scorecard publication!',
    appliedAt: '2026-11-01T08:30:00Z',
    currentStageSlaDue: '2026-11-19T21:45:00Z', // Active SLA countdown!
    slaBreached: false,
    stage3and4CombinedScore: 458,
    stage2Score: 235,
    submissionTimestamps: {
      1: '2026-11-02T10:15:00Z',
      2: '2026-11-05T12:00:00Z',
      3: '2026-11-08T14:30:00Z',
      4: '2026-11-12T16:00:00Z'
    },
    profileData: {
      githubUrl: 'https://github.com/alexrivera-build',
      portfolioUrl: 'https://alexrivera.engineer',
      yearsOfExperience: 6,
      primaryStack: ['Next.js 15/16', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Redis ZSET', 'WebSockets'],
      maskedInBlind: {
        fullName: 'Alex Rivera',
        university: 'UC Berkeley (BS EECS)',
        previousCompany: 'Series-B Fintech (StashPay), Open-source Lead',
        gender: 'Non-binary',
        location: 'Oakland, CA'
      },
      unmaskedSummary: 'Engineered real-time transparent orderbook engine with millisecond WebSocket broadcasts. Deep focus on design systems and deterministic state machines.',
      codeSubmissionSnippet: '// Lock-free event ring queue with atomic CAS pointer swaps\nexport class DeterministicAuditQueue {...}',
      systemDesignDocTitle: 'High-Concurrency Leaderboard Ingestion & Multi-Tenant RBAC Architecture'
    },
    appeals: [
      {
        id: 'appeal-001',
        applicationId: 'app-004',
        stageId: 2,
        criterionId: 'stg2_c4',
        criterionTitle: 'Early Submission Efficiency Bonus',
        candidateReason: 'My commit hash was pushed at 14h 22m into the 72h window, well inside the 36h (50%) bonus cutoff. The automated evaluator timestamp recorded the secondary webhook trigger at 40h instead of the Git commit signature.',
        evidenceUrl: 'https://github.com/alexrivera-build/challenge/commit/7f8a92b',
        status: 'ACCEPTED',
        submittedAt: '2026-11-06T15:00:00Z',
        resolutionNote: 'Audit confirmed: Git cryptographically signed commit was verified at 14h 22m. Re-awarded 10 additional speed bonus points.',
        deltaPointsAwarded: 10,
        resolvedAt: '2026-11-07T09:30:00Z',
        resolvedBy: 'Marcus Vance (Staff Engineer)'
      }
    ],
    stageEvaluations: [
      {
        id: 'eval-app004-s1',
        applicationId: 'app-004',
        stageId: 1,
        evaluatorId: 'eval-1',
        evaluatorRole: 'Principal Systems Architect (Blind Reviewer)',
        isBlind: true,
        scores: [
          { criterionId: 'stg1_c1', pointsAwarded: 37 },
          { criterionId: 'stg1_c2', pointsAwarded: 33 },
          { criterionId: 'stg1_c3', pointsAwarded: 22 }
        ],
        totalScore: 92,
        maxScore: 100,
        strengthsRemark: 'High-signal open source portfolio. Code demonstrates exceptional type safety, comprehensive README docs, and zero sloppy any types.',
        gapsRemark: 'Could highlight performance benchmark graphs more explicitly on the public landing page.',
        actionableAdvice: 'Add an automated GitHub Action that generates KaTeX-formatted benchmark delta tables on pull requests.',
        submittedAt: '2026-11-03T11:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app004-s2',
        applicationId: 'app-004',
        stageId: 2,
        evaluatorId: 'eval-2',
        evaluatorRole: 'Staff Engineer (Blind Grader)',
        isBlind: true,
        scores: [
          { criterionId: 'stg2_c1', pointsAwarded: 96 },
          { criterionId: 'stg2_c2', pointsAwarded: 76 },
          { criterionId: 'stg2_c3', pointsAwarded: 37 },
          { criterionId: 'stg2_c4', pointsAwarded: 26 } // +10 appeal applied = 26 pts
        ],
        totalScore: 235,
        maxScore: 250,
        strengthsRemark: 'All unit, integration, and load test suites passed with 100% accuracy. Excellent code separation between data models, storage adapters, and business logic.',
        gapsRemark: 'Memory footprint could be lowered by 15% using TypedArrays instead of raw JavaScript object maps.',
        actionableAdvice: 'Benchmark Uint8Array buffers for high-density socket payloads.',
        submittedAt: '2026-11-06T14:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app004-s3',
        applicationId: 'app-004',
        stageId: 3,
        evaluatorId: 'eval-3',
        evaluatorRole: 'Lead Product Engineer',
        isBlind: false,
        scores: [
          { criterionId: 'stg3_c1', pointsAwarded: 112 },
          { criterionId: 'stg3_c2', pointsAwarded: 84 },
          { criterionId: 'stg3_c3', pointsAwarded: 82 }
        ],
        totalScore: 278,
        maxScore: 300,
        strengthsRemark: 'Instantly grasped subtle distributed state synchronization issue during the live scenario. Communicated invariants cleanly without defensive bias.',
        gapsRemark: 'Slightly slow to propose database indexing strategy for compound filter keys.',
        actionableAdvice: 'Review Postgres BRIN vs B-Tree indexing behavior on monotonically increasing timestamp columns.',
        submittedAt: '2026-11-09T16:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app004-s4',
        applicationId: 'app-004',
        stageId: 4,
        evaluatorId: 'eval-1',
        evaluatorRole: 'Principal Systems Architect',
        isBlind: false,
        scores: [
          { criterionId: 'stg4_c1', pointsAwarded: 72 },
          { criterionId: 'stg4_c2', pointsAwarded: 54 },
          { criterionId: 'stg4_c3', pointsAwarded: 54 }
        ],
        totalScore: 180,
        maxScore: 200,
        strengthsRemark: 'Designed clean multi-tier caching hierarchy with Redis Cluster and WebSocket broadcast diffs. Addressed p99 tail latency effectively.',
        gapsRemark: 'Could have discussed database shard rebalancing procedures under unexpected holiday traffic surges.',
        actionableAdvice: 'Explore consistent hashing vnodes with automated shard re-weighting scripts.',
        submittedAt: '2026-11-13T17:00:00Z',
        isCalibrated: true
      }
      // Note: Stage 5 is pending submission in Evaluator Studio!
    ]
  },
  {
    id: 'app-005',
    candidateId: 'cand-6319',
    fullName: 'Sophia Maria Rossi',
    email: 's.rossi@example.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    pseudonymHandle: 'VortexPulse',
    isCurrentUser: false,
    jobId: 'job-senior-fullstack-2026-q4',
    currentStageOrder: 4,
    clearedStages: [1, 2, 3, 4],
    compositeScore: 772,
    currentRank: 5,
    previousRank: 4,
    percentile: 83.3,
    status: 'ADVANCING',
    statusNote: 'Rank #5. Strong backend systems contender advancing through Stage 5 scheduling.',
    appliedAt: '2026-11-02T09:00:00Z',
    currentStageSlaDue: '2026-11-19T14:00:00Z',
    slaBreached: false,
    stage3and4CombinedScore: 442,
    stage2Score: 228,
    submissionTimestamps: {
      1: '2026-11-03T11:00:00Z',
      2: '2026-11-06T13:00:00Z',
      3: '2026-11-09T15:00:00Z',
      4: '2026-11-13T16:00:00Z'
    },
    profileData: {
      githubUrl: 'https://github.com/vortexpulse',
      portfolioUrl: 'https://vortex.engineering',
      yearsOfExperience: 6,
      primaryStack: ['Go', 'TypeScript', 'Docker', 'GraphQL', 'PostgreSQL'],
      maskedInBlind: {
        fullName: 'Sophia Maria Rossi',
        university: 'Politecnico di Milano (MSc Computer Engineering)',
        previousCompany: 'Klarna, Revolut',
        gender: 'Female',
        location: 'Milan, Italy / Remote'
      },
      unmaskedSummary: 'Built high-throughput payment reconciliation queues with idempotency keys and automated ledger reconciliation.',
      codeSubmissionSnippet: '// Distributed ledger transaction isolation wrapper'
    },
    appeals: [],
    stageEvaluations: [
      {
        id: 'eval-app005-s1',
        applicationId: 'app-005',
        stageId: 1,
        evaluatorId: 'eval-4',
        evaluatorRole: 'Director of Engineering',
        isBlind: true,
        scores: [
          { criterionId: 'stg1_c1', pointsAwarded: 36 },
          { criterionId: 'stg1_c2', pointsAwarded: 32 },
          { criterionId: 'stg1_c3', pointsAwarded: 22 }
        ],
        totalScore: 90,
        maxScore: 100,
        strengthsRemark: 'Clear architectural clarity on financial ledger durability and ACID compliance.',
        gapsRemark: 'Lacks frontend UI component libraries in public work.',
        actionableAdvice: 'Build a small interactive dashboard demo to showcase full-stack fluency.',
        submittedAt: '2026-11-04T12:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app005-s2',
        applicationId: 'app-005',
        stageId: 2,
        evaluatorId: 'eval-2',
        evaluatorRole: 'Staff Engineer (Blind Grader)',
        isBlind: true,
        scores: [
          { criterionId: 'stg2_c1', pointsAwarded: 92 },
          { criterionId: 'stg2_c2', pointsAwarded: 76 },
          { criterionId: 'stg2_c3', pointsAwarded: 36 },
          { criterionId: 'stg2_c4', pointsAwarded: 24 }
        ],
        totalScore: 228,
        maxScore: 250,
        strengthsRemark: 'High precision on edge cases and schema validation errors. Clean test suites.',
        gapsRemark: 'README file lacked local Docker-compose bootstrap instructions.',
        actionableAdvice: 'Provide single-line docker-compose up setup scripts in repository root.',
        submittedAt: '2026-11-07T14:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app005-s3',
        applicationId: 'app-005',
        stageId: 3,
        evaluatorId: 'eval-1',
        evaluatorRole: 'Principal Systems Architect',
        isBlind: false,
        scores: [
          { criterionId: 'stg3_c1', pointsAwarded: 110 },
          { criterionId: 'stg3_c2', pointsAwarded: 82 },
          { criterionId: 'stg3_c3', pointsAwarded: 82 }
        ],
        totalScore: 274,
        maxScore: 300,
        strengthsRemark: 'Excellent intuition for deadlock resolution and row-level database locks.',
        gapsRemark: 'Slightly slow when discussing browser cookie vs token authentication trade-offs.',
        actionableAdvice: 'Review OAuth 2.1 PKCE flows for single-page web applications.',
        submittedAt: '2026-11-10T16:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app005-s4',
        applicationId: 'app-005',
        stageId: 4,
        evaluatorId: 'eval-3',
        evaluatorRole: 'Lead Product Engineer',
        isBlind: false,
        scores: [
          { criterionId: 'stg4_c1', pointsAwarded: 70 },
          { criterionId: 'stg4_c2', pointsAwarded: 54 },
          { criterionId: 'stg4_c3', pointsAwarded: 56 }
        ],
        totalScore: 180,
        maxScore: 200,
        strengthsRemark: 'Designed solid event-driven pipeline with Kafka topic partitioning and Dead Letter Queues.',
        gapsRemark: 'Did not model client retry storm throttling under gateway failure.',
        actionableAdvice: 'Incorporate client-side adaptive throttling and circuit breaker policies.',
        submittedAt: '2026-11-14T11:00:00Z',
        isCalibrated: true
      }
    ]
  },
  {
    id: 'app-006',
    candidateId: 'cand-5190',
    fullName: 'Tariq Al-Mansoor',
    email: 'tariq.m@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    pseudonymHandle: 'ChronosGate',
    isCurrentUser: false,
    jobId: 'job-senior-fullstack-2026-q4',
    currentStageOrder: 4,
    clearedStages: [1, 2, 3],
    compositeScore: 588,
    currentRank: 6,
    previousRank: 6,
    percentile: 79.1,
    status: 'ADVANCING',
    statusNote: 'Stage 4 System Design under evaluation. SLA timer active.',
    appliedAt: '2026-11-03T11:00:00Z',
    currentStageSlaDue: '2026-11-19T06:00:00Z', // Breached or close!
    slaBreached: true, // SLA alert triggered!
    stage3and4CombinedScore: 268,
    stage2Score: 226,
    submissionTimestamps: {
      1: '2026-11-04T12:00:00Z',
      2: '2026-11-07T15:00:00Z',
      3: '2026-11-11T16:00:00Z'
    },
    profileData: {
      githubUrl: 'https://github.com/chronosgate',
      portfolioUrl: 'https://chronos.tech',
      yearsOfExperience: 5,
      primaryStack: ['TypeScript', 'Node.js', 'Redis', 'AWS CDK'],
      maskedInBlind: {
        fullName: 'Tariq Al-Mansoor',
        university: 'Georgia Tech (MS CS)',
        previousCompany: 'Twilio, Auth0',
        gender: 'Male',
        location: 'Atlanta, GA'
      },
      unmaskedSummary: 'Built authentication rate-limiting gateway handling 80M daily API authorizations.',
      codeSubmissionSnippet: '// Token bucket algorithm in Redis Lua script'
    },
    appeals: [],
    stageEvaluations: [
      {
        id: 'eval-app006-s1',
        applicationId: 'app-006',
        stageId: 1,
        evaluatorId: 'eval-1',
        evaluatorRole: 'Principal Systems Architect',
        isBlind: true,
        scores: [
          { criterionId: 'stg1_c1', pointsAwarded: 37 },
          { criterionId: 'stg1_c2', pointsAwarded: 33 },
          { criterionId: 'stg1_c3', pointsAwarded: 24 }
        ],
        totalScore: 94,
        maxScore: 100,
        strengthsRemark: 'High-quality infrastructure-as-code samples. Very clear documentation and security disclosures.',
        gapsRemark: 'Front-end state management samples were relatively light.',
        actionableAdvice: 'Incorporate complex asynchronous UI form validation examples.',
        submittedAt: '2026-11-05T14:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app006-s2',
        applicationId: 'app-006',
        stageId: 2,
        evaluatorId: 'eval-2',
        evaluatorRole: 'Staff Engineer (Blind Grader)',
        isBlind: true,
        scores: [
          { criterionId: 'stg2_c1', pointsAwarded: 94 },
          { criterionId: 'stg2_c2', pointsAwarded: 74 },
          { criterionId: 'stg2_c3', pointsAwarded: 36 },
          { criterionId: 'stg2_c4', pointsAwarded: 22 }
        ],
        totalScore: 226,
        maxScore: 250,
        strengthsRemark: 'Robust concurrency handling and deterministic error codes across all test assertions.',
        gapsRemark: 'One unhandled promise rejection in background telemetry collector.',
        actionableAdvice: 'Wrap all background promise tickers in explicit top-level catch handlers.',
        submittedAt: '2026-11-08T18:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app006-s3',
        applicationId: 'app-006',
        stageId: 3,
        evaluatorId: 'eval-4',
        evaluatorRole: 'Director of Engineering',
        isBlind: false,
        scores: [
          { criterionId: 'stg3_c1', pointsAwarded: 108 },
          { criterionId: 'stg3_c2', pointsAwarded: 80 },
          { criterionId: 'stg3_c3', pointsAwarded: 80 }
        ],
        totalScore: 268,
        maxScore: 300,
        strengthsRemark: 'Strong communication style, articulate explanation of network latency variance across regions.',
        gapsRemark: 'Did not probe into client-side caching headers (ETag / stale-while-revalidate).',
        actionableAdvice: 'Brush up on RFC 7234 HTTP Caching specifications.',
        submittedAt: '2026-11-12T17:00:00Z',
        isCalibrated: true
      }
    ]
  },
  {
    id: 'app-007',
    candidateId: 'cand-4210',
    fullName: 'Camila Santos',
    email: 'c.santos@example.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    pseudonymHandle: 'NebulaDrift',
    isCurrentUser: false,
    jobId: 'job-senior-fullstack-2026-q4',
    currentStageOrder: 3,
    clearedStages: [1, 2],
    compositeScore: 322,
    currentRank: 7,
    previousRank: 7,
    percentile: 75.0,
    status: 'ADVANCING',
    statusNote: 'Stage 3 Core Domain Deep-Dive scheduled.',
    appliedAt: '2026-11-04T14:00:00Z',
    currentStageSlaDue: '2026-11-20T18:00:00Z',
    slaBreached: false,
    stage3and4CombinedScore: 0,
    stage2Score: 232,
    submissionTimestamps: {
      1: '2026-11-05T16:00:00Z',
      2: '2026-11-08T18:00:00Z'
    },
    profileData: {
      githubUrl: 'https://github.com/nebuladrift',
      portfolioUrl: 'https://camilasantos.dev',
      yearsOfExperience: 5,
      primaryStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      maskedInBlind: {
        fullName: 'Camila Santos',
        university: 'University of São Paulo (BSc CS)',
        previousCompany: 'Nubank, Wildlife Studios',
        gender: 'Female',
        location: 'São Paulo, Brazil'
      },
      unmaskedSummary: 'Built interactive customer onboarding flows with real-time biometric and document OCR validation.',
      codeSubmissionSnippet: '// WebRTC streaming document alignment guide'
    },
    appeals: [],
    stageEvaluations: [
      {
        id: 'eval-app007-s1',
        applicationId: 'app-007',
        stageId: 1,
        evaluatorId: 'eval-3',
        evaluatorRole: 'Lead Product Engineer',
        isBlind: true,
        scores: [
          { criterionId: 'stg1_c1', pointsAwarded: 35 },
          { criterionId: 'stg1_c2', pointsAwarded: 33 },
          { criterionId: 'stg1_c3', pointsAwarded: 22 }
        ],
        totalScore: 90,
        maxScore: 100,
        strengthsRemark: 'High code aesthetics and thoughtful user experience design across repositories.',
        gapsRemark: 'Lacked distributed tracing examples in backend node services.',
        actionableAdvice: 'Integrate OpenTelemetry tracing SDK into sample Express/Fastify services.',
        submittedAt: '2026-11-06T15:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app007-s2',
        applicationId: 'app-007',
        stageId: 2,
        evaluatorId: 'eval-2',
        evaluatorRole: 'Staff Engineer (Blind Grader)',
        isBlind: true,
        scores: [
          { criterionId: 'stg2_c1', pointsAwarded: 94 },
          { criterionId: 'stg2_c2', pointsAwarded: 76 },
          { criterionId: 'stg2_c3', pointsAwarded: 36 },
          { criterionId: 'stg2_c4', pointsAwarded: 26 }
        ],
        totalScore: 232,
        maxScore: 250,
        strengthsRemark: 'Well-structured test cases, great documentation of assumptions and trade-offs.',
        gapsRemark: 'Could have added an in-memory cache to optimize redundant calculations.',
        actionableAdvice: 'Use LRU cache for deterministic functional computations.',
        submittedAt: '2026-11-09T17:00:00Z',
        isCalibrated: true
      }
    ]
  },
  // CUTOFF MISSED EXAMPLES SHOWCASING TRANSPARENT CONSTRUCTIVE REJECTION
  {
    id: 'app-008',
    candidateId: 'cand-3190',
    fullName: 'Jonas Henrik Lindqvist',
    email: 'j.lindqvist@example.com',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    pseudonymHandle: 'ZenithDrift',
    isCurrentUser: false,
    jobId: 'job-senior-fullstack-2026-q4',
    currentStageOrder: 3,
    clearedStages: [1, 2],
    compositeScore: 478, // Stage 1 (88) + Stage 2 (192) + Stage 3 (198 < 210 cutoff) = 478
    currentRank: 8,
    previousRank: 8,
    percentile: 70.8,
    status: 'NOT_SELECTED',
    statusNote: 'Not Selected (Stage 3 Cutoff Missed: 198/210 pts). Full scorecard, rubric metrics, and improvement roadmap preserved forever.',
    appliedAt: '2026-10-27T10:00:00Z',
    currentStageSlaDue: '2026-11-09T18:00:00Z',
    slaBreached: false,
    stage3and4CombinedScore: 198,
    stage2Score: 192,
    submissionTimestamps: {
      1: '2026-10-28T12:00:00Z',
      2: '2026-10-31T15:00:00Z',
      3: '2026-11-04T16:00:00Z'
    },
    profileData: {
      githubUrl: 'https://github.com/zenithdrift',
      portfolioUrl: 'https://jonaslindqvist.dev',
      yearsOfExperience: 6,
      primaryStack: ['C#', '.NET Core', 'React', 'SQL Server'],
      maskedInBlind: {
        fullName: 'Jonas Henrik Lindqvist',
        university: 'KTH Royal Institute of Technology',
        previousCompany: 'Spotify, King',
        gender: 'Male',
        location: 'Stockholm, Sweden'
      },
      unmaskedSummary: 'Senior developer with extensive enterprise desktop and microservices experience.',
      codeSubmissionSnippet: '// Event-bus broker subscriber in C#'
    },
    appeals: [],
    stageEvaluations: [
      {
        id: 'eval-app008-s1',
        applicationId: 'app-008',
        stageId: 1,
        evaluatorId: 'eval-1',
        evaluatorRole: 'Principal Systems Architect',
        isBlind: true,
        scores: [
          { criterionId: 'stg1_c1', pointsAwarded: 35 },
          { criterionId: 'stg1_c2', pointsAwarded: 31 },
          { criterionId: 'stg1_c3', pointsAwarded: 22 }
        ],
        totalScore: 88,
        maxScore: 100,
        strengthsRemark: 'Solid enterprise engineering background. Thorough commit history and clear pull request templates.',
        gapsRemark: 'Limited open-source modern TypeScript/Next.js repositories.',
        actionableAdvice: 'Demonstrate deeper familiarity with full-stack TypeScript ecosystem.',
        submittedAt: '2026-10-29T14:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app008-s2',
        applicationId: 'app-008',
        stageId: 2,
        evaluatorId: 'eval-2',
        evaluatorRole: 'Staff Engineer (Blind Grader)',
        isBlind: true,
        scores: [
          { criterionId: 'stg2_c1', pointsAwarded: 82 },
          { criterionId: 'stg2_c2', pointsAwarded: 60 },
          { criterionId: 'stg2_c3', pointsAwarded: 32 },
          { criterionId: 'stg2_c4', pointsAwarded: 18 }
        ],
        totalScore: 192,
        maxScore: 250,
        strengthsRemark: 'Completed core functional requirements; clear documentation of configuration parameters.',
        gapsRemark: 'Two concurrency test cases timed out due to synchronous file I/O operations inside request loop.',
        actionableAdvice: 'Convert synchronous fs calls to streams and async pipeline handlers.',
        submittedAt: '2026-11-01T17:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app008-s3',
        applicationId: 'app-008',
        stageId: 3,
        evaluatorId: 'eval-1',
        evaluatorRole: 'Principal Systems Architect',
        isBlind: false,
        scores: [
          { criterionId: 'stg3_c1', pointsAwarded: 84 }, // Max 120
          { criterionId: 'stg3_c2', pointsAwarded: 58 }, // Max 90
          { criterionId: 'stg3_c3', pointsAwarded: 56 }  // Max 90
        ],
        totalScore: 198, // Cutoff is 210! Missed by 12 points!
        maxScore: 300,
        strengthsRemark: 'Excellent structured breakdown of system components. Respectful, professional communication during technical challenge.',
        gapsRemark: 'Struggled with live memory leak profiling under V8 heap dump analysis. Was unable to isolate the circular reference closure causing the node worker memory spike within the allotted debugging window.',
        actionableAdvice: 'Spend time hands-on with Chrome DevTools Memory Inspector, practicing heap snapshot comparison (allocation timeline vs containment tree) to immediately pinpoint detached DOM nodes and uncollected listener closures.',
        submittedAt: '2026-11-05T18:00:00Z',
        isCalibrated: true
      }
    ]
  },
  {
    id: 'app-009',
    candidateId: 'cand-2981',
    fullName: 'Ananya Sharma',
    email: 'ananya.s@example.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    pseudonymHandle: 'KryptonForge',
    isCurrentUser: false,
    jobId: 'job-senior-fullstack-2026-q4',
    currentStageOrder: 2,
    clearedStages: [1],
    compositeScore: 242,
    currentRank: 9,
    previousRank: 9,
    percentile: 66.6,
    status: 'NOT_SELECTED',
    statusNote: 'Not Selected (Stage 2 Cutoff Missed: 154/175 pts). Code quality was high but failed hidden concurrency race tests.',
    appliedAt: '2026-10-29T11:00:00Z',
    currentStageSlaDue: '2026-11-04T12:00:00Z',
    slaBreached: false,
    stage3and4CombinedScore: 0,
    stage2Score: 154,
    submissionTimestamps: {
      1: '2026-10-30T16:00:00Z',
      2: '2026-11-02T18:00:00Z'
    },
    profileData: {
      githubUrl: 'https://github.com/kryptonforge',
      portfolioUrl: 'https://ananya.engineer',
      yearsOfExperience: 4,
      primaryStack: ['Python', 'FastAPI', 'React', 'Redis'],
      maskedInBlind: {
        fullName: 'Ananya Sharma',
        university: 'IIT Bombay (BTech CSE)',
        previousCompany: 'Flipkart, Razorpay',
        gender: 'Female',
        location: 'Bengaluru, India'
      },
      unmaskedSummary: 'Specialized in microservice event architecture and distributed caching.',
      codeSubmissionSnippet: '// Redis distributed lock via Redlock'
    },
    appeals: [],
    stageEvaluations: [
      {
        id: 'eval-app009-s1',
        applicationId: 'app-009',
        stageId: 1,
        evaluatorId: 'eval-3',
        evaluatorRole: 'Lead Product Engineer',
        isBlind: true,
        scores: [
          { criterionId: 'stg1_c1', pointsAwarded: 35 },
          { criterionId: 'stg1_c2', pointsAwarded: 31 },
          { criterionId: 'stg1_c3', pointsAwarded: 22 }
        ],
        totalScore: 88,
        maxScore: 100,
        strengthsRemark: 'Well-documented open-source Python packages with strong unit tests and automated CI/CD badges.',
        gapsRemark: 'TypeScript type definitions were occasionally bypassed with any assertions.',
        actionableAdvice: 'Configure strict: true and noImplicitAny: true in all sample tsconfig files.',
        submittedAt: '2026-10-31T17:00:00Z',
        isCalibrated: true
      },
      {
        id: 'eval-app009-s2',
        applicationId: 'app-009',
        stageId: 2,
        evaluatorId: 'eval-2',
        evaluatorRole: 'Staff Engineer (Blind Grader)',
        isBlind: true,
        scores: [
          { criterionId: 'stg2_c1', pointsAwarded: 58 }, // Cutoff missed on correctness!
          { criterionId: 'stg2_c2', pointsAwarded: 56 },
          { criterionId: 'stg2_c3', pointsAwarded: 28 },
          { criterionId: 'stg2_c4', pointsAwarded: 12 }
        ],
        totalScore: 154, // Cutoff is 175!
        maxScore: 250,
        strengthsRemark: 'Beautiful clean modular architecture with clear service boundaries and dependency injection.',
        gapsRemark: 'Failed 4 out of 10 automated concurrency test suites due to unhandled race conditions in shared memory cache without mutex or CAS guards.',
        actionableAdvice: 'Study lock-free atomic operations or wrap shared mutable dictionary mutations in async-mutex primitives when handling concurrent parallel worker threads.',
        submittedAt: '2026-11-03T16:00:00Z',
        isCalibrated: true
      }
    ]
  },
  // Additional candidates to bring cohort to realistic density
  ...generateAdditionalCandidates()
];

function generateAdditionalCandidates(): CandidateApplication[] {
  const handles = [
    { handle: 'TitanStrike', name: 'Jordan Becker', s1: 86, s2: 218, s3: 252, s4: 164, s5: 0, stg: 4, rank: 10 },
    { handle: 'SolarisEcho', name: 'Kavita Subramaniam', s1: 88, s2: 224, s3: 248, s4: 158, s5: 0, stg: 4, rank: 11 },
    { handle: 'ApexVector', name: 'Lucas Meyer', s1: 84, s2: 212, s3: 240, s4: 0, s5: 0, stg: 3, rank: 12 },
    { handle: 'PulseCascade', name: 'Zoe Thorne', s1: 82, s2: 210, s3: 236, s4: 0, s5: 0, stg: 3, rank: 13 },
    { handle: 'OrbitShadow', name: 'Dante Moretti', s1: 80, s2: 206, s3: 228, s4: 0, s5: 0, stg: 3, rank: 14 },
    { handle: 'EchoPrism', name: 'Mei Zhang', s1: 78, s2: 204, s3: 220, s4: 0, s5: 0, stg: 3, rank: 15 },
    { handle: 'FluxRider', name: 'Ethan Cooper', s1: 76, s2: 198, s3: 0, s4: 0, s5: 0, stg: 2, rank: 16 },
    { handle: 'GhostByte', name: 'Siddharth Nair', s1: 75, s2: 194, s3: 0, s4: 0, s5: 0, stg: 2, rank: 17 },
    { handle: 'AlphaNexus', name: 'Olga Ivanova', s1: 74, s2: 188, s3: 0, s4: 0, s5: 0, stg: 2, rank: 18 },
    { handle: 'VividForge', name: 'Hiroshi Tanaka', s1: 72, s2: 182, s3: 0, s4: 0, s5: 0, stg: 2, rank: 19 },
    { handle: 'SpecterRun', name: 'Amara Okafor', s1: 70, s2: 178, s3: 0, s4: 0, s5: 0, stg: 2, rank: 20 },
    { handle: 'IronLogic', name: 'Benjamin Cole', s1: 68, s2: 152, s3: 0, s4: 0, s5: 0, stg: 2, rank: 21, missed: true },
    { handle: 'NovaPlex', name: 'Fatima Zahra', s1: 66, s2: 0, s3: 0, s4: 0, s5: 0, stg: 1, rank: 22 },
    { handle: 'CyberPeak', name: 'Gabriel Dubois', s1: 60, s2: 0, s3: 0, s4: 0, s5: 0, stg: 1, rank: 23, missed: true },
    { handle: 'DeltaDrift', name: 'Rachel Green-Wood', s1: 58, s2: 0, s3: 0, s4: 0, s5: 0, stg: 1, rank: 24, missed: true }
  ];

  return handles.map((h, idx) => {
    const total = h.s1 + h.s2 + h.s3 + h.s4 + (h.s5 || 0);
    const isMissed = h.missed || false;
    const cleared = [];
    if (h.s1 >= 65) cleared.push(1);
    if (h.s2 >= 175) cleared.push(2);
    if (h.s3 >= 210) cleared.push(3);
    if (h.s4 >= 140) cleared.push(4);

    return {
      id: `app-0${10 + idx}`,
      candidateId: `cand-${1000 + idx * 73}`,
      fullName: h.name,
      email: `${h.name.toLowerCase().replace(' ', '.')}@example.com`,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + idx * 10000}?w=120&auto=format&fit=crop&q=80`,
      pseudonymHandle: h.handle,
      isCurrentUser: false,
      jobId: 'job-senior-fullstack-2026-q4',
      currentStageOrder: h.stg,
      clearedStages: cleared,
      compositeScore: total,
      currentRank: h.rank,
      previousRank: h.rank,
      percentile: Number((((24 - h.rank) / 24) * 100).toFixed(1)),
      status: isMissed ? 'NOT_SELECTED' : 'ADVANCING',
      statusNote: isMissed 
        ? `Not Selected (Cutoff Missed in Stage ${h.stg}). Constructive remarks and rubric breakdown preserved.` 
        : `Advancing cleanly through Stage ${h.stg}. On track with SLA requirements.`,
      appliedAt: '2026-11-05T09:00:00Z',
      currentStageSlaDue: '2026-11-20T18:00:00Z',
      slaBreached: false,
      stage3and4CombinedScore: h.s3 + h.s4,
      stage2Score: h.s2,
      submissionTimestamps: { 1: '2026-11-06T10:00:00Z' },
      profileData: {
        githubUrl: `https://github.com/${h.handle.toLowerCase()}`,
        portfolioUrl: `https://${h.handle.toLowerCase()}.dev`,
        yearsOfExperience: 4 + (idx % 5),
        primaryStack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
        maskedInBlind: {
          fullName: h.name,
          university: 'State University of Technology',
          previousCompany: 'Global Tech Corp',
          gender: idx % 2 === 0 ? 'Male' : 'Female',
          location: 'Remote'
        },
        unmaskedSummary: 'Proficient full stack engineer with experience in event streaming and modern frontend state management.'
      },
      appeals: [],
      stageEvaluations: [
        {
          id: `eval-app0${10 + idx}-s1`,
          applicationId: `app-0${10 + idx}`,
          stageId: 1,
          evaluatorId: 'eval-1',
          evaluatorRole: 'Principal Systems Architect',
          isBlind: true,
          scores: [
            { criterionId: 'stg1_c1', pointsAwarded: Math.round(h.s1 * 0.4) },
            { criterionId: 'stg1_c2', pointsAwarded: Math.round(h.s1 * 0.35) },
            { criterionId: 'stg1_c3', pointsAwarded: Math.round(h.s1 * 0.25) }
          ],
          totalScore: h.s1,
          maxScore: 100,
          strengthsRemark: 'Consistent engineering hygiene demonstrated across git commit history and pull request writeups.',
          gapsRemark: isMissed && h.stg === 1 ? 'Portfolio lacked verifiable production scale outcomes beyond basic school/hobby exercises.' : 'Could broaden real-time concurrent system demonstration.',
          actionableAdvice: 'Focus on shipping and benchmarking a distributed queue service with simulated network packet loss.',
          submittedAt: '2026-11-07T12:00:00Z',
          isCalibrated: true
        }
      ]
    };
  });
}

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-001',
    applicationId: 'app-004',
    candidateHandle: 'AegisSeeker (YOU)',
    actorRole: 'Candidate (Applicant)',
    actorName: 'Alex Rivera (YOU)',
    eventType: 'STAGE_SUBMISSION',
    title: 'Stage 4 Architecture Document Submitted',
    description: 'Submitted "High-Concurrency Leaderboard Ingestion & Multi-Tenant RBAC Architecture" (4,200 words, 4 sequence diagrams).',
    createdAt: '2026-11-12T16:00:00Z'
  },
  {
    id: 'log-002',
    applicationId: 'app-004',
    candidateHandle: 'AegisSeeker (YOU)',
    actorRole: 'Evaluator',
    actorName: 'Dr. Sarah Chen (Principal Systems Architect)',
    eventType: 'EVALUATION_COMPLETED',
    title: 'Stage 4 Scorecard Published',
    description: 'Awarded 180 / 200 pts (90%). Evaluator remarks: "Clean multi-tier caching hierarchy with Redis Cluster and WebSocket broadcast diffs."',
    deltaPoints: 180,
    newCompositeScore: 785,
    createdAt: '2026-11-13T17:00:00Z'
  },
  {
    id: 'log-003',
    applicationId: 'app-004',
    candidateHandle: 'AegisSeeker (YOU)',
    actorRole: 'System Leaderboard Engine',
    actorName: 'Automated Rank Engine',
    eventType: 'RANK_CHANGE',
    title: 'Leaderboard Rank Advanced',
    description: 'Alex Rivera moved from Rank #5 to Rank #4 (▲ 1 rank). Percentile improved to Top 12.5%.',
    oldRank: 5,
    newRank: 4,
    createdAt: '2026-11-13T17:00:01Z'
  },
  {
    id: 'log-004',
    applicationId: 'app-006',
    candidateHandle: 'ChronosGate',
    actorRole: 'Anti-Ghosting SLA Monitor',
    actorName: 'Platform Watchdog',
    eventType: 'SLA_BREACH_ALERT',
    title: 'Stage 4 Review SLA Breached',
    description: 'Review SLA exceeded 48 hours for ChronosGate. Review priority auto-escalated to Director of Engineering Devon Miller.',
    createdAt: '2026-11-18T06:00:00Z'
  },
  {
    id: 'log-005',
    applicationId: 'app-004',
    candidateHandle: 'AegisSeeker (YOU)',
    actorRole: 'Evaluator',
    actorName: 'Marcus Vance (Staff Engineer)',
    eventType: 'APPEAL_RESOLVED',
    title: 'Stage 2 Appeal Approved',
    description: 'Cryptographic commit timestamp verified within 50% window. Awarded +10 speed bonus points.',
    deltaPoints: 10,
    newCompositeScore: 785,
    createdAt: '2026-11-07T09:30:00Z'
  },
  {
    id: 'log-006',
    applicationId: 'app-001',
    candidateHandle: 'AegisFalcon',
    actorRole: 'Hiring Manager',
    actorName: 'Devon Miller (Director of Engineering)',
    eventType: 'OFFER_TRIGGERED',
    title: 'Offer Zone Threshold Crossed',
    description: 'Candidate AegisFalcon cleared Stage 5 with 914/1000 pts. Offer package triggered for formal committee release.',
    createdAt: '2026-11-15T16:00:00Z'
  }
];

export function recalculateLeaderboard(candidates: CandidateApplication[]): CandidateApplication[] {
  // Sort according to tie-breaker logic:
  // 1. Composite score descending
  // 2. Stage 3 + Stage 4 combined score descending
  // 3. Stage 2 score descending
  // 4. Earliest completion timestamp
  const sorted = [...candidates].sort((a, b) => {
    if (b.compositeScore !== a.compositeScore) {
      return b.compositeScore - a.compositeScore;
    }
    if (b.stage3and4CombinedScore !== a.stage3and4CombinedScore) {
      return b.stage3and4CombinedScore - a.stage3and4CombinedScore;
    }
    if (b.stage2Score !== a.stage2Score) {
      return b.stage2Score - a.stage2Score;
    }
    const aTime = a.appliedAt;
    const bTime = b.appliedAt;
    return aTime.localeCompare(bTime);
  });

  const total = sorted.length;
  return sorted.map((cand, index) => {
    const newRank = index + 1;
    const percentile = Number((((total - newRank) / total) * 100).toFixed(1));
    const previousRank = cand.currentRank || newRank;
    
    // Status update: if total >= 695 and all 5 stages cleared
    let status = cand.status;
    if (status !== 'NOT_SELECTED') {
      if (newRank <= 3 && cand.clearedStages.length === 5 && cand.compositeScore >= 695) {
        status = 'OFFER_ZONE';
      } else if (cand.status === 'OFFER_ZONE' && newRank > 3) {
        status = 'ADVANCING';
      }
    }

    return {
      ...cand,
      previousRank,
      currentRank: newRank,
      percentile,
      status
    };
  });
}
