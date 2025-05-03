import React from 'react'

export default function BlogDetailsSkelaton() {
    return (
        <section className='min-h-screen pt-20 sm:pt-24 md:pt-28 py-6 sm:py-8 md:py-10'>
            <div className="container px-4 sm:px-6 md:px-8 lg:px-14">
                <div className='flex flex-col'>
                    {/* Back Button Skeleton */}
                    <div className='flex items-center gap-2 mb-6 sm:mb-8 md:mb-10'>
                        <div className="w-6 h-6 bg-gray-200 rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="w-16 h-4 bg-gray-200 rounded relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>

                    {/* Title and Description Skeleton */}
                    <div className='flex flex-col gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10'>
                        <div className="w-3/4 h-8 sm:h-10 md:h-12 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="w-1/2 h-4 sm:h-5 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>

                    {/* Author Info Skeleton */}
                    <div className='flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10'>
                        <div className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-200 rounded-full relative overflow-hidden'>
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className='flex flex-col gap-1 sm:gap-2'>
                            <div className="w-32 h-4 bg-gray-200 rounded relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="w-24 h-3 bg-gray-200 rounded relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    </div>

                    {/* Thumbnail Skeleton */}
                    <div className='relative w-full aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/7] rounded-lg overflow-hidden mb-8 sm:mb-10 bg-gray-200'>
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>

                    {/* Content Skeleton */}
                    <div className='space-y-4'>
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-full h-4 bg-gray-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        ))}
                    </div>

                    {/* Related Articles Section Skeleton */}
                    <div className='mt-16 sm:mt-20 md:mt-24'>
                        <div className="flex flex-col gap-4">
                            <div className="w-48 h-8 bg-gray-200 rounded-lg relative overflow-hidden mb-6 sm:mb-8">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="bg-background rounded-xl sm:rounded-2xl overflow-hidden">
                                        <div className="relative aspect-video bg-gray-200">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="py-5 px-2 space-y-3">
                                            <div className="flex justify-between items-center">
                                                <div className="w-20 h-3 bg-gray-200 rounded relative overflow-hidden">
                                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                                </div>
                                                <div className="w-16 h-3 bg-gray-200 rounded-full relative overflow-hidden">
                                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                                </div>
                                            </div>
                                            <div className="w-full h-4 bg-gray-200 rounded-lg relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                            </div>
                                            <div className="w-3/4 h-3 bg-gray-200 rounded-lg relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}