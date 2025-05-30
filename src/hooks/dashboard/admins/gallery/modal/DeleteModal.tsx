import React from 'react';

import { DeleteModalProps } from '@/hooks/dashboard/super-admins/gallery/types/Gallery';

export const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onDelete, isSubmitting, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100]">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to delete this content? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onDelete}
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};