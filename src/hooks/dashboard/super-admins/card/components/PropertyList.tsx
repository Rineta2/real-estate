import React from 'react';

import Image from 'next/image';

import { format } from 'date-fns';

import { PropertyListProps } from "@/hooks/dashboard/super-admins/card/types/dashboard"

export default function PropertyList({ properties, filteredProperties, propertyId, setPropertyId, isLoading }: PropertyListProps) {
    return (
        <div className="p-4 sm:p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Daftar Properties</h2>
                <div className="flex items-center gap-4">
                    <select
                        className="w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={propertyId}
                        onChange={(e) => setPropertyId(e.target.value)}
                    >
                        <option value="all">All Properties</option>
                        {properties.map((property) => (
                            <option key={property.slug} value={property.slug}>
                                {property.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {isLoading ? (
                <div className="h-24 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : filteredProperties.length === 0 ? (
                <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-3xl border border-gray-100/50 p-4 sm:p-8 text-center">
                    <p className="text-gray-500">Tidak ada property ditemukan.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredProperties
                        .sort((a, b) => {
                            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                            return dateB - dateA;
                        })
                        .slice(0, 6)
                        .map((property) => (
                            <div key={property.slug} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 group">
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={property.thumbnail}
                                        alt={property.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                                        {property.title || 'Tanpa Judul'}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{property.city || '-'}</span>
                                        {property.province && (
                                            <>
                                                <span className="text-gray-300">•</span>
                                                <span>{property.province}</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{property.createdAt ? format(property.createdAt, 'dd MMM yyyy') : '-'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
} 