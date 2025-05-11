import React from 'react'

import Link from 'next/link'

import { IoMdArrowRoundBack } from 'react-icons/io'

import Image from 'next/image'

import profile from "@/base/assets/profile.jpg"

export default function ProfileNotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 p-4 relative overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(45deg,primary-300_25%,transparent_25%,transparent_75%,primary-300_75%,primary-300),linear-gradient(45deg,primary-300_25%,transparent_25%,transparent_75%,primary-300_75%,primary-300)] bg-[length:20px_20px] bg-[position:0_0,10px_10px] animate-[shimmer_20s_linear_infinite]"></div>

            {/* Content Container */}
            <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-12 lg:gap-16 p-6 lg:p-12 relative z-10">
                {/* Left Column - Image with Glass Effect */}
                <div className="flex-1 w-full max-w-md">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative">
                            <div className="relative w-64 h-64 mx-auto ring-4 ring-white/50 rounded-full overflow-hidden backdrop-blur-sm bg-white/30">
                                <Image
                                    src={profile}
                                    alt="Profile Not Found"
                                    className="rounded-full object-cover transform group-hover:scale-110 transition duration-500"
                                    fill
                                    sizes="(max-width: 256px) 100vw, 256px"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Text Content */}
                <div className="flex-1 flex flex-col items-center lg:items-start space-y-6">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-4">
                            Profile Tidak Ditemukan
                        </h1>
                        <p className="text-primary-700 text-lg max-w-md">
                            Maaf, profil yang Anda cari tidak dapat ditemukan. Silakan periksa kembali URL atau kembali ke halaman utama.
                        </p>
                    </div>

                    <Link
                        href="/"
                        className="group relative inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary-200/50 overflow-hidden"
                    >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative flex items-center gap-3">
                            <IoMdArrowRoundBack className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
                            <span>Kembali ke Home</span>
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
