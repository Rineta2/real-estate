"use client"

import React from 'react'

import Link from 'next/link'

import { IoMdArrowRoundBack } from "react-icons/io"

import DetailsProfileSkelaton from "@/hooks/pages/profile/[name]/DetailsProfileSkelaton"

import ProfileNotFound from "@/hooks/pages/profile/[name]/components/ProfileNotFound"

import ProfileHeader from "@/hooks/pages/profile/[name]/components/ProfileHeader"

import ProfileStats from "@/hooks/pages/profile/[name]/components/ProfileStats"

import ProfileTabs from "@/hooks/pages/profile/[name]/components/ProfileTabs"

import ContentGrid from "@/hooks/pages/profile/[name]/components/ContentGrid"

import { useProfileDetails } from '@/hooks/pages/profile/[name]/lib/useProfileDetails'

export default function DetailsProfile({ name }: { name: string }) {
    const {
        profile,
        blogs,
        properties,
        activeTab,
        setActiveTab,
        isLoading,
        isContentLoading,
        currentPage,
        setCurrentPage
    } = useProfileDetails(name);

    if (isLoading) {
        return <DetailsProfileSkelaton />;
    }

    if (!profile) {
        return <ProfileNotFound />;
    }

    if (isContentLoading) {
        return <DetailsProfileSkelaton />;
    }

    return (
        <section className="min-h-full relative bg-gray-50">
            <div className="fixed top-6 left-4 z-50">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full py-2 px-6 shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 hover:text-primary"
                >
                    <IoMdArrowRoundBack className="w-5 h-5" />
                    <span>Kembali ke home</span>
                </Link>
            </div>

            <ProfileHeader profile={profile} />

            <div className="container px-4 py-16">
                <div className="max-w-5xl mx-auto mt-8">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.displayName}</h1>
                        <p className="text-gray-600">{profile.email}</p>
                    </div>

                    <ProfileStats profile={profile} />

                    <ProfileTabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        blogCount={blogs.length}
                        propertyCount={properties.length}
                    />

                    <div className="mt-8">
                        <ContentGrid
                            items={activeTab === 'blog' ? blogs : properties}
                            type={activeTab}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
