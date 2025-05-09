import { Metadata } from "next";

import MessageLayout from "@/hooks/dashboard/users/message/MessageLayout"

export const metadata: Metadata = {
    title: "Message | Real Estate",
    description: "Halaman Message untuk users",
}

export default function page() {
    return (
        <MessageLayout />
    )
}
