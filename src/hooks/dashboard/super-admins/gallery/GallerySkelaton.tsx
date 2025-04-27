import React from 'react'

const GallerySkelaton = () => {
    return (
        <div className="min-h-screen">
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

            {/* Gallery Grid Skeleton */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {[...Array(8)].map((_, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden shadow-lg">
                        <div className="w-full h-48 bg-gray-200 relative overflow-hidden">
                            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-end gap-2">
                                <div className="h-6 w-6 bg-gray-200 rounded-full relative overflow-hidden">
                                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="h-6 w-6 bg-gray-200 rounded-full relative overflow-hidden">
                                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="mt-6 flex justify-center">
                <div className="h-10 w-64 bg-gray-200 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
            </div>
        </div>
    )
}

export default GallerySkelaton