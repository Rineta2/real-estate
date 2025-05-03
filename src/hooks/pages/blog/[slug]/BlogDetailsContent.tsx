"use client"

import React, { useState, useEffect } from 'react'

import { format } from 'date-fns'

import { FetchBlogDetails } from '@/hooks/pages/blog/[slug]/lib/FetchBlog'

import { FetchRelatedBlog } from "@/hooks/pages/blog/[slug]/lib/FetchBlog"

import { BlogType } from "@/hooks/pages/blog/blog/types/Blog";

import BlogDetailsSkelaton from "@/hooks/pages/blog/[slug]/BlogDetailsSkelaton"

import BlogNotFound from "@/hooks/pages/blog/[slug]/BlogNotFound"

import { IoMdArrowRoundBack } from "react-icons/io";

import Link from 'next/link';

import Image from 'next/image';

import RelatedArticles from './components/RelatedBlog'

export default function BlogDetailsContent({ slug }: { slug: string }) {
    const [blog, setBlog] = React.useState<BlogType[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [relatedArticles, setRelatedArticles] = useState<BlogType[]>([])

    useEffect(() => {
        const unsubscribe = FetchBlogDetails(slug, (article: BlogType[]) => {
            setBlog(article)
            setLoading(false)
        })

        FetchRelatedBlog(slug, (articles: BlogType[]) => {
            setRelatedArticles(articles)
        })

        return () => {
            unsubscribe()
        }
    }, [slug])

    if (loading) return <BlogDetailsSkelaton />;

    const currentBlog = blog[0];

    if (!currentBlog) return <BlogNotFound />;

    const filteredBlog = blog.find(item => item.slug === slug)

    return (
        <section className='min-h-screen pt-20 sm:pt-24 md:pt-28 py-6 sm:py-8 md:py-10'>
            <div className="container px-4 sm:px-6 md:px-8 lg:px-14">
                <div className='flex flex-col'>
                    <div className='flex items-center gap-2 mb-6 sm:mb-8 md:mb-10'>
                        <IoMdArrowRoundBack className="text-lg sm:text-xl" />
                        <Link href={"/blog"} className="text-sm sm:text-md font-bold hover:text-blue-600 transition-colors">Back</Link>
                    </div>

                    <div className='flex flex-col gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10'>
                        <h1 className='text-xl sm:text-2xl md:text-3xl xl:text-5xl font-bold max-w-7xl leading-tight sm:leading-snug md:leading-normal'>{filteredBlog?.title}</h1>
                        <p className='text-sm sm:text-md text-gray-600 max-w-6xl leading-relaxed'>{filteredBlog?.description}</p>
                    </div>

                    <div className='flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10'>
                        <div className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24'>
                            <Image
                                src={filteredBlog?.author?.photoURL || '/default-avatar.jpg'}
                                alt={filteredBlog?.author?.name || 'Author'}
                                width={500}
                                height={500}
                                className="rounded-full object-cover"
                            />
                        </div>

                        <div className='flex flex-col gap-1 sm:gap-2'>
                            <span className="text-sm sm:text-md">Published by {filteredBlog?.author?.name || 'Anonymous'}</span>
                            <p className="text-xs sm:text-sm text-gray-500">{filteredBlog?.createdAt ? format(new Date(filteredBlog.createdAt), 'MMMM dd, yyyy') : ''}</p>
                        </div>
                    </div>

                    <div className='relative w-full aspect-[16/9] sm:aspect-[16/8] md:aspect-[16/7] rounded-lg overflow-hidden mb-8 sm:mb-10'>
                        <Image
                            src={filteredBlog?.thumbnail || '/Blog Image.jpg'}
                            alt={filteredBlog?.title || '/Blog Image.jpg'}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className='prose prose-sm sm:prose-base lg:prose-lg max-w-none 
                                prose-headings:text-gray-900 
                                prose-p:text-gray-700 
                                prose-strong:text-gray-900 
                                prose-a:text-blue-600 hover:prose-a:text-blue-800
                                
                                [&_h3]:text-lg sm:[&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mb-3 sm:[&_h3]:mb-4 [&_h3]:mt-4 sm:[&_h3]:mt-6 md:[&_h3]:mt-8
                                
                                [&_p]:mb-3 sm:[&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-sm sm:[&_p]:text-base md:[&_p]:text-lg
                                [&_p:empty]:hidden
                                
                                [&_ol]:pl-0 [&_ol]:list-none [&_ol]:space-y-2 sm:[&_ol]:space-y-3 [&_ol]:my-3 sm:[&_ol]:my-4
                                [&_ul]:pl-0 [&_ul]:list-none [&_ul]:space-y-2 sm:[&_ul]:space-y-3 [&_ul]:my-3 sm:[&_ul]:my-4
                                
                                [&_li]:relative [&_li]:pl-4 sm:[&_li]:pl-5 md:[&_li]:pl-6 [&_li]:text-gray-700 [&_li]:text-sm sm:[&_li]:text-base
                                
                                [&_li[data-list=bullet]]:before:content-["•"]
                                [&_li[data-list=bullet]]:before:absolute
                                [&_li[data-list=bullet]]:before:left-0
                                [&_li[data-list=bullet]]:before:text-gray-500
                                [&_li[data-list=bullet]]:before:font-bold
                                [&_li[data-list=bullet]]:before:text-base sm:[&_li[data-list=bullet]]:before:text-lg md:[&_li[data-list=bullet]]:before:text-xl
                                
                                [&_li[data-list=ordered]]:before:absolute
                                [&_li[data-list=ordered]]:before:left-0
                                [&_li[data-list=ordered]]:before:text-gray-700
                                [&_li[data-list=ordered]]:before:font-semibold
                                [&_li[data-list=ordered]]:before:counter-reset
                                [&_li[data-list=ordered]]:before:content-[counter(list-item)"."]
                                
                                [&_strong]:text-gray-900 [&_strong]:font-semibold
                                
                                [&_.ql-ui]:hidden
                                
                                [&_a]:text-blue-600 [&_a]:no-underline hover:[&_a]:underline
                                
                                [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:my-4 sm:[&_blockquote]:my-6 [&_blockquote]:italic [&_blockquote]:text-gray-700 [&_blockquote]:text-base sm:[&_blockquote]:text-lg
                                
                                [&_img]:my-4 sm:[&_img]:my-6 [&_img]:rounded-lg sm:[&_img]:rounded-xl [&_img]:shadow-md sm:[&_img]:shadow-lg
                                
                                [&_pre]:bg-gray-100 [&_pre]:p-3 sm:[&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto
                                [&_code]:bg-gray-100 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-xs sm:[&_code]:text-sm
                                [&_pre_code]:bg-transparent [&_pre_code]:p-0
                                
                                [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
                                [&_th]:bg-gray-100 [&_th]:p-2 sm:[&_th]:p-3 [&_th]:text-left [&_th]:border [&_th]:border-gray-300 [&_th]:text-sm sm:[&_th]:text-base
                                [&_td]:p-2 sm:[&_td]:p-3 [&_td]:border [&_td]:border-gray-300 [&_td]:text-sm sm:[&_td]:text-base
                                
                                [&_hr]:my-6 sm:[&_hr]:my-8 [&_hr]:border-gray-200'>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: currentBlog?.content || ''
                            }}
                        />
                    </div>
                </div>

                <RelatedArticles relatedBlog={relatedArticles} currentSlug={slug} />
            </div>
        </section>
    )
}
