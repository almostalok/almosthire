# MASTER PROMPT: PRODUCTION-GRADE TRANSPARENT MERIT-BASED HIRING & CANDIDATE LEADERBOARD PLATFORM

> **Role & Execution Directive:**  
> Act as a Principal Product Architect, Senior UX/UI Systems Designer, and Principal Full-Stack Engineer. You are tasked with engineering a production-grade, enterprise-ready **Transparent Merit-Based Hiring & Candidate Leaderboard Platform (AlmostHire)** that completely eliminates recruitment black boxes, opaque rejections, pedigree bias, and recruiter ghosting through deterministic scoring, live cohort leaderboards, cryptographic blind grading, and strict public SLAs.
>
> The interface must adhere to a sleek, high-information-density, dark-mode 3-column operating system design language (inspired by modern developer tools like Astra, Linear, and Stripe).

---

## 1. VISUAL DESIGN SYSTEM & LAYOUT ARCHITECTURE (ASTRA-INSPIRED)

The UI must adopt a refined, ultra-modern 3-column workstation layout engineered for maximum information density, readability, and high-trust transparency:

### 1.1 Color Palette & Surface Hierarchy
- **Canvas / App Background:** Matte obsidian black (`#090a0c` / `#0d0e11`)
- **Primary Surface / Cards:** Elevated charcoal slate (`#121418` / `#15171b`)
- **Hover Surfaces:** Interactive dark slate (`#181a20` / `#1e2127`)
- **Borders & Dividers:** Crisp hairline micro-borders (`#1c1f26` / `#232630`)
- **Primary Accent (SLA / Active):** High-voltage electric blue (`#2563eb`, `#3b82f6`) with multi-stop linear gradients (`linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)`)
- **Merit Success / Cleared:** Vivid emerald green (`#10b981`, `#34d399`) with subtle glow fills (`#10b98115`)
- **SLA Countdown / Warning / Offer Zone:** Deep amber / gold (`#f59e0b`, `#fbbf24`) with glow accents
- **Cutoff Missed / Breach:** Subdued rose / crimson (`#ef4444`, `#f87171`)
- **Typography:** Inter / Geist Sans for UI readability; Geist Mono / JetBrains Mono for scores, ranks, timestamps, and cutoffs.

### 1.2 Three-Column Layout Breakdown
```
+-------------------+------------------------------------------+--------------------+
|  LEFT SIDEBAR     |  CENTER LEADERBOARD & STAGE FEED         |  RIGHT SIDEBAR     |
|  (260px Fixed)    |  (Flex-1, Max-w-5xl, Scrollable)         |  (280px Fixed)     |
|                   |                                          |                    |
| - Brand Selector  | - Header: "Jobs" + Subtitle              | - Header: Filters  |
| - Leaderboard/    | - Tab Bar: All (24) | Offer Zone | ...   |   & Reset CTA      |
|   Studio Pill     | - Search Input + Quick Tag Chips         | - Sort by Accordion|
| - Quick Search    | - Live Horizontal Stage Velocity Strip   | - Stage Gate Filter|
| - Perspectives    | - Candidate Row Cards (Dense List):      | - Score Threshold  |
|   (RBAC Nav)      |   * Company/Initials White Square Logo   |   (695 Cutoff Lock)|
| - 5 Stage Gates   |   * Pseudonym Handle (YOU badge)         | - Domain Stack     |
| - 48h SLA Blue    |   * 5-Node Visual Stepper (S1-S5)        |   Filter with Count|
|   Countdown Card  |   * Time-ago + Evaluator remark quote    | - Persona Switcher |
| - Merit Free Card |   * Right: Score (/1000) + Bookmark      |                    |
| - User Bottom Bar |                                          |                    |
+-------------------+------------------------------------------+--------------------+
```

---

## 2. CORE USER PERSONAS & ROLE-BASED ACCESS CONTROL (RBAC)

Provide a persistent, instantaneous role-switcher (in the left sidebar and right control pane) supporting four distinct personas without requiring re-login:

1. **Candidate (Applicant) View:**
   - Highlights the applicant's real-time composite score (`785/1000 pts`), live leaderboard rank (`#4`), percentile (`Top 12.5%`), and active Stage 5 SLA timer.
   - Highlights the user's row with a prominent **`YOU`** badge, while peer applicants are masked with cryptographic pseudonyms (`AegisFalcon`, `QuantumNova`, `CAND-8412`).
   - Slide-over transparency drawer displaying a **5-Axis Radar Benchmark Chart** (comparing Candidate vs. Cohort Average vs. Top 10% Benchmark), granular rubric points, and immutable audit trail.
   - Ability to file a structured **Score Appeal** within 24 hours if an objective rubric item was mis-scored.

2. **Evaluator / Interviewer Studio:**
   - Split-screen workspace: Left pane displays candidate submission (with candidate name, university, gender, and prior company **cryptographically redacted** in Stages 1 & 2); Right pane contains locked weighted rubric sliders.
   - **Anti-Anchoring Bias Lock:** Prevents evaluators from seeing other panel scores until their own scorecard is submitted.
   - **Mandatory Constructive Feedback Engine:** Blocks scorecard submission if remarks total $< 150$ characters, and rejects vague phrases (e.g., *"not a fit"*, *"culture mismatch"*, *"bad vibe"*).

3. **Recruiter / Hiring Manager Command:**
   - Funnel conversion visualization (drop-off per stage), SLA compliance gauge, and breach alerts.
   - **Evaluator Z-Score Calibration:** Evaluates grader distribution ($\mu, \sigma$) and flags harsh ($Z < -1.5\sigma$) or lenient ($Z > +1.5\sigma$) evaluators.
   - **What-If Cutoff Simulator:** Interactive sliders allowing real-time modeling of stage cutoff changes and immediate preview of Offer Zone composition.
   - **Offer Release Trigger:** Unlocks formal offer letter issuance with celebratory confetti and immutable audit logging.

4. **Public Pre-Apply Transparency View:**
   - Pre-application dashboard displaying live cohort applicant numbers, stage cutoffs, historical review turnaround times (avg. 31.4 hours), and open seats remaining.

---

## 3. END-TO-END 5-STAGE DETERMINISTIC PIPELINE

| Stage | Stage Name | Weight | Max Pts | Cutoff | Review SLA | Privacy Mode | Transparency Output |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Stage 1** | **Proof-of-Work & Profile Audit** | 10% | 100 pts | 65 pts | 48 hrs | **Blind Mode** (Redacts college, company, gender) | Verifiable Project Depth (40), Stack Alignment (35), Repo Hygiene (25) |
| **Stage 2** | **Blind Practical Assessment** | 25% | 250 pts | 175 pts | 72 hrs | **Blind Mode** (Automated runner + masked reviewer) | Functional Accuracy (100), Craft (80), Documentation (40), Speed Bonus (30) |
| **Stage 3** | **Core Domain Deep-Dive** | 30% | 300 pts | 210 pts | 48 hrs | Unmasked Panel | First-Principles (120), Debugging Agility (90), Trade-off Articulation (90) |
| **Stage 4** | **System Design / Applied Case** | 20% | 200 pts | 140 pts | 48 hrs | Unmasked Panel | Scale & Risk (80), Impact Alignment (60), Ambiguity Structure (60) |
| **Stage 5** | **Bar-Raiser & Culture-Add** | 15% | 150 pts | 105 pts | 24 hrs | Independent Bar-Raiser | Extreme Accountability (60), Empathy (50), Learning Velocity (40) |
| **TOTAL** | **Composite Merit Score** | **100%** | **1,000 pts** | **695 pts** | **10 Days** | **Aggregate** | **Live Rank, Percentile, Stage Badges, Full Immutable Audit Log** |

---

## 4. MATHEMATICAL FORMULAS & GOVERNANCE RULES

### 4.1 Composite Score Calculation
$$\text{Composite Score} = \sum_{i=1}^{5} \text{Stage Points}_i + \text{Early Submission Bonus}$$

$$\text{Passing Cutoff} = 695 \text{ points (69.5\% aggregate threshold)}$$

### 4.2 Deterministic Tie-Breaker Logic
If two candidates have identical composite scores, their rank is resolved sequentially:
1. $\max(\text{Stage 3 Score} + \text{Stage 4 Score})$ (Technical & Architectural Depth)
2. $\max(\text{Stage 2 Score})$ (Practical Code Craft)
3. Earlier completion timestamp of the latest cleared stage.

### 4.3 Evaluator Calibration (Z-Score Normalization)
$$Z_i = \frac{\mu_i - \bar{\mu}_{\text{cohort}}}{\sigma_{\text{cohort}}}$$
- Evaluators with $Z_i < -1.5$ are categorized as **Harsh** and flagged for mandatory committee calibration.
- Evaluators with $Z_i > +1.5$ are categorized as **Lenient** and flagged for scoring audit.

### 4.4 Anti-Ghosting SLA Watchdog
Every active stage tracks an immutable countdown timestamp (`currentStageSlaDue`). If review time exceeds the SLA:
- System issues an automated priority queue escalation to the Director of Engineering.
- Candidate receives an automated transparency alert with expedited processing status.

---

## 5. REQUIRED SCREENS & INTERACTION FLOWS

1. **Astra-Style Live Cohort Leaderboard:**
   - Tabs: `All candidates (24)`, `Offer Zone (Top 3)`, `Advancing (16)`, `Cutoff Missed (5)`, `My Standing (YOU #4)`.
   - Horizontal velocity carousel: `Hiring now • Active Stage Gates Velocity` with stage cards (`Tekion`, `Swiggy`, `Marriott`, `Citi`).
   - Dense candidate cards: Initials in white square logo box, pseudonym handle, "YOU" badge, rank & trend indicators (`▲1`, `▼1`), 5-node stepper (`✓`, `✕`, `●`), score pill (`785 / 1000 PTS`), and bookmark icon.

2. **Candidate Scorecard & Radar Drawer (Slide-Over):**
   - 5-axis comparative Radar Chart powered by Recharts (`Candidate` vs. `Cohort Avg` vs. `Top 10% Benchmark`).
   - Expandable stage accordions detailing exact points per sub-criterion.
   - Structured mandatory feedback:
     - `What Worked (Verified Strengths)` (emerald box)
     - `Where Points Were Lost (Observed Gaps)` (amber box)
     - `Recommended Growth Steps (Actionable Advice)` (cyan box)
   - Immutable audit trail feed logging every submission, evaluation, and rank shift.

3. **Evaluator Studio:**
   - Split-screen workspace: Left pane displays candidate code artifact and redacted dossier; Right pane displays locked rubric sliders and structured feedback textareas.
   - Live character counter enforcing $\ge 150$ characters total.
   - Regex validation blocking vague rejection boilerplate.
   - Immediate reactive broadcast recalculating leaderboard ranks upon submission.

4. **Recruiter Command Center:**
   - Funnel conversion drop-off bars with step-pass rates.
   - Evaluator Z-Score distribution grid with calibration warnings.
   - Cutoff Simulator allowing real-time threshold adjustments with immediate preview of Offer Zone contenders.
   - Offer release button triggering celebratory confetti (`canvas-confetti`).

---

## 6. TECHNICAL STACK & DIRECTORY CONVENTIONS

- **Framework:** Next.js (App Router, Turbopack) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 with custom dark mode theme variables (`#090a0c`, `#0d0e11`, `#121418`, `#1c1e22`)
- **Charts:** Recharts (`RadarChart`, `PolarGrid`, `PolarAngleAxis`, `PolarRadiusAxis`)
- **Icons:** Lucide React (`ShieldCheck`, `Award`, `Flame`, `Zap`, `Scale`, etc.)
- **State Management:** Centralized React Context (`AppContext.tsx`) managing real-time candidate re-ranking, audit logging, and toast notifications.
