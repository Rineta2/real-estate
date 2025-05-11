import { Metadata } from "next";

import ProfileLayout from "@/hooks/dashboard/admins/profile/ProfileLayout";

export const metadata: Metadata = {
    title: "Profile | Real Estate",
    description: "Halaman profile untuk admins",
}

export default function Page() {
    return (
        <ProfileLayout />
    )
}
