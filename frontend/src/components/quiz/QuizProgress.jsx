function QuizProgress({ currentQuestionIndex, totalQuestions }) {
  const progress =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="mb-6">

      <div className="mb-2 flex justify-between text-xs">
        <span className="font-semibold text-slate-600">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </span>

        <span className="font-bold text-indigo-600">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-orange-400 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

    </div>
  );
}

export default QuizProgress;