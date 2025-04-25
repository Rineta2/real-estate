import { Metadata } from "next";

import HomeLayout from "@/hooks/dashboard/super-admins/layout/home/HomeLayout";

export const metadata: Metadata = {
    title: "Home | Real Estate",
    description: "Halaman home untuk super admin",
}

// This is a server component that wraps the client component
export default function Page() {
    return (
        <HomeLayout />
    )
}
