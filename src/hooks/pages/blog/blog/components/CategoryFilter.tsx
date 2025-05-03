import { motion } from 'framer-motion';

import { CategoryFilterProps } from '@/hooks/pages/blog/blog/types/Blog';

export function CategoryFilter({ blog, selectedCategory, setSelectedCategory }: CategoryFilterProps) {
    const categories = ['View All', ...new Set(blog.map(blog => blog.category))];

    return (
        <div className='category-filter w-full overflow-auto pb-2'>
            <div className='flex items-start justify-start md:justify-center md:items-center gap-4 min-w-max'>
                {categories.map((category) => (
                    <motion.button
                        key={category}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(category)}
                        className={`btn-category relative overflow-hidden capitalize ${selectedCategory === category
                            ? 'text-orange-500 font-bold border-b-4 border-orange-500'
                            : 'bg-gray-50/80 text-gray-700 hover:bg-gray-100/80'
                            } px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 
                        text-sm backdrop-blur-sm`}
                    >
                        {category}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}