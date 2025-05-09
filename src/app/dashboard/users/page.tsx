import { Metadata } from "next";

import UsersLayout from "@/hooks/dashboard/users/UsersLayout";

export const metadata: Metadata = {
    title: "Dashboard Users | Real Estate",
    description: "Halaman dashboard untuk Users",
}

export default function Page() {
    return (
        <UsersLayout />
    )
}
