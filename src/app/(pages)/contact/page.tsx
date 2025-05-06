import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Real Estate",
    description: "Get in touch with our real estate experts for inquiries about properties, investments, or partnerships.",
}

import ContactLayout from "@/hooks/pages/contact/ContactLayout"

export default function ContactPage() {
    return (
        <ContactLayout />
    );
} 