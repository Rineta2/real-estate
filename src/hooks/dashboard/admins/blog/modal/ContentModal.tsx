"use client"

import React, { useEffect, useState } from 'react';

import ReactQuill from 'react-quill-new';

import 'react-quill-new/dist/quill.snow.css';

import { collection, addDoc, getDocs, Timestamp, updateDoc, doc } from 'firebase/firestore';

import { db } from '@/utils/firebase/firebase';

import imagekitInstance from '@/utils/imagekit/imagekit';

import { Blog, Category, BlogModalProps } from '@/hooks/dashboard/admins/blog/types/Blog';

import Image from 'next/image';

import { useAuth } from '@/utils/context/AuthContext';

import { toast } from 'react-hot-toast';

import { Button } from 'flowbite-react';

type PublishStatus = 'draft' | 'published';

export default function BlogModal({ blog, onClose, onSuccess }: BlogModalProps) {
    const { user, hasRole } = useAuth();
    const [title, setTitle] = useState(blog?.title || '');
    const [description, setDescription] = useState(blog?.description || '');
    const [slug, setSlug] = useState(blog?.slug || '');
    const [content, setContent] = useState(blog?.content || '');
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(blog?.thumbnail || '');
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState(blog?.category || '');
    const [loading, setLoading] = useState(false);
    const [publishStatus, setPublishStatus] = useState<PublishStatus>('draft');

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ align: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['link', 'image', 'video'],
            [{ color: [] }, { background: [] }],
            ['blockquote']
        ],
        clipboard: {
            matchVisual: false
        }
    };

    const handleClose = () => {
        const modal = document.getElementById('article_modal') as HTMLDialogElement;
        modal?.close();
        resetForm();
        onClose();
    };

    useEffect(() => {
        fetchCategories();
        if (blog) {
            setTitle(blog.title);
            setSlug(blog.slug);
            setContent(blog.content);
            setThumbnail(null);
            setThumbnailPreview(blog.thumbnail);
            setSelectedCategory(blog.category);
            setPublishStatus(blog.status);
            setDescription(blog.description || '');
        }
    }, [blog]);

    const fetchCategories = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_BLOG_CATEGORIES!));
            const categoriesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Category));
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to fetch categories');
        }
    };

    const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnail(file);
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .trim();
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSlug(generateSlug(newTitle));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!hasRole(['super-admins', 'admins'])) {
            toast.error('You do not have permission to create articles');
            return;
        }

        if (!user?.displayName || !user?.photoURL || !user?.role) {
            toast.error('User information is incomplete');
            return;
        }

        setLoading(true);

        try {
            let thumbnailUrl = blog?.thumbnail || '';
            if (thumbnail) {
                const folderTitle = title
                    .split(' ')
                    .slice(0, 15)
                    .join('-')
                    .toLowerCase()
                    .replace(/[^a-z0-9-]/g, '');
                const folderPath = `/blogs/${folderTitle}`;

                const base64 = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(thumbnail);
                });

                const uploadResponse = await imagekitInstance.upload({
                    file: base64,
                    fileName: `blog-${Date.now()}`,
                    folder: folderPath
                });
                thumbnailUrl = uploadResponse.url;
            }

            // Find the selected category object
            const selectedCategoryObj = categories.find(cat => cat.id === selectedCategory);
            if (!selectedCategoryObj) {
                throw new Error('Selected category not found');
            }

            const blogData: Omit<Blog, 'id'> = {
                title,
                description,
                slug,
                content,
                thumbnail: thumbnailUrl,
                category: selectedCategoryObj.title,
                author: blog?.author || {
                    name: user.displayName,
                    photoURL: user.photoURL,
                    role: user.role
                },
                createdAt: blog?.createdAt || Timestamp.now(),
                updatedAt: Timestamp.now(),
                status: publishStatus
            };

            if (blog?.id) {
                // Update existing article
                await updateDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_BLOG as string, blog.id), blogData);
                onSuccess?.();
            } else {
                // Create new article
                await addDoc(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_BLOG as string), blogData);
                onSuccess?.();
            }

            toast.success(`Blog ${blog ? 'updated' : 'created'} successfully`);
            handleClose();
        } catch (error) {
            console.error('Error saving blog:', error);
            toast.error('Failed to save blog');
        } finally {
            setLoading(false);
        }
    };

    const renderAuthorField = () => (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h4 className="font-semibold text-lg text-gray-900">Author Information</h4>
            </div>

            <div className="grid md:grid-cols-[200px,1fr] gap-8 items-start">
                {/* Author Image */}
                <div className="flex flex-col items-center space-y-3">
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner">
                        <Image
                            src={user?.photoURL || '/placeholder-avatar.png'}
                            alt={user?.displayName || 'Author'}
                            fill
                            className="object-cover transition-transform hover:scale-105 duration-300"
                        />
                    </div>
                    <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                        {user?.role || 'No role'}
                    </span>
                </div>

                {/* Author Details */}
                <div className="space-y-6">
                    <div className="form-control">
                        <label className="text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={user?.displayName || 'No name available'}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-500 cursor-not-allowed focus:ring-0"
                                disabled
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">This information is pulled from your profile and cannot be edited here.</p>
                    </div>

                    <div className="form-control">
                        <label className="text-sm font-medium text-gray-700 mb-2">Access Level</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={user?.role || 'No role available'}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-500 cursor-not-allowed focus:ring-0"
                                disabled
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setSlug('');
        setContent('');
        setThumbnail(null);
        setThumbnailPreview('');
        setSelectedCategory('');
        setPublishStatus('draft');
    };

    return (
        <dialog id="article_modal" className="modal">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-6xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-xl text-gray-900">
                                {blog ? 'Edit Blog' : 'Create New Blog'}
                            </h3>
                            <Button
                                color="light"
                                size="xs"
                                onClick={handleClose}
                                className="hover:bg-gray-100 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </Button>
                        </div>

                        <form id="article-form" onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Information */}
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-lg text-gray-900">Basic Information</h4>
                                </div>

                                <div className="space-y-6">
                                    {/* Title and Slug side by side */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control">
                                            <label className="text-sm font-medium text-gray-700 mb-1.5">Title</label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full bg-white border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all rounded-lg"
                                                value={title}
                                                onChange={handleTitleChange}
                                                placeholder="Enter article title"
                                                required
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="text-sm font-medium text-gray-700 mb-1.5">Slug</label>
                                            <input
                                                type="text"
                                                className="input input-bordered w-full bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all rounded-lg"
                                                value={slug}
                                                onChange={(e) => setSlug(e.target.value)}
                                                placeholder="article-slug"
                                                readOnly
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Description and Publish Status side by side */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Description field */}
                                        <div className="form-control">
                                            <label className="text-sm font-medium text-gray-700 mb-1.5">Description</label>
                                            <textarea
                                                className="textarea textarea-bordered w-full bg-white border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all rounded-lg h-24"
                                                value={description}
                                                onChange={handleDescriptionChange}
                                                placeholder="Enter article description"
                                                required
                                            />
                                        </div>

                                        {/* Publish Status field */}
                                        <div className="form-control">
                                            <label className="text-sm font-medium text-gray-700 mb-1.5">Publish Status</label>
                                            <select
                                                className="select select-bordered w-full bg-white border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all rounded-lg"
                                                value={publishStatus}
                                                onChange={(e) => setPublishStatus(e.target.value as PublishStatus)}
                                                required
                                            >
                                                <option value="draft">Draft</option>
                                                <option value="published">Published</option>
                                            </select>
                                            <p className="mt-2 text-xs text-gray-500">
                                                {publishStatus === 'draft'
                                                    ? 'Save as draft to edit later'
                                                    : 'Publish immediately to make it visible to readers'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Media Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Thumbnail Upload */}
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-green-50 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-lg text-gray-900">Thumbnail</h4>
                                    </div>

                                    <div className="form-control">
                                        {thumbnailPreview ? (
                                            <div className="relative rounded-lg overflow-hidden group">
                                                <Image
                                                    src={thumbnailPreview}
                                                    alt="Thumbnail preview"
                                                    width={400}
                                                    height={300}
                                                    className="w-full h-[200px] object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-circle bg-white/20 hover:bg-white/30 border-0"
                                                        onClick={() => {
                                                            const input = document.getElementById('thumbnail-input') as HTMLInputElement;
                                                            input?.click();
                                                        }}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setThumbnail(null);
                                                            setThumbnailPreview('');
                                                        }}
                                                        className="btn btn-sm btn-circle bg-white/20 hover:bg-white/30 border-0"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <input
                                                    id="thumbnail-input"
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleThumbnailChange}
                                                />
                                            </div>
                                        ) : (
                                            <div className="relative border-2 border-dashed border-gray-200 rounded-lg hover:border-green-500 transition-all">
                                                <input
                                                    id="thumbnail-input"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleThumbnailChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    required
                                                />
                                                <div className="flex flex-col items-center justify-center h-[200px] p-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <p className="text-sm text-gray-500">Add Thumbnail</p>
                                                    <p className="text-xs text-gray-400 mt-1">Drag or click to upload</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Categories & Tags */}
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-purple-50 rounded-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-lg text-gray-900">Categories & Tags</h4>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="form-control">
                                            <label className="text-sm font-medium text-gray-700 mb-1.5">Category</label>
                                            <select
                                                className="select select-bordered w-full bg-white border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all rounded-lg"
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
                                                required
                                            >
                                                <option value="">Select Category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>{category.title}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Editor */}
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-lg text-gray-900">Content</h4>
                                </div>

                                <div className="form-control">
                                    <div className="border rounded-lg">
                                        <ReactQuill
                                            theme="snow"
                                            value={content}
                                            onChange={setContent}
                                            modules={modules}
                                            style={{ height: '400px' }}
                                            className="[&_.ql-editor]:min-h-[300px]"
                                            placeholder="Write your article content here..."
                                            preserveWhitespace
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Add author section before or after content editor */}
                            {renderAuthorField()}
                        </form>

                        {/* Modal Footer */}
                        <div className="flex justify-end gap-3 mt-6">
                            <Button
                                color="light"
                                onClick={handleClose}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                form="article-form"
                                color="primary"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Loading...
                                    </>
                                ) : blog ? 'Update Blog' : 'Create Blog'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
} 