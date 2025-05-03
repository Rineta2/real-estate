import { motion } from 'framer-motion';

import Image from 'next/image';

import Link from 'next/link';

import { formatDistanceToNow } from 'date-fns';

import { id } from 'date-fns/locale';

import { BlogCardProps } from '@/hooks/pages/blog/blog/types/Blog';

export function BlogCard({ blog }: BlogCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='group bg-background rounded-2xl overflow-hidden'
        >
            <Link
                href={`/blog/${blog.slug}`}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="w-full h-[300px] overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Image
                        src={blog.thumbnail}
                        alt={blog.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                </motion.div>

                <div className="p-6 space-y-4">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-3 py-1 text-blue-600 text-xs font-semibold tracking-wider uppercase bg-blue-50 rounded-full"
                    >
                        {blog.category}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1"
                    >
                        {blog.title}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-sm text-gray-600 line-clamp-3"
                    >
                        {blog.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-between pt-4 border-t border-gray-100"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 overflow-hidden rounded-full ring-2 ring-blue-100">
                                <Image
                                    src={blog.author.photoURL}
                                    alt={blog.author.name}
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex flex-col">
                                <p className="text-sm font-semibold text-gray-800">{blog.author.name}</p>
                                <p className="text-xs text-gray-500">{blog.author.role}</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 italic">
                            {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true, locale: id })}
                        </p>
                    </motion.div>
                </div>
            </Link>
        </motion.div>
    );
}