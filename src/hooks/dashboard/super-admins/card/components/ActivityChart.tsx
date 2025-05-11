import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData } from '../types/dashboard';
import { chartOptions } from '../config/chart';

interface ActivityChartProps {
    chartData: ChartData;
    isLoading: boolean;
}

export default function ActivityChart({ chartData, isLoading }: ActivityChartProps) {
    return (
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
    );
} 