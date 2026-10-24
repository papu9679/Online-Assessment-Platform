import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import AuthContext from "../context/AuthContext.js";

function AdminRoute() {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-[#f8f7f3]">
                <div className="rounded-3xl bg-white px-8 py-7 text-center shadow-xl shadow-slate-900/10">
                    <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-orange-100 border-t-orange-600" />
                    <p className="mt-4 text-sm font-bold text-slate-700">Verifying admin access...</p>
                </div>
            </div>
        );
    }

    return user?.role === "ADMIN" ? <Outlet /> : <Navigate to="/unauthorized" replace />;
}

export default AdminRoute;
