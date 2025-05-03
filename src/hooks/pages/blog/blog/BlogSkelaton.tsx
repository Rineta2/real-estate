import React from 'react'

export default function BlogSkelaton() {
    return (
        <section className='min-h-screen py-10 pt-28'>
            <div className="container px-4 sm:px-6 md:px-8 lg:px-14">
                {/* Top Blog Skeleton */}
                <div className="mb-8 md:mb-12">
                    <div className="bg-gray-100 rounded-3xl p-4 md:p-10">
                        <div className="w-full h-[300px] md:h-[400px] bg-gray-200 rounded-2xl relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="mt-4 space-y-4">
                            <div className="w-3/4 h-8 bg-gray-200 rounded-lg mx-auto relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="w-1/2 h-6 bg-gray-200 rounded-lg mx-auto relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Filter Skeleton */}
                <div className='flex justify-center items-center gap-4 mb-8 md:mb-12'>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-24 h-10 bg-gray-200 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Blog Grid Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                            <div className="w-full h-[300px] bg-gray-200 relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="w-24 h-6 bg-gray-200 rounded-full relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="w-full h-6 bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="w-full h-16 bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="w-24 h-4 bg-gray-200 rounded relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                            </div>
                                            <div className="w-16 h-3 bg-gray-200 rounded relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-20 h-4 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Skeleton */}
                <div className="mt-10 md:mt-14 flex justify-center">
                    <div className="flex gap-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-10 h-10 bg-gray-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}