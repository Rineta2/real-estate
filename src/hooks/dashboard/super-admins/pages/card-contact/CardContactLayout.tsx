"use client"

import React, { useState, useCallback } from 'react'

import { toast } from 'react-hot-toast'

import dynamic from 'next/dynamic'

import { CardContactContent, initialFormData } from '@/hooks/dashboard/super-admins/pages/card-contact/types/CardContact'

import Link from 'next/link'

import { IoIosArrowForward } from "react-icons/io";

const ContentModal = dynamic(() => import('@/hooks/dashboard/super-admins/pages/card-contact/modal/ContentModal').then(mod => mod.ContentModal), {
    ssr: false
})

const DeleteModal = dynamic(() => import('@/hooks/dashboard/super-admins/pages/card-contact/modal/DeleteModal').then(mod => mod.DeleteModal), {
    ssr: false
})

const HomeSkelaton = dynamic(() => import('@/hooks/dashboard/super-admins/pages/card-contact/CardContactSkelaton').then(mod => mod.default), {
    ssr: false
})

import { useCardContactData } from '@/hooks/dashboard/super-admins/pages/card-contact/lib/FetchCardContact'

import { FaPlus } from 'react-icons/fa'

import Empaty from '@/hooks/dashboard/super-admins/pages/card-contact/components/Empaty'

export default function HomeLayout() {
    const {
        isLoading,
        contents,
        isSubmitting,
        setIsSubmitting,
        createContent,
        handleUpdate,
        handleDelete,
    } = useCardContactData();

    const [formData, setFormData] = useState<CardContactContent>(initialFormData)
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
        <section className='min-h-full'>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 px-4 sm:px-6 border-b border-gray-200 bg-primary-50 rounded-md mb-6 sm:mb-10" >
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold">Card Contact</h1>
                    <ul className="flex items-center gap-1 sm:gap-2 flex-wrap">
                        <li className="text-xs sm:text-sm font-medium"><Link href="/dashboard/super-admins/super-admin">Dashboard</Link></li>
                        <li className="text-xs sm:text-sm font-medium"><IoIosArrowForward className="w-3 h-3 sm:w-4 sm:h-4" /></li>
                        <li className="text-xs sm:text-sm font-medium">Pages</li>
                        <li className="text-xs sm:text-sm font-medium"><IoIosArrowForward className="w-3 h-3 sm:w-4 sm:h-4" /></li>
                        <li className="text-xs sm:text-sm font-medium">Card Contact</li>
                    </ul>
                </div>

                {
                    contents.length === 0 && (
                        <div className="flex items-center gap-2 mt-4 sm:mt-0">
                            <button className="bg-primary-500 text-white px-3 sm:px-4 py-2 rounded-md flex items-center gap-2 text-sm sm:text-base" onClick={() => {
                                resetForm()
                                const modal = document.getElementById('content_modal')
                                if (modal instanceof HTMLDialogElement) {
                                    modal.showModal()
                                }
                            }}>
                                <FaPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>Create</span>
                            </button>
                        </div>
                    )
                }
            </div >

            {/* Card Content Display */}
            {contents.length === 0 ? (
                <Empaty />
            ) : (
                contents.map((item, index) => (
                    <div
                        key={index}
                        className='w-full rounded-xl sm:rounded-2xl shadow-sm overflow-hidden border border-gray-100 mb-6 sm:mb-8'
                    >
                        <div className="flex flex-col">
                            {/* Header Section */}
                            <div className="p-4 sm:p-6 md:p-8 border-b border-gray-100">
                                <h2 className='text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4'>
                                    {item.title}
                                </h2>
                                <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
                            </div>

                            {/* Cards Grid Section */}
                            <div className="p-4 sm:p-6 md:p-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                    {item.card.map((card, cardIndex) => (
                                        <div
                                            key={cardIndex}
                                            className="bg-white rounded-lg sm:rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300"
                                        >
                                            <div className="p-4 sm:p-6">
                                                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{card.title}</h3>
                                                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{card.description}</p>
                                                {card.href && (
                                                    <a
                                                        href={card.href}
                                                        className="inline-flex items-center text-sm sm:text-base text-primary-600 hover:text-primary-700 font-medium"
                                                    >
                                                        Learn More
                                                        <svg
                                                            className="w-3 h-3 sm:w-4 sm:h-4 ml-2"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                            />
                                                        </svg>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Google Maps Section */}
                            {item.googleMapsIframe && (
                                <div className="p-4 sm:p-6 md:p-8 border-t border-gray-100">
                                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Location</h3>
                                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                        <div
                                            className="absolute inset-0 w-full h-full rounded-lg sm:rounded-xl overflow-hidden"
                                            dangerouslySetInnerHTML={{
                                                __html: item.googleMapsIframe.replace(
                                                    'width="600" height="450"',
                                                    'width="100%" height="100%" style="border:0; position:absolute; top:0; left:0; width:100%; height:100%;"'
                                                )
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-2 sm:gap-3 p-4 sm:p-6 border-t border-[var(--border-color)]">
                                <button
                                    onClick={() => {
                                        setDeleteId(item.id || '')
                                        const deleteModal = document.getElementById('delete_modal')
                                        if (deleteModal instanceof HTMLDialogElement) {
                                            deleteModal.showModal()
                                        }
                                    }}
                                    className="px-3 sm:px-4 py-2 text-sm sm:text-base text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
                                    className="px-3 sm:px-4 py-2 text-sm sm:text-base text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-300 flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit
                                </button>
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