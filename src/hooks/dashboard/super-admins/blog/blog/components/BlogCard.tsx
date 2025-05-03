import React from 'react';

import Image from 'next/image';

import { BlogCardProps } from '@/hooks/dashboard/super-admins/blog/blog/types/Blog';

export const BlogCard: React.FC<BlogCardProps> = ({ blog, onView, onEdit, onDelete }) => {
    return (
        <div className="group bg-white rounded-xl border border-[var(--border-color)] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="relative">
                <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                    width={400}
                    height={300}
                />
                <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${blog.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {blog.status}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {blog.title}
                </h3>

                <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span className="text-sm">{blog.category}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 py-2">
                    <div className="relative">
                        <Image
                            src={blog.author.photoURL}
                            alt={blog.author.name}
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-100 transition-transform duration-300 group-hover:scale-105"
                            width={100}
                            height={100}
                        />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-800 line-clamp-1">
                            {blog.author.name}
                        </span>
                        <span className="text-xs text-gray-500">
                            {blog.createdAt.toDate().toLocaleDateString()}
                        </span>
                    </div>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 mt-4">
                    {blog.description}
                </p>
            </div>

            <div className="flex justify-end gap-3 p-4 border-t border-gray-100">
                <button
                    onClick={() => onView(blog)}
                    className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                    View
                </button>
                <button
                    onClick={() => onDelete(blog.id)}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                    Delete
                </button>
                <button
                    onClick={() => onEdit(blog)}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                    Edit
                </button>
            </div>
        </div>
    );
}; 