import React from 'react';

import { ContentModalProps } from '@/hooks/dashboard/super-admins/layout/faqs/types/Faqs';

export const ContentModal: React.FC<ContentModalProps> = ({
    formData,
    setFormData,
    handleSubmit,
    isSubmitting,
    isEditing,
}) => {
    return (
        <dialog id="content_modal" className="modal">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <form
                            method="dialog"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-8">
                                    {/* Basic Information Section */}
                                    <div className="bg-gray-50/50 p-6 rounded-2xl space-y-6 border border-gray-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="p-2 bg-indigo-100 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <h4 className="font-semibold text-gray-900">Basic Information</h4>
                                        </div>

                                        {/* Title Input */}
                                        <div className="space-y-2">
                                            <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
                                            <input
                                                type="text"
                                                id="title"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        {/* Description Input */}
                                        <div className="space-y-2">
                                            <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
                                            <textarea
                                                id="description"
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                                rows={4}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Typing Text Section */}
                                <div className='bg-gray-50/50 p-6 rounded-2xl space-y-6 border border-gray-100'>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="p-2 bg-indigo-100 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-gray-900">Typing Text</h4>
                                    </div>
                                    <div className="space-y-4">
                                        {formData.faqs.map((item, index) => (
                                            <div key={index} className="space-y-2">
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={item.title}
                                                        onChange={(e) => {
                                                            const newTyping = [...formData.faqs];
                                                            newTyping[index] = { ...newTyping[index], title: e.target.value };
                                                            setFormData({ ...formData, faqs: newTyping });
                                                        }}
                                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        placeholder="Type title"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newTyping = formData.faqs.filter((_, i) => i !== index);
                                                            setFormData({ ...formData, faqs: newTyping });
                                                        }}
                                                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <textarea
                                                    value={item.description}
                                                    onChange={(e) => {
                                                        const newTyping = [...formData.faqs];
                                                        newTyping[index] = { ...newTyping[index], description: e.target.value };
                                                        setFormData({ ...formData, faqs: newTyping });
                                                    }}
                                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                                    placeholder="Type description"
                                                    rows={2}
                                                />
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFormData({
                                                    ...formData,
                                                    faqs: [...formData.faqs, { title: '', description: '' }]
                                                });
                                            }}
                                            className="w-full px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg border border-indigo-200 flex items-center justify-center gap-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                            Add Typing Text
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const modal = document.getElementById('content_modal') as HTMLDialogElement;
                                        modal.close();
                                    }}
                                    className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2 min-w-[100px]"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {isEditing ? 'Updating...' : 'Saving...'}
                                        </>
                                    ) : (
                                        isEditing ? 'Update' : 'Create'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
    );
};