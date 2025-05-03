import React from 'react';

import { DeleteModalProps } from '@/hooks/dashboard/super-admins/properties/locations/types/schema';

export const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onClose, isDeleting }) => {
    return (
        <dialog id="delete_modal" className="modal">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Deletion</h3>
                    <p className="text-gray-600 mb-6">Are you sure you want to delete this content? This action cannot be undone.</p>
                    <div className="flex justify-end gap-3">
                        <button
                            className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
                            onClick={onClose}
                            disabled={isDeleting}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={onConfirm}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
};