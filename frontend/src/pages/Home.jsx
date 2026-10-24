import React, { useContext } from 'react';
import { Link } from 'react-router';
import AuthContext from '../context/AuthContext.js';

function Home() {
	const { user } = useContext(AuthContext);

	const features = [
		[
			'✦',
			'Build in seconds',
			'Turn any topic into a focused quiz with the right difficulty and question count.',
			'bg-indigo-50 text-indigo-700',
		],
		[
			'↗',
			'See your momentum',
			'Simple analytics show where you are improving and what deserves another look.',
			'bg-orange-50 text-orange-700',
		],
		[
			'◎',
			'Practice with purpose',
			'Each attempt becomes a small, measurable step toward your next learning goal.',
			'bg-emerald-50 text-emerald-700',
		],
	];

	return (
		<main className="overflow-hidden bg-[#f8f7f3] text-slate-900">
			<section className="relative px-5 pb-20 pt-14 sm:pt-20 lg:px-8 lg:pb-28">
				<div className="pointer-events-none absolute -left-28 top-10 h-80 w-80 rounded-full bg-indigo-200/60 blur-3xl" />
				<div className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-orange-200/60 blur-3xl" />
				<div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_.9fr] lg:gap-20">
					<div>
						<div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-700 shadow-sm">
							<span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
							Your smarter practice loop
						</div>
						<h1 className="mt-7 max-w-3xl text-5xl font-black leading-[.98] tracking-[-.05em] text-slate-900 sm:text-7xl">
							Learn in a way that feels{' '}
							<span className="text-indigo-600">made for you.</span>
						</h1>
						<p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
							Assessly turns your curiosity into interactive practice. Create a
							quiz, test your thinking, and watch your progress become visible.
						</p>
						<div className="mt-9 flex flex-col gap-3 sm:flex-row">
							<Link
								to={user ? '/create-quiz' : '/signup'}
								className="group inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-600/20 transition hover:-translate-y-1 hover:bg-indigo-700"
							>
								{user ? 'Create my next quiz' : 'Start learning free'}
								<span className="ml-3 transition group-hover:translate-x-1">
									→
								</span>
							</Link>
							<Link
								to={user ? '/dashboard' : '/login'}
								className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-6 py-4 text-sm font-bold text-slate-700 transition hover:-translate-y-1 hover:border-indigo-200 hover:text-indigo-700"
							>
								{user ? 'Open dashboard' : 'I already have an account'}
							</Link>
						</div>
						<div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-semibold text-slate-500">
							<span>
								<strong className="text-slate-900">∞</strong> topics
							</span>
							<span>
								<strong className="text-slate-900">3</strong> simple steps
							</span>
							<span>
								<strong className="text-slate-900">24/7</strong> practice
							</span>
						</div>
					</div>

					<div className="relative mx-auto w-full max-w-md lg:mr-0">
						<div className="absolute -right-5 -top-7 z-20 rounded-2xl border border-white bg-white px-4 py-3 shadow-xl shadow-slate-900/10 animate-bounce [animation-duration:3s]">
							<p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
								Today's focus
							</p>
							<p className="mt-1 text-sm font-bold text-slate-800">
								Build a better habit ✨
							</p>
						</div>
						<div className="rounded-[2rem] border border-white bg-white/75 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-6">
							<div className="flex items-center justify-between border-b border-slate-100 pb-5">
								<div>
									<p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
										Quick practice
									</p>
									<h2 className="mt-1 text-xl font-black">
										How curious are you?
									</h2>
								</div>
								<span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
									Ready
								</span>
							</div>
							<div className="mt-6 rounded-2xl bg-slate-900 p-5 text-white">
								<p className="text-xs font-bold text-indigo-300">
									QUESTION 01 / 05
								</p>
								<p className="mt-5 text-lg font-bold leading-7">
									What helps an idea become a habit?
								</p>
								<div className="mt-5 space-y-2">
									{[
										'A perfect plan',
										'A small repeatable step',
										'More notifications',
									].map((answer, index) => (
										<div
											key={answer}
											className={`flex items-center gap-3 rounded-xl border px-3 py-3 text-sm ${index === 1 ? 'border-indigo-400 bg-indigo-500/20 text-white' : 'border-white/10 text-slate-300'}`}
										>
											<span
												className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${index === 1 ? 'bg-indigo-500' : 'bg-white/10'}`}
											>
												{String.fromCharCode(65 + index)}
											</span>
											{answer}
											{index === 1 && (
												<span className="ml-auto text-emerald-300">✓</span>
											)}
										</div>
									))}
								</div>
							</div>
							<div className="mt-5 flex items-center justify-between text-xs font-semibold text-slate-500">
								<span>Progress</span>
								<span className="text-indigo-600">20%</span>
							</div>
							<div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
								<div className="h-full w-1/5 rounded-full bg-indigo-600" />
							</div>
						</div>
						<div className="absolute -bottom-6 -left-7 rounded-2xl border border-white bg-white px-4 py-3 shadow-xl shadow-slate-900/10">
							<p className="text-xs text-slate-400">Learning streak</p>
							<p className="mt-1 text-lg font-black text-orange-600">
								7 days 🔥
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="border-y border-slate-200/80 bg-white/45 px-5 py-20 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
						<div>
							<p className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">
								Why Assessly
							</p>
							<h2 className="mt-3 max-w-xl text-3xl font-black tracking-tight sm:text-4xl">
								Less friction. More moments of “I get it.”
							</h2>
						</div>
						<p className="max-w-sm text-sm leading-6 text-slate-500">
							Everything you need to move from “I should study” to “I just
							learned something.”
						</p>
					</div>
					<div className="mt-12 grid gap-5 md:grid-cols-3">
						{features.map(([icon, title, description, color], index) => (
							<article
								key={title}
								className="group rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-900/10"
							>
								<div
									className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-black ${color}`}
								>
									{icon}
								</div>
								<p className="mt-6 text-xs font-black uppercase tracking-wider text-slate-400">
									0{index + 1}
								</p>
								<h3 className="mt-2 text-xl font-black">{title}</h3>
								<p className="mt-3 text-sm leading-6 text-slate-500">
									{description}
								</p>
								<div className="mt-6 h-1 w-10 rounded-full bg-slate-200 transition-all group-hover:w-20 group-hover:bg-indigo-500" />
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="px-5 py-20 lg:px-8">
				<div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2rem] bg-slate-900 px-7 py-10 text-white shadow-2xl shadow-slate-900/15 sm:px-12 lg:grid-cols-[1fr_auto]">
					<div>
						<p className="text-sm font-bold text-orange-300">
							A simple loop that works
						</p>
						<h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
							Choose. Challenge. Grow.
						</h2>
						<p className="mt-4 max-w-xl text-sm leading-6 text-slate-300">
							Start with one topic today. Your future self will thank you for
							making progress feel this easy.
						</p>
					</div>
					<Link
						to={user ? '/create-quiz' : '/signup'}
						className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-black text-slate-900 transition hover:-translate-y-1 hover:bg-indigo-50"
					>
						{user ? 'Create a quiz' : 'Join Assessly'}{' '}
						<span className="ml-3">↗</span>
					</Link>
				</div>
			</section>

			<footer className="border-t border-slate-200/80 px-5 py-8 lg:px-8">
				<div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-sm text-slate-500 sm:flex-row">
					<p>© {new Date().getFullYear()} Assessly</p>
					<p>Made for curious minds.</p>
				</div>
			</footer>
		</main>
	);
}

export default Home;
