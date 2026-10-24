import React, { useEffect, useState } from 'react';

function AdminDashboard() {
	const [data, setData] = useState(null);
	const [error, setError] = useState('');

	useEffect(() => {
		const loadAdminOverview = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/admin-overview`,
					{
						credentials: 'include',
					},
				);
				const result = await response.json();
				if (!response.ok)
					throw new Error(result.message || 'Unable to load admin overview');
				setData(result);
			} catch (requestError) {
				setError(requestError.message);
			}
		};

		loadAdminOverview();
	}, []);

	const cards = [
		[
			'Users',
			data?.stats.users || 0,
			'People with a Assessly account',
			'bg-indigo-50 text-indigo-700',
		],
		[
			'Quizzes',
			data?.stats.quizzes || 0,
			'AI-generated learning sets',
			'bg-orange-50 text-orange-700',
		],
		[
			'Attempts',
			data?.stats.attempts || 0,
			'Practice sessions started',
			'bg-emerald-50 text-emerald-700',
		],
		[
			'Completed',
			data?.stats.completedAttempts || 0,
			'Finished assessments',
			'bg-violet-50 text-violet-700',
		],
	];

	return (
		<main className="min-h-[calc(100vh-73px)] bg-[#f8f7f3] px-5 py-10 text-slate-900 sm:px-8">
			<div className="mx-auto max-w-6xl">
				<div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
					<div>
						<p className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">
							Control center
						</p>
						<h1 className="mt-2 text-4xl font-black tracking-tight">
							Admin overview
						</h1>
						<p className="mt-3 text-sm text-slate-500">
							A calm, high-level view of activity across the platform.
						</p>
					</div>
					<span className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-black uppercase tracking-wider text-orange-700">
						ADMIN ACCESS
					</span>
				</div>

				{error && (
					<div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
						{error}
					</div>
				)}

				<div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
					{cards.map(([label, value, description, color]) => (
						<div
							key={label}
							className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
						>
							<div
								className={`inline-flex rounded-xl px-3 py-2 text-xs font-black uppercase tracking-wider ${color}`}
							>
								{label}
							</div>
							<p className="mt-6 text-4xl font-black">{value}</p>
							<p className="mt-2 text-sm leading-5 text-slate-500">
								{description}
							</p>
						</div>
					))}
				</div>

				<div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-900 p-7 text-white shadow-xl shadow-slate-900/10">
					<p className="text-sm font-bold text-orange-300">Admin workspace</p>
					<h2 className="mt-2 text-2xl font-black">
						Keep the learning loop healthy.
					</h2>
					<p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
						This first admin surface is intentionally read-only. It gives
						administrators visibility without exposing destructive controls
						accidentally.
					</p>
				</div>
			</div>
		</main>
	);
}

export default AdminDashboard;
