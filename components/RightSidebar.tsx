'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/lib/types';
import { 
  SlidersHorizontal, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  Check, 
  Flame, 
  Sparkles,
  ShieldCheck,
  UserCheck,
  Briefcase,
  Eye,
  Award
} from 'lucide-react';

interface RightSidebarProps {
  sortBy: 'rank' | 'score' | 'sla';
  setSortBy: (val: 'rank' | 'score' | 'sla') => void;
  statusFilter: 'ALL' | 'OFFER_ZONE' | 'ADVANCING' | 'NOT_SELECTED';
  setStatusFilter: (val: 'ALL' | 'OFFER_ZONE' | 'ADVANCING' | 'NOT_SELECTED') => void;
  stageFilter: number | 'ALL';
  setStageFilter: (val: number | 'ALL') => void;
  selectedStack: string | null;
  setSelectedStack: (val: string | null) => void;
  onResetFilters: () => void;
}

export default function RightSidebar({
  sortBy,
  setSortBy,
  statusFilter,
  setStatusFilter,
  stageFilter,
  setStageFilter,
  selectedStack,
  setSelectedStack,
  onResetFilters
}: RightSidebarProps) {
  const { role, setRole, job, candidates } = useApp();

  const [openSections, setOpenSections] = useState({
    sortBy: true,
    stage: true,
    score: true,
    roles: true,
    rbac: true
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const stackCategories = [
    { name: 'TypeScript / Next.js', count: 14 },
    { name: 'Distributed Systems', count: 8 },
    { name: 'High-Throughput Ingestion', count: 6 },
    { name: 'Cloud Infrastructure / SRE', count: 7 },
    { name: 'UI Performance / React 19', count: 10 },
    { name: 'Database Concurrency / MVCC', count: 5 }
  ];

  return (
    <aside className="w-72 bg-[#0d0e11] border-l border-[#1c1e22] flex flex-col h-screen sticky top-0 text-zinc-300 select-none z-20 font-sans hidden xl:flex">
      {/* Header matching Astra */}
      <div className="p-4 border-b border-[#1c1e22] flex items-center justify-between">
        <span className="font-bold text-sm text-zinc-100 flex items-center gap-2">
          <span>Filters</span>
          <span className="text-[10px] font-mono text-zinc-500 bg-[#16181c] px-1.5 py-0.5 rounded border border-[#23262d]">
            {candidates.length} Cohort
          </span>
        </span>
        <button
          onClick={onResetFilters}
          className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors flex items-center gap-1 font-medium"
        >
          <RotateCcw className="w-3 h-3 text-zinc-500" />
          <span>Reset</span>
        </button>
      </div>

      {/* Scrollable Filters */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
        {/* Accordion 1: Sort by */}
        <div className="border-b border-[#1c1e22] pb-4">
          <button
            onClick={() => toggleSection('sortBy')}
            className="w-full flex items-center justify-between text-xs font-bold text-zinc-300 mb-2.5"
          >
            <span>Sort by</span>
            {openSections.sortBy ? (
              <ChevronUp className="w-3.5 h-3.5 text-zinc-500" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            )}
          </button>

          {openSections.sortBy && (
            <div className="grid grid-cols-2 p-1 bg-[#141519] border border-[#202227] rounded-xl text-xs font-medium">
              <button
                onClick={() => setSortBy('rank')}
                className={`py-1.5 rounded-lg transition-all text-center ${
                  sortBy === 'rank'
                    ? 'bg-[#23262d] text-zinc-100 shadow-sm border border-[#2e323b]'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Recommended
              </button>
              <button
                onClick={() => setSortBy('score')}
                className={`py-1.5 rounded-lg transition-all text-center ${
                  sortBy === 'score'
                    ? 'bg-[#23262d] text-zinc-100 shadow-sm border border-[#2e323b]'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Highest score
              </button>
            </div>
          )}
        </div>

        {/* Accordion 2: Stage Gate / Experience */}
        <div className="border-b border-[#1c1e22] pb-4">
          <button
            onClick={() => toggleSection('stage')}
            className="w-full flex items-center justify-between text-xs font-bold text-zinc-300 mb-2.5"
          >
            <span>Stage Gate Cleared</span>
            {openSections.stage ? (
              <ChevronUp className="w-3.5 h-3.5 text-zinc-500" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            )}
          </button>

          {openSections.stage && (
            <div className="grid grid-cols-4 p-1 bg-[#141519] border border-[#202227] rounded-xl text-xs font-medium text-center">
              <button
                onClick={() => setStageFilter('ALL')}
                className={`py-1.5 rounded-lg transition-all ${
                  stageFilter === 'ALL'
                    ? 'bg-[#23262d] text-zinc-100 shadow-sm border border-[#2e323b]'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Any
              </button>
              <button
                onClick={() => setStageFilter(2)}
                className={`py-1.5 rounded-lg transition-all ${
                  stageFilter === 2
                    ? 'bg-[#23262d] text-zinc-100 shadow-sm border border-[#2e323b]'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                S1–2
              </button>
              <button
                onClick={() => setStageFilter(4)}
                className={`py-1.5 rounded-lg transition-all ${
                  stageFilter === 4
                    ? 'bg-[#23262d] text-zinc-100 shadow-sm border border-[#2e323b]'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                S3–4
              </button>
              <button
                onClick={() => setStageFilter(5)}
                className={`py-1.5 rounded-lg transition-all ${
                  stageFilter === 5
                    ? 'bg-[#23262d] text-zinc-100 shadow-sm border border-[#2e323b]'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Stage 5
              </button>
            </div>
          )}
        </div>

        {/* Accordion 3: Score Threshold (matching Astra Minimum salary) */}
        <div className="border-b border-[#1c1e22] pb-4">
          <button
            onClick={() => toggleSection('score')}
            className="w-full flex items-center justify-between text-xs font-bold text-zinc-300 mb-2.5"
          >
            <span>Score Threshold</span>
            {openSections.score ? (
              <ChevronUp className="w-3.5 h-3.5 text-zinc-500" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            )}
          </button>

          {openSections.score && (
            <div className="space-y-2">
              <div className="grid grid-cols-5 p-1 bg-[#141519] border border-[#202227] rounded-xl text-[11px] font-medium text-center">
                <button
                  onClick={() => setStatusFilter('ALL')}
                  className={`py-1.5 rounded-lg transition-all ${
                    statusFilter === 'ALL'
                      ? 'bg-[#23262d] text-zinc-100 shadow-sm border border-[#2e323b]'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Any
                </button>
                <button
                  onClick={() => setStatusFilter('ADVANCING')}
                  className={`py-1.5 rounded-lg transition-all ${
                    statusFilter === 'ADVANCING'
                      ? 'bg-[#23262d] text-zinc-100 shadow-sm border border-[#2e323b]'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  600+
                </button>
                <button
                  onClick={() => setStatusFilter('ADVANCING')}
                  className="py-1.5 rounded-lg text-zinc-400 hover:text-zinc-200"
                >
                  700+
                </button>
                <button
                  onClick={() => setStatusFilter('ADVANCING')}
                  className="py-1.5 rounded-lg text-zinc-400 hover:text-zinc-200"
                >
                  800+
                </button>
                <button
                  onClick={() => setStatusFilter('OFFER_ZONE')}
                  className={`py-1.5 rounded-lg transition-all ${
                    statusFilter === 'OFFER_ZONE'
                      ? 'bg-[#23262d] text-amber-300 shadow-sm border border-[#2e323b]'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  900+
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                <Lock className="w-3 h-3 text-amber-400" />
                <span>Offer Zone threshold: 695 / 1000 pts</span>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 4: Candidate Domain / Stack (matching Astra's Role list) */}
        <div className="border-b border-[#1c1e22] pb-4">
          <button
            onClick={() => toggleSection('roles')}
            className="w-full flex items-center justify-between text-xs font-bold text-zinc-300 mb-2.5"
          >
            <span>Primary Domain Stack</span>
            {openSections.roles ? (
              <ChevronUp className="w-3.5 h-3.5 text-zinc-500" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            )}
          </button>

          {openSections.roles && (
            <div className="space-y-1.5">
              {stackCategories.map((item) => {
                const isSelected = selectedStack === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setSelectedStack(isSelected ? null : item.name)}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-[#16181c] transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'border-zinc-700 bg-[#141519]'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </div>
                      <span className="text-zinc-300 text-xs font-normal truncate max-w-[170px]">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {item.count}
                    </span>
                  </button>
                );
              })}
              <div className="pt-1 text-[11px] text-blue-400 hover:underline cursor-pointer">
                Show 14 more verified skills
              </div>
            </div>
          )}
        </div>

        {/* Accordion 5: Switch Role Persona */}
        <div>
          <button
            onClick={() => toggleSection('rbac')}
            className="w-full flex items-center justify-between text-xs font-bold text-zinc-300 mb-2.5"
          >
            <span>Active Persona Role</span>
            {openSections.rbac ? (
              <ChevronUp className="w-3.5 h-3.5 text-zinc-500" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            )}
          </button>

          {openSections.rbac && (
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setRole('candidate')}
                className={`p-2 rounded-xl border text-left transition-all ${
                  role === 'candidate'
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-[#141519] border-[#202227] text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="font-bold text-[11px]">Candidate</div>
                <div className="text-[9px] text-zinc-500">YOU (#4)</div>
              </button>

              <button
                onClick={() => setRole('evaluator')}
                className={`p-2 rounded-xl border text-left transition-all ${
                  role === 'evaluator'
                    ? 'bg-cyan-950/20 border-cyan-500/40 text-cyan-300'
                    : 'bg-[#141519] border-[#202227] text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="font-bold text-[11px]">Evaluator</div>
                <div className="text-[9px] text-zinc-500">Blind Grading</div>
              </button>

              <button
                onClick={() => setRole('recruiter')}
                className={`p-2 rounded-xl border text-left transition-all ${
                  role === 'recruiter'
                    ? 'bg-amber-950/20 border-amber-500/40 text-amber-300'
                    : 'bg-[#141519] border-[#202227] text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="font-bold text-[11px]">Recruiter</div>
                <div className="text-[9px] text-zinc-500">Calibration</div>
              </button>

              <button
                onClick={() => setRole('public')}
                className={`p-2 rounded-xl border text-left transition-all ${
                  role === 'public'
                    ? 'bg-purple-950/20 border-purple-500/40 text-purple-300'
                    : 'bg-[#141519] border-[#202227] text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="font-bold text-[11px]">Public</div>
                <div className="text-[9px] text-zinc-500">Pre-Apply</div>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
