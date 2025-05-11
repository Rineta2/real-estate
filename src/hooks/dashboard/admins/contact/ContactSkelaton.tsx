import React from 'react'

const ContactSkelaton = () => {
    return (
        <section>
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 px-3 sm:px-6 border-b border-gray-200 bg-primary-50 rounded-md mb-6">
                <div className="mb-3 sm:mb-0">
                    <div className="h-8 w-32 bg-gray-200 rounded-lg relative overflow-hidden mb-2">
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

            {/* Contact Cards Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden shadow-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                            <div className="space-y-2">
                                <div className="h-5 w-40 bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="h-4 w-32 bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                            <div className="h-6 w-6 bg-gray-200 rounded-full relative overflow-hidden">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="h-4 w-3/4 bg-gray-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <div className="h-8 w-20 bg-gray-200 rounded-md relative overflow-hidden">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="h-8 w-20 bg-gray-200 rounded-md relative overflow-hidden">
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ContactSkelaton