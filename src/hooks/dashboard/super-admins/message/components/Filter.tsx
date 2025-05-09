import React from 'react'

import { FilterProps } from '@/hooks/dashboard/super-admins/message/types/Message'

import { FaPlus, FaMinus } from "react-icons/fa"

export default function Filter({
    showFilters,
    toggleFilters,
    propertyId,
    contactMethodFilter,
    statusFilter,
    properties,
    handlePropertyChange,
    handleContactMethodChange,
    handleStatusChange
}: FilterProps) {
    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 px-3 sm:px-6 border-b border-gray-200 bg-primary-50 rounded-md mb-6">
                <div className="mb-3 sm:mb-0">
                    <h1 className="text-xl sm:text-2xl font-bold">Message</h1>
                    <ul className="flex items-center gap-2">
                        <li className="text-xs sm:text-sm font-medium"><a href="/dashboard/super-admins/super-admin">Dashboard</a></li>
                        <li className="text-xs sm:text-sm font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
                                <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                            </svg>
                        </li>
                        <li className="text-xs sm:text-sm font-medium">Message</li>
                    </ul>
                </div>

                <div className="w-full sm:w-auto">
                    <button
                        className="w-full sm:w-auto bg-primary-500 text-white px-3 sm:px-4 py-2 rounded-md flex items-center justify-center sm:justify-start gap-2"
                        onClick={toggleFilters}
                    >
                        {showFilters ? (
                            <>
                                <FaMinus className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="text-sm sm:text-base">Hide Filter</span>
                            </>
                        ) : (
                            <>
                                <FaPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="text-sm sm:text-base">Show Filter</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {showFilters && (
                <div className="bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-3xl border border-gray-100/50 p-4 sm:p-6 transition-all duration-300 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="filter-group">
                            <label htmlFor="property-select" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Property: </label>
                            <select
                                id="property-select"
                                value={propertyId}
                                onChange={handlePropertyChange}
                                className="block w-full px-3 sm:px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-primary focus:border-primary text-sm"
                            >
                                <option value="all">All Properties</option>
                                {properties.map(property => (
                                    <option key={property.id} value={property.slug}>
                                        {property.title || property.slug}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="contact-method-select" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Contact Method: </label>
                            <select
                                id="contact-method-select"
                                value={contactMethodFilter}
                                onChange={handleContactMethodChange}
                                className="block w-full px-3 sm:px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-primary focus:border-primary text-sm"
                            >
                                <option value="all">All Methods</option>
                                <option value="whatsapp">WhatsApp</option>
                                <option value="phone">Phone</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="status-select" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Status: </label>
                            <select
                                id="status-select"
                                value={statusFilter}
                                onChange={handleStatusChange}
                                className="block w-full px-3 sm:px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-primary focus:border-primary text-sm"
                            >
                                <option value="all">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="replied">Replied</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
