import React from 'react';

import Image from 'next/image';

import { FiUser } from 'react-icons/fi';

import { ProfileHeaderProps } from '@/hooks/pages/profile/[name]/types/ProfileDetails';

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
    return (
        <div className="relative">
            <div className="h-64 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-400 rounded-b-[3rem] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '30px 30px'
                }} />
            </div>
            <div className="absolute left-1/2 top-32 transform -translate-x-1/2">
                {profile.photoURL ? (
                    <Image
                        src={profile.photoURL}
                        alt="Profile"
                        width={160}
                        height={160}
                        className="rounded-full border-4 border-white shadow-2xl w-40 h-40 object-cover bg-white hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-40 h-40 rounded-full border-4 border-white shadow-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                        <FiUser className="w-20 h-20 text-gray-400" />
                    </div>
                )}
            </div>
        </div>
    );
} 