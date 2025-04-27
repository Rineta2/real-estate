import { Metadata } from "next";

import FaqsLayout from "@/hooks/dashboard/super-admins/layout/faqs/FaqsLayout";

export const metadata: Metadata = {
    title: "Faqs | Real Estate",
    description: "Halaman faqs untuk super admin",
}

export default function Page() {
    return (
        <FaqsLayout />
    )
}
