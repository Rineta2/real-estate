import React from 'react';

import { usePathname } from 'next/navigation';

import Link from 'next/link';

import { menuItems } from '@/components/layout/dashboard/admins/data/Header';

import { FaTemperatureHigh } from "react-icons/fa";

interface HeaderProps {
    onSidebarToggle: (isOpen: boolean) => void;
}

export default function SuperAdminHeader({ onSidebarToggle }: HeaderProps) {
    const pathname = usePathname();
    const [temperature, setTemperature] = React.useState<number | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchTemperature = async () => {
            try {
                const response = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=Jakarta`
                );
                const data = await response.json();
                setTemperature(data.current.temp_c);
            } catch (error) {
                console.error('Error fetching temperature:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTemperature();
    }, []);

    const handleLinkClick = () => {
        onSidebarToggle(false);
    };

    const isLinkActive = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        if (href === '/dashboard/admins') {
            return pathname === href;
        }
        return pathname === href || pathname.startsWith(href + '/');
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-100">
                <span className="text-xl font-semibold text-gray-900">
                    Real Estate
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto">
                <ul className="space-y-4">
                    {menuItems.map((item, index) => (
                        <li key={index}>
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
                                <span className="text-2xl font-semibold text-gray-900">
                                    {loading ? 'Loading...' : temperature ? `${Math.round(temperature)}°C` : 'N/A'}
                                </span>
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