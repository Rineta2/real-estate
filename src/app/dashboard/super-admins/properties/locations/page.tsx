import { Metadata } from "next";

import PropertiesLocationsLayout from "@/hooks/dashboard/super-admins/properties/locations/PropertiesLocationsLayout";

export const metadata: Metadata = {
    title: "Properties Locations | Real Estate",
    description: "Halaman properties locations untuk super admin",
}

export default function Page() {
    return (
        <PropertiesLocationsLayout />
    )
}
