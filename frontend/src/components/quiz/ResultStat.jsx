import React from "react";

function ResultStat({ value, label }) {
  return (
    <div className="min-w-22.5 rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">

      <p className="text-2xl font-black text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {label}
      </p>

    </div>
  );
}

export default ResultStat;