import { motion, AnimatePresence } from 'framer-motion'

import Link from 'next/link'

import Image from 'next/image'

import { IoPersonCircleOutline } from "react-icons/io5"

import { IoMdArrowDropdown } from "react-icons/io"

import { useAuth } from '@/utils/context/AuthContext'

interface ProfileMenuProps {
    isProfileOpen: boolean
    toggleProfile: () => void
    isMobile?: boolean
}

export default function ProfileMenu({ isProfileOpen, toggleProfile, isMobile = false }: ProfileMenuProps) {
    const { user, logout, getDashboardUrl } = useAuth()

    if (!user) return null

    return (
        <div className={`relative ${isMobile ? 'md:hidden' : 'hidden md:block'}`}>
            <button
                onClick={toggleProfile}
                className={`flex items-center gap-2 ${isMobile ? 'p-2' : 'px-4 py-2'} rounded-lg transition-all duration-200 hover:bg-gray-50`}
            >
                {user.photoURL ? (
                    <Image
                        src={user.photoURL}
                        alt="Profile"
                        className={`${isMobile ? 'w-10 h-10' : 'w-8 h-8'} rounded-full object-cover`}
                        width={isMobile ? 40 : 32}
                        height={isMobile ? 40 : 32}
                    />
                ) : (
                    <IoPersonCircleOutline className={`${isMobile ? 'w-10 h-10' : 'w-8 h-8'} text-primary`} />
                )}
                {!isMobile && (
                    <>
                        <span className="text-sm font-medium max-w-[120px] truncate text-gray-700">
                            {user.displayName}
                        </span>
                        <IoMdArrowDropdown className={`transition-transform duration-200 text-gray-600 ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </>
                )}
            </button>

            <AnimatePresence>
                {isProfileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className={`${isMobile ? 'fixed inset-x-0 top-20 bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' : 'absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-gray-100 py-1'}`}
                    >
                        {isMobile ? (
                            <div className="container px-4">
                                <div className="px-4 py-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        {user.photoURL ? (
                                            <Image
                                                src={user.photoURL}
                                                alt="Profile"
                                                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/10"
                                                width={48}
                                                height={48}
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center">
                                                <IoPersonCircleOutline className="w-8 h-8 text-primary" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-base font-semibold text-gray-900">{user.displayName}</p>
                                            <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-2">
                                    <Link
                                        href={getDashboardUrl(user.role)}
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50/80 transition-colors duration-200"
                                        onClick={toggleProfile}
                                    >
                                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/5 text-primary">📊</span>
                                        <span>Dashboard</span>
                                    </Link>
                                    <button
                                        onClick={async () => {
                                            await logout()
                                            toggleProfile()
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50/80 transition-colors duration-200"
                                    >
                                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/5 text-primary">🚪</span>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
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
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
} 