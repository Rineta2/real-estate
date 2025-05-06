import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { TopPropertyProps } from '@/components/ui/properties/types/Properties';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';

export function TopProperty({ property }: TopPropertyProps) {
    return (
        <div className="mb-8 sm:mb-16">
            <Link href={`/properties/${property.slug}`} className="group block">
                <div className='relative bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden'>
                    <div className='grid grid-cols-1 lg:grid-cols-2'>
                        <div className="relative h-[300px] lg:h-[450px] overflow-hidden">
                            <Image
                                src={property.thumbnail}
                                alt={property.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 600px"
                                className='object-cover group-hover:scale-105 transition-transform duration-700'
                                priority
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />

                            <div className='absolute top-6 left-6 flex gap-2'>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4 }}
                                    className={`px-4 py-2 rounded-full ${property?.statusProject === 'Coming Soon'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : property?.statusProject === 'Sedang Berjalan'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-green-100 text-green-800'
                                        }`}
                                >
                                    {property.statusProject}
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                    className='px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-800 shadow-sm capitalize'
                                >
                                    {property.type}
                                </motion.div>
                            </div>

                            <div className='absolute bottom-6 left-6 right-6 text-white'>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                    className='text-3xl md:text-4xl font-bold mb-2 group-hover:text-blue-400 transition-colors capitalize'
                                >
                                    {property.title}
                                </motion.h1>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.3 }}
                                    className='flex items-center gap-2 text-white/90'
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className='font-medium'>{property.province}</span>
                                    <span>•</span>
                                    <span className='font-medium'>{property.city}</span>
                                </motion.div>
                            </div>
                        </div>

                        <div className='flex flex-col p-8 md:p-10 bg-white'>
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                                className="text-sm text-gray-500 flex items-center gap-2 mb-5"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {formatDistanceToNow(new Date(property.createdAt), { locale: id, addSuffix: true })}
                            </motion.span>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                                className='text-gray-600 text-lg leading-relaxed mb-8 line-clamp-3'
                            >
                                {property.description}
                            </motion.p>

                            <div className="mt-auto">
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.6 }}
                                    className="text-xl font-semibold text-gray-900 mb-6"
                                >
                                    Available Facilities
                                </motion.h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {property.facilities.map((facility, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: 0.7 + (idx * 0.1) }}
                                            className='flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors group'
                                        >
                                            {facility.imageUrl && (
                                                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow transition-shadow">
                                                    <Image
                                                        src={facility.imageUrl}
                                                        alt={facility.title}
                                                        width={24}
                                                        height={24}
                                                        className="opacity-80 group-hover:opacity-100 transition-opacity"
                                                    />
                                                </div>
                                            )}
                                            <span className="text-sm font-medium text-gray-700">
                                                {facility.title}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}