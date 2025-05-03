import React from 'react'

import { CardAboutType } from '../types/about'

import Image from 'next/image';

interface CardAboutLayoutProps {
    cardAbout: CardAboutType[];
}

export default function CardAboutLayout({ cardAbout }: CardAboutLayoutProps) {
    return (
        <section className='py-8 sm:py-12 md:py-16 lg:py-20 bg-neutral-50 relative overflow-hidden'>
            <div className='container px-4 sm:px-6 md:px-8 lg:px-14'>
                {/* Section Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                    What We Offer is a blend of <span className="text-orange-500">elegance,<br className="block md:hidden" /> innovation, and sustainability</span>
                </h2>
                {/* Card About Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 bg-white rounded-2xl shadow-lg overflow-hidden">
                    {cardAbout.map((item: CardAboutType, idx: number) => (
                        <div
                            key={item.id}
                            className={`flex flex-col items-start px-6 py-8 min-h-[180px] ${idx !== 0 ? 'border-l border-gray-200' : ''}`}
                        >
                            {/* Icon */}
                            <div className='w-20 h-20 mb-4 flex items-center justify-center'>
                                <Image src={item.imageUrl} alt={item.title} quality={100} width={500} height={500} />
                            </div>

                            <h3 className="text-2xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
