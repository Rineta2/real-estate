"use client";

import React, { useState, useEffect, useCallback } from 'react';

import DashboardCards from '@/hooks/dashboard/super-admins/card/DashboardCards';

import { Line } from 'react-chartjs-2';

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

import { collection, getDocs } from 'firebase/firestore';

import { ref, get, query, orderByChild, onValue } from 'firebase/database';

import { onAuthStateChanged, User } from 'firebase/auth';

import { db, database, auth } from '@/utils/firebase/firebase';

import { format } from 'date-fns';

import { toast } from 'react-hot-toast';

import { Properties } from '@/hooks/dashboard/super-admins/properties/properties/types/properties';

import { UserAccount, Role } from '@/types/Auth';

import Image from 'next/image';

import SuperAdminsSkelaton from "@/hooks/dashboard/super-admins/SuperAdminsSkelaton"

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

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        fill: boolean;
        backgroundColor: string;
        borderColor: string;
        tension: number;
    }[];
}

interface Message {
    id: string;
    propertyId: string;
    timestamp: number;
    name: string;
    message: string;
    contactMethod: string;
    status: string;
}

interface ContactMessage {
    id: string;
    fullName: string;
    email: string;
    message: string;
    status: 'unread' | 'read';
    createdAt: number;
}

interface FirebaseContactMessage {
    fullName: string;
    email: string;
    message: string;
    status: 'unread' | 'read';
    createdAt: number;
}

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'top' as const,
        },
        title: {
            display: false,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(0, 0, 0, 0.05)',
            },
        },
        x: {
            grid: {
                display: false,
            },
        },
    },
};

const initialChartData: ChartData = {
    labels: [],
    datasets: [
        {
            label: 'Property Listings',
            data: [],
            fill: true,
            backgroundColor: 'rgba(124, 58, 237, 0.1)',
            borderColor: 'rgba(124, 58, 237, 1)',
            tension: 0.4,
        },
        {
            label: 'Inquiries',
            data: [],
            fill: true,
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderColor: 'rgba(16, 185, 129, 1)',
            tension: 0.4,
        },
        {
            label: 'New Users',
            data: [],
            fill: true,
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: 'rgba(59, 130, 246, 1)',
            tension: 0.4,
        }
    ],
};

export default function SuperAdminDashboard() {
    const [chartData, setChartData] = useState<ChartData>(initialChartData);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [properties, setProperties] = useState<Properties[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<Properties[]>([]);
    const [propertyId, setPropertyId] = useState<string>("all");
    const [userStats, setUserStats] = useState({
        total: 0,
        superAdmins: 0,
        admins: 0,
        regularUsers: 0
    });
    const [recentMessages, setRecentMessages] = useState<Message[]>([]);
    const [recentContacts, setRecentContacts] = useState<ContactMessage[]>([]);

    // Helper function to get date range for a month
    const getMonthDateRange = useCallback((monthsAgo: number) => {
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - monthsAgo);
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0);
        endDate.setHours(23, 59, 59, 999);

        return { startDate, endDate };
    }, []);

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    // Fetch chart data
    useEffect(() => {
        const fetchChartData = async () => {
            if (!user) return;

            try {
                setIsLoading(true);
                const months = 6;
                const labels: string[] = [];
                const propertyData: number[] = [];
                const inquiryData: number[] = [];
                const userData: number[] = [];

                // Generate labels for the selected time range
                for (let i = months - 1; i >= 0; i--) {
                    const date = new Date();
                    date.setMonth(date.getMonth() - i);
                    labels.push(format(date, 'MMM'));
                }

                // Fetch properties data
                const propertiesRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PROPERTIES as string);
                const propertiesSnapshot = await getDocs(propertiesRef);
                const propertiesList = propertiesSnapshot.docs.map(doc => ({
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate()
                })) as Properties[];
                setProperties(propertiesList);

                // Fetch users data
                const usersRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string);
                const usersSnapshot = await getDocs(usersRef);
                const usersList = usersSnapshot.docs.map(doc => ({
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate()
                })) as UserAccount[];

                // Calculate user statistics
                const stats = {
                    total: usersList.length,
                    superAdmins: usersList.filter(u => u.role === Role.SUPER_ADMIN).length,
                    admins: usersList.filter(u => u.role === Role.ADMIN).length,
                    regularUsers: usersList.filter(u => u.role === Role.USER).length
                };
                setUserStats(stats);

                // Count data for each month
                for (let i = months - 1; i >= 0; i--) {
                    const { startDate, endDate } = getMonthDateRange(i);

                    // Count properties
                    const propertiesInMonth = propertiesList.filter(property =>
                        property.createdAt && property.createdAt >= startDate && property.createdAt <= endDate
                    ).length;
                    propertyData.push(propertiesInMonth);

                    // Count new users
                    const usersInMonth = usersList.filter(user =>
                        user.createdAt && user.createdAt >= startDate && user.createdAt <= endDate
                    ).length;
                    userData.push(usersInMonth);

                    // Initialize inquiry data
                    inquiryData.push(0);
                }

                // Fetch messages data
                try {
                    const allProperties = propertiesList.map(property => ({
                        id: property.id,
                        slug: property.slug || property.id,
                        title: property.title,
                    }));

                    // Reset inquiry data
                    inquiryData.fill(0);

                    // Count inquiries for each month
                    for (let i = months - 1; i >= 0; i--) {
                        const { startDate, endDate } = getMonthDateRange(i);
                        let inquiriesInMonth = 0;

                        for (const property of allProperties) {
                            try {
                                const messagesRef = ref(database, `${process.env.NEXT_PUBLIC_REALTIME_MESSAGES}/${property.slug}`);
                                const messagesSnapshot = await get(messagesRef);

                                if (messagesSnapshot.exists()) {
                                    const messages = messagesSnapshot.val();
                                    Object.keys(messages).forEach(messageId => {
                                        const messageData = messages[messageId];
                                        const messageDate = new Date(messageData.timestamp);
                                        if (messageDate >= startDate && messageDate <= endDate) {
                                            inquiriesInMonth++;
                                        }
                                    });
                                }
                            } catch (error) {
                                console.warn(`Cannot access messages for ${property.slug}:`, error);
                            }
                        }
                        inquiryData[i] = inquiriesInMonth;
                    }
                } catch (error) {
                    console.warn('Could not fetch messages data:', error);
                    toast.error('Unable to load inquiry data. Showing only property listings and user data.');
                }

                setChartData(prev => ({
                    ...prev,
                    labels,
                    datasets: [
                        {
                            ...prev.datasets[0],
                            data: propertyData
                        },
                        {
                            ...prev.datasets[1],
                            data: inquiryData
                        },
                        {
                            ...prev.datasets[2],
                            data: userData
                        }
                    ]
                }));
            } catch (error) {
                console.error('Error fetching chart data:', error);
                toast.error('Failed to load chart data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchChartData();
    }, [user, getMonthDateRange]);

    // Fetch recent messages
    useEffect(() => {
        const fetchRecentMessages = async () => {
            if (!user) return;

            try {
                const allMessages: Message[] = [];

                for (const property of properties) {
                    try {
                        const messagesRef = ref(database, `${process.env.NEXT_PUBLIC_REALTIME_MESSAGES}/${property.slug}`);
                        const messagesSnapshot = await get(messagesRef);

                        if (messagesSnapshot.exists()) {
                            const messages = messagesSnapshot.val();
                            Object.keys(messages).forEach(messageId => {
                                const messageData = messages[messageId];
                                allMessages.push({
                                    id: messageId,
                                    propertyId: property.slug,
                                    ...messageData
                                });
                            });
                        }
                    } catch (error) {
                        console.warn(`Cannot access messages for ${property.slug}:`, error);
                    }
                }

                // Sort messages by timestamp (newest first) and take the most recent 10
                const sortedMessages = allMessages
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .slice(0, 10);

                setRecentMessages(sortedMessages);
            } catch (error) {
                console.error('Error fetching recent messages:', error);
                toast.error('Failed to load recent messages');
            }
        };

        fetchRecentMessages();
    }, [user, properties]);

    // Fetch recent contacts
    useEffect(() => {
        const fetchRecentContacts = async () => {
            if (!user) return;

            try {
                const contactsRef = ref(database, process.env.NEXT_PUBLIC_REALTIME_CONTACT);
                const contactsQuery = query(contactsRef, orderByChild('createdAt'));

                const unsubscribe = onValue(contactsQuery, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const contactsArray = Object.entries(data).map(([id, value]) => ({
                            id,
                            ...(value as FirebaseContactMessage)
                        })).reverse();

                        setRecentContacts(contactsArray.slice(0, 10));
                    } else {
                        setRecentContacts([]);
                    }
                }, (error) => {
                    console.error('Error fetching contacts:', error);
                    toast.error('Failed to load recent contacts');
                });

                return () => unsubscribe();
            } catch (error) {
                console.error('Error fetching recent contacts:', error);
                toast.error('Failed to load recent contacts');
            }
        };

        fetchRecentContacts();
    }, [user]);

    // Filter properties
    useEffect(() => {
        if (propertyId === "all") {
            setFilteredProperties(properties);
        } else {
            setFilteredProperties(properties.filter(prop => prop.slug === propertyId));
        }
    }, [propertyId, properties]);

    if (isLoading) {
        return (
            <SuperAdminsSkelaton />
        )
    }

    return (
        <section className='overflow-hidden'>
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <DashboardCards userStats={userStats} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Recent Contact */}
                    <div className="p-4 sm:p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 h-[420px] flex flex-col">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Recent Contact</h2>
                        <div className="space-y-4 sm:space-y-6 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                            {recentContacts.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No recent Contact</p>
                            ) : (
                                recentContacts.map((contact) => (
                                    <div key={contact.id} className="flex items-start gap-3 sm:gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                                            <div className="w-3 h-3 rounded-full bg-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{contact.fullName}</p>
                                            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{contact.message}</p>
                                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                                                <span className="text-xs text-gray-500">
                                                    {new Date(contact.createdAt).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                                <span className={`text-xs px-2 py-1 rounded-full ${contact.status === 'read'
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-yellow-100 text-yellow-600'
                                                    }`}>
                                                    {contact.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Recent Messages */}
                    <div className="p-4 sm:p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 h-[420px] flex flex-col">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Recent Messages</h2>
                        <div className="space-y-4 sm:space-y-6 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                            {recentMessages.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No recent messages</p>
                            ) : (
                                recentMessages.map((message) => (
                                    <div key={message.id} className="flex items-start gap-3 sm:gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                                            <div className="w-3 h-3 rounded-full bg-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{message.name}</p>
                                            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{message.message}</p>
                                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                                                <span className="text-xs text-gray-500">
                                                    {new Date(message.timestamp).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                                    {message.contactMethod}
                                                </span>
                                                <span className={`text-xs px-2 py-1 rounded-full ${message.status === 'replied'
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-yellow-100 text-yellow-600'
                                                    }`}>
                                                    {message.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    {/* Chart */}
                    <div className="p-4 sm:p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 h-[420px] flex flex-col w-full overflow-hidden">
                        <div className="flex items-center justify-between mb-4 sm:mb-6 w-full">
                            <h2 className="text-lg font-semibold text-gray-900">Activity Overview</h2>
                        </div>
                        <div className="flex-1 w-full min-h-0">
                            {isLoading ? (
                                <div className="h-full flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            ) : (
                                <Line data={chartData} options={chartOptions} style={{ width: '100%', height: '100%', display: 'block' }} />
                            )}
                        </div>
                    </div>
                </div>

                {/* Daftar Properties */}
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
