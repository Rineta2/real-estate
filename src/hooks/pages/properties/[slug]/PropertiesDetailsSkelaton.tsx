import React from 'react'

export default function PropertiesDetailsSkelaton() {
    return (
        <section className='min-h-screen pt-20 md:pt-24 py-4 sm:py-6 md:py-8'>
            <div className="container px-3 sm:px-6 md:px-8 lg:px-14">
                <div className='flex flex-col gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8'>
                    {/* Back Button Skeleton */}
                    <div className='flex items-center gap-2 mb-4 sm:mb-6 md:mb-8'>
                        <div className="w-6 h-6 bg-gray-200 rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="w-16 h-4 bg-gray-200 rounded relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>

                    {/* Header Card Skeleton */}
                    <div className='flex flex-row justify-between bg-gray-200 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl mb-6 sm:mb-8'>
                        <div className='flex flex-col gap-3 sm:gap-4 md:gap-5 mb-4 lg:mb-0'>
                            <div className="w-3/4 h-8 sm:h-10 md:h-12 bg-gray-300 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                <div className="w-24 h-4 bg-gray-300 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
                                </div>
                                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                <div className="w-24 h-4 bg-gray-300 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-2 sm:gap-3 md:gap-4 items-start'>
                            <div className="w-24 h-8 bg-gray-300 rounded-full relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
                            </div>
                            <div className="w-32 h-8 bg-gray-300 rounded-full relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10'>
                        {/* Main Content Skeleton */}
                        <article className="flex-1">
                            {/* Image Gallery Skeleton */}
                            <div>
                                <div className="mb-3 sm:mb-4 aspect-[4/3] w-full bg-gray-200 rounded-lg sm:rounded-xl relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="w-24 h-24 bg-gray-200 rounded-lg relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Facilities Skeleton */}
                            <div className="mt-6 sm:mt-8 md:mt-10">
                                <div className='bg-white rounded-lg sm:rounded-xl overflow-hidden'>
                                    <div className="h-8 bg-gray-200 rounded-lg relative overflow-hidden mb-2 p-3 sm:p-4">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="flex flex-wrap sm:flex-nowrap overflow-hidden border border-gray-200">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="flex flex-col items-center justify-center flex-1 py-3 sm:py-4 border-r border-gray-200">
                                                <div className="w-6 h-6 bg-gray-200 rounded-full mb-1 sm:mb-2 relative overflow-hidden">
                                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                                </div>
                                                <div className="w-16 h-4 bg-gray-200 rounded relative overflow-hidden">
                                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Description Skeleton */}
                            <div className="mt-6 sm:mt-8 md:mt-10">
                                <div className='bg-white rounded-lg sm:rounded-xl overflow-hidden p-3 sm:p-4'>
                                    <div className="h-6 bg-gray-200 rounded-lg relative overflow-hidden mb-2">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="space-y-2">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="w-full h-4 bg-gray-200 rounded-lg relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Content Skeleton */}
                            <div className='bg-white rounded-lg sm:rounded-xl overflow-hidden p-3 sm:p-4 mt-6 sm:mt-8 md:mt-10'>
                                <div className="h-6 bg-gray-200 rounded-lg relative overflow-hidden mb-2">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="space-y-2">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="w-full h-4 bg-gray-200 rounded-lg relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>

                        {/* Sidebar Skeleton */}
                        <aside className="sticky top-20 lg:top-24 w-full lg:w-[350px] xl:w-[400px] self-start bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-300">
                            {/* Agent Card Skeleton */}
                            <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 flex flex-col items-center">
                                <div className="flex items-center gap-2 sm:gap-3 w-full mb-2">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="w-24 h-4 bg-gray-200 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="w-20 h-3 bg-gray-200 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form Skeleton */}
                            <div className="flex flex-col gap-3 sm:gap-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-full h-12 bg-gray-200 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                ))}
                                <div className="w-full h-12 bg-gray-300 rounded-lg relative overflow-hidden mt-2">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>

                {/* Related Properties Skeleton */}
                <div className="mt-16 sm:mt-20 md:mt-24">
                    <div className="flex flex-col gap-4">
                        <div className="w-48 h-8 bg-gray-200 rounded-lg relative overflow-hidden mb-6 sm:mb-8">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden">
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
        </section>
    )
}