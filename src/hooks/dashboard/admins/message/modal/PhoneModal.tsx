import React from 'react'

import { PhoneModalProps } from "@/hooks/dashboard/admins/message/types/Message"

export default function PhoneModal({ isOpen, onClose, selectedMessage, handleMakeCall }: PhoneModalProps) {
    if (!isOpen || !selectedMessage) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative overflow-hidden">
                <button
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-gray-600"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 pr-6">Call {selectedMessage.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Property: {selectedMessage.propertyId}</p>

                <div className="mb-4 sm:mb-5 p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <p className="text-sm sm:text-base font-medium break-all">{selectedMessage.phone}</p>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 font-medium mb-1">Message:</p>
                    <p className="text-xs sm:text-sm text-gray-600 break-words">&ldquo;{selectedMessage.message}&rdquo;</p>
                </div>

                <div className="flex justify-end space-x-2 sm:space-x-3">
                    <button
                        className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-1 sm:gap-2 text-sm"
                        onClick={handleMakeCall}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Make Call
                    </button>
                </div>
            </div>
        </div>
    )
}
