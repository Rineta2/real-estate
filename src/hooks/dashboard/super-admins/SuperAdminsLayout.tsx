"use client";

import React, { useState, useEffect } from 'react';

import DashboardCards from '@/hooks/dashboard/super-admins/card/DashboardCards';

import { onAuthStateChanged, User } from 'firebase/auth';

import { auth } from '@/utils/firebase/firebase';

import SuperAdminsSkelaton from "@/hooks/dashboard/super-admins/SuperAdminsSkelaton";

import RecentContacts from '@/hooks/dashboard/super-admins/card/components/RecentContacts';

import RecentMessages from '@/hooks/dashboard/super-admins/card/components/RecentMessages';

import ActivityChart from '@/hooks/dashboard/super-admins/card/components/ActivityChart';

import PropertyList from '@/hooks/dashboard/super-admins/card/components/PropertyList';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

import { useChartData } from '@/hooks/dashboard/super-admins/card/lib/useChartData'

import { useMessages } from '@/hooks/dashboard/super-admins/card/lib/useMessages';

import { useContacts } from '@/hooks/dashboard/super-admins/card/lib/useContacts';

import { useProperties } from '@/hooks/dashboard/super-admins/card/lib/useProperties';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function SuperAdminDashboard() {
    const [user, setUser] = useState<User | null>(null);

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    // Use custom hooks
    const { chartData, isLoading, properties, userStats } = useChartData(user);
    const { recentMessages } = useMessages(user, properties);
    const { recentContacts } = useContacts(user);
    const { filteredProperties, propertyId, setPropertyId } = useProperties(properties);

    if (isLoading) {
        return <SuperAdminsSkelaton />;
    }

    return (
        <section className='overflow-hidden'>
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <DashboardCards userStats={userStats} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <RecentContacts contacts={recentContacts} />
                    <RecentMessages messages={recentMessages} />
                </div>

                <ActivityChart chartData={chartData} isLoading={isLoading} />

                <PropertyList
                    properties={properties}
                    filteredProperties={filteredProperties}
                    propertyId={propertyId}
                    setPropertyId={setPropertyId}
                    isLoading={isLoading}
                />
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #888;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
            `}</style>
        </section>
    );
}
