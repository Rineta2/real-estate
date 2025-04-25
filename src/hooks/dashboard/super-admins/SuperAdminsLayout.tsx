"use client";

import React from 'react';
import DashboardCards from '@/components/layout/dashboard/DashboardCards';
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
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Revenue',
                data: [30, 40, 35, 50, 45, 60],
                fill: true,
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                borderColor: 'rgba(124, 58, 237, 1)',
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
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

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
                <div className="flex items-center gap-4">
                    <select className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                    </select>
                    <button className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-600 transition-colors">
                        Download Report
                    </button>
                </div>
            </div>

            <DashboardCards />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart */}
                <div className="p-6 bg-white rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
                        <select className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                            <option value="6months">Last 6 Months</option>
                            <option value="year">Last Year</option>
                        </select>
                    </div>
                    <div className="h-[300px]">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="p-6 bg-white rounded-2xl shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((_, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                                    <div className="w-3 h-3 rounded-full bg-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">New property listed</p>
                                    <p className="text-sm text-gray-600">John Doe listed a new property in New York</p>
                                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}