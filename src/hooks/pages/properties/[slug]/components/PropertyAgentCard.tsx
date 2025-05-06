import React from 'react';

import Image from 'next/image';

import Link from 'next/link';

interface Agent {
    name?: string;
    photoURL?: string;
}

interface PropertyAgentCardProps {
    agent: Agent;
}

export default function PropertyAgentCard({ agent }: PropertyAgentCardProps) {
    return (
        <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 flex flex-col items-center">
            <div className="flex items-center gap-2 sm:gap-3 w-full mb-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 relative">
                    <Image
                        src={agent?.photoURL || '/default-avatar.jpg'}
                        alt={agent?.name || 'Agent'}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">{agent?.name || 'Agent'}</span>
                    <Link href="#" className="text-xs sm:text-sm text-yellow-600 font-medium hover:underline">View profile</Link>
                </div>
            </div>
        </div>
    );
} 