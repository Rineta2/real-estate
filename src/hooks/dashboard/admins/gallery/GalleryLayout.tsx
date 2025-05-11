"use client"

import React from 'react'

import Link from 'next/link'

import { IoIosArrowForward } from "react-icons/io"

import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'

import Image from 'next/image'

import { Pagination } from '@/base/helper/Pagination'

import GallerySkelaton from "@/hooks/dashboard/admins/gallery/GallerySkelaton"

import ContentModal from '@/hooks/dashboard/admins/gallery/modal/ContentModal'

import { DeleteModal } from '@/hooks/dashboard/admins/gallery/modal/DeleteModal'

import { useGallery } from '@/hooks/dashboard/admins/gallery/utils/FetchGallery'

export default function GalleryLayout() {
    const {
        isLoading,
        isModalOpen,
        isDeleteModalOpen,
        formData,
        editingItem,
        selectedImage,
        isSubmitting,
        currentPage,
        paginatedItems,
        totalPages,
        setIsModalOpen,
        setIsDeleteModalOpen,
        setItemToDelete,
        setFormData,
        setSelectedImage,
        handleSubmit,
        handleDelete,
        confirmDelete,
        handleEdit,
        handlePageChange
    } = useGallery()

    if (isLoading) {
        return <GallerySkelaton />
    }

    return (
        <section>
            <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-primary-50 rounded-md mb-10">
                <div>
                    <h1 className="text-2xl font-bold">Gallery</h1>
                    <ul className="flex items-center gap-2">
                        <li className="text-sm font-medium"><Link href="/dashboard/admins">Dashboard</Link></li>
                        <li className="text-sm font-medium"><IoIosArrowForward className="w-4 h-4" /></li>
                        <li className="text-sm font-medium">Gallery</li>
                    </ul>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
                    >
                        <FaPlus className="w-4 h-4" />
                        <span>Create</span>
                    </button>
                </div>
            </div>

            {/* Gallery Items Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {paginatedItems.map((item) => (
                    <div key={item.id} className="border rounded-lg overflow-hidden shadow-lg">
                        <Image src={item.imageUrl} alt="Gallery item" className="w-full h-48 object-cover" quality={100} loading='lazy' width={500} height={500} />
                        <div className="p-4">
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {/* Modal */}
            <ContentModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    setFormData({ image: null })
                    setSelectedImage(null)
                }}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                editingItem={editingItem}
                isSubmitting={isSubmitting}
            />

            {/* Delete Modal */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false)
                    setItemToDelete(null)
                }}
                onDelete={confirmDelete}
                isSubmitting={isSubmitting}
            />
        </section>
    )
}
