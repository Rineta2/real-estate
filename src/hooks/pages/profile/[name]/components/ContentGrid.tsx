import React from 'react';

import Image from 'next/image';

import Link from 'next/link';

import { ContentGridProps } from '@/hooks/pages/profile/[name]/types/ProfileDetails';

import { Pagination } from '@/base/helper/Pagination';

export default function ContentGrid({ items, type, currentPage, setCurrentPage }: ContentGridProps) {
    const itemsPerPage = 6;
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = currentPage * itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentItems.map((item) => (
                    <Link href={`/${type}/${item.slug}`} key={item.id}>
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="relative h-56">
                                <Image
                                    src={item.thumbnail}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="font-semibold text-xl mb-3 line-clamp-1">{item.title}</h3>
                                <p className="text-gray-600 text-sm line-clamp-3">{item.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {items.length > 0 && (
                <div className="mt-12">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={({ selected }) => setCurrentPage(selected)}
                    />
                </div>
            )}
        </div>
    );
} 