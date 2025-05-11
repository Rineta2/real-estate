import React, { useEffect } from 'react';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { ViewModalProps } from '@/hooks/dashboard/admins/blog/types/Blog';

export const ViewModal: React.FC<ViewModalProps> = ({ blog, onClose }) => {
    useEffect(() => {
        const modal = document.getElementById('view_modal') as HTMLDialogElement | null;
        if (blog) {
            modal?.showModal();
        } else {
            modal?.close();
        }
    }, [blog]);

    if (!blog) return null;

    return (
        <dialog id="view_modal" className="modal">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9999] overflow-y-auto scrollbar-thin scrollbar-track-gray-800/40 scrollbar-thumb-gray-600/40"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="container mx-auto min-h-screen p-4 md:p-6 lg:p-8 flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative w-full max-w-7xl bg-gradient-to-b from-gray-900/80 to-black/80 rounded-2xl shadow-2xl border border-gray-800/50 backdrop-blur-xl">
                        {/* URL Bar */}
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800/50 overflow-x-auto sm:overflow-x-hidden scrollbar-none">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <div className="flex-1 flex items-center gap-2">
                                <div className="flex-1 flex items-center px-4 py-1.5 bg-gray-900/50 rounded-lg border border-gray-700/50">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                        </svg>
                                        <span className="opacity-75 truncate">https://your-blog.com/articles/{blog.slug}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-800/50 transition-colors"
                                aria-label="Close modal"
                            >
                                <svg
                                    className="w-5 h-5 text-gray-400 hover:text-white transition-colors"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-800/40 scrollbar-thumb-gray-600/40">
                            {/* Hero Image */}
                            <div className="relative aspect-video w-full overflow-hidden">
                                <Image
                                    src={blog.thumbnail}
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                    width={500}
                                    height={500}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                            </div>

                            {/* Content Section with Glass Morphism */}
                            <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-6 bg-gradient-to-b from-gray-900/60 to-black/60 backdrop-blur-md">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    {/* Author Info with Glass Effect */}
                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/20 border border-gray-700/30 backdrop-blur-md">
                                        <Image
                                            src={blog.author.photoURL}
                                            alt={blog.author.name}
                                            className="w-14 h-14 rounded-full ring-2 ring-indigo-500/30"
                                            width={500}
                                            height={500}
                                        />
                                        <div>
                                            <h3 className="text-lg text-white font-medium">{blog.author.name}</h3>
                                            <p className="text-sm text-gray-400 capitalize">{blog.author.role}</p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-4 p-4 rounded-xl bg-gray-800/20 border border-gray-700/30">
                                        <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                                            Description
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed">
                                            {blog.description}
                                        </p>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-4 p-6 rounded-xl bg-gray-800/20 border border-gray-700/30">
                                        <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                                            Content
                                        </h3>
                                        <div
                                            className='prose prose-sm sm:prose-base lg:prose-lg max-w-none 
                                             prose-headings:text-white 
                                             prose-p:text-white 
                                             text-white
                                             prose-strong:text-white 
                                             prose-a:text-blue-400 hover:prose-a:text-blue-300
                                             
                                             [&_h3]:text-lg sm:[&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mb-3 sm:[&_h3]:mb-4 [&_h3]:mt-4 sm:[&_h3]:mt-6 md:[&_h3]:mt-8
                                             
                                             [&_p]:mb-3 sm:[&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-sm sm:[&_p]:text-base md:[&_p]:text-lg
                                             [&_p:empty]:hidden
                                             
                                             [&_ol]:pl-0 [&_ol]:list-none [&_ol]:space-y-2 sm:[&_ol]:space-y-3 [&_ol]:my-3 sm:[&_ol]:my-4
                                             [&_ul]:pl-0 [&_ul]:list-none [&_ul]:space-y-2 sm:[&_ul]:space-y-3 [&_ul]:my-3 sm:[&_ul]:my-4
                                             
                                             [&_li]:relative [&_li]:pl-4 sm:[&_li]:pl-5 md:[&_li]:pl-6 [&_li]:text-white [&_li]:text-sm sm:[&_li]:text-base
                                             
                                             [&_li[data-list=bullet]]:before:content-["•"]
                                             [&_li[data-list=bullet]]:before:absolute
                                             [&_li[data-list=bullet]]:before:left-0
                                             [&_li[data-list=bullet]]:before:text-white
                                             [&_li[data-list=bullet]]:before:font-bold
                                             [&_li[data-list=bullet]]:before:text-base sm:[&_li[data-list=bullet]]:before:text-lg md:[&_li[data-list=bullet]]:before:text-xl
                                             
                                             [&_li[data-list=ordered]]:before:absolute
                                             [&_li[data-list=ordered]]:before:left-0
                                             [&_li[data-list=ordered]]:before:text-white
                                             [&_li[data-list=ordered]]:before:font-semibold
                                             [&_li[data-list=ordered]]:before:counter-reset
                                             [&_li[data-list=ordered]]:before:content-[counter(list-item)"."]
                                             
                                             [&_strong]:text-white [&_strong]:font-semibold
                                             
                                             [&_.ql-ui]:hidden
                                             
                                             [&_a]:text-blue-400 [&_a]:no-underline hover:[&_a]:underline
                                             
                                             [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:my-4 sm:[&_blockquote]:my-6 [&_blockquote]:italic [&_blockquote]:text-white [&_blockquote]:text-base sm:[&_blockquote]:text-lg
                                             
                                             [&_img]:my-4 sm:[&_img]:my-6 [&_img]:rounded-lg sm:[&_img]:rounded-xl [&_img]:shadow-md sm:[&_img]:shadow-lg
                                             
                                             [&_pre]:bg-gray-100 [&_pre]:p-3 sm:[&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto
                                             [&_code]:bg-gray-100 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-xs sm:[&_code]:text-sm
                                             [&_pre_code]:bg-transparent [&_pre_code]:p-0
                                             
                                             [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
                                             [&_th]:bg-gray-100 [&_th]:p-2 sm:[&_th]:p-3 [&_th]:text-left [&_th]:border [&_th]:border-gray-300 [&_th]:text-sm sm:[&_th]:text-base
                                             [&_td]:p-2 sm:[&_td]:p-3 [&_td]:border [&_td]:border-gray-300 [&_td]:text-sm sm:[&_td]:text-base
                                             
                                             [&_hr]:my-6 sm:[&_hr]:my-8 [&_hr]:border-gray-200'
                                            dangerouslySetInnerHTML={{ __html: blog.content }}
                                        />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    {/* Status and Category */}
                                    <div className="p-4 rounded-xl bg-gray-800/20 border border-gray-700/30">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                                                Status
                                            </h3>
                                            <span className={`px-4 py-1 rounded-full text-sm font-medium ${blog.status === 'published'
                                                ? 'bg-green-500/10 text-green-400'
                                                : 'bg-yellow-500/10 text-yellow-400'
                                                }`}>
                                                {blog.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-4">
                                            <span className="text-gray-400">Category:</span>
                                            <span className="text-gray-300">{blog.category}</span>
                                        </div>
                                    </div>

                                    {/* Timestamps */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg border border-gray-700/30">
                                            <p className="text-gray-400 text-sm">Created At</p>
                                            <p className="text-white mt-1">
                                                {blog.createdAt.toDate().toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg border border-gray-700/30">
                                            <p className="text-gray-400 text-sm">Updated At</p>
                                            <p className="text-white mt-1">
                                                {blog.updatedAt.toDate().toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </dialog>
    );
}; 