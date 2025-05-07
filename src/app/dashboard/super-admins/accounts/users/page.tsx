import { Metadata } from "next";

import UserLayout from "@/hooks/dashboard/super-admins/accounts/users/UsersLayout.tsx";

export const metadata: Metadata = {
    title: "Users | Real Estate",
    description: "Halaman untuk mengelola data user.",
}

export default function UsersPage() {
    return (
        <UserLayout />
    );
} 