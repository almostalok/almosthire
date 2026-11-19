'use client';

import React, { useState } from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import AstraLeaderboard from '@/components/AstraLeaderboard';
import EvaluatorStudio from '@/components/EvaluatorStudio';
import RecruiterDashboard from '@/components/RecruiterDashboard';
import PublicTransparencyView from '@/components/PublicTransparencyView';
import CandidateDetailDrawer from '@/components/CandidateDetailDrawer';
import NotificationToaster from '@/components/NotificationToaster';
import { 
  Award, 
  UserCheck, 
  Briefcase, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal,
  X
} from 'lucide-react';

function DashboardContent() {
  const { role, setRole, currentUserCandidate, setSelectedCandidateId } = useApp();

  // Unified Filter State shared across Center Feed & Right Sidebar
  const [sortBy, setSortBy] = useState<'rank' | 'score' | 'sla'>('rank');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'OFFER_ZONE' | 'ADVANCING' | 'NOT_SELECTED'>('ALL');
  const [stageFilter, setStageFilter] = useState<number | 'ALL'>('ALL');
  const [selectedStack, setSelectedStack] = useState<string | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleResetFilters = () => {
    setSortBy('rank');
    setStatusFilter('ALL');
    setStageFilter('ALL');
    setSelectedStack(null);
  };

  return (
    <div className="min-h-screen bg-[#090a0c] text-zinc-100 flex flex-row overflow-x-hidden font-sans">
      {/* 1. Left Sidebar Navigation (matching Astra) */}
      <Sidebar />

      {/* 2. Main Center Content View */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Minimal Perspective Indicator Strip for Tablet/Mobile */}
        <div className="bg-[#0e0f12] border-b border-[#1c1e22] px-4 py-2 flex items-center justify-between xl:hidden">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              Persona:
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setRole('candidate')}
                className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  role === 'candidate' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'text-zinc-500'
                }`}
              >
                Candidate (YOU)
              </button>
              <button
                onClick={() => setRole('evaluator')}
                className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  role === 'evaluator' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-zinc-500'
                }`}
              >
                Evaluator
              </button>
              <button
                onClick={() => setRole('recruiter')}
                className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  role === 'recruiter' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-zinc-500'
                }`}
              >
                Recruiter
              </button>
              <button
                onClick={() => setRole('public')}
                className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  role === 'public' ? 'bg-purple-500/20 text-purple-300 font-bold' : 'text-zinc-500'
                }`}
              >
                Public
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="p-1.5 rounded-lg bg-[#16181c] border border-[#23262d] text-zinc-300 text-xs flex items-center gap-1"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Dynamic Center View Routing */}
        {role === 'candidate' && (
          <AstraLeaderboard
            sortBy={sortBy}
            setSortBy={setSortBy}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            stageFilter={stageFilter}
            setStageFilter={setStageFilter}
            selectedStack={selectedStack}
            onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
          />
        )}

        {role === 'evaluator' && (
          <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <button
                  onClick={() => setRole('candidate')}
                  className="text-xs text-blue-400 hover:underline flex items-center gap-1 mb-1 font-semibold"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Back to Cohort Leaderboard</span>
                </button>
                <h1 className="text-2xl font-extrabold text-zinc-100 tracking-tight">
                  Evaluator Studio
                </h1>
              </div>
            </div>
            <EvaluatorStudio />
          </div>
        )}

        {role === 'recruiter' && (
          <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <button
                  onClick={() => setRole('candidate')}
                  className="text-xs text-blue-400 hover:underline flex items-center gap-1 mb-1 font-semibold"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Back to Cohort Leaderboard</span>
                </button>
                <h1 className="text-2xl font-extrabold text-zinc-100 tracking-tight">
                  Recruiter &amp; Calibration Command
                </h1>
              </div>
            </div>
            <RecruiterDashboard />
          </div>
        )}

        {role === 'public' && (
          <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <button
                  onClick={() => setRole('candidate')}
                  className="text-xs text-blue-400 hover:underline flex items-center gap-1 mb-1 font-semibold"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Back to Cohort Leaderboard</span>
                </button>
                <h1 className="text-2xl font-extrabold text-zinc-100 tracking-tight">
                  Pre-Apply Open Transparency Protocol
                </h1>
              </div>
            </div>
            <PublicTransparencyView />
          </div>
        )}
      </main>

      {/* 3. Right Sidebar Filters & Calibration Pane (matching Astra) */}
      <RightSidebar
        sortBy={sortBy}
        setSortBy={setSortBy}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        stageFilter={stageFilter}
        setStageFilter={setStageFilter}
        selectedStack={selectedStack}
        setSelectedStack={setSelectedStack}
        onResetFilters={handleResetFilters}
      />

      {/* Slide-over Candidate Detail / Transparency Scorecard Drawer */}
      <CandidateDetailDrawer />

      {/* Floating Reactive Toast Notifications */}
      <NotificationToaster />

      {/* Mobile Filters Slide-over */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end xl:hidden bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-80 bg-[#0d0e11] border-l border-[#1c1e22] h-full flex flex-col p-4 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#1c1e22]">
              <span className="font-bold text-sm text-zinc-100">Filters</span>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="text-zinc-400 hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div>
                <span className="block text-xs font-bold text-zinc-400 mb-2">Sort by</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => { setSortBy('rank'); setIsMobileFiltersOpen(false); }}
                    className={`p-2 rounded-lg ${sortBy === 'rank' ? 'bg-[#23262d] text-white font-bold' : 'bg-[#15171b] text-zinc-400'}`}
                  >
                    Recommended
                  </button>
                  <button
                    onClick={() => { setSortBy('score'); setIsMobileFiltersOpen(false); }}
                    className={`p-2 rounded-lg ${sortBy === 'score' ? 'bg-[#23262d] text-white font-bold' : 'bg-[#15171b] text-zinc-400'}`}
                  >
                    Highest score
                  </button>
                </div>
              </div>

              <div>
                <span className="block text-xs font-bold text-zinc-400 mb-2">Stage Gate</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => { setStageFilter('ALL'); setIsMobileFiltersOpen(false); }}
                    className="p-2 rounded-lg bg-[#15171b] text-zinc-300"
                  >
                    All Stages
                  </button>
                  <button
                    onClick={() => { setStageFilter(2); setIsMobileFiltersOpen(false); }}
                    className="p-2 rounded-lg bg-[#15171b] text-zinc-300"
                  >
                    Stage 2 (Code)
                  </button>
                  <button
                    onClick={() => { setStageFilter(4); setIsMobileFiltersOpen(false); }}
                    className="p-2 rounded-lg bg-[#15171b] text-zinc-300"
                  >
                    Stage 4 (Design)
                  </button>
                  <button
                    onClick={() => { setStageFilter(5); setIsMobileFiltersOpen(false); }}
                    className="p-2 rounded-lg bg-[#15171b] text-zinc-300"
                  >
                    Stage 5 (Offer)
                  </button>
                </div>
              </div>

              <button
                onClick={handleResetFilters}
                className="w-full py-2 rounded-xl bg-zinc-800 text-zinc-200 text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      )}
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
