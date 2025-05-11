"use client"

import React, { useState, useEffect, useCallback } from 'react'

import Link from "next/link";

import { FaPlus } from "react-icons/fa";

import { IoIosArrowForward } from "react-icons/io";

import { toast } from 'react-hot-toast'

import dynamic from 'next/dynamic'

import Image from 'next/image'

import { FeaturedContent } from '@/hooks/dashboard/super-admins/layout/featured/types/Featured'

const ContentModal = dynamic(() => import('@/hooks/dashboard/super-admins/layout/featured/modal/ContentModal').then(mod => mod.ContentModal), {
    ssr: false
})

const DeleteModal = dynamic(() => import('@/hooks/dashboard/super-admins/layout/featured/modal/DeleteModal').then(mod => mod.DeleteModal), {
    ssr: false
})

const FeaturedSkelaton = dynamic(() => import('@/hooks/dashboard/super-admins/layout/featured/FeaturedSkelaton').then(mod => mod.default), {
    ssr: false
})

import { useFeaturedData } from '@/hooks/dashboard/super-admins/layout/featured/lib/FetchFeatured'

import Empaty from '@/hooks/dashboard/super-admins/layout/featured/components/Empaty';

const initialFormData: FeaturedContent = {
    title: '',
    text: '',
    description: [],
    count: [],
    imageUrl: [],
};

export default function FeaturedLayout() {
    const {
        isLoading,
        contents,
        isSubmitting,
        setIsSubmitting,
        createContent,
        handleUpdate,
        handleDelete,
    } = useFeaturedData();

    const [formData, setFormData] = useState<FeaturedContent>(initialFormData);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState('');
    const [deleteId, setDeleteId] = useState('');

    const resetForm = useCallback(() => {
        setIsEditing(false);
        setEditingId('');
        setFormData(initialFormData);
    }, []);

    const closeContentModal = useCallback(() => {
        const modal = document.getElementById('content_modal');
        if (modal instanceof HTMLDialogElement) {
            modal.close();
        }
    }, []);

    const closeDeleteModal = useCallback(() => {
        const modal = document.getElementById('delete_modal');
        if (modal instanceof HTMLDialogElement) {
            modal.close();
        }
    }, []);

    const handleSubmit = useCallback(async () => {
        try {
            setIsSubmitting(true);

            if (isEditing && editingId) {
                await handleUpdate(editingId, formData);
                toast.success('Content updated successfully!');
            } else {
                await createContent(formData, formData.imageUrl);
                toast.success('Content created successfully!');
            }

            // Clean up blob URLs after successful submission
            formData.imageUrl.forEach(img => {
                if (img.images.startsWith('blob:')) {
                    URL.revokeObjectURL(img.images);
                }
            });

            // Reset form and close modal
            resetForm();
            closeContentModal();
        } catch (error) {
            toast.error(`Failed to save content: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, isEditing, editingId, handleUpdate, createContent, resetForm, closeContentModal, setIsSubmitting]);

    const handleDeleteConfirm = useCallback(async () => {
        if (deleteId) {
            await handleDelete(deleteId);
            closeDeleteModal();
        }
    }, [deleteId, handleDelete, closeDeleteModal]);

    // Clean up blob URLs when component unmounts
    useEffect(() => {
        return () => {
            formData.imageUrl.forEach(img => {
                if (img.images.startsWith('blob:')) {
                    URL.revokeObjectURL(img.images);
                }
            });
        };
    }, [formData.imageUrl]);

    if (isLoading) {
        return <FeaturedSkelaton />;
    }

    return (
        <section className="min-h-full">
            <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-primary-50 rounded-md mb-10" >
                <div>
                    <h1 className="text-2xl font-bold">Featured</h1>
                    <ul className="flex items-center gap-2">
                        <li className="text-sm font-medium"><Link href="/dashboard/super-admins/super-admin">Dashboard</Link></li>
                        <li className="text-sm font-medium"><IoIosArrowForward className="w-4 h-4" /></li>
                        <li className="text-sm font-medium">Layout</li>
                        <li className="text-sm font-medium"><IoIosArrowForward className="w-4 h-4" /></li>
                        <li className="text-sm font-medium">Featured</li>
                    </ul>
                </div>

                {
                    contents.length === 0 && (
                        <div className="flex items-center gap-2">
                            <button className="bg-primary-500 text-white px-4 py-2 rounded-md flex items-center gap-2" onClick={() => {
                                const modal = document.getElementById('content_modal');
                                if (modal instanceof HTMLDialogElement) {
                                    modal.showModal();
                                }
                            }}>
                                <FaPlus className="w-4 h-4" />
                                <span>Create</span>
                            </button>
                        </div>
                    )
                }
            </div >

            {
                contents.length === 0 ? (
                    <Empaty />
                ) : (
                    contents.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                        >
                            <div className="flex flex-col h-full">
                                {/* Image Section */}
                                <div className="relative w-full h-auto overflow-hidden">
                                    <div className="flex flex-wrap gap-4 p-4">
                                        {item.imageUrl.map((img, imgIndex) => (
                                            <div key={imgIndex} className="relative w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)] aspect-video">
                                                <Image
                                                    src={img.images}
                                                    alt={`About image ${imgIndex + 1}`}
                                                    fill
                                                    priority
                                                    className="object-cover rounded-lg"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 flex-grow space-y-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                    <div className="space-y-3">
                                        {item.description.map((desc, idx) => (
                                            <div key={idx}>
                                                <h4 className="text-lg font-bold text-gray-900 mb-2">{desc.title}</h4>
                                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{desc.description}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8'>
                                        {
                                            item.count.map((item, index) => {
                                                return (
                                                    <div key={index} className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                                                        <h3 className="text-indigo-600 text-sm font-medium mb-2">{item.title}</h3>
                                                        <span className="text-2xl font-bold text-gray-900">+{item.number}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                                    <button
                                        onClick={() => {
                                            setDeleteId(item.id || '');
                                            const modal = document.getElementById('delete_modal');
                                            if (modal instanceof HTMLDialogElement) {
                                                modal.showModal();
                                            }
                                        }}
                                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => {
                                            setFormData(item);
                                            setIsEditing(true);
                                            setEditingId(item.id || '');
                                            const modal = document.getElementById('content_modal');
                                            if (modal instanceof HTMLDialogElement) {
                                                modal.showModal();
                                            }
                                        }}
                                        className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )
            }

            < ContentModal
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isEditing={isEditing}
            />

            <DeleteModal
                onDelete={handleDeleteConfirm}
                isSubmitting={isSubmitting}
                onClose={closeDeleteModal}
            />
        </section >
    )
}
