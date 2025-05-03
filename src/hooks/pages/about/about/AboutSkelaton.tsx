import React from 'react'

const AboutSkelaton = () => {
    return (
        <div className="min-h-screen">
            {/* Top About Skeleton (Hero Section) */}
            <section className='py-4 sm:py-6 md:py-8 pt-20 sm:pt-24 md:pt-28 bg-neutral-50 relative'>
                <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-14'>
                    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden bg-gray-200">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>
            </section>

            {/* Art About Skeleton */}
            <section className='py-6 sm:py-10 md:py-14 lg:py-20 bg-neutral-50'>
                <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-14'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                        <div className="space-y-4">
                            <div className="h-8 w-3/4 bg-gray-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="space-y-2">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="h-[300px] bg-gray-200 rounded-xl relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Card About Skeleton */}
            <section className='py-6 sm:py-10 md:py-14 lg:py-20 bg-neutral-50'>
                <div className='container px-4 sm:px-6 md:px-8 lg:px-14'>
                    <div className="h-10 w-3/4 mx-auto bg-gray-200 rounded-lg relative overflow-hidden mb-8">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="p-6 min-h-[180px] border-l border-gray-200">
                                <div className="h-16 w-16 bg-gray-200 rounded-lg relative overflow-hidden mb-4">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="h-6 w-3/4 bg-gray-200 rounded-lg relative overflow-hidden mb-2">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom About Skeleton */}
            <section className='py-6 sm:py-10 md:py-14 lg:py-20 bg-neutral-50'>
                <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-14'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                        <div className="space-y-6">
                            <div>
                                <div className="h-10 w-3/4 bg-gray-200 rounded-lg relative overflow-hidden mb-4">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="h-6 w-full bg-gray-200 rounded-lg relative overflow-hidden mb-4">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="p-4 bg-white rounded-2xl shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 bg-gray-200 rounded-full relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-5 w-3/4 bg-gray-200 rounded-lg relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                            </div>
                                            <div className="h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="h-[400px] bg-gray-200 rounded-3xl relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutSkelaton