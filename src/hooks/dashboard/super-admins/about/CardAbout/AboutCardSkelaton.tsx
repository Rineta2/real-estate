import React from 'react'

const AboutSkelaton = () => {
    return (
        <div className="min-h-screen">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center py-6 px-8 border-b border-gray-200 bg-white shadow-sm mb-12">
                <div>
                    <div className="h-8 w-48 bg-gray-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="h-4 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-4 w-4 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-4 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                </div>
                <div className="h-12 w-40 bg-gray-200 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
            </div>

            {/* Content Grid Skeleton */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4'>
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className='w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100'
                    >
                        <div className="flex flex-col h-full">
                            {/* Image Section Skeleton */}
                            <div className="relative w-full h-[300px] lg:h-[350px] overflow-hidden bg-gray-200">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>

                            {/* Content Section Skeleton */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="space-y-4">
                                    <div className="h-7 w-3/4 bg-gray-200 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="h-4 w-5/6 bg-gray-200 rounded-lg relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="h-4 w-4/6 bg-gray-200 rounded-lg relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons Skeleton */}
                                <div className="flex gap-3 pt-6 mt-auto">
                                    <div className="flex-1 h-10 bg-gray-200 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="flex-1 h-10 bg-gray-200 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AboutSkelaton