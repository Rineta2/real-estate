import React from 'react'

import Link from 'next/link'

import Image from 'next/image'

import { format } from 'date-fns'

import { RelatedBlogProps } from "@/hooks/pages/blog/blog/types/Blog"

export default function RelatedArticles({ relatedBlog, currentSlug }: RelatedBlogProps) {
    return (
        <div className='mt-16 sm:mt-20 md:mt-24'>
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Related Articles</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {relatedBlog.filter(item => item.slug !== currentSlug).map((item) => (
                        <Link href={`/blog/${item.slug}`} key={item.id} className="group">
                            <div className="bg-background rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300">
                                <figure className="relative aspect-video overflow-hidden">
                                    <Image
                                        src={item.thumbnail}
                                        alt={item.title}
                                        width={500}
                                        height={500}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                    />
                                </figure>

                                <div className="py-5 px-2">
                                    <div className='flex justify-between items-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3'>
                                        <time>{item.createdAt ? format(new Date(item.createdAt), 'dd MMM yyyy') : ''}</time>
                                        <span className="px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">{item.category}</span>
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">{item.title}</h3>

                                    <p className="text-sm sm:text-base text-gray-600 line-clamp-2">{item.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
} 