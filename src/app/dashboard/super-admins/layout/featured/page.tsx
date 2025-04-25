import { Metadata } from "next";

import FeaturedLayout from "@/hooks/dashboard/super-admins/layout/featured/FeaturedLayout";

export const metadata: Metadata = {
    title: "Featured | Real Estate",
    description: "Halaman featured untuk super admin",
}

// This is a server component that wraps the client component
export default function Page() {
    return (
        <FeaturedLayout />
    )
}
