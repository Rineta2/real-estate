import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TopAboutType } from '../about/types/about'

interface TopAboutLayoutProps {
    topAbout: TopAboutType[];
}

export default function TopAboutLayout({ topAbout }: TopAboutLayoutProps) {
    return (
        <section className='py-4 sm:py-6 md:py-8 pt-20 sm:pt-24 md:pt-28 bg-neutral-50 relative'>
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-14'>
                {/* Hero Section */}
                {topAbout[0] && (
                    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden">
                        <div className="absolute inset-0">
                            <Image
                                src={topAbout[0].imageUrl}
                                alt={topAbout[0].title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug text-center"
                            >
                                <span className="text-white">{topAbout[0].title}</span>
                            </motion.h1>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
