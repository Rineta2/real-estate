import React from 'react';

import { useAuth } from '@/utils/context/AuthContext';

import { FaRegUser } from "react-icons/fa";

import { FiLogOut, FiBell, FiMenu } from 'react-icons/fi';

import { Avatar } from 'flowbite-react';

interface HeaderProps {
    onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const { user, logout } = useAuth();

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
                    {/* Notifications */}
                    <button
                        className="p-2 text-gray-500 hover:text-gray-700 transition-colors relative hidden sm:block"
                        aria-label="Notifications"
                    >
                        <FiBell className="w-5 h-5" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

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