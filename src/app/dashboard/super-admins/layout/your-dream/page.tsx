import { Metadata } from "next";

import YourDreamLayout from "@/hooks/dashboard/super-admins/layout/your-dream/YourDreamLayout";

export const metadata: Metadata = {
    title: "Your Dream | Real Estate",
    description: "Halaman your dream untuk super admin",
}

export default function Page() {
    return (
        <YourDreamLayout />
    )
}
