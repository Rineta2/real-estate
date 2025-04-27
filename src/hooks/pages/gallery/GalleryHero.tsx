import React from 'react'

import Image from 'next/image'

import GalleryImage from "@/base/assets/gallery.jpg"

export default function GalleryHero() {
    return (
        <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src={GalleryImage}
                    alt="Gallery Hero"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
            </div>

            <div className="relative h-full flex items-center justify-center text-center px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Our Gallery
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                        Explore our collection of stunning properties and discover your dream home
                    </p>
                </div>
            </div>
        </div>
    )
}
