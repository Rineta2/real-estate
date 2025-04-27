import { Metadata } from "next";

import AboutLayout from "@/hooks/dashboard/super-admins/pages/about/AboutLayout";

export const metadata: Metadata = {
    title: "About | Real Estate",
    description: "Halaman about untuk super admin",
}

export default function Page() {
    return (
        <AboutLayout />
    )
}
