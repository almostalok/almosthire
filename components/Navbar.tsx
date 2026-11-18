'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/lib/types';
import { 
  ShieldCheck, 
  Award, 
  UserCheck, 
  Briefcase, 
  Eye, 
  RefreshCw, 
  Sparkles,
  Layers,
  ChevronRight,
  Clock
} from 'lucide-react';

export default function Navbar() {
  const { 
    role, 
    setRole, 
    job, 
    currentUserCandidate, 
    resetToDefaultDemoData 
  } = useApp();

  const roleConfigs: Array<{
    id: UserRole;
    label: string;
    sublabel: string;
    icon: React.ReactNode;
    badge?: string;
  }> = [
    {
      id: 'candidate',
      label: 'Candidate View',
      sublabel: `YOU (${currentUserCandidate.pseudonymHandle} • #${currentUserCandidate.currentRank})`,
      icon: <Award className="w-4 h-4 text-emerald-400" />,
      badge: `#${currentUserCandidate.currentRank}`
    },
    {
      id: 'evaluator',
      label: 'Evaluator Studio',
      sublabel: 'Blind Scoring & Rubrics',
      icon: <UserCheck className="w-4 h-4 text-cyan-400" />,
      badge: 'Panel'
    },
    {
      id: 'recruiter',
      label: 'Recruiter Admin',
      sublabel: 'Calibration & Cutoffs',
      icon: <Briefcase className="w-4 h-4 text-amber-400" />,
      badge: 'Command'
    },
    {
      id: 'public',
      label: 'Public View',
      sublabel: 'Pre-Apply Transparency',
      icon: <Eye className="w-4 h-4 text-purple-400" />,
      badge: 'Public'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
      {/* Top System Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-cyan-950/40 border-b border-emerald-500/20 px-4 py-1.5 text-xs text-zinc-300 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Live Merit Hiring Engine
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">Deterministic Scoring</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">Zero Ghosting Guaranteed</span>
          <span className="text-zinc-600">|</span>
          <span className="text-amber-400 font-mono">Anti-Ghosting SLA: Active 48h Escalation</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaultDemoData}
            title="Reset demo data to initial state"
            className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-100 transition-colors bg-zinc-800/60 hover:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700/60"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand & Cohort Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 p-0.5 shadow-lg shadow-emerald-500/10 flex items-center justify-center">
            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-zinc-100 tracking-tight flex items-center gap-1.5">
                AlmostHire
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium">
                  MERIT-PRO
                </span>
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/70 font-mono">
                {job.cohort}
              </span>
            </div>
            <p className="text-xs text-zinc-400 flex items-center gap-1 truncate max-w-sm">
              <span className="text-zinc-300 font-medium">{job.title}</span>
              <ChevronRight className="w-3 h-3 text-zinc-600" />
              <span className="text-emerald-400 font-semibold">{job.openSeats} Seats Available</span>
            </p>
          </div>
        </div>

        {/* RBAC Role Switcher */}
        <div className="flex items-center bg-zinc-900/90 p-1 rounded-xl border border-zinc-800 shadow-inner overflow-x-auto">
          {roleConfigs.map((r) => {
            const isActive = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/80'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
              >
                {r.icon}
                <div className="text-left">
                  <div className="leading-tight flex items-center gap-1.5">
                    <span>{r.label}</span>
                    {r.badge && (
                      <span
                        className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                          isActive
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {r.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-zinc-500 font-normal truncate max-w-[130px]">
                    {r.sublabel}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
