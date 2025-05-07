import { Metadata } from "next";

import SuperAdminsLayout from "@/hooks/dashboard/super-admins/accounts/super-admins/SuperAdminsLayout";

export const metadata: Metadata = {
    title: "Super Admins | Real Estate",
    description: "Halaman untuk mengelola data super admin.",
}

export default function SuperAdminsPage() {
    return (
        <SuperAdminsLayout />
    );
} 