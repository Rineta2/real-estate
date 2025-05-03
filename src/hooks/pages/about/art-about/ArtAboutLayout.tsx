import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArtAboutType } from '../types/about'

interface ArtAboutLayoutProps {
    artAbout: ArtAboutType[];
}

export default function ArtAboutLayout({ artAbout }: ArtAboutLayoutProps) {
    return (
        <section className="py-8 sm:py-12 bg-neutral-50">
            <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                {/* Art About Section */}
                {artAbout.map((item: ArtAboutType, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 last:mb-0">
                        {/* Image Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full h-full flex justify-center items-center order-2 md:order-1"
                        >
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                width={700}
                                height={500}
                                className="w-full h-full max-h-[400px] md:max-h-[480px] object-cover rounded-2xl md:rounded-[32px] shadow-md"
                                priority
                            />
                        </motion.div>
                        {/* Content Section */}
                        <div className="flex flex-col justify-center h-full order-1 md:order-2">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-900 leading-tight"
                            >
                                {item.title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-base sm:text-lg text-gray-500 mb-6 md:mb-8 max-w-2xl"
                            >
                                {item.description}
                            </motion.p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                                {item.text.map((textItem, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.3 + (index * 0.1) }}
                                        className="mb-2"
                                    >
                                        <h3 className="font-semibold text-base sm:text-lg mb-2 text-gray-900">{textItem.title}</h3>
                                        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">{textItem.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
