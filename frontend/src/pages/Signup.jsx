import React, { useState } from 'react';
import { Link } from 'react-router';
import FormError from '../components/FormError.jsx';
import FormSuccess from '../components/FormSuccess.jsx';

function Signup() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError('');
		setSuccess('');
		setLoading(true);
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/signup`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify({ name, email, password }),
				},
			);
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || 'Unable to create account');
			}
			setSuccess(data.message || 'Account created. You can sign in now.');
			setName('');
			setEmail('');
			setPassword('');
            setLoading(false);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="relative flex min-h-[calc(100vh-73px)] items-center justify-center overflow-hidden bg-[#f8f7f3] px-5 py-12 text-slate-900">
			<div className="pointer-events-none absolute left-0 top-20 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl" />
			<div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-200/50 blur-3xl" />
			<div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-4xl border border-white/80 bg-white/70 shadow-2xl shadow-slate-900/10 backdrop-blur-xl md:grid md:grid-cols-[1.15fr_.85fr]">
				<section className="p-7 sm:p-12">
					<div className="mb-8">
						<p className="text-sm font-bold text-orange-600">
							Your next chapter starts here
						</p>
						<h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
							Build a learning habit
							<br />
							that actually sticks.
						</h1>
					</div>
					<form onSubmit={handleSubmit} className="space-y-5">
						<label className="block text-sm font-semibold text-slate-700">
							Your name
							<input
								id="name"
								type="text"
								placeholder="How should we call you?"
								value={name}
								onChange={(event) => setName(event.target.value)}
								required
								className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
							/>
						</label>
						<label className="block text-sm font-semibold text-slate-700">
							Email
							<input
								id="email"
								type="email"
								placeholder="you@example.com"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								required
								className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
							/>
						</label>
						<label className="block text-sm font-semibold text-slate-700">
							Password
							<input
								id="password"
								type="password"
								placeholder="At least 6 characters"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								required
								minLength={6}
								className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
							/>
						</label>
						{error && <FormError error={error} />}
						{success && <FormSuccess success={success} />}
						<button
							type="submit"
							disabled={loading}
							className="w-full rounded-2xl bg-slate-900 px-5 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-wait disabled:opacity-70"
						>
							<span className="flex items-center justify-center gap-3">
								{loading ? (
									<>
										<span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
										Creating your space...
									</>
								) : (
									<>
										Create my account <span>→</span>
									</>
								)}
							</span>
						</button>
					</form>
					<p className="mt-8 text-center text-sm text-slate-500">
						Already a member?{' '}
						<Link
							to="/login"
							className="font-bold text-indigo-600 hover:text-indigo-800"
						>
							Sign in
						</Link>
					</p>
				</section>
				<aside className="hidden flex-col justify-between bg-orange-50 p-10 md:flex">
					<div>
						<span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
							A BETTER WAY TO PRACTICE
						</span>
						<div className="mt-16 text-8xl">🪴</div>
						<h2 className="mt-8 text-3xl font-black text-slate-900">
							Small sessions.
							<br />
							<span className="text-orange-600">Real momentum.</span>
						</h2>
						<p className="mt-4 text-sm leading-6 text-slate-600">
							Generate, attempt, reflect, repeat. Your dashboard keeps the loop
							moving.
						</p>
					</div>
					<div className="flex gap-2 text-2xl">
						<span className="animate-bounce">✦</span>
						<span className="animate-bounce [animation-delay:150ms]">✧</span>
						<span className="animate-bounce [animation-delay:300ms]">✦</span>
					</div>
				</aside>
			</div>
			{loading && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm">
					<div className="rounded-3xl bg-white px-7 py-6 text-center shadow-2xl">
						<div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-100 border-t-orange-600" />
						<p className="mt-4 text-sm font-bold text-slate-700">
							Creating your learning space...
						</p>
						<p className="mt-1 text-xs text-slate-400">
							We are getting everything ready for you.
						</p>
					</div>
				</div>
			)}
		</main>
	);
}

export default Signup;
