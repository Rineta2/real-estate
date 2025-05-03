import React from 'react'
import Image from 'next/image'
import { ArtAboutType } from '../types/about'

interface ArtAboutLayoutProps {
    artAbout: ArtAboutType[];
}

export default function ArtAboutLayout({ artAbout }: ArtAboutLayoutProps) {
    return (
        <section className="py-12 bg-neutral-50">
            <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                {/* Art About Section */}
                {artAbout.map((item: ArtAboutType) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Image Section */}
                        <div className="w-full h-full flex justify-center items-center">
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                width={700}
                                height={500}
                                className="w-full h-full max-h-[480px] object-cover rounded-[32px] shadow-md"
                                priority
                            />
                        </div>
                        {/* Content Section */}
                        <div className="flex flex-col justify-center h-full">
                            <h2 className="text-5xl font-bold mb-6 text-gray-900 leading-tight">{item.title}</h2>
                            <p className="text-lg text-gray-500 mb-8 max-w-2xl">{item.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {item.text.map((textItem) => (
                                    <div key={textItem.id} className="mb-2">
                                        <h3 className="font-semibold text-lg mb-2 text-gray-900">{textItem.title}</h3>
                                        <p className="text-gray-500 text-base leading-relaxed">{textItem.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
