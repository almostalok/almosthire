'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/lib/types';
import { 
  ShieldCheck, 
  Award, 
  UserCheck, 
  Briefcase, 
  Eye, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Zap, 
  Clock, 
  FileText, 
  Scale, 
  Layers, 
  Sparkles, 
  Bookmark, 
  MoreHorizontal,
  Flame,
  CheckCircle2,
  Code2,
  Cpu,
  ShieldAlert,
  FileCheck,
  Send,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface SidebarProps {
  onOpenPrinciples?: () => void;
  onOpenAppealModal?: () => void;
}

export default function Sidebar({ onOpenPrinciples, onOpenAppealModal }: SidebarProps) {
  const { 
    role, 
    setRole, 
    job, 
    candidates, 
    currentUserCandidate, 
    setSelectedCandidateId,
    resetToDefaultDemoData 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'leaderboard' | 'studio'>('leaderboard');
  const [isFindWorkOpen, setIsFindWorkOpen] = useState(true);
  const [isStagesOpen, setIsStagesOpen] = useState(true);

  // SLA Watchdog Countdown matching Astra's blue card
  const [slaTime, setSlaTime] = useState({
    days: 1,
    hours: 21,
    minutes: 42,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setSlaTime((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside className="w-64 bg-[#0d0e11] border-r border-[#1c1e22] flex flex-col h-screen sticky top-0 text-zinc-300 select-none z-30 font-sans">
      {/* Top Brand / Workspace Switcher */}
      <div className="p-3.5 border-b border-[#1c1e22] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-500 p-0.5 flex items-center justify-center shadow-md shadow-emerald-500/10">
            <div className="w-full h-full bg-[#0d0e11] rounded-[6px] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 font-bold text-sm text-zinc-100 tracking-tight">
              <span>AlmostHire</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            </div>
            <div className="text-[10px] text-zinc-500 font-mono">
              {job.cohort}
            </div>
          </div>
        </div>

        <button 
          onClick={resetToDefaultDemoData}
          title="Reset Demo Data"
          className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded-md hover:bg-[#1a1c21] transition-colors"
        >
          <Sparkles className="w-4 h-4 text-zinc-400" />
        </button>
      </div>

      {/* Pill Switcher (Leaderboard vs Studio) matching Astra's Jobs vs Prep */}
      <div className="p-2.5">
        <div className="grid grid-cols-2 p-1 bg-[#15171b] border border-[#202227] rounded-xl text-xs font-semibold">
          <button
            onClick={() => {
              setActiveTab('leaderboard');
              setRole('candidate');
            }}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all ${
              activeTab === 'leaderboard' && role === 'candidate'
                ? 'bg-[#23262d] text-zinc-100 shadow-sm border border-[#2e323b]'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Leaderboard</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('studio');
              setRole('evaluator');
            }}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition-all relative ${
              activeTab === 'studio' || role === 'evaluator'
                ? 'bg-[#23262d] text-zinc-100 shadow-sm border border-[#2e323b]'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Studio</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 absolute top-2 right-2 animate-pulse" />
          </button>
        </div>
      </div>

      {/* Quick Search */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#15171b] border border-[#202227] rounded-xl text-xs text-zinc-400 focus-within:border-zinc-500 transition-colors">
          <Search className="w-3.5 h-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent focus:outline-none text-zinc-200 placeholder:text-zinc-600 text-xs"
          />
          <span className="text-[10px] font-mono text-zinc-600 bg-[#1c1e22] px-1 rounded">⌘K</span>
        </div>
      </div>

      {/* Scrollable Navigation Area */}
      <div className="flex-1 overflow-y-auto px-2 space-y-4 text-xs">
        {/* Section: Platform Perspectives (RBAC) */}
        <div>
          <button
            onClick={() => setIsFindWorkOpen(!isFindWorkOpen)}
            className="w-full px-2 py-1 flex items-center justify-between text-[11px] font-bold text-zinc-500 uppercase tracking-wider hover:text-zinc-300 transition-colors"
          >
            <span>Platform Perspectives</span>
            {isFindWorkOpen ? (
              <ChevronDown className="w-3.5 h-3.5 text-zinc-600" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            )}
          </button>

          {isFindWorkOpen && (
            <div className="mt-1 space-y-0.5">
              {/* Item 1: Candidate View */}
              <button
                onClick={() => setRole('candidate')}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl font-medium transition-all ${
                  role === 'candidate'
                    ? 'bg-[#1e2025] text-zinc-100 border border-[#2a2d34]'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#16171b]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Award className={`w-4 h-4 ${role === 'candidate' ? 'text-emerald-400' : 'text-zinc-500'}`} />
                  <span>Candidate (YOU)</span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  #4
                </span>
              </button>

              {/* Item 2: Evaluator Studio */}
              <button
                onClick={() => setRole('evaluator')}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl font-medium transition-all ${
                  role === 'evaluator'
                    ? 'bg-[#1e2025] text-zinc-100 border border-[#2a2d34]'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#16171b]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <UserCheck className={`w-4 h-4 ${role === 'evaluator' ? 'text-cyan-400' : 'text-zinc-500'}`} />
                  <span>Evaluator Studio</span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                  Blind
                </span>
              </button>

              {/* Item 3: Recruiter Command */}
              <button
                onClick={() => setRole('recruiter')}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl font-medium transition-all ${
                  role === 'recruiter'
                    ? 'bg-[#1e2025] text-zinc-100 border border-[#2a2d34]'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#16171b]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className={`w-4 h-4 ${role === 'recruiter' ? 'text-amber-400' : 'text-zinc-500'}`} />
                  <span>Recruiter Command</span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  Admin
                </span>
              </button>

              {/* Item 4: Public Transparency View */}
              <button
                onClick={() => setRole('public')}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl font-medium transition-all ${
                  role === 'public'
                    ? 'bg-[#1e2025] text-zinc-100 border border-[#2a2d34]'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#16171b]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Eye className={`w-4 h-4 ${role === 'public' ? 'text-purple-400' : 'text-zinc-500'}`} />
                  <span>Pre-Apply Transparency</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">Public</span>
              </button>

              {/* Quick Action: Open Scorecard */}
              <button
                onClick={() => setSelectedCandidateId(currentUserCandidate.id)}
                className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl font-medium text-zinc-400 hover:text-zinc-200 hover:bg-[#16171b] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>My Radar & Scorecard</span>
                </div>
                <ChevronRight className="w-3 h-3 text-zinc-600" />
              </button>
            </div>
          )}
        </div>

        {/* Section: 5 Stage Gates */}
        <div>
          <button
            onClick={() => setIsStagesOpen(!isStagesOpen)}
            className="w-full px-2 py-1 flex items-center justify-between text-[11px] font-bold text-zinc-500 uppercase tracking-wider hover:text-zinc-300 transition-colors"
          >
            <span>Deterministic Stage Gates</span>
            {isStagesOpen ? (
              <ChevronDown className="w-3.5 h-3.5 text-zinc-600" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            )}
          </button>

          {isStagesOpen && (
            <div className="mt-1 space-y-0.5">
              {job.stages.map((stg) => {
                const isCleared = currentUserCandidate.clearedStages.includes(stg.id);
                const isCurrent = currentUserCandidate.currentStageOrder === stg.id && !isCleared;

                return (
                  <div
                    key={stg.id}
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] hover:bg-[#16171b] text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                    onClick={() => setSelectedCandidateId(currentUserCandidate.id)}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-mono font-bold ${
                          isCleared
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : isCurrent
                            ? 'bg-amber-500/20 text-amber-300 animate-pulse'
                            : 'bg-zinc-800 text-zinc-500'
                        }`}
                      >
                        {isCleared ? '✓' : stg.id}
                      </div>
                      <span className="truncate">Stage {stg.id}: {stg.name.split('&')[0].trim()}</span>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-500">{stg.maxPoints}p</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Card 1: Electric Blue Gradient Promo Widget (matching Astra's 70% OFF Card!) */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1d4ed8] via-[#2563eb] to-[#3b82f6] p-4 text-white shadow-xl shadow-blue-500/10 border border-blue-400/30">
          <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase bg-white/20 px-2 py-0.5 rounded-md w-fit backdrop-blur-sm">
            <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
            <span>48H SLA WATCHDOG</span>
          </div>

          <div className="mt-2.5">
            <div className="font-bold text-sm leading-tight text-white">
              Stage 5 Bar-Raiser Review
            </div>
            <div className="text-[11px] text-blue-100/90 mt-0.5">
              Live countdown for Alex Rivera
            </div>
          </div>

          <div className="text-[9px] font-semibold tracking-wider text-blue-200 mt-2 uppercase">
            SLA BREACH TIMER
          </div>

          {/* 4 Countdown Boxes */}
          <div className="grid grid-cols-4 gap-1 mt-1 text-center font-mono">
            <div className="bg-white/15 backdrop-blur-md rounded-md p-1 border border-white/20">
              <div className="font-bold text-xs">{String(slaTime.days).padStart(2, '0')}</div>
              <div className="text-[8px] text-blue-200">DAYS</div>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-md p-1 border border-white/20">
              <div className="font-bold text-xs">{String(slaTime.hours).padStart(2, '0')}</div>
              <div className="text-[8px] text-blue-200">HRS</div>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-md p-1 border border-white/20">
              <div className="font-bold text-xs">{String(slaTime.minutes).padStart(2, '0')}</div>
              <div className="text-[8px] text-blue-200">MIN</div>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-md p-1 border border-white/20">
              <div className="font-bold text-xs">{String(slaTime.seconds).padStart(2, '0')}</div>
              <div className="text-[8px] text-blue-200">SEC</div>
            </div>
          </div>

          <button
            onClick={() => setRole('evaluator')}
            className="w-full mt-3 py-2 bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Grade Stage 5 Now</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2: Matte Dark Widget (matching Astra's Get Hired Free Card!) */}
        <div className="rounded-2xl bg-[#131417] border border-[#202227] p-3.5 text-zinc-300">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs text-zinc-100">Deterministic Merit</span>
            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono font-bold">
              FREE
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
            Zero recruitment ghosting. Blind grading in Stages 1 & 2. Permanent scorecards for life.
          </p>
          <button
            onClick={() => setRole('public')}
            className="w-full mt-2.5 py-1.5 bg-[#1e2025] hover:bg-[#252830] text-zinc-200 text-xs font-semibold rounded-xl border border-[#2c3038] transition-colors flex items-center justify-center gap-1"
          >
            <span>See how it works →</span>
          </button>
        </div>
      </div>

      {/* User Profile Bar at Bottom (matching Astra's bottom bar) */}
      <div className="p-3 border-t border-[#1c1e22] bg-[#0c0d0f] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Gradient Circle Avatar */}
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-400 to-cyan-500 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#0d0e11] rounded-full flex items-center justify-center font-bold font-mono text-[11px] text-emerald-300">
                AR
              </div>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0c0d0f] absolute -bottom-0.5 -right-0.5" />
          </div>

          <div className="overflow-hidden">
            <div className="font-bold text-xs text-zinc-100 truncate flex items-center gap-1">
              <span>ALOK KUM... / Alex</span>
            </div>
            <div className="text-[10px] text-zinc-500 truncate font-mono">
              Rank #4 • Top 12.5%
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-zinc-500">
          <button
            onClick={() => setSelectedCandidateId(currentUserCandidate.id)}
            title="Inspect My Transparency Scorecard"
            className="p-1 hover:text-zinc-200 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </button>
          <button
            onClick={resetToDefaultDemoData}
            title="Demo Reset"
            className="p-1 hover:text-zinc-200 transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
