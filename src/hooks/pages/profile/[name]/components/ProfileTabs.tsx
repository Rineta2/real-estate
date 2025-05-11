import React from 'react';

import { ProfileTabsProps } from "@/hooks/pages/profile/[name]/types/ProfileDetails"

export default function ProfileTabs({ activeTab, setActiveTab, blogCount, propertyCount }: ProfileTabsProps) {
    return (
        <div className='flex gap-4 justify-center items-center mb-12'>
            <button
                onClick={() => setActiveTab('blog')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === 'blog'
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
            >
                Blog ({blogCount})
            </button>
            <button
                onClick={() => setActiveTab('properties')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === 'properties'
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
            >
                Properties ({propertyCount})
            </button>
        </div>
    );
} 