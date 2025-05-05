"use client"

import React, { useState, useEffect } from 'react'

import { FetchProperties } from '@/components/ui/properties/utils/FetchProperties'

import { PropertiesType } from '@/components/ui/properties/types/Properties'

import PropertiesSkelaton from '@/components/ui/properties/PropertiesSkelaton'

import Image from 'next/image'

export default function Properties() {
    const [properties, setProperties] = useState<PropertiesType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchProperties((newProperties) => {
            setProperties(newProperties);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <PropertiesSkelaton />;
    }

    return (
        <section className='min-h-screen relative py-20 sm:py-24 md:py-28 lg:py-32 bg-gradient-to-b from-gray-50 to-white'>
            <div className="container px-4 sm:px-6 md:px-8 lg:px-12 mx-auto max-w-7xl">
                <div className='flex items-center justify-center flex-col gap-8 mb-20'>
                    <h3 className='text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight'>Based on your location</h3>
                    <p className='text-gray-600 text-center max-w-2xl text-lg sm:text-xl'>Some of our picked properties near your location.</p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {
                        properties.map((item, index) => {
                            return (
                                <div key={index} className="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 p-3 pt-3 hover:-translate-y-1">
                                    {/* Badge Popular */}
                                    <div className="absolute -top-3 left-4 z-10">
                                        <span className="bg-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg capitalize">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.631c.969 0 1.371 1.24.588 1.81l-5.37 3.905a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.54 1.118l-5.37-3.905a1 1 0 00-1.176 0l-5.37 3.905c-.784.57-1.838-.197-1.539-1.118l2.036-6.29a1 1 0 00-.364-1.118L2.342 11.72c-.783-.57-.38-1.81.588-1.81h6.63a1 1 0 00.951-.69l2.036-6.29z"></path></svg>
                                            {item?.type}
                                        </span>
                                    </div>

                                    {/* Gambar Properti */}
                                    <div className='w-full relative h-64 sm:h-72 overflow-hidden rounded-2xl'>
                                        <Image
                                            src={item?.thumbnail}
                                            alt={item?.title}
                                            fill
                                            loading='lazy'
                                            quality={100}
                                            className='object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110'
                                        />
                                    </div>
                                    {/* Konten */}
                                    <div className="p-6 relative bg-white flex-1 flex flex-col">
                                        {/* Judul */}
                                        <h3 className='text-xl font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-indigo-600 transition-colors'>{item?.title}</h3>
                                        <p className='text-gray-600 text-base line-clamp-2 leading-relaxed'>{item.description}</p>
                                        <div className='flex items-center gap-2 text-gray-600 mt-6'>
                                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                            <span className="font-medium">{item.province}</span>
                                            <span className="text-gray-400">•</span>
                                            <span>{item.city}</span>
                                        </div>
                                    </div>

                                    {/* Fasilitas utama */}
                                    <div className="border-t border-gray-100 px-6 py-5 bg-gray-50/80 backdrop-blur-sm rounded-b-2xl flex flex-wrap gap-6 items-center text-gray-600 text-sm">
                                        {
                                            item.facilities.map((item, index) => {
                                                return (
                                                    <div key={index} className='flex items-center gap-2.5'>
                                                        {item.imageUrl && (
                                                            <Image
                                                                src={item.imageUrl}
                                                                alt='icons'
                                                                width={24}
                                                                height={24}
                                                                className="opacity-80 group-hover:opacity-100 transition-opacity"
                                                            />
                                                        )}
                                                        <span className="font-medium">{item.title}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}
