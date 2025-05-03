import React from 'react'

import { AboutType } from '../types/about'

import Image from 'next/image';

interface BottomAboutLayoutProps {
    about: AboutType[];
}

export default function BottomAboutLayout({ about }: BottomAboutLayoutProps) {
    return (
        <section className='py-8 sm:py-12 md:py-16 lg:py-20 bg-neutral-50'>
            <div className='container mx-auto px-4 sm:px-6 md:px-8 lg:px-14'>
                {/* About Section */}
                {about.map((item, index) => (
                    <div key={index} className="col-span-2">
                        <h2 className="text-2xl font-semibold mb-3">{item.title}</h2>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <Image
                            src={item.imageUrl}
                            alt={item.title}
                            width={800}
                            height={400}
                            className="w-full h-auto rounded-lg mb-4"
                        />
                        {item.text.map((textItem) => (
                            <div key={textItem.id} className="mb-4">
                                <h3 className="text-xl font-medium">{textItem.title}</h3>
                                <p className="text-gray-600">{textItem.description}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}
