import React from 'react';

import Link from 'next/link';

import { IoMdArrowRoundBack } from "react-icons/io";

import { PropertiesType } from "@/components/ui/properties/types/Properties";

interface PropertyHeaderProps {
    property: PropertiesType;
}

export default function PropertyHeader({ property }: PropertyHeaderProps) {
    return (
        <div className='flex flex-col gap-3 sm:gap-4 md:gap-5 mb-6 sm:mb-8'>
            <div className='flex items-center gap-2 mb-4 sm:mb-6 md:mb-8'>
                <IoMdArrowRoundBack className="text-lg sm:text-xl" />
                <Link href={"/properties"} className="text-sm sm:text-base font-bold hover:text-blue-600 transition-colors">Back</Link>
            </div>

            <div className='flex flex-row justify-between bg-gradient-to-r from-primary to-primary/90 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 shadow-lg'>
                <div className='flex flex-col gap-3 sm:gap-4 md:gap-5 mb-4 lg:mb-0'>
                    <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold max-w-4xl leading-tight sm:leading-snug md:leading-normal capitalize tracking-tight'>{property?.title}</h1>
                    <div className='flex flex-wrap items-center gap-2 sm:gap-3 text-white/90'>
                        <span className='flex items-center gap-1.5 sm:gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {property?.province}
                        </span>
                        <span className='w-1 h-1 bg-white/50 rounded-full'></span>
                        <span className='flex items-center gap-1.5 sm:gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            {property?.city}
                        </span>
                    </div>
                </div>

                <div className='flex flex-wrap gap-2 sm:gap-3 md:gap-4 items-start'>
                    <span className='bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full flex items-center gap-1.5 sm:gap-2 shadow-lg capitalize border border-white/20 hover:bg-white/20 transition-colors'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        {property?.type}
                    </span>
                    <span className={`px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2 shadow-lg backdrop-blur-sm border border-white/20 ${property?.statusProject === 'Coming Soon'
                        ? 'bg-yellow-500/20 text-yellow-200 hover:bg-yellow-500/30'
                        : property?.statusProject === 'Sedang Berjalan'
                            ? 'bg-blue-500/20 text-blue-200 hover:bg-blue-500/30'
                            : 'bg-green-500/20 text-green-200 hover:bg-green-500/30'
                        } transition-colors`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {property?.statusProject}
                    </span>
                </div>
            </div>
        </div>
    );
} 