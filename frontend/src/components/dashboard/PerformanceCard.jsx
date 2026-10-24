import React from 'react';
import { Link } from 'react-router';

function PerformanceCard({ title, quiz }) {
	if (!quiz) {
		return null;
	}

	return (
		<div
			className="
        group
        rounded-2xl
        border border-slate-200
        bg-white
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-indigo-500/30
        hover:bg-indigo-50/40
      "
		>
			{/* Card Title */}
			<p className="text-sm font-semibold text-slate-500">{title}</p>

			{/* Quiz Info */}
			<div className="mt-4">
				<h2 className="text-xl font-black text-slate-900">{quiz.title}</h2>

				<div className="mt-2 flex items-center gap-3 text-sm text-slate-500">
					<span>{quiz.topic}</span>

					<span className="h-1 w-1 rounded-full bg-slate-600" />

					<span>{quiz.difficulty}</span>
				</div>
			</div>

			{/* Score */}
			<div className="mt-6 flex items-end justify-between">
				<div>
					<p className="text-3xl font-black text-indigo-600">
						{quiz.percentage}%
					</p>

					<p className="mt-1 text-sm text-slate-500">
						{quiz.score} / {quiz.totalQuestions}
					</p>
				</div>

				<Link
					to={`/quiz/${quiz.quizId}/view`}
					className="
            text-sm
            font-medium
            text-indigo-600
            transition-colors
            duration-200
            hover:text-indigo-800
          "
				>
					View Quiz →
				</Link>
			</div>
		</div>
	);
}

export default PerformanceCard;
