import { Metadata } from "next";

import PropertiesLayout from "@/hooks/dashboard/admins/properties/PropertiesLayout";

export const metadata: Metadata = {
    title: "Properties | Real Estate",
    description: "Halaman properties untuk admins",
}

export default function Page() {
    return (
        <PropertiesLayout />
    )
}
