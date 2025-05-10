import { Metadata } from "next";

import BlogLayout from "@/hooks/dashboard/super-admins/blog/blog/BlogLayout";

export const metadata: Metadata = {
    title: "Blog | Real Estate",
    description: "Explore our latest articles and insights about real estate, property investment, and market trends.",
}

export default function BlogPage() {
    return (
        <BlogLayout />
    );
} 