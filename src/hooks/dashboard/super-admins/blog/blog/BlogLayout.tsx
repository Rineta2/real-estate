"use client"

import React, { useEffect, useState, useMemo } from 'react'

import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'

import { db } from '@/utils/firebase/firebase'

import { Blog, Category, BlogFilters } from '@/hooks/dashboard/super-admins/blog/blog/types/Blog'

import BlogSkeleton from '@/hooks/dashboard/super-admins/blog/blog/BlogSkelaton'

import { Pagination } from '@/base/helper/Pagination'

import { SearchAndFilter } from '@/hooks/dashboard/super-admins/blog/blog/components/SearchAndFilter'

import { DeleteModal } from '@/hooks/dashboard/super-admins/blog/blog/modal/DeleteModal'

import { ViewModal } from '@/hooks/dashboard/super-admins/blog/blog/modal/ViewModal'

import { BlogCard } from '@/hooks/dashboard/super-admins/blog/blog/components/BlogCard'

import dynamic from 'next/dynamic'

const BlogModal = dynamic(() => import('@/hooks/dashboard/super-admins/blog/blog/modal/ContentModal'), { ssr: false })

import { IoIosArrowForward } from 'react-icons/io'

import Link from 'next/link'

import { FaPlus } from 'react-icons/fa'

export default function BlogLayout() {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
    const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null)
    const [viewBlog, setViewBlog] = useState<Blog | null>(null)
    const [filters, setFilters] = useState<BlogFilters>({
        searchQuery: '',
        selectedCategory: '',
        selectedStatus: ''
    })
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 6

    useEffect(() => {
        fetchArticles()
        fetchCategories()
    }, [])

    const fetchArticles = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_BLOG!))
            const blogsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Blog))
            const sortedBlogs = blogsData.sort((a, b) =>
                b.createdAt.seconds - a.createdAt.seconds
            )
            setBlogs(sortedBlogs)
        } catch (error) {
            console.error('Error fetching blogs:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchCategories = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_BLOG_CATEGORIES!))
            const categoriesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Category))
            setCategories(categoriesData)
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_BLOG!, id))
            setBlogs(blogs.filter(blog => blog.id !== id))
            setDeleteBlogId(null)
        } catch (error) {
            console.error('Error deleting blog:', error)
        }
    }

    const handleEdit = (blog: Blog) => {
        setSelectedBlog(blog)
        const modal = document.getElementById('article_modal') as HTMLDialogElement | null
        modal?.showModal()
    }

    const handleView = (blog: Blog) => {
        setViewBlog(blog)
        const viewModal = document.getElementById('view_modal') as HTMLDialogElement | null
        viewModal?.showModal()
    }

    const refreshBlogs = () => {
        fetchArticles()
    }

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
            blog.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
            blog.author?.name.toLowerCase().includes(filters.searchQuery.toLowerCase())

        const matchesCategory = filters.selectedCategory ? blog.category === filters.selectedCategory : true
        const matchesStatus = filters.selectedStatus ? blog.status === filters.selectedStatus : true

        return matchesSearch && matchesCategory && matchesStatus
    })

    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)
    const currentBlogs = filteredBlogs.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected)
    }

    const uniqueCategories = useMemo(() => {
        const categoryMap = new Map()
        categories.forEach(category => {
            if (!categoryMap.has(category.title)) {
                categoryMap.set(category.title, category)
            }
        })
        return Array.from(categoryMap.values())
    }, [categories])

    if (loading) {
        return <BlogSkeleton />
    }
    return (
        <section>
            <div className="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-primary-50 rounded-md mb-10">
                <div>
                    <h1 className="text-2xl font-bold">Blog</h1>
                    <ul className="flex items-center gap-2">
                        <li className="text-sm font-medium"><Link href="/dashboard/super-admins/super-admin">Dashboard</Link></li>
                        <li className="text-sm font-medium"><IoIosArrowForward className="w-4 h-4" /></li>
                        <li className="text-sm font-medium">Blog</li>
                    </ul>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        className="bg-primary-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
                        onClick={() => {
                            setSelectedBlog(null)
                            const modal = document.getElementById('article_modal') as HTMLDialogElement | null
                            modal?.showModal()
                        }}
                    >
                        <FaPlus className="w-4 h-4" />
                        <span>Create</span>
                    </button>
                </div>
            </div>

            <SearchAndFilter
                filters={filters}
                categories={uniqueCategories}
                onFilterChange={setFilters}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentBlogs.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={() => {
                            setDeleteBlogId(blog.id)
                            const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null
                            deleteModal?.showModal()
                        }}
                    />
                ))}
            </div>

            {filteredBlogs.length === 0 && (
                <div
                    className="text-center py-12"
                >
                    <p className="text-gray-500">No blogs found matching your criteria</p>
                </div>
            )}

            {filteredBlogs.length > 0 && (
                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            <DeleteModal
                isOpen={!!deleteBlogId}
                onClose={() => setDeleteBlogId(null)}
                onConfirm={() => {
                    if (deleteBlogId) {
                        handleDelete(deleteBlogId)
                    }
                }}
            />

            <ViewModal
                blog={viewBlog}
                onClose={() => setViewBlog(null)}
            />

            <BlogModal
                blog={selectedBlog}
                onClose={() => setSelectedBlog(null)}
                onSuccess={refreshBlogs}
            />
        </section>
    )
}
