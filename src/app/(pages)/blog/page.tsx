import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Real Estate",
    description: "Explore our latest articles and insights about real estate, property investment, and market trends.",
}

export default function BlogPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold mb-8">Blog</h1>
            <p className="text-gray-600">Coming soon. Our blog section is under construction.</p>
        </div>
    );
} 