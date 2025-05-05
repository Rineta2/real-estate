import React from 'react'

export default function PropertiesSkelaton() {
    return (
        <section className='min-h-screen pt-28 py-10 bg-gradient-to-b from-gray-50 to-white'>
            <div className='container px-4 sm:px-6 md:px-8 lg:px-14'>
                {/* Featured Property Skeleton */}
                <div className="mb-8 sm:mb-16">
                    <div className='relative bg-white rounded-3xl shadow-sm overflow-hidden'>
                        <div className='grid grid-cols-1 lg:grid-cols-2'>
                            <div className="relative h-[300px] lg:h-[450px] bg-gray-200 animate-pulse" />
                            <div className='flex flex-col p-8 md:p-10 bg-white'>
                                <div className='mb-5'>
                                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                                </div>
                                <div className="flex-1">
                                    <div className="space-y-3">
                                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6" />
                                    <div className="grid grid-cols-2 gap-4">
                                        {[...Array(4)].map((_, idx) => (
                                            <div key={idx} className='flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl'>
                                                <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
                                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters Skeleton */}
                <div className='flex flex-col sm:flex-row mb-8 sm:mb-16 justify-between items-start sm:items-center gap-4 p-4 bg-primary rounded-xl'>
                    <div className='w-full sm:w-auto flex flex-wrap items-center gap-2 sm:gap-4'>
                        <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                    <div className='w-full sm:w-auto flex flex-wrap items-center gap-2 sm:gap-4'>
                        <div className="h-10 w-40 bg-gray-200 rounded-full animate-pulse" />
                        <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse" />
                        <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                </div>

                {/* Properties Grid Skeleton */}
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8' style={{ rowGap: 40 }}>
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <div className="relative h-48 bg-gray-200 animate-pulse" />
                            <div className="p-4 space-y-4">
                                <div className="flex gap-2">
                                    <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
                                    <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
                                </div>
                                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}