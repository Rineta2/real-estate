import { Metadata } from "next";

import { db } from "@/utils/firebase/firebase";

import { collection, getDocs, query, where } from "firebase/firestore";

import { Timestamp } from "firebase/firestore";

export interface Property {
  title: string;
  description: string;
  thumbnail: string[];
  slug: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const DEFAULT_METADATA = {
  title: "Properties | Real Estate",
  description:
    "Jelajahi koleksi properti terbaik kami, menampilkan rumah, apartemen, dan proyek real estate eksklusif dengan desain modern dan lokasi strategis",
  image: "/og-image.jpg",
};

async function getProperty(slug: string): Promise<Property | null> {
  if (!slug) return null;

  try {
    const propertyRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_PROPERTIES as string
    );
    const q = query(propertyRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(`Properties with slug "${slug}" not found`);
      return null;
    }

    const propertyData = querySnapshot.docs[0].data() as Property;
    return propertyData;
  } catch (error) {
    console.error("Error fetching Property:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
    }
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_URL as string;
  const propertyUrl = `${baseUrl}/properties/${params.slug}`;

  let property: Property | null = null;
  try {
    property = await getProperty(params.slug);
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return {
    title: property?.title
      ? `${property.title} | Real Estate`
      : DEFAULT_METADATA.title,
    description: property?.description || DEFAULT_METADATA.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: propertyUrl,
    },
    openGraph: {
      type: "article",
      title: property?.title
        ? `${property.title} | Real Estate`
        : DEFAULT_METADATA.title,
      description: property?.description || DEFAULT_METADATA.description,
      url: propertyUrl,
      siteName: "Space Digitalia",
      locale: "id_ID",
      images: property?.thumbnail?.length
        ? [
            {
              url: property.thumbnail[0],
              width: 1200,
              height: 630,
              alt: property.title,
            },
          ]
        : [
            {
              url: DEFAULT_METADATA.image,
              width: 1200,
              height: 630,
              alt: DEFAULT_METADATA.title,
            },
          ],
      publishedTime: property?.createdAt
        ? property.createdAt.toDate().toISOString()
        : undefined,
      modifiedTime: property?.updatedAt
        ? property.updatedAt.toDate().toISOString()
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: property?.title
        ? `${property.title} | Real Estate`
        : DEFAULT_METADATA.title,
      description: property?.description || DEFAULT_METADATA.description,
      images: property?.thumbnail?.length
        ? [property.thumbnail[0]]
        : [DEFAULT_METADATA.image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
