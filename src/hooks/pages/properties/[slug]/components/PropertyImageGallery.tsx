import React, { useState } from 'react';

import Image from 'next/image';

interface PropertyImageGalleryProps {
    images: string[];
}

export default function PropertyImageGallery({ images }: PropertyImageGalleryProps) {
    const [activeImage, setActiveImage] = useState(0);

    if (!images || images.length === 0) return null;

    return (
        <div>
            {/* Main Image */}
            <div className="mb-3 sm:mb-4 aspect-[4/3] w-full relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                <Image
                    src={images[activeImage]}
                    alt={`image-${activeImage}`}
                    quality={100}
                    loading="lazy"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 700px"
                />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2">
                {images.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`border-2 rounded-lg p-0.5 sm:p-1 transition-all ${activeImage === idx
                            ? 'border-blue-500 ring-2 ring-blue-300'
                            : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                        style={{ outline: 'none' }}
                    >
                        <div className="relative aspect-square w-24 h-24">
                            <Image
                                src={item}
                                alt={`thumb-${idx}`}
                                fill
                                className="object-cover rounded-md"
                                sizes="(max-width: 640px) 48px, 64px"
                            />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
} 