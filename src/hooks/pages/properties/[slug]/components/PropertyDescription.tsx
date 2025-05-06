import React from 'react';

interface PropertyDescriptionProps {
    description: string;
}

export default function PropertyDescription({ description }: PropertyDescriptionProps) {
    if (!description) return null;

    return (
        <div className="mt-6 sm:mt-8 md:mt-10">
            <div className='bg-white rounded-lg sm:rounded-xl overflow-hidden p-3 sm:p-4'>
                <h2 className="font-semibold text-base sm:text-lg mb-2">Description</h2>
                <p className="text-sm sm:text-base">{description}</p>
            </div>
        </div>
    );
} 