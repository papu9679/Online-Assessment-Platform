import React from "react";
import { Link } from "react-router";

function RecentQuizzes({ quizzes = [] }) {
  return (
    <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">Keep going</p>
          <h2 className="mt-1 text-xl font-black text-slate-900">Recent quizzes</h2>
        </div>
        <Link to="/dashboard/quizzes" className="text-sm font-bold text-indigo-600 hover:text-indigo-800">See all →</Link>
      </div>
      {quizzes.length ? (
        <div className="mt-5 divide-y divide-slate-100">
          {quizzes.slice(0, 4).map((quiz) => (
            <Link key={quiz._id} to={`/quiz/${quiz._id}/view`} className="flex items-center justify-between gap-4 py-4 transition hover:translate-x-1">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-800">{quiz.title}</p>
                <p className="mt-1 truncate text-xs text-slate-500">{quiz.topic} · {quiz.difficulty}</p>
              </div>
              <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-600">{quiz.status || "READY"}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl bg-slate-50 p-6 text-center">
          <p className="text-sm font-semibold text-slate-600">Your recent quizzes will appear here.</p>
          <Link to="/create-quiz" className="mt-3 inline-block text-sm font-bold text-indigo-600 hover:text-indigo-800">Create your first quiz →</Link>
        </div>
      )}
    </section>
  );
}

export default RecentQuizzes;
