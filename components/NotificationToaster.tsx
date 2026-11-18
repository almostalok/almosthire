'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function NotificationToaster() {
  const { notifications, dismissNotification } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {notifications.map((n) => {
        return (
          <div
            key={n.id}
            className={`pointer-events-auto p-3.5 rounded-2xl shadow-2xl border backdrop-blur-md transition-all animate-in slide-in-from-bottom-5 duration-300 flex items-start justify-between gap-3 ${
              n.type === 'success'
                ? 'bg-zinc-950/95 border-emerald-500/40 text-emerald-200'
                : n.type === 'warning'
                ? 'bg-zinc-950/95 border-amber-500/40 text-amber-200'
                : n.type === 'alert'
                ? 'bg-zinc-950/95 border-rose-500/40 text-rose-200'
                : 'bg-zinc-950/95 border-cyan-500/40 text-cyan-200'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {n.type === 'success' && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              )}
              {n.type === 'warning' && (
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              )}
              {n.type === 'alert' && (
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              )}
              {n.type === 'info' && (
                <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              )}

              <div>
                <div className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
                  <span>{n.title}</span>
                  <span className="text-[10px] text-zinc-500 font-mono font-normal">
                    {n.timestamp}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-300 mt-0.5 leading-relaxed">
                  {n.message}
                </p>
              </div>
            </div>

            <button
              onClick={() => dismissNotification(n.id)}
              className="text-zinc-500 hover:text-zinc-300 p-0.5 transition-colors flex-shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
