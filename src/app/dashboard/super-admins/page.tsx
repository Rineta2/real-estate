import { Metadata } from "next";

import SuperAdminsLayout from "@/hooks/dashboard/super-admins/SuperAdminsLayout";

export const metadata: Metadata = {
    title: "Dashboard Super Admin | Real Estate",
    description: "Halaman dashboard untuk super admin",
}

// This is a server component that wraps the client component
export default function Page() {
    return (
        <SuperAdminsLayout />
    )
}
