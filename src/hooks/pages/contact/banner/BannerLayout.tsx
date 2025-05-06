import React from 'react'

import Image from 'next/image'

import { motion } from 'framer-motion'

import { BannerContactType } from '@/hooks/pages/contact/types/contact'

interface BannerLayoutProps {
    bannerContact: BannerContactType[];
}

export default function BannerLayout({ bannerContact }: BannerLayoutProps) {
    return (
        <section className="py-8 sm:py-12 relative min-h-[50vh]">
            <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                {/* Art About Section */}
                {bannerContact.map((item: BannerContactType, index) => (
                    <div key={index}>
                        {/* Image Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 z-0"
                        >
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                className="w-full h-full object-cover shadow-md"
                                priority
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/50" />
                        </motion.div>
                        {/* Content Section */}
                        <div className="relative z-10 flex flex-col justify-center items-center text-center pt-44">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white leading-tight"
                            >
                                {item.title}
                            </motion.h2>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
