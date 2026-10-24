function QuizTimer({ timeLeft }) {
  const isUrgent = timeLeft <= 10;
  return (
    <div className={`rounded-2xl border px-4 py-2 transition ${isUrgent ? "border-red-200 bg-red-50 text-red-700 animate-pulse" : "border-slate-200 bg-white text-slate-900"}`}>

      <p className={`text-xs font-semibold ${isUrgent ? "text-red-500" : "text-slate-500"}`}>
        Time Left
      </p>

      <p className="text-lg font-black">
        {timeLeft}s
      </p>

    </div>
  );
}

export default QuizTimer;