import Image from 'next/image';
import Link from 'next/link';
import { TopBlogProps } from '@/hooks/pages/blog/blog/types/Blog';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { CiTimer } from "react-icons/ci";
import { motion } from 'framer-motion';

export function TopBlog({ blog }: TopBlogProps) {
    return (
        <Link href={`/blog/${blog.slug}`} className="bg-gray-100 rounded-3xl p-4 md:p-10 flex flex-col items-center relative overflow-hidden">
            <div
                className="bg-gray-100 rounded-b-3xl px-4 py-4 shadow-md w-full max-w-3xl md:max-w-4xl z-10 absolute top-0 space-y-6"
            >
                <motion.h1
                    className="text-2xl md:text-4xl font-bold text-center text-gray-900"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {blog.title}
                </motion.h1>

                <motion.span
                    className='text-md text-gray-600 italic flex items-center gap-2 justify-center text-center'
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <CiTimer width={24} height={24} className='w-6 h-6' /> {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true, locale: id })}
                </motion.span>
            </div>

            <div className="block w-full max-w-3xl">
                <div className="w-full h-[300px] md:h-[400px] overflow-hidden rounded-2xl  bg-white">
                    <Image
                        src={blog.thumbnail}
                        alt={blog.title}
                        fill
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </div>
        </Link>
    );
}