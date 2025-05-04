import React from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Timestamp } from 'firebase/firestore'
import { Properties } from '../types/properties'

interface ViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    property: Properties | undefined;
}

export default function ViewModal({ isOpen, onClose, property }: ViewModalProps) {
    if (!isOpen || !property) return null;

    const formatTimestamp = (timestamp: Timestamp | Date | undefined): string => {
        if (!timestamp) return '';
        const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
        return format(date, 'PPpp', { locale: id });
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-7xl w-full overflow-hidden max-h-[95vh] sm:max-h-[90vh] flex flex-col">
                {/* Hero Section with Image */}
                <div className="relative aspect-[6/5] w-full group overflow-hidden">
                    <Image
                        src={property.thumbnail || '/placeholder.png'}
                        alt={property.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
                        <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-wrap items-center gap-2">
                                    <div className={`
                                        inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium
                                        backdrop-blur-md transition-all duration-300
                                        ${property.status === 'Publish'
                                            ? 'bg-green-100/80 text-green-700 hover:bg-green-200/80'
                                            : 'bg-yellow-100/80 text-yellow-700 hover:bg-yellow-200/80'}
                                    `}>
                                        <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1.5 sm:mr-2 ${property.status === 'Publish' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                        {property.status}
                                    </div>
                                    <div className={`
                                        inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium
                                        backdrop-blur-md transition-all duration-300
                                        ${property.statusProject === 'Selesai'
                                            ? 'bg-green-100/80 text-green-700 hover:bg-green-200/80'
                                            : property.statusProject === 'Coming Soon'
                                                ? 'bg-blue-100/80 text-blue-700 hover:bg-blue-200/80'
                                                : 'bg-yellow-100/80 text-yellow-700 hover:bg-yellow-200/80'}
                                    `}>
                                        <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1.5 sm:mr-2 ${property.statusProject === 'Selesai' ? 'bg-green-500' : property.statusProject === 'Coming Soon' ? 'bg-blue-500' : 'bg-yellow-500'}`}></span>
                                        {property.statusProject}
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="btn btn-circle btn-sm bg-white/10 backdrop-blur-md border-0 hover:bg-white/20 text-white"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="text-white">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">{property.title}</h2>
                                <p className="text-white/80 line-clamp-2 text-sm sm:text-base">{property.description}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content - Scrollable */}
                <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 md:space-y-10 overflow-y-auto flex-grow">
                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
                            {/* Property Details */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Property Details
                                </h3>
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                        <span className="text-sm sm:text-base text-gray-500">Type:</span>
                                        <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                                            {property.type}
                                        </span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                        <span className="text-sm sm:text-base text-gray-500">Location:</span>
                                        <div className="flex flex-col gap-2">
                                            {property.locations.map((location, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs sm:text-sm font-medium">
                                                        {location.city}, {location.province}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Property Details */}
                            {property.details && property.details.length > 0 && (
                                <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        Property Details
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                                        {property.details.map((detail, index) => (
                                            <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                                <div className="relative aspect-square w-6 h-6 sm:w-8 sm:h-8">
                                                    <Image
                                                        src={detail.imageUrl}
                                                        alt={detail.title}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <span className="text-xs sm:text-sm font-medium text-gray-700">{detail.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Description */}
                            {property.description && (
                                <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Description
                                    </h3>
                                    <div className="prose max-w-none">
                                        <p className="text-sm sm:text-base text-gray-600">{property.description}</p>
                                    </div>
                                </div>
                            )}

                            {/* Content */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                                    </svg>
                                    Content
                                </h3>
                                <div className='prose prose-sm sm:prose-base lg:prose-lg max-w-none 
                                prose-headings:text-gray-900 
                                prose-p:text-gray-700 
                                prose-strong:text-gray-900 
                                prose-a:text-blue-600 hover:prose-a:text-blue-800
                                
                                [&_h3]:text-base sm:[&_h3]:text-lg md:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2 sm:[&_h3]:mb-3 md:[&_h3]:mb-4 [&_h3]:mt-3 sm:[&_h3]:mt-4 md:[&_h3]:mt-6
                                
                                [&_p]:mb-2 sm:[&_p]:mb-3 md:[&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-xs sm:[&_p]:text-sm md:[&_p]:text-base
                                [&_p:empty]:hidden
                                
                                [&_ol]:pl-0 [&_ol]:list-none [&_ol]:space-y-1 sm:[&_ol]:space-y-2 md:[&_ol]:space-y-3 [&_ol]:my-2 sm:[&_ol]:my-3 md:[&_ol]:my-4
                                [&_ul]:pl-0 [&_ul]:list-none [&_ul]:space-y-1 sm:[&_ul]:space-y-2 md:[&_ul]:space-y-3 [&_ul]:my-2 sm:[&_ul]:my-3 md:[&_ul]:my-4
                                
                                [&_li]:relative [&_li]:pl-3 sm:[&_li]:pl-4 md:[&_li]:pl-5 [&_li]:text-gray-700 [&_li]:text-xs sm:[&_li]:text-sm md:[&_li]:text-base
                                
                                [&_li[data-list=bullet]]:before:content-["•"]
                                [&_li[data-list=bullet]]:before:absolute
                                [&_li[data-list=bullet]]:before:left-0
                                [&_li[data-list=bullet]]:before:text-gray-500
                                [&_li[data-list=bullet]]:before:font-bold
                                [&_li[data-list=bullet]]:before:text-sm sm:[&_li[data-list=bullet]]:before:text-base md:[&_li[data-list=bullet]]:before:text-lg
                                
                                [&_li[data-list=ordered]]:before:absolute
                                [&_li[data-list=ordered]]:before:left-0
                                [&_li[data-list=ordered]]:before:text-gray-700
                                [&_li[data-list=ordered]]:before:font-semibold
                                [&_li[data-list=ordered]]:before:counter-reset
                                [&_li[data-list=ordered]]:before:content-[counter(list-item)"."]
                                
                                [&_strong]:text-gray-900 [&_strong]:font-semibold
                                
                                [&_.ql-ui]:hidden
                                
                                [&_a]:text-blue-600 [&_a]:no-underline hover:[&_a]:underline
                                
                                [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-3 sm:[&_blockquote]:pl-4 [&_blockquote]:my-3 sm:[&_blockquote]:my-4 md:[&_blockquote]:my-6 [&_blockquote]:italic [&_blockquote]:text-gray-700 [&_blockquote]:text-sm sm:[&_blockquote]:text-base md:[&_blockquote]:text-lg
                                
                                [&_img]:my-3 sm:[&_img]:my-4 md:[&_img]:my-6 [&_img]:rounded-lg sm:[&_img]:rounded-xl [&_img]:shadow-md sm:[&_img]:shadow-lg
                                
                                [&_pre]:bg-gray-100 [&_pre]:p-2 sm:[&_pre]:p-3 md:[&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto
                                [&_code]:bg-gray-100 [&_code]:px-1.5 sm:px-2 [&_code]:py-0.5 sm:py-1 [&_code]:rounded [&_code]:text-xs sm:[&_code]:text-sm
                                [&_pre_code]:bg-transparent [&_pre_code]:p-0
                                
                                [&_table]:w-full [&_table]:border-collapse [&_table]:my-3 sm:[&_table]:my-4
                                [&_th]:bg-gray-100 [&_th]:p-1.5 sm:p-2 md:p-3 [&_th]:text-left [&_th]:border [&_th]:border-gray-300 [&_th]:text-xs sm:[&_th]:text-sm md:[&_th]:text-base
                                [&_td]:border [&_td]:border-gray-300 [&_td]:text-xs sm:[&_td]:text-sm md:[&_td]:text-base
                                
                                [&_hr]:my-4 sm:[&_hr]:my-6 md:[&_hr]:my-8 [&_hr]:border-gray-200'>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: property.content || ''
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4 sm:space-y-6 md:space-y-8">
                            {/* Author Information */}
                            {property.author && (
                                <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Author
                                    </h3>
                                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                                        <div className="relative aspect-square w-12 h-12 sm:w-16 sm:h-16">
                                            <Image
                                                src={property.author.photoURL || '/placeholder-avatar.png'}
                                                alt={property.author.name}
                                                fill
                                                className="rounded-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{property.author.name}</h4>
                                            <p className="text-xs sm:text-sm text-gray-500">{property.author.role}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Timeline */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Timeline
                                </h3>
                                <div className="space-y-4 sm:space-y-6">
                                    <div className="flex items-start gap-2 sm:gap-3">
                                        <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs sm:text-sm font-medium text-gray-900">Created</p>
                                            <p className="text-xs sm:text-sm text-gray-500">{formatTimestamp(property.createdAt)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2 sm:gap-3">
                                        <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs sm:text-sm font-medium text-gray-900">Last Updated</p>
                                            <p className="text-xs sm:text-sm text-gray-500">{formatTimestamp(property.updatedAt)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Property Images */}
                            {property.images && property.images.length > 0 && (
                                <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Property Images
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                        {property.images.map((image, index) => (
                                            <div
                                                key={index}
                                                className="relative aspect-[6/5] rounded-xl overflow-hidden group cursor-pointer"
                                            >
                                                <Image
                                                    src={image}
                                                    alt={`Property image ${index + 1}`}
                                                    fill
                                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
