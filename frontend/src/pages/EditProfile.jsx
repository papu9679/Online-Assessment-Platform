import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../context/AuthContext.js';
import FormError from '../components/FormError.jsx';
import FormSuccess from '../components/FormSuccess.jsx';

function EditProfile() {
	const { user, getProfile } = useContext(AuthContext);
	const fileInputRef = useRef(null);
	const [selectedImage, setSelectedImage] = useState(null);
	const [preview, setPreview] = useState(user?.profilePic || null);
	const [photoLoading, setPhotoLoading] = useState(false);
	const [photoError, setPhotoError] = useState('');
	const [photoSuccess, setPhotoSuccess] = useState('');
	const [passwords, setPasswords] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [passwordLoading, setPasswordLoading] = useState(false);
	const [passwordError, setPasswordError] = useState('');
	const [passwordSuccess, setPasswordSuccess] = useState('');

	useEffect(() => {
		setPreview(user?.profilePic || null);
	}, [user?.profilePic]);

	const handleImageChange = (event) => {
		const file = event.target.files?.[0];
		if (!file) return;

		setPhotoError('');
		setPhotoSuccess('');
		if (!['image/png', 'image/jpeg'].includes(file.type)) {
			setPhotoError('Please choose a JPG or PNG image.');
			return;
		}
		if (file.size > 5 * 1024 * 1024) {
			setPhotoError('Please choose an image smaller than 5MB.');
			return;
		}

		setSelectedImage(file);
		setPreview(URL.createObjectURL(file));
	};

	const handleRemoveImage = () => {
		setSelectedImage(null);
		setPreview(user?.profilePic || null);
		setPhotoError('');
		if (fileInputRef.current) fileInputRef.current.value = '';
	};

	const handleUploadImage = async () => {
		if (!selectedImage) return;
		setPhotoLoading(true);
		setPhotoError('');
		setPhotoSuccess('');
		try {
			const body = new FormData();
			body.append('file', selectedImage);
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_BASE_URL}/user/profile-picture`,
				{
					method: 'POST',
					credentials: 'include',
					body,
				},
			);
			const data = await response.json();
			if (!response.ok)
				throw new Error(data.message || 'Unable to update profile photo');
			await getProfile();
			setSelectedImage(null);
			setPhotoSuccess(data.message || 'Profile photo updated successfully');
			if (fileInputRef.current) fileInputRef.current.value = '';
		} catch (error) {
			setPhotoError(error.message);
		} finally {
			setPhotoLoading(false);
		}
	};

	const handlePasswordChange = (event) => {
		const { name, value } = event.target;
		setPasswords((current) => ({ ...current, [name]: value }));
	};

	const handlePasswordSubmit = async (event) => {
		event.preventDefault();
		setPasswordError('');
		setPasswordSuccess('');
		if (passwords.newPassword.length < 6) {
			setPasswordError('New password must be at least 6 characters long.');
			return;
		}
		if (passwords.newPassword !== passwords.confirmPassword) {
			setPasswordError('New password and confirmation do not match.');
			return;
		}

		setPasswordLoading(true);
		try {
			const response = await fetch(
				`${import.meta.env.VITE_BACKEND_BASE_URL}/user/change-password`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify({
						currentPassword: passwords.currentPassword,
						newPassword: passwords.newPassword,
					}),
				},
			);
			const data = await response.json();
			if (!response.ok)
				throw new Error(data.message || 'Unable to change password');
			setPasswordSuccess(data.message || 'Password changed successfully');
			setPasswords({
				currentPassword: '',
				newPassword: '',
				confirmPassword: '',
			});
		} catch (error) {
			setPasswordError(error.message);
		} finally {
			setPasswordLoading(false);
		}
	};

	return (
		<main className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-[#f8f7f3] px-5 py-12 text-slate-900 sm:px-8">
			<div className="pointer-events-none absolute -left-24 top-12 h-80 w-80 rounded-full bg-indigo-200/60 blur-3xl" />
			<div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-200/50 blur-3xl" />
			<div className="relative mx-auto max-w-5xl">
				<div className="mb-8">
					<p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600">
						Account settings
					</p>
					<h1 className="mt-2 text-4xl font-black tracking-tight">
						Edit profile
					</h1>
					<p className="mt-3 text-sm text-slate-500">
						Update your identity and keep your learning account secure.
					</p>
				</div>

				<div className="space-y-6">
					<section className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-9">
						<SectionHeading
							eyebrow="Identity"
							title="Profile photo"
							description="Choose a clear image for your Assessly account."
						/>
						<div className="mt-8 flex flex-col gap-7 sm:flex-row sm:items-center">
							<div className="relative mx-auto shrink-0 sm:mx-0">
								<div className="absolute -inset-2 rounded-full bg-gradient-to-r from-indigo-400 to-orange-300 opacity-50 blur-md" />
								{preview ? (
									<img
										src={preview}
										alt={user?.name || 'Profile'}
										className="relative h-28 w-28 rounded-full border-4 border-white object-cover shadow-xl"
									/>
								) : (
									<div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-indigo-600 text-4xl font-black text-white shadow-xl">
										{user?.name?.[0]?.toUpperCase() || 'U'}
									</div>
								)}
							</div>
							<div className="flex-1">
								<input
									ref={fileInputRef}
									type="file"
									accept="image/png,image/jpeg"
									onChange={handleImageChange}
									className="hidden"
								/>
								<div className="flex flex-wrap gap-3">
									<button
										type="button"
										onClick={() => fileInputRef.current?.click()}
										className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
									>
										Choose photo
									</button>
									{selectedImage && (
										<button
											type="button"
											onClick={handleUploadImage}
											disabled={photoLoading}
											className="rounded-2xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-100 disabled:cursor-wait disabled:opacity-60"
										>
											{photoLoading ? 'Saving...' : 'Save photo'}
										</button>
									)}
									{selectedImage && (
										<button
											type="button"
											onClick={handleRemoveImage}
											className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
										>
											Cancel
										</button>
									)}
								</div>
								<p className="mt-4 text-xs text-slate-500">
									JPG or PNG · maximum 5MB
								</p>
								{photoError && (
									<div className="mt-4">
										<FormError error={photoError} />
									</div>
								)}
								{photoSuccess && (
									<div className="mt-4">
										<FormSuccess success={photoSuccess} />
									</div>
								)}
							</div>
						</div>
					</section>

					<section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
						<SectionHeading
							eyebrow="Account"
							title="Account information"
							description="These details are connected to your Assessly account."
						/>
						<div className="mt-7 grid gap-4 sm:grid-cols-3">
							<InfoTile label="Name" value={user?.name || 'Not available'} />
							<InfoTile label="Email" value={user?.email || 'Not available'} />
							<InfoTile label="Role" value={user?.role || 'USER'} accent />
						</div>
					</section>

					<section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
						<SectionHeading
							eyebrow="Security"
							title="Password & security"
							description="Use a strong password you do not reuse elsewhere."
							icon="🔒"
						/>
						<form onSubmit={handlePasswordSubmit} className="mt-7 space-y-5">
							<PasswordInput
								label="Current password"
								name="currentPassword"
								value={passwords.currentPassword}
								onChange={handlePasswordChange}
								showPassword={showPassword}
							/>
							<div className="grid gap-5 sm:grid-cols-2">
								<PasswordInput
									label="New password"
									name="newPassword"
									value={passwords.newPassword}
									onChange={handlePasswordChange}
									showPassword={showPassword}
								/>
								<PasswordInput
									label="Confirm password"
									name="confirmPassword"
									value={passwords.confirmPassword}
									onChange={handlePasswordChange}
									showPassword={showPassword}
								/>
							</div>
							<label className="flex w-fit cursor-pointer items-center gap-2 text-sm font-semibold text-slate-600">
								<input
									type="checkbox"
									checked={showPassword}
									onChange={(event) => setShowPassword(event.target.checked)}
									className="h-4 w-4 accent-indigo-600"
								/>
								Show passwords
							</label>
							{passwordError && <FormError error={passwordError} />}
							{passwordSuccess && <FormSuccess success={passwordSuccess} />}
							<div className="flex flex-col justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
								<p className="text-xs text-slate-500">
									Your password must be at least 6 characters.
								</p>
								<button
									type="submit"
									disabled={passwordLoading}
									className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-wait disabled:opacity-60"
								>
									{passwordLoading ? 'Updating...' : 'Update password'}
								</button>
							</div>
						</form>
					</section>
				</div>
			</div>
		</main>
	);
}

function SectionHeading({ eyebrow, title, description, icon }) {
	return (
		<div className="flex items-start gap-3">
			{icon && (
				<span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-lg">
					{icon}
				</span>
			)}
			<div>
				<p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">
					{eyebrow}
				</p>
				<h2 className="mt-1 text-xl font-black text-slate-900">{title}</h2>
				<p className="mt-1 text-sm text-slate-500">{description}</p>
			</div>
		</div>
	);
}

function InfoTile({ label, value, accent = false }) {
	return (
		<div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
			<p className="text-xs font-black uppercase tracking-wider text-slate-400">
				{label}
			</p>
			<p
				className={`mt-2 truncate text-sm font-black ${accent ? 'text-indigo-600' : 'text-slate-800'}`}
			>
				{value}
			</p>
		</div>
	);
}

function PasswordInput({ label, name, value, onChange, showPassword }) {
	return (
		<label className="block text-sm font-bold text-slate-700">
			{label}
			<input
				type={showPassword ? 'text' : 'password'}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={`Enter ${label.toLowerCase()}`}
				className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-indigo-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
			/>
		</label>
	);
}

export default EditProfile;
