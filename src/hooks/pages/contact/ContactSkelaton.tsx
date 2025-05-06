import React from 'react'

const ContactSkelaton = () => {
    return (
        <>
            {/* Banner Section Skeleton */}
            <section className="py-8 sm:py-12 relative min-h-[50vh]">
                <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-gray-200">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>
            </section>

            {/* Contact Form and Info Section Skeleton */}
            <section className='py-10 bg-neutral-50'>
                <div className='container px-4 sm:px-6 md:px-8 lg:px-14'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'>
                        {/* Contact Form Skeleton */}
                        <div className='bg-white rounded-2xl p-6 sm:p-8 border border-gray-300 shadow-lg flex flex-col h-fit'>
                            <div className="space-y-4">
                                <div className="h-8 w-3/4 bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="h-6 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>

                                {/* Form Fields Skeleton */}
                                <div className="grid grid-cols-1 gap-4">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="h-12 bg-gray-200 rounded-lg relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Message Textarea Skeleton */}
                                <div className="h-32 bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>

                                {/* Terms Checkbox Skeleton */}
                                <div className="flex items-start space-x-4">
                                    <div className="h-5 w-5 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-5 w-3/4 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>

                                {/* Submit Button Skeleton */}
                                <div className="h-12 w-full sm:w-40 bg-gray-200 rounded-xl relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info Section Skeleton */}
                        <div className='bg-white rounded-2xl p-6 sm:p-8 border border-gray-300 shadow-lg flex flex-col h-fit'>
                            <div className="space-y-6">
                                {/* Title and Description */}
                                <div className="space-y-3">
                                    <div className="h-10 w-3/4 bg-gray-200 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-6 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>

                                {/* Contact Cards */}
                                <div className="space-y-4">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="p-4 rounded-xl bg-gray-50">
                                            <div className="h-6 w-3/4 bg-gray-200 rounded-lg relative overflow-hidden mb-2">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                            </div>
                                            <div className="h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Google Maps Skeleton */}
                                <div className="space-y-4">
                                    <div className="h-6 w-32 bg-gray-200 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="relative w-full rounded-xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                                        <div className="absolute inset-0 bg-gray-200">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactSkelaton