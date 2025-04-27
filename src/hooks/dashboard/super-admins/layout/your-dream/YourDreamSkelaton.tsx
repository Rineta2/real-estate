import React from 'react'

const AboutSkelaton = () => {
    return (
        <div className="min-h-screen">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 bg-background border border-[var(--border-color)] p-6 sm:p-8 rounded-2xl shadow-sm">
                <div className="space-y-2">
                    <div className="h-8 w-48 bg-gray-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="h-4 w-64 bg-gray-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>
                <div className="h-12 w-40 bg-gray-200 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-6">
                {[1].map((item) => (
                    <div key={item} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                        {/* Image Section Skeleton */}
                        <div className="relative w-full h-[300px] overflow-hidden">
                            <div className="flex gap-2 h-full">
                                {[1, 2, 3].map((img) => (
                                    <div key={img} className="min-w-[300px] h-full bg-gray-200 relative overflow-hidden">
                                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Content Section Skeleton */}
                        <div className="p-6 space-y-6">
                            <div className="h-7 w-3/4 bg-gray-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="space-y-3">
                                {[1, 2, 3].map((desc) => (
                                    <div key={desc} className="h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                ))}
                            </div>

                            {/* Count Section Skeleton */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                                {[1, 2, 3, 4].map((count) => (
                                    <div key={count} className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-100">
                                        <div className="h-4 w-24 bg-gray-200 rounded-lg relative overflow-hidden mb-2">
                                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="h-8 w-16 bg-gray-200 rounded-lg relative overflow-hidden">
                                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions Skeleton */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                            <div className="h-10 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="h-10 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AboutSkelaton