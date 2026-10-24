import React from "react";

function FormSuccess({ success }) {

    return (
        <div role="status" className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold">
                ✓
            </div>

            <p>{success}</p>
        </div>
    )
}

export default FormSuccess;