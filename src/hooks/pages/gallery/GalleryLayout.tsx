"use client"

import React, { useState, useEffect } from 'react'

import { GalleryType } from "@/hooks/pages/gallery/types/Gallery"

import { FetchGallery } from "@/hooks/pages/gallery/utils/FetchGallery"

import GallerySkelaton from "@/hooks/pages/gallery/GallerySkelaton"

import Image from 'next/image'

import { Pagination } from '@/base/helper/Pagination'

const ITEMS_PER_PAGE = 27;

export default function GalleryLayout() {
    const [gallery, setGallery] = useState<GalleryType[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedImage, setSelectedImage] = useState<GalleryType | null>(null);
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const unsubscribe = FetchGallery((newGallery) => {
            setGallery(newGallery);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Add effect to handle body scroll
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedImage]);

    const handlePageClick = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    const handleImageError = (imageUrl: string) => {
        setImageErrors(prev => ({ ...prev, [imageUrl]: true }));
    };

    const totalPages = Math.ceil(gallery.length / ITEMS_PER_PAGE);
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = gallery.slice(startIndex, endIndex);

    if (loading) {
        return <GallerySkelaton />;
    }

    return (
        <section className='py-6 sm:py-8 md:py-10'>
            <div className="container mx-auto px-3 sm:px-4 md:px-8 lg:px-14">
                <div className="columns-1 xs:columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-2 sm:gap-3 md:gap-4 space-y-2 sm:space-y-3 md:space-y-4">
                    {
                        currentItems.map((item, idx) => (
                            <div
                                key={idx}
                                className="mb-2 sm:mb-3 md:mb-4 break-inside-avoid rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                                onClick={() => setSelectedImage(item)}
                            >
                                {imageErrors[item.imageUrl] ? (
                                    <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">Image not available</span>
                                    </div>
                                ) : (
                                    <Image
                                        src={item.imageUrl}
                                        alt='image'
                                        quality={75}
                                        width={400}
                                        height={300}
                                        loading='lazy'
                                        className="w-full h-auto object-cover"
                                        onError={() => handleImageError(item.imageUrl)}
                                        unoptimized={true}
                                    />
                                )}
                            </div>
                        ))
                    }
                </div>

                <div className='mt-6 sm:mt-8 md:mt-10'>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageClick}
                    />
                </div>
            </div>

            {/* Preview Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50"
                >
                    <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center">
                        <button
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white text-xl sm:text-2xl z-10 bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-all"
                            onClick={() => setSelectedImage(null)}
                        >
                            ×
                        </button>
                        {/* Main Preview */}
                        <div className="flex-1 flex items-center justify-center h-[70vh] md:h-full w-full max-w-[100vw] max-h-[90vh] relative bg-black">
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
                        <div className="w-full md:w-80 lg:w-96 h-32 sm:h-40 md:h-full overflow-y-auto bg-black bg-opacity-50 p-2 flex-shrink-0">
                            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-2 gap-1 sm:gap-2">
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
                                        <div className="relative w-full aspect-square">
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
                                                    sizes="(max-width: 640px) 25vw, (max-width: 768px) 16vw, 12vw"
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
            )}
        </section>
    )
}
