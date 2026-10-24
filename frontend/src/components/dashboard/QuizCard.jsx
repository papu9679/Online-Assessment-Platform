import React from "react";
import { Link } from "react-router";

function QuizCard({ quiz }) {
  const {
    _id,
    title,
    topic,
    difficulty,
    status,
    score,
    percentage,
    totalQuestions,
    createdAt,
  } = quiz;

  // Action text
  const actionText =
    status === "COMPLETED" || status === "EXPIRED"
      ? "View Quiz"
      : status === "IN_PROGRESS" 
      ? "Continue Quiz" : "Start Quiz";

  // Action route
  const actionPath =
    status === "COMPLETED" || status === "EXPIRED"
      ? `/quiz/${_id}/view`
      : `/quiz/${_id}/attempt`;

  return (
    <div
      className="
        group
        flex h-full min-h-[245px] flex-col
        rounded-2xl
        border border-slate-200
        bg-white
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-indigo-500/30
        hover:bg-indigo-50/30
      "
    >
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900">
            {title}
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            {topic} • {difficulty}
          </p>
        </div>

        {/* Status */}
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
          {status}
        </span>
      </div>

      {/* Score / Status */}
      <div className="mt-6 flex-1">
        {status === "COMPLETED" ? (
          <>
            <p className="text-2xl font-black text-indigo-600">
              {percentage}%
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {score} / {totalQuestions} correct
            </p>
          </>
        ) : (
          <p className="text-sm text-slate-500">
            {status === "IN_PROGRESS"
              ? "Quiz attempt in progress"
              : status === "EXPIRED"
              ? "Quiz attempt expired"
              : "Quiz not started yet"}
          </p>
        )}
      </div>

      {/* Bottom */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-500">
          {new Date(createdAt).toLocaleDateString()}
        </p>

        <Link
          to={actionPath}
          className="
            text-sm
            font-medium
            text-indigo-600
            transition
            hover:text-indigo-800
          "
        >
          {actionText} →
        </Link>
      </div>
    </div>
  );
}

export default QuizCard;