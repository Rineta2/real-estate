import { Metadata } from "next";

import ContactLayout from "@/hooks/dashboard/admins/contact/ContactLayout";

export const metadata: Metadata = {
    title: "Gallery | Real Estate",
    description: "Halaman gallery untuk admins",
}

export default function Page() {
    return (
        <ContactLayout />
    )
}
