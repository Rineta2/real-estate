import React from 'react'

export default function FeaturedSkelaton() {
    return (
        <section className='py-16 md:py-20 lg:py-24 bg-neutral-50'>
            <div className='container mx-auto px-4 md:px-8 lg:px-14'>
                {/* Header */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16'>
                    {/* Title */}
                    <div className='col-span-1'>
                        <div className='h-10 md:h-12 lg:h-14 bg-gray-200 rounded-lg w-[80%] animate-pulse'></div>
                    </div>

                    {/* Description and stats */}
                    <div className='col-span-1 space-y-4 sm:space-y-6 md:space-y-8'>
                        <div className='h-20 bg-gray-200 rounded-lg w-full animate-pulse'></div>

                        <div className='flex flex-wrap justify-between gap-4 sm:gap-6 md:gap-8'>
                            {[1, 2, 3].map((item) => (
                                <div key={item} className='flex flex-col gap-1 sm:gap-2'>
                                    <div className='h-8 bg-gray-200 rounded-lg w-16 animate-pulse'></div>
                                    <div className='h-5 bg-gray-200 rounded-lg w-20 animate-pulse'></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Images grid */}
                <div className='grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 md:gap-6'>
                    {/* Main large image */}
                    <div className='md:col-span-8 relative rounded-xl sm:rounded-2xl overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] bg-gray-200 animate-pulse'>
                        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-300 to-transparent p-4 sm:p-6 md:p-8 h-[30%]'>
                            <div className='h-6 bg-gray-300 rounded-lg w-[60%] mb-2 animate-pulse'></div>
                            <div className='h-4 bg-gray-300 rounded-lg w-[80%] animate-pulse'></div>
                        </div>
                    </div>

                    {/* Two smaller images */}
                    <div className='md:col-span-4 grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-4 sm:gap-5 md:gap-6 mt-4 md:mt-0'>
                        {[1, 2].map((item) => (
                            <div
                                key={item}
                                className='relative rounded-xl sm:rounded-2xl overflow-hidden h-[140px] sm:h-[180px] md:h-[240px] bg-gray-200 animate-pulse'
                            >
                                <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-300 to-transparent p-3 sm:p-4 md:p-6 h-[40%]'>
                                    <div className='h-5 bg-gray-300 rounded-lg w-[70%] mb-2 animate-pulse'></div>
                                    <div className='h-3 bg-gray-300 rounded-lg w-[90%] animate-pulse'></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}