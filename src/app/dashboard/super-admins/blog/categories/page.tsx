import { Metadata } from "next";

import CategoriesLayout from "@/hooks/dashboard/super-admins/blog/categories/CategoriesLayout";

export const metadata: Metadata = {
    title: "Categories | Real Estate",
    description: "Explore our latest articles and insights about real estate, property investment, and market trends.",
}

export default function CategoriesPage() {
    return (
        <CategoriesLayout />
    );
} 