import React from 'react'

import Image from 'next/image'

import Link from 'next/link'

import { PropertiesType } from '@/components/ui/properties/types/Properties'

import { useBodyScroll } from '@/base/helper/useBodyScroll'

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    properties: PropertiesType[];
}

export default function SearchModal({ isOpen, onClose, searchQuery, setSearchQuery, properties }: SearchModalProps) {
    useBodyScroll(isOpen);

    if (!isOpen) return null;

    const filteredProperties = properties.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-16 sm:pt-28 px-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl mx-auto shadow-xl">
                <div className="p-4 border-b">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search properties..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                        />
                        <svg
                            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                {filteredProperties.length > 0 ? (
                    <div className="space-y-4">
                        {filteredProperties.map((property, index) => (
                            <Link
                                key={index}
                                href={`/properties/${property.slug}`}
                                onClick={onClose}
                                className="block p-4 hover:bg-gray-50 rounded-xl transition-colors"
                            >
                                <div className="flex gap-4">
                                    <div className="relative w-20 h-20 flex-shrink-0">
                                        <Image
                                            src={property.thumbnail}
                                            alt={property.title}
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">{property.title}</h3>
                                        <p className="text-sm text-gray-600 line-clamp-2">{property.description}</p>
                                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                            <span>{property.province}</span>
                                            <span>•</span>
                                            <span>{property.city}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No properties found
                    </div>
                )}

                <div className="p-4 border-t">
                    <button
                        onClick={onClose}
                        className="w-full py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
