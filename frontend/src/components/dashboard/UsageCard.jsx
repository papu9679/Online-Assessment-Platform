import React from "react";
import { Link } from "react-router";

function UsageCard({ used = 0, limit = 10 }) {
  const percentage = Math.min(Math.round((used / Math.max(limit, 1)) * 100), 100);
  const remaining = Math.max(limit - used, 0);

  return (
    <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-600">Your plan</p>
          <h2 className="mt-1 text-xl font-black text-slate-900">AI quiz usage</h2>
        </div>
        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-700">{remaining} left</span>
      </div>
      <div className="mt-6 flex items-end justify-between">
        <p className="text-3xl font-black text-slate-900">{used}<span className="text-lg text-slate-400"> / {limit}</span></p>
        <p className="text-sm font-bold text-orange-600">{percentage}% used</p>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-orange-100">
        <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all" style={{ width: `${percentage}%` }} />
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-500">Create focused practice sets and keep your learning momentum moving.</p>
      <Link to="/create-quiz" className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800">Create a quiz <span className="ml-2">+</span></Link>
    </section>
  );
}

export default UsageCard;
