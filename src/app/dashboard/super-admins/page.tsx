import { Metadata } from "next";

import SuperAdminsLayout from "@/hooks/dashboard/super-admins/SuperAdminsLayout";

export const metadata: Metadata = {
    title: "Dashboard Super Admin | Real Estate",
    description: "Halaman dashboard untuk super admin",
}

export default function Page() {
    return (
        <SuperAdminsLayout />
    )
}
