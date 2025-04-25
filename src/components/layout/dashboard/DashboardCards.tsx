import React from 'react';

import { HiUsers, HiCurrencyDollar, HiHome, HiChartBar } from 'react-icons/hi';

interface DashboardCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, color, trend }) => {
    return (
        <div className={`p-6 rounded-2xl ${color}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-gray-900">{value}</h3>
                    {trend && (
                        <p className={`mt-2 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                        </p>
                    )}
                </div>
                <div className="p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm">
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default function DashboardCards() {
    const cards = [
        {
            title: 'Total Users',
            value: '2,543',
            icon: <HiUsers className="w-6 h-6 text-primary-500" />,
            color: 'bg-gradient-to-r from-primary-50 to-primary-100',
            trend: {
                value: 12.5,
                isPositive: true
            }
        },
        {
            title: 'Revenue',
            value: '$45,234',
            icon: <HiCurrencyDollar className="w-6 h-6 text-secondary-500" />,
            color: 'bg-gradient-to-r from-secondary-50 to-secondary-100',
            trend: {
                value: 8.2,
                isPositive: true
            }
        },
        {
            title: 'Properties',
            value: '1,234',
            icon: <HiHome className="w-6 h-6 text-green-500" />,
            color: 'bg-gradient-to-r from-green-50 to-green-100',
            trend: {
                value: 5.1,
                isPositive: true
            }
        },
        {
            title: 'Conversion Rate',
            value: '3.42%',
            icon: <HiChartBar className="w-6 h-6 text-blue-500" />,
            color: 'bg-gradient-to-r from-blue-50 to-blue-100',
            trend: {
                value: 2.4,
                isPositive: false
            }
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
                <DashboardCard key={index} {...card} />
            ))}
        </div>
    );
} 