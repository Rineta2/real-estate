import { Metadata } from "next";

import CardContactLayout from "@/hooks/dashboard/super-admins/pages/card-contact/CardContactLayout";

export const metadata: Metadata = {
    title: "Card Contact | Real Estate",
    description: "Halaman card contact",
}

export default function Page() {
    return (
        <CardContactLayout />
    )
}
