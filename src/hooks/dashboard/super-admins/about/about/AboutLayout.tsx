"use client"

import React, { useState, useEffect, useCallback } from 'react'

import { toast } from 'react-hot-toast'

import dynamic from 'next/dynamic'

import Image from 'next/image'

import Link from 'next/link'

import { AboutContent } from '@/hooks/dashboard/super-admins/about/about/types/About'

const ContentModal = dynamic(() => import('@/hooks/dashboard/super-admins/about/about/modal/ContentModal').then(mod => mod.ContentModal), {
    ssr: false
})

const DeleteModal = dynamic(() => import('@/hooks/dashboard/super-admins/about/about/modal/DeleteModal').then(mod => mod.DeleteModal), {
    ssr: false
})

const AboutSkelaton = dynamic(() => import('@/hooks/dashboard/super-admins/about/about/AboutSkelaton').then(mod => mod.default), {
    ssr: false
})

import { useAboutData } from '@/hooks/dashboard/super-admins/about/about/lib/FetchAbout'
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
        <section>
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

            {contents.map((item, index) => (
                <div
                    key={index}
                    className='w-full bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 mb-8 animate-fade-in-up'
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                        {/* Left Content Section */}
                        <div className="space-y-8">
                            <div>
                                <h2 className='text-3xl font-bold mb-4'>{item.title}</h2>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </div>

                            <div className="grid gap-6">
                                {item.text.map((text, textIndex) => (
                                    <div
                                        key={textIndex}
                                        className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
                                    >
                                        {/* Feature Icon - You can customize these based on the feature */}
                                        <div className="flex-shrink-0">
                                            {textIndex === 0 && (
                                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-100 text-amber-600">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                </div>
                                            )}
                                            {textIndex === 1 && (
                                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                                                    </svg>
                                                </div>
                                            )}
                                            {textIndex === 2 && (
                                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                            {textIndex === 3 && (
                                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">{text.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{text.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-3 pt-6 border-t border-gray-200">
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

                        {/* Right Image Section */}
                        <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden">
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover"
                                style={{ objectPosition: 'center' }}
                                priority
                            />
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