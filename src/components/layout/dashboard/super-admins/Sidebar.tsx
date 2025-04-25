import React from 'react';

import { usePathname } from 'next/navigation';

import Link from 'next/link';

import { menuItems } from '@/components/layout/dashboard/super-admins/data/Header';

import { FaTemperatureHigh } from "react-icons/fa";

interface HeaderProps {
    onSidebarToggle: (isOpen: boolean) => void;
}

interface MenuItem {
    href: string;
    label: string;
    subItems?: SubMenuItem[];
}

interface SubMenuItem {
    href: string;
    label: string;
}

export default function SuperAdminHeader({ onSidebarToggle }: HeaderProps) {
    const pathname = usePathname();
    const [activeDropdown, setActiveDropdown] = React.useState<number | null>(null);

    const handleLinkClick = () => {
        onSidebarToggle(false);
        setActiveDropdown(null);
    };

    const isLinkActive = (href: string) => {
        if (href === '/dashboard/super-admins') {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    const isDropdownActive = (item: MenuItem) => {
        if (item.subItems) {
            return item.subItems.some((subItem: SubMenuItem) => pathname.startsWith(subItem.href));
        }
        return false;
    };

    const toggleDropdown = (index: number) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-100">
                <Link href="/" className="flex items-center">
                    <span className="text-xl font-semibold text-gray-900">
                        Real Estate
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto">
                <ul className="space-y-1.5">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            {item.subItems ? (
                                <div>
                                    <button
                                        onClick={() => toggleDropdown(index)}
                                        className={`flex w-full items-center justify-between p-3 rounded-xl transition-all duration-200 ${isDropdownActive(item)
                                            ? 'bg-primary text-white'
                                            : 'hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className={`w-5 h-5 ${isDropdownActive(item)
                                                ? 'text-white'
                                                : 'text-gray-500'
                                                }`} />
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
                                        <ul className="mt-1 ml-4 space-y-1">
                                            {item.subItems.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <Link
                                                        href={subItem.href}
                                                        onClick={handleLinkClick}
                                                        className={`block p-3 text-sm rounded-xl transition-all duration-200 ${isLinkActive(subItem.href)
                                                            ? 'bg-primary-50 text-primary'
                                                            : 'hover:bg-gray-50'
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
                                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${isLinkActive(item.href)
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 ${isLinkActive(item.href) ? 'text-white' : 'text-gray-500'
                                        }`} />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Temperature Widget */}
            <div className="px-6 py-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-secondary-50 to-secondary-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Living Room Temperature</p>
                            <div className="flex items-center gap-2 mt-1">
                                <FaTemperatureHigh className="w-5 h-5 text-secondary-500" />
                                <span className="text-2xl font-semibold text-gray-900">{25}°C</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center">
                                <div className="w-4 h-4 rounded-full bg-secondary-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}