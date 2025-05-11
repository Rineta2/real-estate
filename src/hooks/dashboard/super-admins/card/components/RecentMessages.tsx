import React from 'react';

import { RecentMessagesProps } from '@/hooks/dashboard/super-admins/card/types/dashboard';

export default function RecentMessages({ messages }: RecentMessagesProps) {
    return (
        <div className="p-4 sm:p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 h-[420px] flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Recent Messages</h2>
            <div className="space-y-4 sm:space-y-6 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                {messages.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No recent messages</p>
                ) : (
                    messages.map((message) => (
                        <div key={message.id} className="flex items-start gap-3 sm:gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                                <div className="w-3 h-3 rounded-full bg-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{message.name}</p>
                                <p className="text-sm text-gray-600 line-clamp-2 mt-1">{message.message}</p>
                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                    <span className="text-xs text-gray-500">
                                        {new Date(message.timestamp).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                        {message.contactMethod}
                                    </span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${message.status === 'replied'
                                        ? 'bg-green-100 text-green-600'
                                        : 'bg-yellow-100 text-yellow-600'
                                        }`}>
                                        {message.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
} 