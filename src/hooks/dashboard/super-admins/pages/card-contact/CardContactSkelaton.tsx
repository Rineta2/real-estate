import React from 'react'

const FaqsSkelaton = () => {
    return (
        <div className="min-h-screen">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-primary-50 rounded-md mb-10">
                <div className="space-y-2">
                    <div className="h-8 w-48 bg-gray-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="flex items-center gap-2">
                                <div className="h-4 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                {item < 4 && (
                                    <div className="h-4 w-4 bg-gray-200 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="h-10 w-32 bg-gray-200 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
            </div>

            {/* FAQ Content Skeleton */}
            <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-[var(--background)] rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                        <div className="p-6 md:p-8 flex flex-col justify-between w-full">
                            <div className="space-y-6">
                                {/* Title Skeleton */}
                                <div className="h-8 w-3/4 bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>

                                {/* FAQ Items Skeleton */}
                                <div className="space-y-4">
                                    {[1, 2, 3].map((faq) => (
                                        <div key={faq} className="bg-[var(--background)] rounded-xl overflow-hidden border border-gray-100">
                                            <div className="p-4 flex justify-between items-center">
                                                <div className="h-5 w-2/3 bg-gray-200 rounded-lg relative overflow-hidden">
                                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                                </div>
                                                <div className="h-5 w-5 bg-gray-200 rounded-lg relative overflow-hidden">
                                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions Skeleton */}
                            <div className="flex gap-3 pt-6 mt-6 border-t border-[var(--border-color)]">
                                <div className="h-10 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="h-10 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FaqsSkelaton