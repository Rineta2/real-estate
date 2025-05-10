import { Metadata } from "next";

import AdminsLayout from "@/hooks/dashboard/admins/AdminsLayout";

export const metadata: Metadata = {
    title: "Dashboard Admin | Real Estate",
    description: "Halaman dashboard untuk admin",
}

export default function Page() {
    return (
        <AdminsLayout />
    )
}
