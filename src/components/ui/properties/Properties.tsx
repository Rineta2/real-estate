"use client"

import React, { useState, useEffect } from 'react'

import { FetchProperties } from '@/components/ui/properties/utils/FetchProperties'

import { PropertiesType } from '@/components/ui/properties/types/Properties'

import PropertiesSkelaton from '@/components/ui/properties/PropertiesSkelaton'

import PropertyCard from '@/components/ui/properties/components/PropertyCard'

import PropertiesHeader from '@/components/ui/properties/components/PropertiesHeader'

export default function Properties() {
    const [properties, setProperties] = useState<PropertiesType[]>([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <section className='relative py-20 sm:py-24 bg-neutral-50'>
            <div className="container px-4 sm:px-6 md:px-8 lg:px-12">
                <PropertiesHeader />

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {properties.slice(0, 6).map((item, index) => (
                        <PropertyCard key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}