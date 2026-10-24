import React from 'react';
import { NavLink } from 'react-router';

function DashboardSidebar() {
	const navItems = [
		{
			name: 'Overview',
			path: '/dashboard',
			end: true,
			icon: '▦',
		},
		{
			name: 'My Quizzes',
			path: '/dashboard/quizzes',
			icon: '◫',
		},
		{
			name: 'Analytics',
			path: '/dashboard/analytics',
			icon: '⌁',
		},
	];

	return (
		<div className="flex h-full flex-col">
			{/* Dashboard Title */}
			<div className="hidden px-6 pb-5 pt-7 md:block">
				<p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
					Workspace
				</p>

				<h2 className="text-xl font-black tracking-tight text-slate-900">
					Dashboard
				</h2>

				<p className="mt-1 text-sm text-slate-500">Track your quiz journey</p>
			</div>

			{/* Divider */}
			<div className="mx-6 hidden border-t border-slate-200 md:block" />

			{/* Navigation */}
			<nav
				className="
          flex
          items-center
          gap-2
          overflow-x-auto
          px-3
          py-3

          md:flex-col
          md:items-stretch
          md:gap-2
          md:overflow-visible
          md:px-4
          md:py-5
        "
			>
				{navItems.map((item) => (
					<NavLink
						key={item.name}
						to={item.path}
						end={item.end}
						className={({ isActive }) =>
							`
                group
                relative
                flex
                shrink-0
                items-center
                gap-3
                rounded-xl
                px-4
                py-2.5
                text-sm
                font-medium
                transition-all
                duration-200

                md:w-full
                md:py-3

                ${
									isActive
										? 'bg-indigo-50 text-indigo-700'
										: 'text-slate-500 hover:bg-white hover:text-slate-900'
								}
              `
						}
					>
						{({ isActive }) => (
							<>
								{/* Active Indicator */}
								<span
									className={`
                    absolute
                    bottom-0
                    left-4
                    right-4
                    h-[2px]
                    rounded-full
                    bg-indigo-600
                    transition-all
                    duration-200

                    md:bottom-2
                    md:left-0
                    md:right-auto
                    md:top-2
                    md:h-auto
                    md:w-[3px]

                    ${isActive ? 'opacity-100' : 'opacity-0'}
                  `}
								/>

								{/* Icon */}
								<span
									className={`
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    text-lg
                    transition-all
                    duration-200

                    ${
											isActive
												? 'bg-indigo-100 text-indigo-700'
												: 'bg-slate-100 text-slate-500 group-hover:text-slate-700'
										}
                  `}
								>
									{item.icon}
								</span>

								{/* Label */}
								<span>{item.name}</span>
							</>
						)}
					</NavLink>
				))}
			</nav>

			{/* Bottom Message - Desktop Only */}
			<div className="mt-auto hidden p-4 md:block">
				<div className="rounded-2xl border border-slate-200 bg-white p-4">
					<p className="text-xs font-semibold text-slate-700">Keep learning</p>

					<p className="mt-1 text-xs leading-relaxed text-slate-500">
						Every quiz is another step forward.
					</p>
				</div>
			</div>
		</div>
	);
}

export default DashboardSidebar;
