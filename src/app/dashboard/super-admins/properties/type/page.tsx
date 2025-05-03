import { Metadata } from "next";

import PropertiestypeLayout from "@/hooks/dashboard/super-admins/properties/type/PropertiestypeLayout";

export const metadata: Metadata = {
    title: "Properties Type | Real Estate",
    description: "Halaman type untuk super admin",
}

export default function Page() {
    return (
        <PropertiestypeLayout />
    )
}
