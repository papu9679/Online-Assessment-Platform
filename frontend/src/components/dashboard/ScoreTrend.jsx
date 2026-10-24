import React from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) {
    return null;
  }

  const quiz = payload[0].payload;

  return (
    <div
      className="
        rounded-xl
        border border-slate-200
        bg-white
        px-4 py-3
        shadow-xl
        backdrop-blur-md
      "
    >
      <p className="font-bold text-slate-900">
        {quiz.title}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {quiz.topic} • {quiz.difficulty}
      </p>

      <p className="mt-2 text-sm font-bold text-indigo-600">
        {quiz.score} / {quiz.totalQuestions} ({quiz.percentage}%)
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {new Date(quiz.submittedAt).toLocaleDateString()}
      </p>
    </div>
  );
}

function ScoreTrend({ scoreTrend = [] }) {
  if (!scoreTrend.length) {
    return (
      <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-slate-900">
          Quiz Score Trend
        </h2>

        <p className="mt-6 text-sm text-slate-500">
          Complete quizzes to see your performance trend.
        </p>
      </div>
    );
  }

  const graphData = scoreTrend.map((quiz, index) => ({
    ...quiz,
    quizNumber: `Quiz ${index + 1}`,
  }));

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div>
        <h2 className="text-lg font-black text-slate-900">
          Quiz Score Trend
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your submitted quiz scores over time.
        </p>
      </div>

      {/* Graph */}
      <div className="mt-6 h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={graphData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="quizNumber"
              stroke="#64748b"
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              stroke="#64748b"
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={false}
            />

            <Line
              type="monotone"
              dataKey="percentage"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#ffffff",
                stroke: "#4f46e5",
                strokeWidth: 3,
              }}
              activeDot={{
                r: 8,
                fill: "#4f46e5",
                stroke: "#c7d2fe",
                strokeWidth: 3,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default ScoreTrend;