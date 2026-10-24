import React, { useContext } from "react";
import AuthContext from "../context/AuthContext.js";
import { Navigate, Outlet } from "react-router";

function CheckUser() {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-[#f8f7f3]">
                <div className="rounded-3xl border border-white bg-white/80 px-8 py-7 text-center shadow-xl shadow-slate-900/10">
                    <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
                    <p className="mt-4 text-sm font-bold text-slate-700">Checking your session...</p>
                </div>
            </div>
        );
    }

    return user ? <Navigate to="/" replace /> : <Outlet />;

}

export default CheckUser