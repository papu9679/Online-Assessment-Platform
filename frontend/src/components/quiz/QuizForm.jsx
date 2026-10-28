import React from "react";

function QuizForm({
  formData,
  handleChange,
  handleSubmit,
}) {
  const difficulties = [
    {
      value: "EASY",
      title: "Easy",
      description: "Build confidence",
    },
    {
      value: "MEDIUM",
      title: "Medium",
      description: "Test your knowledge",
    },
    {
      value: "HARD",
      title: "Hard",
      description: "Challenge yourself",
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-4xl border border-slate-200
      bg-white p-6 shadow-2xl
      shadow-slate-900/10 backdrop-blur-xl
      transition-all duration-500
      hover:border-violet-500/20 sm:p-9"
    >
      {/* ================= TOPIC ================= */}

      <div>
        <div className="mb-3 flex items-center justify-between">
          <label
            htmlFor="topic"
            className="text-sm font-bold text-slate-700"
          >
            What do you want to practice?
          </label>

          <span className="text-xs text-slate-600">
            Topic
          </span>
        </div>

        <div className="group relative">
          <div
            className="pointer-events-none absolute inset-y-0 left-4
            flex items-center text-slate-500 transition
            group-focus-within:text-indigo-600"
          >
            ✦
          </div>

          <input
            id="topic"
            name="topic"
            type="text"
            value={formData.topic}
            onChange={handleChange}
            placeholder="e.g. JavaScript Promises, DBMS, React Hooks..."
            required
            className="w-full rounded-2xl border border-slate-200
            bg-white py-4 pl-11 pr-4
            text-sm text-slate-900 outline-none
            transition-all duration-300
            placeholder:text-slate-600
            hover:border-indigo-200
            focus:border-indigo-500
            focus:bg-white
            focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>

        <p className="mt-2 text-xs text-slate-500">
          Be specific for more focused questions.
        </p>
      </div>

      {/* Divider */}

      <div className="my-8 h-px bg-slate-100" />

      {/* ================= DIFFICULTY ================= */}

      <div>
        <div className="mb-4">
          <p className="text-sm font-bold text-slate-700">
            Choose your challenge level
          </p>

          <p className="mt-1 text-xs text-slate-500">
            This controls how complex the generated questions will be.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {difficulties.map((difficulty) => {
            const selected =
              formData.difficulty === difficulty.value;

            return (
              <label
                key={difficulty.value}
                className={`
                  relative cursor-pointer rounded-2xl border p-4
                  transition-all duration-300
                  
                  ${
                    selected
                      ? "border-indigo-300 bg-indigo-50 shadow-lg shadow-indigo-500/5"
                      : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50/40"
                  }
                `}
              >
                <input
                  type="radio"
                  name="difficulty"
                  value={difficulty.value}
                  checked={selected}
                  onChange={handleChange}
                  className="sr-only"
                />

                <div className="flex items-start gap-3">
                  {/* Custom Radio */}

                  <div
                    className={`
                      mt-0.5 flex h-5 w-5 shrink-0
                      items-center justify-center rounded-full border
                      transition-all duration-300

                      ${
                        selected
                          ? "border-violet-400 bg-violet-500"
                          : "border-slate-600"
                      }
                    `}
                  >
                    {selected && (
                      <div className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </div>

                  <div>
                    <p
                      className={`text-sm font-semibold ${
                        selected
                          ? "text-indigo-700"
                          : "text-slate-700"
                      }`}
                    >
                      {difficulty.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {difficulty.description}
                    </p>
                  </div>
                </div>

                {selected && (
                  <div
                    className="absolute right-3 top-3 h-2 w-2
                    rounded-full bg-violet-400
                    shadow-[0_0_12px_rgba(167,139,250,0.8)]"
                  />
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* Divider */}

      <div className="my-8 h-px bg-white/[0.07]" />

      {/* ================= TIMER ================= */}

      <div>
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-300">
              Time per question
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Choose how long you'll have to answer each question.
            </p>
          </div>

          <div
            className="ml-4 flex min-w-20.5 items-center
            justify-center rounded-xl border border-violet-500/30
            bg-violet-500/10 px-3 py-2"
          >
            <span className="text-xl font-bold text-violet-300">
              {formData.questionTimer}
            </span>

            <span className="ml-1 text-xs text-violet-400">
              sec
            </span>
          </div>
        </div>

        <input
          type="range"
          name="questionTimer"
          min="20"
          max="60"
          step="5"
          value={formData.questionTimer}
          onChange={handleChange}
          className="h-2 w-full cursor-pointer appearance-none
          rounded-full bg-slate-800 accent-violet-500"
        />

        <div className="mt-3 flex justify-between text-xs text-slate-500">
          <div>
            <span className="font-medium text-slate-400">
              20 sec
            </span>

            <p className="mt-1 hidden sm:block">
              Quick thinking
            </p>
          </div>

          <div className="text-center">
            <span className="font-medium text-slate-400">
              40 sec
            </span>

            <p className="mt-1 hidden sm:block">
              Balanced
            </p>
          </div>

          <div className="text-right">
            <span className="font-medium text-slate-400">
              60 sec
            </span>

            <p className="mt-1 hidden sm:block">
              Take your time
            </p>
          </div>
        </div>
      </div>

      {/* ================= SUMMARY ================= */}

      <div
        className="mt-8 rounded-2xl border border-slate-200
        bg-slate-50 p-4"
      >
        <p
          className="mb-3 text-xs font-medium uppercase
          tracking-wider text-slate-500"
        >
          Quiz Setup
        </p>

        <div className="flex flex-wrap gap-2">
          <span
            className="rounded-lg border border-slate-200
            bg-white px-3 py-1.5
            text-xs text-slate-600"
          >
            {formData.topic || "Your topic"}
          </span>

          <span
            className="rounded-lg border border-violet-500/20
            bg-violet-500/10 px-3 py-1.5
            text-xs font-bold text-indigo-700"
          >
            {formData.difficulty}
          </span>

          <span
            className="rounded-lg border border-white/10
            bg-white/3 px-3 py-1.5
            text-xs text-slate-300"
          >
            {formData.questionTimer}s / question
          </span>
        </div>
      </div>

      {/* ================= BUTTON ================= */}

      <button
        type="submit"
        disabled={!formData.topic.trim()}
        className="group relative mt-6 w-full overflow-hidden
        rounded-2xl bg-violet-600 px-6 py-4
        text-sm font-semibold text-white
        shadow-xl shadow-violet-500/20
        transition-all duration-300
        hover:-translate-y-0.5
        hover:bg-violet-500
        hover:shadow-violet-500/30
        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:hover:translate-y-0"
      >
        <span
          className="absolute inset-0 -translate-x-full
          bg-linear-to-r from-transparent
          via-white/10 to-transparent
          transition-transform duration-700
          group-hover:translate-x-full"
        />

        <span className="relative flex items-center justify-center gap-2">
          <span>✦</span>

          Generate My Quiz

          <span
            className="transition-transform duration-300
            group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </button>

      <p className="mt-4 text-center text-xs text-slate-600">
        AI will generate your quiz based on these preferences.
      </p>
    </form>
  );
}

export default QuizForm;