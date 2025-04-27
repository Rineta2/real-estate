import React from 'react'

export default function HomeSkelaton() {
    return (
        <section className='min-h-screen relative overflow-hidden'>
            {/* Background Image skeleton */}
            <div className='absolute w-full h-full inset-0 bg-gradient-to-b from-gray-300 to-gray-100 animate-pulse'>
                {/* White gradient overlay at the bottom */}
                <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-white via-white/70 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative flex flex-col items-center justify-center pt-40 px-4 sm:px-6 md:px-10 h-full">
                <div className="container mx-auto text-center">
                    {/* Title skeleton */}
                    <div
                        className="h-14 md:h-16 lg:h-20 bg-gray-200 rounded-lg mx-auto max-w-[70%] lg:max-w-[60%] mb-4 sm:mb-6 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>

                    {/* Description skeleton */}
                    <div
                        className="h-20 bg-gray-200 rounded-lg mx-auto max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] mb-6 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>
            </div>

            {/* Background blur effect */}
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 opacity-20 blur-[100px]" />
            <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 opacity-20 blur-[100px]" />
        </section>
    );
}