"use client"

import React, { useState, useEffect } from 'react';

import { IoIosArrowForward } from 'react-icons/io'

import Link from 'next/link'

import { FaPlus } from 'react-icons/fa'

import { Timestamp } from 'firebase/firestore';

import { format } from 'date-fns';

import { usePropertiesLocationsData } from '@/hooks/dashboard/super-admins/properties/locations/lib/FetchLocations';

import { ContentModal } from '@/hooks/dashboard/super-admins/properties/locations/modal/ContentModal';

import { DeleteModal } from '@/hooks/dashboard/super-admins/properties/locations/modal/DeleteModal';

import PropertiesLocationsSkelaton from '@/hooks/dashboard/super-admins/properties/locations/PropertiesLocationsSkelaton';

import { PropertiesLocationsFormData, initialFormData } from '@/hooks/dashboard/super-admins/properties/locations/types/schema';

import { Pagination } from '@/base/helper/Pagination';

import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from 'flowbite-react';

export default function PropertiesTypeLayout() {
    const {
        isLoading,
        contents,
        isSubmitting,
        createContent,
        updateContent,
        deleteContent,
        fetchContents,
        currentPage,
        totalItems,
        itemsPerPage,
        isDeleting,
    } = usePropertiesLocationsData();

    const [formData, setFormData] = useState<PropertiesLocationsFormData>(initialFormData);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    // Fetch data on mount
    useEffect(() => {
        const loadInitialData = async () => {
            setIsInitialLoading(true);
            await fetchContents(0);
            setIsInitialLoading(false);
        };

        loadInitialData();
    }, [fetchContents]);

    const handleSubmit = async () => {
        const success = isEditing && editingId
            ? await updateContent(editingId, formData)
            : await createContent(formData);

        if (success) {
            resetForm();
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setEditingId(null);
        setFormData(initialFormData);
        const modal = document.getElementById('content_modal') as HTMLDialogElement | null;
        modal?.close();
    };

    const handleDelete = async () => {
        if (deleteId) {
            await deleteContent(deleteId);
            setDeleteId(null);
            const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null;
            deleteModal?.close();
        }
    };

    const openModal = () => {
        const modal = document.getElementById('content_modal') as HTMLDialogElement | null;
        modal?.showModal();
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        fetchContents(selectedItem.selected);
    };

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const formatDate = (dateOrTimestamp: Date | Timestamp | undefined) => {
        if (!dateOrTimestamp) return 'N/A';
        const date = dateOrTimestamp instanceof Timestamp ? dateOrTimestamp.toDate() : dateOrTimestamp;
        return format(date, 'MMM d, yyyy');
    };

    if (isInitialLoading) {
        return <PropertiesLocationsSkelaton />;
    }
    return (
        <section>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 px-4 sm:px-6 border-b border-gray-200 bg-primary-50 rounded-md mb-6 sm:mb-10">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold">Properties Locations</h1>
                    <ul className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                        <li className="text-xs sm:text-sm font-medium"><Link href="/dashboard/super-admins/super-admin">Dashboard</Link></li>
                        <li className="text-xs sm:text-sm font-medium"><IoIosArrowForward className="w-3 h-3 sm:w-4 sm:h-4" /></li>
                        <li className="text-xs sm:text-sm font-medium"><Link href={"/dashboard/super-admin/properties/properties"}>Properties</Link></li>
                        <li className="text-xs sm:text-sm font-medium"><IoIosArrowForward className="w-3 h-3 sm:w-4 sm:h-4" /></li>
                        <li className="text-xs sm:text-sm font-medium">Locations</li>
                    </ul>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                        className="w-full sm:w-auto bg-primary-500 text-white px-3 sm:px-4 py-2 rounded-md flex items-center justify-center gap-2 text-sm sm:text-base hover:bg-primary-600 transition-colors"
                        onClick={() => {
                            resetForm()
                            openModal()
                        }}
                    >
                        <FaPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Create</span>
                    </button>
                </div>
            </div>

            {isLoading ? (
                <PropertiesLocationsSkelaton />
            ) : (
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <Table hoverable className="w-full">
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">No</TableHeadCell>
                                    <TableHeadCell className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Province</TableHeadCell>
                                    <TableHeadCell className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Cities</TableHeadCell>
                                    <TableHeadCell className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Created At</TableHeadCell>
                                    <TableHeadCell className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">Actions</TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {contents.map((content, index) => (
                                    <TableRow key={content.id} className="bg-white hover:bg-gray-50">
                                        <TableCell className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap font-medium text-gray-900">
                                            {currentPage * itemsPerPage + index + 1}
                                        </TableCell>
                                        <TableCell className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap font-medium text-gray-900 capitalize">
                                            {content.province}
                                        </TableCell>
                                        <TableCell className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                                {content.city.map((cityItem, cityIndex) => (
                                                    <span key={cityIndex} className="inline-block bg-gray-100 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-gray-700">
                                                        {cityItem.city}
                                                    </span>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap text-gray-500">
                                            {formatDate(content.createdAt)}
                                        </TableCell>
                                        <TableCell className="px-4 sm:px-6 py-3 sm:py-4">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <button
                                                    onClick={() => {
                                                        setIsEditing(true);
                                                        setEditingId(content.id || null);
                                                        setFormData({ province: content.province, city: content.city });
                                                        openModal();
                                                    }}
                                                    className="p-1 sm:p-1.5 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-full transition-colors"
                                                    title="Edit"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setDeleteId(content.id || null);
                                                        const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null;
                                                        deleteModal?.showModal();
                                                    }}
                                                    className="p-1 sm:p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-full transition-colors"
                                                    title="Delete"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}

            {/* Pagination */}
            {!isLoading && totalItems > 0 && (
                <div className="mt-6 sm:mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            {/* Content Modal */}
            <ContentModal
                isEditing={isEditing}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                onClose={resetForm}
            />

            {/* Delete Modal */}
            <DeleteModal
                onConfirm={handleDelete}
                onClose={() => {
                    setDeleteId(null);
                    const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null;
                    deleteModal?.close();
                }}
                isDeleting={isDeleting}
            />
        </section>
    )
}
