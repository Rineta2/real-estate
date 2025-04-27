import { Fragment } from "react";

export const metadata = {
    title: "Real Estate | Temukan Properti Impian Anda",
    description: "Jelajahi ribuan listing rumah, apartemen, dan properti komersial terbaik di Indonesia. Temukan properti impian Anda bersama Real Estate hari ini!",
    author: "Space Digitalia",
    keywords: "Real Estate, Properti, Rumah, Apartemen, Properti Komersial, Jual Beli Rumah, Investasi Properti",
    icons: {
        icon: "/favicon.ico",
    },
    manifest: "/manifest.json",
    openGraph: {
        title: "Real Estate",
        description: "Jelajahi ribuan listing rumah, apartemen, dan properti komersial terbaik di Indonesia. Temukan properti impian Anda bersama Real Estate hari ini!",
        url: "https://real-estate-space-digitalia.vercel.app",
        siteName: "Real Estate",
        images: [
            {
                url: "https://real-estate-space-digitalia.vercel.app/favicon.ico",
                width: 1920,
                height: 1080,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Real Estate",
        description: "Jelajahi ribuan listing rumah, apartemen, dan properti komersial terbaik di Indonesia. Temukan properti impian Anda bersama Real Estate hari ini!",
        creator: "@realestate",
        images: "https://real-estate-space-digitalia.vercel.app/favicon.ico",
    },
};

const siteUrl = "https://real-estate-space-digitalia.vercel.app";
const faviconUrl = `${siteUrl}/favicon.ico`;
const canonicalUrl = `${siteUrl}/`;

const Head = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        name: "Real Estate",
        image: "https://real-estate-space-digitalia.vercel.app/favicon.ico",
        "@id": "https://real-estate-space-digitalia.vercel.app",
        url: "https://real-estate-space-digitalia.vercel.app",
        description: "Jelajahi ribuan listing rumah, apartemen, dan properti komersial terbaik di Indonesia. Temukan properti impian Anda bersama Real Estate hari ini!",
        logo: "https://real-estate-space-digitalia.vercel.app/favicon.ico",
        title: "Real Estate",
    };

    const jsonLdString = JSON.stringify(jsonLd);

    return (
        <Fragment>
            <title>{metadata.title}</title>
            <meta charSet="UTF-8" />
            <meta name="version" content="1.0" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content={metadata.description} />
            <meta property="og:description" content={metadata.description} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={metadata.title} />
            <meta name="author" content={metadata.author} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={faviconUrl} />
            <meta name="keywords" content={metadata.keywords} />
            <meta name="theme-color" content="#ffffff" />
            <meta name="robots" content="index, follow" />
            <link rel="icon" href={faviconUrl} type="image/x-icon" sizes="any" />
            <link rel="icon" href={faviconUrl} type="image/svg+xml" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href={faviconUrl} />
            <link rel="shortcut icon" href={faviconUrl} type="image/x-icon" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="canonical" href={canonicalUrl} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLdString }}
            />
        </Fragment>
    );
};

export default Head;