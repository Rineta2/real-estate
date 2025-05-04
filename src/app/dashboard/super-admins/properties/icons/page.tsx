import { Metadata } from "next";

import PropertiesIconsLayout from "@/hooks/dashboard/super-admins/properties/icons/PropertiesIconsLayout";

export const metadata: Metadata = {
    title: "Properties Icons | Real Estate",
    description: "Halaman properties icons untuk super admin",
}

export default function Page() {
    return (
        <PropertiesIconsLayout />
    )
}
