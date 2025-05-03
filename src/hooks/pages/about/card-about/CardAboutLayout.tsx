import React from 'react'

import { motion } from 'framer-motion'

import { CardAboutType } from '../types/about'

import Image from 'next/image';

interface CardAboutLayoutProps {
    cardAbout: CardAboutType[];
}

export default function CardAboutLayout({ cardAbout }: CardAboutLayoutProps) {
    return (
        <section className='py-6 sm:py-10 md:py-14 lg:py-20 bg-neutral-50 relative overflow-hidden'>
            <div className='container px-4 sm:px-6 md:px-8 lg:px-14'>
                {/* Section Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-4xl max-w-[700px] mx-auto font-bold text-center mb-6 sm:mb-8 md:mb-16 capitalize"
                >
                    What We Offer is a blend of <span className="text-orange-500">elegance,<br className="block md:hidden" /> innovation, and sustainability</span>
                </motion.h2>
                {/* Card About Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
                    {cardAbout.map((item: CardAboutType, idx: number) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            className={`flex flex-col items-start px-4 sm:px-6 py-6 sm:py-8 min-h-[160px] sm:min-h-[180px] ${idx !== 0 ? 'border-l border-gray-200' : ''
                                } ${idx >= 2 ? 'border-t sm:border-t-0 lg:border-t' : ''
                                }`}
                        >
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
                                className='w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 flex items-center justify-center'
                            >
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    quality={100}
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-contain"
                                />
                            </motion.div>

                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                                className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900"
                            >
                                {item.title}
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 + 0.4 }}
                                className="text-gray-600 text-sm sm:text-base leading-relaxed"
                            >
                                {item.description}
                            </motion.p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
