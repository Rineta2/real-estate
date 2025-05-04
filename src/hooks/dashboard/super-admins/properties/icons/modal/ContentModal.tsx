import React from 'react'

import Image from 'next/image'

import { ContentModalProps } from '@/hooks/dashboard/super-admins/gallery/types/Gallery'

export default function ContentModal({
    isOpen,
    onClose,
    onSubmit,
    formData,
    setFormData,
    selectedImage,
    setSelectedImage,
    editingItem,
    isSubmitting
}: ContentModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
                    <form
                        onSubmit={onSubmit}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 gap-8">
                            {/* Image Upload Section */}
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
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;
                                            setFormData({ image: file });
                                            setSelectedImage(file);
                                        }}
                                        className="w-full"
                                    />
                                    {(selectedImage || editingItem?.imageUrl) && (
                                        <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                                            <Image
                                                src={selectedImage ? URL.createObjectURL(selectedImage) : editingItem?.imageUrl || ''}
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
                                    onClick={onClose}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !formData.image}
                                    className="px-4 py-2 text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Saving...' : editingItem ? 'Update' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
