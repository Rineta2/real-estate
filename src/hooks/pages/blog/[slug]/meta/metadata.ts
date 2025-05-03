import { Metadata } from "next";

import { db } from "@/utils/firebase/firebase";

import { collection, getDocs, query, where } from "firebase/firestore";

import { Timestamp } from "firebase/firestore";

export interface Blog {
  title: string;
  description: string;
  thumbnail: string[];
  slug: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const DEFAULT_METADATA = {
  title: "Blog | Nizam Cellular Leuwiliang",
  description:
    "Baca artikel terbaru seputar teknologi dan service handphone dari Nizam Cellular Leuwiliang",
  image: "/og-image.jpg",
};

async function getBlog(slug: string): Promise<Blog | null> {
  if (!slug) return null;

  try {
    const blogRef = collection(db, "blog");
    const q = query(blogRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(`Blog with slug "${slug}" not found`);
      return null;
    }

    const blogData = querySnapshot.docs[0].data() as Blog;
    return blogData;
  } catch (error) {
    console.error("Error fetching Blog:", error);
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
  const baseUrl =
    process.env.NEXT_PUBLIC_URL || "https://nizamcellularleuwiliang.my.id";
  const blogUrl = `${baseUrl}/blog/${params.slug}`;

  let blog: Blog | null = null;
  try {
    blog = await getBlog(params.slug);
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return {
    title: blog?.title
      ? `${blog.title} | Nizam Cellular Leuwiliang`
      : DEFAULT_METADATA.title,
    description: blog?.description || DEFAULT_METADATA.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: blogUrl,
    },
    openGraph: {
      type: "article",
      title: blog?.title
        ? `${blog.title} | Nizam Cellular Leuwiliang`
        : DEFAULT_METADATA.title,
      description: blog?.description || DEFAULT_METADATA.description,
      url: blogUrl,
      siteName: "Nizam Cellular Leuwiliang",
      locale: "id_ID",
      images: blog?.thumbnail?.length
        ? [
            {
              url: blog.thumbnail[0],
              width: 1200,
              height: 630,
              alt: blog.title,
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
      publishedTime: blog?.createdAt
        ? blog.createdAt.toDate().toISOString()
        : undefined,
      modifiedTime: blog?.updatedAt
        ? blog.updatedAt.toDate().toISOString()
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog?.title
        ? `${blog.title} | Nizam Cellular Leuwiliang`
        : DEFAULT_METADATA.title,
      description: blog?.description || DEFAULT_METADATA.description,
      images: blog?.thumbnail?.length
        ? [blog.thumbnail[0]]
        : [DEFAULT_METADATA.image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
