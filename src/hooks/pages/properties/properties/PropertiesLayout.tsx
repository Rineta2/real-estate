"use client"

import React, { useState, useEffect } from 'react'

import { FetchProperties } from '@/components/ui/properties/utils/FetchProperties'

import { PropertiesType } from '@/components/ui/properties/types/Properties'

import PropertiesSkelaton from '@/hooks/pages/properties/properties/PropertiesSkelaton';

import PropertyCard from '@/components/ui/properties/components/PropertyCard';

import { Pagination } from '@/base/helper/Pagination';

import SearchModal from '@/hooks/pages/properties/properties/modal/SearchModal';

import { TopProperty } from '@/hooks/pages/properties/properties/components/TopProperties';

export default function PropertiesLayout() {
    const [properties, setProperties] = useState<PropertiesType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedProvince, setSelectedProvince] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    useEffect(() => {
        const unsubscribe = FetchProperties((newProperties) => {
            setProperties(newProperties);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <PropertiesSkelaton />;
    }

    const topProperty = properties[0];

    // Get unique provinces and cities
    const uniqueProvinces = [...new Set(properties.map(item => item.province))];
    const filteredCities = selectedProvince
        ? [...new Set(properties
            .filter(item => item.province === selectedProvince)
            .map(item => item.city))]
        : [...new Set(properties.map(item => item.city))];

    // Filter properties based on type, province, city, and search query
    const filteredOtherProperties = properties.filter(property => {
        const typeMatch = !selectedType || property.type === selectedType;
        const provinceMatch = !selectedProvince || property.province === selectedProvince;
        const cityMatch = !selectedCity || property.city === selectedCity;
        const searchMatch = !searchQuery ||
            property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.description.toLowerCase().includes(searchQuery.toLowerCase());
        return typeMatch && provinceMatch && cityMatch && searchMatch && property !== topProperty;
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredOtherProperties.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const paginatedProperties = filteredOtherProperties.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const uniqueTypes = [...new Set(properties.map(item => item.type))];

    return (
        <section className='min-h-screen pt-28 py-10 bg-gradient-to-b from-gray-50 to-white'>
            <div className='container px-4 sm:px-6 md:px-8 lg:px-14'>
                {/* Featured Property Section */}
                {topProperty && (
                    <TopProperty property={topProperty} />
                )}

                <div className='flex flex-col sm:flex-row mb-8 sm:mb-16 justify-between items-start sm:items-center gap-4 p-4 bg-primary rounded-xl'>
                    <div className='w-full sm:w-auto flex flex-wrap items-center gap-2 sm:gap-4'>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full sm:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors"
                        >
                            <option value="">All Types</option>
                            {uniqueTypes.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='w-full sm:w-auto flex flex-wrap items-center gap-2 sm:gap-4'>
                        <button
                            onClick={() => setIsSearchModalOpen(true)}
                            className="w-full sm:w-auto relative px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <svg
                                className="w-5 h-5 text-gray-400"
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
                            Search properties...
                        </button>
                        <select
                            value={selectedProvince}
                            onChange={(e) => {
                                setSelectedProvince(e.target.value);
                                setSelectedCity(''); // Reset city when province changes
                            }}
                            className="w-full sm:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors"
                        >
                            <option value="">All Provinces</option>
                            {uniqueProvinces.map((province, index) => (
                                <option key={index} value={province}>
                                    {province}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="w-full sm:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors"
                            disabled={!selectedProvince}
                        >
                            <option value="">All Cities</option>
                            {filteredCities.map((city, index) => (
                                <option key={index} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Other Properties Section */}
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8' style={{
                    rowGap: 40
                }}>
                    {paginatedProperties.map((property, index) => (
                        <PropertyCard key={index} item={property} index={index} />
                    ))}
                </div>

                {filteredOtherProperties.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>

            <SearchModal
                isOpen={isSearchModalOpen}
                onClose={() => setIsSearchModalOpen(false)}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                properties={properties}
            />
        </section>
    )
}
