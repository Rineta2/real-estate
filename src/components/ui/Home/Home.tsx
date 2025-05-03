"use client"

import React, { useState, useEffect } from 'react'

import { motion } from 'framer-motion'

import { FetchHome } from '@/components/ui/Home/utils/FetchHome'

import { HomeType } from '@/components/ui/Home/types/Home'

import HomeSkelaton from '@/components/ui/Home/HomeSkelaton';

import Image from 'next/image';

export default function Home() {
    const [home, setHome] = useState<HomeType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchHome((newHome) => {
            setHome(newHome);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <HomeSkelaton />;
    }

    const title = home.length > 0 ? home[0].title : '';
    const image = home.length > 0 ? home[0].imageUrl : '';
    const description = home.length > 0 ? home[0].description : '';

    return (
        <section className='min-h-screen relative overflow-hidden'>
            {/* Background Image with blur */}
            <div className='absolute w-full h-full inset-0'>
                <Image
                    src={image}
                    alt={title}
                    fill={true}
                    priority
                    quality={100}
                    className='w-full h-full'
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
                {/* White gradient overlay at the bottom */}
                <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-white via-white/70 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-10">
                <div className="container mx-auto text-center max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-4 sm:mb-6"
                    >
                        {title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base md:text-lg text-white/90 drop-shadow mb-6"
                    >
                        {description}
                    </motion.p>
                </div>
            </div>
        </section>
    )
}
