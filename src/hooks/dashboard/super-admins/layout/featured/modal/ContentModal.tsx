import React from 'react';

import Image from 'next/image';
import { toast } from 'react-hot-toast';

import { ContentModalProps } from '@/hooks/dashboard/super-admins/layout/featured/types/Featured';

export const ContentModal: React.FC<ContentModalProps> = ({
    formData,
    setFormData,
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

                                        {/* Text Input */}
                                        <div className="space-y-2">
                                            <label htmlFor="text" className="text-sm font-medium text-gray-700">Text</label>
                                            <textarea
                                                id="text"
                                                value={formData.text}
                                                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                                className="w-full px-4 py-2 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-transparent"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Description Section */}
                                    <div className='bg-gray-50/50 p-6 rounded-2xl space-y-6 border border-[var(--border-color)]'>
                                        <div className="space-y-2">
                                            <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
                                            <div className="space-y-4">
                                                {formData.description.map((item, index) => (
                                                    <div key={index} className="space-y-2">
                                                        <div className="flex flex-col gap-2">
                                                            <input
                                                                type="text"
                                                                value={item.title}
                                                                onChange={(e) => {
                                                                    const newDescription = [...formData.description];
                                                                    newDescription[index] = { ...newDescription[index], title: e.target.value };
                                                                    setFormData({ ...formData, description: newDescription });
                                                                }}
                                                                className="flex-1 px-4 py-2 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-transparent"
                                                                placeholder="Title"
                                                            />
                                                            <textarea
                                                                value={item.description}
                                                                onChange={(e) => {
                                                                    const newDescription = [...formData.description];
                                                                    newDescription[index] = { ...newDescription[index], description: e.target.value };
                                                                    setFormData({ ...formData, description: newDescription });
                                                                }}
                                                                className="flex-1 px-4 py-2 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-transparent resize-none"
                                                                placeholder="Type description"
                                                                rows={3}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newDescription = formData.description.filter((_, i) => i !== index);
                                                                    setFormData({ ...formData, description: newDescription });
                                                                }}
                                                                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData({
                                                            ...formData,
                                                            description: [...formData.description, { title: '', description: '' }]
                                                        });
                                                    }}
                                                    className="w-full px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg border border-indigo-200 flex items-center justify-center gap-2"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                                    </svg>
                                                    Add Description
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Count Section */}
                                    <div className='bg-gray-50/50 p-6 rounded-2xl space-y-6 border border-[var(--border-color)]'>
                                        <div className="space-y-2">
                                            <label htmlFor="count" className="text-sm font-medium text-gray-700">Count</label>
                                            <div className="space-y-4">
                                                {formData.count.map((item, index) => (
                                                    <div key={index} className="space-y-2">
                                                        <div className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                value={item.title}
                                                                onChange={(e) => {
                                                                    const newCount = [...formData.count];
                                                                    newCount[index] = { ...newCount[index], title: e.target.value };
                                                                    setFormData({ ...formData, count: newCount });
                                                                }}
                                                                className="flex-1 px-4 py-2 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-transparent"
                                                                placeholder="Title"
                                                            />
                                                            <input
                                                                type="number"
                                                                value={item.number}
                                                                onChange={(e) => {
                                                                    const newCount = [...formData.count];
                                                                    newCount[index] = { ...newCount[index], number: parseInt(e.target.value) || 0 };
                                                                    setFormData({ ...formData, count: newCount });
                                                                }}
                                                                className="w-24 px-4 py-2 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-transparent"
                                                                placeholder="Number"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newCount = formData.count.filter((_, i) => i !== index);
                                                                    setFormData({ ...formData, count: newCount });
                                                                }}
                                                                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData({
                                                            ...formData,
                                                            count: [...formData.count, { title: '', number: 0 }]
                                                        });
                                                    }}
                                                    className="w-full px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg border border-indigo-200 flex items-center justify-center gap-2"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                                    </svg>
                                                    Add Count
                                                </button>
                                            </div>
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
                                            {/* Display existing images */}
                                            <div className="space-y-4">
                                                <h5 className="text-sm font-medium text-gray-700">Current Images</h5>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {formData.imageUrl.map((img, index) => (
                                                        <div key={index} className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                                            {img.images && (
                                                                <Image
                                                                    src={img.images}
                                                                    alt={`Image ${index + 1}`}
                                                                    fill
                                                                    className="object-cover"
                                                                    unoptimized={img.images.startsWith('blob:')}
                                                                />
                                                            )}
                                                            <div className="absolute top-2 right-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        const newImages = formData.imageUrl.filter((_, i) => i !== index);
                                                                        setFormData({ ...formData, imageUrl: newImages });
                                                                        if (img.images?.startsWith('blob:')) {
                                                                            URL.revokeObjectURL(img.images);
                                                                        }
                                                                    }}
                                                                    className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-red-600 hover:bg-red-50"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Add Image Button */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newFileInput = document.createElement('input');
                                                    newFileInput.type = 'file';
                                                    newFileInput.accept = 'image/*';
                                                    newFileInput.multiple = true;
                                                    newFileInput.style.display = 'none';
                                                    newFileInput.id = 'image-upload-new';

                                                    newFileInput.addEventListener('change', (e) => {
                                                        const files = (e.target as HTMLInputElement).files;
                                                        if (files && files.length > 0) {
                                                            Array.from(files).forEach(file => {
                                                                if (file.size > 5 * 1024 * 1024) {
                                                                    toast.error(`Image ${file.name} is too large. Maximum size is 5MB`);
                                                                    return;
                                                                }

                                                                if (!file.type.startsWith('image/')) {
                                                                    toast.error(`File ${file.name} is not an image`);
                                                                    return;
                                                                }

                                                                setFormData({
                                                                    ...formData,
                                                                    imageUrl: [...formData.imageUrl, {
                                                                        images: URL.createObjectURL(file),
                                                                        file: file
                                                                    }]
                                                                });
                                                            });
                                                        }
                                                        document.body.removeChild(newFileInput);
                                                    });

                                                    document.body.appendChild(newFileInput);
                                                    newFileInput.click();
                                                }}
                                                className="w-full px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg border border-indigo-200 flex items-center justify-center gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                                </svg>
                                                Add Images
                                            </button>

                                            {/* Image Upload Info */}
                                            <div className="text-xs text-gray-500 mt-2">
                                                <p>• You can select multiple images at once</p>
                                                <p>• Images will be uploaded when you save the content</p>
                                                <p>• Maximum file size: 5MB per image</p>
                                                <p>• Supported formats: JPG, PNG, GIF</p>
                                            </div>
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