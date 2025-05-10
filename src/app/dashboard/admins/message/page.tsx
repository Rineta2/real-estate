import { Metadata } from "next";

import MessageLayout from "@/hooks/dashboard/super-admins/message/MessageLayout";

export const metadata: Metadata = {
    title: "Message | Real Estate",
    description: "Halaman message untuk super admin",
}

export default function Page() {
    return (
        <MessageLayout />
    )
}