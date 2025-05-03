import React from 'react'

const GallerySkelaton = () => {
    return (
        <section className='py-6 sm:py-8 md:py-10'>
            <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-14">
                <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-2 sm:gap-3 md:gap-4 space-y-2 sm:space-y-3 md:space-y-4">
                    {[...Array(27)].map((_, idx) => (
                        <div
                            key={idx}
                            className="mb-2 sm:mb-3 md:mb-4 break-inside-avoid rounded-lg overflow-hidden"
                        >
                            <div className="w-full h-[200px] bg-gray-200 relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='mt-6 sm:mt-8 md:mt-10'>
                    <div className="flex justify-center gap-2">
                        {[...Array(5)].map((_, idx) => (
                            <div
                                key={idx}
                                className="h-10 w-10 bg-gray-200 rounded-lg relative overflow-hidden"
                            >
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GallerySkelaton