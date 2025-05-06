"use client"
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import { FetchFeatured } from '@/components/ui/Featured/utils/FetchFeatured'

import { FeaturedType } from '@/components/ui/Featured/types/Featured'

import FeaturedSkelaton from '@/components/ui/Featured/FeaturedSkelaton'

import Image from 'next/image'

import { IoIosArrowForward } from "react-icons/io";

export default function Featured() {
    const [featured, setFeatured] = useState<FeaturedType[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedDescription, setSelectedDescription] = useState("");

    useEffect(() => {
        const unsubscribe = FetchFeatured((newFeatured) => {
            setFeatured(newFeatured);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const openModal = (imageUrl: string, title: string = "", description: string = "") => {
        setSelectedImage(imageUrl);
        setSelectedTitle(title);
        setSelectedDescription(description);
        setModalOpen(true);
        // Prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setModalOpen(false);
        // Restore scrolling
        document.body.style.overflow = 'auto';
    };

    if (loading) {
        return <FeaturedSkelaton />;
    }

    const title = featured.length > 0 ? featured[0].title : '';
    const text = featured.length > 0 ? featured[0].text : '';
    const imageUrl = featured.length > 0 ? featured[0].imageUrl : [];
    const count = featured.length > 0 ? featured[0].count : [];
    const description = featured.length > 0 ? featured[0].description : [];

    return (
        <section className='py-16 md:py-20 lg:py-24 bg-neutral-50' id='features'>
            <div className='container mx-auto px-4 md:px-8 lg:px-12'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16'>
                    <motion.div
                        className='col-span-1'
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight'>{title}</h2>
                    </motion.div>

                    <motion.div
                        className='col-span-1 space-y-4 sm:space-y-6 md:space-y-8'
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p className='text-base sm:text-lg text-neutral-600 leading-relaxed'>{text}</p>

                        <div className='flex flex-wrap justify-between gap-4 sm:gap-6 md:gap-8'>
                            {count.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className='flex flex-col gap-1 sm:gap-2'
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                >
                                    <p className='text-3xl font-semibold text-neutral-900'>+{item.number}</p>
                                    <h3 className='text-sm sm:text-base md:text-lg text-neutral-700'>{item.title}</h3>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 md:gap-6'>
                    {imageUrl.length > 0 && (
                        <motion.div
                            className='md:col-span-8 relative rounded-xl sm:rounded-2xl overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] group cursor-pointer'
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7 }}
                            onClick={() => openModal(
                                imageUrl[0].images,
                                description.length > 0 ? description[0].title : title,
                                description.length > 0 ? description[0].description : ''
                            )}
                        >
                            <Image
                                src={imageUrl[0].images}
                                alt={title}
                                fill
                                className='object-cover transition-transform hover:scale-105 duration-700'
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                            />
                            <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300'>
                                <div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3 shadow-md'>
                                    <IoIosArrowForward className='text-neutral-800 text-2xl' />
                                </div>
                            </div>
                            {description.length > 0 && (
                                <motion.div
                                    className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6 md:p-8'
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <h3 className='text-lg sm:text-xl md:text-2xl font-semibold text-white'>{description[0].title}</h3>
                                    <p className='text-sm md:text-base text-white/80 mt-1 sm:mt-2'>{description[0].description}</p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    <div className='md:col-span-4 grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-4 sm:gap-5 md:gap-6 mt-4 md:mt-0'>
                        {imageUrl.length > 1 && (
                            <motion.div
                                className='relative rounded-xl sm:rounded-2xl overflow-hidden h-[140px] sm:h-[180px] md:h-[240px] group cursor-pointer'
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                onClick={() => openModal(
                                    imageUrl[1].images,
                                    description.length > 1 && description[1] ? description[1].title : title,
                                    description.length > 1 && description[1] ? description[1].description : ''
                                )}
                            >
                                <Image
                                    src={imageUrl[1].images}
                                    alt={title}
                                    fill
                                    className='object-cover transition-transform hover:scale-105 duration-700'
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                />
                                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300'>
                                    <div className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2 shadow-md'>
                                        <IoIosArrowForward className='text-neutral-800 text-lg' />
                                    </div>
                                </div>
                                {description.length > 1 && description[1] && (
                                    <motion.div
                                        className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4 md:p-6'
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.4 }}
                                    >
                                        <h3 className='text-base sm:text-lg md:text-xl font-semibold text-white'>{description[1].title}</h3>
                                        <p className='text-xs sm:text-sm text-white/80 mt-1 sm:mt-2 line-clamp-2'>{description[1].description}</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {imageUrl.length > 2 && (
                            <motion.div
                                className='relative rounded-xl sm:rounded-2xl overflow-hidden h-[140px] sm:h-[180px] md:h-[240px] group cursor-pointer'
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                onClick={() => openModal(
                                    imageUrl[2].images,
                                    description.length > 2 && description[2] ? description[2].title : title,
                                    description.length > 2 && description[2] ? description[2].description : ''
                                )}
                            >
                                <Image
                                    src={imageUrl[2].images}
                                    alt={title}
                                    fill
                                    className='object-cover transition-transform hover:scale-105 duration-700'
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                />
                                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300'>
                                    <div className='absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2 shadow-md'>
                                        <IoIosArrowForward className='text-neutral-800 text-lg' />
                                    </div>
                                </div>
                                {description.length > 2 && description[2] && (
                                    <motion.div
                                        className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4 md:p-6'
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.6 }}
                                    >
                                        <h3 className='text-base sm:text-lg md:text-xl font-semibold text-white'>{description[2].title}</h3>
                                        <p className='text-xs sm:text-sm text-white/80 mt-1 sm:mt-2 line-clamp-2'>{description[2].description}</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Image Preview Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden backdrop-blur-sm bg-black/95 flex items-center justify-center p-4 md:p-6" onClick={closeModal}>
                    <div className="relative max-w-7xl w-full mx-auto" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors z-10"
                            onClick={closeModal}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="relative h-[80vh] w-full bg-black/30 rounded-lg overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Image
                                    src={selectedImage}
                                    alt={selectedTitle}
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                />
                            </div>

                            {/* Title and Description */}
                            {(selectedTitle || selectedDescription) && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-8">
                                    <div className="max-w-3xl mx-auto">
                                        {selectedTitle && (
                                            <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{selectedTitle}</h3>
                                        )}
                                        {selectedDescription && (
                                            <p className="text-sm md:text-base text-white/90">{selectedDescription}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Navigation controls */}
                            <div className="absolute top-4 left-0 right-0 flex justify-center gap-2">
                                <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                    <p className="text-white text-sm">Click outside to close</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
