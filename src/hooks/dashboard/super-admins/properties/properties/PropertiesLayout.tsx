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
import PropertiesSkelaton from './PropertiesSkelaton'

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
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const loadInitialData = async () => {
            await fetchProperties(0);
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

    if (isLoading) {
        return <PropertiesSkelaton />
    }

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <div key={property.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="relative h-56 w-full overflow-hidden rounded-t-lg">
                            <Image
                                src={property.thumbnail || '/placeholder.png'}
                                alt={property.title}
                                fill
                                className="object-cover transition-transform duration-300 hover:scale-110"
                            />
                            <div className="absolute top-3 right-3">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${property.status === 'Publish'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {property.status}
                                </span>
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="flex items-center justify-between mb-2">
                                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${property.statusProject === 'Selesai'
                                    ? 'bg-green-100 text-green-800'
                                    : property.statusProject === 'Sedang Berjalan'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {property.statusProject}
                                </span>
                                <span className="text-sm text-gray-500">{formatDate(property.createdAt)}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{property.title}</h3>
                            <p className="text-sm text-gray-500 mb-4">{property.type}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => handleView(property)}
                                        className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                                    >
                                        <FaEye className="w-4 h-4 mr-1" />
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleEdit(property)}
                                        className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                                    >
                                        <FaEdit className="w-4 h-4 mr-1" />
                                        Edit
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleDelete(property)}
                                    className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700"
                                >
                                    <FaTrash className="w-4 h-4 mr-1" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
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