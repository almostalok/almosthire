'use client';

import React from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import KPIStrip from '@/components/KPIStrip';
import LeaderboardTable from '@/components/LeaderboardTable';
import CandidateDetailDrawer from '@/components/CandidateDetailDrawer';
import EvaluatorStudio from '@/components/EvaluatorStudio';
import RecruiterDashboard from '@/components/RecruiterDashboard';
import PublicTransparencyView from '@/components/PublicTransparencyView';
import NotificationToaster from '@/components/NotificationToaster';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  HelpCircle,
  Clock,
  CheckCircle2,
  Lock,
  Zap
} from 'lucide-react';

function DashboardContent() {
  const { role, currentUserCandidate, setRole, setSelectedCandidateId } = useApp();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Main Role Content */}
      <main className="flex-1 pb-16">
        {role === 'candidate' && (
          <>
            {/* Candidate KPI Bar */}
            <KPIStrip />

            {/* Personalized Candidate Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-cyan-950/30 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold font-mono">
                    #4
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
                      <span>Alex Rivera (YOU) — Live Cohort Rank #4</span>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
                        785 / 1000 PTS
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      You are 81 points behind the Offer Zone threshold. Your Stage 5 Bar-Raiser scorecard is being finalized by panel reviewers.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCandidateId(currentUserCandidate.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Open My Scorecard & Radar</span>
                  </button>

                  <button
                    onClick={() => setRole('evaluator')}
                    className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition-colors border border-zinc-700"
                  >
                    <span>Grade Stage 5 as Evaluator →</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Live Cohort Leaderboard */}
            <LeaderboardTable />
          </>
        )}

        {role === 'evaluator' && (
          <>
            <EvaluatorStudio />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <div className="border-t border-zinc-800/80 pt-6">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Live Cohort Context
                </h3>
                <LeaderboardTable />
              </div>
            </div>
          </>
        )}

        {role === 'recruiter' && (
          <>
            <RecruiterDashboard />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <div className="border-t border-zinc-800/80 pt-4">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Cohort Candidate Master Ledger (Real Identity Visible)
                </h3>
                <LeaderboardTable />
              </div>
            </div>
          </>
        )}

        {role === 'public' && (
          <>
            <PublicTransparencyView />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <div className="border-t border-zinc-800/80 pt-6">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Live Anonymized Cohort Leaderboard Preview
                </h3>
                <LeaderboardTable />
              </div>
            </div>
          </>
        )}
      </main>

      {/* Slide-over Candidate Detail / Transparency Drawer */}
      <CandidateDetailDrawer />

      {/* Floating Notifications */}
      <NotificationToaster />

      {/* Enterprise Platform Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-8 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
              AH
            </div>
            <span className="font-semibold text-zinc-400">
              AlmostHire Transparent Merit Hiring Protocol
            </span>
            <span className="text-zinc-700">•</span>
            <span>Deterministic Scoring Engine v2.4</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-500 text-[11px]">
            <span>Zero Recruitment Ghosting</span>
            <span>•</span>
            <span>Blind Pedigree Redaction</span>
            <span>•</span>
            <span>48h SLA Watchdog</span>
            <span>•</span>
            <span>Anti-Anchoring Bias Panel</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Page() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}
