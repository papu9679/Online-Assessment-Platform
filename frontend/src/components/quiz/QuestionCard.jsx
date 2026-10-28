function QuestionCard({
  question,
  selectedOption,
  onSelectOption,
}) {
  return (
    <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">

      <div className="mb-6 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-600">
        <span className="h-2 w-2 rounded-full bg-indigo-500" />
        Choose one answer
      </div>

      <h2 className="text-xl font-black leading-8 text-slate-900 sm:text-2xl">
        {question.question}
      </h2>

      <div className="mt-8 space-y-3">

        {question.options.map((option, index) => {

          const selected = selectedOption === index;

          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelectOption(index)}
              className={`
                flex w-full items-center gap-4
                rounded-2xl border p-4 text-left
                transition-all duration-200

                ${
                  selected
                    ? "border-indigo-400 bg-indigo-50 shadow-lg shadow-indigo-500/10"
                    : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50/40"
                }
              `}
            >

              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-sm font-bold ${selected ? "border-indigo-300 bg-indigo-600 text-white" : "border-slate-200 bg-slate-50 text-slate-500"}`}>
                {String.fromCharCode(65 + index)}
              </span>

              <span className={`font-medium ${selected ? "text-indigo-900" : "text-slate-700"}`}>
                {option}
              </span>
              {selected && <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">✓</span>}

            </button>
          );
        })}

      </div>

    </div>
  );
}

export default QuestionCard;