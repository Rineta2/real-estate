import React from 'react'

export default function Empaty() {
    return (
        <div
            className="bg-white rounded-2xl shadow-sm p-8 text-center"
        >
            <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">No Content Yet</h3>
                <p className="text-gray-600">Create your first hero section content to get started.</p>
            </div>
        </div>
    )
}
