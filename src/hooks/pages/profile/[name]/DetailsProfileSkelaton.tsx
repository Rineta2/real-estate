import React from 'react'

export default function DetailsProfileSkelaton() {
    return (
        <section className="min-h-full relative bg-gray-50">
            <div className="fixed top-6 left-4 z-50">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full py-2 px-6 shadow-lg">
                    <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="w-24 h-5 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>

            <div className="relative">
                <div className="h-64 bg-gradient-to-r from-gray-200 to-gray-300 rounded-b-[3rem] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '30px 30px'
                    }} />
                </div>
                <div className="absolute left-1/2 top-32 transform -translate-x-1/2">
                    <div className="w-40 h-40 rounded-full border-4 border-white shadow-2xl bg-gray-200 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>
            </div>

            <div className="container px-4 py-16">
                <div className="max-w-5xl mx-auto mt-8">
                    <div className="text-center mb-12">
                        <div className="h-8 w-48 bg-gray-200 rounded-lg mx-auto mb-2 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-4 w-64 bg-gray-200 rounded-lg mx-auto relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 mb-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((index) => (
                                <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center">
                                    <div className="h-8 w-24 bg-gray-200 rounded-lg mx-auto mb-2 relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-4 w-20 bg-gray-200 rounded mx-auto relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex gap-4 justify-center items-center mb-12'>
                        {[1, 2].map((index) => (
                            <div key={index} className="w-32 h-12 bg-gray-200 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                    <div className="relative h-56 bg-gray-200">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="p-6">
                                        <div className="h-6 w-3/4 bg-gray-200 rounded mb-3 relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="h-4 w-full bg-gray-200 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}