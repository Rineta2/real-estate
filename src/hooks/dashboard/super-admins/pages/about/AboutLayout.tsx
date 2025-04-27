"use client"

import React, { useState, useEffect, useCallback } from 'react'

import { toast } from 'react-hot-toast'

import dynamic from 'next/dynamic'

import Image from 'next/image'

import Link from 'next/link'

import { AboutContent } from '@/hooks/dashboard/super-admins/pages/about/types/About'

const ContentModal = dynamic(() => import('@/hooks/dashboard/super-admins/pages/about/modal/ContentModal').then(mod => mod.ContentModal), {
    ssr: false
})

const DeleteModal = dynamic(() => import('@/hooks/dashboard/super-admins/pages/about/modal/DeleteModal').then(mod => mod.DeleteModal), {
    ssr: false
})

const AboutSkelaton = dynamic(() => import('@/hooks/dashboard/super-admins/pages/about/AboutSkelaton').then(mod => mod.default), {
    ssr: false
})

import { useAboutData } from '@/hooks/dashboard/super-admins/pages/about/lib/FetchAbout'
import { IoIosArrowForward } from 'react-icons/io'

const initialFormData: AboutContent = {
    title: '',
    description: '',
    text: [],
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
    const [formData, setFormData] = useState<AboutContent>(initialFormData)
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
        <section className='min-h-screen'>
            <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-primary-50 rounded-md mb-10">
                <div>
                    <h1 className="text-2xl font-bold">About</h1>
                    <ul className="flex items-center gap-2">
                        <li className="text-sm font-medium"><Link href="/dashboard/super-admins/super-admin">Dashboard</Link></li>
                        <li className="text-sm font-medium"><IoIosArrowForward className="w-4 h-4" /></li>
                        <li className="text-sm font-medium">About</li>
                    </ul>
                </div>

                <button
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-lg hover:shadow-indigo-100 dark:hover:shadow-indigo-900/30"
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
                    Create Content
                </button>
            </div>

            {/* FAQ Content Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {contents.map((item, index) => (
                    <div
                        key={index}
                        className='w-full bg-[var(--background)] rounded-2xl shadow-sm overflow-hidden border border-[var(--border-color)] animate-fade-in-up'
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex flex-col">
                            {/* Image Section */}
                            <div className="relative w-full animate-fade-in">
                                <div className="w-full">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        width={1200}
                                        height={800}
                                        priority
                                        className="w-full object-cover rounded-t-2xl"
                                    />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 md:p-8 flex flex-col justify-between w-full animate-slide-in">
                                <div className="space-y-6">
                                    <h2 className='text-2xl sm:text-3xl font-bold'>
                                        {item.title}
                                    </h2>

                                    <div className="space-y-3">
                                        {item.text.map((faq, faqIndex) => (
                                            <div
                                                key={faqIndex}
                                                className="bg-[var(--background)] rounded-xl overflow-hidden border border-[var(--border-color)]"
                                            >
                                                <details className="group">
                                                    <summary className="flex justify-between items-center p-4 cursor-pointer font-medium text-[var(--text)] hover:bg-[var(--hover-bg)] transition-colors">
                                                        <span>{faq.title}</span>
                                                        <svg
                                                            className="w-5 h-5 text-[var(--text)] transition-transform group-open:rotate-180"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </summary>
                                                    <div className="p-4 pt-0 text-[var(--text)]">
                                                        {faq.description}
                                                    </div>
                                                </details>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-6 mt-6 border-t border-[var(--border-color)]">
                                    <button
                                        onClick={() => {
                                            setDeleteId(item.id || '')
                                            const deleteModal = document.getElementById('delete_modal')
                                            if (deleteModal instanceof HTMLDialogElement) {
                                                deleteModal.showModal()
                                            }
                                        }}
                                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 flex items-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete
                                    </button>
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
                                        className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-300 flex items-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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