import React from "react";

function FormError({error}) {

    return(
    <div role="alert" className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold">
            !
        </div>

        <p>{error}</p>
    </div>
    )
}

export default FormError;
