import { Metadata } from "next"

import SignInLayout from "@/hooks/pages/signin/SigninLayout"

export const metadata: Metadata = {
    title: "Sign In | Real Estate",
    description: "Sign in to your account",
}

export default function SignInPage() {
    return <SignInLayout />
}
