import { Metadata } from "next";

import BannerContactLayout from "@/hooks/dashboard/super-admins/pages/banner-contact/BannerContactLayout";

export const metadata: Metadata = {
    title: "Banner Contact | Real Estate",
    description: "Halaman banner contact",
}

export default function Page() {
    return (
        <BannerContactLayout />
    )
}
