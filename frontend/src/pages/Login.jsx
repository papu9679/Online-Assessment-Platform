import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import FormError from '../components/FormError.jsx';
import FormSuccess from '../components/FormSuccess.jsx';
import AuthContext from '../context/AuthContext.js';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { getProfile } = useContext(AuthContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError('');
		setSuccess('');
		setLoading(true);

		try {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify({ email, password }),
				},
			);
			const data = await response.json();
			if (!response.ok) throw new Error(data.message || 'Unable to sign in');
			setSuccess(data.message || 'Signed in successfully');
			await getProfile();
			navigate('/');
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="relative flex min-h-[calc(100vh-73px)] items-center justify-center overflow-hidden bg-[#f8f7f3] px-5 py-12 text-slate-900">
			<div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-200/50 blur-3xl" />
			<div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-orange-200/50 blur-3xl" />
			<div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 shadow-2xl shadow-slate-900/10 backdrop-blur-xl md:grid-cols-[.85fr_1.15fr]">
				<aside className="hidden flex-col justify-between bg-slate-900 p-10 text-white md:flex">
					<div>
						<span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-indigo-200">
							Assessly / MEMBER SPACE
						</span>
						<h2 className="mt-20 text-4xl font-black leading-tight">
							Make progress
							<br />
							<span className="text-indigo-300">feel visible.</span>
						</h2>
						<p className="mt-5 max-w-xs text-sm leading-6 text-slate-300">
							Turn curiosity into a practice loop that remembers where you are
							going.
						</p>
					</div>
					<div className="flex items-center gap-3 text-sm text-slate-300">
						<span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />{' '}
						Your learning space is ready
					</div>
				</aside>

				<section className="relative p-7 sm:p-12">
					<div className="mb-8 flex items-center justify-between">
						<div>
							<p className="text-sm font-bold text-indigo-600">Welcome back</p>
							<h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
								Sign in and pick up
								<br />
								where you left off.
							</h1>
						</div>
						<span className="text-4xl">✦</span>
					</div>
					<form onSubmit={handleSubmit} className="space-y-5">
						<label className="block text-sm font-semibold text-slate-700">
							Email
							<input
								id="email"
								type="email"
								placeholder="you@example.com"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								required
								className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
							/>
						</label>
						<label className="block text-sm font-semibold text-slate-700">
							Password
							<div className="mt-2 flex items-center rounded-2xl border border-slate-200 bg-white transition focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10">
								<input
									id="password"
									type="password"
									placeholder="Your password"
									value={password}
									onChange={(event) => setPassword(event.target.value)}
									required
									className="min-w-0 flex-1 rounded-2xl border-0 bg-transparent px-4 py-3.5 text-sm outline-none focus:ring-0"
								/>
								<Link
									to="/forgot-password"
									className="pr-4 text-xs font-bold text-indigo-600 hover:text-indigo-800"
								>
									Forgot?
								</Link>
							</div>
						</label>
						{error && <FormError error={error} />}
						{success && <FormSuccess success={success} />}
						<button
							type="submit"
							disabled={loading}
							className="group w-full rounded-2xl bg-indigo-600 px-5 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-wait disabled:opacity-70"
						>
							<span className="flex items-center justify-center gap-3">
								{loading ? (
									<>
										<span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
										Refreshing your space...
									</>
								) : (
									<>
										Continue learning{' '}
										<span className="transition group-hover:translate-x-1">
											→
										</span>
									</>
								)}
							</span>
						</button>
					</form>
					<p className="mt-8 text-center text-sm text-slate-500">
						New to Assessly?{' '}
						<Link
							to="/signup"
							className="font-bold text-indigo-600 hover:text-indigo-800"
						>
							Create your account
						</Link>
					</p>
				</section>
			</div>
			{loading && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm">
					<div className="rounded-3xl bg-white px-7 py-6 text-center shadow-2xl">
						<div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
						<p className="mt-4 text-sm font-bold text-slate-700">
							Setting up your dashboard...
						</p>
						<p className="mt-1 text-xs text-slate-400">
							A moment while we bring everything back.
						</p>
					</div>
				</div>
			)}
		</main>
	);
}

export default Login;
