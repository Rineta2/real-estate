import React from 'react';

import { motion } from 'framer-motion';

import Image from 'next/image';

import Link from 'next/link';

import { PropertyCardProps } from '@/components/ui/properties/types/Properties';

export default function PropertyCard({ item, index }: PropertyCardProps) {
    return (
        <Link href={`/properties/${item.slug}`} className="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 p-3 pt-3 hover:-translate-y-1" rel="noopener noreferrer">
            {/* Badge Popular */}
            <div className="absolute -top-3 left-4 z-10">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg capitalize"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.631c.969 0 1.371 1.24.588 1.81l-5.37 3.905a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.54 1.118l-5.37-3.905a1 1 0 00-1.176 0l-5.37 3.905c-.784.57-1.838-.197-1.539-1.118l2.036-6.29a1 1 0 00-.364-1.118L2.342 11.72c-.783-.57-.38-1.81.588-1.81h6.63a1 1 0 00.951-.69l2.036-6.29z"></path></svg>
                    {item?.type}
                </motion.span>
            </div>

            {/* Property Image */}
            <div className='w-full relative h-72 overflow-hidden rounded-2xl'>
                <Image
                    src={item?.thumbnail}
                    alt={item?.title}
                    fill
                    loading='lazy'
                    quality={100}
                    className='object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110'
                />

                <div>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`absolute bottom-5 right-4 px-3 py-1.5 rounded-full text-sm font-medium ${item?.statusProject === 'Coming Soon'
                            ? 'bg-yellow-100 text-yellow-800'
                            : item?.statusProject === 'Sedang Berjalan'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                    >
                        {item?.statusProject}
                    </motion.span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 relative bg-white flex-1 flex flex-col">
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
                    className='text-xl font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-indigo-600 transition-colors'
                >
                    {item?.title}
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.15 }}
                    className='text-gray-600 text-base line-clamp-2 leading-relaxed'
                >
                    {item.description}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    className='flex items-center gap-2 text-gray-600 mt-6'
                >
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.25 }}
                        className="font-medium"
                    >
                        {item.province}
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                        className="text-gray-400"
                    >
                        •
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.35 }}
                    >
                        {item.city}
                    </motion.span>
                </motion.div>
            </div>

            {/* Main Facilities */}
            <div className="border-t border-gray-100 px-6 py-5 bg-gray-50/80 backdrop-blur-sm rounded-b-2xl flex flex-wrap gap-6 items-center text-gray-600 text-sm">
                {
                    item.facilities.map((facility, idx) => {
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.1 + 0.4 + idx * 0.1 }}
                                className='flex items-center gap-2.5'
                            >
                                {facility.imageUrl && (
                                    <Image
                                        src={facility.imageUrl}
                                        alt='icons'
                                        width={24}
                                        height={24}
                                        className="opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                )}
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: index * 0.1 + 0.45 + idx * 0.1 }}
                                    className="font-medium"
                                >
                                    {facility.title}
                                </motion.span>
                            </motion.div>
                        )
                    })
                }
            </div>
        </Link>
    );
} 