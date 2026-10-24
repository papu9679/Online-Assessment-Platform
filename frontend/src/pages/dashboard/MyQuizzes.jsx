import React, { useEffect, useState } from "react";

import QuizCard from "../../components/dashboard/QuizCard";

function MyQuizzes() {
  const [quizzes, setQuizzes] = useState([]);

  const [filter, setFilter] = useState("ALL");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const filters = [
    "ALL",
    "COMPLETED",
    "IN_PROGRESS",
    "EXPIRED",
    "NOT_STARTED"
  ];

  // --------------------------------------------------
  // Fetch My Quizzes
  // --------------------------------------------------
  async function fetchQuizzes() {
    try {
      setLoading(true);

      setError(null);

      const api = `${import.meta.env.VITE_BACKEND_BASE_URL}/quizzes`;

      const options = {
        method: "GET",
        credentials: "include",
      };

      const response = await fetch(api, options);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch quizzes"
        );
      }

      setQuizzes(data.quizzes);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // --------------------------------------------------
  // Filter Quizzes
  // --------------------------------------------------
  const filteredQuizzes =
    filter === "ALL"
      ? quizzes
      : quizzes.filter(
          (quiz) => quiz.status === filter
        );

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------
  if (loading) {
    return (
      <div className="text-sm text-slate-400">
        Loading quizzes...
      </div>
    );
  }

  // --------------------------------------------------
  // Error
  // --------------------------------------------------
  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-300">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-indigo-600">Your practice library</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          My Quizzes
        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          View and manage all your generated quizzes.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`
              rounded-xl
              px-4
              py-2
              text-sm
              font-medium
              transition-all
              duration-200

              ${
                filter === item
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "border border-slate-200 bg-white text-slate-500 hover:border-indigo-200 hover:text-indigo-700"
              }
            `}
          >
            {item === "ALL"
              ? "All"
              : item === "IN_PROGRESS"
              ? "In Progress"
              : item === "NOT_STARTED"
              ? "Not Started"
              : item.charAt(0) +
                item.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Quiz Cards */}
      {filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

          {filteredQuizzes.map((quiz) => (
            <QuizCard
              key = {quiz._id}
              quiz = {quiz}
            />
          ))}

        </div>
      ) : (
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-10 text-center shadow-sm">

          <p className="text-slate-400">
            No quizzes found.
          </p>

        </div>
      )}

    </div>
  );
}

export default MyQuizzes;