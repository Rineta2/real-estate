import React from 'react'

export default function PropertiesSkelaton() {
    return (
        <section className='relative py-20 sm:py-24 bg-neutral-50'>
            <div className="container px-4 sm:px-6 md:px-8 lg:px-12">
                {/* Header Skeleton */}
                <div className='flex items-center justify-center flex-col gap-8 mb-20'>
                    <div className="h-14 bg-gray-200 rounded-lg w-[70%] max-w-[500px] relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded-lg w-[90%] max-w-[600px] relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>

                {/* Property Cards Grid Skeleton */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="group relative bg-white rounded-3xl shadow-sm border border-gray-100 p-3 pt-3">
                            {/* Badge Skeleton */}
                            <div className="absolute -top-3 left-4 z-10">
                                <div className="h-8 w-24 bg-gray-200 rounded-full relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>

                            {/* Image Skeleton */}
                            <div className='w-full h-72 overflow-hidden rounded-2xl bg-gray-200 relative'>
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>

                            {/* Content Skeleton */}
                            <div className="p-6 relative bg-white flex-1 flex flex-col">
                                <div className="h-7 bg-gray-200 rounded-lg w-3/4 mb-3 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="h-16 bg-gray-200 rounded-lg w-full mb-6 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="h-6 bg-gray-200 rounded-lg w-1/2 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>

                            {/* Facilities Skeleton */}
                            <div className="border-t border-gray-100 px-6 py-5 bg-gray-50/80 rounded-b-2xl flex flex-wrap gap-6">
                                {[...Array(3)].map((_, idx) => (
                                    <div key={idx} className="flex items-center gap-2.5">
                                        <div className="h-6 w-6 bg-gray-200 rounded-full relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="h-5 bg-gray-200 rounded-lg w-20 relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}