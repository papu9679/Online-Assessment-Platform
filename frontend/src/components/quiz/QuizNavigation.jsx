function QuizNavigation({
  isLastQuestion,
  selectedOption,
  onNext,
  onSubmit,
}) {
  return (
    <div className="mt-6 flex justify-end">

      <button
        type="button"
        disabled={selectedOption === null}
        onClick={isLastQuestion ? onSubmit : onNext}
        className="
          rounded-2xl bg-indigo-600
          px-6 py-3 text-sm font-bold
          text-white transition
          shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5 hover:bg-indigo-700
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        {isLastQuestion ? "Submit Quiz" : "Next →"}
      </button>

    </div>
  );
}

export default QuizNavigation;