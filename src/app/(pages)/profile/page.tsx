import { Metadata } from "next";

import ProfileLayout from "@/hooks/pages/profile/ProfileLayout";

export const metadata: Metadata = {
    title: "Profile | Real Estate",
    description: "Halaman profile untuk super admin",
}

export default function Page() {
    return (
        <ProfileLayout />
    )
}
