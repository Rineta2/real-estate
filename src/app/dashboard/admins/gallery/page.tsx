import { Metadata } from "next";

import GalleryLayout from "@/hooks/dashboard/admins/gallery/GalleryLayout";

export const metadata: Metadata = {
    title: "Gallery | Real Estate",
    description: "Halaman gallery untuk admins",
}

export default function Page() {
    return (
        <GalleryLayout />
    )
}
