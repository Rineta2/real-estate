import React from 'react'

export default function SuperAdminsSkelaton() {
    return (
        <section className='overflow-hidden'>
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Dashboard Cards Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="p-4 sm:p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                            <div className="h-6 w-24 bg-gray-200 rounded-lg relative overflow-hidden mb-4">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="h-8 w-16 bg-gray-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Contact and Messages Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Recent Contact Skeleton */}
                    <div className="p-4 sm:p-6 bg-white rounded-2xl border border-gray-200 shadow-sm h-[420px] flex flex-col">
                        <div className="h-6 w-32 bg-gray-200 rounded-lg relative overflow-hidden mb-4 sm:mb-6">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="space-y-4 sm:space-y-6 flex-1">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-start gap-3 sm:gap-4 p-3 rounded-lg">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-4 w-32 bg-gray-200 rounded-lg relative overflow-hidden mb-2">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden mb-2">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="h-4 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                            </div>
                                            <div className="h-4 w-16 bg-gray-200 rounded-lg relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Messages Skeleton */}
                    <div className="p-4 sm:p-6 bg-white rounded-2xl border border-gray-200 shadow-sm h-[420px] flex flex-col">
                        <div className="h-6 w-32 bg-gray-200 rounded-lg relative overflow-hidden mb-4 sm:mb-6">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="space-y-4 sm:space-y-6 flex-1">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-start gap-3 sm:gap-4 p-3 rounded-lg">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-4 w-32 bg-gray-200 rounded-lg relative overflow-hidden mb-2">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden mb-2">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="h-4 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                            </div>
                                            <div className="h-4 w-16 bg-gray-200 rounded-lg relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Chart Skeleton */}
                <div className="p-4 sm:p-6 bg-white rounded-2xl border border-gray-200 shadow-sm h-[420px] flex flex-col">
                    <div className="h-6 w-32 bg-gray-200 rounded-lg relative overflow-hidden mb-4 sm:mb-6">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>

                {/* Properties List Skeleton */}
                <div className="p-4 sm:p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div className="h-6 w-32 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-10 w-32 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                <div className="relative h-48 w-full bg-gray-200">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="p-4">
                                    <div className="h-6 w-3/4 bg-gray-200 rounded-lg relative overflow-hidden mb-2">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-4 w-1/2 bg-gray-200 rounded-lg relative overflow-hidden mb-2">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-4 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}