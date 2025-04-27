import React from 'react';

import Image from 'next/image';

import { ContentModalProps } from '@/hooks/dashboard/super-admins/pages/about/types/About';

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
                                    <div className="bg-gray-50/50 p-6 rounded-2xl space-y-6 border border-[var(--border-color)]">
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
                                                className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-transparent"
                                                required
                                            />
                                        </div>

                                        {/* Description */}
                                        <div className="space-y-2">
                                            <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
                                            <textarea
                                                id="description"
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-transparent resize-none"
                                                rows={4}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Typing Text Section */}
                                    <div className='bg-gray-50/50 p-6 rounded-2xl space-y-6 border border-[var(--border-color)]'>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="p-2 bg-indigo-100 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </div>
                                            <h4 className="font-semibold text-gray-900">Typing Text</h4>
                                        </div>
                                        <div className="space-y-4">
                                            {formData.text.map((item, index) => (
                                                <div key={index} className="space-y-2">
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={item.title}
                                                            onChange={(e) => {
                                                                const newTyping = [...formData.text];
                                                                newTyping[index] = { ...newTyping[index], title: e.target.value };
                                                                setFormData({ ...formData, text: newTyping });
                                                            }}
                                                            className="flex-1 px-4 py-2 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-transparent"
                                                            placeholder="Type title"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newTyping = formData.text.filter((_, i) => i !== index);
                                                                setFormData({ ...formData, text: newTyping });
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
                                                            const newTyping = [...formData.text];
                                                            newTyping[index] = { ...newTyping[index], description: e.target.value };
                                                            setFormData({ ...formData, text: newTyping });
                                                        }}
                                                        className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-transparent resize-none"
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
                                                        text: [...formData.text, { title: '', description: '' }]
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

                                {/* Image Upload Section */}
                                <div className='space-y-8'>
                                    <div className="bg-gray-50/50 p-6 rounded-2xl space-y-6 border border-[var(--border-color)]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="p-2 bg-indigo-100 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <h4 className="font-semibold text-gray-900">Image Upload</h4>
                                        </div>

                                        <div className="space-y-4">
                                            {!(selectedImage || formData.imageUrl) && (
                                                <div className="relative">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                setSelectedImage(file);
                                                            }
                                                        }}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                        id="image-upload"
                                                        required={!formData.imageUrl}
                                                    />
                                                    <label
                                                        htmlFor="image-upload"
                                                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                                    >
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                                            </svg>
                                                            <p className="mb-2 text-sm text-gray-500">
                                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                                            </p>
                                                            <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 2MB)</p>
                                                        </div>
                                                    </label>
                                                </div>
                                            )}
                                            {(selectedImage || formData.imageUrl) && (
                                                <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                                    <Image
                                                        src={selectedImage ? URL.createObjectURL(selectedImage) : formData.imageUrl}
                                                        alt="Preview"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute top-2 right-2 flex gap-2">
                                                        <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-gray-600">
                                                            {selectedImage ? selectedImage.name : 'Current Image'}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedImage(null);
                                                                setFormData({ ...formData, imageUrl: '' });
                                                            }}
                                                            className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-red-600 hover:bg-red-50"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
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