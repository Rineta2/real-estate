import { Metadata } from "next";

import PropertiesLayout from "@/hooks/dashboard/super-admins/properties/properties/PropertiesLayout";

export const metadata: Metadata = {
    title: "Properties | Real Estate",
    description: "Halaman properties untuk super admin",
}

export default function Page() {
    return (
        <PropertiesLayout />
    )
}
