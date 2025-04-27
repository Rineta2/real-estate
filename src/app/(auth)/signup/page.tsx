import { Metadata } from "next"

import SignUpLayout from "@/hooks/pages/(auth)/signup/SignupLayout"

export const metadata: Metadata = {
    title: "Sign Up | Real Estate",
    description: "Sign up to your account",
}

export default function SignUpPage() {
    return <SignUpLayout />
}
