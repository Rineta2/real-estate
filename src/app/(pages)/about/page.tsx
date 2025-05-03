import React from 'react'

import AboutLayout from "@/hooks/pages/about/about/AboutLayout"

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About | Real Estate',
    description: 'About',
}

export default function page() {
    return (
        <AboutLayout />
    )
}
