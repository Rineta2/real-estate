"use client"

import React, { useState } from 'react';

import { useAuth } from '@/utils/context/AuthContext';

import { FaRegUser } from "react-icons/fa";

import { FiLogOut, FiBell, FiMenu, FiMail } from 'react-icons/fi';

import { Avatar } from 'flowbite-react';

import { useMessages } from '@/hooks/dashboard/super-admins/card/lib/useMessages';

import { useContacts } from '@/hooks/dashboard/super-admins/card/lib/useContacts';

import { Properties } from '@/hooks/dashboard/super-admins/properties/properties/types/properties';

import { auth } from '@/utils/firebase/firebase';

interface HeaderProps {
    onMenuClick?: () => void;
    properties: Properties[];
}

export default function Header({ onMenuClick, properties }: HeaderProps) {
    const { user, logout } = useAuth();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showContacts, setShowContacts] = useState(false);

    const { recentMessages } = useMessages(user, properties);
    const { recentContacts } = useContacts(auth.currentUser);

    // Filter only pending messages
    const pendingMessages = recentMessages.filter(msg => msg.status === 'pending');
    const unreadCount = pendingMessages.length;

    // Filter only unread contacts
    const unreadContacts = recentContacts.filter(contact => contact.status === 'unread');
    const unreadContactsCount = unreadContacts.length;

    return (
        <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100">
            <div className="flex items-center justify-between h-16 px-4">
                {/* Left side */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="p-2 -ml-2 text-gray-500 lg:hidden hover:text-gray-700 transition-colors"
                        aria-label="Open menu"
                    >
                        <FiMenu className="w-6 h-6" />
                    </button>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                            Hello, {user?.displayName || 'User'}!
                        </h2>
                        <p className="text-sm text-gray-600 hidden sm:block">
                            Welcome back to your dashboard
                        </p>
                    </div>
                </div>

                {/* Right side - Profile and notifications */}
                <div className="flex items-center gap-2 lg:gap-4">
                    {/* Contacts */}
                    <div className="relative">
                        <button
                            onClick={() => setShowContacts(!showContacts)}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors relative hidden sm:block"
                            aria-label="Contacts"
                        >
                            <FiMail className="w-5 h-5" />
                            {unreadContactsCount > 0 && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                        </button>

                        {/* Contacts Dropdown */}
                        {showContacts && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <h3 className="font-semibold text-gray-900">Contact Messages</h3>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {unreadContacts.length === 0 ? (
                                        <p className="px-4 py-3 text-sm text-gray-500">No new contact messages</p>
                                    ) : (
                                        unreadContacts.map((contact) => (
                                            <div key={contact.id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0">
                                                <p className="text-sm font-medium text-gray-900">{contact.fullName}</p>
                                                <p className="text-sm text-gray-600 line-clamp-2 mt-1">{contact.message}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(contact.createdAt).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </span>
                                                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-600">
                                                        unread
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors relative hidden sm:block"
                            aria-label="Notifications"
                        >
                            <FiBell className="w-5 h-5" />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                        </button>

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {pendingMessages.length === 0 ? (
                                        <p className="px-4 py-3 text-sm text-gray-500">No pending messages</p>
                                    ) : (
                                        pendingMessages.map((message) => (
                                            <div key={message.id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0">
                                                <p className="text-sm font-medium text-gray-900">{message.name}</p>
                                                <p className="text-sm text-gray-600 line-clamp-2 mt-1">{message.message}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(message.timestamp).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </span>
                                                    <span className={`text-xs px-2 py-1 rounded-full ${message.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-600'
                                                        : 'bg-green-100 text-green-600'
                                                        }`}>
                                                        {message.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile */}
                    <div className="flex items-center gap-2 lg:gap-3">
                        {user?.photoURL ? (
                            <Avatar img={user.photoURL} alt="Profile" rounded size="sm" />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                                <FaRegUser className="w-4 h-4 text-primary-600" />
                            </div>
                        )}
                        <div className="hidden sm:block">
                            <p className="text-sm font-medium text-gray-900 line-clamp-1 max-w-[120px] lg:max-w-[200px]">
                                {user?.displayName || 'User'}
                            </p>
                            <p className="text-xs text-gray-500">Super Admin</p>
                        </div>
                        <button
                            onClick={logout}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label="Logout"
                        >
                            <FiLogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
} 