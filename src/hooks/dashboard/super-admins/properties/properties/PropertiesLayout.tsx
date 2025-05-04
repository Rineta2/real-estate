"use client"
import React, { useState, useEffect } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import Link from 'next/link'
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import { usePropertiesData } from './lib/FetchProperties'
import ContentModal from './modal/ContentModal'
import DeleteModal from './modal/DeleteModal'
import ViewModal from './modal/ViewModal'
import { Properties } from './types/properties'
import { format } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import { Pagination } from '@/base/helper/Pagination'
import Image from 'next/image'

export default function PropertiesLayout() {
    const {
        isLoading,
        properties,
        deleteProperty,
        fetchProperties,
        currentPage,
        totalItems,
        itemsPerPage,
    } = usePropertiesData();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<Properties | undefined>();
    const [propertyToDelete, setPropertyToDelete] = useState<Properties | undefined>();
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const loadInitialData = async () => {
            setIsInitialLoading(true);
            await fetchProperties(0);
            setIsInitialLoading(false);
        };

        loadInitialData();
    }, [fetchProperties]);

    const handlePageChange = (selectedItem: { selected: number }) => {
        fetchProperties(selectedItem.selected);
    };

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const formatDate = (dateOrTimestamp: Date | Timestamp | undefined) => {
        if (!dateOrTimestamp) return 'N/A';
        const date = dateOrTimestamp instanceof Timestamp ? dateOrTimestamp.toDate() : dateOrTimestamp;
        return format(date, 'MMM d, yyyy');
    };

    const handleCreate = () => {
        setSelectedProperty(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (property: Properties) => {
        setSelectedProperty(property);
        setIsModalOpen(true);
    };

    const handleDelete = async (property: Properties) => {
        setPropertyToDelete(property);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (propertyToDelete?.id) {
            setIsDeleting(true);
            await deleteProperty(propertyToDelete.id);
            setIsDeleting(false);
            setIsDeleteModalOpen(false);
            setPropertyToDelete(undefined);
        }
    };

    const handleView = (property: Properties) => {
        setSelectedProperty(property);
        setIsViewModalOpen(true);
    };

    return (
        <section>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 px-4 sm:px-6 border-b border-gray-200 bg-primary-50 rounded-md mb-6 sm:mb-10">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold">Properties</h1>
                    <ul className="flex items-center gap-2 text-xs sm:text-sm">
                        <li className="font-medium"><Link href="/dashboard/super-admins/super-admin">Dashboard</Link></li>
                        <li className="font-medium"><IoIosArrowForward className="w-3 h-3 sm:w-4 sm:h-4" /></li>
                        <li className="font-medium">Properties</li>
                    </ul>
                </div>

                <div className="w-full sm:w-auto">
                    <button
                        onClick={handleCreate}
                        className="w-full sm:w-auto bg-primary-500 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors"
                    >
                        <FaPlus className="w-4 h-4" />
                        <span>Create</span>
                    </button>
                </div>
            </div>

            {isInitialLoading ? (
                <div className="animate-pulse">
                    <div className="h-96 bg-gray-200 rounded"></div>
                </div>
            ) : (
                <>
                    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Thumbnail</th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                                        <th scope="col" className="hidden sm:table-cell px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                                        <th scope="col" className="hidden sm:table-cell px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="hidden md:table-cell px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Project Status</th>
                                        <th scope="col" className="hidden md:table-cell px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Created At</th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {properties.map((property) => (
                                        <tr key={property.id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-md overflow-hidden border border-gray-200">
                                                    <Image
                                                        src={property.thumbnail || '/placeholder.png'}
                                                        alt={property.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900">{property.title}</span>
                                                    <div className="sm:hidden mt-1 space-y-1">
                                                        <span className="text-xs text-gray-500">{property.type}</span>
                                                        <span className="block text-xs text-gray-500">{property.status}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="hidden sm:table-cell px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {property.type}
                                            </td>
                                            <td className="hidden sm:table-cell px-4 py-3 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${property.status === 'Publish'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {property.status}
                                                </span>
                                            </td>
                                            <td className="hidden md:table-cell px-4 py-3 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${property.statusProject === 'Selesai'
                                                    ? 'bg-green-100 text-green-800'
                                                    : property.statusProject === 'Sedang Berjalan'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {property.statusProject}
                                                </span>
                                            </td>
                                            <td className="hidden md:table-cell px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(property.createdAt)}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleView(property)}
                                                        className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                                                        title="View"
                                                    >
                                                        <FaEye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(property)}
                                                        className="p-1.5 text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded-md transition-colors"
                                                        title="Edit"
                                                    >
                                                        <FaEdit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(property)}
                                                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                                                        title="Delete"
                                                    >
                                                        <FaTrash className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {!isLoading && totalItems > 0 && (
                        <div className="mt-8">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </>
            )}

            <ContentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                property={selectedProperty}
            />

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                propertyTitle={propertyToDelete?.title || ''}
                isLoading={isDeleting}
            />

            <ViewModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                property={selectedProperty}
            />
        </section>
    )
}