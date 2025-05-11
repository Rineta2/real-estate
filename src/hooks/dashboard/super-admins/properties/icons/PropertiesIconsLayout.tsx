"use client"

import React from 'react'

import Link from 'next/link'

import { IoIosArrowForward } from "react-icons/io"

import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'

import Image from 'next/image'

import { Pagination } from '@/base/helper/Pagination'

import PropertiesIconsSkelaton from "@/hooks/dashboard/super-admins/properties/icons/PropertiesIconsSkelaton"

import ContentModal from '@/hooks/dashboard/super-admins/properties/icons/modal/ContentModal'

import { DeleteModal } from '@/hooks/dashboard/super-admins/properties/icons/modal/DeleteModal'

import { usePropertiesIcons } from '@/hooks/dashboard/super-admins/properties/icons/utils/FetchIcons'

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
    } = usePropertiesIcons()

    if (isLoading) {
        return <PropertiesIconsSkelaton />
    }

    return (
        <section>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 px-4 sm:px-6 border-b border-gray-200 bg-primary-50 rounded-md mb-6 sm:mb-10">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold">Properties Icons</h1>
                    <ul className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                        <li className="text-xs sm:text-sm font-medium"><Link href="/dashboard/super-admins/super-admin">Dashboard</Link></li>
                        <li className="text-xs sm:text-sm font-medium"><IoIosArrowForward className="w-3 h-3 sm:w-4 sm:h-4" /></li>
                        <li className="text-xs sm:text-sm font-medium"><Link href="/dashboard/super-admins/super-admin/properties">Properties</Link></li>
                        <li className="text-xs sm:text-sm font-medium"><IoIosArrowForward className="w-3 h-3 sm:w-4 sm:h-4" /></li>
                        <li className="text-xs sm:text-sm font-medium">Properties Icons</li>
                    </ul>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full sm:w-auto bg-primary-500 text-white px-3 sm:px-4 py-2 rounded-md flex items-center justify-center gap-2 text-sm sm:text-base hover:bg-primary-600 transition-colors"
                    >
                        <FaPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Create</span>
                    </button>
                </div>
            </div>

            {/* Gallery Items Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {paginatedItems.map((item) => (
                    <div key={item.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <div className="relative aspect-square">
                            <Image
                                src={item.imageUrl}
                                alt="Gallery item"
                                className="object-cover"
                                quality={100}
                                loading='lazy'
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />
                        </div>
                        <div className="p-3 sm:p-4">
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="p-1.5 sm:p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
                                    title="Edit"
                                >
                                    <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-1.5 sm:p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                                    title="Delete"
                                >
                                    <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 0 && (
                <div className="mt-6 sm:mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

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
