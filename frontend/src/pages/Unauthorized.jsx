import React from 'react';
import { Link } from 'react-router';

function Unauthorized() {
	return (
		<main className="relative flex min-h-[calc(100vh-73px)] items-center justify-center overflow-hidden bg-[#f8f7f3] px-6 py-16 text-slate-900">
			<div className="absolute left-[12%] top-20 h-40 w-40 rounded-full bg-indigo-200/50 blur-3xl" />
			<div className="absolute bottom-10 right-[12%] h-48 w-48 rounded-full bg-orange-200/60 blur-3xl" />
			<section className="relative w-full max-w-2xl text-center">
				<div className="mb-6 flex items-end justify-center gap-3 text-5xl sm:text-7xl">
					<span className="animate-bounce [animation-delay:100ms]">🦊</span>
					<span className="animate-bounce">🦆</span>
					<span className="animate-bounce [animation-delay:200ms]">🐢</span>
				</div>
				<div className="rounded-[2rem] border border-white/80 bg-white/75 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-14">
					<p className="text-sm font-black uppercase tracking-[0.25em] text-orange-600">
						Lost connection to Assessly
					</p>
					<h1 className="mt-5 text-7xl font-black tracking-tighter text-slate-900 sm:text-9xl">
						404
					</h1>
					<h2 className="mt-3 text-2xl font-black sm:text-3xl">
						This trail went off the map.
					</h2>
					<p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
						The page you are looking for wandered away. Our tiny explorers are
						already searching for it.
					</p>
					<div className="mx-auto my-8 h-px max-w-xs bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
					<div className="flex flex-col justify-center gap-3 sm:flex-row">
						<Link
							to="/"
							className="rounded-2xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
						>
							Take me home ↗
						</Link>
						<Link
							to="/login"
							className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-700"
						>
							Try signing in
						</Link>
					</div>
				</div>
				<p className="mt-6 text-xs font-semibold text-slate-400">
					No internet? Check your connection and refresh the trail.
				</p>
			</section>
		</main>
	);
}

export default Unauthorized;
