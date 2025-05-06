import { Metadata } from "next";

import PropertiesLayout from "@/hooks/pages/properties/properties/PropertiesLayout";

export const metadata: Metadata = {
    title: "Properties | Real Estate",
    description: "Jelajahi koleksi properti terbaik kami, menampilkan rumah, apartemen, dan proyek real estate eksklusif dengan desain modern dan lokasi strategis",
}

export default function Page() {
    return (
        <PropertiesLayout />
    )
}
