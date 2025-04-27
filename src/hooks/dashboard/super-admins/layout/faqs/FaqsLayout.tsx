"use client"

import React, { useState, useCallback } from 'react'

import { toast } from 'react-hot-toast'

import dynamic from 'next/dynamic'

import { FaqsContent } from '@/hooks/dashboard/super-admins/layout/faqs/types/Faqs'

import Link from 'next/link'

import { IoIosArrowForward } from "react-icons/io";

const ContentModal = dynamic(() => import('@/hooks/dashboard/super-admins/layout/faqs/modal/ContentModal').then(mod => mod.ContentModal), {
    ssr: false
})

const DeleteModal = dynamic(() => import('@/hooks/dashboard/super-admins/layout/faqs/modal/DeleteModal').then(mod => mod.DeleteModal), {
    ssr: false
})

const HomeSkelaton = dynamic(() => import('@/hooks/dashboard/super-admins/layout/faqs/FaqsSkelaton').then(mod => mod.default), {
    ssr: false
})

import { useFaqsData } from '@/hooks/dashboard/super-admins/layout/faqs/lib/FetchFaqs'

import { FaPlus } from 'react-icons/fa'

import Empaty from '../featured/components/Empaty'

const initialFormData: FaqsContent = {
    title: '',
    description: '',
    faqs: [],
};

export default function HomeLayout() {
    const {
        isLoading,
        contents,
        isSubmitting,
        setIsSubmitting,
        createContent,
        handleUpdate,
        handleDelete,
    } = useFaqsData();

    const [formData, setFormData] = useState<FaqsContent>(initialFormData)
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState('')
    const [deleteId, setDeleteId] = useState('')

    const resetForm = useCallback(() => {
        setIsEditing(false)
        setEditingId('')
        setFormData(initialFormData)
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

            if (isEditing && editingId) {
                await handleUpdate(editingId, formData)
                toast.success('Content updated successfully!')
            } else {
                await createContent(formData)
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
    }, [formData, isEditing, editingId, handleUpdate, createContent, resetForm, closeContentModal, setIsSubmitting])

    const handleDeleteConfirm = useCallback(async () => {
        if (deleteId) {
            await handleDelete(deleteId)
            closeDeleteModal()
        }
    }, [deleteId, handleDelete, closeDeleteModal])

    if (isLoading) {
        return <HomeSkelaton />
    }

    return (
        <section className='min-h-screen'>
            <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-primary-50 rounded-md mb-10" >
                <div>
                    <h1 className="text-2xl font-bold">Faqs</h1>
                    <ul className="flex items-center gap-2">
                        <li className="text-sm font-medium"><Link href="/dashboard/super-admins/super-admin">Dashboard</Link></li>
                        <li className="text-sm font-medium"><IoIosArrowForward className="w-4 h-4" /></li>
                        <li className="text-sm font-medium">Layout</li>
                        <li className="text-sm font-medium"><IoIosArrowForward className="w-4 h-4" /></li>
                        <li className="text-sm font-medium">Faqs</li>
                    </ul>
                </div>

                {
                    contents.length === 0 && (
                        <div className="flex items-center gap-2">
                            <button className="bg-primary-500 text-white px-4 py-2 rounded-md flex items-center gap-2" onClick={() => {
                                resetForm()
                                const modal = document.getElementById('content_modal')
                                if (modal instanceof HTMLDialogElement) {
                                    modal.showModal()
                                }
                            }}>
                                <FaPlus className="w-4 h-4" />
                                <span>Create</span>
                            </button>
                        </div>
                    )
                }
            </div >

            {/* FAQ Content Display */}
            {contents.length === 0 ? (
                <Empaty />
            ) : (
                contents.map((item, index) => (
                    <div
                        key={index}
                        className='w-full bg-[var(--background)] rounded-2xl shadow-sm overflow-hidden border border-gray-100'
                    >
                        <div className="flex flex-col">
                            {/* Content Section */}
                            <div className="p-6 md:p-8 flex flex-col justify-between w-full">
                                <div className="space-y-6">
                                    <h2 className='text-2xl sm:text-3xl font-bold'>
                                        {item.title}
                                    </h2>

                                    <div className="space-y-3">
                                        {item.faqs.map((faq, faqIndex) => (
                                            <div
                                                key={faqIndex}
                                                className="bg-[var(--background)] rounded-xl overflow-hidden border border-gray-100"
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
                ))
            )}

            <ContentModal
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
        </section>
    );
}