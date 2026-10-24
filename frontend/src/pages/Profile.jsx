import React, { useContext } from 'react';
import { Link } from 'react-router';
import AuthContext from '../context/AuthContext.js';

function Profile() {
	const { user } = useContext(AuthContext);
	const quizCount = user?.aiQuizGeneratedCount || 0;
	const maxQuizzes = 10;
	const percentage = Math.min(Math.round((quizCount / maxQuizzes) * 100), 100);
	const profileImage = user?.profilePic;

	return (
		<main className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-[#f8f7f3] px-5 py-12 text-slate-900 sm:px-8">
			<div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-indigo-200/60 blur-3xl" />
			<div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-200/50 blur-3xl" />

			<div className="relative mx-auto max-w-5xl">
				<div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
					<div>
						<p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600">
							Your account
						</p>
						<h1 className="mt-2 text-4xl font-black tracking-tight">Profile</h1>
						<p className="mt-3 text-sm text-slate-500">
							A quick view of your identity, role, and learning momentum.
						</p>
					</div>
					<Link
						to="/edit-profile"
						className="inline-flex w-fit items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-700"
					>
						Edit profile <span className="ml-2">↗</span>
					</Link>
				</div>

				<section className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
					<div className="relative border-b border-slate-100 bg-gradient-to-br from-indigo-50 via-white to-orange-50 px-6 py-9 sm:px-10">
						<div className="flex flex-col items-center gap-6 sm:flex-row">
							<div className="relative shrink-0">
								<div className="absolute -inset-2 rounded-full bg-gradient-to-r from-indigo-400 to-orange-300 opacity-50 blur-md" />
								{profileImage ? (
									<img
										src={profileImage}
										alt={user?.name || 'Profile'}
										className="relative h-28 w-28 rounded-full border-4 border-white object-cover shadow-xl"
									/>
								) : (
									<div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-indigo-600 text-4xl font-black text-white shadow-xl">
										{user?.name?.[0]?.toUpperCase() || 'U'}
									</div>
								)}
							</div>
							<div className="text-center sm:text-left">
								<p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">
									Assessly member
								</p>
								<h2 className="mt-2 text-3xl font-black text-slate-900">
									{user?.name || 'User'}
								</h2>
								<p className="mt-1 text-sm text-slate-500">
									{user?.email || 'No email available'}
								</p>
								<span className="mt-4 inline-flex rounded-full bg-slate-900 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white">
									{user?.role || 'USER'} account
								</span>
							</div>
						</div>
					</div>

					<div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-10">
						<InfoTile label="Name" value={user?.name || 'Not available'} />
						<InfoTile
							label="Email address"
							value={user?.email || 'Not available'}
							truncate
						/>
						<InfoTile
							label="Account role"
							value={user?.role || 'USER'}
							accent
						/>
					</div>

					<div className="px-6 pb-8 sm:px-10 sm:pb-10">
						<div className="rounded-[1.5rem] border border-orange-200 bg-orange-50/70 p-6">
							<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
								<div>
									<p className="text-xs font-black uppercase tracking-[0.18em] text-orange-700">
										Learning allowance
									</p>
									<h3 className="mt-2 text-xl font-black text-slate-900">
										AI quiz generations
									</h3>
									<p className="mt-1 text-sm text-slate-500">
										Use each generated quiz as one more step forward.
									</p>
								</div>
								<p className="text-3xl font-black text-slate-900">
									{quizCount}
									<span className="text-lg text-slate-400">
										{' '}
										/ {maxQuizzes}
									</span>
								</p>
							</div>
							<div className="mt-5 h-3 overflow-hidden rounded-full bg-orange-100">
								<div
									className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-700"
									style={{ width: `${percentage}%` }}
								/>
							</div>
							<div className="mt-3 flex justify-between text-xs font-semibold text-slate-500">
								<span>{quizCount} generated</span>
								<span>{Math.max(maxQuizzes - quizCount, 0)} remaining</span>
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}

function InfoTile({ label, value, truncate = false, accent = false }) {
	return (
		<div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50/40">
			<p className="text-xs font-black uppercase tracking-wider text-slate-400">
				{label}
			</p>
			<p
				className={`mt-2 text-lg font-black ${truncate ? 'truncate' : ''} ${accent ? 'text-indigo-600' : 'text-slate-900'}`}
			>
				{value}
			</p>
		</div>
	);
}

export default Profile;
