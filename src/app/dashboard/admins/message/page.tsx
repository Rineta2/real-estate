import { Metadata } from "next";

import MessageLayout from "@/hooks/dashboard/admins/message/MessageLayout";

export const metadata: Metadata = {
    title: "Message | Real Estate",
    description: "Halaman message untuk admins",
}

export default function Page() {
    return (
        <MessageLayout />
    )
}