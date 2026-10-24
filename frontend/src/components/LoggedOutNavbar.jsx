import React from "react";
import { Link, NavLink } from "react-router";

function LoggedOutNavbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#f8f7f3]/85 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
                <Link to="/" className="group flex items-center gap-2 text-xl font-black tracking-tight text-slate-900">
                    <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-sm text-white shadow-lg shadow-slate-900/15 transition-transform group-hover:rotate-6">
                        Q
                    </span>
                    Assessly<span className="text-indigo-600">Quizzes</span>App
                </Link>

                <div className="flex items-center gap-2 sm:gap-5">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `hidden rounded-full px-3 py-2 text-sm font-semibold transition sm:block ${
                                isActive ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <Link to="/login" className="rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-900">
                        Login
                    </Link>
                    <Link to="/signup" className="rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700">
                        Get started <span className="ml-1">↗</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default LoggedOutNavbar;
