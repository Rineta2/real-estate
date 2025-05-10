import { Metadata } from "next";

import GalleryLayout from "@/hooks/dashboard/super-admins/gallery/GalleryLayout";

export const metadata: Metadata = {
    title: "Gallery | Real Estate",
    description: "Halaman gallery untuk super admin",
}

export default function Page() {
    return (
        <GalleryLayout />
    )
}
