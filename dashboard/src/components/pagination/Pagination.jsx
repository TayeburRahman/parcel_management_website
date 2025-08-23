
"use client";
import React from "react";

export default function Pagination({ page, setPage, pageCount, pageSize, filtered }) {
    const pages = [];
    const range = 2;

    for (
        let i = Math.max(page - range, 1);
        i <= Math.min(page + range, pageCount);
        i++
    ) {
        pages.push(i);
    }

    const showEllipsisBefore = pages[0] > 2;
    const showEllipsisAfter = pages[pages.length - 1] < pageCount - 1;

    return (

        <div className="flex items-center text-xs justify-evenly mt-2">
            <span className="text-primary">
                Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, filtered.length)} of {filtered.length}
            </span>
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer text-xs"
                    >
                        &lt; Prev
                    </button>

                    {showEllipsisBefore && (
                        <>
                            <button
                                onClick={() => setPage(1)}
                                className="w-6 h-6 rounded-full text-center text-sm cursor-pointer"
                            >
                                1
                            </button>
                            <span>...</span>
                        </>
                    )}

                    {pages.map((p) => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`w-4 h-4 rounded-full text-center text-xs cursor-pointer ${p === page
                                ? "bg-primary text-white"
                                : ""
                                }`}
                        >
                            {p}
                        </button>
                    ))}

                    {showEllipsisAfter && (
                        <>
                            <span>...</span>
                            <button
                                onClick={() => setPage(pageCount)}
                                className="w-7 h-7 rounded-full text-center text-xs cursor-pointer"
                            >
                                {pageCount}
                            </button>
                        </>
                    )}

                    <button
                        disabled={page === pageCount}
                        onClick={() => setPage(page + 1)}
                        className="px-3 py-1 text-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Next &gt;
                    </button>
                </div>
            </div>
        </div>

    );
}
