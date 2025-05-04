"use client"

import React, { useState, useEffect, useRef } from 'react';

import { useForm } from 'react-hook-form';

import { toast } from 'react-hot-toast';

import { Properties, FormInputs, facilities, details } from '../types/properties';

import { usePropertiesData } from '../lib/FetchProperties';

import { usePropertiesTypeData } from '../../type/lib/FetchType';

import { usePropertiesLocationsData } from '../../locations/lib/FetchLocations';

import imagekitInstance from '@/utils/imagekit/imagekit';

import Image from 'next/image';

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

import { usePropertiesIcons } from '@/hooks/dashboard/super-admins/properties/icons/utils/FetchIcons';

import { useAuth } from '@/utils/context/AuthContext';

import RichTextEditor from '@/base/helper/TextEditor';

interface ContentModalProps {
    isOpen: boolean;
    onClose: () => void;
    property?: Properties;
}

export default function ContentModal({ isOpen, onClose, property }: ContentModalProps) {
    const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<FormInputs>();
    const { createProperty, updateProperty } = usePropertiesData();
    const { contents: types } = usePropertiesTypeData();
    const { contents: locations } = usePropertiesLocationsData();
    const { iconsItems } = usePropertiesIcons();
    const { user } = useAuth();
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<facilities[]>([]);
    const [selectedDetails, setSelectedDetails] = useState<details[]>([]);
    const [selectedLocations, setSelectedLocations] = useState<{ city: string; province: string }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
    const [isThumbnailUploading, setIsThumbnailUploading] = useState(false);
    const [isImagesUploading, setIsImagesUploading] = useState(false);
    const [isDragActive, setIsDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isThumbnailDragActive, setIsThumbnailDragActive] = useState(false);
    const thumbnailInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (property) {
            reset({
                title: property.title,
                slug: property.slug,
                description: property.description,
                thumbnail: property.thumbnail,
                images: property.images,
                facilities: property.facilities,
                details: property.details,
                type: property.type,
                status: property.status,
                content: property.content,
                author: property.author,
                statusProject: property.statusProject,
            });
            setSelectedImages(property.images);
            setSelectedFacilities(property.facilities);
            setSelectedDetails(property.details || []);
            setSelectedLocations(property.locations);
        } else {
            reset({
                title: '',
                slug: '',
                description: '',
                thumbnail: '',
                images: [],
                facilities: [],
                details: [],
                type: '',
                status: 'Draf',
                content: '',
                author: {
                    name: user?.displayName || '',
                    role: user?.role || '',
                    uid: user?.uid || '',
                    photoURL: user?.photoURL || '',
                },
                statusProject: 'Coming Soon',
            });
            setSelectedImages([]);
            setSelectedFacilities([]);
            setSelectedDetails([]);
            setSelectedLocations([]);
        }
    }, [property, reset, user]);

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title' && value.title) {
                const slug = generateSlug(value.title);
                setValue('slug', slug);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, setValue]);

    const uploadImage = async (file: File, type: 'thumbnail' | 'images') => {
        try {
            const base64 = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });

            const folderSlug = generateSlug(watch('title'))
                .split('-')
                .slice(0, 10)
                .join('-');

            const folderPath = `properties/${folderSlug}/${type}`;
            const timestamp = new Date().getTime();
            const fileName = `${timestamp}_${file.name}`;

            const uploadResponse = await imagekitInstance.upload({
                file: base64 as string,
                fileName: fileName,
                folder: folderPath,
            });

            return uploadResponse.url;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const handleThumbnailUpload = async (file: File) => {
        setIsThumbnailUploading(true);
        try {
            const imageUrl = await uploadImage(file, 'thumbnail');
            setValue('thumbnail', imageUrl);
            setSelectedThumbnail(file);
        } catch (error) {
            console.error('Error uploading thumbnail:', error);
            toast.error('Failed to upload thumbnail');
        } finally {
            setIsThumbnailUploading(false);
        }
    };

    const handleImagesUpload = async (files: FileList) => {
        setIsImagesUploading(true);
        try {
            const uploadPromises = Array.from(files).map(file => uploadImage(file, 'images'));
            const uploadedUrls = await Promise.all(uploadPromises);
            setValue('images', [...watch('images'), ...uploadedUrls]);
            setSelectedImages(prev => [...prev, ...uploadedUrls]);
        } catch (error) {
            console.error('Error uploading images:', error);
            toast.error('Failed to upload images');
        } finally {
            setIsImagesUploading(false);
        }
    };

    const onSubmit = async (data: FormInputs) => {
        try {
            setIsSubmitting(true);
            const formData = {
                ...data,
                images: selectedImages,
                facilities: selectedFacilities,
                details: selectedDetails,
                locations: selectedLocations,
                author: {
                    name: user?.displayName || '',
                    role: user?.role || '',
                    uid: user?.uid || '',
                    photoURL: user?.photoURL || '',
                }
            };

            if (property) {
                await updateProperty(property.id!, formData);
                toast.success('Property updated successfully!');
            } else {
                await createProperty(formData);
                toast.success('Property created successfully!');
            }
            onClose();
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to save property');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLocationChange = (locationId: string, isChecked: boolean) => {
        const location = locations.find(loc => loc.id === locationId);
        if (!location) return;

        if (isChecked) {
            // Clear all previous selections and add only the selected location
            setSelectedLocations([{
                city: location.city[0].city,
                province: location.province
            }]);
        } else {
            // Clear all selections if the location is unchecked
            setSelectedLocations([]);
        }
    };

    const handleCityChange = (city: string, province: string) => {
        setSelectedLocations([{
            city,
            province
        }]);
    };

    // Drag and drop handlers for images upload
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleImagesUpload(e.dataTransfer.files);
        }
    };

    // Drag and drop handlers for thumbnail upload
    const handleThumbnailDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsThumbnailDragActive(true);
    };
    const handleThumbnailDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsThumbnailDragActive(false);
    };
    const handleThumbnailDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsThumbnailDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleThumbnailUpload(e.dataTransfer.files[0]);
        }
    };

    const handleImageReorder = (result: DropResult) => {
        if (!result.destination) return;
        const reordered = Array.from(selectedImages);
        const [removed] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, removed);
        setSelectedImages(reordered);
        setValue('images', reordered);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full max-w-7xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        {property ? 'Edit Property' : 'Create Property'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Thumbnail Upload */}
                    <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Thumbnail
                        </label>
                        <div
                            className={`relative border-2 border-dashed rounded-lg p-4 transition-colors ${isThumbnailDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-500'}`}
                            onClick={() => thumbnailInputRef.current?.click()}
                            onDragOver={handleThumbnailDragOver}
                            onDragLeave={handleThumbnailDragLeave}
                            onDrop={handleThumbnailDrop}
                            style={{ cursor: 'pointer' }}
                        >
                            <input
                                ref={thumbnailInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => e.target.files?.[0] && handleThumbnailUpload(e.target.files[0])}
                            />
                            {selectedThumbnail || watch('thumbnail') ? (
                                <div className="relative border rounded-lg overflow-hidden group">
                                    <Image
                                        src={selectedThumbnail ? URL.createObjectURL(selectedThumbnail) : watch('thumbnail')}
                                        alt="Thumbnail preview"
                                        width={400}
                                        height={300}
                                        className="w-full h-[200px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedThumbnail(null);
                                                setValue('thumbnail', '');
                                            }}
                                            className="p-2 bg-white rounded-full hover:bg-gray-100"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-[200px]">
                                    {isThumbnailUploading ? (
                                        <div className="flex flex-col items-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                                            <p className="mt-2 text-sm text-gray-500">Uploading...</p>
                                        </div>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="mt-2 text-sm text-gray-500">Click or drag thumbnail here to upload</p>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Images Upload */}
                    <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Images
                        </label>
                        <DragDropContext onDragEnd={handleImageReorder}>
                            <Droppable droppableId="images-droppable" direction="horizontal">
                                {(provided) => (
                                    <div
                                        className="grid grid-cols-2 md:grid-cols-3 gap-4"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {selectedImages.map((url, index) => (
                                            <Draggable key={url} draggableId={url} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`relative border rounded-lg overflow-hidden group bg-white ${snapshot.isDragging ? 'ring-2 ring-primary-500' : ''}`}
                                                    >
                                                        <Image
                                                            src={url}
                                                            alt={`Image ${index + 1}`}
                                                            width={200}
                                                            height={150}
                                                            className="w-full h-[150px] object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setSelectedImages(prev => prev.filter((_, i) => i !== index));
                                                                    setValue('images', watch('images').filter((_, i) => i !== index));
                                                                }}
                                                                className="p-2 bg-white rounded-full hover:bg-gray-100"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                        {selectedImages.length < 5 && (
                                            <div
                                                className={`border-2 border-dashed rounded-lg p-4 transition-colors flex flex-col items-center justify-center h-[150px] w-full cursor-pointer ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-500'}`}
                                                onClick={() => fileInputRef.current?.click()}
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                            >
                                                {isImagesUploading ? (
                                                    <div className="flex flex-col items-center">
                                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                                                        <p className="mt-2 text-sm text-gray-500">Uploading...</p>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <p className="mt-2 text-sm text-gray-500">Click or drag images here to upload</p>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            onChange={(e) => e.target.files && handleImagesUpload(e.target.files)}
                                        />
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>

                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <div className='flex flex-col gap-2'>
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Title
                            </label>

                            <input
                                type="text"
                                {...register('title', { required: 'Title is required' })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                            )}
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                Slug
                            </label>
                            <input
                                type="text"
                                {...register('slug', { required: 'Slug is required' })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                readOnly
                            />
                            {errors.slug && (
                                <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
                            )}
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                Type
                            </label>
                            <select
                                {...register('type', { required: 'Type is required' })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            >
                                <option value="">Select type</option>
                                {types.map((type) => (
                                    <option key={type.id} value={type.title}>
                                        {type.title}
                                    </option>
                                ))}
                            </select>
                            {errors.type && (
                                <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                            )}
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Status
                            </label>
                            <select
                                {...register('status', { required: 'Status is required' })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            >
                                <option value="Draf">Draf</option>
                                <option value="Publish">Publish</option>
                            </select>
                            {errors.status && (
                                <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                            )}
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Project Status
                            </label>
                            <select
                                {...register('statusProject', { required: 'Project status is required' })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            >
                                <option value="Coming Soon">Coming Soon</option>
                                <option value="Sedang Berjalan">Sedang Berjalan</option>
                                <option value="Selesai">Selesai</option>
                            </select>
                            {errors.statusProject && (
                                <p className="mt-1 text-sm text-red-600">{errors.statusProject.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Facilities Section */}
                    <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Facilities
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedFacilities.map((facility, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                                    <div className="relative w-16 h-16">
                                        {facility.imageUrl ? (
                                            <Image
                                                src={facility.imageUrl}
                                                alt={`Facility ${index + 1}`}
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <select
                                            value={facility.imageUrl}
                                            onChange={(e) => {
                                                const newFacilities = [...selectedFacilities];
                                                newFacilities[index] = {
                                                    ...newFacilities[index],
                                                    imageUrl: e.target.value
                                                };
                                                setSelectedFacilities(newFacilities);
                                            }}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 mb-2"
                                        >
                                            <option value="">Select Icon</option>
                                            {iconsItems.map((icon) => (
                                                <option key={icon.imageUrl} value={icon.imageUrl}>
                                                    {icon.imageUrl}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            type="text"
                                            value={facility.title}
                                            onChange={(e) => {
                                                const newFacilities = [...selectedFacilities];
                                                newFacilities[index] = {
                                                    ...newFacilities[index],
                                                    title: e.target.value
                                                };
                                                setSelectedFacilities(newFacilities);
                                            }}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                            placeholder="Enter title"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newFacilities = selectedFacilities.filter((_, i) => i !== index);
                                            setSelectedFacilities(newFacilities);
                                        }}
                                        className="p-2 text-red-500 hover:text-red-700"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    const newFacility: facilities = { imageUrl: '', title: '' };
                                    setSelectedFacilities([...selectedFacilities, newFacility]);
                                }}
                                className="flex items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="ml-2 text-sm text-gray-600">Add Facility</span>
                            </button>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Details
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedDetails.map((detail, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                                    <div className="relative w-16 h-16">
                                        {detail.imageUrl ? (
                                            <Image
                                                src={detail.imageUrl}
                                                alt={`Detail ${index + 1}`}
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <select
                                            value={detail.imageUrl}
                                            onChange={(e) => {
                                                const newDetails = [...selectedDetails];
                                                newDetails[index] = {
                                                    ...newDetails[index],
                                                    imageUrl: e.target.value
                                                };
                                                setSelectedDetails(newDetails);
                                            }}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 mb-2"
                                        >
                                            <option value="">Select Icon</option>
                                            {iconsItems.map((icon) => (
                                                <option key={icon.imageUrl} value={icon.imageUrl}>
                                                    {icon.imageUrl}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            type="text"
                                            value={detail.title}
                                            onChange={(e) => {
                                                const newDetails = [...selectedDetails];
                                                newDetails[index] = {
                                                    ...newDetails[index],
                                                    title: e.target.value
                                                };
                                                setSelectedDetails(newDetails);
                                            }}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                            placeholder="Enter detail title"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newDetails = selectedDetails.filter((_, i) => i !== index);
                                            setSelectedDetails(newDetails);
                                        }}
                                        className="p-2 text-red-500 hover:text-red-700"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    const newDetail: details = { title: '', imageUrl: '' };
                                    setSelectedDetails([...selectedDetails, newDetail]);
                                }}
                                className="flex items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="ml-2 text-sm text-gray-600">Add Detail</span>
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Description
                        </label>
                        <textarea
                            {...register('description', { required: 'Description is required' })}
                            rows={4}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Content
                        </label>
                        <RichTextEditor
                            value={watch('content') || ''}
                            onChange={(content) => setValue('content', content)}
                            placeholder="Enter property content..."
                        />
                        {errors.content && (
                            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
                        )}
                    </div>

                    <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Locations
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {locations.map((location) => (
                                <div key={location.id} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="location"
                                        id={`location-${location.id}`}
                                        checked={selectedLocations.some(selected =>
                                            selected.province === location.province
                                        )}
                                        onChange={(e) => handleLocationChange(location.id!, e.target.checked)}
                                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                                    />
                                    <label
                                        htmlFor={`location-${location.id}`}
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        {location.province}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {selectedLocations.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Select City:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {locations
                                        .find(loc => loc.province === selectedLocations[0]?.province)
                                        ?.city.map((city) => (
                                            <div key={city.city} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="city"
                                                    id={`city-${city.city}`}
                                                    checked={selectedLocations.some(selected =>
                                                        selected.city === city.city
                                                    )}
                                                    onChange={() => handleCityChange(city.city, selectedLocations[0].province)}
                                                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                                                />
                                                <label
                                                    htmlFor={`city-${city.city}`}
                                                    className="ml-2 block text-sm text-gray-900"
                                                >
                                                    {city.city}
                                                </label>
                                            </div>
                                        ))}
                                </div>
                                <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Selected:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedLocations.map((loc, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                                            >
                                                {loc.city}, {loc.province}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='bg-gray-50 p-6 rounded-xl border border-gray-200'>
                        <div className='flex flex-col gap-2'>
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Author
                            </label>
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                                {user?.photoURL ? (
                                    <Image
                                        src={user.photoURL}
                                        alt={user.displayName || 'Author'}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{user?.displayName || 'Unknown'}</p>
                                    <p className="text-xs text-gray-500">{user?.role || 'No role'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                        >
                            {isSubmitting ? 'Saving...' : property ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 