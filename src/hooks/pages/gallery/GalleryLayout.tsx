"use client"

import React, { useState, useEffect } from 'react'

import { motion } from 'framer-motion'

import { GalleryType } from "@/hooks/pages/gallery/types/Gallery"

import { FetchGallery } from "@/hooks/pages/gallery/utils/FetchGallery"

import GallerySkelaton from "@/hooks/pages/gallery/GallerySkelaton"

import Image from 'next/image'

import { Pagination } from '@/base/helper/Pagination'

import dynamic from 'next/dynamic'

const ImagePreview = dynamic(() => import('./modal/ImagePriview'), { ssr: false })

import { useBodyScroll } from '@/base/helper/useBodyScroll'

const ITEMS_PER_PAGE = 27;

export default function GalleryLayout() {
    const [gallery, setGallery] = useState<GalleryType[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedImage, setSelectedImage] = useState<GalleryType | null>(null);
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    useBodyScroll(!!selectedImage);

    useEffect(() => {
        const unsubscribe = FetchGallery((newGallery) => {
            setGallery(newGallery);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

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
                <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-2 sm:gap-3 md:gap-4 space-y-2 sm:space-y-3 md:space-y-4">
                    {
                        currentItems.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
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
                            </motion.div>
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

            <ImagePreview
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                gallery={gallery}
                imageErrors={imageErrors}
                handleImageError={handleImageError}
            />
        </section>
    )
}
