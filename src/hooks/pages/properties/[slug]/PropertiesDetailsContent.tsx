"use client"

import React, { useState, useEffect } from 'react'

import { FetchPropertiesDetails, FetchRelatedBlog } from '@/hooks/pages/properties/[slug]/lib/FetchProperties'

import { PropertiesType } from "@/components/ui/properties/types/Properties";

import PropertiesDetailsSkelaton from "@/hooks/pages/properties/[slug]/PropertiesDetailsSkelaton"

import PropertiesNotFound from "@/hooks/pages/properties/[slug]/PropertiesNotFound"

import { IoMdArrowRoundBack } from "react-icons/io";

import Link from 'next/link';

import Image from 'next/image';

import RelatedProperties from '@/hooks/pages/properties/[slug]/components/RelatedProperties'

export default function PropertiesDetailsContent({ slug }: { slug: string }) {
    const [properties, setProperties] = useState<PropertiesType[]>([]);
    const [loading, setLoading] = useState(true);
    const [relatedProperties, setRelatedProperties] = useState<PropertiesType[]>([])
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const unsubscribe = FetchPropertiesDetails(slug, (properties: PropertiesType[]) => {
            setProperties(properties)
            setLoading(false)
        })

        FetchRelatedBlog(slug, (properties: PropertiesType[]) => {
            setRelatedProperties(properties)
        })

        return () => {
            unsubscribe()
        }
    }, [slug])

    if (loading) return <PropertiesDetailsSkelaton />;

    const currentBlog = properties[0];

    if (!currentBlog) return <PropertiesNotFound />;

    const filteredBlog = properties.find(item => item.slug === slug)

    return (
        <section className='min-h-screen pt-20 md:pt-24 py-4 sm:py-6 md:py-8'>
            <div className="container px-3 sm:px-6 md:px-8 lg:px-14">
                <div className='flex flex-col gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8'>
                    <div className='flex items-center gap-2 mb-4 sm:mb-6 md:mb-8'>
                        <IoMdArrowRoundBack className="text-lg sm:text-xl" />
                        <Link href={"/properties"} className="text-sm sm:text-base font-bold hover:text-blue-600 transition-colors">Back</Link>
                    </div>

                    <div className='flex flex-row justify-between bg-gradient-to-r from-primary to-primary/90 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 shadow-lg'>
                        <div className='flex flex-col gap-3 sm:gap-4 md:gap-5 mb-4 lg:mb-0'>
                            <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold max-w-4xl leading-tight sm:leading-snug md:leading-normal capitalize tracking-tight'>{filteredBlog?.title}</h1>
                            <div className='flex flex-wrap items-center gap-2 sm:gap-3 text-white/90'>
                                <span className='flex items-center gap-1.5 sm:gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    {filteredBlog?.province}
                                </span>
                                <span className='w-1 h-1 bg-white/50 rounded-full'></span>
                                <span className='flex items-center gap-1.5 sm:gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    {filteredBlog?.city}
                                </span>
                            </div>
                        </div>

                        <div className='flex flex-wrap gap-2 sm:gap-3 md:gap-4 items-start'>
                            <span className='bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full flex items-center gap-1.5 sm:gap-2 shadow-lg capitalize border border-white/20 hover:bg-white/20 transition-colors'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                                {filteredBlog?.type}
                            </span>
                            <span className={`px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 shadow-lg backdrop-blur-sm border border-white/20 ${filteredBlog?.statusProject === 'Coming Soon'
                                ? 'bg-yellow-500/20 text-yellow-200 hover:bg-yellow-500/30'
                                : filteredBlog?.statusProject === 'Sedang Berjalan'
                                    ? 'bg-blue-500/20 text-blue-200 hover:bg-blue-500/30'
                                    : 'bg-green-500/20 text-green-200 hover:bg-green-500/30'
                                } transition-colors`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                {filteredBlog?.statusProject}
                            </span>
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10'>
                        <article className="flex-1">
                            {filteredBlog?.images && filteredBlog.images.length > 0 && (
                                <div>
                                    {/* Gambar utama */}
                                    <div className="mb-3 sm:mb-4 aspect-[4/3] w-full relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                                        <Image
                                            src={filteredBlog.images[activeImage]}
                                            alt={`image-${activeImage}`}
                                            quality={100}
                                            loading="lazy"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 700px"
                                        />
                                    </div>
                                    {/* Thumbnail */}
                                    <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2">
                                        {filteredBlog.images.map((item, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveImage(idx)}
                                                className={`border-2 rounded-lg p-0.5 sm:p-1 transition-all ${activeImage === idx
                                                    ? 'border-blue-500 ring-2 ring-blue-300'
                                                    : 'border-transparent opacity-70 hover:opacity-100'
                                                    }`}
                                                style={{ outline: 'none' }}
                                            >
                                                <div className="relative aspect-square w-24 h-24">
                                                    <Image
                                                        src={item}
                                                        alt={`thumb-${idx}`}
                                                        fill
                                                        className="object-cover rounded-md"
                                                        sizes="(max-width: 640px) 48px, 64px"
                                                    />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 sm:mt-8 md:mt-10">
                                <div className='bg-white rounded-lg sm:rounded-xl overflow-hidden'>
                                    <h2 className="font-semibold text-base sm:text-lg mb-2 p-3 sm:p-4">Facilitas</h2>
                                    <div className="flex flex-wrap sm:flex-nowrap overflow-hidden border border-gray-200">
                                        {filteredBlog?.details?.map((detail, idx) => (
                                            <div
                                                key={detail.id || idx}
                                                className={`flex flex-col items-center justify-center flex-1 py-3 sm:py-4 ${idx !== filteredBlog.details.length - 1 ? 'border-r border-gray-200' : ''}`}
                                            >
                                                <Image
                                                    src={detail.imageUrl}
                                                    alt={detail.title}
                                                    width={24}
                                                    height={24}
                                                    className="mb-1 sm:mb-2"
                                                />
                                                <span className="font-medium text-sm sm:text-base">{detail.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 sm:mt-8 md:mt-10">
                                    <div className='bg-white rounded-lg sm:rounded-xl overflow-hidden p-3 sm:p-4'>
                                        <h2 className="font-semibold text-base sm:text-lg mb-2">Description</h2>
                                        <p className="text-sm sm:text-base">{filteredBlog?.description}</p>
                                    </div>
                                </div>

                                <div className='bg-white rounded-lg sm:rounded-xl overflow-hidden p-3 sm:p-4 mt-6 sm:mt-8 md:mt-10'>
                                    <h2 className="font-semibold text-base sm:text-lg mb-2">Content</h2>
                                    <div className='prose prose-sm sm:prose-base lg:prose-lg max-w-none 
                                prose-headings:text-gray-900 
                                prose-p:text-gray-700 
                                prose-strong:text-gray-900 
                                prose-a:text-blue-600 hover:prose-a:text-blue-800
                                
                                [&_h3]:text-base sm:[&_h3]:text-lg md:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2 sm:[&_h3]:mb-3 [&_h3]:mt-3 sm:[&_h3]:mt-4 md:[&_h3]:mt-6
                                
                                [&_p]:mb-2 sm:[&_p]:mb-3 [&_p]:leading-relaxed [&_p]:text-sm sm:[&_p]:text-base
                                [&_p:empty]:hidden
                                
                                [&_ol]:pl-0 [&_ol]:list-none [&_ol]:space-y-1.5 sm:[&_ol]:space-y-2 [&_ol]:my-2 sm:[&_ol]:my-3
                                [&_ul]:pl-0 [&_ul]:list-none [&_ul]:space-y-1.5 sm:[&_ul]:space-y-2 [&_ul]:my-2 sm:[&_ul]:my-3
                                
                                [&_li]:relative [&_li]:pl-3 sm:[&_li]:pl-4 md:[&_li]:pl-5 [&_li]:text-gray-700 [&_li]:text-sm sm:[&_li]:text-base
                                
                                [&_li[data-list=bullet]]:before:content-["•"]
                                [&_li[data-list=bullet]]:before:absolute
                                [&_li[data-list=bullet]]:before:left-0
                                [&_li[data-list=bullet]]:before:text-gray-500
                                [&_li[data-list=bullet]]:before:font-bold
                                [&_li[data-list=bullet]]:before:text-sm sm:[&_li[data-list=bullet]]:before:text-base md:[&_li[data-list=bullet]]:before:text-lg
                                
                                [&_li[data-list=ordered]]:before:absolute
                                [&_li[data-list=ordered]]:before:left-0
                                [&_li[data-list=ordered]]:before:text-gray-700
                                [&_li[data-list=ordered]]:before:font-semibold
                                [&_li[data-list=ordered]]:before:counter-reset
                                [&_li[data-list=ordered]]:before:content-[counter(list-item)"."]
                                
                                [&_strong]:text-gray-900 [&_strong]:font-semibold
                                
                                [&_.ql-ui]:hidden
                                
                                [&_a]:text-blue-600 [&_a]:no-underline hover:[&_a]:underline
                                
                                [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-3 sm:[&_blockquote]:pl-4 [&_blockquote]:my-3 sm:[&_blockquote]:my-4 [&_blockquote]:italic [&_blockquote]:text-gray-700 [&_blockquote]:text-sm sm:[&_blockquote]:text-base
                                
                                [&_img]:my-3 sm:[&_img]:my-4 [&_img]:rounded-lg [&_img]:shadow-md
                                
                                [&_pre]:bg-gray-100 [&_pre]:p-2 sm:[&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto
                                [&_code]:bg-gray-100 [&_code]:px-1.5 sm:[&_code]:px-2 [&_code]:py-0.5 sm:[&_code]:py-1 [&_code]:rounded [&_code]:text-xs sm:[&_code]:text-sm
                                [&_pre_code]:bg-transparent [&_pre_code]:p-0
                                
                                [&_table]:w-full [&_table]:border-collapse [&_table]:my-3 sm:[&_table]:my-4
                                [&_th]:bg-gray-100 [&_th]:p-1.5 sm:[&_th]:p-2 [&_th]:text-left [&_th]:border [&_th]:border-gray-300 [&_th]:text-xs sm:[&_th]:text-sm
                                [&_td]:p-1.5 sm:[&_td]:p-2 [&_td]:border [&_td]:border-gray-300 [&_td]:text-xs sm:[&_td]:text-sm
                                
                                [&_hr]:my-4 sm:[&_hr]:my-6 [&_hr]:border-gray-200
                                
                                [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-lg [&_iframe]:my-4 [&_iframe]:shadow-md'>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: filteredBlog?.content || ''
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </article>

                        <aside className="sticky top-20 lg:top-24 w-full lg:w-[350px] xl:w-[400px] self-start bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-300">
                            {/* Agent Card & Contact Form */}
                            <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 flex flex-col items-center">
                                <div className="flex items-center gap-2 sm:gap-3 w-full mb-2">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 relative">
                                        <Image
                                            src={filteredBlog?.author?.photoURL || '/default-avatar.jpg'}
                                            alt={filteredBlog?.author?.name || 'Agent'}
                                            width={48}
                                            height={48}
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-900 text-sm sm:text-base">{filteredBlog?.author?.name || 'Agent'}</span>
                                        <Link href="#" className="text-xs sm:text-sm text-yellow-600 font-medium hover:underline">View profile</Link>
                                    </div>
                                </div>
                            </div>

                            <form className="flex flex-col gap-3 sm:gap-4">
                                <div>
                                    <input type="text" value={filteredBlog?.title || ''} readOnly className="block w-full rounded-lg border border-gray-200 bg-gray-100 text-gray-500 p-3 sm:p-4 text-sm sm:text-base cursor-not-allowed" />
                                </div>
                                <div>
                                    <input type="text" placeholder="Name" className="block w-full rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-yellow-500 p-3 sm:p-4 text-sm sm:text-base" />
                                </div>
                                <div>
                                    <input type="text" placeholder="Phone" className="block w-full rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-yellow-500 p-3 sm:p-4 text-sm sm:text-base" />
                                </div>
                                <div>
                                    <input type="email" placeholder="Email" className="block w-full rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-yellow-500 p-3 sm:p-4 text-sm sm:text-base" />
                                </div>
                                <div>
                                    <textarea placeholder="Hello, I am interested in..." rows={3} className="block w-full rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-yellow-500 p-3 sm:p-4 text-sm sm:text-base resize-none" />
                                </div>
                                <button type="submit" className="mt-2 bg-black text-white font-semibold text-base sm:text-lg rounded-lg sm:rounded-xl py-3 sm:py-4 w-full flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors">
                                    Learn more <span className="text-yellow-400 text-lg sm:text-xl">→</span>
                                </button>
                            </form>
                        </aside>
                    </div>
                </div>

                <RelatedProperties relatedProperties={relatedProperties} currentSlug={slug} />
            </div>
        </section>
    )
}
