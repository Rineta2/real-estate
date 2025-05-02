import { Metadata } from "next";

import ArtLivingLayout from "@/hooks/dashboard/super-admins/about/ArtLiving/ArtLivingLayout";

export const metadata: Metadata = {
    title: "Art Of Living | Real Estate",
    description: "Halaman Art Of Living untuk super admin",
}

export default function Page() {
    return (
        <ArtLivingLayout />
    )
}
