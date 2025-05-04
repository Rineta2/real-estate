"use client"
import React, { useState, useEffect } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import Link from 'next/link'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { usePropertiesData } from './lib/FetchProperties'
import ContentModal from './components/ContentModal'
import { Properties } from './types/properties'
import { format } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import { Table } from 'flowbite-react'
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
    const [selectedProperty, setSelectedProperty] = useState<Properties | undefined>();
    const [isInitialLoading, setIsInitialLoading] = useState(true);

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

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            await deleteProperty(id);
        }
    };

    return (
        <section>
            <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-primary-50 rounded-md mb-10">
                <div>
                    <h1 className="text-2xl font-bold">Properties</h1>
                    <ul className="flex items-center gap-2">
                        <li className="text-sm font-medium"><Link href="/dashboard/super-admins/super-admin">Dashboard</Link></li>
                        <li className="text-sm font-medium"><IoIosArrowForward className="w-4 h-4" /></li>
                        <li className="text-sm font-medium">Properties</li>
                    </ul>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCreate}
                        className="bg-primary-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary-600 transition-colors"
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
                    <div className="overflow-x-auto">
                        <Table>
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {properties.map((property) => (
                                    <tr key={property.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                                                <Image
                                                    src={property.thumbnail || '/placeholder.png'}
                                                    alt={property.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                            {property.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {property.type}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${property.status === 'Publish'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {property.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${property.statusProject === 'Selesai'
                                                ? 'bg-green-100 text-green-800'
                                                : property.statusProject === 'Sedang Berjalan'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {property.statusProject}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {formatDate(property.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(property)}
                                                    className="p-2 text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded-full transition-colors"
                                                    title="Edit"
                                                >
                                                    <FaEdit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(property.id!)}
                                                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                                                    title="Delete"
                                                >
                                                    <FaTrash className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
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
        </section>
    )
}