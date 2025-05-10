import { Metadata } from "next";

import ContactLayout from "@/hooks/dashboard/super-admins/contact/ContactLayout";

export const metadata: Metadata = {
    title: "Gallery | Real Estate",
    description: "Halaman gallery untuk super admin",
}

export default function Page() {
    return (
        <ContactLayout />
    )
}
