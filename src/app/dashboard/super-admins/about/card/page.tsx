import { Metadata } from "next";

import AboutCardLayout from "@/hooks/dashboard/super-admins/about/CardAbout/AboutCardLayout";

export const metadata: Metadata = {
    title: "Card About | Real Estate",
    description: "Halaman Card About untuk super admin",
}

export default function Page() {
    return (
        <AboutCardLayout />
    )
}
