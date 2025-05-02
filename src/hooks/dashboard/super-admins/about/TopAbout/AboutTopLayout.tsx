"use client"

import React, { useState, useEffect, useCallback } from 'react'

import { toast } from 'react-hot-toast'

import dynamic from 'next/dynamic'

import Image from 'next/image'

import Link from 'next/link'

import { AboutTopContent } from '@/hooks/dashboard/super-admins/about/TopAbout/types/TopAbout'

const ContentModal = dynamic(() => import('@/hooks/dashboard/super-admins/about/TopAbout/modal/ContentModal').then(mod => mod.ContentModal), {
    ssr: false
})

const DeleteModal = dynamic(() => import('@/hooks/dashboard/super-admins/about/TopAbout/modal/DeleteModal').then(mod => mod.DeleteModal), {
    ssr: false
})

const AboutSkelaton = dynamic(() => import('@/hooks/dashboard/super-admins/about/TopAbout/AboutTopSkelaton').then(mod => mod.default), {
    ssr: false
})

import { useAboutData } from '@/hooks/dashboard/super-admins/about/TopAbout/lib/FetchTopAbout'

import { IoIosArrowForward } from 'react-icons/io'

const initialFormData: AboutTopContent = {
    title: '',
    imageUrl: ''
};

export default function AboutLayout() {
    const {
        isLoading,
        contents,
        isSubmitting,
        setIsSubmitting,
        handleImageUpload,
        createContent,
        handleUpdate,
        handleDelete,
    } = useAboutData();

    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [formData, setFormData] = useState<AboutTopContent>(initialFormData)
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState('')
    const [deleteId, setDeleteId] = useState('')

    const resetForm = useCallback(() => {
        setIsEditing(false)
        setEditingId('')
        setFormData(initialFormData)
        setSelectedImage(null)
    }, [])

    const closeContentModal = useCallback(() => {
        const modal = document.getElementById('content_modal')
        if (modal instanceof HTMLDialogElement) {
            modal.close()
        }
    }, [])

    const closeDeleteModal = useCallback(() => {
        const modal = document.getElementById('delete_modal')
        if (modal instanceof HTMLDialogElement) {
            modal.close()
        }
    }, [])

    const handleSubmit = useCallback(async () => {
        try {
            setIsSubmitting(true)
            let imageUrl = formData.imageUrl
            if (selectedImage) {
                imageUrl = await handleImageUpload(selectedImage)
            }

            if (isEditing && editingId) {
                await handleUpdate(editingId, {
                    ...formData,
                    imageUrl: selectedImage ? imageUrl : formData.imageUrl
                })
                toast.success('Content updated successfully!')
            } else {
                await createContent(formData, imageUrl)
                toast.success('Content created successfully!')
            }

            resetForm()
            closeContentModal()
        } catch (error) {
            console.error('Error submitting content:', error)
            toast.error('Failed to save content. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }, [formData, selectedImage, isEditing, editingId, handleImageUpload, handleUpdate, createContent, resetForm, closeContentModal, setIsSubmitting])

    const handleDeleteConfirm = useCallback(async () => {
        if (deleteId) {
            await handleDelete(deleteId)
            closeDeleteModal()
        }
    }, [deleteId, handleDelete, closeDeleteModal])

    // Cleanup image URL when component unmounts
    useEffect(() => {
        return () => {
            if (selectedImage) {
                URL.revokeObjectURL(URL.createObjectURL(selectedImage));
            }
        };
    }, [selectedImage]);

    if (isLoading) {
        return <AboutSkelaton />
    }

    return (
        <section>
            <div className="flex justify-between items-center py-6 px-8 border-b border-gray-200 bg-white shadow-sm mb-12">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">Top About</h1>
                    <ul className="flex items-center gap-2 mt-2">
                        <li className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                            <Link href="/dashboard/super-admins/super-admin">Dashboard</Link>
                        </li>
                        <li className="text-gray-400"><IoIosArrowForward className="w-3.5 h-3.5" /></li>
                        <li className="text-sm text-gray-600">Top About</li>
                    </ul>
                </div>

                <button
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    onClick={() => {
                        resetForm()
                        const modal = document.getElementById('content_modal')
                        if (modal instanceof HTMLDialogElement) {
                            modal.showModal()
                        }
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Property
                </button>
            </div>

            {contents.map((item, index) => (
                <div
                    key={index}
                    className='w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-10 hover:shadow-xl transition-shadow duration-300'
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left Image Section */}
                        <div className="relative w-full h-[400px] lg:h-[500px]">
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover"
                                style={{ objectPosition: 'center' }}
                                priority
                            />
                        </div>

                        {/* Right Content Section */}
                        <div className="p-8 lg:p-12 flex flex-col justify-between">
                            <div className="space-y-6">
                                <h2 className='text-3xl font-bold text-gray-900 leading-tight'>{item.title}</h2>
                            </div>

                            <div className="flex gap-4 pt-8 mt-auto">
                                <button
                                    onClick={() => {
                                        setFormData(item)
                                        setIsEditing(true)
                                        setEditingId(item.id || '')
                                        const modal = document.getElementById('content_modal')
                                        if (modal instanceof HTMLDialogElement) {
                                            modal.showModal()
                                        }
                                    }}
                                    className="flex-1 px-6 py-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit Property
                                </button>
                                <button
                                    onClick={() => {
                                        setDeleteId(item.id || '')
                                        const deleteModal = document.getElementById('delete_modal')
                                        if (deleteModal instanceof HTMLDialogElement) {
                                            deleteModal.showModal()
                                        }
                                    }}
                                    className="flex-1 px-6 py-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <ContentModal
                formData={formData}
                setFormData={setFormData}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isEditing={isEditing}
            />

            <DeleteModal
                onDelete={handleDeleteConfirm}
                isSubmitting={isSubmitting}
                onClose={closeDeleteModal}
            />
        </section>
    );
}