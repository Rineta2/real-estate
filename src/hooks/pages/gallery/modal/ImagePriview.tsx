import React from 'react'
import Image from 'next/image'
import { GalleryType } from '../types/Gallery'

interface ImagePreviewProps {
    selectedImage: GalleryType | null;
    setSelectedImage: (image: GalleryType | null) => void;
    gallery: GalleryType[];
    imageErrors: Record<string, boolean>;
    handleImageError: (url: string) => void;
}

export default function ImagePreview({
    selectedImage,
    setSelectedImage,
    gallery,
    imageErrors,
    handleImageError
}: ImagePreviewProps) {
    if (!selectedImage) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 overflow-hidden">
            <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center p-2 sm:p-4">
                <button
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white text-xl sm:text-2xl z-10 bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-all"
                    onClick={() => setSelectedImage(null)}
                >
                    ×
                </button>
                {/* Main Preview */}
                <div className="relative w-full h-[60vh] md:h-full flex-1 flex items-center justify-center overflow-hidden rounded-lg">
                    {imageErrors[selectedImage.imageUrl] ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-white">Image not available</span>
                        </div>
                    ) : (
                        <Image
                            src={selectedImage.imageUrl}
                            alt="Preview"
                            fill
                            className="object-contain"
                            priority
                            onError={() => handleImageError(selectedImage.imageUrl)}
                            unoptimized={true}
                        />
                    )}
                </div>
                {/* Right Side List */}
                <div className="w-full md:w-1/4 mt-2 md:mt-0 md:ml-4 p-2 bg-black/50 md:bg-transparent rounded-lg overflow-y-auto max-h-[30vh] md:max-h-full">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-2 gap-2">
                        {gallery.map((item, idx) => (
                            <div
                                key={idx}
                                className={`cursor-pointer rounded-lg overflow-hidden transition-all ${selectedImage.id === item.id
                                    ? 'ring-2 ring-blue-500 scale-105'
                                    : 'hover:scale-105'
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImage(item);
                                }}
                            >
                                <div className="relative aspect-square">
                                    {imageErrors[item.imageUrl] ? (
                                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                            <span className="text-gray-400 text-xs">N/A</span>
                                        </div>
                                    ) : (
                                        <Image
                                            src={item.imageUrl}
                                            alt="thumbnail"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 12vw"
                                            onError={() => handleImageError(item.imageUrl)}
                                            unoptimized={true}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
