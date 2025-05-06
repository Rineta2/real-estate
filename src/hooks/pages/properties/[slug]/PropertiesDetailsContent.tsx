"use client"

import React, { useState, useEffect } from 'react'

import { FetchPropertiesDetails, FetchRelatedBlog } from '@/hooks/pages/properties/[slug]/lib/FetchProperties'

import { PropertiesType } from "@/components/ui/properties/types/Properties"

import PropertiesDetailsSkelaton from "@/hooks/pages/properties/[slug]/PropertiesDetailsSkelaton"

import PropertiesNotFound from "@/hooks/pages/properties/[slug]/PropertiesNotFound"

import RelatedProperties from '@/hooks/pages/properties/[slug]/components/RelatedProperties'

import PropertyHeader from '@/hooks/pages/properties/[slug]/components/PropertyHeader'

import PropertyImageGallery from '@/hooks/pages/properties/[slug]/components/PropertyImageGallery'

import PropertyFacilities from '@/hooks/pages/properties/[slug]/components/PropertyFacilities'

import PropertyDescription from '@/hooks/pages/properties/[slug]/components/PropertyDescription'

import PropertyContent from '@/hooks/pages/properties/[slug]/components/PropertyContent'

import PropertyAgentCard from '@/hooks/pages/properties/[slug]/components/PropertyAgentCard'

import PropertyContactForm from '@/hooks/pages/properties/[slug]/components/PropertyContactForm'

export default function PropertiesDetailsContent({ slug }: { slug: string }) {
    const [properties, setProperties] = useState<PropertiesType[]>([]);
    const [loading, setLoading] = useState(true);
    const [relatedProperties, setRelatedProperties] = useState<PropertiesType[]>([]);

    useEffect(() => {
        const unsubscribe = FetchPropertiesDetails(slug, (properties: PropertiesType[]) => {
            setProperties(properties)
            setLoading(false)
        })

        FetchRelatedBlog(slug, (properties: PropertiesType[]) => {
            setRelatedProperties(properties)
        })

        return () => {
            unsubscribe()
        }
    }, [slug])

    if (loading) return <PropertiesDetailsSkelaton />;

    const currentBlog = properties[0];

    if (!currentBlog) return <PropertiesNotFound />;

    const filteredBlog = properties.find(item => item.slug === slug)

    if (!filteredBlog) return <PropertiesNotFound />;

    return (
        <section className='min-h-screen pt-20 md:pt-24 py-4 sm:py-6 md:py-8'>
            <div className="container px-3 sm:px-6 md:px-8 lg:px-14">
                <PropertyHeader property={filteredBlog} />

                <div className='flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10'>
                    <article className="flex-1">
                        <PropertyImageGallery images={filteredBlog.images || []} />

                        <div className="mt-6 sm:mt-8 md:mt-10">
                            <PropertyFacilities details={filteredBlog.details || []} />
                            <PropertyDescription description={filteredBlog.description || ''} />
                            <PropertyContent content={filteredBlog.content || ''} />
                        </div>
                    </article>

                    <aside className="sticky top-20 lg:top-24 w-full lg:w-[350px] xl:w-[400px] self-start bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-300">
                        <PropertyAgentCard agent={filteredBlog.author || { name: 'Agent', photoURL: '/default-avatar.jpg' }} />
                        <PropertyContactForm
                            propertyTitle={filteredBlog.title || ''}
                            propertySlug={slug}
                        />
                    </aside>
                </div>

                <RelatedProperties relatedProperties={relatedProperties} currentSlug={slug} />
            </div>
        </section>
    )
}
