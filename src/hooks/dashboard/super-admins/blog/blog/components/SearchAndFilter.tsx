import React from 'react';

import { SearchAndFilterProps } from '@/hooks/dashboard/super-admins/blog/blog/types/Blog';

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
    filters,
    categories,
    onFilterChange,
}) => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFilterChange({
            ...filters,
            searchQuery: e.target.value,
        });
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange({
            ...filters,
            selectedCategory: e.target.value,
        });
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange({
            ...filters,
            selectedStatus: e.target.value,
        });
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            value={filters.searchQuery}
                            onChange={handleSearchChange}
                            className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <svg
                            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                <div className="flex gap-4">
                    <select
                        value={filters.selectedCategory}
                        onChange={handleCategoryChange}
                        className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.title}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                    <select
                        value={filters.selectedStatus}
                        onChange={handleStatusChange}
                        className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
            </div>
        </div>
    );
}; 