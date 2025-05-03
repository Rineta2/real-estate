import type { Metadata } from 'next'

import BlogDetailsContent from '@/hooks/pages/blog/[slug]/BlogDetailsContent'

import { generateMetadata as getBlogMetadata } from '@/hooks/pages/blog/[slug]/meta/metadata'

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const resolvedParams = await params
    return getBlogMetadata({ params: { slug: resolvedParams.slug } })
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params
    return <BlogDetailsContent slug={resolvedParams.slug} />
}