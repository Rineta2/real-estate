import React from 'react'

const MessageSkelaton = () => {
    return (
        <section>
            {/* Header Skeleton */}
            <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-primary-50 rounded-md mb-10">
                <div className="space-y-2">
                    <div className="h-8 w-48 bg-gray-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-4 w-4 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-4 w-16 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                </div>
                <div className="h-10 w-32 bg-gray-200 rounded-md relative overflow-hidden">
                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
            </div>

            {/* Filter Skeleton - Hidden by default */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-6 transition-all duration-300 mb-6 hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="space-y-2">
                            <div className="h-5 w-24 bg-gray-200 rounded-md relative overflow-hidden">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="h-10 w-full bg-gray-200 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Message Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-32 bg-gray-200 rounded-md relative overflow-hidden">
                                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-5 w-16 bg-gray-200 rounded-full relative overflow-hidden">
                                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 bg-gray-200 rounded-full relative overflow-hidden">
                                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-4 w-24 bg-gray-200 rounded-md relative overflow-hidden">
                                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-5 w-20 bg-gray-200 rounded-full relative overflow-hidden">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>

                        {/* Message Body */}
                        <div className="mb-4 p-3 bg-gray-50 rounded-xl relative overflow-hidden">
                            <div className="h-4 w-full bg-gray-200 rounded mb-2 relative overflow-hidden">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="h-4 w-3/4 bg-gray-200 rounded mb-2 relative overflow-hidden">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="h-4 w-1/2 bg-gray-200 rounded relative overflow-hidden">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="h-5 w-20 bg-gray-200 rounded-full relative overflow-hidden">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="h-5 w-24 bg-gray-200 rounded-md relative overflow-hidden">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="mt-4 flex items-center justify-end gap-2">
                            <div className="h-8 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default MessageSkelaton