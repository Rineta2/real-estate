import { DeleteConfirmationModalProps } from '@/hooks/dashboard/super-admins/accounts/users/types/Users';

export default function DeleteConfirmationModal({
    show,
    user,
    isDeleting,
    onConfirm,
    onClose
}: DeleteConfirmationModalProps) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Delete User</h2>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete {user?.displayName} ({user?.email})? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(user?.uid || '')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <div className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Deleting...
                            </div>
                        ) : (
                            'Delete'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}