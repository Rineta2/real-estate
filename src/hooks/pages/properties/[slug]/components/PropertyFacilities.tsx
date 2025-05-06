import React from 'react';

import Image from 'next/image';

interface Facility {
    id?: string;
    title: string;
    imageUrl: string;
}

interface PropertyFacilitiesProps {
    details: Facility[];
}

export default function PropertyFacilities({ details }: PropertyFacilitiesProps) {
    if (!details || details.length === 0) return null;

    return (
        <div className='bg-white rounded-lg sm:rounded-xl overflow-hidden'>
            <h2 className="font-semibold text-base sm:text-lg mb-2 p-3 sm:p-4">Facilitas</h2>
            <div className="flex flex-wrap sm:flex-nowrap overflow-hidden border border-gray-200">
                {details.map((detail, idx) => (
                    <div
                        key={detail.id || idx}
                        className={`flex flex-col items-center justify-center flex-1 py-3 sm:py-4 ${idx !== details.length - 1 ? 'border-r border-gray-200' : ''}`}
                    >
                        <Image
                            src={detail.imageUrl}
                            alt={detail.title}
                            width={24}
                            height={24}
                            className="mb-1 sm:mb-2"
                        />
                        <span className="font-medium text-sm sm:text-base">{detail.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
} 