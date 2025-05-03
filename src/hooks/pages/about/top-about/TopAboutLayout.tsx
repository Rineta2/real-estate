import React from 'react'

import Image from 'next/image'

import { TopAboutType } from '../types/about'

interface TopAboutLayoutProps {
    topAbout: TopAboutType[];
}


export default function TopAboutLayout({ topAbout }: TopAboutLayoutProps) {
    return (
        <section className='py-8 pt-28 bg-neutral-50 relative'>
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-14'>
                {/* Hero Section */}
                {topAbout[0] && (
                    <div className="relative w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden">
                        <div className="absolute inset-0">
                            <Image
                                src={topAbout[0].imageUrl}
                                alt={topAbout[0].title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug text-center">
                                <span className="text-white">{topAbout[0].title}</span>
                            </h1>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
