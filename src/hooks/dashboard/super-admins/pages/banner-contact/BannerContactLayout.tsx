"use client"

import React, { useState, useEffect } from 'react'

import Link from "next/link";

import { FaPlus } from "react-icons/fa";

import { IoIosArrowForward } from "react-icons/io";

import { BannerContactContent, initialFormData } from "@/hooks/dashboard/super-admins/pages/banner-contact/types/BannerContact"

import Image from 'next/image'

import { ContentModal } from '@/hooks/dashboard/super-admins/pages/banner-contact/modal/ContentModal'

import { DeleteModal } from '@/hooks/dashboard/super-admins/pages/banner-contact/modal/DeleteModal'

import { useBannerContactData } from '@/hooks/dashboard/super-admins/pages/banner-contact/utils/FetchBannerContact'

import BannerContactSkelaton from '@/hooks/dashboard/super-admins/pages/banner-contact/BannerContactSkelaton'

import { toast } from 'react-hot-toast'

import Empaty from '@/hooks/dashboard/super-admins/pages/banner-contact/components/Empaty'

export default function BannerContactLayout() {
    const {
        isLoading,
        contents,
        isSubmitting,
        setIsSubmitting,
        handleImageUpload,
        createContent,
        handleUpdate,
        handleDelete,
    } = useBannerContactData();

    const [selectedImage, setSelectedImage] = useState<File | null>(null)

    const [formData, setFormData] = useState<BannerContactContent>(initialFormData)

    const [isEditing, setIsEditing] = useState(false)

    const [editingId, setEditingId] = useState<string | null>(null)

    const [deleteId, setDeleteId] = useState<string | null>(null)

    const handleSubmit = async () => {
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
    }

    const resetForm = () => {
        setIsEditing(false)
        setEditingId(null)
        setFormData(initialFormData)
        setSelectedImage(null)
    }

    const closeContentModal = () => {
        const modal = document.getElementById('content_modal') as HTMLDialogElement | null
        modal?.close()
    }

    const closeDeleteModal = () => {
        const modal = document.getElementById('delete_modal') as HTMLDialogElement | null
        modal?.close()
    }

    const handleDeleteConfirm = async () => {
        if (deleteId) {
            await handleDelete(deleteId)
            closeDeleteModal()
        }
    }

    useEffect(() => {
        return () => {
            if (selectedImage) {
                URL.revokeObjectURL(URL.createObjectURL(selectedImage));
            }
        };
    }, [selectedImage]);

    if (isLoading) {
        return <BannerContactSkelaton />
    }

    return (
        <section className="min-h-full">
            <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-primary-50 rounded-md mb-10">
                <div>
                    <h1 className="text-2xl font-bold">Banner Contact</h1>
                    <ul className="flex items-center gap-2">
                        <li className="text-sm font-medium"><Link href="/dashboard/super-admins/super-admin">Dashboard</Link></li>
                        <li className="text-sm font-medium"><IoIosArrowForward className="w-4 h-4" /></li>
                        <li className="text-sm font-medium">Banner Contact</li>
                    </ul>
                </div>

                {contents.length === 0 && (
                    <div className="flex items-center gap-2">
                        <button className="bg-primary-500 text-white px-4 py-2 rounded-md flex items-center gap-2" onClick={() => {
                            setIsEditing(false)
                            setEditingId(null)
                            setFormData(initialFormData)
                            setSelectedImage(null)
                            const modal = document.getElementById('content_modal') as HTMLDialogElement | null
                            modal?.showModal()
                        }}>
                            <FaPlus className="w-4 h-4" />
                            <span>Create</span>
                        </button>
                    </div>
                )}
            </div>

            {contents.length === 0 ? (
                <Empaty />
            ) : (
                contents.map((item) => {
                    return (
                        <div key={item.id}>
                            <div
                                className='w-full bg-white rounded-2xl shadow-sm overflow-hidden'
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                    {/* Content Section */}
                                    <div
                                        className="p-8 lg:p-12 flex flex-col justify-center"
                                    >
                                        <div className="space-y-8 max-w-xl">
                                            <div className="space-y-6">
                                                <h2 className='text-3xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent'>
                                                    {item.title}
                                                </h2>
                                            </div>

                                            <div className="flex gap-3 pt-6 border-t border-gray-100">
                                                <button
                                                    onClick={() => {
                                                        setDeleteId(item.id!)
                                                        const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null
                                                        deleteModal?.showModal()
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
                                                        setEditingId(item.id || null)
                                                        const modal = document.getElementById('content_modal') as HTMLDialogElement | null
                                                        modal?.showModal()
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

                                    {/* Image Section */}
                                    <div
                                        className="relative h-[400px] lg:h-full min-h-[500px] bg-gradient-to-br from-gray-100 to-gray-200"
                                    >
                                        <Image
                                            src={contents[0].imageUrl}
                                            alt={contents[0].title}
                                            fill
                                            className="object-cover transition-all duration-700 hover:scale-105"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            )}

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
    )
}
