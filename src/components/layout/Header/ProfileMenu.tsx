import { motion, AnimatePresence } from 'framer-motion'

import Link from 'next/link'

import Image from 'next/image'

import { IoPersonCircleOutline } from "react-icons/io5"

import { IoMdArrowDropdown } from "react-icons/io"

import { useAuth } from '@/utils/context/AuthContext'

interface ProfileMenuProps {
    isProfileOpen: boolean
    toggleProfile: () => void
}

export default function ProfileMenu({ isProfileOpen, toggleProfile }: ProfileMenuProps) {
    const { user, logout, getDashboardUrl } = useAuth()

    if (!user) return null

    return (
        <div className="relative">
            <button
                onClick={toggleProfile}
                className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-50"
            >
                {user.photoURL ? (
                    <Image
                        src={user.photoURL}
                        alt="Profile"
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                        width={32}
                        height={32}
                    />
                ) : (
                    <IoPersonCircleOutline className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                )}
                <span className="hidden md:inline text-sm font-medium max-w-[120px] truncate text-gray-700">
                    {user.displayName}
                </span>
                <IoMdArrowDropdown className={`hidden md:inline transition-transform duration-200 text-gray-600 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isProfileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-gray-100 py-1 md:block"
                    >
                        <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900">{user.displayName}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <Link
                            href={getDashboardUrl(user.role)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={toggleProfile}
                        >
                            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100">📊</span>
                            Dashboard
                        </Link>
                        <button
                            onClick={async () => {
                                await logout()
                                toggleProfile()
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-gray-100">🚪</span>
                            Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
} 