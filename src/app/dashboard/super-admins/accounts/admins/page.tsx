import { Metadata } from "next";

import AdminsLayout from "@/hooks/dashboard/super-admins/accounts/admins/AdminLayout";

export const metadata: Metadata = {
    title: "Admins | Real Estate",
    description: "Halaman untuk mengelola data admin.",
}

export default function AdminsPage() {
    return (
        <AdminsLayout />
    );
} 