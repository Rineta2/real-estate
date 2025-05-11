import type { Metadata } from 'next'
import DetailsProfile from '@/hooks/pages/profile/[name]/DetailsProfile'
import { generateMetadata as getProfileMetadata } from '@/hooks/pages/profile/[name]/meta/metadata'

type Props = {
    params: Promise<{ name: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const resolvedParams = await params
    return getProfileMetadata({ params: { name: resolvedParams.name } })
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params
    return <DetailsProfile name={resolvedParams.name} />
}
