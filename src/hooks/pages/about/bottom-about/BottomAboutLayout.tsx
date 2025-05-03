import React from 'react'
import { motion } from 'framer-motion'
import { AboutType } from '../types/about'
import Image from 'next/image';

interface BottomAboutLayoutProps {
    about: AboutType[];
}

export default function BottomAboutLayout({ about }: BottomAboutLayoutProps) {
    return (
        <section className='py-6 sm:py-10 md:py-14 lg:py-20 bg-neutral-50'>
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-14'>
                {/* About Section */}
                {about.map((item, index) => (
                    <div key={index} className="col-span-2">
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-stretch'>
                            {/* Fitur */}
                            <div className='flex flex-col space-y-3 md:space-y-4'>
                                <div>
                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                        className='text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 md:mb-3 text-gray-900'
                                    >
                                        {item.title}
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className='text-base sm:text-lg text-gray-500 font-medium'
                                    >
                                        {item.description}
                                    </motion.p>
                                </div>

                                {item.text.map((textItem, textIndex) => (
                                    <div key={textIndex} className="mb-4 md:mb-6 flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-white rounded-2xl shadow-sm hover:bg-gray-50 transition-all duration-300">
                                        {/* Feature Icon */}
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.3 + (textIndex * 0.1) }}
                                            className="flex-shrink-0"
                                        >
                                            {textIndex === 0 && (
                                                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-amber-100 text-amber-600">
                                                    <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                </div>
                                            )}
                                            {textIndex === 1 && (
                                                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
                                                    <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                                                    </svg>
                                                </div>
                                            )}
                                            {textIndex === 2 && (
                                                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                                                    <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                            {textIndex === 3 && (
                                                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                    <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                </div>
                                            )}
                                        </motion.div>
                                        <div>
                                            <motion.h3
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: 0.4 + (textIndex * 0.1) }}
                                                className="text-lg md:text-xl font-bold mb-1 text-gray-900"
                                            >
                                                {textItem.title}
                                            </motion.h3>
                                            <motion.p
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: 0.5 + (textIndex * 0.1) }}
                                                className="text-sm md:text-base text-gray-600"
                                            >
                                                {textItem.description}
                                            </motion.p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Gambar */}
                            <div className="h-full w-full flex items-stretch justify-center md:justify-end">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="relative aspect-[4/3] w-full max-w-2xl"
                                >
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        fill
                                        className="rounded-3xl object-cover shadow-md"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
