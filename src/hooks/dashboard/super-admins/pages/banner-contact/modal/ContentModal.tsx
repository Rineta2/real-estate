import React from 'react';

import Image from 'next/image';

import { ContentModalProps } from '@/hooks/dashboard/super-admins/pages/banner-contact/types/BannerContact';

export const ContentModal: React.FC<ContentModalProps> = ({
    formData,
    setFormData,
    selectedImage,
    setSelectedImage,
    handleSubmit,
    isSubmitting,
    isEditing
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
                                    </div>
                                </div>

                                {/* Image Upload Section */}
                                <div className="space-y-8">
                                    <div className="bg-gray-50/50 p-6 rounded-2xl space-y-6 border border-gray-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="p-2 bg-indigo-100 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <h4 className="font-semibold text-gray-900">Image Upload</h4>
                                        </div>

                                        <div className="space-y-4">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                                                className="w-full"
                                            />
                                            {(selectedImage || formData.imageUrl) && (
                                                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={selectedImage ? URL.createObjectURL(selectedImage) : formData.imageUrl}
                                                        alt="Preview"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Form Actions */}
                                    <div className="flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const modal = document.getElementById('content_modal') as HTMLDialogElement;
                                                modal?.close();
                                            }}
                                            className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                                        >
                                            {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
    );
};