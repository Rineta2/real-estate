import React from 'react';

import { ProfileStatsProps, FirestoreTimestamp } from '@/hooks/pages/profile/[name]/types/ProfileDetails';

import { format } from 'date-fns';

import { id } from 'date-fns/locale';

export default function ProfileStats({ profile }: ProfileStatsProps) {
    const formatTimestamp = (timestamp: FirestoreTimestamp) => {
        if (!timestamp) return 'N/A';
        return format(new Date(timestamp.seconds * 1000), 'dd MMMM yyyy', { locale: id });
    };

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 mb-12 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow duration-300">
                    <div className="text-2xl font-bold text-primary mb-2">{profile.role}</div>
                    <div className="text-sm text-gray-600">Role</div>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow duration-300">
                    <div className="text-2xl font-bold text-primary mb-2">{formatTimestamp(profile.createdAt)}</div>
                    <div className="text-sm text-gray-600">Member Sejak</div>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow duration-300">
                    <div className="text-2xl font-bold text-primary mb-2">{profile.isActive ? 'Aktif' : 'Tidak Aktif'}</div>
                    <div className="text-sm text-gray-600">Status Account</div>
                </div>
            </div>
        </div>
    );
} 