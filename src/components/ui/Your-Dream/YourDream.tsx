"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import { YourDreamType } from "@/components/ui/Your-Dream/types/YourDream";

import YourDreamSkelaton from '@/components/ui/Your-Dream/YourDreamSkelaton';

import { FetchYourDream } from "@/components/ui/Your-Dream/utils/FetchYourDream"

import Image from 'next/image';

export default function YourDream() {
    const [yourDream, setYourDream] = useState<YourDreamType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchYourDream((newYourDream) => {
            setYourDream(newYourDream);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <YourDreamSkelaton />;
    }

    const title = yourDream.length > 0 ? yourDream[0].title : '';
    const description = yourDream.length > 0 ? yourDream[0].description : '';
    const imageUrl = yourDream.length > 0 ? yourDream[0].imageUrl : [];

    return (
        <section className='min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 bg-neutral-50'>
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-14">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
                    {/* Kiri: Judul & Deskripsi */}
                    <motion.div
                        className='flex flex-col space-y-4 md:space-y-6'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className='flex flex-col'>
                            <motion.h1
                                className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-semibold mb-3 md:mb-4 max-w-full md:max-w-[80%]"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                {title}
                            </motion.h1>
                            <motion.p
                                className="text-sm sm:text-base text-gray-600 mb-4 md:mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                {description}
                            </motion.p>
                        </div>

                        {imageUrl.length > 2 && (
                            <motion.div
                                className='relative rounded-xl sm:rounded-2xl overflow-hidden h-[250px] sm:h-[300px] md:h-[400px] lg:h-[700px] group cursor-pointer hidden sm:block'
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <Image
                                    src={imageUrl[2].images}
                                    alt={title}
                                    fill
                                    className='object-cover transition-transform hover:scale-105 duration-700'
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                                />
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.div
                        className='grid grid-cols-2 md:grid-cols-1 h-auto md:h-[600px] lg:h-[700px] gap-4'
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {imageUrl.length > 0 && (
                            <motion.div
                                className="relative rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <Image
                                    src={imageUrl[0].images}
                                    alt={title}
                                    fill
                                    className="object-cover transition-transform hover:scale-105 duration-700"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                                />
                            </motion.div>
                        )}
                        {imageUrl.length > 1 && (
                            <motion.div
                                className="relative rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <Image
                                    src={imageUrl[1].images}
                                    alt={title}
                                    fill
                                    className="object-cover transition-transform hover:scale-105 duration-700"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                                />
                            </motion.div>
                        )}

                        {imageUrl.length > 2 && (
                            <motion.div
                                className="relative rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer block sm:hidden h-[250px] sm:h-[300px]"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            >
                                <Image
                                    src={imageUrl[2].images}
                                    alt={title}
                                    fill
                                    className="object-cover transition-transform hover:scale-105 duration-700"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                                />
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

