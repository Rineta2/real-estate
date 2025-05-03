"use client"

import React from 'react';

import { Pagination } from '@/base/helper/Pagination';

import BlogSkelaton from '@/hooks/pages/blog/blog/BlogSkelaton';

import { TopBlog } from '@/hooks/pages/blog/blog/components/TopBlog';

import { CategoryFilter } from '@/hooks/pages/blog/blog/components/CategoryFilter';

import { useManagementBlog } from '@/hooks/pages/blog/blog/lib/useManagementBlog';

import { BlogCard } from '@/hooks/pages/blog/blog/components/BlogCard';

export default function BlogLayout() {
    const {
        blog,
        loading,
        selectedCategory,
        currentPage,
        topBlog,
        paginatedBlog,
        totalPages,
        setSelectedCategory,
        handlePageChange,
    } = useManagementBlog();

    if (loading) {
        return <BlogSkelaton />;
    }

    return (
        <section className='min-h-screen py-10 pt-28'>
            <div className="container px-4 sm:px-6 md:px-8 lg:px-14">
                {topBlog && (
                    <div className="mb-8 md:mb-12">
                        <TopBlog blog={topBlog} />
                    </div>
                )}

                <div className='flex justify-center items-center gap-4 mb-8 md:mb-12'>
                    <CategoryFilter
                        blog={blog}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>

                <div
                    key={selectedCategory}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {paginatedBlog.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>

                <div className='mt-10 md:mt-14'>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </section>
    )
}
