import { Metadata } from "next"

import ForgotPasswordLayout from "@/hooks/pages/forgot-password/ForgotPasswordLayout"

export const metadata: Metadata = {
    title: "Forgot Password | Real Estate",
    description: "Reset your password",
}

export default function ForgotPasswordPage() {
    return <ForgotPasswordLayout />
} 