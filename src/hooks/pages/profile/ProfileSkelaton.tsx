import React from 'react'

export default function ProfileSkelaton() {
    return (
        <section className="min-h-full">
            {/* Header Gradient & Profile Image Skeleton */}
            <div className="relative">
                <div className="h-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded-b-3xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '30px 30px'
                    }} />
                </div>
                <div className="absolute left-1/2 top-20 transform -translate-x-1/2">
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-gray-200 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>
            </div>

            {/* Name, Info, Stats Skeleton */}
            <div className="mt-20 flex flex-col items-center">
                <div className="h-8 w-48 bg-gray-200 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
                <div className="h-4 w-64 bg-gray-200 rounded-lg mt-1 relative overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                </div>
                <div className="flex gap-6 mt-6">
                    {[1, 2, 3].map((index) => (
                        <div key={index} className="bg-white rounded-xl shadow p-4 px-8 text-center min-w-[110px] border border-gray-100">
                            <div className="h-6 w-20 bg-gray-200 rounded relative overflow-hidden mx-auto">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="h-3 w-16 bg-gray-200 rounded relative overflow-hidden mx-auto mt-1">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Profile Form Skeleton */}
            <div className="max-w-4xl mx-auto mt-12">
                <div className="bg-white rounded-3xl border border-gray-200 shadow p-8">
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((index) => (
                            <div key={index} className="group p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="h-3 w-24 bg-gray-200 rounded mb-1 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="h-8 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-center mt-6">
                            <div className="w-32 h-12 bg-gray-200 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}