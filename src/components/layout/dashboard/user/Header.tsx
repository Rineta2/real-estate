import React from 'react';
import { useAuth } from '@/utils/context/AuthContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';
import { FaRegUser } from "react-icons/fa";
import { Sidebar, Avatar } from 'flowbite-react';
import { menuItems } from '@/components/layout/dashboard/user/data/Header';

interface HeaderProps {
    onSidebarToggle: (isOpen: boolean) => void;
}

export default function UserHeader({ onSidebarToggle }: HeaderProps) {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const [activeDropdown, setActiveDropdown] = React.useState<number | null>(null);

    const handleLinkClick = () => {
        onSidebarToggle(false);
        setActiveDropdown(null);
    };

    const isLinkActive = (href: string) => {
        const normalizedPathname = pathname?.replace(/\/$/, '') ?? '';
        const normalizedHref = href.replace(/\/$/, '');

        if (href === '/') {
            return pathname === href;
        }

        if (normalizedHref === '/dashboard/user') {
            return normalizedPathname === normalizedHref;
        }

        const menuItem = menuItems.find(item => item.href === href);
        if (menuItem?.subItems) {
            return normalizedPathname === normalizedHref;
        }

        return normalizedPathname.startsWith(normalizedHref);
    };

    const toggleDropdown = (index: number) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    return (
        <Sidebar className="w-full h-full bg-white">
            <div className="flex h-full flex-col justify-between py-2">
                <div>
                    {/* Logo */}
                    <div className="mb-5 flex items-center justify-center">
                        <Link href="/" className="flex items-center">
                            <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-900">
                                Real Estate
                            </span>
                        </Link>
                    </div>

                    {/* Profile Section */}
                    <div className="mb-5 px-4">
                        <div className="flex items-center gap-3">
                            {user?.photoURL ? (
                                <Avatar
                                    img={user.photoURL}
                                    alt="Profile"
                                    rounded
                                    size="md"
                                />
                            ) : (
                                <Avatar
                                    alt="Profile"
                                    rounded
                                    size="md"
                                >
                                    <FaRegUser className="w-5 h-5" />
                                </Avatar>
                            )}
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-medium text-gray-900">
                                    {user?.displayName || 'User'}
                                </span>
                                <span className="text-xs text-gray-500">
                                    User
                                </span>
                            </div>
                            <button
                                onClick={logout}
                                className="ml-auto p-2 text-gray-500 hover:text-gray-700"
                            >
                                <FiLogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="px-3 py-4">
                        <ul className="space-y-2">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    {item.subItems ? (
                                        <div>
                                            <button
                                                onClick={() => toggleDropdown(index)}
                                                className={`flex w-full items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200 ${activeDropdown === index
                                                    ? 'bg-gray-100'
                                                    : 'hover:bg-gray-100'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <item.icon className="w-5 h-5" />
                                                    <span className="text-sm font-medium">{item.label}</span>
                                                </div>
                                                <svg
                                                    className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''
                                                        }`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>
                                            <div
                                                className={`overflow-hidden transition-all duration-200 ${activeDropdown === index ? 'max-h-96' : 'max-h-0'
                                                    }`}
                                            >
                                                <ul className="mt-2 space-y-2 pl-4">
                                                    {item.subItems.map((subItem, subIndex) => (
                                                        <li key={subIndex}>
                                                            <Link
                                                                href={subItem.href}
                                                                onClick={handleLinkClick}
                                                                className={`block py-2 px-3 text-sm rounded-lg transition-all duration-200 ${isLinkActive(subItem.href)
                                                                    ? 'bg-primary text-white'
                                                                    : 'hover:bg-gray-100'
                                                                    }`}
                                                            >
                                                                {subItem.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            onClick={handleLinkClick}
                                            className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200 ${isLinkActive(item.href)
                                                ? 'bg-primary text-white'
                                                : 'hover:bg-gray-100'
                                                }`}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
}