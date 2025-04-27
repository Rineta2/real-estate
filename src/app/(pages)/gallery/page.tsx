import { Metadata } from "next";

import { Fragment } from "react";

import GalleryLayout from "@/hooks/pages/gallery/GalleryLayout";

import GalleryHero from "@/hooks/pages/gallery/GalleryHero";

export const metadata: Metadata = {
    title: "Gallery | Real Estate",
    description: "Jelajahi koleksi galeri properti terbaik kami, menampilkan rumah, apartemen, dan proyek real estate eksklusif dengan desain modern dan lokasi strategis",
}

export default function Page() {
    return (
        <Fragment>
            <GalleryHero />
            <GalleryLayout />
        </Fragment>
    )
}
